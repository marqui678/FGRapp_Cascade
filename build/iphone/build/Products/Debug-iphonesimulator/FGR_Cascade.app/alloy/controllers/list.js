function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId45(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId45.opts || {};
        var models = __alloyId44.models;
        var len = models.length;
        var __alloyId40 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId41 = models[i];
            __alloyId41.__transform = transform(__alloyId41);
            var __alloyId43 = {
                properties: {
                    itemId: _.template("{m.link}", {
                        m: __alloyId41.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                title: {
                    text: _.template("{m.title}", {
                        m: __alloyId41.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                pace: {
                    text: _.template("{m.pace}", {
                        m: __alloyId41.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                startDateTime: {
                    text: _.template("{m.startDateTime}", {
                        m: __alloyId41.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                distance: {
                    text: _.template("{m.distance}", {
                        m: __alloyId41.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                }
            };
            __alloyId40.push(__alloyId43);
        }
        opts.animation ? $.__views.listSection.setItems(__alloyId40, opts.animation) : $.__views.listSection.setItems(__alloyId40);
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
            paceNo: model.get("paceNo"),
            pace: model.get("pace"),
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
    $.__views.search = Ti.UI.createSearchBar({
        id: "search"
    });
    var __alloyId25 = {};
    var __alloyId28 = [];
    var __alloyId29 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId30 = [];
            var __alloyId31 = {
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
            __alloyId30.push(__alloyId31);
            var __alloyId32 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId33 = [];
                    var __alloyId34 = {
                        type: "Ti.UI.Label",
                        bindId: "paceNo",
                        properties: {
                            color: "red",
                            left: 0,
                            right: 0,
                            font: {
                                fontSize: 13
                            },
                            textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
                            bindId: "paceNo"
                        }
                    };
                    __alloyId33.push(__alloyId34);
                    var __alloyId35 = {
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
                    __alloyId33.push(__alloyId35);
                    var __alloyId36 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId37 = [];
                            var __alloyId38 = {
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
                            __alloyId37.push(__alloyId38);
                            var __alloyId39 = {
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
                            __alloyId37.push(__alloyId39);
                            return __alloyId37;
                        }(),
                        properties: {
                            left: 0,
                            right: 0,
                            layout: "horizontal"
                        }
                    };
                    __alloyId33.push(__alloyId36);
                    return __alloyId33;
                }(),
                properties: {
                    left: 0,
                    right: 0,
                    layout: "horizontal"
                }
            };
            __alloyId30.push(__alloyId32);
            return __alloyId30;
        }(),
        properties: {
            left: 0,
            right: 0,
            top: 5,
            layout: "horizontal"
        }
    };
    __alloyId28.push(__alloyId29);
    var __alloyId27 = {
        properties: {
            left: 0,
            right: 0,
            height: 100,
            name: "template"
        },
        childTemplates: __alloyId28
    };
    __alloyId25["template"] = __alloyId27;
    $.__views.listSection = Ti.UI.createListSection({
        id: "listSection"
    });
    var __alloyId44 = Alloy.Collections["feed"] || feed;
    __alloyId44.on("fetch destroy change add remove reset", __alloyId45);
    var __alloyId46 = [];
    __alloyId46.push($.__views.listSection);
    $.__views.listView = Ti.UI.createListView({
        sections: __alloyId46,
        templates: __alloyId25,
        refreshControl: $.__views.refreshControl,
        searchView: $.__views.search,
        id: "listView",
        defaultItemTemplate: "template"
    });
    $.__views.list.add($.__views.listView);
    select ? $.addListener($.__views.listView, "itemclick", select) : __defers["$.__views.listView!itemclick!select"] = true;
    $.__views.__alloyId47 = Ti.UI.createButton({
        title: "To map",
        top: 0,
        right: 0,
        id: "__alloyId47"
    });
    $.__views.list.add($.__views.__alloyId47);
    openMapview ? $.addListener($.__views.__alloyId47, "click", openMapview) : __defers["$.__views.__alloyId47!click!openMapview"] = true;
    $.__views.__alloyId48 = Ti.UI.createButton({
        title: "Filter",
        bottom: 0,
        right: 0,
        id: "__alloyId48"
    });
    $.__views.list.add($.__views.__alloyId48);
    filter ? $.addListener($.__views.__alloyId48, "click", filter) : __defers["$.__views.__alloyId48!click!filter"] = true;
    exports.destroy = function() {
        __alloyId44 && __alloyId44.off("fetch destroy change add remove reset", __alloyId45);
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
    var data = [];
    for (var i = 0; i < Alloy.Collections.feed.models.length; i++) data.push({
        properties: {
            title: Alloy.Collections.feed.models[i].get("title"),
            searchableText: Alloy.Collections.feed.models[i].get("title")
        }
    });
    $.listSection.setItems(data);
    __defers["$.__views.refreshControl!refreshstart!refresh"] && $.addListener($.__views.refreshControl, "refreshstart", refresh);
    __defers["$.__views.listView!itemclick!select"] && $.addListener($.__views.listView, "itemclick", select);
    __defers["$.__views.__alloyId47!click!openMapview"] && $.addListener($.__views.__alloyId47, "click", openMapview);
    __defers["$.__views.__alloyId48!click!filter"] && $.addListener($.__views.__alloyId48, "click", filter);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;