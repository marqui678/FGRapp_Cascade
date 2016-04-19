function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId36(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId36.opts || {};
        var models = __alloyId35.models;
        var len = models.length;
        var __alloyId31 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId32 = models[i];
            __alloyId32.__transform = transform(__alloyId32);
            var __alloyId34 = {
                properties: {
                    itemId: "undefined" != typeof __alloyId32.__transform["link"] ? __alloyId32.__transform["link"] : __alloyId32.get("link")
                },
                title: {
                    text: "undefined" != typeof __alloyId32.__transform["title"] ? __alloyId32.__transform["title"] : __alloyId32.get("title")
                },
                pace: {
                    text: "undefined" != typeof __alloyId32.__transform["pace"] ? __alloyId32.__transform["pace"] : __alloyId32.get("pace")
                },
                startDateTime: {
                    text: "undefined" != typeof __alloyId32.__transform["startDateTime"] ? __alloyId32.__transform["startDateTime"] : __alloyId32.get("startDateTime")
                },
                distance: {
                    text: "undefined" != typeof __alloyId32.__transform["distance"] ? __alloyId32.__transform["distance"] : __alloyId32.get("distance")
                }
            };
            __alloyId31.push(__alloyId34);
        }
        opts.animation ? $.__views.__alloyId30.setItems(__alloyId31, opts.animation) : $.__views.__alloyId30.setItems(__alloyId31);
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
    var __alloyId16 = {};
    var __alloyId19 = [];
    var __alloyId20 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId21 = [];
            var __alloyId22 = {
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
            __alloyId21.push(__alloyId22);
            var __alloyId23 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId24 = [];
                    var __alloyId25 = {
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
                    __alloyId24.push(__alloyId25);
                    var __alloyId26 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId27 = [];
                            var __alloyId28 = {
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
                            __alloyId27.push(__alloyId28);
                            var __alloyId29 = {
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
                            __alloyId27.push(__alloyId29);
                            return __alloyId27;
                        }(),
                        properties: {
                            left: 0,
                            right: 0,
                            layout: "horizontal"
                        }
                    };
                    __alloyId24.push(__alloyId26);
                    return __alloyId24;
                }(),
                properties: {
                    left: 0,
                    right: 0,
                    layout: "horizontal"
                }
            };
            __alloyId21.push(__alloyId23);
            return __alloyId21;
        }(),
        properties: {
            left: 0,
            right: 0,
            top: 5,
            layout: "horizontal"
        }
    };
    __alloyId19.push(__alloyId20);
    var __alloyId18 = {
        properties: {
            left: 0,
            right: 0,
            height: 80,
            name: "template"
        },
        childTemplates: __alloyId19
    };
    __alloyId16["template"] = __alloyId18;
    $.__views.__alloyId30 = Ti.UI.createListSection({
        id: "__alloyId30"
    });
    var __alloyId35 = Alloy.Collections["feed"] || feed;
    __alloyId35.on("fetch destroy change add remove reset", __alloyId36);
    var __alloyId37 = [];
    __alloyId37.push($.__views.__alloyId30);
    $.__views.__alloyId15 = Ti.UI.createListView({
        sections: __alloyId37,
        templates: __alloyId16,
        refreshControl: $.__views.refreshControl,
        defaultItemTemplate: "template",
        id: "__alloyId15"
    });
    $.__views.list.add($.__views.__alloyId15);
    select ? $.addListener($.__views.__alloyId15, "itemclick", select) : __defers["$.__views.__alloyId15!itemclick!select"] = true;
    $.__views.__alloyId38 = Ti.UI.createButton({
        title: "To map",
        top: "0",
        right: "0",
        id: "__alloyId38"
    });
    $.__views.list.add($.__views.__alloyId38);
    openMapview ? $.addListener($.__views.__alloyId38, "click", openMapview) : __defers["$.__views.__alloyId38!click!openMapview"] = true;
    $.__views.__alloyId39 = Ti.UI.createButton({
        title: "Filter",
        bottom: "0",
        right: "0",
        id: "__alloyId39"
    });
    $.__views.list.add($.__views.__alloyId39);
    filter ? $.addListener($.__views.__alloyId39, "click", filter) : __defers["$.__views.__alloyId39!click!filter"] = true;
    exports.destroy = function() {
        __alloyId35.off("fetch destroy change add remove reset", __alloyId36);
    };
    _.extend($, $.__views);
    var moment = require("alloy/moment");
    !function() {
        "use strict";
        refresh();
    }(arguments[0] || {});
    __defers["$.__views.refreshControl!refreshstart!refresh"] && $.addListener($.__views.refreshControl, "refreshstart", refresh);
    __defers["$.__views.__alloyId15!itemclick!select"] && $.addListener($.__views.__alloyId15, "itemclick", select);
    __defers["$.__views.__alloyId38!click!openMapview"] && $.addListener($.__views.__alloyId38, "click", openMapview);
    __defers["$.__views.__alloyId39!click!filter"] && $.addListener($.__views.__alloyId39, "click", filter);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;