function ggbOnInit() {}

function onUpdateMode(){
resetStep();
resetIF();
}

function resetStep() {
ggbApplet.setValue("step",0);
}
function resetIF() {
ggbApplet.setValue("scaleInternalForces",0);
}
function resetSFD() {
ggbApplet.setValue("scaleForceDiagram",0.3);
}
function resetOffset(){
ggbApplet.setValue("offsetResultant",0.8);
ggbApplet.setValue("offsetReactionForces",0.4);
}


function onClickButton1(){
resetGeometry();
}

function resetGeometry() {
ggbApplet.setCoords("B",7.18, 3);
ggbApplet.setCoords("W",14, 3);
}


