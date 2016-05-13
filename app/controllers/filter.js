var moment = require('alloy/moment');
var paceView = false;
var dayView = false;
var timeView = false;
var distanceView = false;
$.endTimeLabel.text = "";
(function constructor(args) {
	hideVertical($.paceView);
	hideVertical($.dayView);
	hideVertical($.timeView);
	hideVertical($.distanceView);
	initiate();
})(arguments[0] || {});

function add(id){
	id.colorTemp = id.getBackgroundColor();
	id.setBackgroundColor("#006F44");
	id.setColor("white");
}
function remove(id){
	id.setBackgroundColor(id.colorTemp);
	id.setColor("black");
}
function addPace(pace, id){
	Alloy.Globals.pace.push(pace);
	Alloy.Globals.paceID.push(id);
	$.paceLabel.text = Alloy.Globals.pace.toString();
	add($[id]);
}
function removePace(pace, id){
	Alloy.Globals.pace.splice(Alloy.Globals.pace.indexOf(pace),1);
	Alloy.Globals.paceID.splice(Alloy.Globals.paceID.indexOf(id),1);
	$.paceLabel.text = Alloy.Globals.pace.toString();
	remove($[id]);
}
function addDay(day,id){
	Alloy.Globals.day.push(day);
	Alloy.Globals.dayID.push(id);
	$.dayLabel.text = Alloy.Globals.day.toString();
	$["check"+day].image = "/images/checked.png";
}
function removeDay(day,id){
	Alloy.Globals.day.splice(Alloy.Globals.day.indexOf(day),1);
	Alloy.Globals.dayID.splice(Alloy.Globals.dayID.indexOf(id),1);
	$.dayLabel.text = Alloy.Globals.day.toString();
	$["check"+day].image = "/images/unchecked.png";
}
function addDistance(min,max,id){
	var distance = [min,max];
	Alloy.Globals.distance.push(distance);
	Alloy.Globals.distanceID.push(id);
	string = min + "-" + max + " miles ";
	if ($.distanceLabel.text == ""){
		$.distanceLabel.text = string;
	} else{
		$.distanceLabel.text = $.distanceLabel.text + ", " + string;
	}
	add($[id]);
}
function removeDistance(min,max,id){
	for (var j=0; j<Alloy.Globals.distance.length;j++){
		if (Alloy.Globals.distance[j][0] == min){
			Alloy.Globals.distance.splice(j,1);
		}
	}
	Alloy.Globals.distanceID.splice(Alloy.Globals.distanceID.indexOf(id,1));
	$.distanceLabel.text = "";
	if (Alloy.Globals.distance.length != 0){
		$.distanceLabel.text = Alloy.Globals.distance[0][0] + "-" + Alloy.Globals.distance[0][1] + " miles ";
		if (Alloy.Globals.distance.length > 1){
			for (var i=1; i<Alloy.Globals.distance.length; i++){
				string = ", " + Alloy.Globals.distance[i][0] + "-" + Alloy.Globals.distance[i][1] + " miles ";
				$.distanceLabel.text = $.distanceLabel.text + string;
			}
		}
	}
	remove($[id]);
}
function sunday(){
	if (!Alloy.Globals.sunday){
		addDay("Sunday",0);
	} else{
		removeDay("Sunday",0);
	}
	Alloy.Globals.sunday = !Alloy.Globals.sunday;
}
function monday(){
	if (!Alloy.Globals.monday){
		addDay("Monday",1);
	} else{
		removeDay("Monday",1);
	}
	Alloy.Globals.monday = !Alloy.Globals.monday;
}
function tuesday(){
	if (!Alloy.Globals.tuesday){
		addDay("Tuesday",2);
	} else{
		removeDay("Tuesday",2);
	}
	Alloy.Globals.tuesday = !Alloy.Globals.tuesday;
}
function wednesday(){
	if (!Alloy.Globals.wednesday){
		addDay("Wednesday",3);
	} else{
		removeDay("Wednesday",3);
	}
	Alloy.Globals.wednesday = !Alloy.Globals.wednesday;
}
function thursday(){
	if (!Alloy.Globals.thursday){
		addDay("Thursday",4);
	} else{
		removeDay("Thursday",4);
	}
	Alloy.Globals.thursday = !Alloy.Globals.thursday;
}
function friday(){
	if (!Alloy.Globals.friday){
		addDay("Friday",5);
	} else{
		removeDay("Friday",5);
	}
	Alloy.Globals.friday = !Alloy.Globals.friday;
}
function saturday(){
	if (!Alloy.Globals.saturday){
		addDay("Saturday",6);
	} else{
		removeDay("Saturday",6);
	}
	Alloy.Globals.saturday = !Alloy.Globals.saturday;
}
function ten(){
	if (!Alloy.Globals.ten){
		addDistance(10,20,"ten");
	} else{
		removeDistance(10,20,"ten");
	}
	Alloy.Globals.ten = !Alloy.Globals.ten;
}
function twenty(){
	if (!Alloy.Globals.twenty){
		addDistance(20,30,"twenty");
	} else{
		removeDistance(20,30,"twenty");
	}
	Alloy.Globals.twenty = !Alloy.Globals.twenty;
}
function thirty(){
	if (!Alloy.Globals.thirty){
		addDistance(30,40,"thirty");
	} else{
		removeDistance(30,40,"thirty");
	}
	Alloy.Globals.thirty = !Alloy.Globals.thirty;
}
function fourty(){
	if (!Alloy.Globals.fourty){
		addDistance(40,50,"fourty");
	} else{
		removeDistance(40,50,"fourty");
	}
	Alloy.Globals.fourty = !Alloy.Globals.fourty;
}
function fifty(){
	if (!Alloy.Globals.fifty){
		addDistance(50,60,"fifty");
	} else{
		removeDistance(50,60,"fifty");
	}
	Alloy.Globals.fifty = !Alloy.Globals.fifty;
}
function sixty(){
	if (!Alloy.Globals.sixty){
		addDistance(60,70,"sixty");
	} else{
		removeDistance(60,70,"sixty");
	}
	Alloy.Globals.sixty = !Alloy.Globals.sixty;
}
function seventy(){
	if (!Alloy.Globals.seventy){
		addDistance(70,80,"seventy");
	} else{
		removeDistance(70,80,"seventy");
	}
	Alloy.Globals.seventy = !Alloy.Globals.seventy;
}
function eighty(){
	if (!Alloy.Globals.eighty){
		addDistance(80,90,"eighty");
	} else{
		removeDistance(80,90,"eighty");
	}
	Alloy.Globals.eighty = !Alloy.Globals.eighty;
}
function ninety(){
	if (!Alloy.Globals.ninety){
		addDistance(90,200,"ninety");
	} else{
		removeDistance(90,200,"ninety");
	}
	Alloy.Globals.ninety = !Alloy.Globals.ninety;
}
function selfPaced(){
	if (!Alloy.Globals.selfPaced){
		addPace("Self Paced", "selfPaced");
	} else{
		removePace("Self Paced","selfPaced");
	}
	Alloy.Globals.selfPaced = !Alloy.Globals.selfPaced;
}
function easy(){
	if (!Alloy.Globals.easy){
		addPace("Easy","easy");
	} else{
		removePace("Easy","easy");
	}
	Alloy.Globals.easy = !Alloy.Globals.easy;
}
function brisk(){
	if (!Alloy.Globals.brisk){
		addPace("Brisk","brisk");
	} else{
		removePace("Brisk","brisk");
	}
	Alloy.Globals.brisk = !Alloy.Globals.brisk;
}
function leisurely(){
	if (!Alloy.Globals.leisurely){
		addPace("Leisurely","leisurely");
	} else{
		removePace("Leisurely","leisurely");
	}
	Alloy.Globals.leisurely = !Alloy.Globals.leisurely;
}
function steady(){
	if (!Alloy.Globals.steady){
		addPace("Steady","steady");
	} else{
		removePace("Steady","steady");
	}
	Alloy.Globals.steady = !Alloy.Globals.steady;
}
function moderate(){
	if (!Alloy.Globals.moderate){
		addPace("Moderate","moderate");
	} else{
		removePace("Moderate","moderate");
	}
	Alloy.Globals.moderate = !Alloy.Globals.moderate;
}
function vigorous(){
	if (!Alloy.Globals.vigorous){
		addPace("Vigorous","vigorous");
	} else{
		removePace("Vigorous","vigorous");
	}
	Alloy.Globals.vigorous = !Alloy.Globals.vigorous;
}
function strenuous(){
	if (!Alloy.Globals.strenuous){
		addPace("Strenuous","strenuous");
	} else{
		removePace("Strenuous","strenuous");
	}
	Alloy.Globals.strenuous = !Alloy.Globals.strenuous;
}
function superStrenuous(){
	if (!Alloy.Globals.superStrenuous){
		addPace("Super Strenuous","superStrenuous");
	} else{
		removePace("Super Strenuous","superStrenuous");
	}
	Alloy.Globals.superStrenuous = !Alloy.Globals.superStrenuous;
}

