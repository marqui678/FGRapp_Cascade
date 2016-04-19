function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId1() {
        $.__views.win.removeEventListener("open", __alloyId1);
        if ($.__views.win.activity) {
            $.__views.win.activity.actionBar.displayHomeAsUp = true;
            $.__views.win.activity.actionBar.onHomeIconItemSelected = close;
        } else {
            Ti.API.warn("You attempted to access an Activity on a lightweight Window or other");
            Ti.API.warn("UI component which does not have an Android activity. Android Activities");
            Ti.API.warn("are valid with only windows in TabGroups or heavyweight Windows.");
        }
    }
    function close() {
        "use strict";
        $.win.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "detail";
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
    $.__views.win = Ti.UI.createWindow({
        barColor: "#CD1625",
        backgroundColor: "#FFF",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.win.addEventListener("open", __alloyId1);
    $.__views.webView = Ti.UI.createWebView({
        id: "webView"
    });
    $.__views.win.add($.__views.webView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var model = arguments[0] || {};
    !function() {
        "use strict";
        $.win.title = model.get("title");
        $.webView.url = model.get("link");
    }(arguments[0] || {});
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;