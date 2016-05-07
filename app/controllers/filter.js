$.fwin.leftNavButton = Ti.UI.createView();
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
	Alloy.Globals.startDateTime[0] = e.value;
	Alloy.Globals.startDateTime[0].setUTCHours($.startTimeSlider.value,0,0,0);
	$.dateLabel.text = monthNames[$.startDate.value.getUTCMonth()] + $.startDate.value.getUTCDate() + " - " + monthNames[$.endDate.value.getUTCMonth()] + $.endDate.value.getUTCDate() + " "
						+ $.startTimeSlider.value + ":00 - " + $.endTimeSlider.value + ":00"; 
});
$.endDate.addEventListener('change',function(e){
	Alloy.Globals.startDateTime[1] = e.value;
	Alloy.Globals.startDateTime[1].setUTCHours($.endTimeSlider.value,0,0,0);
	$.dateLabel.text = monthNames[$.startDate.value.getUTCMonth()] + $.startDate.value.getUTCDate() + " - " + monthNames[$.endDate.value.getUTCMonth()] + $.endDate.value.getUTCDate() + " "
						+ $.startTimeSlider.value + ":00 - " + $.endTimeSlider.value + ":00"; 
});

$.startTimeSlider.addEventListener('touchend', function(e){
    this.value = Math.round(e.value);
    $.startTimeLabel.text = this.value;
});

$.startTimeSlider.addEventListener('change', function(e) {
    $.startTimeLabel.text = Math.round(e.value);
    $.endTimeSlider.min= e.value;
    Alloy.Globals.startDateTime[0].setUTCHours(e.value,0,0,0);
    $.dateLabel.text = monthNames[$.startDate.value.getUTCMonth()] + $.startDate.value.getUTCDate() + " - " + monthNames[$.endDate.value.getUTCMonth()] + $.endDate.value.getUTCDate() + " "
						+ $.startTimeSlider.value + ":00 - " + $.endTimeSlider.value + ":00"; 
});

$.endTimeSlider.addEventListener('touchend', function(e){
    this.value = Math.round(e.value);
    $.endTimeLabel.text = this.value;
});

