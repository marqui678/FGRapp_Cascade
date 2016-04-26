function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId37(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId37.opts || {};
        var models = __alloyId36.models;
        var len = models.length;
        var __alloyId32 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId33 = models[i];
            __alloyId33.__transform = transform(__alloyId33);
            var __alloyId35 = {
                properties: {
                    itemId: _.template("{m.link}", {
                        m: __alloyId33.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                title: {
                    text: _.template("{m.title}", {
                        m: __alloyId33.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                pace: {
                    text: _.template("{m.pace}", {
                        m: __alloyId33.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                startDateTime: {
                    text: _.template("{m.startDateTime}", {
                        m: __alloyId33.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                distance: {
                    text: _.template("{m.distance}", {
                        m: __alloyId33.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                }
            };
            __alloyId32.push(__alloyId35);
        }
        opts.animation ? $.__views.__alloyId31.setItems(__alloyId32, opts.animation) : $.__views.__alloyId31.setItems(__alloyId32);
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
    var __alloyId17 = {};
    var __alloyId20 = [];
    var __alloyId21 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId22 = [];
            var __alloyId23 = {
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
            __alloyId22.push(__alloyId23);
            var __alloyId24 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId25 = [];
                    var __alloyId26 = {
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
                    __alloyId25.push(__alloyId26);
                    var __alloyId27 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId28 = [];
                            var __alloyId29 = {
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
                            __alloyId28.push(__alloyId29);
                            var __alloyId30 = {
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
                            __alloyId28.push(__alloyId30);
                            return __alloyId28;
                        }(),
                        properties: {
                            left: 0,
                            right: 0,
                            layout: "horizontal"
                        }
                    };
                    __alloyId25.push(__alloyId27);
                    return __alloyId25;
                }(),
                properties: {
                    left: 0,
                    right: 0,
                    layout: "horizontal"
                }
            };
            __alloyId22.push(__alloyId24);
            return __alloyId22;
        }(),
        properties: {
            left: 0,
            right: 0,
            top: 5,
            layout: "horizontal"
        }
    };
    __alloyId20.push(__alloyId21);
    var __alloyId19 = {
        properties: {
            left: 0,
            right: 0,
            height: 80,
            name: "template"
        },
        childTemplates: __alloyId20
    };
    __alloyId17["template"] = __alloyId19;
    $.__views.__alloyId31 = Ti.UI.createListSection({
        id: "__alloyId31"
    });
    var __alloyId36 = Alloy.Collections["feed"] || feed;
    __alloyId36.on("fetch destroy change add remove reset", __alloyId37);
    var __alloyId38 = [];
    __alloyId38.push($.__views.__alloyId31);
    $.__views.__alloyId16 = Ti.UI.createListView({
        sections: __alloyId38,
        templates: __alloyId17,
        refreshControl: $.__views.refreshControl,
        defaultItemTemplate: "template",
        id: "__alloyId16"
    });
    $.__views.list.add($.__views.__alloyId16);
    select ? $.addListener($.__views.__alloyId16, "itemclick", select) : __defers["$.__views.__alloyId16!itemclick!select"] = true;
    $.__views.__alloyId39 = Ti.UI.createButton({
        title: "To map",
        top: 0,
        right: 0,
        id: "__alloyId39"
    });
    $.__views.list.add($.__views.__alloyId39);
    openMapview ? $.addListener($.__views.__alloyId39, "click", openMapview) : __defers["$.__views.__alloyId39!click!openMapview"] = true;
    $.__views.__alloyId40 = Ti.UI.createButton({
        title: "Filter",
        bottom: 0,
        right: 0,
        id: "__alloyId40"
    });
    $.__views.list.add($.__views.__alloyId40);
    filter ? $.addListener($.__views.__alloyId40, "click", filter) : __defers["$.__views.__alloyId40!click!filter"] = true;
    exports.destroy = function() {
        __alloyId36 && __alloyId36.off("fetch destroy change add remove reset", __alloyId37);
    };
    _.extend($, $.__views);
    var moment = require("alloy/moment");
    !function() {
        "use strict";
        refresh();
    }(arguments[0] || {});
    Alloy.Globals.transform = transform;
    __defers["$.__views.refreshControl!refreshstart!refresh"] && $.addListener($.__views.refreshControl, "refreshstart", refresh);
    __defers["$.__views.__alloyId16!itemclick!select"] && $.addListener($.__views.__alloyId16, "itemclick", select);
    __defers["$.__views.__alloyId39!click!openMapview"] && $.addListener($.__views.__alloyId39, "click", openMapview);
    __defers["$.__views.__alloyId40!click!filter"] && $.addListener($.__views.__alloyId40, "click", filter);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;