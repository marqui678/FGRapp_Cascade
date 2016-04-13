function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId27() {
        $.__views.mainWindow.removeEventListener("open", __alloyId27);
        if ($.__views.mainWindow.activity) $.__views.mainWindow.activity.onCreateOptionsMenu = function(e) {
            var __alloyId26 = {
                title: "Search",
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                id: "__alloyId25"
            };
            $.__views.__alloyId25 = e.menu.add(_.pick(__alloyId26, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId25.applyProperties(_.omit(__alloyId26, Alloy.Android.menuItemCreateArgs));
            $.__alloyId25 = $.__views.__alloyId25;
            searchLocation ? $.addListener($.__views.__alloyId25, "click", searchLocation) : __defers["$.__views.__alloyId25!click!searchLocation"] = true;
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
            if (e.error) {
                alert("Current location not found.");
                return;
            }
            latitude = e.coords.latitude;
            longitude = e.coords.longitude;
            regionCenter.latitude = latitude;
            regionCenter.longitude = longitude;
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
                subtitle: model.get("fgrrss:pace"),
                pincolor: Ti.Map.ANNOTATION_GREEN,
                myid: i
            });
            annotations.push(annotation);
        }
        return annotations;
    }
    function report(evt) {
        Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
        evt.annotation.getCenterOffset();
    }
    function searchLocation() {
        alert("Search button clicked.");
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
    $.__views.mainWindow.addEventListener("open", __alloyId27);
    $.__views.mapview = (require("ti.map").createView || Alloy.Globals.Map.createView)({
        region: {
            latitude: 37.6697242,
            longitude: -122.1820661,
            latitudeDelta: .01,
            longitudeDelta: .01
        },
        animate: true,
        userLocation: true,
        id: "mapview"
    });
    $.__views.mainWindow.add($.__views.mapview);
    report ? $.addListener($.__views.mapview, "click", report) : __defers["$.__views.mapview!click!report"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    var regionCenter = {
        latitude: 47.6466,
        longitude: -122.335
    };
    var rideData = Alloy.Collections.feed.models;
    centeredByCurrentLocation();
    __defers["$.__views.__alloyId25!click!searchLocation"] && $.addListener($.__views.__alloyId25, "click", searchLocation);
    __defers["$.__views.mapview!click!report"] && $.addListener($.__views.mapview, "click", report);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;