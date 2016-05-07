function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId47(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId47.opts || {};
        var models = __alloyId46.models;
        var len = models.length;
        var __alloyId42 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId43 = models[i];
            __alloyId43.__transform = transform(__alloyId43);
            var __alloyId45 = {
                properties: {
                    itemId: _.template("{m.link}", {
                        m: __alloyId43.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    }),
                    searchableText: _.template("{m.title}", {
                        m: __alloyId43.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                distanceTwo: {
                    text: _.template("{m.distanceTwo}", {
                        m: __alloyId43.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                title: {
                    text: _.template("{m.title}", {
                        m: __alloyId43.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                pace: {
                    text: _.template("{m.pace}", {
                        m: __alloyId43.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                paceNumber: {
                    text: _.template("{m.paceNumber}", {
                        m: __alloyId43.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                startDateTime: {
                    text: _.template("{m.startDateTime}", {
                        m: __alloyId43.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                distanceOne: {
                    text: _.template("{m.distanceOne}", {
                        m: __alloyId43.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                }
            };
            __alloyId42.push(__alloyId45);
        }
        opts.animation ? $.__views.listSection.setItems(__alloyId42, opts.animation) : $.__views.listSection.setItems(__alloyId42);
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
    var __alloyId24 = {};
    var __alloyId27 = [];
    var __alloyId28 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId29 = [];
            var __alloyId30 = {
                type: "Ti.UI.Label",
                bindId: "title",
                properties: {
                    color: "#006F44",
                    left: 0,
                    right: 0,
                    font: {
                        fontSize: 20
                    },
                    height: 20,
                    bindId: "title"
                }
            };
            __alloyId29.push(__alloyId30);
            var __alloyId31 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId32 = [];
                    var __alloyId34 = {
                        type: "Ti.UI.ImageView",
                        properties: {
                            left: 0,
                            right: 0,
                            font: {
                                fontSize: 13
                            },
                            width: 20,
                            image: "Date.png"
                        }
                    };
                    __alloyId32.push(__alloyId34);
                    var __alloyId35 = {
                        type: "Ti.UI.Label",
                        bindId: "startDateTime",
                        properties: {
                            color: "black",
                            left: 5,
                            right: 0,
                            font: {
                                fontSize: 16
                            },
                            bindId: "startDateTime"
                        }
                    };
                    __alloyId32.push(__alloyId35);
                    var __alloyId36 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId37 = [];
                            var __alloyId38 = {
                                type: "Ti.UI.Label",
                                bindId: "paceNumber",
                                properties: {
                                    color: "black",
                                    left: 0,
                                    font: {
                                        fontSize: 12
                                    },
                                    width: 80,
                                    height: 30,
                                    bindId: "paceNumber",
                                    backgroundImage: "pace.png"
                                }
                            };
                            __alloyId37.push(__alloyId38);
                            var __alloyId39 = {
                                type: "Ti.UI.Label",
                                bindId: "pace",
                                properties: {
                                    color: "black",
                                    left: 5,
                                    font: {
                                        fontSize: 16
                                    },
                                    width: 80,
                                    bindId: "pace"
                                }
                            };
                            __alloyId37.push(__alloyId39);
                            var __alloyId40 = {
                                type: "Ti.UI.Label",
                                bindId: "distanceOne",
                                properties: {
                                    color: "#2C2A29",
                                    left: 100,
                                    font: {
                                        fontSize: 36
                                    },
                                    bindId: "distanceOne"
                                }
                            };
                            __alloyId37.push(__alloyId40);
                            var __alloyId41 = {
                                type: "Ti.UI.Label",
                                bindId: "distanceTwo",
                                properties: {
                                    color: "#646464",
                                    left: 5,
                                    font: {
                                        fontSize: 16
                                    },
                                    bindId: "distanceTwo"
                                }
                            };
                            __alloyId37.push(__alloyId41);
                            return __alloyId37;
                        }(),
                        properties: {
                            left: 0,
                            right: 0,
                            top: 5,
                            layout: "horizontal"
                        }
                    };
                    __alloyId32.push(__alloyId36);
                    return __alloyId32;
                }(),
                properties: {
                    left: 0,
                    right: 0,
                    top: 20,
                    layout: "horizontal"
                }
            };
            __alloyId29.push(__alloyId31);
            return __alloyId29;
        }(),
        properties: {
            left: 16,
            right: 0,
            top: 21,
            layout: "horizontal"
        }
    };
    __alloyId27.push(__alloyId28);
    var __alloyId26 = {
        properties: {
            left: 0,
            right: 0,
            height: 128,
            layout: "vertical",
            name: "template"
        },
        childTemplates: __alloyId27
    };
    __alloyId24["template"] = __alloyId26;
    $.__views.listSection = Ti.UI.createListSection({
        id: "listSection"
    });
    var __alloyId46 = Alloy.Collections["feed"] || feed;
    __alloyId46.on("fetch destroy change add remove reset", __alloyId47);
    var __alloyId48 = [];
    __alloyId48.push($.__views.listSection);
    $.__views.listView = Ti.UI.createListView({
        sections: __alloyId48,
        templates: __alloyId24,
        refreshControl: $.__views.refreshControl,
        searchView: $.__views.search,
        id: "listView",
        defaultItemTemplate: "template"
    });
    $.__views.lwin.add($.__views.listView);
    select ? $.addListener($.__views.listView, "itemclick", select) : __defers["$.__views.listView!itemclick!select"] = true;
    $.__views.__alloyId49 = Ti.UI.createButton({
        title: "To map",
        top: 0,
        right: 0,
        id: "__alloyId49"
    });
    $.__views.lwin.add($.__views.__alloyId49);
    openMapview ? $.addListener($.__views.__alloyId49, "click", openMapview) : __defers["$.__views.__alloyId49!click!openMapview"] = true;
    $.__views.__alloyId50 = Ti.UI.createButton({
        title: "Filter",
        bottom: 0,
        right: 0,
        id: "__alloyId50"
    });
    $.__views.lwin.add($.__views.__alloyId50);
    filter ? $.addListener($.__views.__alloyId50, "click", filter) : __defers["$.__views.__alloyId50!click!filter"] = true;
    exports.destroy = function() {
        __alloyId46 && __alloyId46.off("fetch destroy change add remove reset", __alloyId47);
    };
    _.extend($, $.__views);
    var moment = require("alloy/moment");
    !function() {
        "use strict";
        refresh();
    }(arguments[0] || {});
    Alloy.Globals.transform = transform;
    $.search.addEventListener("cancel", function() {
        $.search.blur();
    });
    __defers["$.__views.refreshControl!refreshstart!refresh"] && $.addListener($.__views.refreshControl, "refreshstart", refresh);
    __defers["$.__views.listView!itemclick!select"] && $.addListener($.__views.listView, "itemclick", select);
    __defers["$.__views.__alloyId49!click!openMapview"] && $.addListener($.__views.__alloyId49, "click", openMapview);
    __defers["$.__views.__alloyId50!click!filter"] && $.addListener($.__views.__alloyId50, "click", filter);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;