function ggbOnInit() {}

function onUpdateMode(){
resetStep();
resetIF();
resetSFD();
resetOffset();
resetQ();
}
function resetStep() {
ggbApplet.setValue("step",0);
}
function resetIF() {
ggbApplet.setValue("scaleInternalForces",0);
}
function resetSFD() {
ggbApplet.setValue("scaleForceDiagram",1);
}
function resetOffset() {
ggbApplet.setValue("offsetReactionForces",0.75);
}
function resetQ() {
ggbApplet.setValue("factorQ",0);
ggbApplet.setValue("positionQ",1);
}

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

