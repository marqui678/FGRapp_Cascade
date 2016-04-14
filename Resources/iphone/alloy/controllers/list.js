function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId26(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId26.opts || {};
        var models = __alloyId25.models;
        var len = models.length;
        var __alloyId21 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId22 = models[i];
            __alloyId22.__transform = transform(__alloyId22);
            var __alloyId24 = {
                properties: {
                    itemId: "undefined" != typeof __alloyId22.__transform["link"] ? __alloyId22.__transform["link"] : __alloyId22.get("link")
                },
                title: {
                    text: "undefined" != typeof __alloyId22.__transform["title"] ? __alloyId22.__transform["title"] : __alloyId22.get("title")
                },
                pace: {
                    text: "undefined" != typeof __alloyId22.__transform["pace"] ? __alloyId22.__transform["pace"] : __alloyId22.get("pace")
                },
                startDateTime: {
                    text: "undefined" != typeof __alloyId22.__transform["startDateTime"] ? __alloyId22.__transform["startDateTime"] : __alloyId22.get("startDateTime")
                },
                distance: {
                    text: "undefined" != typeof __alloyId22.__transform["distance"] ? __alloyId22.__transform["distance"] : __alloyId22.get("distance")
                }
            };
            __alloyId21.push(__alloyId24);
        }
        opts.animation ? $.__views.__alloyId20.setItems(__alloyId21, opts.animation) : $.__views.__alloyId20.setItems(__alloyId21);
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
            startDateTime: moment(model.get("fgrrss:startDateTime"), moment.ISO_8601).format("LLLL"),
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
        Ti.API.log("Click on list");
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
    var __alloyId6 = {};
    var __alloyId9 = [];
    var __alloyId10 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId11 = [];
            var __alloyId12 = {
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
            __alloyId11.push(__alloyId12);
            var __alloyId13 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId14 = [];
                    var __alloyId15 = {
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
                    __alloyId14.push(__alloyId15);
                    var __alloyId16 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId17 = [];
                            var __alloyId18 = {
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
                            __alloyId17.push(__alloyId18);
                            var __alloyId19 = {
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
                            __alloyId17.push(__alloyId19);
                            return __alloyId17;
                        }(),
                        properties: {
                            left: 0,
                            right: 0,
                            layout: "horizontal"
                        }
                    };
                    __alloyId14.push(__alloyId16);
                    return __alloyId14;
                }(),
                properties: {
                    left: 0,
                    right: 0,
                    layout: "horizontal"
                }
            };
            __alloyId11.push(__alloyId13);
            return __alloyId11;
        }(),
        properties: {
            left: 0,
            right: 0,
            top: 5,
            layout: "horizontal"
        }
    };
    __alloyId9.push(__alloyId10);
    var __alloyId8 = {
        properties: {
            left: 0,
            right: 0,
            height: 80,
            name: "template"
        },
        childTemplates: __alloyId9
    };
    __alloyId6["template"] = __alloyId8;
    $.__views.__alloyId20 = Ti.UI.createListSection({
        id: "__alloyId20"
    });
    var __alloyId25 = Alloy.Collections["feed"] || feed;
    __alloyId25.on("fetch destroy change add remove reset", __alloyId26);
    var __alloyId27 = [];
    __alloyId27.push($.__views.__alloyId20);
    $.__views.__alloyId5 = Ti.UI.createListView({
        sections: __alloyId27,
        templates: __alloyId6,
        refreshControl: $.__views.refreshControl,
        defaultItemTemplate: "template",
        id: "__alloyId5"
    });
    $.__views.list.add($.__views.__alloyId5);
    select ? $.addListener($.__views.__alloyId5, "itemclick", select) : __defers["$.__views.__alloyId5!itemclick!select"] = true;
    $.__views.__alloyId28 = Ti.UI.createButton({
        title: "To map",
        top: "0",
        right: "0",
        id: "__alloyId28"
    });
    $.__views.list.add($.__views.__alloyId28);
    openMapview ? $.addListener($.__views.__alloyId28, "click", openMapview) : __defers["$.__views.__alloyId28!click!openMapview"] = true;
    $.__views.__alloyId29 = Ti.UI.createButton({
        title: "Filter",
        bottom: "0",
        right: "0",
        id: "__alloyId29"
    });
    $.__views.list.add($.__views.__alloyId29);
    filter ? $.addListener($.__views.__alloyId29, "click", filter) : __defers["$.__views.__alloyId29!click!filter"] = true;
    exports.destroy = function() {
        __alloyId25.off("fetch destroy change add remove reset", __alloyId26);
    };
    _.extend($, $.__views);
    var moment = require("alloy/moment");
    !function() {
        "use strict";
        refresh();
    }(arguments[0] || {});
    __defers["$.__views.refreshControl!refreshstart!refresh"] && $.addListener($.__views.refreshControl, "refreshstart", refresh);
    __defers["$.__views.__alloyId5!itemclick!select"] && $.addListener($.__views.__alloyId5, "itemclick", select);
    __defers["$.__views.__alloyId28!click!openMapview"] && $.addListener($.__views.__alloyId28, "click", openMapview);
    __defers["$.__views.__alloyId29!click!filter"] && $.addListener($.__views.__alloyId29, "click", filter);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;