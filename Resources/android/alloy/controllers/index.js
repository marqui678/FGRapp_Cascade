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
    $.__views.listCtrl = Alloy.createController("list", {
        id: "listCtrl"
    });
    $.__views.listCtrl && $.addTopLevelView($.__views.listCtrl);
    onSelect ? $.__views.listCtrl.on("select", onSelect) : __defers["$.__views.listCtrl!select!onSelect"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    !function() {
        "use strict";
        $.listCtrl.getView().open();
    }(arguments[0] || {});
    __defers["$.__views.listCtrl!select!onSelect"] && $.__views.listCtrl.on("select", onSelect);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;