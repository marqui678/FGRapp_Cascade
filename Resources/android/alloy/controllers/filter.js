function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId40() {
        $.__views.fwin.removeEventListener("open", __alloyId40);
        if ($.__views.fwin.activity) {
            $.__views.fwin.activity.actionBar.title = "Filter";
            $.__views.fwin.activity.actionBar.displayHomeAsUp = true;
            $.__views.fwin.activity.actionBar.onHomeIconItemSelected = cancelFilter;
        } else {
            Ti.API.warn("You attempted to access an Activity on a lightweight Window or other");
            Ti.API.warn("UI component which does not have an Android activity. Android Activities");
            Ti.API.warn("are valid with only windows in TabGroups or heavyweight Windows.");
        }
    }
    function __alloyId44() {
        $.__views.fwin.removeEventListener("open", __alloyId44);
        if ($.__views.fwin.activity) $.__views.fwin.activity.onCreateOptionsMenu = function(e) {
            var __alloyId43 = {
                title: "Clear All",
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                id: "__alloyId42"
            };
            $.__views.__alloyId42 = e.menu.add(_.pick(__alloyId43, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId42.applyProperties(_.omit(__alloyId43, Alloy.Android.menuItemCreateArgs));
            $.__alloyId42 = $.__views.__alloyId42;
            resetFilter ? $.addListener($.__views.__alloyId42, "click", resetFilter) : __defers["$.__views.__alloyId42!click!resetFilter"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function add(id) {
        id.colorTemp = id.getBackgroundColor();
        id.setBackgroundColor("#006F44");
        id.setColor("white");
    }
    function remove(id) {
        id.setBackgroundColor(id.colorTemp);
        id.setColor("black");
    }
    function addPace(pace, id) {
        Alloy.Globals.pace.push(pace);
        Alloy.Globals.paceID.push(id);
        $.paceLabel.text = Alloy.Globals.pace.toString();
        add($[id]);
    }
    function removePace(pace, id) {
        Alloy.Globals.pace.splice(Alloy.Globals.pace.indexOf(pace), 1);
        Alloy.Globals.paceID.splice(Alloy.Globals.paceID.indexOf(id), 1);
        $.paceLabel.text = Alloy.Globals.pace.toString();
        remove($[id]);
    }
    function addDay(day, id) {
        Alloy.Globals.day.push(day);
        Alloy.Globals.dayID.push(id);
        $.dayLabel.text = Alloy.Globals.day.toString();
        $["check" + day].image = "/images/checked.png";
    }
    function removeDay(day, id) {
        Alloy.Globals.day.splice(Alloy.Globals.day.indexOf(day), 1);
        Alloy.Globals.dayID.splice(Alloy.Globals.dayID.indexOf(id), 1);
        $.dayLabel.text = Alloy.Globals.day.toString();
        $["check" + day].image = "/images/unchecked.png";
    }
    function addDistance(min, max, id) {
        var distance = [ min, max ];
        Alloy.Globals.distance.push(distance);
        Alloy.Globals.distanceID.push(id);
        string = min + "-" + max + " miles ";
        $.distanceLabel.text = "" == $.distanceLabel.text ? string : $.distanceLabel.text + ", " + string;
        add($[id]);
    }
    function removeDistance(min, max, id) {
        for (var j = 0; j < Alloy.Globals.distance.length; j++) Alloy.Globals.distance[j][0] == min && Alloy.Globals.distance.splice(j, 1);
        Alloy.Globals.distanceID.splice(Alloy.Globals.distanceID.indexOf(id, 1));
        $.distanceLabel.text = "";
        if (0 != Alloy.Globals.distance.length) {
            $.distanceLabel.text = Alloy.Globals.distance[0][0] + "-" + Alloy.Globals.distance[0][1] + " miles ";
            if (Alloy.Globals.distance.length > 1) for (var i = 1; i < Alloy.Globals.distance.length; i++) {
                string = ", " + Alloy.Globals.distance[i][0] + "-" + Alloy.Globals.distance[i][1] + " miles ";
                $.distanceLabel.text = $.distanceLabel.text + string;
            }
        }
        remove($[id]);
    }
    function sunday() {
        Alloy.Globals.sunday ? removeDay("Sunday", 0) : addDay("Sunday", 0);
        Alloy.Globals.sunday = !Alloy.Globals.sunday;
    }
    function monday() {
        Alloy.Globals.monday ? removeDay("Monday", 1) : addDay("Monday", 1);
        Alloy.Globals.monday = !Alloy.Globals.monday;
    }
    function tuesday() {
        Alloy.Globals.tuesday ? removeDay("Tuesday", 2) : addDay("Tuesday", 2);
        Alloy.Globals.tuesday = !Alloy.Globals.tuesday;
    }
    function wednesday() {
        Alloy.Globals.wednesday ? removeDay("Wednesday", 3) : addDay("Wednesday", 3);
        Alloy.Globals.wednesday = !Alloy.Globals.wednesday;
    }
    function thursday() {
        Alloy.Globals.thursday ? removeDay("Thursday", 4) : addDay("Thursday", 4);
        Alloy.Globals.thursday = !Alloy.Globals.thursday;
    }
    function friday() {
        Alloy.Globals.friday ? removeDay("Friday", 5) : addDay("Friday", 5);
        Alloy.Globals.friday = !Alloy.Globals.friday;
    }
    function saturday() {
        Alloy.Globals.saturday ? removeDay("Saturday", 6) : addDay("Saturday", 6);
        Alloy.Globals.saturday = !Alloy.Globals.saturday;
    }
    function ten() {
        Alloy.Globals.ten ? removeDistance(10, 20, "ten") : addDistance(10, 20, "ten");
        Alloy.Globals.ten = !Alloy.Globals.ten;
    }
    function twenty() {
        Alloy.Globals.twenty ? removeDistance(20, 30, "twenty") : addDistance(20, 30, "twenty");
        Alloy.Globals.twenty = !Alloy.Globals.twenty;
    }
    function thirty() {
        Alloy.Globals.thirty ? removeDistance(30, 40, "thirty") : addDistance(30, 40, "thirty");
        Alloy.Globals.thirty = !Alloy.Globals.thirty;
    }
    function fourty() {
        Alloy.Globals.fourty ? removeDistance(40, 50, "fourty") : addDistance(40, 50, "fourty");
        Alloy.Globals.fourty = !Alloy.Globals.fourty;
    }
    function fifty() {
        Alloy.Globals.fifty ? removeDistance(50, 60, "fifty") : addDistance(50, 60, "fifty");
        Alloy.Globals.fifty = !Alloy.Globals.fifty;
    }
    function sixty() {
        Alloy.Globals.sixty ? removeDistance(60, 70, "sixty") : addDistance(60, 70, "sixty");
        Alloy.Globals.sixty = !Alloy.Globals.sixty;
    }
    function seventy() {
        Alloy.Globals.seventy ? removeDistance(70, 80, "seventy") : addDistance(70, 80, "seventy");
        Alloy.Globals.seventy = !Alloy.Globals.seventy;
    }
    function eighty() {
        Alloy.Globals.eighty ? removeDistance(80, 90, "eighty") : addDistance(80, 90, "eighty");
        Alloy.Globals.eighty = !Alloy.Globals.eighty;
    }
    function ninety() {
        Alloy.Globals.ninety ? removeDistance(90, 200, "ninety") : addDistance(90, 200, "ninety");
        Alloy.Globals.ninety = !Alloy.Globals.ninety;
    }
    function selfPaced() {
        Alloy.Globals.selfPaced ? removePace("Self Paced", "selfPaced") : addPace("Self Paced", "selfPaced");
        Alloy.Globals.selfPaced = !Alloy.Globals.selfPaced;
    }
    function easy() {
        Alloy.Globals.easy ? removePace("Easy", "easy") : addPace("Easy", "easy");
        Alloy.Globals.easy = !Alloy.Globals.easy;
    }
    function brisk() {
        Alloy.Globals.brisk ? removePace("Brisk", "brisk") : addPace("Brisk", "brisk");
        Alloy.Globals.brisk = !Alloy.Globals.brisk;
    }
    function leisurely() {
        Alloy.Globals.leisurely ? removePace("Leisurely", "leisurely") : addPace("Leisurely", "leisurely");
        Alloy.Globals.leisurely = !Alloy.Globals.leisurely;
    }
    function steady() {
        Alloy.Globals.steady ? removePace("Steady", "steady") : addPace("Steady", "steady");
        Alloy.Globals.steady = !Alloy.Globals.steady;
    }
    function moderate() {
        Alloy.Globals.moderate ? removePace("Moderate", "moderate") : addPace("Moderate", "moderate");
        Alloy.Globals.moderate = !Alloy.Globals.moderate;
    }
    function vigorous() {
        Alloy.Globals.vigorous ? removePace("Vigorous", "vigorous") : addPace("Vigorous", "vigorous");
        Alloy.Globals.vigorous = !Alloy.Globals.vigorous;
    }
    function strenuous() {
        Alloy.Globals.strenuous ? removePace("Strenuous", "strenuous") : addPace("Strenuous", "strenuous");
        Alloy.Globals.strenuous = !Alloy.Globals.strenuous;
    }
    function superStrenuous() {
        Alloy.Globals.superStrenuous ? removePace("Super Strenuous", "superStrenuous") : addPace("Super Strenuous", "superStrenuous");
        Alloy.Globals.superStrenuous = !Alloy.Globals.superStrenuous;
    }
    function hidePaceView() {
        hideView($.paceView, paceView);
        paceView = !paceView;
        $.paceFold.image = paceView ? "/images/Filter opened.png" : "/images/Filter open.png";
    }
    function hideDayView() {
        hideView($.dayView, dayView);
        dayView = !dayView;
        $.dayFold.image = dayView ? "/images/Filter opened.png" : "/images/Filter open.png";
    }
    function hideTimeView() {
        hideView($.timeView, timeView);
        timeView = !timeView;
        $.timeFold.image = timeView ? "/images/Filter opened.png" : "/images/Filter open.png";
    }
    function hideDistanceView() {
        hideView($.distanceView, distanceView);
        distanceView = !distanceView;
        $.distanceFold.image = distanceView ? "/images/Filter opened.png" : "/images/Filter open.png";
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
        if (0 == Alloy.Globals.pace.length) $.paceLabel.text = ""; else {
            $.paceLabel.text = Alloy.Globals.pace.toString();
            for (var i = 0; i < Alloy.Globals.paceID.length; i++) add($[Alloy.Globals.paceID[i]]);
        }
        if (0 == Alloy.Globals.day.length) $.dayLabel.text = ""; else {
            $.dayLabel.text = Alloy.Globals.day.toString();
            for (var i = 0; i < Alloy.Globals.day.length; i++) $["check" + Alloy.Globals.day[i]].image = "/images/checked.png";
        }
        $.distanceLabel.text = "";
        if (0 != Alloy.Globals.distance.length) {
            $.distanceLabel.text = Alloy.Globals.distance[0][0] + "-" + Alloy.Globals.distance[0][1] + " miles ";
            if (Alloy.Globals.distance.length > 1) for (var i = 1; i < Alloy.Globals.distance.length; i++) {
                string = ", " + Alloy.Globals.distance[i][0] + "-" + Alloy.Globals.distance[i][1] + " miles ";
                $.distanceLabel.text = $.distanceLabel.text + string;
            }
            for (var i = 0; i < Alloy.Globals.distanceID.length; i++) add($[Alloy.Globals.distanceID[i]]);
        }
        if (0 == Alloy.Globals.time.length) $.timeLabel.text = ""; else {
            $.startTimeSlider.value = Alloy.Globals.time[0];
            $.endTimeSlider.value = Alloy.Globals.time[1];
            $.timeLabel.text = Alloy.Globals.time[0] + ":00 to " + Alloy.Globals.time[1] + ":00";
        }
    }
    function resetFilter() {
        $.startTimeSlider.value = 0;
        $.endTimeSlider.value = 0;
        Alloy.Globals.day = [];
        Alloy.Globals.dayID = [];
        Alloy.Globals.time = [];
        Alloy.Globals.pace = [];
        Alloy.Globals.paceID = [];
        Alloy.Globals.distance = [];
        Alloy.Globals.distanceID = [];
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
        } else {
            void 0 !== args.prevMapWindow && args.prevMapWindow.fireEvent("filter_updated");
            Alloy.Globals.setDistanceToLocation(Alloy.Collections.feed.models, Alloy.Globals.regionCenter);
        }
    }
    function applyFilter() {
        if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) alert("Your device is not online. Please check your network and try again."); else {
            Alloy.Collections.feed.fetch({
                url: "https://www.cascade.org/DailyRides/rss.xml",
                success: afterFetch,
                error: afterFetch
            });
            $.fwin.close();
        }
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
        width: "100%",
        left: 0
    });
    $.__views.fwin && $.addTopLevelView($.__views.fwin);
    $.__views.fwin.addEventListener("open", __alloyId40);
    $.__views.fwin.addEventListener("open", __alloyId44);
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView",
        left: 0,
        layout: "vertical",
        scrollType: "vertical",
        disableBounce: true,
        scrollingEnabled: false,
        showVerticalScrollIndicator: true,
        bottom: "50dp",
        width: "100%"
    });
    $.__views.fwin.add($.__views.scrollView);
    $.__views.paceRow = Ti.UI.createView({
        top: 0,
        height: "50dp",
        left: 0,
        layout: "horizontal",
        backgroundColor: "#F7F7F7",
        width: "100%",
        id: "paceRow"
    });
    $.__views.scrollView.add($.__views.paceRow);
    hidePaceView ? $.addListener($.__views.paceRow, "click", hidePaceView) : __defers["$.__views.paceRow!click!hidePaceView"] = true;
    $.__views.pace = Ti.UI.createLabel({
        color: "#2C2A29",
        top: 0,
        left: "16dp",
        height: "50dp",
        width: "25%",
        font: {
            fontSize: 16
        },
        text: "PACE",
        id: "pace"
    });
    $.__views.paceRow.add($.__views.pace);
    $.__views.paceLabel = Ti.UI.createLabel({
        color: "#646464",
        top: "18dp",
        left: "5dp",
        height: "20dp",
        width: "60%",
        font: {
            fontSize: 12
        },
        textAlign: "right",
        id: "paceLabel"
    });
    $.__views.paceRow.add($.__views.paceLabel);
    $.__views.paceFold = Ti.UI.createImageView({
        width: "5%",
        height: "20dp",
        id: "paceFold",
        image: "/images/Filter open.png"
    });
    $.__views.paceRow.add($.__views.paceFold);
    $.__views.__alloyId45 = Ti.UI.createView({
        width: "100%",
        height: "1dp",
        left: 0,
        borderWidth: "1dp",
        borderColor: "#1A006F44",
        id: "__alloyId45"
    });
    $.__views.scrollView.add($.__views.__alloyId45);
    $.__views.paceView = Ti.UI.createView({
        top: 0,
        width: "100%",
        left: 0,
        height: "400dp",
        layout: "vertical",
        visible: false,
        id: "paceView"
    });
    $.__views.scrollView.add($.__views.paceView);
    $.__views.__alloyId46 = Ti.UI.createView({
        height: "60dp",
        top: 10,
        width: "100%",
        left: 0,
        id: "__alloyId46"
    });
    $.__views.paceView.add($.__views.__alloyId46);
    $.__views.easy = Ti.UI.createLabel({
        color: "#000",
        left: "4%",
        width: "41%",
        height: "60dp",
        backgroundColor: "#1A43B02A",
        textAlign: "center",
        font: {
            fontSize: 14
        },
        text: "Easy \n Under 10 mph",
        id: "easy"
    });
    $.__views.__alloyId46.add($.__views.easy);
    easy ? $.addListener($.__views.easy, "click", easy) : __defers["$.__views.easy!click!easy"] = true;
    $.__views.leisurely = Ti.UI.createLabel({
        color: "#000",
        right: "10%",
        width: "41%",
        height: "60dp",
        backgroundColor: "#2643B02A",
        textAlign: "center",
        font: {
            fontSize: 14
        },
        text: "Leisurely \n 10 - 12 mph",
        id: "leisurely"
    });
    $.__views.__alloyId46.add($.__views.leisurely);
    leisurely ? $.addListener($.__views.leisurely, "click", leisurely) : __defers["$.__views.leisurely!click!leisurely"] = true;
    $.__views.__alloyId47 = Ti.UI.createView({
        height: "60dp",
        top: 10,
        width: "100%",
        left: 0,
        id: "__alloyId47"
    });
    $.__views.paceView.add($.__views.__alloyId47);
    $.__views.steady = Ti.UI.createLabel({
        color: "#000",
        left: "15dp",
        width: "166dp",
        height: "60dp",
        backgroundColor: "#3343B02A",
        textAlign: "center",
        font: {
            fontSize: 14
        },
        text: "Steady \n 12 - 14 mph",
        id: "steady"
    });
    $.__views.__alloyId47.add($.__views.steady);
    steady ? $.addListener($.__views.steady, "click", steady) : __defers["$.__views.steady!click!steady"] = true;
    $.__views.moderate = Ti.UI.createLabel({
        color: "#000",
        right: "40dp",
        width: "166dp",
        height: "60dp",
        backgroundColor: "#4043B02A",
        textAlign: "center",
        font: {
            fontSize: 14
        },
        text: "Moderate \n 14 - 16 mph",
        id: "moderate"
    });
    $.__views.__alloyId47.add($.__views.moderate);
    moderate ? $.addListener($.__views.moderate, "click", moderate) : __defers["$.__views.moderate!click!moderate"] = true;
    $.__views.__alloyId48 = Ti.UI.createView({
        height: "60dp",
        top: 10,
        width: "100%",
        left: 0,
        id: "__alloyId48"
    });
    $.__views.paceView.add($.__views.__alloyId48);
    $.__views.brisk = Ti.UI.createLabel({
        color: "#000",
        left: "15dp",
        width: "166dp",
        height: "60dp",
        backgroundColor: "#4D43B02A",
        textAlign: "center",
        font: {
            fontSize: 14
        },
        text: "Brisk \n 16 - 18 mph",
        id: "brisk"
    });
    $.__views.__alloyId48.add($.__views.brisk);
    brisk ? $.addListener($.__views.brisk, "click", brisk) : __defers["$.__views.brisk!click!brisk"] = true;
    $.__views.vigorous = Ti.UI.createLabel({
        color: "#000",
        right: "40dp",
        width: "166dp",
        height: "60dp",
        backgroundColor: "#5943B02A",
        textAlign: "center",
        font: {
            fontSize: 14
        },
        text: "Vigorous \n 18 - 20 mph",
        id: "vigorous"
    });
    $.__views.__alloyId48.add($.__views.vigorous);
    vigorous ? $.addListener($.__views.vigorous, "click", vigorous) : __defers["$.__views.vigorous!click!vigorous"] = true;
    $.__views.__alloyId49 = Ti.UI.createView({
        height: "60dp",
        top: 10,
        width: "100%",
        left: 0,
        id: "__alloyId49"
    });
    $.__views.paceView.add($.__views.__alloyId49);
    $.__views.strenuous = Ti.UI.createLabel({
        color: "#000",
        left: "15dp",
        width: "166dp",
        height: "60dp",
        backgroundColor: "#6643B02A",
        textAlign: "center",
        font: {
            fontSize: 14
        },
        text: "Strenuous \n 20 - 22 mph",
        id: "strenuous"
    });
    $.__views.__alloyId49.add($.__views.strenuous);
    strenuous ? $.addListener($.__views.strenuous, "click", strenuous) : __defers["$.__views.strenuous!click!strenuous"] = true;
    $.__views.superStrenuous = Ti.UI.createLabel({
        color: "#000",
        right: "40dp",
        width: "166dp",
        height: "60dp",
        backgroundColor: "#7343B02A",
        textAlign: "center",
        font: {
            fontSize: 14
        },
        text: "Super Strenuous \n 22+ mph",
        id: "superStrenuous"
    });
    $.__views.__alloyId49.add($.__views.superStrenuous);
    superStrenuous ? $.addListener($.__views.superStrenuous, "click", superStrenuous) : __defers["$.__views.superStrenuous!click!superStrenuous"] = true;
    $.__views.__alloyId50 = Ti.UI.createView({
        height: "60dp",
        top: 10,
        width: "100%",
        left: 0,
        id: "__alloyId50"
    });
    $.__views.paceView.add($.__views.__alloyId50);
    $.__views.selfPaced = Ti.UI.createLabel({
        color: "#000",
        left: "15dp",
        right: "40dp",
        height: "60dp",
        backgroundColor: "#8043B02A",
        textAlign: "center",
        font: {
            fontSize: 14
        },
        text: "Self Paced",
        id: "selfPaced"
    });
    $.__views.__alloyId50.add($.__views.selfPaced);
    selfPaced ? $.addListener($.__views.selfPaced, "click", selfPaced) : __defers["$.__views.selfPaced!click!selfPaced"] = true;
    $.__views.dayRow = Ti.UI.createView({
        top: 0,
        height: "50dp",
        left: 0,
        layout: "horizontal",
        backgroundColor: "#F7F7F7",
        width: "100%",
        id: "dayRow"
    });
    $.__views.scrollView.add($.__views.dayRow);
    hideDayView ? $.addListener($.__views.dayRow, "click", hideDayView) : __defers["$.__views.dayRow!click!hideDayView"] = true;
    $.__views.day = Ti.UI.createLabel({
        color: "#2C2A29",
        top: 0,
        left: "16dp",
        height: "50dp",
        width: "25%",
        font: {
            fontSize: 16
        },
        text: "DAY",
        id: "day"
    });
    $.__views.dayRow.add($.__views.day);
    $.__views.dayLabel = Ti.UI.createLabel({
        color: "#646464",
        top: "18dp",
        left: "5dp",
        height: "20dp",
        width: "60%",
        font: {
            fontSize: 12
        },
        textAlign: "right",
        id: "dayLabel"
    });
    $.__views.dayRow.add($.__views.dayLabel);
    $.__views.dayFold = Ti.UI.createImageView({
        width: "5%",
        height: "20dp",
        id: "dayFold",
        image: "/images/Filter open.png"
    });
    $.__views.dayRow.add($.__views.dayFold);
    $.__views.__alloyId51 = Ti.UI.createView({
        width: "100%",
        height: "1dp",
        left: 0,
        borderWidth: "1dp",
        borderColor: "#1A006F44",
        id: "__alloyId51"
    });
    $.__views.scrollView.add($.__views.__alloyId51);
    $.__views.dayView = Ti.UI.createView({
        top: 0,
        width: "100%",
        left: 0,
        height: "400dp",
        layout: "vertical",
        visible: false,
        id: "dayView"
    });
    $.__views.scrollView.add($.__views.dayView);
    $.__views.__alloyId52 = Ti.UI.createView({
        height: "48dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId52"
    });
    $.__views.dayView.add($.__views.__alloyId52);
    sunday ? $.addListener($.__views.__alloyId52, "click", sunday) : __defers["$.__views.__alloyId52!click!sunday"] = true;
    $.__views.checkSunday = Ti.UI.createImageView({
        left: "16dp",
        id: "checkSunday",
        image: "/images/unchecked.png"
    });
    $.__views.__alloyId52.add($.__views.checkSunday);
    $.__views.sunday = Ti.UI.createLabel({
        color: "#000",
        left: "10dp",
        height: "48dp",
        text: "Sunday",
        id: "sunday"
    });
    $.__views.__alloyId52.add($.__views.sunday);
    $.__views.__alloyId53 = Ti.UI.createView({
        height: "48dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId53"
    });
    $.__views.dayView.add($.__views.__alloyId53);
    monday ? $.addListener($.__views.__alloyId53, "click", monday) : __defers["$.__views.__alloyId53!click!monday"] = true;
    $.__views.checkMonday = Ti.UI.createImageView({
        left: "16dp",
        id: "checkMonday",
        image: "/images/unchecked.png"
    });
    $.__views.__alloyId53.add($.__views.checkMonday);
    $.__views.monday = Ti.UI.createLabel({
        color: "#000",
        left: "10dp",
        height: "48dp",
        text: "Monday",
        id: "monday"
    });
    $.__views.__alloyId53.add($.__views.monday);
    $.__views.__alloyId54 = Ti.UI.createView({
        height: "48dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId54"
    });
    $.__views.dayView.add($.__views.__alloyId54);
    tuesday ? $.addListener($.__views.__alloyId54, "click", tuesday) : __defers["$.__views.__alloyId54!click!tuesday"] = true;
    $.__views.checkTuesday = Ti.UI.createImageView({
        left: "16dp",
        id: "checkTuesday",
        image: "/images/unchecked.png"
    });
    $.__views.__alloyId54.add($.__views.checkTuesday);
    $.__views.tuesday = Ti.UI.createLabel({
        color: "#000",
        left: "10dp",
        height: "48dp",
        text: "Tuesday",
        id: "tuesday"
    });
    $.__views.__alloyId54.add($.__views.tuesday);
    $.__views.__alloyId55 = Ti.UI.createView({
        height: "48dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId55"
    });
    $.__views.dayView.add($.__views.__alloyId55);
    wednesday ? $.addListener($.__views.__alloyId55, "click", wednesday) : __defers["$.__views.__alloyId55!click!wednesday"] = true;
    $.__views.checkWednesday = Ti.UI.createImageView({
        left: "16dp",
        id: "checkWednesday",
        image: "/images/unchecked.png"
    });
    $.__views.__alloyId55.add($.__views.checkWednesday);
    $.__views.wednesday = Ti.UI.createLabel({
        color: "#000",
        left: "10dp",
        height: "48dp",
        text: "Wednesday",
        id: "wednesday"
    });
    $.__views.__alloyId55.add($.__views.wednesday);
    $.__views.__alloyId56 = Ti.UI.createView({
        height: "48dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId56"
    });
    $.__views.dayView.add($.__views.__alloyId56);
    thursday ? $.addListener($.__views.__alloyId56, "click", thursday) : __defers["$.__views.__alloyId56!click!thursday"] = true;
    $.__views.checkThursday = Ti.UI.createImageView({
        left: "16dp",
        id: "checkThursday",
        image: "/images/unchecked.png"
    });
    $.__views.__alloyId56.add($.__views.checkThursday);
    $.__views.thursday = Ti.UI.createLabel({
        color: "#000",
        left: "10dp",
        height: "48dp",
        text: "Thursday",
        id: "thursday"
    });
    $.__views.__alloyId56.add($.__views.thursday);
    $.__views.__alloyId57 = Ti.UI.createView({
        height: "48dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId57"
    });
    $.__views.dayView.add($.__views.__alloyId57);
    friday ? $.addListener($.__views.__alloyId57, "click", friday) : __defers["$.__views.__alloyId57!click!friday"] = true;
    $.__views.checkFriday = Ti.UI.createImageView({
        left: "16dp",
        id: "checkFriday",
        image: "/images/unchecked.png"
    });
    $.__views.__alloyId57.add($.__views.checkFriday);
    $.__views.friday = Ti.UI.createLabel({
        color: "#000",
        left: "10dp",
        height: "48dp",
        text: "Friday",
        id: "friday"
    });
    $.__views.__alloyId57.add($.__views.friday);
    $.__views.__alloyId58 = Ti.UI.createView({
        height: "48dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId58"
    });
    $.__views.dayView.add($.__views.__alloyId58);
    saturday ? $.addListener($.__views.__alloyId58, "click", saturday) : __defers["$.__views.__alloyId58!click!saturday"] = true;
    $.__views.checkSaturday = Ti.UI.createImageView({
        left: "16dp",
        id: "checkSaturday",
        image: "/images/unchecked.png"
    });
    $.__views.__alloyId58.add($.__views.checkSaturday);
    $.__views.saturday = Ti.UI.createLabel({
        color: "#000",
        left: "10dp",
        height: "48dp",
        text: "Saturday",
        id: "saturday"
    });
    $.__views.__alloyId58.add($.__views.saturday);
    $.__views.timeRow = Ti.UI.createView({
        top: 0,
        height: "50dp",
        left: 0,
        layout: "horizontal",
        backgroundColor: "#F7F7F7",
        width: "100%",
        id: "timeRow"
    });
    $.__views.scrollView.add($.__views.timeRow);
    hideTimeView ? $.addListener($.__views.timeRow, "click", hideTimeView) : __defers["$.__views.timeRow!click!hideTimeView"] = true;
    $.__views.time = Ti.UI.createLabel({
        color: "#2C2A29",
        top: 0,
        left: "16dp",
        height: "50dp",
        width: "25%",
        font: {
            fontSize: 16
        },
        text: "TIME",
        id: "time"
    });
    $.__views.timeRow.add($.__views.time);
    $.__views.timeLabel = Ti.UI.createLabel({
        color: "#646464",
        top: "18dp",
        left: "5dp",
        height: "20dp",
        width: "60%",
        font: {
            fontSize: 12
        },
        textAlign: "right",
        id: "timeLabel"
    });
    $.__views.timeRow.add($.__views.timeLabel);
    $.__views.timeFold = Ti.UI.createImageView({
        width: "5%",
        height: "20dp",
        id: "timeFold",
        image: "/images/Filter open.png"
    });
    $.__views.timeRow.add($.__views.timeFold);
    $.__views.__alloyId59 = Ti.UI.createView({
        width: "100%",
        height: "1dp",
        left: 0,
        borderWidth: "1dp",
        borderColor: "#1A006F44",
        id: "__alloyId59"
    });
    $.__views.scrollView.add($.__views.__alloyId59);
    $.__views.timeView = Ti.UI.createView({
        top: 0,
        width: "100%",
        left: 0,
        height: "400dp",
        layout: "vertical",
        visible: false,
        id: "timeView"
    });
    $.__views.scrollView.add($.__views.timeView);
    $.__views.__alloyId60 = Ti.UI.createView({
        layout: "horizontal",
        height: "30dp",
        top: "10dp",
        id: "__alloyId60"
    });
    $.__views.timeView.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createLabel({
        color: "#000",
        text: "Earliest Start Time:",
        left: "16dp",
        id: "__alloyId61"
    });
    $.__views.__alloyId60.add($.__views.__alloyId61);
    $.__views.startTimeLabel = Ti.UI.createLabel({
        color: "#000",
        id: "startTimeLabel",
        left: "5dp"
    });
    $.__views.__alloyId60.add($.__views.startTimeLabel);
    $.__views.startTimeSlider = Ti.UI.createSlider({
        id: "startTimeSlider",
        top: 0,
        left: "16dp",
        width: "85%",
        min: 0,
        max: 24,
        leftTrackImage: "/images/grey.png"
    });
    $.__views.timeView.add($.__views.startTimeSlider);
    $.__views.__alloyId62 = Ti.UI.createLabel({
        color: "#000",
        text: "To",
        top: 0,
        height: "80dp",
        id: "__alloyId62"
    });
    $.__views.timeView.add($.__views.__alloyId62);
    $.__views.__alloyId63 = Ti.UI.createView({
        layout: "horizontal",
        height: "30dp",
        top: "10dp",
        id: "__alloyId63"
    });
    $.__views.timeView.add($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createLabel({
        color: "#000",
        text: "Latest Start Time:",
        left: "16dp",
        id: "__alloyId64"
    });
    $.__views.__alloyId63.add($.__views.__alloyId64);
    $.__views.endTimeLabel = Ti.UI.createLabel({
        color: "#000",
        id: "endTimeLabel",
        left: "5dp"
    });
    $.__views.__alloyId63.add($.__views.endTimeLabel);
    $.__views.endTimeSlider = Ti.UI.createSlider({
        id: "endTimeSlider",
        top: 0,
        left: "16dp",
        width: "85%",
        max: 24,
        leftTrackImage: "/images/grey.png"
    });
    $.__views.timeView.add($.__views.endTimeSlider);
    $.__views.distanceRow = Ti.UI.createView({
        top: 0,
        height: "50dp",
        left: 0,
        layout: "horizontal",
        backgroundColor: "#F7F7F7",
        width: "100%",
        id: "distanceRow"
    });
    $.__views.scrollView.add($.__views.distanceRow);
    hideDistanceView ? $.addListener($.__views.distanceRow, "click", hideDistanceView) : __defers["$.__views.distanceRow!click!hideDistanceView"] = true;
    $.__views.distance = Ti.UI.createLabel({
        color: "#2C2A29",
        top: 0,
        left: "16dp",
        height: "50dp",
        width: "25%",
        font: {
            fontSize: 16
        },
        text: "DISTANCE",
        id: "distance"
    });
    $.__views.distanceRow.add($.__views.distance);
    $.__views.distanceLabel = Ti.UI.createLabel({
        color: "#646464",
        top: "18dp",
        left: "5dp",
        height: "20dp",
        width: "60%",
        font: {
            fontSize: 12
        },
        textAlign: "right",
        id: "distanceLabel"
    });
    $.__views.distanceRow.add($.__views.distanceLabel);
    $.__views.distanceFold = Ti.UI.createImageView({
        width: "5%",
        height: "20dp",
        id: "distanceFold",
        image: "/images/Filter open.png"
    });
    $.__views.distanceRow.add($.__views.distanceFold);
    $.__views.__alloyId65 = Ti.UI.createView({
        width: "100%",
        height: "1dp",
        left: 0,
        borderWidth: "1dp",
        borderColor: "#1A006F44",
        id: "__alloyId65"
    });
    $.__views.scrollView.add($.__views.__alloyId65);
    $.__views.distanceView = Ti.UI.createView({
        top: 0,
        width: "100%",
        left: 0,
        height: "400dp",
        layout: "vertical",
        visible: false,
        id: "distanceView"
    });
    $.__views.scrollView.add($.__views.distanceView);
    $.__views.__alloyId66 = Ti.UI.createView({
        height: "60dp",
        top: 10,
        width: "100%",
        left: 0,
        id: "__alloyId66"
    });
    $.__views.distanceView.add($.__views.__alloyId66);
    $.__views.ten = Ti.UI.createLabel({
        color: "#000",
        left: "4%",
        width: "41%",
        height: "60dp",
        backgroundColor: "#1A43B02A",
        textAlign: "center",
        font: {
            fontSize: 14
        },
        text: "10-20 miles",
        id: "ten"
    });
    $.__views.__alloyId66.add($.__views.ten);
    ten ? $.addListener($.__views.ten, "click", ten) : __defers["$.__views.ten!click!ten"] = true;
    $.__views.twenty = Ti.UI.createLabel({
        color: "#000",
        right: "10%",
        width: "41%",
        height: "60dp",
        backgroundColor: "#2643B02A",
        textAlign: "center",
        font: {
            fontSize: 14
        },
        text: "20-30 miles",
        id: "twenty"
    });
    $.__views.__alloyId66.add($.__views.twenty);
    twenty ? $.addListener($.__views.twenty, "click", twenty) : __defers["$.__views.twenty!click!twenty"] = true;
    $.__views.__alloyId67 = Ti.UI.createView({
        height: "60dp",
        top: 10,
        width: "100%",
        left: 0,
        id: "__alloyId67"
    });
    $.__views.distanceView.add($.__views.__alloyId67);
    $.__views.thirty = Ti.UI.createLabel({
        color: "#000",
        left: "15dp",
        width: "166dp",
        height: "60dp",
        backgroundColor: "#3343B02A",
        textAlign: "center",
        font: {
            fontSize: 14
        },
        text: "30-40 miles",
        id: "thirty"
    });
    $.__views.__alloyId67.add($.__views.thirty);
    thirty ? $.addListener($.__views.thirty, "click", thirty) : __defers["$.__views.thirty!click!thirty"] = true;
    $.__views.fourty = Ti.UI.createLabel({
        color: "#000",
        right: "40dp",
        width: "166dp",
        height: "60dp",
        backgroundColor: "#4043B02A",
        textAlign: "center",
        font: {
            fontSize: 14
        },
        text: "40-50 miles",
        id: "fourty"
    });
    $.__views.__alloyId67.add($.__views.fourty);
    fourty ? $.addListener($.__views.fourty, "click", fourty) : __defers["$.__views.fourty!click!fourty"] = true;
    $.__views.__alloyId68 = Ti.UI.createView({
        height: "60dp",
        top: 10,
        width: "100%",
        left: 0,
        id: "__alloyId68"
    });
    $.__views.distanceView.add($.__views.__alloyId68);
    $.__views.fifty = Ti.UI.createLabel({
        color: "#000",
        left: "15dp",
        width: "166dp",
        height: "60dp",
        backgroundColor: "#4D43B02A",
        textAlign: "center",
        font: {
            fontSize: 14
        },
        text: "50-60 miles",
        id: "fifty"
    });
    $.__views.__alloyId68.add($.__views.fifty);
    fifty ? $.addListener($.__views.fifty, "click", fifty) : __defers["$.__views.fifty!click!fifty"] = true;
    $.__views.sixty = Ti.UI.createLabel({
        color: "#000",
        right: "40dp",
        width: "166dp",
        height: "60dp",
        backgroundColor: "#5943B02A",
        textAlign: "center",
        font: {
            fontSize: 14
        },
        text: "60-70 miles",
        id: "sixty"
    });
    $.__views.__alloyId68.add($.__views.sixty);
    sixty ? $.addListener($.__views.sixty, "click", sixty) : __defers["$.__views.sixty!click!sixty"] = true;
    $.__views.__alloyId69 = Ti.UI.createView({
        height: "60dp",
        top: 10,
        width: "100%",
        left: 0,
        id: "__alloyId69"
    });
    $.__views.distanceView.add($.__views.__alloyId69);
    $.__views.seventy = Ti.UI.createLabel({
        color: "#000",
        left: "15dp",
        width: "166dp",
        height: "60dp",
        backgroundColor: "#6643B02A",
        textAlign: "center",
        font: {
            fontSize: 14
        },
        text: "70-80 miles",
        id: "seventy"
    });
    $.__views.__alloyId69.add($.__views.seventy);
    seventy ? $.addListener($.__views.seventy, "click", seventy) : __defers["$.__views.seventy!click!seventy"] = true;
    $.__views.eighty = Ti.UI.createLabel({
        color: "#000",
        right: "40dp",
        width: "166dp",
        height: "60dp",
        backgroundColor: "#7343B02A",
        textAlign: "center",
        font: {
            fontSize: 14
        },
        text: "80-90 miles",
        id: "eighty"
    });
    $.__views.__alloyId69.add($.__views.eighty);
    eighty ? $.addListener($.__views.eighty, "click", eighty) : __defers["$.__views.eighty!click!eighty"] = true;
    $.__views.__alloyId70 = Ti.UI.createView({
        height: "60dp",
        top: 10,
        width: "100%",
        left: 0,
        id: "__alloyId70"
    });
    $.__views.distanceView.add($.__views.__alloyId70);
    $.__views.ninety = Ti.UI.createLabel({
        color: "#000",
        left: "15dp",
        right: "40dp",
        height: "60dp",
        backgroundColor: "#8043B02A",
        textAlign: "center",
        font: {
            fontSize: 14
        },
        text: "90+ miles",
        id: "ninety"
    });
    $.__views.__alloyId70.add($.__views.ninety);
    ninety ? $.addListener($.__views.ninety, "click", ninety) : __defers["$.__views.ninety!click!ninety"] = true;
    $.__views.apply = Ti.UI.createButton({
        left: "0dp",
        bottom: "0dp",
        height: "50dp",
        width: "100%",
        backgroundColor: "#006F44",
        color: "white",
        title: "Apply",
        id: "apply"
    });
    $.__views.fwin.add($.__views.apply);
    applyFilter ? $.addListener($.__views.apply, "click", applyFilter) : __defers["$.__views.apply!click!applyFilter"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("alloy/moment");
    var paceView = false;
    var dayView = false;
    var timeView = false;
    var distanceView = false;
    $.endTimeLabel.text = "";
    var args = $.args;
    !function() {
        hideVertical($.paceView);
        hideVertical($.dayView);
        hideVertical($.timeView);
        hideVertical($.distanceView);
        initiate();
    }(arguments[0] || {});
    $.startTimeSlider.addEventListener("touchend", function(e) {
        $.startTimeLabel.text = e.value + ":00";
        $.endTimeSlider.min = this.value;
        $.endTimeSlider.value < $.endTimeSlider.min && ($.endTimeSlider.value = $.endTimeSlider.min);
        Alloy.Globals.time[0] = this.value;
        $.timeLabel.text = $.startTimeLabel.text + " to " + $.endTimeLabel.text;
    });
    $.startTimeSlider.addEventListener("change", function() {});
    $.endTimeSlider.addEventListener("touchend", function(e) {
        $.endTimeLabel.text = e.value + ":00";
        Alloy.Globals.time[1] = this.value;
        $.timeLabel.text = $.startTimeLabel.text + " to " + $.endTimeLabel.text;
    });
    $.endTimeSlider.addEventListener("change", function(e) {
        $.endTimeLabel.text = Math.round(e.value) + ":00";
    });
    __defers["$.__views.__alloyId42!click!resetFilter"] && $.addListener($.__views.__alloyId42, "click", resetFilter);
    __defers["$.__views.paceRow!click!hidePaceView"] && $.addListener($.__views.paceRow, "click", hidePaceView);
    __defers["$.__views.easy!click!easy"] && $.addListener($.__views.easy, "click", easy);
    __defers["$.__views.leisurely!click!leisurely"] && $.addListener($.__views.leisurely, "click", leisurely);
    __defers["$.__views.steady!click!steady"] && $.addListener($.__views.steady, "click", steady);
    __defers["$.__views.moderate!click!moderate"] && $.addListener($.__views.moderate, "click", moderate);
    __defers["$.__views.brisk!click!brisk"] && $.addListener($.__views.brisk, "click", brisk);
    __defers["$.__views.vigorous!click!vigorous"] && $.addListener($.__views.vigorous, "click", vigorous);
    __defers["$.__views.strenuous!click!strenuous"] && $.addListener($.__views.strenuous, "click", strenuous);
    __defers["$.__views.superStrenuous!click!superStrenuous"] && $.addListener($.__views.superStrenuous, "click", superStrenuous);
    __defers["$.__views.selfPaced!click!selfPaced"] && $.addListener($.__views.selfPaced, "click", selfPaced);
    __defers["$.__views.dayRow!click!hideDayView"] && $.addListener($.__views.dayRow, "click", hideDayView);
    __defers["$.__views.__alloyId52!click!sunday"] && $.addListener($.__views.__alloyId52, "click", sunday);
    __defers["$.__views.__alloyId53!click!monday"] && $.addListener($.__views.__alloyId53, "click", monday);
    __defers["$.__views.__alloyId54!click!tuesday"] && $.addListener($.__views.__alloyId54, "click", tuesday);
    __defers["$.__views.__alloyId55!click!wednesday"] && $.addListener($.__views.__alloyId55, "click", wednesday);
    __defers["$.__views.__alloyId56!click!thursday"] && $.addListener($.__views.__alloyId56, "click", thursday);
    __defers["$.__views.__alloyId57!click!friday"] && $.addListener($.__views.__alloyId57, "click", friday);
    __defers["$.__views.__alloyId58!click!saturday"] && $.addListener($.__views.__alloyId58, "click", saturday);
    __defers["$.__views.timeRow!click!hideTimeView"] && $.addListener($.__views.timeRow, "click", hideTimeView);
    __defers["$.__views.distanceRow!click!hideDistanceView"] && $.addListener($.__views.distanceRow, "click", hideDistanceView);
    __defers["$.__views.ten!click!ten"] && $.addListener($.__views.ten, "click", ten);
    __defers["$.__views.twenty!click!twenty"] && $.addListener($.__views.twenty, "click", twenty);
    __defers["$.__views.thirty!click!thirty"] && $.addListener($.__views.thirty, "click", thirty);
    __defers["$.__views.fourty!click!fourty"] && $.addListener($.__views.fourty, "click", fourty);
    __defers["$.__views.fifty!click!fifty"] && $.addListener($.__views.fifty, "click", fifty);
    __defers["$.__views.sixty!click!sixty"] && $.addListener($.__views.sixty, "click", sixty);
    __defers["$.__views.seventy!click!seventy"] && $.addListener($.__views.seventy, "click", seventy);
    __defers["$.__views.eighty!click!eighty"] && $.addListener($.__views.eighty, "click", eighty);
    __defers["$.__views.ninety!click!ninety"] && $.addListener($.__views.ninety, "click", ninety);
    __defers["$.__views.apply!click!applyFilter"] && $.addListener($.__views.apply, "click", applyFilter);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;