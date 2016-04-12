function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function testFilter() {
        d = Alloy.Collections.feed;
        Alloy.Globals.Navigator.open("list", Alloy.Collections.feed);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "filter";
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
    $.__views.fwin = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        id: "fwin",
        title: "Filter"
    });
    $.__views.fwin && $.addTopLevelView($.__views.fwin);
    $.__views.test = Ti.UI.createButton({
        left: 0,
        title: "Test",
        id: "test"
    });
    $.__views.fwin.add($.__views.test);
    testFilter ? $.addListener($.__views.test, "click", testFilter) : __defers["$.__views.test!click!testFilter"] = true;
    $.__views.picker = Ti.UI.createPicker({
        id: "picker",
        top: 50,
        selectionIndicator: true,
        useSpinner: true
    });
    $.__views.fwin.add($.__views.picker);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var data = [];
    data[0] = Ti.UI.createPickerRow({
        title: "Self Paced"
    });
    data[1] = Ti.UI.createPickerRow({
        title: "Easy"
    });
    data[2] = Ti.UI.createPickerRow({
        title: "Leisurely"
    });
    data[3] = Ti.UI.createPickerRow({
        title: "Steady"
    });
    data[4] = Ti.UI.createPickerRow({
        title: "Moderate"
    });
    data[5] = Ti.UI.createPickerRow({
        title: "Brisk"
    });
    data[6] = Ti.UI.createPickerRow({
        title: "Vigorous"
    });
    data[7] = Ti.UI.createPickerRow({
        title: "Strenuous"
    });
    data[8] = Ti.UI.createPickerRow({
        title: "Super Strenuous"
    });
    $.picker.add(data);
    $.picker.setSelectedRow(0, 4, false);
    $.picker.addEventListener("change", function(e) {
        for (var i = 0; i < Alloy.Collections.feed.length; i++) 0 == Alloy.Collections.feed.models[i].get("fgrrss:pace").indexOf(e.row.title) && Alloy.Collections.feed.remove(Alloy.Collections.feed.models[i].get("link"));
    });
    c = Alloy.Collections.feed;
    __defers["$.__views.test!click!testFilter"] && $.addListener($.__views.test, "click", testFilter);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;