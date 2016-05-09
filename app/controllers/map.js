// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

//Location input by search
var searchLoc = args.searchLoc;

//Init region center
var regionCenter = {};
var rideData = Alloy.Collections.feed.models;

var lastClickedAnnotationId = null;
var searchLocAnnotation = undefined;

if (searchLoc === undefined) {
	//Show map with current location pin in the center
	centeredByCurrentLocation();
}
else {
	//Show map with searchLoc in the center
	centeredBySearchLocation();
}

createAnnotationsForMap(rideData);

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
	actionBarHelper.displayHomeAsUp(true);
	
	if (OS_ANDROID) {
		var actionBarExtra = require('com.alcoapps.actionbarextras');
		actionBarExtra.title = "Map";
		//actionBarExtra.titleColor = "blue";
		actionBarExtra.setHomeAsUpIcon("/images/ic_menu_light.png");
	}
});

$.mainWindow.addEventListener('loc_updated', function(e){
	//If not use current locstion, add annotation for searched location
	if (!e.isCurrentLoc) {
		if (searchLocAnnotation === undefined) {
			//Create annotation and add to map
			searchLocAnnotation = Alloy.Globals.Map.createAnnotation({
			latitude: regionCenter.latitude,
	    	longitude: regionCenter.longitude,
	    	title: regionCenter.displayAddress,
    		pincolor:Ti.Map.ANNOTATION_GREEN,
    		myid: "anno_search",
    		id: "anno_search",
		});
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
});

function centeredByCurrentLocation() {
	if (Ti.Geolocation.locationServicesEnabled === false) {
		alert("The device has geo turned off. Use default location.");
		setRegionCenterAndSortByLoc(Alloy.Globals.defaultLocation);
	}
	
	Titanium.Geolocation.getCurrentPosition(function(e) {
	    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
	    if (e.error)
	    {
	        alert('Current location not found. Use default location');	
	    	setRegionCenterAndSortByLoc(Alloy.Globals.defaultLocation);    
	    }
	    else {
	    	//Set regionCenter with current location and sort	
	    	setRegionCenterAndSortByLoc(e.coords);       
        }
	});
};

function setRegionCenterAndSortByLoc(centerLoc) {
	regionCenter.latitude = centerLoc.latitude;
	regionCenter.longitude = centerLoc.longitude;
	
    //Set map region by region center
    setMapRegion(regionCenter);
    
    //TODO If have combined view, only set distance when loading combined view or after search
    //Set distance to region center for each model
    setDistanceToLocation(rideData, regionCenter);
    //Sort models by distanceToLoc
    Alloy.Collections.feed.setSortField("distanceToLocation", "ASC");
	Alloy.Collections.feed.sort();
}

function centeredBySearchLocation() {
	setMapRegion(regionCenter);
	setDistanceToLocation(rideData, regionCenter);
	Alloy.Collections.feed.setSortField("distanceToLocation", "ASC");
	Alloy.Collections.feed.sort();
}

/**
 *For each model, set value for field distanceToLoc based on given target location
 */
function setDistanceToLocation(models, targetLoc) {
	for (var i = 0; i < models.length; i++) {
		var model = models[i];
		model.setDistanceToLoc(targetLoc);
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
		
function createAnnotationsForMap(models){
	if (models == null || models.length < 1) {
		return;
	}
	//Make annotation
	var annotations = createAnnotationsWithModels(models);
	
	//Add annotation
	$.mapview.setAnnotations(annotations);
};

/** 
 *Param: models [model]
 *Return an array of annotation
 */
function createAnnotationsWithModels(models) {
	//For each model, make annotation
	var annotations = [];
	for (var i = 0; i < models.length; i++) {
		var model = models[i];
		var annotation = Alloy.Globals.Map.createAnnotation({
			latitude: model.get("latitude"),
	    	longitude: model.get("longitude"),
	    	title: model.get("title"),
    		image:'/images/ic_place_green.png',
    		myid:model.get("link"),
    		id: "anno_" + i,
		});
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
    //Deselect (including select search location anotation)
    if (evt.clicksource === null || 
    	(evt.clicksource === "pin" && 
    		(evt.annotation.myid === lastClickedAnnotationId) || (evt.annotation.myid === "anno_search")
    	)) {
    	$.rideInfoCallout.visible = false;
    	lastClickedAnnotationId = null;
    	//Resize mapview
    	//$.mapview.bottom = "0dp";
    } 
    //Select
    else {
    	//Set info in callout box and show it 	
    	setCalloutInfo(evt.annotation.myid);    	
    	$.rideInfoCallout.visible = true;
    	
    	//Update lastClickedAnnotationId
    	lastClickedAnnotationId = evt.annotation.myid;
    	//Resize mapview
    	//$.mapview.bottom = "70dp";
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
	$.rideDate.text = data.startDateTime;
	$.ridePace.text = data.pace;
	$.rideDistance.text = data.distance;
}

function toSearch(e) {
	//Pass $.mainWindow as SearchView will fire event for it.
	//Pass regionCenter so it can be updated by search
	Alloy.Globals.Navigator.open("search", {prevWindow: $.mainWindow, regionCenter: regionCenter});
}

function toFilter(e) {
	alert("Filter clicked");
}

function showDetail(e) {
	var selectedModel = Alloy.Collections.feed.get(lastClickedAnnotationId);
	Alloy.Globals.Navigator.open("detail", selectedModel);
}

