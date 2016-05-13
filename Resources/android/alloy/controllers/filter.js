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
        var distance = [ min, max ];
        Alloy.Globals.distance.push(distance);
        string = min + " - " + max + " miles ";
        $.distanceLabel.text = $.distanceLabel.text + string;
    }
    function removeDistance(min) {
        for (var j = 0; j < Alloy.Globals.distance.length; j++) Alloy.Globals.distance[j][0] == min && Alloy.Globals.distance.splice(j, 1);
        $.distanceLabel.text = "";
        if (0 != Alloy.Globals.distance.length) for (var i = 0; i < Alloy.Globals.distance.length; i++) {
            string = Alloy.Globals.distance[i][0] + " - " + Alloy.Globals.distance[i][1] + " miles ";
            $.distanceLabel.text = $.distanceLabel.text + string;
        }
    }
    function ten() {
        Alloy.Globals.ten ? removeDistance(10, 20) : addDistance(10, 20);
        Alloy.Globals.ten = !Alloy.Globals.ten;
    }
    function twenty() {
        Alloy.Globals.twenty ? removeDistance(20, 30) : addDistance(20, 30);
        Alloy.Globals.twenty = !Alloy.Globals.twenty;
    }
    function thirty() {
        Alloy.Globals.thirty ? removeDistance(30, 40) : addDistance(30, 40);
        Alloy.Globals.thirty = !Alloy.Globals.thirty;
    }
    function fourty() {
        Alloy.Globals.fourty ? removeDistance(40, 50) : addDistance(40, 50);
        Alloy.Globals.fourty = !Alloy.Globals.fourty;
    }
    function fifty() {
        Alloy.Globals.fifty ? removeDistance(50, 60) : addDistance(50, 60);
        Alloy.Globals.fifty = !Alloy.Globals.fifty;
    }
    function sixty() {
        Alloy.Globals.sixty ? removeDistance(60, 70) : addDistance(60, 70);
        Alloy.Globals.sixty = !Alloy.Globals.sixty;
    }
    function seventy() {
        Alloy.Globals.seventy ? removeDistance(70, 80) : addDistance(70, 80);
        Alloy.Globals.seventy = !Alloy.Globals.seventy;
    }
    function eighty() {
        Alloy.Globals.eighty ? removeDistance(80, 90) : addDistance(80, 90);
        Alloy.Globals.eighty = !Alloy.Globals.eighty;
    }
    function ninety() {
        Alloy.Globals.ninety ? removeDistance(90, 200) : addDistance(90, 200);
        Alloy.Globals.ninety = !Alloy.Globals.ninety;
    }
    function selfPaced() {
        Alloy.Globals.selfPaced ? removePace("Self Paced") : addPace("Self Paced");
        Alloy.Globals.selfPaced = !Alloy.Globals.selfPaced;
    }
    function easy() {
        Alloy.Globals.easy ? removePace("Easy") : addPace("Easy");
        Alloy.Globals.easy = !Alloy.Globals.easy;
    }
    function brisk() {
        Alloy.Globals.brisk ? removePace("Brisk") : addPace("Brisk");
        Alloy.Globals.brisk = !Alloy.Globals.brisk;
    }
    function leisurely() {
        Alloy.Globals.leisurely ? removePace("Leisurely") : addPace("Leisurely");
        Alloy.Globals.leisurely = !Alloy.Globals.leisurely;
    }
    function steady() {
        Alloy.Globals.steady ? removePace("Steady") : addPace("Steady");
        Alloy.Globals.steady = !Alloy.Globals.steady;
    }
    function moderate() {
        Alloy.Globals.moderate ? removePace("Moderate") : addPace("Moderate");
        Alloy.Globals.moderate = !Alloy.Globals.moderate;
    }
    function vigorous() {
        Alloy.Globals.vigorous ? removePace("Vigorous") : addPace("Vigorous");
        Alloy.Globals.vigorous = !Alloy.Globals.vigorous;
    }
    function strenuous() {
        Alloy.Globals.strenuous ? removePace("Strenuous") : addPace("Strenuous");
        Alloy.Globals.strenuous = !Alloy.Globals.strenuous;
    }
    function superStrenuous() {
        Alloy.Globals.superStrenuous ? removePace("Super Strenuous") : addPace("Super Strenuous");
        Alloy.Globals.superStrenuous = !Alloy.Globals.superStrenuous;
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
            $.startTimeSlider.min = 0;
            $.startTimeSlider.max = 24;
            $.endTimeSlider.min = 0;
            $.endTimeSlider.max = 24;
            if (0 == Alloy.Globals.startDateTime.length) {
                $.startDate.value = $.startDate.minDate;
                $.endDate.value = $.endDate.minDate;
                Alloy.Globals.startDateTime[0] = $.startDate.value;
                Alloy.Globals.startDateTime[1] = $.endDate.value;
                $.startTimeSlider.value = 0;
                $.endTimeSlider.value = 0;
                Alloy.Globals.startDateTime[0].setUTCHours(0, 0, 0, 0);
                Alloy.Globals.startDateTime[1].setUTCHours(0, 0, 0, 0);
            } else {
                $.startDate.value = Alloy.Globals.startDateTime[0];
                $.endDate.value = Alloy.Globals.startDateTime[1];
                $.startTimeSlider.value = Alloy.Globals.startDateTime[0].getUTCHours();
                $.endTimeSlider.value = Alloy.Globals.startDateTime[1].getUTCHours();
            }
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
        $.paceLabel.text = 0 == Alloy.Globals.pace.length ? "" : Alloy.Globals.pace.toString();
        $.dateLabel.text = 0 == Alloy.Globals.startDateTime.length ? "" : monthNames[Alloy.Globals.startDateTime[0].getUTCMonth()] + Alloy.Globals.startDateTime[0].getUTCDate() + " - " + monthNames[Alloy.Globals.startDateTime[1].getUTCMonth()] + Alloy.Globals.startDateTime[1].getUTCDate() + " " + Alloy.Globals.startDateTime[0].getUTCHours() + ":00 - " + Alloy.Globals.startDateTime[1].getUTCHours() + ":00";
        $.distanceLabel.text = "";
        if (0 != Alloy.Globals.distance.length) for (var i = 0; i < Alloy.Globals.distance.length; i++) {
            string = Alloy.Globals.distance[i][0] + " - " + Alloy.Globals.distance[i][1] + " miles ";
            $.distanceLabel.text = $.distanceLabel.text + string;
        }
    }
    function resetFilter() {
        Alloy.Globals.startDateTime = [];
        Alloy.Globals.pace = [];
        Alloy.Globals.distance = [];
        initiate();
    }
    function cancelFilter() {
        $.fwin.close();
    }
    function afterFetch() {
        if (0 == Alloy.Collections.feed.models.length) {
            var dialog = Ti.UI.createAlertDialog({
                message: "No Result",
                ok: "OK"
            });
            dialog.addEventListener("click", function() {
                Alloy.Globals.Navigator.open("filter", $.fwin);
            });
            dialog.show();
        }
    }
    function applyFilter() {
        Alloy.Collections.feed.fetch({
            url: "https://www.cascade.org/DailyRides/rss.xml",
            success: afterFetch,
            error: afterFetch
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
        barColor: "#43B02A",
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
    $.__views.__alloyId4 = Ti.UI.createButton({
        title: "Self Paced",
        left: 5,
        width: 50,
        id: "__alloyId4"
    });
    $.__views.firstRow.add($.__views.__alloyId4);
    selfPaced ? $.addListener($.__views.__alloyId4, "click", selfPaced) : __defers["$.__views.__alloyId4!click!selfPaced"] = true;
    $.__views.__alloyId5 = Ti.UI.createButton({
        title: "Easy",
        left: 0,
        width: 50,
        id: "__alloyId5"
    });
    $.__views.firstRow.add($.__views.__alloyId5);
    easy ? $.addListener($.__views.__alloyId5, "click", easy) : __defers["$.__views.__alloyId5!click!easy"] = true;
    $.__views.__alloyId6 = Ti.UI.createButton({
        title: "Leisurely",
        left: 0,
        width: 50,
        id: "__alloyId6"
    });
    $.__views.firstRow.add($.__views.__alloyId6);
    leisurely ? $.addListener($.__views.__alloyId6, "click", leisurely) : __defers["$.__views.__alloyId6!click!leisurely"] = true;
    $.__views.secondRow = Ti.UI.createView({
        id: "secondRow",
        top: 20,
        width: "100%",
        height: 30,
        layout: "horizontal"
    });
    $.__views.paceView.add($.__views.secondRow);
    $.__views.__alloyId7 = Ti.UI.createButton({
        title: "Steady",
        left: 5,
        id: "__alloyId7"
    });
    $.__views.secondRow.add($.__views.__alloyId7);
    steady ? $.addListener($.__views.__alloyId7, "click", steady) : __defers["$.__views.__alloyId7!click!steady"] = true;
    $.__views.__alloyId8 = Ti.UI.createButton({
        title: "Moderate",
        left: 0,
        id: "__alloyId8"
    });
    $.__views.secondRow.add($.__views.__alloyId8);
    moderate ? $.addListener($.__views.__alloyId8, "click", moderate) : __defers["$.__views.__alloyId8!click!moderate"] = true;
    $.__views.__alloyId9 = Ti.UI.createButton({
        title: "Brisk",
        left: 0,
        id: "__alloyId9"
    });
    $.__views.secondRow.add($.__views.__alloyId9);
    brisk ? $.addListener($.__views.__alloyId9, "click", brisk) : __defers["$.__views.__alloyId9!click!brisk"] = true;
    $.__views.thirdRow = Ti.UI.createView({
        id: "thirdRow",
        top: 20,
        width: "100%",
        height: 30,
        layout: "horizontal"
    });
    $.__views.paceView.add($.__views.thirdRow);
    $.__views.__alloyId10 = Ti.UI.createButton({
        title: "Vigorous",
        left: 5,
        id: "__alloyId10"
    });
    $.__views.thirdRow.add($.__views.__alloyId10);
    vigorous ? $.addListener($.__views.__alloyId10, "click", vigorous) : __defers["$.__views.__alloyId10!click!vigorous"] = true;
    $.__views.__alloyId11 = Ti.UI.createButton({
        title: "Strenuous",
        left: 0,
        id: "__alloyId11"
    });
    $.__views.thirdRow.add($.__views.__alloyId11);
    strenuous ? $.addListener($.__views.__alloyId11, "click", strenuous) : __defers["$.__views.__alloyId11!click!strenuous"] = true;
    $.__views.__alloyId12 = Ti.UI.createButton({
        title: "Super Strenuous",
        left: 0,
        id: "__alloyId12"
    });
    $.__views.thirdRow.add($.__views.__alloyId12);
    superStrenuous ? $.addListener($.__views.__alloyId12, "click", superStrenuous) : __defers["$.__views.__alloyId12!click!superStrenuous"] = true;
    $.__views.dateRow = Ti.UI.createView({
        id: "dateRow",
        top: 0,
        width: "100%",
        layout: "horizontal",
        height: 30
    });
    $.__views.scrollView.add($.__views.dateRow);
    $.__views.date = Ti.UI.createButton({
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
        top: 0
    });
    $.__views.start.add($.__views.startTimeSlider);
    $.__views.__alloyId13 = Ti.UI.createLabel({
        color: "#000",
        text: "To",
        top: 0,
        id: "__alloyId13"
    });
    $.__views.dateView.add($.__views.__alloyId13);
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
    $.__views.__alloyId14 = Ti.UI.createButton({
        title: "10-20",
        left: 15,
        id: "__alloyId14"
    });
    $.__views.firstRow1.add($.__views.__alloyId14);
    ten ? $.addListener($.__views.__alloyId14, "click", ten) : __defers["$.__views.__alloyId14!click!ten"] = true;
    $.__views.__alloyId15 = Ti.UI.createButton({
        title: "20-30",
        left: 0,
        id: "__alloyId15"
    });
    $.__views.firstRow1.add($.__views.__alloyId15);
    twenty ? $.addListener($.__views.__alloyId15, "click", twenty) : __defers["$.__views.__alloyId15!click!twenty"] = true;
    $.__views.__alloyId16 = Ti.UI.createButton({
        title: "30-40",
        left: 0,
        id: "__alloyId16"
    });
    $.__views.firstRow1.add($.__views.__alloyId16);
    thirty ? $.addListener($.__views.__alloyId16, "click", thirty) : __defers["$.__views.__alloyId16!click!thirty"] = true;
    $.__views.secondRow1 = Ti.UI.createView({
        id: "secondRow1",
        top: 20,
        width: "100%",
        height: 60,
        layout: "horizontal"
    });
    $.__views.distanceView.add($.__views.secondRow1);
    $.__views.__alloyId17 = Ti.UI.createButton({
        title: "40-50",
        left: 15,
        id: "__alloyId17"
    });
    $.__views.secondRow1.add($.__views.__alloyId17);
    fourty ? $.addListener($.__views.__alloyId17, "click", fourty) : __defers["$.__views.__alloyId17!click!fourty"] = true;
    $.__views.__alloyId18 = Ti.UI.createButton({
        title: "50-60",
        left: 0,
        id: "__alloyId18"
    });
    $.__views.secondRow1.add($.__views.__alloyId18);
    fifty ? $.addListener($.__views.__alloyId18, "click", fifty) : __defers["$.__views.__alloyId18!click!fifty"] = true;
    $.__views.__alloyId19 = Ti.UI.createButton({
        title: "60-70",
        left: 0,
        id: "__alloyId19"
    });
    $.__views.secondRow1.add($.__views.__alloyId19);
    sixty ? $.addListener($.__views.__alloyId19, "click", sixty) : __defers["$.__views.__alloyId19!click!sixty"] = true;
    $.__views.thirdRow1 = Ti.UI.createView({
        id: "thirdRow1",
        top: 20,
        width: "100%",
        height: 60,
        layout: "horizontal"
    });
    $.__views.distanceView.add($.__views.thirdRow1);
    $.__views.__alloyId20 = Ti.UI.createButton({
        title: "70-80",
        left: 15,
        id: "__alloyId20"
    });
    $.__views.thirdRow1.add($.__views.__alloyId20);
    seventy ? $.addListener($.__views.__alloyId20, "click", seventy) : __defers["$.__views.__alloyId20!click!seventy"] = true;
    $.__views.__alloyId21 = Ti.UI.createButton({
        title: "80-90",
        left: 0,
        id: "__alloyId21"
    });
    $.__views.thirdRow1.add($.__views.__alloyId21);
    eighty ? $.addListener($.__views.__alloyId21, "click", eighty) : __defers["$.__views.__alloyId21!click!eighty"] = true;
    $.__views.__alloyId22 = Ti.UI.createButton({
        title: "90+",
        left: 0,
        id: "__alloyId22"
    });
    $.__views.thirdRow1.add($.__views.__alloyId22);
    ninety ? $.addListener($.__views.__alloyId22, "click", ninety) : __defers["$.__views.__alloyId22!click!ninety"] = true;
    $.__views.__alloyId23 = Ti.UI.createView({
        top: 0,
        width: "100%",
        height: 30,
        layout: "horizontal",
        id: "__alloyId23"
    });
    $.__views.scrollView.add($.__views.__alloyId23);
    $.__views.cancel = Ti.UI.createButton({
        title: "Cancel",
        top: 0,
        left: 70,
        id: "cancel"
    });
    $.__views.__alloyId23.add($.__views.cancel);
    cancelFilter ? $.addListener($.__views.cancel, "click", cancelFilter) : __defers["$.__views.cancel!click!cancelFilter"] = true;
    $.__views.reset = Ti.UI.createButton({
        title: "Reset",
        top: 0,
        left: 70,
        id: "reset"
    });
    $.__views.__alloyId23.add($.__views.reset);
    resetFilter ? $.addListener($.__views.reset, "click", resetFilter) : __defers["$.__views.reset!click!resetFilter"] = true;
    $.__views.apply = Ti.UI.createButton({
        title: "Apply",
        top: 0,
        left: 70,
        id: "apply"
    });
    $.__views.__alloyId23.add($.__views.apply);
    applyFilter ? $.addListener($.__views.apply, "click", applyFilter) : __defers["$.__views.apply!click!applyFilter"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.fwin.leftNavButton = Ti.UI.createView();
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
        Alloy.Globals.startDateTime[0] = e.value;
        Alloy.Globals.startDateTime[0].setUTCHours($.startTimeSlider.value, 0, 0, 0);
        $.dateLabel.text = monthNames[$.startDate.value.getUTCMonth()] + $.startDate.value.getUTCDate() + " - " + monthNames[$.endDate.value.getUTCMonth()] + $.endDate.value.getUTCDate() + " " + $.startTimeSlider.value + ":00 - " + $.endTimeSlider.value + ":00";
    });
    $.endDate.addEventListener("change", function(e) {
        Alloy.Globals.startDateTime[1] = e.value;
        Alloy.Globals.startDateTime[1].setUTCHours($.endTimeSlider.value, 0, 0, 0);
        $.dateLabel.text = monthNames[$.startDate.value.getUTCMonth()] + $.startDate.value.getUTCDate() + " - " + monthNames[$.endDate.value.getUTCMonth()] + $.endDate.value.getUTCDate() + " " + $.startTimeSlider.value + ":00 - " + $.endTimeSlider.value + ":00";
    });
    $.startTimeSlider.addEventListener("touchend", function(e) {
        this.value = Math.round(e.value);
        $.startTimeLabel.text = this.value;
    });
    $.startTimeSlider.addEventListener("change", function(e) {
        $.startTimeLabel.text = Math.round(e.value);
        $.endTimeSlider.min = e.value;
        Alloy.Globals.startDateTime[0].setUTCHours(e.value, 0, 0, 0);
        $.dateLabel.text = monthNames[$.startDate.value.getUTCMonth()] + $.startDate.value.getUTCDate() + " - " + monthNames[$.endDate.value.getUTCMonth()] + $.endDate.value.getUTCDate() + " " + $.startTimeSlider.value + ":00 - " + $.endTimeSlider.value + ":00";
    });
    $.endTimeSlider.addEventListener("touchend", function(e) {
        this.value = Math.round(e.value);
        $.endTimeLabel.text = this.value;
    });
    $.endTimeSlider.addEventListener("change", function(e) {
        $.endTimeLabel.text = Math.round(e.value);
        Alloy.Globals.startDateTime[1].setUTCHours(e.value, 0, 0, 0);
        $.dateLabel.text = monthNames[$.startDate.value.getUTCMonth()] + $.startDate.value.getUTCDate() + " - " + monthNames[$.endDate.value.getUTCMonth()] + $.endDate.value.getUTCDate() + " " + $.startTimeSlider.value + ":00 - " + $.endTimeSlider.value + ":00";
    });
    __defers["$.__views.pace!click!hidePaceView"] && $.addListener($.__views.pace, "click", hidePaceView);
    __defers["$.__views.paceLabel!click!hideDateView"] && $.addListener($.__views.paceLabel, "click", hideDateView);
    __defers["$.__views.paceFold!click!hidePaceView"] && $.addListener($.__views.paceFold, "click", hidePaceView);
    __defers["$.__views.__alloyId4!click!selfPaced"] && $.addListener($.__views.__alloyId4, "click", selfPaced);
    __defers["$.__views.__alloyId5!click!easy"] && $.addListener($.__views.__alloyId5, "click", easy);
    __defers["$.__views.__alloyId6!click!leisurely"] && $.addListener($.__views.__alloyId6, "click", leisurely);
    __defers["$.__views.__alloyId7!click!steady"] && $.addListener($.__views.__alloyId7, "click", steady);
    __defers["$.__views.__alloyId8!click!moderate"] && $.addListener($.__views.__alloyId8, "click", moderate);
    __defers["$.__views.__alloyId9!click!brisk"] && $.addListener($.__views.__alloyId9, "click", brisk);
    __defers["$.__views.__alloyId10!click!vigorous"] && $.addListener($.__views.__alloyId10, "click", vigorous);
    __defers["$.__views.__alloyId11!click!strenuous"] && $.addListener($.__views.__alloyId11, "click", strenuous);
    __defers["$.__views.__alloyId12!click!superStrenuous"] && $.addListener($.__views.__alloyId12, "click", superStrenuous);
    __defers["$.__views.date!click!hideDateView"] && $.addListener($.__views.date, "click", hideDateView);
    __defers["$.__views.dateLabel!click!hideDateView"] && $.addListener($.__views.dateLabel, "click", hideDateView);
    __defers["$.__views.dateFold!click!hideDateView"] && $.addListener($.__views.dateFold, "click", hideDateView);
    __defers["$.__views.distance!click!hideDistanceView"] && $.addListener($.__views.distance, "click", hideDistanceView);
    __defers["$.__views.distanceLabel!click!hideDistanceView"] && $.addListener($.__views.distanceLabel, "click", hideDistanceView);
    __defers["$.__views.distanceFold!click!hideDistanceView"] && $.addListener($.__views.distanceFold, "click", hideDistanceView);
    __defers["$.__views.__alloyId14!click!ten"] && $.addListener($.__views.__alloyId14, "click", ten);
    __defers["$.__views.__alloyId15!click!twenty"] && $.addListener($.__views.__alloyId15, "click", twenty);
    __defers["$.__views.__alloyId16!click!thirty"] && $.addListener($.__views.__alloyId16, "click", thirty);
    __defers["$.__views.__alloyId17!click!fourty"] && $.addListener($.__views.__alloyId17, "click", fourty);
    __defers["$.__views.__alloyId18!click!fifty"] && $.addListener($.__views.__alloyId18, "click", fifty);
    __defers["$.__views.__alloyId19!click!sixty"] && $.addListener($.__views.__alloyId19, "click", sixty);
    __defers["$.__views.__alloyId20!click!seventy"] && $.addListener($.__views.__alloyId20, "click", seventy);
    __defers["$.__views.__alloyId21!click!eighty"] && $.addListener($.__views.__alloyId21, "click", eighty);
    __defers["$.__views.__alloyId22!click!ninety"] && $.addListener($.__views.__alloyId22, "click", ninety);
    __defers["$.__views.cancel!click!cancelFilter"] && $.addListener($.__views.cancel, "click", cancelFilter);
    __defers["$.__views.reset!click!resetFilter"] && $.addListener($.__views.reset, "click", resetFilter);
    __defers["$.__views.apply!click!applyFilter"] && $.addListener($.__views.apply, "click", applyFilter);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;