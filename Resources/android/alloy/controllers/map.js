function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId56() {
        $.__views.mainWindow.removeEventListener("open", __alloyId56);
        if ($.__views.mainWindow.activity) $.__views.mainWindow.activity.onCreateOptionsMenu = function(e) {
            var __alloyId55 = {
                title: "Search",
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                id: "__alloyId54"
            };
            $.__views.__alloyId54 = e.menu.add(_.pick(__alloyId55, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId54.applyProperties(_.omit(__alloyId55, Alloy.Android.menuItemCreateArgs));
            $.__alloyId54 = $.__views.__alloyId54;
            searchLocation ? $.addListener($.__views.__alloyId54, "click", searchLocation) : __defers["$.__views.__alloyId54!click!searchLocation"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function centeredByCurrentLocation() {
        false === Ti.Geolocation.locationServicesEnabled && alert("our device has geo turned off - turn it on.");
        Titanium.Geolocation.getCurrentPosition(function(e) {
            Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
            if (e.error) alert("Current location not found. Use default location"); else {
                regionCenter.latitude = e.coords.latitude;
                regionCenter.longitude = e.coords.longitude;
            }
            createAnnotationsForMap(rideData);
        });
    }
    function createAnnotationsForMap(models) {
        if (null == models || models.length < 1) return;
        var annotations = createAnnotationsWithModels(models);
        $.mapview.setRegion({
            latitude: regionCenter.latitude,
            longitude: regionCenter.longitude,
            latitudeDelta: .04,
            longitudeDelta: .04
        });
        $.mapview.setUserLocation = true;
        $.mapview.setAnnotations(annotations);
    }
    function createAnnotationsWithModels(models) {
        var annotations = [];
        for (var i = 0; i < models.length; i++) {
            var model = models[i];
            var annotation = Alloy.Globals.Map.createAnnotation({
                latitude: model.get("latitude"),
                longitude: model.get("longitude"),
                title: model.get("title"),
                myid: model.get("link")
            });
            annotations.push(annotation);
        }
        return annotations;
    }
    function report(evt) {
        Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
        if (null === evt.clicksource || "pin" === evt.clicksource && evt.annotation.myid === lastClickedAnnotationId) $.rideInfoCallout.visible = false; else {
            evt.annotation.image = "pin.png";
            setCalloutInfo(evt.annotation.myid);
            $.rideInfoCallout.visible = true;
        }
        lastClickedAnnotationId = null === evt.clicksource ? null : evt.annotation.myid;
    }
    function setCalloutInfo(link) {
        var model = Alloy.Collections.feed.get(link);
        var data = Alloy.Globals.transform(model);
        $.selectedModel = data;
        $.rideTitle.text = data.title;
        $.rideDate.text = data.startDateTime;
        $.ridePace.text = data.pace;
        $.rideDistance.text = data.distance;
    }
    function searchLocation() {
        alert("Search button clicked.");
    }
    function showDetail() {
        var selectedModel = Alloy.Collections.feed.get(lastClickedAnnotationId);
        Alloy.Globals.Navigator.open("detail", selectedModel);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "map";
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
    $.__views.mainWindow = Ti.UI.createWindow({
        barColor: "#CD1625",
        backgroundColor: "#FFF",
        id: "mainWindow",
        title: "map"
    });
    $.__views.mainWindow && $.addTopLevelView($.__views.mainWindow);
    $.__views.mainWindow.addEventListener("open", __alloyId56);
    $.__views.mapview = (require("ti.map").createView || Alloy.Globals.Map.createView)({
        region: {
            latitude: 37.6697242,
            longitude: -122.1820661,
            latitudeDelta: .01,
            longitudeDelta: .01
        },
        animate: false,
        userLocation: true,
        id: "mapview"
    });
    $.__views.mainWindow.add($.__views.mapview);
    report ? $.addListener($.__views.mapview, "click", report) : __defers["$.__views.mapview!click!report"] = true;
    $.__views.rideInfoCallout = Ti.UI.createView({
        height: "70",
        bottom: "0",
        font: {
            fontSize: 13
        },
        backgroundColor: "#FFFFFF",
        id: "rideInfoCallout",
        visible: false
    });
    $.__views.mainWindow.add($.__views.rideInfoCallout);
    showDetail ? $.addListener($.__views.rideInfoCallout, "click", showDetail) : __defers["$.__views.rideInfoCallout!click!showDetail"] = true;
    $.__views.rideTitle = Ti.UI.createLabel({
        color: "#000",
        top: "0",
        id: "rideTitle"
    });
    $.__views.rideInfoCallout.add($.__views.rideTitle);
    $.__views.rideDate = Ti.UI.createLabel({
        color: "#000",
        top: "15",
        id: "rideDate"
    });
    $.__views.rideInfoCallout.add($.__views.rideDate);
    $.__views.ridePace = Ti.UI.createLabel({
        color: "#000",
        top: "30",
        id: "ridePace"
    });
    $.__views.rideInfoCallout.add($.__views.ridePace);
    $.__views.rideDistance = Ti.UI.createLabel({
        color: "#000",
        top: "45",
        id: "rideDistance"
    });
    $.__views.rideInfoCallout.add($.__views.rideDistance);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    var regionCenter = {
        latitude: 47.6466,
        longitude: -122.335
    };
    var rideData = Alloy.Collections.feed.models;
    centeredByCurrentLocation();
    var lastClickedAnnotationId = null;
    __defers["$.__views.__alloyId54!click!searchLocation"] && $.addListener($.__views.__alloyId54, "click", searchLocation);
    __defers["$.__views.mapview!click!report"] && $.addListener($.__views.mapview, "click", report);
    __defers["$.__views.rideInfoCallout!click!showDetail"] && $.addListener($.__views.rideInfoCallout, "click", showDetail);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;