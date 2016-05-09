function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function menuClick(e) {
        var rowId = e.rowData.rowId;
        switch (rowId) {
          case 1:
            alert("Pace classification clicked");
            break;

          case 2:
            alert("About clicked");
        }
        Alloy.CFG.drawermenu.showhidemenu();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menu";
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
    $.__views.menu = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
<<<<<<< HEAD
        backgroundColor: "#43B02A",
        id: "menu"
    });
    $.__views.menu && $.addTopLevelView($.__views.menu);
    $.__views.__alloyId54 = Ti.UI.createView({
        top: "0",
        height: "100",
        backgroundImage: "/CBCEFHorizontal361_Transparent.png",
        backgroundColor: "#fff",
        id: "__alloyId54"
    });
    $.__views.menu.add($.__views.__alloyId54);
    var __alloyId56 = [];
    $.__views.__alloyId57 = Ti.UI.createTableViewRow({
=======
        backgroundColor: "#4F4F4F",
        id: "menu"
    });
    $.__views.menu && $.addTopLevelView($.__views.menu);
    $.__views.__alloyId55 = Ti.UI.createView({
        top: "0",
        height: "100",
        backgroundImage: "/coffee.png",
        id: "__alloyId55"
    });
    $.__views.menu.add($.__views.__alloyId55);
    var __alloyId57 = [];
    $.__views.__alloyId58 = Ti.UI.createTableViewRow({
>>>>>>> Jia1
        width: Ti.UI.FILL,
        color: "#fff",
        height: Ti.UI.SIZE,
        rowId: 1,
<<<<<<< HEAD
        id: "__alloyId57"
    });
    __alloyId56.push($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createView({
        height: "50",
        layout: "horizontal",
        id: "__alloyId58"
    });
    $.__views.__alloyId57.add($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.FILL,
        left: "5",
        id: "__alloyId59"
    });
    $.__views.__alloyId58.add($.__views.__alloyId59);
    $.__views.__alloyId60 = Ti.UI.createImageView({
        width: "30",
        height: "30",
        image: "/ic_action_not_important.png",
        id: "__alloyId60"
    });
    $.__views.__alloyId59.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createLabel({
=======
        id: "__alloyId58"
    });
    __alloyId57.push($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createView({
        backgroundColor: "#414141",
        height: "50",
        layout: "horizontal",
        id: "__alloyId59"
    });
    $.__views.__alloyId58.add($.__views.__alloyId59);
    $.__views.__alloyId60 = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.FILL,
        left: "5",
        id: "__alloyId60"
    });
    $.__views.__alloyId59.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createImageView({
        width: "30",
        height: "30",
        image: "/ic_action_not_important.png",
        id: "__alloyId61"
    });
    $.__views.__alloyId60.add($.__views.__alloyId61);
    $.__views.__alloyId62 = Ti.UI.createLabel({
>>>>>>> Jia1
        color: "#fff",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        left: "10",
        text: "Pace classification",
<<<<<<< HEAD
        id: "__alloyId61"
    });
    $.__views.__alloyId58.add($.__views.__alloyId61);
    $.__views.__alloyId62 = Ti.UI.createTableViewRow({
=======
        id: "__alloyId62"
    });
    $.__views.__alloyId59.add($.__views.__alloyId62);
    $.__views.__alloyId63 = Ti.UI.createTableViewRow({
>>>>>>> Jia1
        width: Ti.UI.FILL,
        color: "#fff",
        height: Ti.UI.SIZE,
        rowId: 2,
<<<<<<< HEAD
        selectedBackgroundColor: "white",
        id: "__alloyId62"
    });
    __alloyId56.push($.__views.__alloyId62);
    $.__views.__alloyId63 = Ti.UI.createView({
        height: "50",
        layout: "horizontal",
        id: "__alloyId63"
    });
    $.__views.__alloyId62.add($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.FILL,
        left: "5",
        id: "__alloyId64"
    });
    $.__views.__alloyId63.add($.__views.__alloyId64);
    $.__views.__alloyId65 = Ti.UI.createImageView({
        width: "30",
        height: "30",
        image: "/ic_action_not_important.png",
        id: "__alloyId65"
    });
    $.__views.__alloyId64.add($.__views.__alloyId65);
    $.__views.__alloyId66 = Ti.UI.createLabel({
=======
        id: "__alloyId63"
    });
    __alloyId57.push($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createView({
        backgroundColor: "#414141",
        height: "50",
        layout: "horizontal",
        id: "__alloyId64"
    });
    $.__views.__alloyId63.add($.__views.__alloyId64);
    $.__views.__alloyId65 = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.FILL,
        left: "5",
        id: "__alloyId65"
    });
    $.__views.__alloyId64.add($.__views.__alloyId65);
    $.__views.__alloyId66 = Ti.UI.createImageView({
        width: "30",
        height: "30",
        image: "/ic_action_not_important.png",
        id: "__alloyId66"
    });
    $.__views.__alloyId65.add($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createLabel({
>>>>>>> Jia1
        color: "#fff",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        left: "10",
        text: "About",
<<<<<<< HEAD
        id: "__alloyId66"
    });
    $.__views.__alloyId63.add($.__views.__alloyId66);
    $.__views.__alloyId55 = Ti.UI.createTableView({
        top: "100",
        height: Ti.UI.SIZE,
        data: __alloyId56,
        id: "__alloyId55"
    });
    $.__views.menu.add($.__views.__alloyId55);
    menuClick ? $.addListener($.__views.__alloyId55, "click", menuClick) : __defers["$.__views.__alloyId55!click!menuClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId55!click!menuClick"] && $.addListener($.__views.__alloyId55, "click", menuClick);
=======
        id: "__alloyId67"
    });
    $.__views.__alloyId64.add($.__views.__alloyId67);
    $.__views.__alloyId56 = Ti.UI.createTableView({
        backgroundColor: "#343434",
        top: "100",
        height: Ti.UI.SIZE,
        data: __alloyId57,
        id: "__alloyId56"
    });
    $.__views.menu.add($.__views.__alloyId56);
    menuClick ? $.addListener($.__views.__alloyId56, "click", menuClick) : __defers["$.__views.__alloyId56!click!menuClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId56!click!menuClick"] && $.addListener($.__views.__alloyId56, "click", menuClick);
>>>>>>> Jia1
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;