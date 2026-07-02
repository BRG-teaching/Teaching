function ggbOnInit() {
}

function onUpdateMode(){
resetStep();
resetIF();
resetSFD();
resetOffset();
}
function resetStep(){
ggbApplet.setValue("step",0);
}
function resetIF(){
ggbApplet.setValue("scaleInternalForces",0);
}
function resetSFD(){
ggbApplet.setValue("scaleForceDiagram",50);
}
function resetOffset(){
ggbApplet.setValue("offsetReactionForces",4);
}

function onClickButton1(){
resetGeometry();
}
function resetGeometry() {
ggbApplet.setCoords("H", ggbApplet.getXcoord("H_3"), ggbApplet.getYcoord("H_3"));
ggbApplet.setCoords("O", 80, 60);
ggbApplet.setValue("R", 11);
ggbApplet.setValue("F_{1}", 900);
ggbApplet.setValue("F_{2}", 1110);
ggbApplet.setValue("F_{3}", 1000);
ggbApplet.setValue("ChangeGeometryofTruss", 11);
}