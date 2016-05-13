function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId57(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId57.opts || {};
        var models = __alloyId56.models;
        var len = models.length;
        var __alloyId52 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId53 = models[i];
            __alloyId53.__transform = transform(__alloyId53);
            var __alloyId55 = {
                properties: {
                    itemId: _.template("{m.link}", {
                        m: __alloyId53.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    }),
                    searchableText: _.template("{m.title}", {
                        m: __alloyId53.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                distanceTwo: {
                    text: _.template("{m.distanceTwo}", {
                        m: __alloyId53.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                title: {
                    text: _.template("{m.title}", {
                        m: __alloyId53.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                pace: {
                    text: _.template("{m.pace}", {
                        m: __alloyId53.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                paceNumber: {
                    text: _.template("{m.paceNumber}", {
                        m: __alloyId53.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                startDateTime: {
                    text: _.template("{m.startDateTime}", {
                        m: __alloyId53.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                distanceOne: {
                    text: _.template("{m.distanceOne}", {
                        m: __alloyId53.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                }
            };
            __alloyId52.push(__alloyId55);
        }
        opts.animation ? $.__views.listSection.setItems(__alloyId52, opts.animation) : $.__views.listSection.setItems(__alloyId52);
    }
    function refresh(e) {
        "use strict";
        function afterFetch() {
            $.refreshControl.endRefreshing();
        }
        true && !e && $.refreshControl.beginRefreshing();
        var url = Alloy.CFG.url;
        Alloy.Collections.feed.fetch({
            url: url,
            success: afterFetch,
            error: afterFetch
        });
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
    var __alloyId34 = {};
    var __alloyId37 = [];
    var __alloyId38 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId39 = [];
            var __alloyId40 = {
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
            __alloyId39.push(__alloyId40);
            var __alloyId41 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId42 = [];
                    var __alloyId44 = {
                        type: "Ti.UI.ImageView",
                        properties: {
                            left: 0,
                            right: 0,
                            font: {
                                fontSize: 13
                            },
                            height: "25dp",
                            top: "3dp",
                            width: 20,
                            image: "images/Date.png"
                        }
                    };
                    __alloyId42.push(__alloyId44);
                    var __alloyId45 = {
                        type: "Ti.UI.Label",
                        bindId: "startDateTime",
                        properties: {
                            color: "black",
                            left: "5dp",
                            right: 0,
                            font: {
                                fontSize: 16
                            },
                            height: "25dp",
                            top: "3dp",
                            bindId: "startDateTime"
                        }
                    };
                    __alloyId42.push(__alloyId45);
                    var __alloyId46 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId47 = [];
                            var __alloyId48 = {
                                type: "Ti.UI.Label",
                                bindId: "paceNumber",
                                properties: {
                                    color: "white",
                                    left: 0,
                                    font: {
                                        fontSize: 12
                                    },
                                    width: "25%",
                                    height: "24dp",
                                    bindId: "paceNumber",
                                    backgroundImage: "images/pace.png"
                                }
                            };
                            __alloyId47.push(__alloyId48);
                            var __alloyId49 = {
                                type: "Ti.UI.Label",
                                bindId: "pace",
                                properties: {
                                    color: "black",
                                    left: "5dp",
                                    font: {
                                        fontSize: 16
                                    },
                                    width: "35%",
                                    height: "25dp",
                                    bindId: "pace"
                                }
                            };
                            __alloyId47.push(__alloyId49);
                            var __alloyId50 = {
                                type: "Ti.UI.Label",
                                bindId: "distanceOne",
                                properties: {
                                    color: "#2C2A29",
                                    left: "5dp",
                                    font: {
                                        fontSize: 36
                                    },
                                    width: "19%",
                                    textAlign: "right",
                                    bindId: "distanceOne"
                                }
                            };
                            __alloyId47.push(__alloyId50);
                            var __alloyId51 = {
                                type: "Ti.UI.Label",
                                bindId: "distanceTwo",
                                properties: {
                                    color: "#646464",
                                    left: "5dp",
                                    font: {
                                        fontSize: 16
                                    },
                                    width: "12%",
                                    textAlign: "right",
                                    bindId: "distanceTwo"
                                }
                            };
                            __alloyId47.push(__alloyId51);
                            return __alloyId47;
                        }(),
                        properties: {
                            left: 0,
                            right: 0,
                            top: 0,
                            layout: "horizontal"
                        }
                    };
                    __alloyId42.push(__alloyId46);
                    return __alloyId42;
                }(),
                properties: {
                    left: 0,
                    right: 0,
                    layout: "horizontal"
                }
            };
            __alloyId39.push(__alloyId41);
            return __alloyId39;
        }(),
        properties: {
            left: "16dp",
            right: 0,
            layout: "horizontal"
        }
    };
    __alloyId37.push(__alloyId38);
    var __alloyId36 = {
        properties: {
            left: 0,
            right: 0,
            height: "120dp",
            layout: "vertical",
            name: "template"
        },
        childTemplates: __alloyId37
    };
    __alloyId34["template"] = __alloyId36;
    $.__views.listSection = Ti.UI.createListSection({
        id: "listSection"
    });
    var __alloyId56 = Alloy.Collections["feed"] || feed;
    __alloyId56.on("fetch destroy change add remove reset", __alloyId57);
    var __alloyId58 = [];
    __alloyId58.push($.__views.listSection);
    $.__views.listView = Ti.UI.createListView({
        sections: __alloyId58,
        templates: __alloyId34,
        refreshControl: $.__views.refreshControl,
        searchView: $.__views.search,
        id: "listView",
        defaultItemTemplate: "template"
    });
    $.__views.lwin.add($.__views.listView);
    select ? $.addListener($.__views.listView, "itemclick", select) : __defers["$.__views.listView!itemclick!select"] = true;
    $.__views.__alloyId59 = Ti.UI.createButton({
        title: "To map",
        top: 0,
        right: 0,
        id: "__alloyId59"
    });
    $.__views.lwin.add($.__views.__alloyId59);
    openMapview ? $.addListener($.__views.__alloyId59, "click", openMapview) : __defers["$.__views.__alloyId59!click!openMapview"] = true;
    $.__views.__alloyId60 = Ti.UI.createButton({
        title: "Filter",
        bottom: 0,
        right: 0,
        id: "__alloyId60"
    });
    $.__views.lwin.add($.__views.__alloyId60);
    filter ? $.addListener($.__views.__alloyId60, "click", filter) : __defers["$.__views.__alloyId60!click!filter"] = true;
    $.__views.__alloyId61 = Ti.UI.createButton({
        title: "Sort",
        bottom: 0,
        left: 0,
        id: "__alloyId61"
    });
    $.__views.lwin.add($.__views.__alloyId61);
    openSortView ? $.addListener($.__views.__alloyId61, "click", openSortView) : __defers["$.__views.__alloyId61!click!openSortView"] = true;
    exports.destroy = function() {
        __alloyId56 && __alloyId56.off("fetch destroy change add remove reset", __alloyId57);
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
    __defers["$.__views.__alloyId59!click!openMapview"] && $.addListener($.__views.__alloyId59, "click", openMapview);
    __defers["$.__views.__alloyId60!click!filter"] && $.addListener($.__views.__alloyId60, "click", filter);
    __defers["$.__views.__alloyId61!click!openSortView"] && $.addListener($.__views.__alloyId61, "click", openSortView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;