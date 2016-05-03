function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId27() {
        $.__views.list.removeEventListener("open", __alloyId27);
        if ($.__views.list.activity) $.__views.list.activity.onCreateOptionsMenu = function(e) {
            var __alloyId26 = {
                icon: "images/ic_action_action_autorenew.png",
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                id: "__alloyId25"
            };
            $.__views.__alloyId25 = e.menu.add(_.pick(__alloyId26, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId25.applyProperties(_.omit(__alloyId26, Alloy.Android.menuItemCreateArgs));
            $.__alloyId25 = $.__views.__alloyId25;
            refresh ? $.addListener($.__views.__alloyId25, "click", refresh) : __defers["$.__views.__alloyId25!click!refresh"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function __alloyId49(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId49.opts || {};
        var models = __alloyId48.models;
        var len = models.length;
        var __alloyId44 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId45 = models[i];
            __alloyId45.__transform = transform(__alloyId45);
            var __alloyId47 = {
                properties: {
                    itemId: _.template("{m.link}", {
                        m: __alloyId45.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                title: {
                    text: _.template("{m.title}", {
                        m: __alloyId45.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                pace: {
                    text: _.template("{m.pace}", {
                        m: __alloyId45.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                startDateTime: {
                    text: _.template("{m.startDateTime}", {
                        m: __alloyId45.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                distance: {
                    text: _.template("{m.distance}", {
                        m: __alloyId45.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                }
            };
            __alloyId44.push(__alloyId47);
        }
        opts.animation ? $.__views.__alloyId43.setItems(__alloyId44, opts.animation) : $.__views.__alloyId43.setItems(__alloyId44);
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
        title: "Free Group Rides",
        id: "list"
    });
    $.__views.list && $.addTopLevelView($.__views.list);
    $.__views.list.addEventListener("open", __alloyId27);
    var __alloyId29 = {};
    var __alloyId32 = [];
    var __alloyId33 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId34 = [];
            var __alloyId35 = {
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
            __alloyId34.push(__alloyId35);
            var __alloyId36 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId37 = [];
                    var __alloyId38 = {
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
                    __alloyId37.push(__alloyId38);
                    var __alloyId39 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId40 = [];
                            var __alloyId41 = {
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
                            __alloyId40.push(__alloyId41);
                            var __alloyId42 = {
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
                            __alloyId40.push(__alloyId42);
                            return __alloyId40;
                        }(),
                        properties: {
                            left: 0,
                            right: 0,
                            layout: "horizontal"
                        }
                    };
                    __alloyId37.push(__alloyId39);
                    return __alloyId37;
                }(),
                properties: {
                    left: 0,
                    right: 0,
                    layout: "horizontal"
                }
            };
            __alloyId34.push(__alloyId36);
            return __alloyId34;
        }(),
        properties: {
            left: 0,
            right: 0,
            top: 5,
            layout: "horizontal"
        }
    };
    __alloyId32.push(__alloyId33);
    var __alloyId31 = {
        properties: {
            left: 0,
            right: 0,
            height: 80,
            name: "template"
        },
        childTemplates: __alloyId32
    };
    __alloyId29["template"] = __alloyId31;
    $.__views.__alloyId43 = Ti.UI.createListSection({
        id: "__alloyId43"
    });
    var __alloyId48 = Alloy.Collections["feed"] || feed;
    __alloyId48.on("fetch destroy change add remove reset", __alloyId49);
    var __alloyId50 = [];
    __alloyId50.push($.__views.__alloyId43);
    $.__views.__alloyId28 = Ti.UI.createListView({
        sections: __alloyId50,
        templates: __alloyId29,
        defaultItemTemplate: "template",
        id: "__alloyId28"
    });
    $.__views.list.add($.__views.__alloyId28);
    select ? $.addListener($.__views.__alloyId28, "itemclick", select) : __defers["$.__views.__alloyId28!itemclick!select"] = true;
    $.__views.__alloyId51 = Ti.UI.createButton({
        title: "To map",
        top: 0,
        right: 0,
        id: "__alloyId51"
    });
    $.__views.list.add($.__views.__alloyId51);
    openMapview ? $.addListener($.__views.__alloyId51, "click", openMapview) : __defers["$.__views.__alloyId51!click!openMapview"] = true;
    $.__views.__alloyId52 = Ti.UI.createButton({
        title: "Filter",
        bottom: 0,
        right: 0,
        id: "__alloyId52"
    });
    $.__views.list.add($.__views.__alloyId52);
    filter ? $.addListener($.__views.__alloyId52, "click", filter) : __defers["$.__views.__alloyId52!click!filter"] = true;
    exports.destroy = function() {
        __alloyId48 && __alloyId48.off("fetch destroy change add remove reset", __alloyId49);
    };
    _.extend($, $.__views);
    var moment = require("alloy/moment");
    !function() {
        "use strict";
        refresh();
    }(arguments[0] || {});
    Alloy.Globals.transform = transform;
    __defers["$.__views.__alloyId25!click!refresh"] && $.addListener($.__views.__alloyId25, "click", refresh);
    __defers["$.__views.__alloyId28!itemclick!select"] && $.addListener($.__views.__alloyId28, "itemclick", select);
    __defers["$.__views.__alloyId51!click!openMapview"] && $.addListener($.__views.__alloyId51, "click", openMapview);
    __defers["$.__views.__alloyId52!click!filter"] && $.addListener($.__views.__alloyId52, "click", filter);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;