$.startTimeSlider.addEventListener('touchend', function(e){
   // this.value = Math.round(e.value);
    $.startTimeLabel.text = e.value + ":00";
    $.endTimeSlider.min= this.value;
    if ($.endTimeSlider.value < $.endTimeSlider.min){
    	$.endTimeSlider.value = $.endTimeSlider.min;
    }
    Alloy.Globals.time[0] = this.value;
    $.timeLabel.text = $.startTimeLabel.text + " to " + $.endTimeLabel.text;
});

$.startTimeSlider.addEventListener('change', function(e) {
   // $.startTimeLabel.text = Math.round(e.value) + ":00";
    
});

$.endTimeSlider.addEventListener('touchend', function(e){
   // this.value = Math.round(e.value);
    $.endTimeLabel.text = e.value + ":00";
    Alloy.Globals.time[1] = this.value;
    $.timeLabel.text = $.startTimeLabel.text + " to " + $.endTimeLabel.text;
});

$.endTimeSlider.addEventListener('change', function(e) {
    $.endTimeLabel.text = Math.round(e.value) + ":00";
});
function hidePaceView(){
	hideView($.paceView,paceView);
	paceView = !paceView;
	if (paceView){
		$.paceFold.image = "/images/Filter opened.png";
	} else{
		$.paceFold.image = "/images/Filter open.png";
	}
}
function hideDayView(){
	hideView($.dayView,dayView);
	dayView = !dayView;
	if (dayView){
		$.dayFold.image = "/images/Filter opened.png";
	} else{
		$.dayFold.image = "/images/Filter open.png";
	}
}
function hideTimeView(){
	hideView($.timeView,timeView);
	timeView = !timeView;
	if (timeView){
		$.timeFold.image = "/images/Filter opened.png";
	} else{
		$.timeFold.image = "/images/Filter open.png";
	}
}
function hideDistanceView(){
	hideView($.distanceView,distanceView);
	distanceView = !distanceView;
	if (distanceView){
		$.distanceFold.image = "/images/Filter opened.png";
	} else{
		$.distanceFold.image = "/images/Filter open.png";
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
		for (var i=0; i<Alloy.Globals.paceID.length;i++){
			add($[Alloy.Globals.paceID[i]]);
		}
	}
	if (Alloy.Globals.day.length == 0){
		$.dayLabel.text = "";
	} else{
		$.dayLabel.text = Alloy.Globals.day.toString();
		for (var i=0; i<Alloy.Globals.day.length; i++){
			$["check"+Alloy.Globals.day[i]].image = "/images/checked.png";
		}
	}
	$.distanceLabel.text = "";
	if (Alloy.Globals.distance.length != 0){
		$.distanceLabel.text = Alloy.Globals.distance[0][0] + "-" + Alloy.Globals.distance[0][1] + " miles ";
		if (Alloy.Globals.distance.length > 1){
			for (var i=1; i<Alloy.Globals.distance.length; i++){
				string = ", " + Alloy.Globals.distance[i][0] + "-" + Alloy.Globals.distance[i][1] + " miles ";
				$.distanceLabel.text = $.distanceLabel.text + string;
			}
		}
		
		for (var i=0; i<Alloy.Globals.distanceID.length;i++){
			add($[Alloy.Globals.distanceID[i]]);
		}
	}
	if (Alloy.Globals.time.length == 0){
		$.timeLabel.text = "";
	} else {
		$.startTimeSlider.value = Alloy.Globals.time[0];
		$.endTimeSlider.value = Alloy.Globals.time[1];
		$.timeLabel.text = Alloy.Globals.time[0] + ":00" + " to " + Alloy.Globals.time[1] + ":00";
	}
}
function resetFilter(){
	$.startTimeSlider.value = 0;
	$.endTimeSlider.value = 0;
	Alloy.Globals.day = [];
	Alloy.Globals.dayID = [];
	Alloy.Globals.time = [];
	Alloy.Globals.pace = [];
	Alloy.Globals.paceID = [];
	Alloy.Globals.distance = [];
	Alloy.Globals.distanceID = [];
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
	else {
		//If filer is opened by map, notice map to update
		if(args.prevMapWindow !== undefined) {
			args.prevMapWindow.fireEvent('filter_updated');
		}
		
		//Need to Calc distance to location as it would be used in sort.
		Alloy.Globals.setDistanceToLocation(Alloy.Collections.feed.models, Alloy.Globals.regionCenter);
	}	
}

/**
 *For each model, set value for field distanceToLoc based on given target location
 */
/*
function setDistanceToLocation(models, targetLoc) {
	for (var i = 0; i < models.length; i++) {
		var model = models[i];
		model.setDistanceToLoc(targetLoc);
	}
}*/


function applyFilter(){
	if(Titanium.Network.networkType == Titanium.Network.NETWORK_NONE){
	     alert("Your device is not online. Please check your network and try again.");
	} else{
		Alloy.Collections.feed.fetch({
		url: "https://www.cascade.org/DailyRides/rss.xml",
		success: afterFetch,
		error: afterFetch
		});
		
		$.fwin.close();
	}
		
}