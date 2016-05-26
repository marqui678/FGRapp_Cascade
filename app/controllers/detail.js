/**
 * self-executing function to organize otherwise inline constructor code
 * @param  {Object} args arguments passed to the controller
 */
var model = arguments[0] || {};
// require the built-in MomentJS library
var moment = require('alloy/moment');
$.startDateTime.text = moment(model.get('startDateTime'),moment.ISO_8601).format('LLLL').toString();
$.description.text = '                       '+model.get('description').replace(/<\/?[^>]+(>|$)/g, "").toString();

$.leader.text = model.get('fgrrss:rideLeader').toString();
$.distance1.text = model.get('distance1');
$.distance2.text = model.get('distance2');
$.title = model.get('title').toString();
$.paceNum.text = model.get('paceNumber');
$.pace.text = model.get('pace');

var address = model.get('fgrrss:startAddress').toString();
//$.address.text = model.get('fgrrss:startAddress').toString();
$.address1.text = address.split('\n')[0];
$.address2.text = address.substring(getPosition(address, '\n',1) + 1);

var contact = unescape(model.get('fgrrss:contact'));

function getPosition(str, m, i) {
   return str.split(m, i).join(m).length;
}

var contactStartPosition = getPosition(contact, '>',6) + 1;
var contactEndPosition = getPosition(contact, '<',7);
var emailStartPositioin = getPosition(contact, '>',12) + 1;
var emailEndPosition = getPosition(contact, '<',13);
var phoneStartPosition = getPosition(contact, '>',18) + 1;
var phoneEndPosition = getPosition(contact, '<',19);


var string1 = contact.substring(emailStartPositioin, emailEndPosition);
var string2 = contact.substring(phoneStartPosition, phoneEndPosition);
if (string1.indexOf('@') >= 0){
	$.email.text = string1;
	$.phone.text = string2;
}else{
	$.email.text = string2;
	$.phone.text = string1;
}

var Map = OS_MOBILEWEB ? Ti.Map : require('ti.map');
/**
 * Set the Map Region for the Map Module so that it is at the right zoom level
 * DOCS: http://docs.appcelerator.com/platform/latest/#!/api/Modules.Map
 */
var latitude = model.get('latitude');
var longitude = model.get('longitude');
	$.mapview.setRegion({
		latitude: latitude, 
		longitude: longitude,
		latitudeDelta:0.1,
		longitudeDelta:0.1,
		zoom:1,
		tilt:10
	});

/**
 * Create the Map Annotation to the latitude and longitude assigned to the user.
 */

var mapAnnotation = Map.createAnnotation({
    latitude: latitude,
    longitude: longitude,
    animate:true,
    image:'/images/ic_place_green.png'
});

var customAnnotationView = Ti.UI.createView({
    backgroundImage: '/images/ic_place_green.png',
    height: "40dp",
    width: "28dp"
});

if (OS_ANDROID) {
			mapAnnotation.customView = customAnnotationView;
}
/**
 * Add the Map Annotation to the MapView
 */
$.mapview.addAnnotation(mapAnnotation);


(function constructor(args) {

	// use strict mode for this function scope
	'use strict';

	// model passed to the controller
	var model = args.model;

	// set the Window title and WebView URL
	$.win.title = model.get('title');

	// execute constructor with optional arguments passed to controller
});
/**
 * Event listener set via view to be called on when the user taps the home-icon (Android)
 */
function close() {
	'use strict';

	// close the window, showing the master window behind it
	$.window.close();
}

var link = 'https://www.cascade.org'+model.get('link');
function select(e) {
	'use strict';

	// we've stored the guid in the special itemId property of the item
	//var link = OS_MOBILEWEB ? e.row.itemId : e.itemId;

	// lookup the model
	//var model = Alloy.Collections.feed.get(link);

	// trigger the select event on this controller, passing the model with it
	// the index controller has an event listener for this event
	Alloy.Globals.Navigator.open("rideRegister",link);
}

var contactName = contact.substring(contactStartPosition, contactEndPosition);
var contactEmail = contact.substring(emailStartPositioin, emailEndPosition);
function emailContact() {

	/**
	 * Appcelerator Analytics Call
	 */
	Ti.Analytics.featureEvent(Ti.Platform.osname+".profile.emailButton.clicked");
	
	/**
	 * Account for if the user is on iOS and using a simulator - iOS Simulator no 
	 * longer supports sending email as of iOS 8
	 */
	if(OS_IOS && Ti.Platform.model === "Simulator"){
		alert("Simulator does not support sending emails. Use a device instead");
		return;
	}
	/**
	 * Create an Email Dialog
	 * DOCS: http://docs.appcelerator.com/platform/latest/#!/api/Titanium.UI.EmailDialog
	 */
	var emailDialog = Ti.UI.createEmailDialog();
	
	/**
	 * Setup the Email Dialog information, in this case just the recipients field
	 */
	emailDialog.toRecipients = [contactEmail];
	
	/**
	 * Once we have created and setup the Email Dialog, lets open the view
	 */
	emailDialog.open();
};


var contactPhone = contact.substring(phoneStartPosition, phoneEndPosition);
/**
 * Function to quickly call the contact from the Profile Screen
 */
function callContact(){
	
	/**
	 * Appcelerator Analytics Call
	 */
	Ti.Analytics.featureEvent(Ti.Platform.osname+".profile.callContactButton.clicked");
	
	/**
	 * Before we send the phone number to the platform for handling, lets first verify
	 * with the user they meant to call the contact with an Alert Dialog
	 * DOCS: http://docs.appcelerator.com/platform/latest/#!/api/Titanium.UI.AlertDialog
	 */
	var dialog = Ti.UI.createAlertDialog({
	    cancel: 0,
	    buttonNames: ['Cancel', 'Ok'],
	    message: "Are you sure you want to call the contact person " + contactName + "?"
	});
	
	/**
	 * Event Handler associated with clicking the Alert Dialog, this handles the 
	 * actual call to the platform to make the phone call
	 */
	dialog.addEventListener('click', function(e){
		 if (e.index !== e.source.cancel){
	    
	     	// IF WE ARE BUILDING FOR DEVELOPMENT PURPOSES - TRY CALLING A FAKE NUMBER
	      	if(ENV_DEV){
	      		Ti.Platform.openURL("tel:"+contactPhone);
	      	}
	      	// ELSE IF WE ARE BUILDING PRODUCTION - THEN USE THE LISTED NUMBER
	      	else if(ENV_PRODUCTION){
	      		Ti.Platform.openURL("tel:"+contactPhone);
	      	}
	    }  
	});
	
	/**
	 * After everything is setup, we show the Alert Dialog to the User
	 */
	dialog.show();
	 
};
var address = '4535 12th ave ne seattle';
function openMap(){
	if(OS_ANDROID){
		Ti.Platform.openURL('http://maps.google.com/maps?&q='+latitude+ ',' +longitude);
	}
	Ti.Platform.openURL('Maps://?&q='+latitude+ ',' +longitude);
}
