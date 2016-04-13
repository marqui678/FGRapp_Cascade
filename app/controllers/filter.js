
var paceData = [];
paceData[0]=Ti.UI.createPickerRow({title:'Self Paced'});
paceData[1]=Ti.UI.createPickerRow({title:'Easy'});
paceData[2]=Ti.UI.createPickerRow({title:'Leisurely'});
paceData[3]=Ti.UI.createPickerRow({title:'Steady'});
paceData[4]=Ti.UI.createPickerRow({title:'Moderate'});
paceData[5]=Ti.UI.createPickerRow({title:'Brisk'});
paceData[6]=Ti.UI.createPickerRow({title:'Vigorous'});
paceData[7]=Ti.UI.createPickerRow({title:'Strenuous'});
paceData[8]=Ti.UI.createPickerRow({title:'Super Strenuous'});

$.pacePicker.add(paceData);
$.pacePicker.setSelectedRow(0, 4, false);
$.pacePicker.addEventListener('change',function(e){
  Alloy.Globals.pace = e.row.title;
});

function testFilter(){
	Alloy.Globals.Navigator.open("list",Alloy.Globals.pace);
	
}
 