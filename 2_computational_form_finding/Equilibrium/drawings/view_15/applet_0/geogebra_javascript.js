function ggbOnInit() {}

var loads = ["LP1","LP2","LP3","LP4","LP5","LP6","LP7","LP8","LP9","LP10","LP11","LP12","LP13","LP14"];

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
	var value = ggbApplet.getValue("length_q");
	var Y = ggbApplet.getYcoord("W_1");
		for (var i=1; i<loads.length+1; i++){ 
			var X1 = ggbApplet.getXcoord("LP"+i+"");
			if (value==i){
				ggbApplet.setCoords("W_1", X1, Y);
			}
		}
}
