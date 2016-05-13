function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId60(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId60.opts || {};
        var models = __alloyId59.models;
        var len = models.length;
        var __alloyId55 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId56 = models[i];
            __alloyId56.__transform = transform(__alloyId56);
            var __alloyId58 = {
                properties: {
                    itemId: _.template("{m.link}", {
                        m: __alloyId56.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    }),
                    searchableText: _.template("{m.title}", {
                        m: __alloyId56.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                distanceTwo: {
                    text: _.template("{m.distanceTwo}", {
                        m: __alloyId56.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                title: {
                    text: _.template("{m.title}", {
                        m: __alloyId56.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                pace: {
                    text: _.template("{m.pace}", {
                        m: __alloyId56.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                paceNumber: {
                    text: _.template("{m.paceNumber}", {
                        m: __alloyId56.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                startDateTime: {
                    text: _.template("{m.startDateTime}", {
                        m: __alloyId56.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                },
                distanceOne: {
                    text: _.template("{m.distanceOne}", {
                        m: __alloyId56.__transform
                    }, {
                        interpolate: /\{([\s\S]+?)\}/g
                    })
                }
            };
            __alloyId55.push(__alloyId58);
        }
        opts.animation ? $.__views.listSection.setItems(__alloyId55, opts.animation) : $.__views.listSection.setItems(__alloyId55);
    }
    function refresh(e) {
        "use strict";
        function afterFetch() {
            $.search.blur();
        }
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
    $.__views.search = Ti.UI.createSearchBar({
        id: "search"
    });
    var __alloyId37 = {};
    var __alloyId40 = [];
    var __alloyId41 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId42 = [];
            var __alloyId43 = {
                type: "Ti.UI.Label",
                bindId: "title",
                properties: {
                    color: "#006F44",
                    left: 0,
                    right: 0,
                    height: "30dp",
                    top: "12dp",
                    font: {
                        fontSize: 20
                    },
                    bindId: "title"
                }
            };
            __alloyId42.push(__alloyId43);
            var __alloyId44 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId45 = [];
                    var __alloyId47 = {
                        type: "Ti.UI.ImageView",
                        properties: {
                            left: 0,
                            right: 0,
                            font: {
                                fontSize: 13
                            },
                            width: "20dp",
                            image: "/images/Date.png"
                        }
                    };
                    __alloyId45.push(__alloyId47);
                    var __alloyId48 = {
                        type: "Ti.UI.Label",
                        bindId: "startDateTime",
                        properties: {
                            color: "black",
                            left: "5dp",
                            right: 0,
                            font: {
                                fontSize: 16
                            },
                            bindId: "startDateTime"
                        }
                    };
                    __alloyId45.push(__alloyId48);
                    var __alloyId49 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId50 = [];
                            var __alloyId51 = {
                                type: "Ti.UI.Label",
                                bindId: "paceNumber",
                                properties: {
                                    color: "white",
                                    left: 0,
                                    font: {
                                        fontSize: 12
                                    },
                                    width: "25%",
                                    height: "24dp",
                                    bindId: "paceNumber",
                                    backgroundImage: "/images/pace.png"
                                }
                            };
                            __alloyId50.push(__alloyId51);
                            var __alloyId52 = {
                                type: "Ti.UI.Label",
                                bindId: "pace",
                                properties: {
                                    color: "black",
                                    left: "5dp",
                                    font: {
                                        fontSize: 16
                                    },
                                    width: "35%",
                                    height: "25dp",
                                    bindId: "pace"
                                }
                            };
                            __alloyId50.push(__alloyId52);
                            var __alloyId53 = {
                                type: "Ti.UI.Label",
                                bindId: "distanceOne",
                                properties: {
                                    color: "#2C2A29",
                                    left: "5dp",
                                    font: {
                                        fontSize: 36
                                    },
                                    width: "21%",
                                    textAlign: "right",
                                    bindId: "distanceOne"
                                }
                            };
                            __alloyId50.push(__alloyId53);
                            var __alloyId54 = {
                                type: "Ti.UI.Label",
                                bindId: "distanceTwo",
                                properties: {
                                    color: "#646464",
                                    left: "5dp",
                                    font: {
                                        fontSize: 16
                                    },
                                    width: "11%",
                                    textAlign: "right",
                                    bindId: "distanceTwo"
                                }
                            };
                            __alloyId50.push(__alloyId54);
                            return __alloyId50;
                        }(),
                        properties: {
                            left: 0,
                            right: 0,
                            top: 0,
                            layout: "horizontal"
                        }
                    };
                    __alloyId45.push(__alloyId49);
                    return __alloyId45;
                }(),
                properties: {
                    left: 0,
                    right: 0,
                    layout: "horizontal"
                }
            };
            __alloyId42.push(__alloyId44);
            return __alloyId42;
        }(),
        properties: {
            left: "16dp",
            right: 0,
            layout: "horizontal"
        }
    };
    __alloyId40.push(__alloyId41);
    var __alloyId39 = {
        properties: {
            left: 0,
            right: 0,
            height: "120dp",
            layout: "vertical",
            name: "template"
        },
        childTemplates: __alloyId40
    };
    __alloyId37["template"] = __alloyId39;
    $.__views.listSection = Ti.UI.createListSection({
        id: "listSection"
    });
    var __alloyId59 = Alloy.Collections["feed"] || feed;
    __alloyId59.on("fetch destroy change add remove reset", __alloyId60);
    var __alloyId61 = [];
    __alloyId61.push($.__views.listSection);
    $.__views.listView = Ti.UI.createListView({
        sections: __alloyId61,
        templates: __alloyId37,
        searchView: $.__views.search,
        id: "listView",
        defaultItemTemplate: "template"
    });
    $.__views.lwin.add($.__views.listView);
    select ? $.addListener($.__views.listView, "itemclick", select) : __defers["$.__views.listView!itemclick!select"] = true;
    $.__views.__alloyId62 = Ti.UI.createButton({
        title: "To map",
        top: 0,
        right: 0,
        id: "__alloyId62"
    });
    $.__views.lwin.add($.__views.__alloyId62);
    openMapview ? $.addListener($.__views.__alloyId62, "click", openMapview) : __defers["$.__views.__alloyId62!click!openMapview"] = true;
    $.__views.__alloyId63 = Ti.UI.createButton({
        title: "Filter",
        bottom: 0,
        right: 0,
        id: "__alloyId63"
    });
    $.__views.lwin.add($.__views.__alloyId63);
    filter ? $.addListener($.__views.__alloyId63, "click", filter) : __defers["$.__views.__alloyId63!click!filter"] = true;
    $.__views.__alloyId64 = Ti.UI.createButton({
        title: "Sort",
        bottom: 0,
        left: 0,
        id: "__alloyId64"
    });
    $.__views.lwin.add($.__views.__alloyId64);
    openSortView ? $.addListener($.__views.__alloyId64, "click", openSortView) : __defers["$.__views.__alloyId64!click!openSortView"] = true;
    exports.destroy = function() {
        __alloyId59 && __alloyId59.off("fetch destroy change add remove reset", __alloyId60);
    };
    _.extend($, $.__views);
    var moment = require("alloy/moment");
    !function() {
        "use strict";
        Titanium.Network.networkType == Titanium.Network.NETWORK_NONE ? alert("Your device is not online. Please check your network and try again.") : refresh();
    }(arguments[0] || {});
    Alloy.Globals.transform = transform;
    $.search.addEventListener("cancel", function() {
        $.search.blur();
    });
    __defers["$.__views.listView!itemclick!select"] && $.addListener($.__views.listView, "itemclick", select);
    __defers["$.__views.__alloyId62!click!openMapview"] && $.addListener($.__views.__alloyId62, "click", openMapview);
    __defers["$.__views.__alloyId63!click!filter"] && $.addListener($.__views.__alloyId63, "click", filter);
    __defers["$.__views.__alloyId64!click!openSortView"] && $.addListener($.__views.__alloyId64, "click", openSortView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;