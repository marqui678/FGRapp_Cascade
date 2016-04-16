function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId7() {
        $.__views.list.removeEventListener("open", __alloyId7);
        if ($.__views.list.activity) $.__views.list.activity.onCreateOptionsMenu = function(e) {
            var __alloyId6 = {
                icon: "images/ic_action_action_autorenew.png",
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                id: "__alloyId5"
            };
            $.__views.__alloyId5 = e.menu.add(_.pick(__alloyId6, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId5.applyProperties(_.omit(__alloyId6, Alloy.Android.menuItemCreateArgs));
            $.__alloyId5 = $.__views.__alloyId5;
            refresh ? $.addListener($.__views.__alloyId5, "click", refresh) : __defers["$.__views.__alloyId5!click!refresh"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function __alloyId29(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId29.opts || {};
        var models = __alloyId28.models;
        var len = models.length;
        var __alloyId24 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId25 = models[i];
            __alloyId25.__transform = transform(__alloyId25);
            var __alloyId27 = {
                properties: {
                    itemId: _.template("{m.link}", {
                        m: __alloyId25.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                title: {
                    text: _.template("{m.title}", {
                        m: __alloyId25.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                pace: {
                    text: _.template("{m.pace}", {
                        m: __alloyId25.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                startDateTime: {
                    text: _.template("{m.startDateTime}", {
                        m: __alloyId25.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                distance: {
                    text: _.template("{m.distance}", {
                        m: __alloyId25.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                }
            };
            __alloyId24.push(__alloyId27);
        }
        opts.animation ? $.__views.__alloyId23.setItems(__alloyId24, opts.animation) : $.__views.__alloyId23.setItems(__alloyId24);
    }
    function refresh(e) {
        "use strict";
        function afterFetch() {}
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
    $.__views.list.addEventListener("open", __alloyId7);
    var __alloyId9 = {};
    var __alloyId12 = [];
    var __alloyId13 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId14 = [];
            var __alloyId15 = {
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
            __alloyId14.push(__alloyId15);
            var __alloyId16 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId17 = [];
                    var __alloyId18 = {
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
                    __alloyId17.push(__alloyId18);
                    var __alloyId19 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId20 = [];
                            var __alloyId21 = {
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
                            __alloyId20.push(__alloyId21);
                            var __alloyId22 = {
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
                            __alloyId20.push(__alloyId22);
                            return __alloyId20;
                        }(),
                        properties: {
                            left: 0,
                            right: 0,
                            layout: "horizontal"
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
            top: 5,
            layout: "horizontal"
        }
    };
    __alloyId12.push(__alloyId13);
    var __alloyId11 = {
        properties: {
            left: 0,
            right: 0,
            height: 80,
            name: "template"
        },
        childTemplates: __alloyId12
    };
    __alloyId9["template"] = __alloyId11;
    $.__views.__alloyId23 = Ti.UI.createListSection({
        id: "__alloyId23"
    });
    var __alloyId28 = Alloy.Collections["feed"] || feed;
    __alloyId28.on("fetch destroy change add remove reset", __alloyId29);
    var __alloyId30 = [];
    __alloyId30.push($.__views.__alloyId23);
    $.__views.__alloyId8 = Ti.UI.createListView({
        sections: __alloyId30,
        templates: __alloyId9,
        defaultItemTemplate: "template",
        id: "__alloyId8"
    });
    $.__views.list.add($.__views.__alloyId8);
    select ? $.addListener($.__views.__alloyId8, "itemclick", select) : __defers["$.__views.__alloyId8!itemclick!select"] = true;
    $.__views.__alloyId31 = Ti.UI.createButton({
        title: "To map",
        top: 0,
        right: 0,
        id: "__alloyId31"
    });
    $.__views.list.add($.__views.__alloyId31);
    openMapview ? $.addListener($.__views.__alloyId31, "click", openMapview) : __defers["$.__views.__alloyId31!click!openMapview"] = true;
    $.__views.__alloyId32 = Ti.UI.createButton({
        title: "Filter",
        bottom: 0,
        right: 0,
        id: "__alloyId32"
    });
    $.__views.list.add($.__views.__alloyId32);
    filter ? $.addListener($.__views.__alloyId32, "click", filter) : __defers["$.__views.__alloyId32!click!filter"] = true;
    exports.destroy = function() {
        __alloyId28 && __alloyId28.off("fetch destroy change add remove reset", __alloyId29);
    };
    _.extend($, $.__views);
    var moment = require("alloy/moment");
    !function() {
        "use strict";
        refresh();
    }(arguments[0] || {});
    Alloy.Globals.transform = transform;
    __defers["$.__views.__alloyId5!click!refresh"] && $.addListener($.__views.__alloyId5, "click", refresh);
    __defers["$.__views.__alloyId8!itemclick!select"] && $.addListener($.__views.__alloyId8, "itemclick", select);
    __defers["$.__views.__alloyId31!click!openMapview"] && $.addListener($.__views.__alloyId31, "click", openMapview);
    __defers["$.__views.__alloyId32!click!filter"] && $.addListener($.__views.__alloyId32, "click", filter);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;