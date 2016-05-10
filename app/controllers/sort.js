// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var radioBtn = "images/ic_radio_button_off.png";
var selectedRadioBtn = "images/ic_radio_button_on.png";
var arrowBtn = "images/ic_arrow_drop_up.png";
var downArrowBtn = "images/ic_arrow_drop_down.png";

var prevSelectedSortBackup = JSON.stringify(Alloy.Globals.selectedSort);

var selectedSort = Alloy.Globals.selectedSort;

var sortOptions = [
	    {
	        radioBtn : {image: radioBtn}, 
	        title : {text: "Distance"},
	        direction : {text: "short to long", dir: "ASC"},
	        ascDir: {text: "short to long", dir: "ASC"},
	        desDir: {text: "long to short", dir: "DES"},
	        isAscDir: true,
	        arrowBtn : {image: arrowBtn},
	        field: "fgrrss:distance"
	    },
	    {
	        radioBtn : {image: radioBtn}, 
	        title : {text: "Date"},
	        isAscDir: true,
	        direction: {text: "sooner to later", dir: "ASC"},
	        ascDir: {text: "sooner to later", dir: "ASC"},
	        desDir: {text: "later to sooner", dir: "DES"},
	        arrowBtn : {image: arrowBtn},
	        field: "startDateTime"
	    },
	    {
	        radioBtn : {image: radioBtn}, 
	        title : {text: "Location"},
	        isAscDir: true,
	        direction : {text: "near to far", dir: "ASC"},
	        ascDir: {text: "near to far", dir: "ASC"},
	        desDir: {text: "far to near", dir: "DES"},
	        arrowBtn : {image: arrowBtn},
	        field: "distanceToLocation"
	    },
	    {
	        radioBtn : {image: radioBtn}, 
	        title : {text: "Pace"},
	        isAscDir: true,
	        direction : {text: "slow to fast", dir: "ASC"},
	        ascDir: {text: "slow to fast", dir: "ASC"},
	        desDir: {text: "fast to slow", dir: "DES"},
	        arrowBtn : {image: arrowBtn},
	        field: "lowestPace"
	    },
	];
	
//Check if there is selectedSort item
if (selectedSort.id !== undefined) {
	sortOptions[selectedSort.id].radioBtn.image = selectedRadioBtn;
	sortOptions[selectedSort.id].direction = selectedSort.item.direction;
	if(selectedSort.item.direction.dir === "DES") {
		sortOptions[selectedSort.id].arrowBtn.image = downArrowBtn;
	}
	$.sortByResult.text = selectedSort.item.title.text + ": " + selectedSort.item.direction.text;
}
	
//Add sortOptions to list view
$.sortOptionsList.sections[0].setItems(sortOptions);

/**
 *Update selectedSort based on clicked sort option 
 * @param {Object} e
 */
function selectSort(e) {
	//Check if there is selectedSort item, reset radioBtn
	if (selectedSort.id !== undefined) {
		e.section.getItemAt(selectedSort.id).radioBtn.image = radioBtn;
	}
	//Clicked item is different from selectedSort item, update radioBtn and selectedSort
	if (selectedSort.id === undefined || selectedSort.id !== e.itemIndex) {
		//Update radioBtn of previous selectedSort
		if (selectedSort.id !== undefined) {
			var prevItem = e.section.getItemAt(selectedSort.id);
			prevItem.radioBtn.image = radioBtn;
			e.section.updateItemAt(selectedSort.id, prevItem);
		}
		
		//Update current selected item
		var currentItem = e.section.getItemAt(e.itemIndex);
		currentItem.radioBtn.image = selectedRadioBtn;
		e.section.updateItemAt(e.itemIndex, currentItem);
		
		//Update selectedSort
		selectedSort.id = e.itemIndex;
		selectedSort.item = currentItem;
		
		//Update SORTBY label
		$.sortByResult.text = selectedSort.item.title.text + ": " + selectedSort.item.direction.text;
	}

}

function setSortDirection(e) {
	e.cancelBubble = true;
	var currentSortOption = e.section.getItemAt(e.itemIndex);
	currentSortOption.isAscDir = !currentSortOption.isAscDir;
	//Update direction and arrowBtn
	if (currentSortOption.isAscDir) {
		currentSortOption.direction = currentSortOption.ascDir;
		currentSortOption.arrowBtn.image = arrowBtn;
	}
	else {
		currentSortOption.direction = currentSortOption.desDir;
		currentSortOption.arrowBtn.image = downArrowBtn;
	}
	
	//If the item is currently selected, update selectedOptions
	if (selectedSort.id == e.itemIndex) {
		selectedSort.item = currentSortOption;
		$.sortByResult.text = selectedSort.item.title.text + ": " + selectedSort.item.direction.text;
	}
	
	//Update listview
	e.section.updateItemAt(e.itemIndex, currentSortOption);
}

function applySort() {
	Alloy.Collections.feed.setSortField(selectedSort.item.field, selectedSort.item.direction.dir);
	Alloy.Collections.feed.sort();
	//TODO show sort item as text in sort btn
	$.sortWindow.close();
}

function cancel() {
	Alloy.Globals.selectedSort = JSON.parse(prevSelectedSortBackup);
	$.sortWindow.close();
}
