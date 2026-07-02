function ggbOnInit() {}

function onUpdateMode(){
resetStep();
resetIF();
resetSFD();
resetOffset();
}

function onClickButton1(){
returnToStart();
resetOffset();
resetSFD();
}

function returnToStart() {
ggbApplet.setCoords("D_1", ggbApplet.getXcoord("C_1"), ggbApplet.getYcoord("C_1"));
ggbApplet.setCoords("D_2", ggbApplet.getXcoord("C_2"), ggbApplet.getYcoord("C_2"));
ggbApplet.setCoords("D_3", ggbApplet.getXcoord("C_3"), ggbApplet.getYcoord("C_3"));
ggbApplet.setCoords("a",21, 2);
ggbApplet.setCoords("D",21, 4);
ggbApplet.setValue("F_{3}",200);
ggbApplet.setValue("F_{2}",200);
ggbApplet.setValue("F_{1}",100);
}

function resetStep() {
ggbApplet.setValue("step",0);
}

function resetIF() {
ggbApplet.setValue("scaleInternalForces",0);
}

function resetSFD() {
ggbApplet.setValue("scaleForceDiagram",150);
}

function resetOffset(){
ggbApplet.setValue("offsetLoads",0);
ggbApplet.setValue("offsetReactionForces",1);
}
