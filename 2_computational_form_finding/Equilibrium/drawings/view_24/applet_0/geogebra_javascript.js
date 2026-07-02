function ggbOnInit() {}

function onClickButton1(){
returnToStart();
resetOffset();
resetSFD();
resetIF();
}

function returnToStart() {
var EX = ggbApplet.getXcoord("E");
var EY = ggbApplet.getYcoord("E");
var E1X = ggbApplet.getXcoord("E_1");
var E1Y = ggbApplet.getYcoord("E_1");
var Z1X = ggbApplet.getXcoord("Z_1");
var Z1Y = ggbApplet.getYcoord("Z_1");
ggbApplet.setCoords("E_2", EX, EY);
ggbApplet.setCoords("E_4", E1X, E1Y);
ggbApplet.setCoords("G", Z1X, Z1Y);
}

function resetIF() {
ggbApplet.setValue("scaleInternalForces",0);
}

function resetSFD() {
ggbApplet.setValue("scaleForceDiagram",280);
}

function resetOffset(){
ggbApplet.setValue("offsetReactionForces",0.3);
}
