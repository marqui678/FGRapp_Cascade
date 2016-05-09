function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId50(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId50.opts || {};
        var models = __alloyId49.models;
        var len = models.length;
        var __alloyId45 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId46 = models[i];
            __alloyId46.__transform = transform(__alloyId46);
            var __alloyId48 = {
                properties: {
                    itemId: _.template("{m.link}", {
                        m: __alloyId46.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    }),
                    searchableText: _.template("{m.title}", {
                        m: __alloyId46.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                distanceTwo: {
                    text: _.template("{m.distanceTwo}", {
                        m: __alloyId46.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                title: {
                    text: _.template("{m.title}", {
                        m: __alloyId46.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                pace: {
                    text: _.template("{m.pace}", {
                        m: __alloyId46.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                paceNumber: {
                    text: _.template("{m.paceNumber}", {
                        m: __alloyId46.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                startDateTime: {
                    text: _.template("{m.startDateTime}", {
                        m: __alloyId46.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                distanceOne: {
                    text: _.template("{m.distanceOne}", {
                        m: __alloyId46.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                }
            };
            __alloyId45.push(__alloyId48);
        }
        opts.animation ? $.__views.listSection.setItems(__alloyId45, opts.animation) : $.__views.listSection.setItems(__alloyId45);
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
        navTintColor: "#FFF",
        translucent: false,
        titleAttributes: {
            color: "#FFF"
        },
        id: "lwin",
        title: "Free Group Rides"
    });
    $.__views.lwin && $.addTopLevelView($.__views.lwin);
    $.__views.refreshControl = Ti.UI.createRefreshControl({
        id: "refreshControl"
    });
    refresh ? $.addListener($.__views.refreshControl, "refreshstart", refresh) : __defers["$.__views.refreshControl!refreshstart!refresh"] = true;
    $.__views.search = Ti.UI.createSearchBar({
        id: "search"
    });
    var __alloyId27 = {};
    var __alloyId30 = [];
    var __alloyId31 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId32 = [];
            var __alloyId33 = {
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
            __alloyId32.push(__alloyId33);
            var __alloyId34 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId35 = [];
                    var __alloyId37 = {
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
                    __alloyId35.push(__alloyId37);
                    var __alloyId38 = {
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
                    __alloyId35.push(__alloyId38);
                    var __alloyId39 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId40 = [];
                            var __alloyId41 = {
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
                            __alloyId40.push(__alloyId41);
                            var __alloyId42 = {
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
                            __alloyId40.push(__alloyId42);
                            var __alloyId43 = {
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
                            __alloyId40.push(__alloyId43);
                            var __alloyId44 = {
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
                            __alloyId40.push(__alloyId44);
                            return __alloyId40;
                        }(),
                        properties: {
                            left: 0,
                            right: 0,
                            top: 5,
                            layout: "horizontal"
                        }
                    };
                    __alloyId35.push(__alloyId39);
                    return __alloyId35;
                }(),
                properties: {
                    left: 0,
                    right: 0,
                    top: 20,
                    layout: "horizontal"
                }
            };
            __alloyId32.push(__alloyId34);
            return __alloyId32;
        }(),
        properties: {
            left: 16,
            right: 0,
            top: 21,
            layout: "horizontal"
        }
    };
    __alloyId30.push(__alloyId31);
    var __alloyId29 = {
        properties: {
            left: 0,
            right: 0,
            height: 128,
            layout: "vertical",
            name: "template"
        },
        childTemplates: __alloyId30
    };
    __alloyId27["template"] = __alloyId29;
    $.__views.listSection = Ti.UI.createListSection({
        id: "listSection"
    });
    var __alloyId49 = Alloy.Collections["feed"] || feed;
    __alloyId49.on("fetch destroy change add remove reset", __alloyId50);
    var __alloyId51 = [];
    __alloyId51.push($.__views.listSection);
    $.__views.listView = Ti.UI.createListView({
        sections: __alloyId51,
        templates: __alloyId27,
        refreshControl: $.__views.refreshControl,
        searchView: $.__views.search,
        id: "listView",
        defaultItemTemplate: "template"
    });
    $.__views.lwin.add($.__views.listView);
    select ? $.addListener($.__views.listView, "itemclick", select) : __defers["$.__views.listView!itemclick!select"] = true;
    $.__views.__alloyId52 = Ti.UI.createButton({
        title: "To map",
        top: 0,
        right: 0,
        id: "__alloyId52"
    });
    $.__views.lwin.add($.__views.__alloyId52);
    openMapview ? $.addListener($.__views.__alloyId52, "click", openMapview) : __defers["$.__views.__alloyId52!click!openMapview"] = true;
    $.__views.__alloyId53 = Ti.UI.createButton({
        title: "Filter",
        bottom: 0,
        right: 0,
        id: "__alloyId53"
    });
    $.__views.lwin.add($.__views.__alloyId53);
    filter ? $.addListener($.__views.__alloyId53, "click", filter) : __defers["$.__views.__alloyId53!click!filter"] = true;
    $.__views.__alloyId54 = Ti.UI.createButton({
        title: "Sort",
        bottom: 0,
        left: 0,
        id: "__alloyId54"
    });
    $.__views.lwin.add($.__views.__alloyId54);
    openSortView ? $.addListener($.__views.__alloyId54, "click", openSortView) : __defers["$.__views.__alloyId54!click!openSortView"] = true;
    exports.destroy = function() {
        __alloyId49 && __alloyId49.off("fetch destroy change add remove reset", __alloyId50);
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
    __defers["$.__views.refreshControl!refreshstart!refresh"] && $.addListener($.__views.refreshControl, "refreshstart", refresh);
    __defers["$.__views.listView!itemclick!select"] && $.addListener($.__views.listView, "itemclick", select);
    __defers["$.__views.__alloyId52!click!openMapview"] && $.addListener($.__views.__alloyId52, "click", openMapview);
    __defers["$.__views.__alloyId53!click!filter"] && $.addListener($.__views.__alloyId53, "click", filter);
    __defers["$.__views.__alloyId54!click!openSortView"] && $.addListener($.__views.__alloyId54, "click", openSortView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;