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
        $.paceLabel.text = Alloy.Globals.pace.toString();
    }
    function removePace(pace) {
        Alloy.Globals.pace.splice(Alloy.Globals.pace.indexOf(pace), 1);
        $.paceLabel.text = Alloy.Globals.pace.toString();
    }
    function addDistance(min, max) {
        Alloy.Globals.distance = [ min, max ];
        $.distanceLabel.text = min + " - " + max + " miles";
    }
    function ten() {
        addDistance(10, 20);
    }
    function twenty() {
        addDistance(20, 30);
    }
    function thirty() {
        addDistance(30, 40);
    }
    function fourty() {
        addDistance(40, 50);
    }
    function fifty() {
        addDistance(50, 60);
    }
    function sixty() {
        addDistance(60, 70);
    }
    function seventy() {
        addDistance(70, 80);
    }
    function eighty() {
        addDistance(80, 90);
    }
    function ninety() {
        addDistance(90, 200);
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
        $.paceFold.image = paceView ? "/Filter opened.png" : "/Filter open.png";
    }
    function hideDateView() {
        hideView($.dateView, dateView);
        dateView = !dateView;
        if (dateView) {
            $.dateFold.backgroundImage = "/Filter opened.png";
            $.startDate.minDate = new Date();
            $.endDate.minDate = $.startDate.minDate;
            $.startDate.value = Alloy.Globals.startDateTime;
            $.endDate.value = Alloy.Globals.endDateTime;
            $.startTimeSlider.value = Alloy.Globals.startDateTime.getUTCHours();
            $.endTimeSlider.value = Alloy.Globals.endDateTime.getUTCHours();
        } else $.dateFold.backgroundImage = "/Filter open.png";
    }
    function hideDistanceView() {
        hideView($.distanceView, distanceView);
        distanceView = !distanceView;
        $.distanceFold.backgroundImage = distanceView ? "/Filter opened.png" : "/Filter open.png";
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
    function initiate() {
        $.paceLabel.text = Alloy.Globals.pace.toString();
        $.dateLabel.text = monthNames[Alloy.Globals.startDateTime.getMonth()] + Alloy.Globals.startDateTime.getDate() + " - " + monthNames[Alloy.Globals.endDateTime.getMonth()] + Alloy.Globals.endDateTime.getDate() + " " + Alloy.Globals.startDateTime.getUTCHours() + ":00 - " + Alloy.Globals.endDateTime.getUTCHours() + ":00";
        $.distanceLabel.text = Alloy.Globals.distance[0] + " - " + Alloy.Globals.distance[1] + " miles";
    }
    function resetFilter() {
        Alloy.Globals.startDateTime = new Date();
        Alloy.Globals.endDateTime = new Date();
        Alloy.Globals.startDateTime.setUTCHours(0);
        Alloy.Globals.endDateTime.setMonth(Alloy.Globals.startDateTime.getMonth() + 6);
        Alloy.Globals.pace = [];
        Alloy.Globals.distance = [ 0, 100 ];
        initiate();
    }
    function applyFilter() {
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
        height: 30,
        layout: "horizontal"
    });
    $.__views.scrollView.add($.__views.paceRow);
    $.__views.pace = Ti.UI.createButton({
        title: "Pace",
        top: 0,
        id: "pace",
        height: 30,
        width: 50
    });
    $.__views.paceRow.add($.__views.pace);
    hidePaceView ? $.addListener($.__views.pace, "click", hidePaceView) : __defers["$.__views.pace!click!hidePaceView"] = true;
    $.__views.paceLabel = Ti.UI.createLabel({
        color: "#000",
        top: 0,
        left: 15,
        height: 30,
        width: 280,
        id: "paceLabel"
    });
    $.__views.paceRow.add($.__views.paceLabel);
    hideDateView ? $.addListener($.__views.paceLabel, "click", hideDateView) : __defers["$.__views.paceLabel!click!hideDateView"] = true;
    $.__views.paceFold = Ti.UI.createImageView({
        id: "paceFold",
        width: 20,
        image: "Filter open.png"
    });
    $.__views.paceRow.add($.__views.paceFold);
    hidePaceView ? $.addListener($.__views.paceFold, "click", hidePaceView) : __defers["$.__views.paceFold!click!hidePaceView"] = true;
    $.__views.paceView = Ti.UI.createView({
        id: "paceView",
        top: 0,
        left: 0,
        right: 0,
        height: "50%",
        layout: "vertical",
        visible: false
    });
    $.__views.scrollView.add($.__views.paceView);
    $.__views.firstRow = Ti.UI.createView({
        id: "firstRow",
        height: 30,
        layout: "horizontal"
    });
    $.__views.paceView.add($.__views.firstRow);
    $.__views.__alloyId2 = Ti.UI.createButton({
        title: "Self Paced",
        left: 5,
        width: 100,
        id: "__alloyId2"
    });
    $.__views.firstRow.add($.__views.__alloyId2);
    selfPaced ? $.addListener($.__views.__alloyId2, "click", selfPaced) : __defers["$.__views.__alloyId2!click!selfPaced"] = true;
    $.__views.__alloyId3 = Ti.UI.createButton({
        title: "Easy",
        left: 5,
        width: 50,
        id: "__alloyId3"
    });
    $.__views.firstRow.add($.__views.__alloyId3);
    easy ? $.addListener($.__views.__alloyId3, "click", easy) : __defers["$.__views.__alloyId3!click!easy"] = true;
    $.__views.__alloyId4 = Ti.UI.createButton({
        title: "Leisurely",
        left: 5,
        width: 50,
        id: "__alloyId4"
    });
    $.__views.firstRow.add($.__views.__alloyId4);
    leisurely ? $.addListener($.__views.__alloyId4, "click", leisurely) : __defers["$.__views.__alloyId4!click!leisurely"] = true;
    $.__views.secondRow = Ti.UI.createView({
        id: "secondRow",
        top: 20,
        width: "100%",
        height: 60,
        layout: "horizontal"
    });
    $.__views.paceView.add($.__views.secondRow);
    $.__views.__alloyId5 = Ti.UI.createButton({
        title: "Steady",
        left: 15,
        id: "__alloyId5"
    });
    $.__views.secondRow.add($.__views.__alloyId5);
    steady ? $.addListener($.__views.__alloyId5, "click", steady) : __defers["$.__views.__alloyId5!click!steady"] = true;
    $.__views.__alloyId6 = Ti.UI.createButton({
        title: "Moderate",
        left: 20,
        id: "__alloyId6"
    });
    $.__views.secondRow.add($.__views.__alloyId6);
    moderate ? $.addListener($.__views.__alloyId6, "click", moderate) : __defers["$.__views.__alloyId6!click!moderate"] = true;
    $.__views.__alloyId7 = Ti.UI.createButton({
        title: "Brisk",
        left: 25,
        id: "__alloyId7"
    });
    $.__views.secondRow.add($.__views.__alloyId7);
    brisk ? $.addListener($.__views.__alloyId7, "click", brisk) : __defers["$.__views.__alloyId7!click!brisk"] = true;
    $.__views.thirdRow = Ti.UI.createView({
        id: "thirdRow",
        top: 20,
        width: "100%",
        height: 60,
        layout: "horizontal"
    });
    $.__views.paceView.add($.__views.thirdRow);
    $.__views.__alloyId8 = Ti.UI.createButton({
        title: "Vigorous",
        left: 15,
        id: "__alloyId8"
    });
    $.__views.thirdRow.add($.__views.__alloyId8);
    vigorous ? $.addListener($.__views.__alloyId8, "click", vigorous) : __defers["$.__views.__alloyId8!click!vigorous"] = true;
    $.__views.__alloyId9 = Ti.UI.createButton({
        title: "Strenuous",
        left: 20,
        id: "__alloyId9"
    });
    $.__views.thirdRow.add($.__views.__alloyId9);
    strenuous ? $.addListener($.__views.__alloyId9, "click", strenuous) : __defers["$.__views.__alloyId9!click!strenuous"] = true;
    $.__views.__alloyId10 = Ti.UI.createButton({
        title: "Super Strenuous",
        left: 25,
        id: "__alloyId10"
    });
    $.__views.thirdRow.add($.__views.__alloyId10);
    superStrenuous ? $.addListener($.__views.__alloyId10, "click", superStrenuous) : __defers["$.__views.__alloyId10!click!superStrenuous"] = true;
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
    hideDateView ? $.addListener($.__views.dateLabel, "click", hideDateView) : __defers["$.__views.dateLabel!click!hideDateView"] = true;
    $.__views.dateFold = Ti.UI.createButton({
        id: "dateFold",
        left: 290,
        backgroundImage: "Filter open.png"
    });
    $.__views.dateRow.add($.__views.dateFold);
    hideDateView ? $.addListener($.__views.dateFold, "click", hideDateView) : __defers["$.__views.dateFold!click!hideDateView"] = true;
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
        max: 24
    });
    $.__views.start.add($.__views.startTimeSlider);
    $.__views.__alloyId11 = Ti.UI.createLabel({
        color: "#000",
        text: "To",
        top: 0,
        id: "__alloyId11"
    });
    $.__views.dateView.add($.__views.__alloyId11);
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
    hideDistanceView ? $.addListener($.__views.distanceLabel, "click", hideDistanceView) : __defers["$.__views.distanceLabel!click!hideDistanceView"] = true;
    $.__views.distanceFold = Ti.UI.createButton({
        id: "distanceFold",
        left: 290,
        backgroundImage: "Filter open.png"
    });
    $.__views.distanceRow.add($.__views.distanceFold);
    hideDistanceView ? $.addListener($.__views.distanceFold, "click", hideDistanceView) : __defers["$.__views.distanceFold!click!hideDistanceView"] = true;
    $.__views.distanceView = Ti.UI.createView({
        id: "distanceView",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "50%",
        layout: "vertical",
        visible: false
    });
    $.__views.scrollView.add($.__views.distanceView);
    $.__views.firstRow1 = Ti.UI.createView({
        id: "firstRow1",
        width: "100%",
        height: 60,
        layout: "horizontal"
    });
    $.__views.distanceView.add($.__views.firstRow1);
    $.__views.__alloyId12 = Ti.UI.createButton({
        title: "10-20",
        left: 15,
        id: "__alloyId12"
    });
    $.__views.firstRow1.add($.__views.__alloyId12);
    ten ? $.addListener($.__views.__alloyId12, "click", ten) : __defers["$.__views.__alloyId12!click!ten"] = true;
    $.__views.__alloyId13 = Ti.UI.createButton({
        title: "20-30",
        left: 0,
        id: "__alloyId13"
    });
    $.__views.firstRow1.add($.__views.__alloyId13);
    twenty ? $.addListener($.__views.__alloyId13, "click", twenty) : __defers["$.__views.__alloyId13!click!twenty"] = true;
    $.__views.__alloyId14 = Ti.UI.createButton({
        title: "30-40",
        left: 0,
        id: "__alloyId14"
    });
    $.__views.firstRow1.add($.__views.__alloyId14);
    thirty ? $.addListener($.__views.__alloyId14, "click", thirty) : __defers["$.__views.__alloyId14!click!thirty"] = true;
    $.__views.secondRow1 = Ti.UI.createView({
        id: "secondRow1",
        top: 20,
        width: "100%",
        height: 60,
        layout: "horizontal"
    });
    $.__views.distanceView.add($.__views.secondRow1);
    $.__views.__alloyId15 = Ti.UI.createButton({
        title: "40-50",
        left: 15,
        id: "__alloyId15"
    });
    $.__views.secondRow1.add($.__views.__alloyId15);
    fourty ? $.addListener($.__views.__alloyId15, "click", fourty) : __defers["$.__views.__alloyId15!click!fourty"] = true;
    $.__views.__alloyId16 = Ti.UI.createButton({
        title: "50-60",
        left: 0,
        id: "__alloyId16"
    });
    $.__views.secondRow1.add($.__views.__alloyId16);
    fifty ? $.addListener($.__views.__alloyId16, "click", fifty) : __defers["$.__views.__alloyId16!click!fifty"] = true;
    $.__views.__alloyId17 = Ti.UI.createButton({
        title: "60-70",
        left: 0,
        id: "__alloyId17"
    });
    $.__views.secondRow1.add($.__views.__alloyId17);
    sixty ? $.addListener($.__views.__alloyId17, "click", sixty) : __defers["$.__views.__alloyId17!click!sixty"] = true;
    $.__views.thirdRow1 = Ti.UI.createView({
        id: "thirdRow1",
        top: 20,
        width: "100%",
        height: 60,
        layout: "horizontal"
    });
    $.__views.distanceView.add($.__views.thirdRow1);
    $.__views.__alloyId18 = Ti.UI.createButton({
        title: "70-80",
        left: 15,
        id: "__alloyId18"
    });
    $.__views.thirdRow1.add($.__views.__alloyId18);
    seventy ? $.addListener($.__views.__alloyId18, "click", seventy) : __defers["$.__views.__alloyId18!click!seventy"] = true;
    $.__views.__alloyId19 = Ti.UI.createButton({
        title: "80-90",
        left: 0,
        id: "__alloyId19"
    });
    $.__views.thirdRow1.add($.__views.__alloyId19);
    eighty ? $.addListener($.__views.__alloyId19, "click", eighty) : __defers["$.__views.__alloyId19!click!eighty"] = true;
    $.__views.__alloyId20 = Ti.UI.createButton({
        title: "90+",
        left: 0,
        id: "__alloyId20"
    });
    $.__views.thirdRow1.add($.__views.__alloyId20);
    ninety ? $.addListener($.__views.__alloyId20, "click", ninety) : __defers["$.__views.__alloyId20!click!ninety"] = true;
    $.__views.__alloyId21 = Ti.UI.createView({
        top: 0,
        width: "100%",
        height: 30,
        layout: "horizontal",
        id: "__alloyId21"
    });
    $.__views.scrollView.add($.__views.__alloyId21);
    $.__views.reset = Ti.UI.createButton({
        title: "Reset",
        top: 0,
        left: 100,
        id: "reset"
    });
    $.__views.__alloyId21.add($.__views.reset);
    resetFilter ? $.addListener($.__views.reset, "click", resetFilter) : __defers["$.__views.reset!click!resetFilter"] = true;
    $.__views.apply = Ti.UI.createButton({
        title: "Apply",
        top: 0,
        left: 110,
        id: "apply"
    });
    $.__views.__alloyId21.add($.__views.apply);
    applyFilter ? $.addListener($.__views.apply, "click", applyFilter) : __defers["$.__views.apply!click!applyFilter"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("alloy/moment");
    var paceView = false;
    var dateView = false;
    var distanceView = false;
    var monthNames = [ "Jan ", "Feb ", "Mar ", "Apr ", "May ", "Jun ", "Jul ", "Aug ", "Sep ", "Oct ", "Nov ", "Dec " ];
    !function() {
        hideVertical($.paceView);
        hideVertical($.dateView);
        hideVertical($.distanceView);
        initiate();
    }(arguments[0] || {});
    $.startDate.addEventListener("change", function(e) {
        $.endDate.minDate = e.value;
        Alloy.Globals.startDateTime = e.value;
        $.dateLabel.text = monthNames[$.startDate.value.getMonth()] + $.startDate.value.getDate() + " - " + monthNames[$.endDate.value.getMonth()] + $.endDate.value.getDate();
    });
    $.endDate.addEventListener("change", function(e) {
        Alloy.Globals.endDateTime = e.value;
        $.dateLabel.text = monthNames[$.startDate.value.getMonth()] + $.startDate.value.getDate() + " - " + monthNames[$.endDate.value.getMonth()] + $.endDate.value.getDate();
    });
    $.startTimeSlider.addEventListener("touchend", function(e) {
        this.value = Math.round(e.value);
        $.startTimeLabel.text = this.value;
    });
    $.startTimeSlider.addEventListener("change", function(e) {
        $.startTimeLabel.text = Math.round(e.value);
        $.endTimeSlider.min = e.value;
        Alloy.Globals.startDateTime.setUTCHours(e.value, 0, 0, 0);
        $.dateLabel.text = monthNames[$.startDate.value.getMonth()] + $.startDate.value.getDate() + " - " + monthNames[$.endDate.value.getMonth()] + $.endDate.value.getDate() + " " + $.startTimeSlider.value + ":00 - " + $.endTimeSlider.value + ":00";
    });
    $.endTimeSlider.addEventListener("touchend", function(e) {
        this.value = Math.round(e.value);
        $.endTimeLabel.text = this.value;
    });
    $.endTimeSlider.addEventListener("change", function(e) {
        $.endTimeLabel.text = Math.round(e.value);
        Alloy.Globals.endDateTime.setUTCHours($.endTimeSlider.value, 0, 0, 0);
        $.dateLabel.text = monthNames[$.startDate.value.getMonth()] + $.startDate.value.getDate() + " - " + monthNames[$.endDate.value.getMonth()] + $.endDate.value.getDate() + " " + $.startTimeSlider.value + ":00 - " + $.endTimeSlider.value + ":00";
    });
    __defers["$.__views.pace!click!hidePaceView"] && $.addListener($.__views.pace, "click", hidePaceView);
    __defers["$.__views.paceLabel!click!hideDateView"] && $.addListener($.__views.paceLabel, "click", hideDateView);
    __defers["$.__views.paceFold!click!hidePaceView"] && $.addListener($.__views.paceFold, "click", hidePaceView);
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
    __defers["$.__views.dateLabel!click!hideDateView"] && $.addListener($.__views.dateLabel, "click", hideDateView);
    __defers["$.__views.dateFold!click!hideDateView"] && $.addListener($.__views.dateFold, "click", hideDateView);
    __defers["$.__views.distance!click!hideDistanceView"] && $.addListener($.__views.distance, "click", hideDistanceView);
    __defers["$.__views.distanceLabel!click!hideDistanceView"] && $.addListener($.__views.distanceLabel, "click", hideDistanceView);
    __defers["$.__views.distanceFold!click!hideDistanceView"] && $.addListener($.__views.distanceFold, "click", hideDistanceView);
    __defers["$.__views.__alloyId12!click!ten"] && $.addListener($.__views.__alloyId12, "click", ten);
    __defers["$.__views.__alloyId13!click!twenty"] && $.addListener($.__views.__alloyId13, "click", twenty);
    __defers["$.__views.__alloyId14!click!thirty"] && $.addListener($.__views.__alloyId14, "click", thirty);
    __defers["$.__views.__alloyId15!click!fourty"] && $.addListener($.__views.__alloyId15, "click", fourty);
    __defers["$.__views.__alloyId16!click!fifty"] && $.addListener($.__views.__alloyId16, "click", fifty);
    __defers["$.__views.__alloyId17!click!sixty"] && $.addListener($.__views.__alloyId17, "click", sixty);
    __defers["$.__views.__alloyId18!click!seventy"] && $.addListener($.__views.__alloyId18, "click", seventy);
    __defers["$.__views.__alloyId19!click!eighty"] && $.addListener($.__views.__alloyId19, "click", eighty);
    __defers["$.__views.__alloyId20!click!ninety"] && $.addListener($.__views.__alloyId20, "click", ninety);
    __defers["$.__views.reset!click!resetFilter"] && $.addListener($.__views.reset, "click", resetFilter);
    __defers["$.__views.apply!click!applyFilter"] && $.addListener($.__views.apply, "click", applyFilter);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;