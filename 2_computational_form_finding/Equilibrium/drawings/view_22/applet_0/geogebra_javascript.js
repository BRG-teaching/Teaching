function ggbOnInit() {
}
function onUpdateMode(){
resetStep();
resetIF();
resetSFD();
resetOffset();
}
function onClickButton1(){
returnToStart();
resetIF();
resetSFD();
resetOffset();
}

function returnToStart(){
	var xStart = ggbApplet.getXcoord("startPos");
	var yStart = ggbApplet.getYcoord("startPos");
	ggbApplet.setCoords("H", xStart, yStart);
	ggbApplet.setCoords("LL0", 60,0);
}

function resetStep(){
ggbApplet.setValue("step",0);
}

function resetIF() {
ggbApplet.setValue("scaleInternalForces",0);
}

function resetSFD() {
ggbApplet.setValue("scaleForceDiagram",65);
}

function resetOffset(){
ggbApplet.setValue("offsetReactionForces",4);
}
