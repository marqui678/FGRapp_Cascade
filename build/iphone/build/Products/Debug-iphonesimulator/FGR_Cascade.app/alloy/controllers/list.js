function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId93(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId93.opts || {};
        var models = __alloyId92.models;
        var len = models.length;
        var __alloyId88 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId89 = models[i];
            __alloyId89.__transform = transform(__alloyId89);
            var __alloyId91 = {
                properties: {
                    itemId: _.template("{m.link}", {
                        m: __alloyId89.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    }),
                    searchableText: _.template("{m.title}", {
                        m: __alloyId89.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                distanceTwo: {
                    text: _.template("{m.distanceTwo}", {
                        m: __alloyId89.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                title: {
                    text: _.template("{m.title}", {
                        m: __alloyId89.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                pace: {
                    text: _.template("{m.pace}", {
                        m: __alloyId89.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                paceNumber: {
                    text: _.template("{m.paceNumber}", {
                        m: __alloyId89.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                startDateTime: {
                    text: _.template("{m.startDateTime}", {
                        m: __alloyId89.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                distanceOne: {
                    text: _.template("{m.distanceOne}", {
                        m: __alloyId89.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                }
            };
            __alloyId88.push(__alloyId91);
        }
        opts.animation ? $.__views.listSection.setItems(__alloyId88, opts.animation) : $.__views.listSection.setItems(__alloyId88);
    }
    function refresh(e) {
        "use strict";
        function afterFetch() {
            $.refreshControl.endRefreshing();
            $.search.blur();
            Alloy.Globals.setDistanceToLocation(Alloy.Collections.feed.models, Alloy.Globals.regionCenter);
            Alloy.Collections.feed.setSortField("startDateTime", "ASC");
            Alloy.Collections.feed.sort();
        }
        initRegionCenter();
        true && !e && $.refreshControl.beginRefreshing();
        var url = Alloy.CFG.url;
        Alloy.Collections.feed.fetch({
            url: url,
            success: afterFetch,
            error: afterFetch
        });
    }
    function initRegionCenter() {
        Titanium.Geolocation.hasLocationPermissions(Titanium.Geolocation.AUTHORIZATION_ALWAYS) ? setGeoLoc() : Titanium.Geolocation.requestLocationPermissions(Titanium.Geolocation.AUTHORIZATION_ALWAYS, function(result) {
            if (result.success) setGeoLoc(); else {
                alert("Do not have Geolocation permission. Use default location");
                setRegionCenter(Alloy.Globals.defaultLocation);
            }
        });
    }
    function setGeoLoc() {
        if (false === Ti.Geolocation.locationServicesEnabled) {
            alert("The device has geo turned off. Use default location.");
            setRegionCenter(Alloy.Globals.defaultLocation);
        }
        Titanium.Geolocation.getCurrentPosition(function(e) {
            Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
            if (e.error) {
                alert("Current location not found. Use default location");
                setRegionCenter(Alloy.Globals.defaultLocation);
            } else setRegionCenter(e.coords);
        });
    }
    function setRegionCenter(centerLoc) {
        Alloy.Globals.regionCenter.latitude = centerLoc.latitude;
        Alloy.Globals.regionCenter.longitude = centerLoc.longitude;
    }
    function transform(model) {
        "use strict";
        return {
            title: model.get("title"),
            startDateTime: moment(model.get("startDateTime"), moment.ISO_8601).format("LLLL"),
            link: model.get("link"),
            paceNumber: model.get("paceNumber"),
            pace: model.get("pace"),
            distanceOne: model.get("distance1"),
            distanceTwo: model.get("distance2")
        };
    }
    function select(e) {
        "use strict";
        var link = e.itemId;
        var model = Alloy.Collections.feed.get(link);
        Alloy.Globals.Navigator.open("detail", model);
    }
    function filter() {
        a = Alloy.Collections.feed;
        Alloy.Globals.Navigator.open("filter", a);
    }
    function openMapview() {
        Alloy.Globals.Navigator.open("map", {});
    }
    function openSortView() {
        Alloy.Globals.Navigator.open("sort", {});
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "list";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("feed");
    $.__views.lwin = Ti.UI.createWindow({
        barColor: "#43B02A",
        backgroundColor: "#FFF",
        navTintColor: "#FFF",
        translucent: false,
        titleAttributes: {
            color: "#FFF"
        },
        id: "lwin",
        title: "Free Group Rides"
    });
    $.__views.lwin && $.addTopLevelView($.__views.lwin);
    $.__views.refreshControl = Ti.UI.createRefreshControl({
        id: "refreshControl"
    });
    refresh ? $.addListener($.__views.refreshControl, "refreshstart", refresh) : __defers["$.__views.refreshControl!refreshstart!refresh"] = true;
    $.__views.search = Ti.UI.createSearchBar({
        id: "search"
    });
    var __alloyId70 = {};
    var __alloyId73 = [];
    var __alloyId74 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId75 = [];
            var __alloyId76 = {
                type: "Ti.UI.Label",
                bindId: "title",
                properties: {
                    color: "#006F44",
                    left: 0,
                    right: 0,
                    height: "30dp",
                    top: "12dp",
                    font: {
                        fontSize: 20
                    },
                    bindId: "title"
                }
            };
            __alloyId75.push(__alloyId76);
            var __alloyId77 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId78 = [];
                    var __alloyId80 = {
                        type: "Ti.UI.ImageView",
                        properties: {
                            left: 0,
                            right: 0,
                            font: {
                                fontSize: 13
                            },
                            top: "12dp",
                            width: "20dp",
                            image: "/images/Date.png"
                        }
                    };
                    __alloyId78.push(__alloyId80);
                    var __alloyId81 = {
                        type: "Ti.UI.Label",
                        bindId: "startDateTime",
                        properties: {
                            color: "black",
                            left: "5dp",
                            right: 0,
                            font: {
                                fontSize: 16
                            },
                            top: "12dp",
                            bindId: "startDateTime"
                        }
                    };
                    __alloyId78.push(__alloyId81);
                    var __alloyId82 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId83 = [];
                            var __alloyId84 = {
                                type: "Ti.UI.Label",
                                bindId: "paceNumber",
                                properties: {
                                    color: "white",
                                    left: 0,
                                    font: {
                                        fontSize: 12
                                    },
                                    width: "25%",
                                    height: "20dp",
                                    bottom: 0,
                                    bindId: "paceNumber",
                                    backgroundImage: "/images/pace.png"
                                }
                            };
                            __alloyId83.push(__alloyId84);
                            var __alloyId85 = {
                                type: "Ti.UI.Label",
                                bindId: "pace",
                                properties: {
                                    color: "black",
                                    left: "5dp",
                                    font: {
                                        fontSize: 16
                                    },
                                    width: "35%",
                                    height: "20dp",
                                    bottom: 0,
                                    bindId: "pace"
                                }
                            };
                            __alloyId83.push(__alloyId85);
                            var __alloyId86 = {
                                type: "Ti.UI.Label",
                                bindId: "distanceOne",
                                properties: {
                                    color: "#2C2A29",
                                    left: "5dp",
                                    font: {
                                        fontSize: 36
                                    },
                                    width: "21%",
                                    height: "20dp",
                                    textAlign: "right",
                                    padding: 0,
                                    bottom: 0,
                                    bindId: "distanceOne"
                                }
                            };
                            __alloyId83.push(__alloyId86);
                            var __alloyId87 = {
                                type: "Ti.UI.Label",
                                bindId: "distanceTwo",
                                properties: {
                                    color: "#646464",
                                    left: "5dp",
                                    font: {
                                        fontSize: 16
                                    },
                                    width: "11%",
                                    textAlign: "right",
                                    bottom: 0,
                                    bindId: "distanceTwo"
                                }
                            };
                            __alloyId83.push(__alloyId87);
                            return __alloyId83;
                        }(),
                        properties: {
                            left: 0,
                            right: 0,
                            top: 0,
                            layout: "horizontal"
                        }
                    };
                    __alloyId78.push(__alloyId82);
                    return __alloyId78;
                }(),
                properties: {
                    left: 0,
                    right: 0,
                    layout: "horizontal"
                }
            };
            __alloyId75.push(__alloyId77);
            return __alloyId75;
        }(),
        properties: {
            left: "16dp",
            right: 0,
            layout: "horizontal"
        }
    };
    __alloyId73.push(__alloyId74);
    var __alloyId72 = {
        properties: {
            left: 0,
            right: 0,
            height: "120dp",
            layout: "vertical",
            name: "template"
        },
        childTemplates: __alloyId73
    };
    __alloyId70["template"] = __alloyId72;
    $.__views.listSection = Ti.UI.createListSection({
        id: "listSection"
    });
    var __alloyId92 = Alloy.Collections["feed"] || feed;
    __alloyId92.on("fetch destroy change add remove reset", __alloyId93);
    var __alloyId94 = [];
    __alloyId94.push($.__views.listSection);
    $.__views.listView = Ti.UI.createListView({
        sections: __alloyId94,
        templates: __alloyId70,
        refreshControl: $.__views.refreshControl,
        searchView: $.__views.search,
        id: "listView",
        defaultItemTemplate: "template"
    });
    $.__views.lwin.add($.__views.listView);
    select ? $.addListener($.__views.listView, "itemclick", select) : __defers["$.__views.listView!itemclick!select"] = true;
    $.__views.__alloyId95 = Ti.UI.createButton({
        title: "To map",
        top: 0,
        right: 0,
        id: "__alloyId95"
    });
    $.__views.lwin.add($.__views.__alloyId95);
    openMapview ? $.addListener($.__views.__alloyId95, "click", openMapview) : __defers["$.__views.__alloyId95!click!openMapview"] = true;
    $.__views.bottomBar = Ti.UI.createView({
        height: "48",
        backgroundColor: "#F7F7F7",
        bottom: 0,
        id: "bottomBar"
    });
    $.__views.lwin.add($.__views.bottomBar);
    $.__views.__alloyId96 = Ti.UI.createButton({
        title: "Filter",
        color: "#43B02A",
        right: 5,
        backgroundColor: "#F7F7F7",
        id: "__alloyId96"
    });
    $.__views.bottomBar.add($.__views.__alloyId96);
    filter ? $.addListener($.__views.__alloyId96, "click", filter) : __defers["$.__views.__alloyId96!click!filter"] = true;
    $.__views.__alloyId97 = Ti.UI.createButton({
        title: "Sort",
        color: "#43B02A",
        left: 5,
        backgroundColor: "#F7F7F7",
        id: "__alloyId97"
    });
    $.__views.bottomBar.add($.__views.__alloyId97);
    openSortView ? $.addListener($.__views.__alloyId97, "click", openSortView) : __defers["$.__views.__alloyId97!click!openSortView"] = true;
    exports.destroy = function() {
        __alloyId92 && __alloyId92.off("fetch destroy change add remove reset", __alloyId93);
    };
    _.extend($, $.__views);
    var moment = require("alloy/moment");
    !function() {
        "use strict";
        Titanium.Network.networkType == Titanium.Network.NETWORK_NONE ? alert("Your device is not online. Please check your network and try again.") : refresh();
    }(arguments[0] || {});
    Alloy.Globals.transform = transform;
    $.search.addEventListener("cancel", function() {
        $.search.blur();
    });
    __defers["$.__views.refreshControl!refreshstart!refresh"] && $.addListener($.__views.refreshControl, "refreshstart", refresh);
    __defers["$.__views.listView!itemclick!select"] && $.addListener($.__views.listView, "itemclick", select);
    __defers["$.__views.__alloyId95!click!openMapview"] && $.addListener($.__views.__alloyId95, "click", openMapview);
    __defers["$.__views.__alloyId96!click!filter"] && $.addListener($.__views.__alloyId96, "click", filter);
    __defers["$.__views.__alloyId97!click!openSortView"] && $.addListener($.__views.__alloyId97, "click", openSortView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;