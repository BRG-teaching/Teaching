function ggbOnInit() {}

var loads = ["LP1","LP2","LP3","LP4","LP5","LP6","LP7","LP8","LP9","LP10","LP11","LP12","LP13","LP14","LP15","LP16","LP17","LP18","LP19","LP20","LP21","LP22","LP23","LP24","LP25","LP26","LP27","LP28","LP29","LP30"];

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
	var value = ggbApplet.getValue("positionQ");
	var Y = ggbApplet.getYcoord("U_6");
		for (var i=1; i<loads.length+1; i++){ 
			var X1 = ggbApplet.getXcoord("LP"+i+"");
			if (value==i){
				ggbApplet.setCoords("U_6", X1, Y);
			}
		}
}

