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
        Alloy.Globals.Navigator.open("list", Alloy.Globals.pace);
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
        barColor: "#CD1625",
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
    $.__views.pacePicker = Ti.UI.createPicker({
        id: "pacePicker",
        top: 50,
        selectionIndicator: true,
        useSpinner: true
    });
    $.__views.fwin.add($.__views.pacePicker);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var paceData = [];
    paceData[0] = Ti.UI.createPickerRow({
        title: "Self Paced"
    });
    paceData[1] = Ti.UI.createPickerRow({
        title: "Easy"
    });
    paceData[2] = Ti.UI.createPickerRow({
        title: "Leisurely"
    });
    paceData[3] = Ti.UI.createPickerRow({
        title: "Steady"
    });
    paceData[4] = Ti.UI.createPickerRow({
        title: "Moderate"
    });
    paceData[5] = Ti.UI.createPickerRow({
        title: "Brisk"
    });
    paceData[6] = Ti.UI.createPickerRow({
        title: "Vigorous"
    });
    paceData[7] = Ti.UI.createPickerRow({
        title: "Strenuous"
    });
    paceData[8] = Ti.UI.createPickerRow({
        title: "Super Strenuous"
    });
    $.pacePicker.add(paceData);
    $.pacePicker.setSelectedRow(0, 4, false);
    $.pacePicker.addEventListener("change", function(e) {
        Alloy.Globals.pace = e.row.title;
    });
    __defers["$.__views.test!click!testFilter"] && $.addListener($.__views.test, "click", testFilter);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;