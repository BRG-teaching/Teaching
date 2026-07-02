function ggbOnInit() {}

function moveLoad1(){
	var divisions = ggbApplet.getValue ("divisions"); 
	var value = ggbApplet.getValue("positionF_{1}");
	var Y = ggbApplet.getYcoord("LP10");
		for (var i=0; i<divisions/2; i++){ 
			var X1 = ggbApplet.getXcoord("LP1"+i+"");
			if (value==(i+1)){
				ggbApplet.setCoords("E", X1, Y);
			}
		}
}

function moveLoad2(){
	var divisions = ggbApplet.getValue ("divisions"); 
	var value = ggbApplet.getValue("positionF_{2}");
	var Y = ggbApplet.getYcoord("LP10");
		for (var i=5; i<divisions; i++){ 
			var X1 = ggbApplet.getXcoord("LP1"+i+"");
			if (value==(i+1)){
				ggbApplet.setCoords("G", X1, Y);
			}
		}
}

