/**
 * self-executing function to organize otherwise inline constructor code
 * @param  {Object} args arguments passed to the controller
 */
Alloy.Globals.pace = [];
Alloy.Globals.paceID = [];
Alloy.Globals.day = [];
Alloy.Globals.dayID = [];
Alloy.Globals.time = [];
Alloy.Globals.distance = [];
Alloy.Globals.distanceID = [];

Alloy.Globals.selfPaced = false;
Alloy.Globals.easy = false;
Alloy.Globals.brisk = false;
Alloy.Globals.leisurely = false;
Alloy.Globals.steady = false;
Alloy.Globals.vigorous = false;
Alloy.Globals.moderate = false;
Alloy.Globals.strenuous = false;
Alloy.Globals.superStrenuous = false;

Alloy.Globals.sunday = false;
Alloy.Globals.monday = false;
Alloy.Globals.tuesday = false;
Alloy.Globals.wednesday = false;
Alloy.Globals.thursday = false;
Alloy.Globals.friday = false;
Alloy.Globals.saturday = false;

Alloy.Globals.zero = false;
Alloy.Globals.ten = false;
Alloy.Globals.twenty = false;
Alloy.Globals.thirty = false;
Alloy.Globals.fourty = false;
Alloy.Globals.fifty = false;
Alloy.Globals.sixty = false;
Alloy.Globals.seventy = false;
Alloy.Globals.eighty = false;
Alloy.Globals.ninety = false;
/**
 * Global Navigation Handler
 */
Alloy.Globals.Navigator = {

	/**
	 * Handle to the Navigation Controller
	 */
	navGroup: $.nav,

	open: function(controller, payload){
		var win = Alloy.createController(controller, payload || {}).getView();

		if(OS_IOS){
			$.navWin.openWindow(win);
		}
		else if(OS_MOBILEWEB){
			$.navWin.open(win);
		}
		else {

			// added this property to the payload to know if the window is a child
			if (payload.displayHomeAsUp){

				win.addEventListener('open',function(evt){
					var activity=win.activity;
					activity.actionBar.displayHomeAsUp=payload.displayHomeAsUp;
					activity.actionBar.onHomeIconItemSelected=function(){
						evt.source.close();
					};
				});
			}
			win.open();
		}
	}
};

(function constructor(args) {
	// use strict mode for this function scope
	'use strict';
	
	if (OS_IOS) {

		// open SplitWindow for iPad
		if (Alloy.isTablet) {
			$.splitWin.open();

			// open NavigationWindow for iPhone
		} else {
			$.navWin.open();
		}

		// open NavigationGroup's wrapper Window for MobileWeb
	} else if (OS_MOBILEWEB) {
		$.win.open();

		// open master controller's Window view for Android (and other platforms)
	} else {
		$.listCtrl.getView().open();
	}

	// execute constructor with optional arguments passed to controller
})(arguments[0] || {});



