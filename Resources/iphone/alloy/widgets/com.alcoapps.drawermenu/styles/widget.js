function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.alcoapps.drawermenu/" + s : s.substring(0, index) + "/com.alcoapps.drawermenu/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0001,
    key: "Window",
    style: {
        barColor: "#CD1625",
        backgroundColor: "#FFF"
    }
}, {
    isApi: true,
    priority: 1000.0004,
    key: "Label",
    style: {
        color: "#000"
    }
}, {
    isApi: true,
    priority: 1101.0002,
    key: "Window",
    style: {
        barColor: "#CD1625",
        navTintColor: "#FFF",
        translucent: false,
        titleAttributes: {
            color: "#FFF"
        }
    }
}, {
    isId: true,
    priority: 100000.0005,
    key: "menuview",
    style: {
        backgroundColor: "#cacaca",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL
    }
}, {
    isId: true,
    priority: 100000.0006,
    key: "mainview",
    style: {
        backgroundColor: "red",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL
    }
}, {
    isId: true,
    priority: 100000.0007,
    key: "mainviewheader",
    style: {
        top: "0",
        height: "50dp",
        width: Ti.UI.FILL,
        backgroundColor: "#cacaca"
    }
}, {
    isId: true,
    priority: 100000.0008,
    key: "menubutton",
    style: {
        left: "0",
        borderWidth: 1,
        borderColor: "#000",
        width: "40dp",
        height: "40dp",
        visible: true
    }
} ];