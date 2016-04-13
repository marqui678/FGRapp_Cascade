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
	        alert('Current location not found.');
	        return;
	    }
	    else 
	    {
	        latitude = e.coords.latitude;
	        longitude = e.coords.longitude;
	        regionCenter.latitude = latitude;
	        regionCenter.longitude = longitude;
	        createAnnotationsForMap(rideData);
	    }
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
	    	subtitle: model.get("fgrrss:pace"),
    		pincolor:Ti.Map.ANNOTATION_GREEN,
    		// image:'pin.png',
    		myid:i
		});
		annotations.push(annotation);
	}

	return annotations;
}




function report(evt) {
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
    var offset = evt.annotation.getCenterOffset();
    
}

function searchLocation(e) {
	alert("Search button clicked.");
}
