// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.searchBar.addEventListener('return', function(e) {
	searchLocation();
});

function cancelSearch(e) {
	$.searchWindow.close();
}

function searchLocation() {
	$.searchBar.blur();
	var inputLoc = $.searchBar.value;
	// get longitude and latitude by address
	Ti.Geolocation.forwardGeocoder(inputLoc, function(_resp){
		if (_resp.success) {
			//Update regionCenter
			args.regionCenter.latitude = Number(_resp.latitude);
			args.regionCenter.longitude = Number(_resp.longitude);
			args.regionCenter.displayAddress = _resp.displayAddress;

			args.prevWindow.fireEvent('loc_updated', {isCurrentLoc: false});
			$.searchWindow.close();			
		}
		else {
			alert("Unable to geocode the address, please input a valid address.");			
		}
	});
}

function useCurrentLoc() {
	$.searchBar.blur();
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
    	args.prevWindow.fireEvent('loc_updated', {isCurrentLoc: true});
		$.searchWindow.close();
     });
}
