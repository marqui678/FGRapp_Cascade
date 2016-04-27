var paceView = false;
var dateView = false;
var distanceView = false;
var selfPaced = false;
var easy = false;
var brisk = false;
var leisurely = false;
var steady = false;
var vigorous = false;
var moderate = false;
var strenuous = false;
var superStrenuous = false;
var monthNames = ["Jan ", "Feb ", "Mar ", "Apr ", "May ", "Jun ","Jul ", "Aug ", "Sep ", "Oct ", "Nov ", "Dec "];
(function constructor(args) {
	$.startDate.value = new Date();
	$.endDate.value = $.startDate.value;
	$.startTimeSlider.value = 0;
	$.endTimeSlider.value = 0;
	hideVertical($.paceView);
	hideVertical($.dateView);
	hideVertical($.distanceView);
	clearFilter();
})(arguments[0] || {});
$.startDate.addEventListener('change',function(e){
	$.endDate.minDate = e.value;
	Alloy.Globals.startDateTime = e.value;
	$.dateLabel.text = monthNames[$.startDate.value.getMonth()] + $.startDate.value.getDate() + " - " + monthNames[$.endDate.value.getMonth()] + $.endDate.value.getDate(); 
});
$.endDate.addEventListener('change',function(e){
	Alloy.Globals.endDateTime = e.value;
	$.dateLabel.text = monthNames[$.startDate.value.getMonth()] + $.startDate.value.getDate() + " - " + monthNames[$.endDate.value.getMonth()] + $.endDate.value.getDate(); 
});

$.startTimeSlider.addEventListener('touchend', function(e){
    this.value = Math.round(e.value);
    $.startTimeLabel.text = this.value;
});

$.startTimeSlider.addEventListener('change', function(e) {
    $.startTimeLabel.text = Math.round(e.value);
    $.endTimeSlider.min= e.value;
    $.endTimeSlider.value = $.endTimeSlider.min;
    Alloy.Globals.startDateTime.setHours(e.value - 9,0,0);
    $.dateLabel.text = monthNames[$.startDate.value.getMonth()] + $.startDate.value.getDate() + " - " + monthNames[$.endDate.value.getMonth()] + $.endDate.value.getDate() + " "
						+ $.startTimeSlider.value + ":00 - " + $.endTimeSlider.value + ":00"; 

});

$.endTimeSlider.addEventListener('touchend', function(e){
    this.value = Math.round(e.value);
    $.endTimeLabel.text = this.value;
   
});

$.endTimeSlider.addEventListener('change', function(e) {
    $.endTimeLabel.text = Math.round(e.value);
    Alloy.Globals.endDateTime.setHours(e.value - 9,0,0);
    $.dateLabel.text = monthNames[$.startDate.value.getMonth()] + $.startDate.value.getDate() + " - " + monthNames[$.endDate.value.getMonth()] + $.endDate.value.getDate() + " "
						+ $.startTimeSlider.value + ":00 - " + $.endTimeSlider.value + ":00"; 
});
$.sDistanceSlider.addEventListener('touchend', function(e){
    this.value = Math.round(e.value);
    $.sDistanceLabel.text = this.value;
});

$.sDistanceSlider.addEventListener('change', function(e) {
    $.sDistanceLabel.text = Math.round(e.value);
    $.eDistanceSlider.min = e.value;
    Alloy.Globals.sDistance = e.value;
});

$.eDistanceSlider.addEventListener('touchend', function(e){
    this.value = Math.round(e.value);
    $.eDistanceLabel.text = this.value;
});

$.eDistanceSlider.addEventListener('change', function(e) {
    $.eDistanceLabel.text = Math.round(e.value);
    Alloy.Globals.eDistance = e.value;
    $.distanceLabel.text = $.sDistanceSlider.value + " - " + e.value + " miles";
});
function addPace(pace){
	Alloy.Globals.pace.push(pace);
		$.paceLabel.text = $.paceLabel.text + " " + pace;
}
function removePace(pace){
	Alloy.Globals.pace.splice(Alloy.Globals.pace.indexOf(pace),1);
	$.paceLabel.text = $.paceLabel.text.replace(" " + pace,"");
}
function selfPaced(){
	if (!selfPaced){
		addPace("Self Paced");
	} else{
		removePace("Self Paced");
	}
	selfPaced = !selfPaced;
}
function easy(){
	if (!easy){
		addPace("Easy");
	} else{
		removePace("Easy");
	}
	easy = !easy;
}
function brisk(){
	if (!brisk){
		addPace("Brisk");
	} else{
		removePace("Brisk");
	}
	brisk = !brisk;
}
function leisurely(){
	if (!leisurely){
		addPace("Leisurely");
	} else{
		removePace("Leisurely");
	}
	leisurely = !leisurely;
}
function steady(){
	if (!steady){
		addPace("Steady");
	} else{
		removePace("Steady");
	}
	steady = !steady;
}
function moderate(){
	if (!moderate){
		addPace("Moderate");
	} else{
		removePace("Moderate");
	}
	moderate = !moderate;
}
function vigorous(){
	if (!vigorous){
		addPace("Vigorous");
	} else{
		removePace("Vigorous");
	}
	vigorous = !vigorous;
}
function strenuous(){
	if (!strenuous){
		addPace("Strenuous");
	} else{
		removePace("Strenuous");
	}
	strenuous = !strenuous;
}
function superStrenuous(){
	if (!superStrenuous){
		addPace("Super Strenuous");
	} else{
		removePace("Super Strenuous");
	}
	superStrenuous = !superStrenuous;
}
function hidePaceView(){
	hideView($.paceView,paceView);
	paceView = !paceView;
	if (paceView){
		$.paceFold.backgroundImage = "/Filter opened.png";
	} else{
		$.paceFold.backgroundImage = "/Filter open.png";
	}
}
function hideDateView(){
	hideView($.dateView,dateView);
	dateView = !dateView;
	if (dateView){
		$.dateFold.backgroundImage = "/Filter opened.png";
	} else{
		$.dateFold.backgroundImage = "/Filter open.png";
	}
}
function hideDistanceView(){
	hideView($.distanceView,distanceView);
	distanceView = !distanceView;
	if (distanceView){
		$.distanceFold.backgroundImage = "/Filter opened.png";
	} else{
		$.distanceFold.backgroundImage = "/Filter open.png";
	}
}
function hideView(View,flag){
	if (flag){
		hideVertical(View);
	} else{
		showVertical(View);
	}
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
function showVertical(view) {
    //restore previous values
    view = _.extend(view, view.__originalValues || {});
	view.height = view.width;
    view.show();
}
function clearFilter(){
$.paceLabel.text = "";
$.dateLabel.text = "";
$.distanceLabel.text = "";
Alloy.Globals.pace = [];
Alloy.Globals.startDateTime = new Date(1980,1,1);
Alloy.Globals.endDateTime = new Date(2080,1,1);
Alloy.Globals.sDistance = 0;
Alloy.Globals.eDistance = 100;
}
function applyFilter(){
	Alloy.Collections.feed.fetch({
		url: "https://www.cascade.org/DailyRides/rss.xml"
		});
	$.fwin.close();
}