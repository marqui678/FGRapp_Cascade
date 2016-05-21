// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var regionCenter = Alloy.Globals.regionCenter;
var rideData = Alloy.Collections.feed.models;

var lastClickedAnnotationId = null;
var searchLocAnnotation = undefined;

//Set map region by region center
setMapRegion(regionCenter);

//To fix pin image (with image property in annotation) not show in Android 6, create view with pin as background image
var customAnnotationView = Ti.UI.createView({
    backgroundImage: '/images/ic_place_green.png',
    height: "40dp",
    width: "28dp"
});

createAnnotationsForMap(rideData, customAnnotationView);

//Add the search annotation back if user searched address on last visit of mapview
if (Alloy.Globals.isSearchLoc) {
	searchLocAnnotation = createSearchAnnotation(regionCenter);
	$.mapview.addAnnotation(searchLocAnnotation);
}

//Menu
var thisWin=$.mainWindow;
var main=$.mainView;

// store drawermenu and main in global variable for easy access from menu
Alloy.CFG.drawermenu=$.drawermenu;
Alloy.CFG.main=main;

var menu=Alloy.createController('menu').getView();

$.drawermenu.init({
    menuview:menu,
    mainview:main,
    duration:200,
    parent: thisWin
});

thisWin.addEventListener('open',function(e){
	var actionBarHelper = require('com.alcoapps.actionbarhelper')(thisWin);	
	
	actionBarHelper.setUpAction(function(e){
		$.drawermenu.showhidemenu();
	});
	
	if (OS_IOS) {
		actionBarHelper.setIcon('/images/menu_light.png');
		actionBarHelper.setTitle('Map');
		actionBarHelper.displayHomeAsUp(false);
	}
	
	if (OS_ANDROID) {
		var actionBarExtra = require('com.alcoapps.actionbarextras');
		actionBarExtra.title = "Map";
		actionBarExtra.setHomeAsUpIcon("/images/menu_light.png");
		actionBarHelper.displayHomeAsUp(true);
	}
});

$.mainWindow.addEventListener('loc_updated', function(e){
	//If not use current locstion, add annotation for searched location
	if (!e.isCurrentLoc) {
		if (searchLocAnnotation === undefined) {
			//Create annotation and add to map
			searchLocAnnotation = createSearchAnnotation(regionCenter);
		$.mapview.addAnnotation(searchLocAnnotation);
		}
		else {
			//Update annotation
			searchLocAnnotation.latitude = regionCenter.latitude;
			searchLocAnnotation.longitude = regionCenter.longitude;
			searchLocAnnotation.title = regionCenter.displayAddress;
		}
	}
	else {
		//remove and reset if there is search annotation on map
		if (searchLocAnnotation !== undefined) {
			$.mapview.removeAnnotation(searchLocAnnotation);
			searchLocAnnotation = undefined;
		}
	}
	
	centeredBySearchLocation();
});

$.mainWindow.addEventListener('filter_updated', function(e){
	//Update annotations with filtered data
	createAnnotationsForMap(Alloy.Collections.feed.models, customAnnotationView);
	//Add search anno to map if exist
	if(searchLocAnnotation !== undefined) {
		$.mapview.addAnnotation(searchLocAnnotation);
	}
});

function createSearchAnnotation(regionCenter) {
	return Alloy.Globals.Map.createAnnotation({
			latitude: regionCenter.latitude,
	    	longitude: regionCenter.longitude,
	    	title: regionCenter.displayAddress,
    		myid: "anno_search",
    		id: "anno_search",
		});
}

function centeredBySearchLocation() {
	//Re-calc distanceToLocation as regionCenter is changed
	Alloy.Globals.setDistanceToLocation(rideData, regionCenter);
	
    //Set map region by region center
    setMapRegion(regionCenter);
    
    //If current sortItem is location, re-sort with new location
    if (Alloy.Globals.selectedSort.id === 2) {
    	Alloy.Collections.feed.sort();
    }
}

function setMapRegion(regionCenter) {
	//Set map region to zoom into point
	$.mapview.setRegion({
		latitude: regionCenter.latitude,
		longitude: regionCenter.longitude,
		latitudeDelta: 0.040,
		longitudeDelta: 0.040
	});
}
		
function createAnnotationsForMap(models, customAnnotationView){
	if (models == null || models.length < 1) {
		return;
	}
	//Make annotation
	var annotations = createAnnotationsWithModels(models, customAnnotationView);
	
	//Add annotation
	$.mapview.setAnnotations(annotations);
};

/** 
 *Param: models [model]
 *Return an array of annotation
 */
function createAnnotationsWithModels(models, customAnnotationView) {
	//For each model, make annotation
	var annotations = [];
	for (var i = 0; i < models.length; i++) {
		var model = models[i];
		var annotation = Alloy.Globals.Map.createAnnotation({
			latitude: model.get("latitude"),
	    	longitude: model.get("longitude"),
	    	title: model.get("title"),
    		image:'/images/ic_place_green.png',
    		//customView: customAnnotationView,
    		myid:model.get("link"),
    		id: "anno_" + i,
		});
		
		//Use customView instead of image as pin for android
		if (OS_ANDROID) {
			annotation.customView = customAnnotationView;
		}
		
		annotations.push(annotation);
	}

	return annotations;
}

/**
 *Show callout info at the bottom 
 * @param {Object} evt
 */
function report(evt) {
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
    
    if (OS_IOS) {
	    if (evt.clicksource === "pin") {
		    //Select
		    if (!(evt.annotation.myid === lastClickedAnnotationId) || (evt.annotation.myid === "anno_search")) {
		    	//Set info in callout box and show it 	
		    	setCalloutInfo(evt.annotation.myid);    	
		    	$.rideInfoCalloutWrapper.show();
		    	
		    	//Update lastClickedAnnotationId
		    	lastClickedAnnotationId = evt.annotation.myid;
		    }
		    //Deselect: select search location anotation
		    else if (evt.annotation.myid === "anno_search") {
		    	$.rideInfoCalloutWrapper.hide();
	    		lastClickedAnnotationId = null;
		    }
	    }
	    //Deselect
	    else if (evt.clicksource === "map") {
	    	$.rideInfoCalloutWrapper.hide();
	    	lastClickedAnnotationId = null;
	    }
    }
}

/**
 *Set callout info with model data 
 * @param {Object} modelId
 */
function setCalloutInfo(link) {
	var model = Alloy.Collections.feed.get(link);
	var data = Alloy.Globals.transform(model);
	$.selectedModel = data;
	$.rideTitle.text = data.title;
	$.startDateTime.text = data.startDateTime;
	$.paceNumber.text = data.paceNumber;
	$.pace.text = data.pace;
	$.distanceOne.text = data.distanceOne;
	$.distanceTwo.text = data.distanceTwo;
}

function toSearch(e) {
	//Pass $.mainWindow as SearchView will fire event for it.
	//Pass regionCenter so it can be updated by search
	Alloy.Globals.Navigator.open("search", {prevWindow: $.mainWindow, regionCenter: regionCenter});
}

function toFilter(e) {
	Alloy.Globals.Navigator.open("filter", {prevMapWindow: $.mainWindow});
}

function toList(e) {
	$.mainWindow.close();
}

function showDetail(e) {
	var selectedModel = Alloy.Collections.feed.get(lastClickedAnnotationId);
	Alloy.Globals.Navigator.open("detail", selectedModel);
}
function openMenu(e){
	$.drawermenu.showhidemenu();
}

