function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function addPace(pace) {
        Alloy.Globals.pace.push(pace);
        $.paceLabel.text = $.paceLabel.text + " " + pace;
    }
    function removePace(pace) {
        Alloy.Globals.pace.splice(Alloy.Globals.pace.indexOf(pace), 1);
        $.paceLabel.text = $.paceLabel.text.replace(" " + pace, "");
    }
    function selfPaced() {
        selfPaced ? removePace("Self Paced") : addPace("Self Paced");
        selfPaced = !selfPaced;
    }
    function easy() {
        easy ? removePace("Easy") : addPace("Easy");
        easy = !easy;
    }
    function brisk() {
        brisk ? removePace("Brisk") : addPace("Brisk");
        brisk = !brisk;
    }
    function leisurely() {
        leisurely ? removePace("Leisurely") : addPace("Leisurely");
        leisurely = !leisurely;
    }
    function steady() {
        steady ? removePace("Steady") : addPace("Steady");
        steady = !steady;
    }
    function moderate() {
        moderate ? removePace("Moderate") : addPace("Moderate");
        moderate = !moderate;
    }
    function vigorous() {
        vigorous ? removePace("Vigorous") : addPace("Vigorous");
        vigorous = !vigorous;
    }
    function strenuous() {
        strenuous ? removePace("Strenuous") : addPace("Strenuous");
        strenuous = !strenuous;
    }
    function superStrenuous() {
        superStrenuous ? removePace("Super Strenuous") : addPace("Super Strenuous");
        superStrenuous = !superStrenuous;
    }
    function hidePaceView() {
        hideView($.paceView, paceView);
        paceView = !paceView;
    }
    function hideDateView() {
        hideView($.dateView, dateView);
        dateView = !dateView;
    }
    function hideDistanceView() {
        hideView($.distanceView, distanceView);
        distanceView = !distanceView;
    }
    function hideView(View, flag) {
        flag ? hideVertical(View) : showVertical(View);
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
    function testFilter() {
        Alloy.Globals.startDateTime = $.startDate.value;
        Alloy.Globals.endDateTime = $.endDate.value;
        Alloy.Globals.startDateTime.setHours($.startTimeSlider.value - 7, 0, 0);
        console.log(Alloy.Globals.startDateTime);
        Alloy.Globals.endDateTime.setHours($.endTimeSlider.value - 7, 0, 0);
        console.log(Alloy.Globals.endDateTime);
        Alloy.Globals.sDistance = $.sDistanceSlider.value;
        Alloy.Globals.eDistance = $.eDistanceSlider.value;
        Alloy.Collections.feed.fetch({
            url: "https://www.cascade.org/DailyRides/rss.xml"
        });
        $.fwin.close();
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
        navTintColor: "#FFF",
        translucent: false,
        titleAttributes: {
            color: "#FFF"
        },
        id: "fwin",
        title: "Filter",
        layout: "vertical"
    });
    $.__views.fwin && $.addTopLevelView($.__views.fwin);
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView",
        layout: "vertical",
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: true,
        height: "100%",
        width: "100%"
    });
    $.__views.fwin.add($.__views.scrollView);
    $.__views.paceRow = Ti.UI.createView({
        id: "paceRow",
        top: 0,
        width: "100%",
        height: 30,
        layout: "horizontal"
    });
    $.__views.scrollView.add($.__views.paceRow);
    $.__views.pace = Ti.UI.createButton({
        title: "Pace",
        top: 0,
        id: "pace"
    });
    $.__views.paceRow.add($.__views.pace);
    hidePaceView ? $.addListener($.__views.pace, "click", hidePaceView) : __defers["$.__views.pace!click!hidePaceView"] = true;
    $.__views.paceLabel = Ti.UI.createLabel({
        color: "#000",
        top: 0,
        left: 15,
        id: "paceLabel"
    });
    $.__views.paceRow.add($.__views.paceLabel);
    $.__views.paceView = Ti.UI.createView({
        id: "paceView",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "50%",
        layout: "vertical",
        visible: false
    });
    $.__views.scrollView.add($.__views.paceView);
    $.__views.firstRow = Ti.UI.createView({
        id: "firstRow",
        left: 15,
        width: "100%",
        height: 60,
        layout: "horizontal"
    });
    $.__views.paceView.add($.__views.firstRow);
    $.__views.__alloyId0 = Ti.UI.createButton({
        title: "Self Paced",
        left: 15,
        id: "__alloyId0"
    });
    $.__views.firstRow.add($.__views.__alloyId0);
    selfPaced ? $.addListener($.__views.__alloyId0, "click", selfPaced) : __defers["$.__views.__alloyId0!click!selfPaced"] = true;
    $.__views.__alloyId1 = Ti.UI.createButton({
        title: "Easy",
        left: 15,
        id: "__alloyId1"
    });
    $.__views.firstRow.add($.__views.__alloyId1);
    easy ? $.addListener($.__views.__alloyId1, "click", easy) : __defers["$.__views.__alloyId1!click!easy"] = true;
    $.__views.__alloyId2 = Ti.UI.createButton({
        title: "Leisurely",
        left: 15,
        id: "__alloyId2"
    });
    $.__views.firstRow.add($.__views.__alloyId2);
    leisurely ? $.addListener($.__views.__alloyId2, "click", leisurely) : __defers["$.__views.__alloyId2!click!leisurely"] = true;
    $.__views.secondRow = Ti.UI.createView({
        id: "secondRow",
        left: 15,
        top: 20,
        width: "100%",
        height: 60,
        layout: "horizontal"
    });
    $.__views.paceView.add($.__views.secondRow);
    $.__views.__alloyId3 = Ti.UI.createButton({
        title: "Steady",
        left: 15,
        id: "__alloyId3"
    });
    $.__views.secondRow.add($.__views.__alloyId3);
    steady ? $.addListener($.__views.__alloyId3, "click", steady) : __defers["$.__views.__alloyId3!click!steady"] = true;
    $.__views.__alloyId4 = Ti.UI.createButton({
        title: "Moderate",
        left: 15,
        id: "__alloyId4"
    });
    $.__views.secondRow.add($.__views.__alloyId4);
    moderate ? $.addListener($.__views.__alloyId4, "click", moderate) : __defers["$.__views.__alloyId4!click!moderate"] = true;
    $.__views.__alloyId5 = Ti.UI.createButton({
        title: "Brisk",
        left: 15,
        id: "__alloyId5"
    });
    $.__views.secondRow.add($.__views.__alloyId5);
    brisk ? $.addListener($.__views.__alloyId5, "click", brisk) : __defers["$.__views.__alloyId5!click!brisk"] = true;
    $.__views.thirdRow = Ti.UI.createView({
        id: "thirdRow",
        left: 15,
        top: 20,
        width: "100%",
        height: 60,
        layout: "horizontal"
    });
    $.__views.paceView.add($.__views.thirdRow);
    $.__views.__alloyId6 = Ti.UI.createButton({
        title: "Vigorous",
        left: 15,
        id: "__alloyId6"
    });
    $.__views.thirdRow.add($.__views.__alloyId6);
    vigorous ? $.addListener($.__views.__alloyId6, "click", vigorous) : __defers["$.__views.__alloyId6!click!vigorous"] = true;
    $.__views.__alloyId7 = Ti.UI.createButton({
        title: "Strenuous",
        left: 15,
        id: "__alloyId7"
    });
    $.__views.thirdRow.add($.__views.__alloyId7);
    strenuous ? $.addListener($.__views.__alloyId7, "click", strenuous) : __defers["$.__views.__alloyId7!click!strenuous"] = true;
    $.__views.__alloyId8 = Ti.UI.createButton({
        title: "Super Strenuous",
        left: 15,
        id: "__alloyId8"
    });
    $.__views.thirdRow.add($.__views.__alloyId8);
    superStrenuous ? $.addListener($.__views.__alloyId8, "click", superStrenuous) : __defers["$.__views.__alloyId8!click!superStrenuous"] = true;
    $.__views.dateRow = Ti.UI.createView({
        id: "dateRow",
        top: 0,
        width: "100%",
        layout: "horizontal",
        height: 30
    });
    $.__views.scrollView.add($.__views.dateRow);
    $.__views.date = Ti.UI.createButton({
        left: 0,
        title: "DateTime",
        top: 0,
        id: "date"
    });
    $.__views.dateRow.add($.__views.date);
    hideDateView ? $.addListener($.__views.date, "click", hideDateView) : __defers["$.__views.date!click!hideDateView"] = true;
    $.__views.dateLabel = Ti.UI.createLabel({
        color: "#000",
        top: 0,
        left: 15,
        id: "dateLabel"
    });
    $.__views.dateRow.add($.__views.dateLabel);
    $.__views.dateView = Ti.UI.createView({
        id: "dateView",
        top: 0,
        layout: "vertical",
        visible: false,
        width: "100%",
        height: "100%"
    });
    $.__views.scrollView.add($.__views.dateView);
    $.__views.startDate = Ti.UI.createPicker({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        selectionIndicator: "true",
        useSpinner: "true",
        format24: false,
        calendarViewShown: false,
        top: 0,
        id: "startDate",
        type: Titanium.UI.PICKER_TYPE_DATE
    });
    $.__views.dateView.add($.__views.startDate);
    $.__views.start = Ti.UI.createView({
        id: "start",
        width: "100%",
        height: 30,
        layout: "horizontal"
    });
    $.__views.dateView.add($.__views.start);
    $.__views.startTimeLabel = Ti.UI.createLabel({
        color: "#000",
        top: 0,
        id: "startTimeLabel"
    });
    $.__views.start.add($.__views.startTimeLabel);
    $.__views.startTimeSlider = Ti.UI.createSlider({
        id: "startTimeSlider",
        top: 0,
        min: 0,
        max: 24,
        value: 0
    });
    $.__views.start.add($.__views.startTimeSlider);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        color: "#000",
        text: "To",
        top: 0,
        id: "__alloyId9"
    });
    $.__views.dateView.add($.__views.__alloyId9);
    $.__views.endDate = Ti.UI.createPicker({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        selectionIndicator: "true",
        useSpinner: "true",
        format24: false,
        calendarViewShown: false,
        top: 0,
        id: "endDate",
        type: Titanium.UI.PICKER_TYPE_DATE
    });
    $.__views.dateView.add($.__views.endDate);
    $.__views.end = Ti.UI.createView({
        id: "end",
        width: "100%",
        height: 30,
        layout: "horizontal"
    });
    $.__views.dateView.add($.__views.end);
    $.__views.endTimeLabel = Ti.UI.createLabel({
        color: "#000",
        top: 0,
        id: "endTimeLabel"
    });
    $.__views.end.add($.__views.endTimeLabel);
    $.__views.endTimeSlider = Ti.UI.createSlider({
        id: "endTimeSlider",
        max: 24,
        value: 24,
        top: 0
    });
    $.__views.end.add($.__views.endTimeSlider);
    $.__views.distanceRow = Ti.UI.createView({
        id: "distanceRow",
        top: 0,
        width: "100%",
        height: 30,
        layout: "horizontal"
    });
    $.__views.scrollView.add($.__views.distanceRow);
    $.__views.distance = Ti.UI.createButton({
        title: "Distance",
        top: 0,
        id: "distance"
    });
    $.__views.distanceRow.add($.__views.distance);
    hideDistanceView ? $.addListener($.__views.distance, "click", hideDistanceView) : __defers["$.__views.distance!click!hideDistanceView"] = true;
    $.__views.distanceLabel = Ti.UI.createLabel({
        color: "#000",
        top: 0,
        left: 15,
        id: "distanceLabel"
    });
    $.__views.distanceRow.add($.__views.distanceLabel);
    $.__views.distanceView = Ti.UI.createView({
        id: "distanceView",
        top: 0,
        layout: "vertical",
        visible: false,
        width: "100%",
        height: "50%"
    });
    $.__views.scrollView.add($.__views.distanceView);
    $.__views.sDistance = Ti.UI.createView({
        id: "sDistance",
        width: "100%",
        height: 30,
        layout: "horizontal"
    });
    $.__views.distanceView.add($.__views.sDistance);
    $.__views.sDistanceLabel = Ti.UI.createLabel({
        color: "#000",
        top: 0,
        id: "sDistanceLabel"
    });
    $.__views.sDistance.add($.__views.sDistanceLabel);
    $.__views.sDistanceSlider = Ti.UI.createSlider({
        id: "sDistanceSlider",
        min: 0,
        max: 100,
        width: "100%",
        value: 0,
        top: 0
    });
    $.__views.sDistance.add($.__views.sDistanceSlider);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        color: "#000",
        text: "To",
        top: 0,
        id: "__alloyId10"
    });
    $.__views.distanceView.add($.__views.__alloyId10);
    $.__views.eDistance = Ti.UI.createView({
        id: "eDistance",
        width: "100%",
        height: 30,
        layout: "horizontal"
    });
    $.__views.distanceView.add($.__views.eDistance);
    $.__views.eDistanceLabel = Ti.UI.createLabel({
        color: "#000",
        top: 0,
        id: "eDistanceLabel"
    });
    $.__views.eDistance.add($.__views.eDistanceLabel);
    $.__views.eDistanceSlider = Ti.UI.createSlider({
        id: "eDistanceSlider",
        max: 100,
        width: "100%",
        value: 100,
        top: 0
    });
    $.__views.eDistance.add($.__views.eDistanceSlider);
    $.__views.test = Ti.UI.createButton({
        title: "Apply",
        top: 0,
        id: "test"
    });
    $.__views.scrollView.add($.__views.test);
    testFilter ? $.addListener($.__views.test, "click", testFilter) : __defers["$.__views.test!click!testFilter"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var paceView = false;
    var dateView = false;
    var distanceView = false;
    hideVertical($.paceView);
    hideVertical($.dateView);
    hideVertical($.distanceView);
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
    $.dateLabel.text = "";
    $.distanceLabel.text = "";
    $.startDate.minDate = new Date();
    $.startDate.maxDate = new Date(2020, 3, 3);
    $.endDate.maxDate = new Date(2020, 3, 3);
    $.startDate.value = $.startDate.minDate;
    $.endDate.value = $.endDate.maxDate;
    $.startDate.addEventListener("change", function(e) {
        console.log(e.value);
        $.endDate.minDate = e.value;
    });
    $.endDate.addEventListener("change", function() {
        console.log($.startDate.value.getMonth());
    });
    $.startTimeSlider.addEventListener("touchend", function(e) {
        this.value = Math.round(e.value);
        $.startTimeLabel.text = this.value;
    });
    $.startTimeSlider.addEventListener("change", function(e) {
        $.startTimeLabel.text = Math.round(e.value);
        $.endTimeSlider.min = $.startTimeSlider.value;
        $.endTimeSlider.value = $.endTimeSlider.min;
    });
    $.endTimeSlider.addEventListener("touchend", function(e) {
        this.value = Math.round(e.value);
        $.endTimeLabel.text = this.value;
    });
    $.endTimeSlider.addEventListener("change", function(e) {
        $.endTimeLabel.text = Math.round(e.value);
    });
    $.sDistanceSlider.addEventListener("touchend", function(e) {
        this.value = Math.round(e.value);
        $.sDistanceLabel.text = this.value;
    });
    $.sDistanceSlider.addEventListener("change", function(e) {
        $.sDistanceLabel.text = Math.round(e.value);
        $.eDistanceSlider.min = e.value;
        $.eDistanceSlider.value = $.eDistanceSlider.min;
    });
    $.eDistanceSlider.addEventListener("touchend", function(e) {
        this.value = Math.round(e.value);
        $.eDistanceLabel.text = this.value;
    });
    $.eDistanceSlider.addEventListener("change", function(e) {
        $.eDistanceLabel.text = Math.round(e.value);
        $.distanceLabel.text = $.sDistanceSlider.value + " - " + e.value + " miles";
    });
    __defers["$.__views.pace!click!hidePaceView"] && $.addListener($.__views.pace, "click", hidePaceView);
    __defers["$.__views.__alloyId0!click!selfPaced"] && $.addListener($.__views.__alloyId0, "click", selfPaced);
    __defers["$.__views.__alloyId1!click!easy"] && $.addListener($.__views.__alloyId1, "click", easy);
    __defers["$.__views.__alloyId2!click!leisurely"] && $.addListener($.__views.__alloyId2, "click", leisurely);
    __defers["$.__views.__alloyId3!click!steady"] && $.addListener($.__views.__alloyId3, "click", steady);
    __defers["$.__views.__alloyId4!click!moderate"] && $.addListener($.__views.__alloyId4, "click", moderate);
    __defers["$.__views.__alloyId5!click!brisk"] && $.addListener($.__views.__alloyId5, "click", brisk);
    __defers["$.__views.__alloyId6!click!vigorous"] && $.addListener($.__views.__alloyId6, "click", vigorous);
    __defers["$.__views.__alloyId7!click!strenuous"] && $.addListener($.__views.__alloyId7, "click", strenuous);
    __defers["$.__views.__alloyId8!click!superStrenuous"] && $.addListener($.__views.__alloyId8, "click", superStrenuous);
    __defers["$.__views.date!click!hideDateView"] && $.addListener($.__views.date, "click", hideDateView);
    __defers["$.__views.distance!click!hideDistanceView"] && $.addListener($.__views.distance, "click", hideDistanceView);
    __defers["$.__views.test!click!testFilter"] && $.addListener($.__views.test, "click", testFilter);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;