function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function selfPaced() {
        if (selfPaced) {
            Alloy.Globals.pace.splice(Alloy.Globals.pace.indexOf("self paced"), 1);
            $.paceLabel.text = $.paceLabel.text.replace("self paced", "");
        } else {
            Alloy.Globals.pace.push("self paced");
            $.paceLabel.text = $.paceLabel.text + "self paced";
        }
        selfPaced = !selfPaced;
    }
    function easy() {
        Alloy.Globals.pace.push("easy");
        $.paceLabel.text = $.paceLabel.text + "easy";
    }
    function brisk() {
        Alloy.Globals.pace.push("brisk");
        $.paceLabel.text = $.paceLabel.text + "brisk";
    }
    function leisurely() {
        Alloy.Globals.pace.push("leisurely");
    }
    function steady() {
        Alloy.Globals.pace.push("steady");
    }
    function moderate() {
        Alloy.Globals.pace.push("moderate");
    }
    function vigorous() {
        Alloy.Globals.pace.push("vigorous");
    }
    function strenuous() {
        Alloy.Globals.pace.push("strenuous");
    }
    function superStrenuous() {
        Alloy.Globals.pace.push("super strenuous");
    }
    function testFilter() {
        Alloy.Globals.Navigator.open("list", Alloy.Globals.pace);
    }
    function hidePaceView() {
        paceView ? hideVertical($.paceView) : showVertical($.paceView);
        paceView = !paceView;
    }
    function hideDateView() {
        dateView ? hideVertical($.dateView) : showVertical($.dateView);
        dateView = !dateView;
    }
    function hideVertical(view) {
        view.__originalValues = {
            top: view.top,
            bottom: view.bottom,
            height: view.height
        };
        view.width = view.height;
        view.top = 0;
        view.bottom = 0;
        view.height = 0;
        view.hide();
    }
    function showVertical(view) {
        view = _.extend(view, view.__originalValues || {});
        view.height = view.width;
        view.show();
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
        title: "Filter",
        layout: "vertical"
    });
    $.__views.fwin && $.addTopLevelView($.__views.fwin);
    $.__views.test = Ti.UI.createButton({
        left: 0,
        title: "Test",
        top: "0",
        id: "test"
    });
    $.__views.fwin.add($.__views.test);
    testFilter ? $.addListener($.__views.test, "click", testFilter) : __defers["$.__views.test!click!testFilter"] = true;
    $.__views.pace = Ti.UI.createButton({
        left: 0,
        title: "Pace",
        top: "0",
        id: "pace"
    });
    $.__views.fwin.add($.__views.pace);
    hidePaceView ? $.addListener($.__views.pace, "click", hidePaceView) : __defers["$.__views.pace!click!hidePaceView"] = true;
    $.__views.paceLabel = Ti.UI.createLabel({
        color: "#000",
        top: "0",
        id: "paceLabel"
    });
    $.__views.fwin.add($.__views.paceLabel);
    $.__views.paceView = Ti.UI.createView({
        id: "paceView",
        layout: "vertical",
        visible: "false"
    });
    $.__views.fwin.add($.__views.paceView);
    $.__views.firstRow = Ti.UI.createView({
        id: "firstRow",
        layout: "horizontal"
    });
    $.__views.paceView.add($.__views.firstRow);
    $.__views.__alloyId2 = Ti.UI.createButton({
        title: "Self Paced",
        top: "0",
        left: "15",
        id: "__alloyId2"
    });
    $.__views.firstRow.add($.__views.__alloyId2);
    selfPaced ? $.addListener($.__views.__alloyId2, "click", selfPaced) : __defers["$.__views.__alloyId2!click!selfPaced"] = true;
    $.__views.__alloyId3 = Ti.UI.createButton({
        title: "Easy",
        top: "0",
        left: "15",
        id: "__alloyId3"
    });
    $.__views.firstRow.add($.__views.__alloyId3);
    easy ? $.addListener($.__views.__alloyId3, "click", easy) : __defers["$.__views.__alloyId3!click!easy"] = true;
    $.__views.__alloyId4 = Ti.UI.createButton({
        title: "Leisurely",
        top: "0",
        left: "15",
        id: "__alloyId4"
    });
    $.__views.firstRow.add($.__views.__alloyId4);
    leisurely ? $.addListener($.__views.__alloyId4, "click", leisurely) : __defers["$.__views.__alloyId4!click!leisurely"] = true;
    $.__views.secondRow = Ti.UI.createView({
        top: "0",
        id: "secondRow",
        layout: "horizontal"
    });
    $.__views.paceView.add($.__views.secondRow);
    $.__views.__alloyId5 = Ti.UI.createButton({
        title: "Steady",
        top: "0",
        left: "15",
        id: "__alloyId5"
    });
    $.__views.secondRow.add($.__views.__alloyId5);
    steady ? $.addListener($.__views.__alloyId5, "click", steady) : __defers["$.__views.__alloyId5!click!steady"] = true;
    $.__views.__alloyId6 = Ti.UI.createButton({
        title: "Moderate",
        top: "0",
        left: "15",
        id: "__alloyId6"
    });
    $.__views.secondRow.add($.__views.__alloyId6);
    moderate ? $.addListener($.__views.__alloyId6, "click", moderate) : __defers["$.__views.__alloyId6!click!moderate"] = true;
    $.__views.__alloyId7 = Ti.UI.createButton({
        title: "Moderate",
        top: "0",
        left: "15",
        id: "__alloyId7"
    });
    $.__views.secondRow.add($.__views.__alloyId7);
    brisk ? $.addListener($.__views.__alloyId7, "click", brisk) : __defers["$.__views.__alloyId7!click!brisk"] = true;
    $.__views.thirdRow = Ti.UI.createView({
        top: "0",
        id: "thirdRow",
        layout: "horizontal"
    });
    $.__views.paceView.add($.__views.thirdRow);
    $.__views.__alloyId8 = Ti.UI.createButton({
        title: "Vigorous",
        top: "0",
        left: "15",
        id: "__alloyId8"
    });
    $.__views.thirdRow.add($.__views.__alloyId8);
    vigorous ? $.addListener($.__views.__alloyId8, "click", vigorous) : __defers["$.__views.__alloyId8!click!vigorous"] = true;
    $.__views.__alloyId9 = Ti.UI.createButton({
        title: "Strenuous",
        top: "0",
        left: "15",
        id: "__alloyId9"
    });
    $.__views.thirdRow.add($.__views.__alloyId9);
    strenuous ? $.addListener($.__views.__alloyId9, "click", strenuous) : __defers["$.__views.__alloyId9!click!strenuous"] = true;
    $.__views.__alloyId10 = Ti.UI.createButton({
        title: "Super Strenuous",
        top: "0",
        left: "15",
        id: "__alloyId10"
    });
    $.__views.thirdRow.add($.__views.__alloyId10);
    superStrenuous ? $.addListener($.__views.__alloyId10, "click", superStrenuous) : __defers["$.__views.__alloyId10!click!superStrenuous"] = true;
    $.__views.date = Ti.UI.createButton({
        left: 0,
        title: "DateTime",
        top: "0",
        id: "date"
    });
    $.__views.fwin.add($.__views.date);
    hideDateView ? $.addListener($.__views.date, "click", hideDateView) : __defers["$.__views.date!click!hideDateView"] = true;
    $.__views.dateView = Ti.UI.createView({
        id: "dateView",
        layout: "vertical",
        visible: "false"
    });
    $.__views.fwin.add($.__views.dateView);
    $.__views.observation_date_picker = Ti.UI.createPicker({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        selectionIndicator: "true",
        useSpinner: "true",
        minDate: Alloy.CFG.minDate,
        maxDate: Alloy.CFG.maxDate,
        format24: false,
        calendarViewShown: false,
        top: "0",
        id: "observation_date_picker",
        type: Titanium.UI.PICKER_TYPE_DATE
    });
    $.__views.dateView.add($.__views.observation_date_picker);
    $.__views.__alloyId11 = Ti.UI.createLabel({
        color: "#000",
        text: "To",
        top: "0",
        id: "__alloyId11"
    });
    $.__views.dateView.add($.__views.__alloyId11);
    $.__views.observation_date_picker1 = Ti.UI.createPicker({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        selectionIndicator: "true",
        useSpinner: "true",
        minDate: Alloy.CFG.minDate,
        maxDate: Alloy.CFG.maxDate,
        format24: false,
        calendarViewShown: false,
        top: "0",
        id: "observation_date_picker1",
        type: Titanium.UI.PICKER_TYPE_DATE
    });
    $.__views.dateView.add($.__views.observation_date_picker1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var paceView = false;
    var dateView = false;
    hideVertical($.paceView);
    hideVertical($.dateView);
    var selfPaced = false;
    var easy = false;
    var brisk = false;
    var leisurely = false;
    var steady = false;
    var vigorous = false;
    var moderate = false;
    var strenuous = false;
    var superStrenuous = false;
    $.paceLabel.text = "";
    __defers["$.__views.test!click!testFilter"] && $.addListener($.__views.test, "click", testFilter);
    __defers["$.__views.pace!click!hidePaceView"] && $.addListener($.__views.pace, "click", hidePaceView);
    __defers["$.__views.__alloyId2!click!selfPaced"] && $.addListener($.__views.__alloyId2, "click", selfPaced);
    __defers["$.__views.__alloyId3!click!easy"] && $.addListener($.__views.__alloyId3, "click", easy);
    __defers["$.__views.__alloyId4!click!leisurely"] && $.addListener($.__views.__alloyId4, "click", leisurely);
    __defers["$.__views.__alloyId5!click!steady"] && $.addListener($.__views.__alloyId5, "click", steady);
    __defers["$.__views.__alloyId6!click!moderate"] && $.addListener($.__views.__alloyId6, "click", moderate);
    __defers["$.__views.__alloyId7!click!brisk"] && $.addListener($.__views.__alloyId7, "click", brisk);
    __defers["$.__views.__alloyId8!click!vigorous"] && $.addListener($.__views.__alloyId8, "click", vigorous);
    __defers["$.__views.__alloyId9!click!strenuous"] && $.addListener($.__views.__alloyId9, "click", strenuous);
    __defers["$.__views.__alloyId10!click!superStrenuous"] && $.addListener($.__views.__alloyId10, "click", superStrenuous);
    __defers["$.__views.date!click!hideDateView"] && $.addListener($.__views.date, "click", hideDateView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;