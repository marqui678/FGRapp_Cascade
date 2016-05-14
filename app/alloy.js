// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};


// Loads the map module, which can be referenced by Alloy.Globals.Map
Alloy.Globals.Map = require('ti.map');

Alloy.Globals.defaultLocation = {latitude: 47.6466, longitude: -122.335}; 
Alloy.Globals.regionCenter = {latitude: 47.6466, longitude: -122.335}; 
Alloy.Globals.isSearchLoc = false;

//Use distanceToLocation as default sorting
Alloy.Globals.selectedSort = {id: 1, item: {	    
    title : {text: "Date"},
    isAscDir: true,
    direction : {text: "sooner to later", dir: "ASC"},
    field: "fgrrss:startDateTime"    
}};

Number.prototype.toDeg = function() {
    return this * 180 / Math.PI;
};

Number.prototype.toRad = function() {
    return this * Math.PI / 180;
};

/**
 *For each model, set value for field distanceToLoc based on given target location
 */
Alloy.Globals.setDistanceToLocation = function(models, targetLoc) {
	for (var i = 0; i < models.length; i++) {
		var model = models[i];
		model.setDistanceToLoc(targetLoc);
	}
};

// added during app creation. this will automatically login to
// ACS for your application and then fire an event (see below)
// when connected or errored. if you do not use ACS in your
// application as a client, you should remove this block
(function(){
var ACS = require('ti.cloud'),
    env = Ti.App.deployType.toLowerCase() === 'production' ? 'production' : 'development',
    username = Ti.App.Properties.getString('acs-username-'+env),
    password = Ti.App.Properties.getString('acs-password-'+env);

// if not configured, just return
if (!env || !username || !password) { return; }
/**
 * Appcelerator Cloud (ACS) Admin User Login Logic
 *
 * fires login.success with the user as argument on success
 * fires login.failed with the result as argument on error
 */
ACS.Users.login({
	login:username,
	password:password,
}, function(result){
	if (env==='development') {
		Ti.API.info('ACS Login Results for environment `'+env+'`:');
		Ti.API.info(result);
	}
	if (result && result.success && result.users && result.users.length){
		Ti.App.fireEvent('login.success',result.users[0],env);
	} else {
		Ti.App.fireEvent('login.failed',result,env);
	}
});

})();

