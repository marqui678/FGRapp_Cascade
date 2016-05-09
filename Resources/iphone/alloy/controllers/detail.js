function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getPosition(str, m, i) {
        return str.split(m, i).join(m).length;
    }
    function select() {
        "use strict";
        Alloy.Globals.Navigator.open("rideRegister", link);
    }
    function emailContact() {
        Ti.Analytics.featureEvent(Ti.Platform.osname + ".profile.emailButton.clicked");
        if (true && "Simulator" === Ti.Platform.model) {
            alert("Simulator does not support sending emails. Use a device instead");
            return;
        }
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.toRecipients = [ contactEmail ];
        emailDialog.open();
    }
    function callContact() {
        Ti.Analytics.featureEvent(Ti.Platform.osname + ".profile.callContactButton.clicked");
        var dialog = Ti.UI.createAlertDialog({
            cancel: 0,
            buttonNames: [ "Cancel", "Ok" ],
            message: "Are you sure you want to call the contact person " + contactName + " at " + contactPhone + "?"
        });
        dialog.addEventListener("click", function(e) {
            e.index !== e.source.cancel && Ti.Platform.openURL("tel:" + contactPhone);
        });
        dialog.show();
    }
    function openMap() {
        Ti.Platform.openURL("Maps://?&q=" + latitude + "," + longitude);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "detail";
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
    $.__views.detail = Ti.UI.createWindow({
        barColor: "#CD1625",
        backgroundColor: "#FFF",
        navTintColor: "#FFF",
        translucent: false,
        titleAttributes: {
            color: "#FFF"
        },
        id: "detail"
    });
    $.__views.detail && $.addTopLevelView($.__views.detail);
    var __alloyId0 = [];
    $.__views.mapview = (require("ti.map").createView || Ti.UI.createView)({
        top: 0,
        enableZoomControls: false,
        compassEnabled: false,
        height: "30%",
        annotations: __alloyId0,
        id: "mapview"
    });
    $.__views.detail.add($.__views.mapview);
    $.__views.startDateTime = Ti.UI.createLabel({
        color: "red",
        top: 180,
        height: 50,
        id: "startDateTime"
    });
    $.__views.detail.add($.__views.startDateTime);
    $.__views.pace = Ti.UI.createLabel({
        color: "#000",
        top: 200,
        height: 50,
        id: "pace"
    });
    $.__views.detail.add($.__views.pace);
    $.__views.distance = Ti.UI.createLabel({
        color: "red",
        top: 220,
        height: 50,
        id: "distance"
    });
    $.__views.detail.add($.__views.distance);
    $.__views.address = Ti.UI.createLabel({
        color: "#000",
        top: 250,
        id: "address"
    });
    $.__views.detail.add($.__views.address);
    $.__views.leader = Ti.UI.createLabel({
        color: "red",
        top: 330,
        id: "leader"
    });
    $.__views.detail.add($.__views.leader);
    $.__views.description = Ti.UI.createLabel({
        color: "#000",
        top: 340,
        height: 100,
        id: "description"
    });
    $.__views.detail.add($.__views.description);
    $.__views.readMore = Ti.UI.createButton({
        top: 420,
        title: "Read full descriptions on ride registation page",
        id: "readMore"
    });
    $.__views.detail.add($.__views.readMore);
    select ? $.addListener($.__views.readMore, "click", select) : __defers["$.__views.readMore!click!select"] = true;
    $.__views.directions = Ti.UI.createLabel({
        color: "green",
        top: 320,
        text: "Get directions",
        id: "directions"
    });
    $.__views.detail.add($.__views.directions);
    openMap ? $.addListener($.__views.directions, "click", openMap) : __defers["$.__views.directions!click!openMap"] = true;
    $.__views.email = Ti.UI.createLabel({
        color: "red",
        top: 460,
        id: "email"
    });
    $.__views.detail.add($.__views.email);
    emailContact ? $.addListener($.__views.email, "click", emailContact) : __defers["$.__views.email!click!emailContact"] = true;
    $.__views.phone = Ti.UI.createLabel({
        color: "red",
        top: 440,
        id: "phone"
    });
    $.__views.detail.add($.__views.phone);
    callContact ? $.addListener($.__views.phone, "click", callContact) : __defers["$.__views.phone!click!callContact"] = true;
    $.__views.__alloyId1 = Ti.UI.createButton({
        title: "Register for free on cascade.org",
        bottom: 0,
        id: "__alloyId1"
    });
    $.__views.detail.add($.__views.__alloyId1);
    select ? $.addListener($.__views.__alloyId1, "click", select) : __defers["$.__views.__alloyId1!click!select"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var model = arguments[0] || {};
    $.startDateTime.text = model.get("fgrrss:startDateTime").toString();
    $.description.text = model.get("description").replace(/<\/?[^>]+(>|$)/g, "").toString();
    $.address.text = model.get("fgrrss:startAddress").toString();
    $.pace.text = model.get("fgrrss:pace").toString();
    $.leader.text = model.get("fgrrss:rideLeader").toString();
    $.distance.text = model.get("fgrrss:distance").toString();
    $.title = model.get("title").toString();
    var contact = unescape(model.get("fgrrss:contact"));
    var contactStartPosition = getPosition(contact, ">", 6) + 1;
    var contactEndPosition = getPosition(contact, "<", 7);
    var emailStartPositioin = getPosition(contact, ">", 12) + 1;
    var emailEndPosition = getPosition(contact, "<", 13);
    var phoneStartPosition = getPosition(contact, ">", 18) + 1;
    var phoneEndPosition = getPosition(contact, "<", 19);
    $.email.text = contact.substring(emailStartPositioin, emailEndPosition);
    $.phone.text = contact.substring(phoneStartPosition, phoneEndPosition);
    var Map = require("ti.map");
    var latitude = model.get("latitude");
    var longitude = model.get("longitude");
    $.mapview.setRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: .1,
        longitudeDelta: .1,
        zoom: 1,
        tilt: 45
    });
    var mapAnnotation = Map.createAnnotation({
        latitude: latitude,
        longitude: longitude,
        animate: true
    });
    $.mapview.addAnnotation(mapAnnotation);
    (function(args) {
        "use strict";
        var model = args.model;
        $.win.title = model.get("title");
    });
    var link = "https://www.cascade.org" + model.get("link");
    var contactName = contact.substring(contactStartPosition, contactEndPosition);
    var contactEmail = contact.substring(emailStartPositioin, emailEndPosition);
    var contactPhone = contact.substring(phoneStartPosition, phoneEndPosition);
    __defers["$.__views.readMore!click!select"] && $.addListener($.__views.readMore, "click", select);
    __defers["$.__views.directions!click!openMap"] && $.addListener($.__views.directions, "click", openMap);
    __defers["$.__views.email!click!emailContact"] && $.addListener($.__views.email, "click", emailContact);
    __defers["$.__views.phone!click!callContact"] && $.addListener($.__views.phone, "click", callContact);
    __defers["$.__views.__alloyId1!click!select"] && $.addListener($.__views.__alloyId1, "click", select);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;