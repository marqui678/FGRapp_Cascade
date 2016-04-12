
var data = [];
data[0]=Ti.UI.createPickerRow({title:'Self Paced'});
data[1]=Ti.UI.createPickerRow({title:'Easy'});
data[2]=Ti.UI.createPickerRow({title:'Leisurely'});
data[3]=Ti.UI.createPickerRow({title:'Steady'});
data[4]=Ti.UI.createPickerRow({title:'Moderate'});
data[5]=Ti.UI.createPickerRow({title:'Brisk'});
data[6]=Ti.UI.createPickerRow({title:'Vigorous'});
data[7]=Ti.UI.createPickerRow({title:'Strenuous'});
data[8]=Ti.UI.createPickerRow({title:'Super Strenuous'});

$.picker.add(data);
$.picker.setSelectedRow(0, 4, false);
$.picker.addEventListener('change',function(e){
  for (var i=0; i < Alloy.Collections.feed.length; i++) {
	  if (Alloy.Collections.feed.models[i].get('fgrrss:pace').indexOf(e.row.title) == 0) {
	  	Alloy.Collections.feed.remove(Alloy.Collections.feed.models[i].get('link'));
	  };
	};
});
c=Alloy.Collections.feed;
function testFilter(){
	d = Alloy.Collections.feed;
	Alloy.Globals.Navigator.open("list",Alloy.Collections.feed);
	
}
 