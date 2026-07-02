function ggbOnInit() {}

function onUpdatePosition(){
updateLoads();
}

function updateLoads(){
	var div = ggbApplet.getValue ("divisions"); 
	var value = ggbApplet.getValue("positionQ");
	var Y = ggbApplet.getYcoord("LP11");
		for (var i=1; i<div; i++){ 
			var X1 = ggbApplet.getXcoord("LP1"+i+"");
			if (value==i){
				ggbApplet.setCoords("Q1", X1, Y);
			}
		}
}
