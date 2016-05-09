function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
<<<<<<< HEAD
    function cancelSearch() {
        $.searchWindow.close();
    }
    function searchLocation() {
        $.searchBar.blur();
        var inputLoc = $.searchBar.value;
=======
    function searchLocation() {
        $.searchField.blur();
        var inputLoc = $.searchField.value;
>>>>>>> Jia1
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
<<<<<<< HEAD
        $.searchBar.blur();
=======
        $.searchField.blur();
>>>>>>> Jia1
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
<<<<<<< HEAD
        backgroundColor: "#F7F7F7",
=======
        backgroundColor: "white",
>>>>>>> Jia1
        navTintColor: "#FFF",
        translucent: false,
        titleAttributes: {
            color: "#FFF"
        },
<<<<<<< HEAD
        navBarHidden: true,
        id: "searchWindow",
        theme: "FGRThemeWithoutActionBar"
    });
    $.__views.searchWindow && $.addTopLevelView($.__views.searchWindow);
    $.__views.__alloyId67 = Ti.UI.createView({
        id: "__alloyId67"
    });
    $.__views.searchWindow.add($.__views.__alloyId67);
    $.__views.searchView = Ti.UI.createView({
        backgroundColor: "#fff",
        top: "5",
        height: "45",
        left: "16",
        right: "16",
        id: "searchView"
    });
    $.__views.__alloyId67.add($.__views.searchView);
    $.__views.backBtn = Ti.UI.createButton({
        left: "5",
        width: "30",
        height: "30",
        borderColor: "#FFF",
        backgroundColor: "#FFF",
        backgroundImage: "/images/back_dark.png",
        id: "backBtn"
    });
    $.__views.searchView.add($.__views.backBtn);
    cancelSearch ? $.addListener($.__views.backBtn, "click", cancelSearch) : __defers["$.__views.backBtn!click!cancelSearch"] = true;
    $.__views.searchBar = Ti.UI.createSearchBar({
        color: "#646464",
        barColor: "#FFFFFF",
        left: "45",
        right: "0",
        font: {
            fontSize: 16
        },
        hintText: "Enter address or location",
        hintTextColor: "#646464",
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        clearButtonMode: "Ti.UI.INPUT_BUTTONMODE_ALWAYS",
        id: "searchBar",
        showCancel: false
    });
    $.__views.searchView.add($.__views.searchBar);
    $.__views.curLoc = Ti.UI.createView({
        top: "55",
        height: "45",
        left: "16",
        right: "16",
        backgroundColor: "#FFFFFF",
        id: "curLoc",
        layout: "horizontal"
    });
    $.__views.__alloyId67.add($.__views.curLoc);
=======
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
>>>>>>> Jia1
    useCurrentLoc ? $.addListener($.__views.curLoc, "click", useCurrentLoc) : __defers["$.__views.curLoc!click!useCurrentLoc"] = true;
    $.__views.curLocImage = Ti.UI.createImageView({
        width: "20",
        height: "20",
        left: "20",
        id: "curLocImage",
<<<<<<< HEAD
        image: "/images/ic_navigation.png"
    });
    $.__views.curLoc.add($.__views.curLocImage);
    $.__views.curLocLabel = Ti.UI.createLabel({
        color: "#43B02A",
        left: "10",
        height: "45",
        font: {
            fontSize: 16
        },
=======
        image: "/images/re-centerNotFilled.png"
    });
    $.__views.curLoc.add($.__views.curLocImage);
    $.__views.curLocLabel = Ti.UI.createLabel({
        color: "#000",
        left: "10",
        height: "60",
>>>>>>> Jia1
        text: "Current location",
        id: "curLocLabel"
    });
    $.__views.curLoc.add($.__views.curLocLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
<<<<<<< HEAD
    $.searchBar.addEventListener("return", function() {
        searchLocation();
    });
    __defers["$.__views.backBtn!click!cancelSearch"] && $.addListener($.__views.backBtn, "click", cancelSearch);
=======
    $.searchWindow.addEventListener("open", function(evt) {
        evt.source.activity.actionBar.hide();
    });
    __defers["$.__views.btnSearch!click!searchLocation"] && $.addListener($.__views.btnSearch, "click", searchLocation);
>>>>>>> Jia1
    __defers["$.__views.curLoc!click!useCurrentLoc"] && $.addListener($.__views.curLoc, "click", useCurrentLoc);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;