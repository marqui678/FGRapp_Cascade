function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId29() {
        $.__views.lwin.removeEventListener("open", __alloyId29);
        if ($.__views.lwin.activity) $.__views.lwin.activity.onCreateOptionsMenu = function(e) {
            var __alloyId28 = {
                icon: "images/ic_action_action_autorenew.png",
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                id: "__alloyId27"
            };
            $.__views.__alloyId27 = e.menu.add(_.pick(__alloyId28, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId27.applyProperties(_.omit(__alloyId28, Alloy.Android.menuItemCreateArgs));
            $.__alloyId27 = $.__views.__alloyId27;
            refresh ? $.addListener($.__views.__alloyId27, "click", refresh) : __defers["$.__views.__alloyId27!click!refresh"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function __alloyId53(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId53.opts || {};
        var models = __alloyId52.models;
        var len = models.length;
        var __alloyId48 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId49 = models[i];
            __alloyId49.__transform = transform(__alloyId49);
            var __alloyId51 = {
                properties: {
                    itemId: _.template("{m.link}", {
                        m: __alloyId49.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    }),
                    searchableText: _.template("{m.title}", {
                        m: __alloyId49.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                distanceTwo: {
                    text: _.template("{m.distanceTwo}", {
                        m: __alloyId49.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                title: {
                    text: _.template("{m.title}", {
                        m: __alloyId49.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                pace: {
                    text: _.template("{m.pace}", {
                        m: __alloyId49.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                paceNumber: {
                    text: _.template("{m.paceNumber}", {
                        m: __alloyId49.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                startDateTime: {
                    text: _.template("{m.startDateTime}", {
                        m: __alloyId49.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                distanceOne: {
                    text: _.template("{m.distanceOne}", {
                        m: __alloyId49.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                }
            };
            __alloyId48.push(__alloyId51);
        }
        opts.animation ? $.__views.listSection.setItems(__alloyId48, opts.animation) : $.__views.listSection.setItems(__alloyId48);
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
    $.__views.lwin = Ti.UI.createWindow({
        barColor: "#43B02A",
        backgroundColor: "#FFF",
        id: "lwin",
        title: "Free Group Rides"
    });
    $.__views.lwin && $.addTopLevelView($.__views.lwin);
    $.__views.lwin.addEventListener("open", __alloyId29);
    $.__views.search = Ti.UI.createSearchBar({
        id: "search"
    });
    var __alloyId30 = {};
    var __alloyId33 = [];
    var __alloyId34 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId35 = [];
            var __alloyId36 = {
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
            __alloyId35.push(__alloyId36);
            var __alloyId37 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId38 = [];
                    var __alloyId40 = {
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
                    __alloyId38.push(__alloyId40);
                    var __alloyId41 = {
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
                    __alloyId38.push(__alloyId41);
                    var __alloyId42 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId43 = [];
                            var __alloyId44 = {
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
                            __alloyId43.push(__alloyId44);
                            var __alloyId45 = {
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
                            __alloyId43.push(__alloyId45);
                            var __alloyId46 = {
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
                            __alloyId43.push(__alloyId46);
                            var __alloyId47 = {
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
                            __alloyId43.push(__alloyId47);
                            return __alloyId43;
                        }(),
                        properties: {
                            left: 0,
                            right: 0,
                            top: 5,
                            layout: "horizontal"
                        }
                    };
                    __alloyId38.push(__alloyId42);
                    return __alloyId38;
                }(),
                properties: {
                    left: 0,
                    right: 0,
                    top: 20,
                    layout: "horizontal"
                }
            };
            __alloyId35.push(__alloyId37);
            return __alloyId35;
        }(),
        properties: {
            left: 16,
            right: 0,
            top: 21,
            layout: "horizontal"
        }
    };
    __alloyId33.push(__alloyId34);
    var __alloyId32 = {
        properties: {
            left: 0,
            right: 0,
            height: 128,
            layout: "vertical",
            name: "template"
        },
        childTemplates: __alloyId33
    };
    __alloyId30["template"] = __alloyId32;
    $.__views.listSection = Ti.UI.createListSection({
        id: "listSection"
    });
    var __alloyId52 = Alloy.Collections["feed"] || feed;
    __alloyId52.on("fetch destroy change add remove reset", __alloyId53);
    var __alloyId54 = [];
    __alloyId54.push($.__views.listSection);
    $.__views.listView = Ti.UI.createListView({
        sections: __alloyId54,
        templates: __alloyId30,
        searchView: $.__views.search,
        id: "listView",
        defaultItemTemplate: "template"
    });
    $.__views.lwin.add($.__views.listView);
    select ? $.addListener($.__views.listView, "itemclick", select) : __defers["$.__views.listView!itemclick!select"] = true;
    $.__views.__alloyId55 = Ti.UI.createButton({
        title: "To map",
        top: 0,
        right: 0,
        id: "__alloyId55"
    });
    $.__views.lwin.add($.__views.__alloyId55);
    openMapview ? $.addListener($.__views.__alloyId55, "click", openMapview) : __defers["$.__views.__alloyId55!click!openMapview"] = true;
    $.__views.__alloyId56 = Ti.UI.createButton({
        title: "Filter",
        bottom: 0,
        right: 0,
        id: "__alloyId56"
    });
    $.__views.lwin.add($.__views.__alloyId56);
    filter ? $.addListener($.__views.__alloyId56, "click", filter) : __defers["$.__views.__alloyId56!click!filter"] = true;
    $.__views.__alloyId57 = Ti.UI.createButton({
        title: "Sort",
        bottom: 0,
        left: 0,
        id: "__alloyId57"
    });
    $.__views.lwin.add($.__views.__alloyId57);
    openSortView ? $.addListener($.__views.__alloyId57, "click", openSortView) : __defers["$.__views.__alloyId57!click!openSortView"] = true;
    exports.destroy = function() {
        __alloyId52 && __alloyId52.off("fetch destroy change add remove reset", __alloyId53);
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
    __defers["$.__views.__alloyId27!click!refresh"] && $.addListener($.__views.__alloyId27, "click", refresh);
    __defers["$.__views.listView!itemclick!select"] && $.addListener($.__views.listView, "itemclick", select);
    __defers["$.__views.__alloyId55!click!openMapview"] && $.addListener($.__views.__alloyId55, "click", openMapview);
    __defers["$.__views.__alloyId56!click!filter"] && $.addListener($.__views.__alloyId56, "click", filter);
    __defers["$.__views.__alloyId57!click!openSortView"] && $.addListener($.__views.__alloyId57, "click", openSortView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;