$.endTimeSlider.addEventListener('change', function(e) {
    $.endTimeLabel.text = Math.round(e.value);
    Alloy.Globals.startDateTime[1].setUTCHours(e.value,0,0,0);
    $.dateLabel.text = monthNames[$.startDate.value.getUTCMonth()] + $.startDate.value.getUTCDate() + " - " + monthNames[$.endDate.value.getUTCMonth()] + $.endDate.value.getUTCDate() + " "
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
	var distance = [min,max];
	Alloy.Globals.distance.push(distance);
	string = min + " - " + max + " miles ";
	$.distanceLabel.text = $.distanceLabel.text + string;
}
function removeDistance(min,max){
	for (var j=0; j<Alloy.Globals.distance.length;j++){
		if (Alloy.Globals.distance[j][0] == min){
			Alloy.Globals.distance.splice(j,1);
		}
	}
	$.distanceLabel.text = "";
	if (Alloy.Globals.distance.length != 0){
		for (var i=0; i<Alloy.Globals.distance.length; i++){
			string = Alloy.Globals.distance[i][0] + " - " + Alloy.Globals.distance[i][1] + " miles ";
			$.distanceLabel.text = $.distanceLabel.text + string;
		}
	}
}
function ten(){
	if (!Alloy.Globals.ten){
		addDistance(10,20);
	} else{
		removeDistance(10,20);
	}
	Alloy.Globals.ten = !Alloy.Globals.ten;
}
function twenty(){
	if (!Alloy.Globals.twenty){
		addDistance(20,30);
	} else{
		removeDistance(20,30);
	}
	Alloy.Globals.twenty = !Alloy.Globals.twenty;
}
function thirty(){
	if (!Alloy.Globals.thirty){
		addDistance(30,40);
	} else{
		removeDistance(30,40);
	}
	Alloy.Globals.thirty = !Alloy.Globals.thirty;
}
function fourty(){
	if (!Alloy.Globals.fourty){
		addDistance(40,50);
	} else{
		removeDistance(40,50);
	}
	Alloy.Globals.fourty = !Alloy.Globals.fourty;
}
function fifty(){
	if (!Alloy.Globals.fifty){
		addDistance(50,60);
	} else{
		removeDistance(50,60);
	}
	Alloy.Globals.fifty = !Alloy.Globals.fifty;
}
function sixty(){
	if (!Alloy.Globals.sixty){
		addDistance(60,70);
	} else{
		removeDistance(60,70);
	}
	Alloy.Globals.sixty = !Alloy.Globals.sixty;
}
function seventy(){
	if (!Alloy.Globals.seventy){
		addDistance(70,80);
	} else{
		removeDistance(70,80);
	}
	Alloy.Globals.seventy = !Alloy.Globals.seventy;
}
function eighty(){
	if (!Alloy.Globals.eighty){
		addDistance(80,90);
	} else{
		removeDistance(80,90);
	}
	Alloy.Globals.eighty = !Alloy.Globals.eighty;
}
function ninety(){
	if (!Alloy.Globals.ninety){
		addDistance(90,200);
	} else{
		removeDistance(90,200);
	}
	Alloy.Globals.ninety = !Alloy.Globals.ninety;
}
function selfPaced(){
	if (!Alloy.Globals.selfPaced){
		addPace("Self Paced");
	} else{
		removePace("Self Paced");
	}
	Alloy.Globals.selfPaced = !Alloy.Globals.selfPaced;
}
function easy(){
	if (!Alloy.Globals.easy){
		addPace("Easy");
	} else{
		removePace("Easy");
	}
	Alloy.Globals.easy = !Alloy.Globals.easy;
}
function brisk(){
	if (!Alloy.Globals.brisk){
		addPace("Brisk");
	} else{
		removePace("Brisk");
	}
	Alloy.Globals.brisk = !Alloy.Globals.brisk;
}
function leisurely(){
	if (!Alloy.Globals.leisurely){
		addPace("Leisurely");
	} else{
		removePace("Leisurely");
	}
	Alloy.Globals.leisurely = !Alloy.Globals.leisurely;
}
function steady(){
	if (!Alloy.Globals.steady){
		addPace("Steady");
	} else{
		removePace("Steady");
	}
	Alloy.Globals.steady = !Alloy.Globals.steady;
}
function moderate(){
	if (!Alloy.Globals.moderate){
		addPace("Moderate");
	} else{
		removePace("Moderate");
	}
	Alloy.Globals.moderate = !Alloy.Globals.moderate;
}
function vigorous(){
	if (!Alloy.Globals.vigorous){
		addPace("Vigorous");
	} else{
		removePace("Vigorous");
	}
	Alloy.Globals.vigorous = !Alloy.Globals.vigorous;
}
function strenuous(){
	if (!Alloy.Globals.strenuous){
		addPace("Strenuous");
	} else{
		removePace("Strenuous");
	}
	Alloy.Globals.strenuous = !Alloy.Globals.strenuous;
}
function superStrenuous(){
	if (!Alloy.Globals.superStrenuous){
		addPace("Super Strenuous");
	} else{
		removePace("Super Strenuous");
	}
	Alloy.Globals.superStrenuous = !Alloy.Globals.superStrenuous;
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
		$.startTimeSlider.min = 0;
		$.startTimeSlider.max = 24;
		$.endTimeSlider.min = 0;
		$.endTimeSlider.max = 24;
		if (Alloy.Globals.startDateTime.length == 0){
			$.startDate.value = $.startDate.minDate;
			$.endDate.value = $.endDate.minDate;
			Alloy.Globals.startDateTime[0] = $.startDate.value;
			Alloy.Globals.startDateTime[1] = $.endDate.value;
			$.startTimeSlider.value = 0;
			$.endTimeSlider.value = 0;
			Alloy.Globals.startDateTime[0].setUTCHours(0,0,0,0);
			Alloy.Globals.startDateTime[1].setUTCHours(0,0,0,0);
		} else{
			$.startDate.value = Alloy.Globals.startDateTime[0];
			$.endDate.value = Alloy.Globals.startDateTime[1];
			$.startTimeSlider.value = Alloy.Globals.startDateTime[0].getUTCHours();
			$.endTimeSlider.value = Alloy.Globals.startDateTime[1].getUTCHours();
		}
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
	if (Alloy.Globals.pace.length == 0){
		$.paceLabel.text = "";
	} else{
		$.paceLabel.text = Alloy.Globals.pace.toString();
	}
	if (Alloy.Globals.startDateTime.length == 0){
		$.dateLabel.text = "";
	} else{
		$.dateLabel.text = monthNames[Alloy.Globals.startDateTime[0].getUTCMonth()] + Alloy.Globals.startDateTime[0].getUTCDate() + " - " + monthNames[Alloy.Globals.startDateTime[1].getUTCMonth()] + Alloy.Globals.startDateTime[1].getUTCDate() + " "
						+ Alloy.Globals.startDateTime[0].getUTCHours() + ":00 - " + Alloy.Globals.startDateTime[1].getUTCHours() + ":00"; 
	}
	$.distanceLabel.text = "";
	if (Alloy.Globals.distance.length != 0){
		for (var i=0; i<Alloy.Globals.distance.length; i++){
			string = Alloy.Globals.distance[i][0] + " - " + Alloy.Globals.distance[i][1] + " miles ";
			$.distanceLabel.text = $.distanceLabel.text + string;
		}
	}
}
function resetFilter(){
	Alloy.Globals.startDateTime = [];
	Alloy.Globals.pace = [];
	Alloy.Globals.distance = [];
	initiate();
}
function cancelFilter(){
	$.fwin.close();
}
function afterFetch(col, res) {
	if (Alloy.Collections.feed.models.length == 0){
		var dialog = Ti.UI.createAlertDialog({
		    message: 'No Result',
		    ok: 'OK',
  		});
  		dialog.addEventListener('click', function(e){
      		Alloy.Globals.Navigator.open("filter",$.fwin);
      		
  		});
  		dialog.show();
	}	
}
function applyFilter(){
		Alloy.Collections.feed.fetch({
		url: "https://www.cascade.org/DailyRides/rss.xml",
		success: afterFetch,
		error: afterFetch
		});
		
		$.fwin.close();
		
}