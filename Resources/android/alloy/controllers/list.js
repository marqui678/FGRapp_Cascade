function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId17() {
        $.__views.list.removeEventListener("open", __alloyId17);
        if ($.__views.list.activity) $.__views.list.activity.onCreateOptionsMenu = function(e) {
            var __alloyId16 = {
                icon: "images/ic_action_action_autorenew.png",
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                id: "__alloyId15"
            };
            $.__views.__alloyId15 = e.menu.add(_.pick(__alloyId16, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId15.applyProperties(_.omit(__alloyId16, Alloy.Android.menuItemCreateArgs));
            $.__alloyId15 = $.__views.__alloyId15;
            refresh ? $.addListener($.__views.__alloyId15, "click", refresh) : __defers["$.__views.__alloyId15!click!refresh"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function __alloyId39(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId39.opts || {};
        var models = __alloyId38.models;
        var len = models.length;
        var __alloyId34 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId35 = models[i];
            __alloyId35.__transform = transform(__alloyId35);
            var __alloyId37 = {
                properties: {
                    itemId: "undefined" != typeof __alloyId35.__transform["link"] ? __alloyId35.__transform["link"] : __alloyId35.get("link")
                },
                title: {
                    text: "undefined" != typeof __alloyId35.__transform["title"] ? __alloyId35.__transform["title"] : __alloyId35.get("title")
                },
                pace: {
                    text: "undefined" != typeof __alloyId35.__transform["pace"] ? __alloyId35.__transform["pace"] : __alloyId35.get("pace")
                },
                startDateTime: {
                    text: "undefined" != typeof __alloyId35.__transform["startDateTime"] ? __alloyId35.__transform["startDateTime"] : __alloyId35.get("startDateTime")
                },
                distance: {
                    text: "undefined" != typeof __alloyId35.__transform["distance"] ? __alloyId35.__transform["distance"] : __alloyId35.get("distance")
                }
            };
            __alloyId34.push(__alloyId37);
        }
        opts.animation ? $.__views.__alloyId33.setItems(__alloyId34, opts.animation) : $.__views.__alloyId33.setItems(__alloyId34);
    }
    function refresh(e) {
        "use strict";
        function afterFetch() {}
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
        title: "Free Group Rides",
        id: "list"
    });
    $.__views.list && $.addTopLevelView($.__views.list);
    $.__views.list.addEventListener("open", __alloyId17);
    var __alloyId19 = {};
    var __alloyId22 = [];
    var __alloyId23 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId24 = [];
            var __alloyId25 = {
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
            __alloyId24.push(__alloyId25);
            var __alloyId26 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId27 = [];
                    var __alloyId28 = {
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
                    __alloyId27.push(__alloyId28);
                    var __alloyId29 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId30 = [];
                            var __alloyId31 = {
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
                            __alloyId30.push(__alloyId31);
                            var __alloyId32 = {
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
                            __alloyId30.push(__alloyId32);
                            return __alloyId30;
                        }(),
                        properties: {
                            left: 0,
                            right: 0,
                            layout: "horizontal"
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
            top: 5,
            layout: "horizontal"
        }
    };
    __alloyId22.push(__alloyId23);
    var __alloyId21 = {
        properties: {
            left: 0,
            right: 0,
            height: 80,
            name: "template"
        },
        childTemplates: __alloyId22
    };
    __alloyId19["template"] = __alloyId21;
    $.__views.__alloyId33 = Ti.UI.createListSection({
        id: "__alloyId33"
    });
    var __alloyId38 = Alloy.Collections["feed"] || feed;
    __alloyId38.on("fetch destroy change add remove reset", __alloyId39);
    var __alloyId40 = [];
    __alloyId40.push($.__views.__alloyId33);
    $.__views.__alloyId18 = Ti.UI.createListView({
        sections: __alloyId40,
        templates: __alloyId19,
        defaultItemTemplate: "template",
        id: "__alloyId18"
    });
    $.__views.list.add($.__views.__alloyId18);
    select ? $.addListener($.__views.__alloyId18, "itemclick", select) : __defers["$.__views.__alloyId18!itemclick!select"] = true;
    $.__views.__alloyId41 = Ti.UI.createButton({
        title: "To map",
        top: "0",
        right: "0",
        id: "__alloyId41"
    });
    $.__views.list.add($.__views.__alloyId41);
    openMapview ? $.addListener($.__views.__alloyId41, "click", openMapview) : __defers["$.__views.__alloyId41!click!openMapview"] = true;
    $.__views.__alloyId42 = Ti.UI.createButton({
        title: "Filter",
        bottom: "0",
        right: "0",
        id: "__alloyId42"
    });
    $.__views.list.add($.__views.__alloyId42);
    filter ? $.addListener($.__views.__alloyId42, "click", filter) : __defers["$.__views.__alloyId42!click!filter"] = true;
    exports.destroy = function() {
        __alloyId38.off("fetch destroy change add remove reset", __alloyId39);
    };
    _.extend($, $.__views);
    var moment = require("alloy/moment");
    !function() {
        "use strict";
        refresh();
    }(arguments[0] || {});
    __defers["$.__views.__alloyId15!click!refresh"] && $.addListener($.__views.__alloyId15, "click", refresh);
    __defers["$.__views.__alloyId18!itemclick!select"] && $.addListener($.__views.__alloyId18, "itemclick", select);
    __defers["$.__views.__alloyId41!click!openMapview"] && $.addListener($.__views.__alloyId41, "click", openMapview);
    __defers["$.__views.__alloyId42!click!filter"] && $.addListener($.__views.__alloyId42, "click", filter);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;