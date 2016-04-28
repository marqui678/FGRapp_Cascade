function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId21() {
        $.__views.list.removeEventListener("open", __alloyId21);
        if ($.__views.list.activity) $.__views.list.activity.onCreateOptionsMenu = function(e) {
            var __alloyId20 = {
                icon: "images/ic_action_action_autorenew.png",
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                id: "__alloyId19"
            };
            $.__views.__alloyId19 = e.menu.add(_.pick(__alloyId20, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId19.applyProperties(_.omit(__alloyId20, Alloy.Android.menuItemCreateArgs));
            $.__alloyId19 = $.__views.__alloyId19;
            refresh ? $.addListener($.__views.__alloyId19, "click", refresh) : __defers["$.__views.__alloyId19!click!refresh"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function __alloyId43(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId43.opts || {};
        var models = __alloyId42.models;
        var len = models.length;
        var __alloyId38 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId39 = models[i];
            __alloyId39.__transform = transform(__alloyId39);
            var __alloyId41 = {
                properties: {
                    itemId: _.template("{m.link}", {
                        m: __alloyId39.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                title: {
                    text: _.template("{m.title}", {
                        m: __alloyId39.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                pace: {
                    text: _.template("{m.pace}", {
                        m: __alloyId39.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                startDateTime: {
                    text: _.template("{m.startDateTime}", {
                        m: __alloyId39.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                distance: {
                    text: _.template("{m.distance}", {
                        m: __alloyId39.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                }
            };
            __alloyId38.push(__alloyId41);
        }
        opts.animation ? $.__views.__alloyId37.setItems(__alloyId38, opts.animation) : $.__views.__alloyId37.setItems(__alloyId38);
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
            startDateTime: moment(model.get("startDateTime"), moment.ISO_8601).format("LLLL"),
            link: model.get("link"),
            pace: model.get("fgrrss:pace"),
            distance: model.get("fgrrss:distance").toFixed(2) + " miles"
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
    $.__views.list = Ti.UI.createWindow({
        barColor: "#CD1625",
        backgroundColor: "#FFF",
        title: "Free Group Rides",
        id: "list"
    });
    $.__views.list && $.addTopLevelView($.__views.list);
    $.__views.list.addEventListener("open", __alloyId21);
    var __alloyId23 = {};
    var __alloyId26 = [];
    var __alloyId27 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId28 = [];
            var __alloyId29 = {
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
            __alloyId28.push(__alloyId29);
            var __alloyId30 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId31 = [];
                    var __alloyId32 = {
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
                    __alloyId31.push(__alloyId32);
                    var __alloyId33 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId34 = [];
                            var __alloyId35 = {
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
                            __alloyId34.push(__alloyId35);
                            var __alloyId36 = {
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
                            __alloyId34.push(__alloyId36);
                            return __alloyId34;
                        }(),
                        properties: {
                            left: 0,
                            right: 0,
                            layout: "horizontal"
                        }
                    };
                    __alloyId31.push(__alloyId33);
                    return __alloyId31;
                }(),
                properties: {
                    left: 0,
                    right: 0,
                    layout: "horizontal"
                }
            };
            __alloyId28.push(__alloyId30);
            return __alloyId28;
        }(),
        properties: {
            left: 0,
            right: 0,
            top: 5,
            layout: "horizontal"
        }
    };
    __alloyId26.push(__alloyId27);
    var __alloyId25 = {
        properties: {
            left: 0,
            right: 0,
            height: 80,
            name: "template"
        },
        childTemplates: __alloyId26
    };
    __alloyId23["template"] = __alloyId25;
    $.__views.__alloyId37 = Ti.UI.createListSection({
        id: "__alloyId37"
    });
    var __alloyId42 = Alloy.Collections["feed"] || feed;
    __alloyId42.on("fetch destroy change add remove reset", __alloyId43);
    var __alloyId44 = [];
    __alloyId44.push($.__views.__alloyId37);
    $.__views.__alloyId22 = Ti.UI.createListView({
        sections: __alloyId44,
        templates: __alloyId23,
        defaultItemTemplate: "template",
        id: "__alloyId22"
    });
    $.__views.list.add($.__views.__alloyId22);
    select ? $.addListener($.__views.__alloyId22, "itemclick", select) : __defers["$.__views.__alloyId22!itemclick!select"] = true;
    $.__views.__alloyId45 = Ti.UI.createButton({
        title: "To map",
        top: 0,
        right: 0,
        id: "__alloyId45"
    });
    $.__views.list.add($.__views.__alloyId45);
    openMapview ? $.addListener($.__views.__alloyId45, "click", openMapview) : __defers["$.__views.__alloyId45!click!openMapview"] = true;
    $.__views.__alloyId46 = Ti.UI.createButton({
        title: "Filter",
        bottom: 0,
        right: 0,
        id: "__alloyId46"
    });
    $.__views.list.add($.__views.__alloyId46);
    filter ? $.addListener($.__views.__alloyId46, "click", filter) : __defers["$.__views.__alloyId46!click!filter"] = true;
    $.__views.__alloyId47 = Ti.UI.createButton({
        title: "Sort",
        bottom: 0,
        left: 0,
        id: "__alloyId47"
    });
    $.__views.list.add($.__views.__alloyId47);
    openSortView ? $.addListener($.__views.__alloyId47, "click", openSortView) : __defers["$.__views.__alloyId47!click!openSortView"] = true;
    exports.destroy = function() {
        __alloyId42 && __alloyId42.off("fetch destroy change add remove reset", __alloyId43);
    };
    _.extend($, $.__views);
    var moment = require("alloy/moment");
    !function() {
        "use strict";
        refresh();
    }(arguments[0] || {});
    Alloy.Globals.transform = transform;
    __defers["$.__views.__alloyId19!click!refresh"] && $.addListener($.__views.__alloyId19, "click", refresh);
    __defers["$.__views.__alloyId22!itemclick!select"] && $.addListener($.__views.__alloyId22, "itemclick", select);
    __defers["$.__views.__alloyId45!click!openMapview"] && $.addListener($.__views.__alloyId45, "click", openMapview);
    __defers["$.__views.__alloyId46!click!filter"] && $.addListener($.__views.__alloyId46, "click", filter);
    __defers["$.__views.__alloyId47!click!openSortView"] && $.addListener($.__views.__alloyId47, "click", openSortView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;