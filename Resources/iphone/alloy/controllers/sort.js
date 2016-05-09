function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function selectSort(e) {
        void 0 !== selectedSort.id && (e.section.getItemAt(selectedSort.id).radioBtn.image = radioBtn);
        if (void 0 === selectedSort.id || selectedSort.id !== e.itemIndex) {
            if (void 0 !== selectedSort.id) {
                var prevItem = e.section.getItemAt(selectedSort.id);
                prevItem.radioBtn.image = radioBtn;
                e.section.updateItemAt(selectedSort.id, prevItem);
            }
            var currentItem = e.section.getItemAt(e.itemIndex);
            currentItem.radioBtn.image = selectedRadioBtn;
            e.section.updateItemAt(e.itemIndex, currentItem);
            selectedSort.id = e.itemIndex;
            selectedSort.item = currentItem;
            $.sortByResult.text = selectedSort.item.title.text + ": " + selectedSort.item.direction.text;
        }
    }
    function setSortDirection(e) {
        e.cancelBubble = true;
        var currentSortOption = e.section.getItemAt(e.itemIndex);
        currentSortOption.isAscDir = !currentSortOption.isAscDir;
        if (currentSortOption.isAscDir) {
            currentSortOption.direction = currentSortOption.ascDir;
            currentSortOption.arrowBtn.image = arrowBtn;
        } else {
            currentSortOption.direction = currentSortOption.desDir;
            currentSortOption.arrowBtn.image = downArrowBtn;
        }
        if (selectedSort.id == e.itemIndex) {
            selectedSort.item = currentSortOption;
            $.sortByResult.text = selectedSort.item.title.text + ": " + selectedSort.item.direction.text;
        }
        e.section.updateItemAt(e.itemIndex, currentSortOption);
    }
    function applySort() {
        Alloy.Collections.feed.setSortField(selectedSort.item.field, selectedSort.item.direction.dir);
        Alloy.Collections.feed.sort();
        $.sortWindow.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "sort";
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
    $.__views.sortWindow = Ti.UI.createWindow({
        barColor: "#CD1625",
        backgroundColor: "#FFF",
        navTintColor: "#FFF",
        translucent: false,
        titleAttributes: {
            color: "#FFF"
        },
        id: "sortWindow",
        title: "Sort"
    });
    $.__views.sortWindow && $.addTopLevelView($.__views.sortWindow);
    $.__views.sortByInfo = Ti.UI.createView({
        top: "0",
        left: "15",
        right: "15",
        height: "50",
        id: "sortByInfo"
    });
    $.__views.sortWindow.add($.__views.sortByInfo);
    $.__views.sortBy = Ti.UI.createLabel({
        color: "#000",
        left: "0",
        text: "SORT BY",
        id: "sortBy"
    });
    $.__views.sortByInfo.add($.__views.sortBy);
    $.__views.sortByResult = Ti.UI.createLabel({
        color: "#000",
        right: "0",
        text: "Distance: short to long",
        id: "sortByResult"
    });
    $.__views.sortByInfo.add($.__views.sortByResult);
    var __alloyId69 = {};
    var __alloyId72 = [];
    var __alloyId73 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId74 = [];
            var __alloyId75 = {
                type: "Ti.UI.ImageView",
                bindId: "radioBtn",
                properties: {
                    bindId: "radioBtn"
                }
            };
            __alloyId74.push(__alloyId75);
            var __alloyId76 = {
                type: "Ti.UI.Label",
                bindId: "title",
                properties: {
                    color: "#000",
                    bindId: "title"
                }
            };
            __alloyId74.push(__alloyId76);
            var __alloyId77 = {
                type: "Ti.UI.Label",
                bindId: "direction",
                properties: {
                    color: "blue",
                    right: "15",
                    bindId: "direction"
                }
            };
            __alloyId74.push(__alloyId77);
            var __alloyId78 = {
                type: "Ti.UI.ImageView",
                bindId: "arrowBtn",
                properties: {
                    right: "0",
                    width: "15",
                    bindId: "arrowBtn"
                },
                events: {
                    click: setSortDirection
                }
            };
            __alloyId74.push(__alloyId78);
            return __alloyId74;
        }(),
        properties: {
            left: "0",
            right: "0",
            layout: "horizontal"
        }
    };
    __alloyId72.push(__alloyId73);
    var __alloyId71 = {
        properties: {
            name: "elementTemplate",
            height: 50
        },
        childTemplates: __alloyId72
    };
    __alloyId69["elementTemplate"] = __alloyId71;
    $.__views.__alloyId79 = Ti.UI.createListSection({
        id: "__alloyId79"
    });
    var __alloyId81 = [];
    __alloyId81.push($.__views.__alloyId79);
    $.__views.sortOptionsList = Ti.UI.createListView({
        top: "50",
        left: "15",
        right: "15",
        sections: __alloyId81,
        templates: __alloyId69,
        id: "sortOptionsList",
        defaultItemTemplate: "elementTemplate"
    });
    $.__views.sortWindow.add($.__views.sortOptionsList);
    selectSort ? $.addListener($.__views.sortOptionsList, "itemclick", selectSort) : __defers["$.__views.sortOptionsList!itemclick!selectSort"] = true;
    $.__views.__alloyId82 = Ti.UI.createButton({
        title: "Apply",
        id: "__alloyId82"
    });
    $.__views.sortWindow.add($.__views.__alloyId82);
    applySort ? $.addListener($.__views.__alloyId82, "click", applySort) : __defers["$.__views.__alloyId82!click!applySort"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    var radioBtn = "images/checkbox.png";
    var selectedRadioBtn = "images/checkboxSelected.png";
    var arrowBtn = "images/sortIncrease.png";
    var downArrowBtn = "images/sortDecrease.png";
    JSON.stringify(Alloy.Globals.selectedSort);
    var selectedSort = Alloy.Globals.selectedSort;
    var sortOptions = [ {
        radioBtn: {
            image: radioBtn
        },
        title: {
            text: "Distance"
        },
        direction: {
            text: "short to long",
            dir: "ASC"
        },
        ascDir: {
            text: "short to long",
            dir: "ASC"
        },
        desDir: {
            text: "long to short",
            dir: "DES"
        },
        isAscDir: true,
        arrowBtn: {
            image: arrowBtn
        },
        field: "fgrrss:distance"
    }, {
        radioBtn: {
            image: radioBtn
        },
        title: {
            text: "Date"
        },
        isAscDir: true,
        direction: {
            text: "sooner to later",
            dir: "ASC"
        },
        ascDir: {
            text: "sooner to later",
            dir: "ASC"
        },
        desDir: {
            text: "later to sooner",
            dir: "DES"
        },
        arrowBtn: {
            image: arrowBtn
        },
        field: "startDateTime"
    }, {
        radioBtn: {
            image: radioBtn
        },
        title: {
            text: "Location"
        },
        isAscDir: true,
        direction: {
            text: "near to far",
            dir: "ASC"
        },
        ascDir: {
            text: "near to far",
            dir: "ASC"
        },
        desDir: {
            text: "far to near",
            dir: "DES"
        },
        arrowBtn: {
            image: arrowBtn
        },
        field: "distanceToLocation"
    }, {
        radioBtn: {
            image: radioBtn
        },
        title: {
            text: "Pace"
        },
        isAscDir: true,
        direction: {
            text: "slow to fast",
            dir: "ASC"
        },
        ascDir: {
            text: "slow to fast",
            dir: "ASC"
        },
        desDir: {
            text: "fast to slow",
            dir: "DES"
        },
        arrowBtn: {
            image: arrowBtn
        },
        field: "lowestPace"
    } ];
    if (void 0 !== selectedSort.id) {
        sortOptions[selectedSort.id].radioBtn.image = selectedRadioBtn;
        $.sortByResult.text = selectedSort.item.title.text + ": " + selectedSort.item.direction.text;
    }
    $.sortOptionsList.sections[0].setItems(sortOptions);
    __defers["$.__views.sortOptionsList!itemclick!selectSort"] && $.addListener($.__views.sortOptionsList, "itemclick", selectSort);
    __defers["$.__views.__alloyId82!click!applySort"] && $.addListener($.__views.__alloyId82, "click", applySort);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;