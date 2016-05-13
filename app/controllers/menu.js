var args = arguments[0] || {};

function menuClick(e){
	var rowId=e.rowData.rowId;
	
	switch (rowId){
		
		case 1:
			
			Alloy.Globals.Navigator.open("paceClassification",{});
			
			break;
		case 2:
			
			Alloy.Globals.Navigator.open("about",{});
			
			break;
	}
	
	Alloy.CFG.drawermenu.showhidemenu();
}