function ggbOnInit() {}

function onUpdateMode(){
resetStep();
ggbApplet.setValue("offsetReactionForces",0);
ggbApplet.setValue("offsetLoads",0);
resetAll();
}

function onClickButton1(){
resetAll();
}

function resetStep() {
ggbApplet.setValue("step",0);
}

function resetAll(){
ggbApplet.setCoords("B",ggbApplet.getXcoord("B_{reset}"),ggbApplet.getYcoord("B_{reset}"));
ggbApplet.setCoords("D",ggbApplet.getXcoord("D_{reset}"),ggbApplet.getYcoord("D_{reset}"));
ggbApplet.setCoords("G",ggbApplet.getXcoord("G_{reset}"),ggbApplet.getYcoord("G_{reset}"));
ggbApplet.setCoords("I",ggbApplet.getXcoord("I_{reset}"),ggbApplet.getYcoord("I_{reset}"));
}
