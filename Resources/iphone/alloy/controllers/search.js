function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function searchLocation() {
        $.searchField.blur();
        var inputLoc = $.searchField.value;
        Ti.Geolocation.forwardGeocoder(inputLoc, function(_resp) {
            if (_resp.success) {
                args.regionCenter.latitude = Number(_resp.latitude);
                args.regionCenter.longitude = Number(_resp.longitude);
                args.regionCenter.displayAddress = _resp.displayAddress;
                args.prevWindow.fireEvent("loc_updated", {
                    isCurrentLoc: false
                });
                $.searchWindow.close();
            } else alert("Unable to geocode the address, please input a valid address.");
        });
    }
    function useCurrentLoc() {
        $.searchField.blur();
        Titanium.Geolocation.getCurrentPosition(function(e) {
            Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
            if (e.error) {
                args.regionCenter.latitude = Alloy.Globals.defaultLocation.latitude;
                args.regionCenter.longitude = Alloy.Globals.defaultLocation.longitude;
            } else {
                args.regionCenter.latitude = e.coords.latitude;
                args.regionCenter.longitude = e.coords.longitude;
            }
            args.prevWindow.fireEvent("loc_updated", {
                isCurrentLoc: true
            });
            $.searchWindow.close();
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "search";
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
    $.__views.searchWindow = Ti.UI.createWindow({
        barColor: "#CD1625",
        backgroundColor: "white",
        navTintColor: "#FFF",
        translucent: false,
        titleAttributes: {
            color: "#FFF"
        },
        id: "searchWindow"
    });
    $.__views.searchWindow && $.addTopLevelView($.__views.searchWindow);
    $.__views.__alloyId68 = Ti.UI.createView({
        id: "__alloyId68"
    });
    $.__views.searchWindow.add($.__views.__alloyId68);
    $.__views.searchView = Ti.UI.createView({
        id: "searchView"
    });
    $.__views.__alloyId68.add($.__views.searchView);
    $.__views.searchField = Ti.UI.createTextField({
        color: "#336699",
        top: "10",
        left: "10",
        right: "50",
        paddingLeft: "5",
        height: "60",
        hintText: "Enter address or location",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        clearButtonMode: "Ti.UI.INPUT_BUTTONMODE_ALWAYS",
        id: "searchField"
    });
    $.__views.searchView.add($.__views.searchField);
    $.__views.btnSearch = Ti.UI.createButton({
        title: "Search",
        id: "btnSearch",
        top: 0,
        right: 0
    });
    $.__views.searchView.add($.__views.btnSearch);
    searchLocation ? $.addListener($.__views.btnSearch, "click", searchLocation) : __defers["$.__views.btnSearch!click!searchLocation"] = true;
    $.__views.curLoc = Ti.UI.createView({
        top: "70",
        height: "60",
        backgroundColor: "#cccccc",
        id: "curLoc",
        layout: "horizontal"
    });
    $.__views.__alloyId68.add($.__views.curLoc);
    useCurrentLoc ? $.addListener($.__views.curLoc, "click", useCurrentLoc) : __defers["$.__views.curLoc!click!useCurrentLoc"] = true;
    $.__views.curLocImage = Ti.UI.createImageView({
        width: "20",
        height: "20",
        left: "20",
        id: "curLocImage",
        image: "/images/re-centerNotFilled.png"
    });
    $.__views.curLoc.add($.__views.curLocImage);
    $.__views.curLocLabel = Ti.UI.createLabel({
        color: "#000",
        left: "10",
        height: "60",
        text: "Current location",
        id: "curLocLabel"
    });
    $.__views.curLoc.add($.__views.curLocLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    $.searchWindow.addEventListener("open", function(evt) {
        evt.source.activity.actionBar.hide();
    });
    __defers["$.__views.btnSearch!click!searchLocation"] && $.addListener($.__views.btnSearch, "click", searchLocation);
    __defers["$.__views.curLoc!click!useCurrentLoc"] && $.addListener($.__views.curLoc, "click", useCurrentLoc);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;