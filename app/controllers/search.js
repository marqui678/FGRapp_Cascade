// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function searchLocation() {
	$.searchField.blur();
	var inputLoc = $.searchField.value;
	// get longitude and latitude by address
	Ti.Geolocation.forwardGeocoder(inputLoc, function(_resp){
		if (_resp.success) {
			//Update regionCenter
			args.regionCenter.latitude = Number(_resp.latitude);
			args.regionCenter.longitude = Number(_resp.longitude);
			//TODO Add annotation for search location
			args.prevWindow.fireEvent('loc_updated');
			$.searchWindow.close();			
		}
		else {
			alert("Unable to geocode the address, please input a valid address.");			
		}
	});
}

function useCurrentLoc() {
	$.searchField.blur();
	//Use current location as region center
	Titanium.Geolocation.getCurrentPosition(function(e) {
	    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
	    if (e.error) {
	    	args.regionCenter.latitude = Alloy.Globals.defaultLocation.latitude;
	    	args.regionCenter.longitude = Alloy.Globals.defaultLocation.longitude;	
	    }
	    else {
	    	//Set regionCenter with current location
	    	args.regionCenter.latitude = e.coords.latitude;
	    	args.regionCenter.longitude = e.coords.longitude;	       
        }
    	args.prevWindow.fireEvent('loc_updated');
		$.searchWindow.close();
     });
}
