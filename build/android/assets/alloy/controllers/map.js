function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
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
    $.__views.map = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        id: "map"
    });
    $.__views.map && $.addTopLevelView($.__views.map);
    $.__views.mapView = (require("ti.map").createView || Ti.UI.createView)({
        region: {
            latitude: 47.6697242,
            longitude: -122.1820661,
            latitudeDelta: .01,
            longitudeDelta: .01
        },
        id: "mapView"
    });
    $.__views.map.add($.__views.mapView);
    report ? $.addListener($.__views.mapView, "click", report) : __defers["$.__views.mapView!click!report"] = true;
    $.__views.appcHQ = require("ti.map").createAnnotation({
        latitude: 37.390749,
        longitude: -122.081651,
        title: "Appcelerator Headquarters",
        subtitle: "Mountain View, CA",
        pincolor: Alloy.Globals.Map.ANNOTATION_RED,
        id: "appcHQ",
        myid: 1
    });
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    __defers["$.__views.mapView!click!report"] && $.addListener($.__views.mapView, "click", report);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;