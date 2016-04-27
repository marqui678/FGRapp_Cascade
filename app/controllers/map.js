// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

//Keep the following code, might be useful for search
/*
var currentUser = args.currentUser;

var userLocation = currentUser.location.street + " " + currentUser.location.city 
+ " " + currentUser.location.state + " " + currentUser.location.zip;*/

/* get longitude and latitude by address
	Ti.Geolocation.forwardGeocoder(userLocation, function(_resp){
		if (_resp.success) {
			console.log("coords: " + _resp.latitude + " " + _resp.lontitude);
			
			_callback(_resp);
		}
		else {
			console.log("ERROR: " + JSON.stringify(_resp));
			alert("ERROR");
			_callback(null);
		}
	});*/

var regionCenter = {latitude: 47.6466, longitude: -122.335};
var rideData = Alloy.Collections.feed.models;

function centeredByCurrentLocation() {
	if (Ti.Geolocation.locationServicesEnabled === false) {
		alert("our device has geo turned off - turn it on.");
	}
	
	Titanium.Geolocation.getCurrentPosition(function(e) {
	    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
	    if (e.error)
	    {
	        alert('Current location not found. Use default location');	       
	    }
	    else {
	    	//Set current location as center
	        regionCenter.latitude = e.coords.latitude;
	        regionCenter.longitude = e.coords.longitude;
        }
        createAnnotationsForMap(rideData);
	});
};

//Show map with current location pin in the center
centeredByCurrentLocation();

function createAnnotationsForMap(models){
	if (models == null || models.length < 1) {
		return;
	}
	//Make annotation
	var annotations = createAnnotationsWithModels(models);
	
	//Set map region to zoom into point

	$.mapview.setRegion({
		latitude: regionCenter.latitude,
		longitude: regionCenter.longitude,
		latitudeDelta: 0.040,
		longitudeDelta: 0.040
	});

	
	$.mapview.setUserLocation = true;
	
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
    		//pincolor:Ti.Map.ANNOTATION_GREEN,
    		 // image:'pin.png',
    		myid:model.get("link")
		});
		annotations.push(annotation);
	}

	return annotations;
}

var lastClickedAnnotationId = null;
/**
 *Show callout info at the bottom 
 * @param {Object} evt
 */
function report(evt) {
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
    //Deselect
    if (evt.clicksource === null || (evt.clicksource === "pin" && evt.annotation.myid === lastClickedAnnotationId)) {
    	$.rideInfoCallout.visible = false;
    } 
    //Select
    else {
    	//Need to change pin for selected annotation
    	evt.annotation.image = 'pin.png';
    // evt.annotation.setImage('pin.png');
    // $.mapview.addAnnotation(evt.annotation);
    
    	//Set info in callout box    	
    	setCalloutInfo(evt.annotation.myid);
    	
    	//Show callout box
    	$.rideInfoCallout.visible = true;
    }
    //Update lastClickedAnnotationId which is link of selected model
    lastClickedAnnotationId = evt.clicksource === null ? null: evt.annotation.myid;
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

function searchLocation(e) {
	alert("Search button clicked.");
}

function showDetail(e) {
	var selectedModel = Alloy.Collections.feed.get(lastClickedAnnotationId);
	Alloy.Globals.Navigator.open("detail", selectedModel);
}
