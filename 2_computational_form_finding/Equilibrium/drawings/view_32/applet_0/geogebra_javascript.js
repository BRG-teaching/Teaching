function ggbOnInit() {}

function onUpdateMode(){
resetStep();
}

function onUpdatePosition(){
updateLoads();
}

function resetStep() {
ggbApplet.setValue("step",0);
}

function updateLoads(){
	var div = ggbApplet.getValue("divisions");
	var value = ggbApplet.getValue("positionQ");
	var Y = ggbApplet.getYcoord("ML");
	for (var i =0; i< div+1; i++){
		var X1 = ggbApplet.getXcoord("LP1"+i+""); 
		if (value==(i+1)){
			ggbApplet.setCoords("ML", X1, Y);
		}
	}
} 
