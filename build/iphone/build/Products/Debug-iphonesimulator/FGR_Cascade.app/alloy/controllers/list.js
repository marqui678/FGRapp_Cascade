function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId38(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId38.opts || {};
        var models = __alloyId37.models;
        var len = models.length;
        var __alloyId33 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId34 = models[i];
            __alloyId34.__transform = transform(__alloyId34);
            var __alloyId36 = {
                properties: {
                    itemId: _.template("{m.link}", {
                        m: __alloyId34.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                title: {
                    text: _.template("{m.title}", {
                        m: __alloyId34.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                pace: {
                    text: _.template("{m.pace}", {
                        m: __alloyId34.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                startDateTime: {
                    text: _.template("{m.startDateTime}", {
                        m: __alloyId34.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                distance: {
                    text: _.template("{m.distance}", {
                        m: __alloyId34.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                }
            };
            __alloyId33.push(__alloyId36);
        }
        opts.animation ? $.__views.__alloyId32.setItems(__alloyId33, opts.animation) : $.__views.__alloyId32.setItems(__alloyId33);
    }
    function refresh(e) {
        "use strict";
        function afterFetch() {
            $.refreshControl.endRefreshing();
        }
        true && !e && $.refreshControl.beginRefreshing();
        var url = Alloy.CFG.url;
        for (var i = 0; 2 > i; i++) console.log(i);
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
            pace: model.get("fgrrss:pace"),
            distance: model.get("fgrrss:distance")
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
    $.__views.list = Ti.UI.createWindow({
        barColor: "#CD1625",
        backgroundColor: "#FFF",
        navTintColor: "#FFF",
        translucent: false,
        titleAttributes: {
            color: "#FFF"
        },
        title: "Free Group Rides",
        id: "list"
    });
    $.__views.list && $.addTopLevelView($.__views.list);
    $.__views.refreshControl = Ti.UI.createRefreshControl({
        id: "refreshControl"
    });
    refresh ? $.addListener($.__views.refreshControl, "refreshstart", refresh) : __defers["$.__views.refreshControl!refreshstart!refresh"] = true;
    var __alloyId18 = {};
    var __alloyId21 = [];
    var __alloyId22 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId23 = [];
            var __alloyId24 = {
                type: "Ti.UI.Label",
                bindId: "title",
                properties: {
                    color: "black",
                    left: 0,
                    right: 0,
                    font: {
                        fontSize: 16
                    },
                    bindId: "title"
                }
            };
            __alloyId23.push(__alloyId24);
            var __alloyId25 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId26 = [];
                    var __alloyId27 = {
                        type: "Ti.UI.Label",
                        bindId: "pace",
                        properties: {
                            color: "red",
                            left: 0,
                            right: 0,
                            font: {
                                fontSize: 13
                            },
                            bindId: "pace"
                        }
                    };
                    __alloyId26.push(__alloyId27);
                    var __alloyId28 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId29 = [];
                            var __alloyId30 = {
                                type: "Ti.UI.Label",
                                bindId: "startDateTime",
                                properties: {
                                    color: "blue",
                                    left: 0,
                                    right: 0,
                                    font: {
                                        fontSize: 13
                                    },
                                    bindId: "startDateTime"
                                }
                            };
                            __alloyId29.push(__alloyId30);
                            var __alloyId31 = {
                                type: "Ti.UI.Label",
                                bindId: "distance",
                                properties: {
                                    color: "green",
                                    left: 0,
                                    right: 0,
                                    font: {
                                        fontSize: 13
                                    },
                                    textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
                                    bindId: "distance"
                                }
                            };
                            __alloyId29.push(__alloyId31);
                            return __alloyId29;
                        }(),
                        properties: {
                            left: 0,
                            right: 0,
                            layout: "horizontal"
                        }
                    };
                    __alloyId26.push(__alloyId28);
                    return __alloyId26;
                }(),
                properties: {
                    left: 0,
                    right: 0,
                    layout: "horizontal"
                }
            };
            __alloyId23.push(__alloyId25);
            return __alloyId23;
        }(),
        properties: {
            left: 0,
            right: 0,
            top: 5,
            layout: "horizontal"
        }
    };
    __alloyId21.push(__alloyId22);
    var __alloyId20 = {
        properties: {
            left: 0,
            right: 0,
            height: 80,
            name: "template"
        },
        childTemplates: __alloyId21
    };
    __alloyId18["template"] = __alloyId20;
    $.__views.__alloyId32 = Ti.UI.createListSection({
        id: "__alloyId32"
    });
    var __alloyId37 = Alloy.Collections["feed"] || feed;
    __alloyId37.on("fetch destroy change add remove reset", __alloyId38);
    var __alloyId39 = [];
    __alloyId39.push($.__views.__alloyId32);
    $.__views.__alloyId17 = Ti.UI.createListView({
        sections: __alloyId39,
        templates: __alloyId18,
        refreshControl: $.__views.refreshControl,
        defaultItemTemplate: "template",
        id: "__alloyId17"
    });
    $.__views.list.add($.__views.__alloyId17);
    select ? $.addListener($.__views.__alloyId17, "itemclick", select) : __defers["$.__views.__alloyId17!itemclick!select"] = true;
    $.__views.__alloyId40 = Ti.UI.createButton({
        title: "To map",
        top: 0,
        right: 0,
        id: "__alloyId40"
    });
    $.__views.list.add($.__views.__alloyId40);
    openMapview ? $.addListener($.__views.__alloyId40, "click", openMapview) : __defers["$.__views.__alloyId40!click!openMapview"] = true;
    $.__views.__alloyId41 = Ti.UI.createButton({
        title: "Filter",
        bottom: 0,
        right: 0,
        id: "__alloyId41"
    });
    $.__views.list.add($.__views.__alloyId41);
    filter ? $.addListener($.__views.__alloyId41, "click", filter) : __defers["$.__views.__alloyId41!click!filter"] = true;
    exports.destroy = function() {
        __alloyId37 && __alloyId37.off("fetch destroy change add remove reset", __alloyId38);
    };
    _.extend($, $.__views);
    var moment = require("alloy/moment");
    !function() {
        "use strict";
        refresh();
    }(arguments[0] || {});
    Alloy.Globals.transform = transform;
    __defers["$.__views.refreshControl!refreshstart!refresh"] && $.addListener($.__views.refreshControl, "refreshstart", refresh);
    __defers["$.__views.__alloyId17!itemclick!select"] && $.addListener($.__views.__alloyId17, "itemclick", select);
    __defers["$.__views.__alloyId40!click!openMapview"] && $.addListener($.__views.__alloyId40, "click", openMapview);
    __defers["$.__views.__alloyId41!click!filter"] && $.addListener($.__views.__alloyId41, "click", filter);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;