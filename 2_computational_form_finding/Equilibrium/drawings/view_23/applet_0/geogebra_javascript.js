function ggbOnInit() {}

function onClickButton1(){
returnToStart();
resetOffset();
resetSFD();
resetIF();
}
function returnToStart() {
var Z1X = ggbApplet.getXcoord("Z_1");
var Z1Y = ggbApplet.getYcoord("Z_1");
ggbApplet.setCoords("R", Z1X, Z1Y);
var CX = ggbApplet.getXcoord("C");
var CY = ggbApplet.getYcoord("C");
ggbApplet.setCoords("A_6", CX, CY);
var DX = ggbApplet.getXcoord("D");
var DY = ggbApplet.getYcoord("D");
ggbApplet.setCoords("D_2", DX, DY);
var EX = ggbApplet.getXcoord("E");
var EY = ggbApplet.getYcoord("E");
ggbApplet.setCoords("K", EX, EY);
}

function resetIF() {
ggbApplet.setValue("scaleInternalForces",0);
}

function resetSFD() {
ggbApplet.setValue("scaleForceDiagram",50);
}

function resetOffset(){
ggbApplet.setValue("offsetReactionForces",0.3);
}
