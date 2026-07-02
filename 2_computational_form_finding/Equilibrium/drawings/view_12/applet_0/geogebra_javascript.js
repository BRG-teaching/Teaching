function ggbOnInit() {}

var loads = ["LP1","LP2","LP3","LP4","LP5","LP6"];

function updateLoads(){
	var value = ggbApplet.getValue("PointLoad");
	var Y = ggbApplet.getYcoord("V_2");
		for (var i=1; i<=6; i++){ 
			var X1 = ggbApplet.getXcoord("LP"+i+"");
			if (value==i){
				ggbApplet.setCoords("V_2", X1, Y);
			}
		}
}

function resetstep() {
ggbApplet.setValue("step",0);
}

function resetnode() {
ggbApplet.setValue("node",0);
}

function resetIF() {
ggbApplet.setValue("scaleInternalForces",0);
}
