function ggbOnInit() {}

var loads = ["LP1","LP2","LP3","LP4","LP5","LP6","LP7","LP8","LP9","LP10","LP11","LP12","LP13","LP14","LP15"];

function onUpdateMode(){
resetStep();
}

function onUpdatePosition(){
updateLoads();
}

function resetStep() {
var value = ggbApplet.getValue("mode");
if (value==0){
	ggbApplet.setValue("step",0);
	}
}

function updateLoads(){
	var value = ggbApplet.getValue("positionQ");
	var Y = ggbApplet.getYcoord("W_3");
		for (var i=1; i<loads.length+1; i++){ 
			var X1 = ggbApplet.getXcoord("LP"+i+"");
			if (value==i){
				ggbApplet.setCoords("W_3", X1, Y);
			}
		}
}
