var moment = require('alloy/moment');
var paceView = false;
var dateView = false;
var distanceView = false;

var monthNames = ["Jan ", "Feb ", "Mar ", "Apr ", "May ", "Jun ","Jul ", "Aug ", "Sep ", "Oct ", "Nov ", "Dec "];
(function constructor(args) {
	hideVertical($.paceView);
	hideVertical($.dateView);
	hideVertical($.distanceView);
	initiate();
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
    Alloy.Globals.startDateTime.setUTCHours(e.value,0,0,0);
    $.dateLabel.text = monthNames[$.startDate.value.getMonth()] + $.startDate.value.getDate() + " - " + monthNames[$.endDate.value.getMonth()] + $.endDate.value.getDate() + " "
						+ $.startTimeSlider.value + ":00 - " + $.endTimeSlider.value + ":00"; 

});

$.endTimeSlider.addEventListener('touchend', function(e){
    this.value = Math.round(e.value);
    $.endTimeLabel.text = this.value;
   
});

$.endTimeSlider.addEventListener('change', function(e) {
    $.endTimeLabel.text = Math.round(e.value);
    Alloy.Globals.endDateTime.setUTCHours($.endTimeSlider.value,0,0,0);
    $.dateLabel.text = monthNames[$.startDate.value.getMonth()] + $.startDate.value.getDate() + " - " + monthNames[$.endDate.value.getMonth()] + $.endDate.value.getDate() + " "
						+ $.startTimeSlider.value + ":00 - " + $.endTimeSlider.value + ":00"; 
});

function addPace(pace){
	Alloy.Globals.pace.push(pace);
	$.paceLabel.text = Alloy.Globals.pace.toString();
}
function removePace(pace){
	Alloy.Globals.pace.splice(Alloy.Globals.pace.indexOf(pace),1);
	$.paceLabel.text = Alloy.Globals.pace.toString();
}
function addDistance(min,max){
	Alloy.Globals.distance = [min,max];
	$.distanceLabel.text = min + " - " + max + " miles";
}
function ten(){
	addDistance(10,20);
}
function twenty(){
	addDistance(20,30);
}
function thirty(){
	addDistance(30,40);
}
function fourty(){
	addDistance(40,50);
}
function fifty(){
	addDistance(50,60);
}
function sixty(){
	addDistance(60,70);
}
function seventy(){
	addDistance(70,80);
}
function eighty(){
	addDistance(80,90);
}
function ninety(){
	addDistance(90,200);
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
		$.paceFold.image = "/Filter opened.png";
	} else{
		$.paceFold.image = "/Filter open.png";
	}
}
function hideDateView(){
	hideView($.dateView,dateView);
	dateView = !dateView;
	if (dateView){
		$.dateFold.backgroundImage = "/Filter opened.png";
		$.startDate.minDate = new Date();
		$.endDate.minDate = $.startDate.minDate;
		$.startDate.value = Alloy.Globals.startDateTime;
		$.endDate.value = Alloy.Globals.endDateTime;
		$.startTimeSlider.value = Alloy.Globals.startDateTime.getUTCHours();
		$.endTimeSlider.value = Alloy.Globals.endDateTime.getUTCHours();
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
function initiate(){
	$.paceLabel.text = Alloy.Globals.pace.toString();
	$.dateLabel.text = monthNames[Alloy.Globals.startDateTime.getMonth()] + Alloy.Globals.startDateTime.getDate() + " - " + monthNames[Alloy.Globals.endDateTime.getMonth()] + Alloy.Globals.endDateTime.getDate() + " "
						+ Alloy.Globals.startDateTime.getUTCHours() + ":00 - " + Alloy.Globals.endDateTime.getUTCHours() + ":00"; 
	$.distanceLabel.text = Alloy.Globals.distance[0] + " - " + Alloy.Globals.distance[1] + " miles";
}
function resetFilter(){
Alloy.Globals.startDateTime = new Date();
Alloy.Globals.endDateTime = new Date();
Alloy.Globals.startDateTime.setUTCHours(0);
Alloy.Globals.endDateTime.setMonth(Alloy.Globals.startDateTime.getMonth() + 6);
Alloy.Globals.pace = [];
Alloy.Globals.distance = [0,100];
initiate();
}
function applyFilter(){
	Alloy.Collections.feed.fetch({
		url: "https://www.cascade.org/DailyRides/rss.xml"
		});
	$.fwin.close();
}