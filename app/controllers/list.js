// require the built-in MomentJS library
var moment = require('alloy/moment');
/**
 * self-executing function to organize otherwise inline constructor code
 * @param  {Object} args arguments passed to the controller
 */
(function constructor(args) {

	// use strict mode for this function scope
	'use strict';
	// check for network	
	if(Titanium.Network.networkType == Titanium.Network.NETWORK_NONE){
	     alert('Your device is not online. Please check your network and try again.');
	} else{
		// use the refresh callback for the initial load
		refresh();
	}
	// execute constructor with optional arguments passed to controller
})(arguments[0] || {});

/**
 * event listener added via view for the refreshControl (iOS) or button (Android)
 * @param  {Object} e Event, unless it was called from the constructor
 */
function refresh(e) {
	'use strict';

	//Init map region center by current location, use default location if currentLocation not available
	initRegionCenter();
	
	// if we were called from the constructor programmatically show the refresh animation
	if (OS_IOS && !e) {
		$.refreshControl.beginRefreshing();
	}

	/**
	 * callback for fetch, both success and error
	 * @param  {Object} e Event
	 */
	function afterFetch(col, res) {

		// for iOS end the refreshing animation
		if (OS_IOS) {
			$.refreshControl.endRefreshing();
		}
		$.search.blur();
		//Need to Calc distance to location as it would be used in sort.
		Alloy.Globals.setDistanceToLocation(Alloy.Collections.feed.models, Alloy.Globals.regionCenter);
		
		//Sort by date
		Alloy.Collections.feed.setSortField("startDateTime", "ASC");
		Alloy.Collections.feed.sort();
	}

	// MobileWeb can't load the remote file because we don't have access control set-up
	var url = OS_MOBILEWEB ? Ti.Filesystem.resourcesDirectory + 'feed.xml' : Alloy.CFG.url;

	// let the collection fetch data from it's data source
		Alloy.Collections.feed.fetch({
		url: url,
		success: afterFetch,
		error: afterFetch
		});
	}
	
//Set Alloy.Globals.regionCenter
function initRegionCenter() {
	if(!Titanium.Geolocation.hasLocationPermissions(Titanium.Geolocation.AUTHORIZATION_ALWAYS)) {
		Titanium.Geolocation.requestLocationPermissions(Titanium.Geolocation.AUTHORIZATION_ALWAYS, function(result){
			if(!result.success) {
				//no location permissions flow triggers
				alert("Do not have Geolocation permission. Use default location");
				setRegionCenter(Alloy.Globals.defaultLocation);
			} 
			else {
				setGeoLoc();
			}
		});
	}
	else {
		setGeoLoc();
	}
};

function setGeoLoc() {
	if (Ti.Geolocation.locationServicesEnabled === false) {
		alert("The device has geo turned off. Use default location.");
		setRegionCenter(Alloy.Globals.defaultLocation);
	}
	
	Titanium.Geolocation.getCurrentPosition(function(e) {
	    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
	    if (e.error)
	    {
	        alert('Current location not found. Use default location');	
	    	setRegionCenter(Alloy.Globals.defaultLocation);    
	    }
	    else {
	    	//Set regionCenter with current location and sort	
	    	setRegionCenter(e.coords);       
        }
	});
}

function setRegionCenter(centerLoc) {
	Alloy.Globals.regionCenter.latitude = centerLoc.latitude;
	Alloy.Globals.regionCenter.longitude = centerLoc.longitude;
}

/**
 * set via view to be applied on each model before it renders
 * @param  {Object} model BackBone model
 * @return {Object}       Transformed properties
 */

function transform(model) {
	'use strict';
	return {
		title: model.get('title'),
		startDateTime: moment(model.get('startDateTime'),moment.ISO_8601).format('LLLL'),
		link:model.get('link'),
		paceNumber:model.get('paceNumber'),
		pace:model.get('pace'),
		distanceOne:model.get('distance1'),
		distanceTwo:model.get('distance2')
	};
}

//Make transform accessible for other controllers
Alloy.Globals.transform = transform;

/**
 * event listener set via view for when the user selects a ListView item
 * @param  {Object} e Event
 */
function select(e) {
	'use strict';

	// we've stored the guid in the special itemId property of the item
	var link = OS_MOBILEWEB ? e.row.itemId : e.itemId;

	// lookup the model
	var model = Alloy.Collections.feed.get(link);

	// trigger the select event on this controller, passing the model with it
	// the index controller has an event listener for this event
	Alloy.Globals.Navigator.open("detail",model);
}
$.search.addEventListener('cancel', function(){
    $.search.blur();
});

//Menu
var thisWin=$.lwin;
var main=$.listView;

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
		actionBarHelper.setIcon('/images/ic_menu_light.png');
		actionBarHelper.setTitle('Map');
		actionBarHelper.displayHomeAsUp(false);
	}
	
	if (OS_ANDROID) {
		var actionBarExtra = require('com.alcoapps.actionbarextras');
		actionBarExtra.title = "Map";
		actionBarExtra.setHomeAsUpIcon("/images/ic_menu_light.png");
		actionBarHelper.displayHomeAsUp(true);
	}
});

function filter(){
	a = Alloy.Collections.feed;
	Alloy.Globals.Navigator.open("filter",a);
}

/**
 *Open mapview 
 */
function openMapview() {
	Alloy.Globals.Navigator.open('map', {});
}

/**
 *Open sort view 
 */
function openSortView() {
	Alloy.Globals.Navigator.open('sort', {});
}

function openMenu(e){
	$.drawermenu.showhidemenu();
}