function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
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
        navTintColor: "#FFF",
        translucent: false,
        titleAttributes: {
            color: "#FFF"
        },
        id: "mainWindow",
        title: "map"
    });
    $.__views.mainWindow && $.addTopLevelView($.__views.mainWindow);
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
    __defers["$.__views.mapview!click!report"] && $.addListener($.__views.mapview, "click", report);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;