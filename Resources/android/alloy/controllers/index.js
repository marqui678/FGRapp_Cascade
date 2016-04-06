function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function onSelect(e) {
        "use strict";
        var model = e.model;
        var win = Alloy.createController("detail", {
            model: model
        }).getView();
        win.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    $.__views.mapCtrl = Alloy.createController("map", {
        id: "mapCtrl"
    });
    $.__views.mapCtrl && $.addTopLevelView($.__views.mapCtrl);
    onSelect ? $.__views.mapCtrl.on("select", onSelect) : __defers["$.__views.mapCtrl!select!onSelect"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    !function() {
        "use strict";
        $.mapCtrl.getView().open();
    }(arguments[0] || {});
    __defers["$.__views.mapCtrl!select!onSelect"] && $.__views.mapCtrl.on("select", onSelect);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;