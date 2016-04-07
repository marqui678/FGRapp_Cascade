function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId5() {
        $.__views.list.removeEventListener("open", __alloyId5);
        if ($.__views.list.activity) $.__views.list.activity.onCreateOptionsMenu = function(e) {
            var __alloyId4 = {
                icon: "images/ic_action_action_autorenew.png",
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                id: "__alloyId3"
            };
            $.__views.__alloyId3 = e.menu.add(_.pick(__alloyId4, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId3.applyProperties(_.omit(__alloyId4, Alloy.Android.menuItemCreateArgs));
            $.__alloyId3 = $.__views.__alloyId3;
            refresh ? $.addListener($.__views.__alloyId3, "click", refresh) : __defers["$.__views.__alloyId3!click!refresh"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function __alloyId27(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId27.opts || {};
        var models = __alloyId26.models;
        var len = models.length;
        var __alloyId22 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId23 = models[i];
            __alloyId23.__transform = transform(__alloyId23);
            var __alloyId25 = {
                properties: {
                    itemId: _.template("{m.link}", {
                        m: __alloyId23.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                title: {
                    text: _.template("{m.title}", {
                        m: __alloyId23.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                pace: {
                    text: _.template("{m.pace}", {
                        m: __alloyId23.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                startDateTime: {
                    text: _.template("{m.startDateTime}", {
                        m: __alloyId23.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                distance: {
                    text: _.template("{m.distance}", {
                        m: __alloyId23.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                }
            };
            __alloyId22.push(__alloyId25);
        }
        opts.animation ? $.__views.__alloyId21.setItems(__alloyId22, opts.animation) : $.__views.__alloyId21.setItems(__alloyId22);
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
        $.trigger("select", {
            model: model
        });
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
        backgroundColor: "#FFF",
        title: "Free Group Rides",
        id: "list"
    });
    $.__views.list && $.addTopLevelView($.__views.list);
    $.__views.list.addEventListener("open", __alloyId5);
    var __alloyId7 = {};
    var __alloyId10 = [];
    var __alloyId11 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId12 = [];
            var __alloyId13 = {
                type: "Ti.UI.Label",
                bindId: "title",
                properties: {
                    color: "black",
                    font: {
                        fontSize: 16
                    },
                    bindId: "title"
                }
            };
            __alloyId12.push(__alloyId13);
            var __alloyId14 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId15 = [];
                    var __alloyId16 = {
                        type: "Ti.UI.Label",
                        bindId: "pace",
                        properties: {
                            color: "red",
                            font: {
                                fontSize: 13
                            },
                            bindId: "pace"
                        }
                    };
                    __alloyId15.push(__alloyId16);
                    var __alloyId17 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId18 = [];
                            var __alloyId19 = {
                                type: "Ti.UI.Label",
                                bindId: "startDateTime",
                                properties: {
                                    color: "blue",
                                    font: {
                                        fontSize: 13
                                    },
                                    bindId: "startDateTime"
                                }
                            };
                            __alloyId18.push(__alloyId19);
                            var __alloyId20 = {
                                type: "Ti.UI.Label",
                                bindId: "distance",
                                properties: {
                                    color: "green",
                                    font: {
                                        fontSize: 13
                                    },
                                    right: 0,
                                    textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
                                    bindId: "distance"
                                }
                            };
                            __alloyId18.push(__alloyId20);
                            return __alloyId18;
                        }(),
                        properties: {
                            left: 0,
                            right: 0,
                            layout: "horizontal"
                        }
                    };
                    __alloyId15.push(__alloyId17);
                    return __alloyId15;
                }(),
                properties: {
                    left: 0,
                    right: 0,
                    layout: "horizontal"
                }
            };
            __alloyId12.push(__alloyId14);
            return __alloyId12;
        }(),
        properties: {
            left: 0,
            right: 0,
            top: 5,
            layout: "horizontal"
        }
    };
    __alloyId10.push(__alloyId11);
    var __alloyId9 = {
        properties: {
            left: 0,
            right: 0,
            name: "template"
        },
        childTemplates: __alloyId10
    };
    __alloyId7["template"] = __alloyId9;
    $.__views.__alloyId21 = Ti.UI.createListSection({
        id: "__alloyId21"
    });
    var __alloyId26 = Alloy.Collections["feed"] || feed;
    __alloyId26.on("fetch destroy change add remove reset", __alloyId27);
    var __alloyId28 = [];
    __alloyId28.push($.__views.__alloyId21);
    $.__views.__alloyId6 = Ti.UI.createListView({
        sections: __alloyId28,
        templates: __alloyId7,
        defaultItemTemplate: "template",
        id: "__alloyId6"
    });
    $.__views.list.add($.__views.__alloyId6);
    select ? $.addListener($.__views.__alloyId6, "itemclick", select) : __defers["$.__views.__alloyId6!itemclick!select"] = true;
    exports.destroy = function() {
        __alloyId26 && __alloyId26.off("fetch destroy change add remove reset", __alloyId27);
    };
    _.extend($, $.__views);
    var moment = require("alloy/moment");
    !function() {
        "use strict";
        refresh();
    }(arguments[0] || {});
    __defers["$.__views.__alloyId3!click!refresh"] && $.addListener($.__views.__alloyId3, "click", refresh);
    __defers["$.__views.__alloyId6!itemclick!select"] && $.addListener($.__views.__alloyId6, "itemclick", select);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;