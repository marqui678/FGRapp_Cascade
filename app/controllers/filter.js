
var paceData = [];
var paceView = false;
var dateView = false;
hideVertical($.paceView);
hideVertical($.dateView);
var selfPaced = false;
var easy = false;
var brisk = false;
var leisurely = false;
var steady = false;
var vigorous = false;
var moderate = false;
var strenuous = false;
var superStrenuous = false;
$.paceLabel.text = "";
function selfPaced(){
	if (!selfPaced){
		Alloy.Globals.pace.push("self paced");
		$.paceLabel.text = $.paceLabel.text + "self paced";
	} else{
		Alloy.Globals.pace.splice(Alloy.Globals.pace.indexOf("self paced"),1);
		$.paceLabel.text = $.paceLabel.text.replace("self paced","");
	}
	selfPaced = !selfPaced;
}
function easy(){
	Alloy.Globals.pace.push("easy");
	$.paceLabel.text = $.paceLabel.text + "easy";
}
function brisk(){
	Alloy.Globals.pace.push("brisk");
	$.paceLabel.text = $.paceLabel.text + "brisk";
}
function leisurely(){
	Alloy.Globals.pace.push("leisurely");
}
function steady(){
	Alloy.Globals.pace.push("steady");
}
function moderate(){
	Alloy.Globals.pace.push("moderate");
}
function vigorous(){
	Alloy.Globals.pace.push("vigorous");
}
function strenuous(){
	Alloy.Globals.pace.push("strenuous");
}
function superStrenuous(){
	Alloy.Globals.pace.push("super strenuous");
}
function testFilter(){
	Alloy.Globals.Navigator.open("list",Alloy.Globals.pace);
}
function hidePaceView(){
	if (paceView){
		hideVertical($.paceView);
	} else{
		showVertical($.paceView);
	}
	paceView = !paceView;
}
function hideDateView(){
	if (dateView){
		hideVertical($.dateView);
	} else{
		showVertical($.dateView);
	}
	dateView = !dateView;
}
function hideVertical(view) {
    //store previous values
    view.__originalValues = {
        top: view.top,
        bottom: view.bottom,
        height: view.height
    };
	view.width = view.height;
    //set new values to simulate invisibility
    view.top = 0;
    view.bottom = 0;
    view.height = 0;
    view.hide();
}

/**
 * shows a view nested into a layout=vertical container
 * restore from hideVertical()
 * @param  {Ti.View} view the view to be shown
 */
function showVertical(view) {
    //restore previous values
    view = _.extend(view, view.__originalValues || {});
	view.height = view.width;
    view.show();
}