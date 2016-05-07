var args = arguments[0] || {};

function menuClick(e){
	var rowId=e.rowData.rowId;
	
	switch (rowId){
		case 1:
			alert("Pace classification clicked");
			break;
		case 2:
			alert("About clicked");
			break;
	}
	
	Alloy.CFG.drawermenu.showhidemenu();
}