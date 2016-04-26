
var paceData = [];
var paceView = false;
var dateView = false;
var distanceView = false;
hideVertical($.paceView);
hideVertical($.dateView);
hideVertical($.distanceView);
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
$.dateLabel.text = "";
$.distanceLabel.text = "";
$.startDate.minDate = new Date();
$.startDate.maxDate = new Date(2020,3,3);
$.endDate.maxDate = new Date(2020,3,3);
$.startDate.value = $.startDate.minDate;
$.endDate.value = $.endDate.maxDate;
$.startDate.addEventListener('change',function(e){
	console.log(e.value);
	$.endDate.minDate = e.value;
	
});
$.endDate.addEventListener('change',function(e){
	console.log($.startDate.value.getMonth());
	//$.dateLabel.text = $.startTimeSlider.value.getMonth() + $.startTimeSlider.value.getDay() + " - " + $.endTimeSlider.value.getMonth() + $.endTimeSlider.value.getDay(); 
});

$.startTimeSlider.addEventListener('touchend', function(e){
    this.value = Math.round(e.value);
    $.startTimeLabel.text = this.value;
});

$.startTimeSlider.addEventListener('change', function(e) {
    $.startTimeLabel.text = Math.round(e.value);
    $.endTimeSlider.min = $.startTimeSlider.value;
    $.endTimeSlider.value = $.endTimeSlider.min;
});

$.endTimeSlider.addEventListener('touchend', function(e){
    this.value = Math.round(e.value);
    $.endTimeLabel.text = this.value;
});

$.endTimeSlider.addEventListener('change', function(e) {
    $.endTimeLabel.text = Math.round(e.value);
   // $.dateLabel.text = $.startTimeSlider.value.getMonth() + $.startTimeSlider.value.getDay() + " - " + $.endTimeSlider.value.getMonth() + $.endTimeSlider.value.getDay() + " "
    					//+ $.startTimeSlider.value + ":00" + $endTimeSlider.value + ":00";
});
$.sDistanceSlider.addEventListener('touchend', function(e){
    this.value = Math.round(e.value);
    $.sDistanceLabel.text = this.value;
});

$.sDistanceSlider.addEventListener('change', function(e) {
    $.sDistanceLabel.text = Math.round(e.value);
    $.eDistanceSlider.min = e.value;
    $.eDistanceSlider.value = $.eDistanceSlider.min;
});

$.eDistanceSlider.addEventListener('touchend', function(e){
    this.value = Math.round(e.value);
    $.eDistanceLabel.text = this.value;
});

$.eDistanceSlider.addEventListener('change', function(e) {
    $.eDistanceLabel.text = Math.round(e.value);
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
}
function hideDateView(){
	hideView($.dateView,dateView);
	dateView = !dateView;
}
function hideDistanceView(){
	hideView($.distanceView,distanceView);
	distanceView = !distanceView;
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
function testFilter(){
	Alloy.Globals.startDateTime = $.startDate.value;
	Alloy.Globals.endDateTime = $.endDate.value;
	Alloy.Globals.startDateTime.setHours($.startTimeSlider.value - 7,0,0);
	console.log(Alloy.Globals.startDateTime);
	Alloy.Globals.endDateTime.setHours($.endTimeSlider.value - 7,0,0);
	console.log(Alloy.Globals.endDateTime);
	Alloy.Globals.sDistance = $.sDistanceSlider.value;
	Alloy.Globals.eDistance = $.eDistanceSlider.value;
	Alloy.Collections.feed.fetch({
		url: "https://www.cascade.org/DailyRides/rss.xml"
		});
	$.fwin.close();
}