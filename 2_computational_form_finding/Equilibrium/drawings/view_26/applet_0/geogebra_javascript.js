function ggbOnInit() {
}
function onUpdateMode(){
resetStep();
resetIF();
}
function resetStep(){
ggbApplet.setValue("step",0);
}
function resetSFD() {
ggbApplet.setValue("scaleForceDiagram",0.5);
}
function resetOffset(){
ggbApplet.setValue("offsetReactionForces",0.75);
}
function resetIF(){
ggbApplet.setValue("scaleInternalForces",0);
}

function onClickButton1(){
resetGeometry();
}
function resetGeometry() {
ggbApplet.setCoords("P2aAB1K", 5.5, 26);
ggbApplet.setCoords("P2aEF54", 10, 28);
ggbApplet.setCoords("P2aIJK8", 14.5, 26);
ggbApplet.setCoords("P4aA", 21, 29.7);
ggbApplet.setCoords("P4s03", 17.5, 29.7);
}
