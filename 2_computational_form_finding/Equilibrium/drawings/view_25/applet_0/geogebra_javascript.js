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


function onClickButton1(){
resetAll();
}

function onClickButton2(){
resetParallel();
}


function resetAll(){
ggbApplet.setCoords("A_5",ggbApplet.getXcoord("B_5"),ggbApplet.getYcoord("B_5"));
ggbApplet.setCoords("edgeleft",ggbApplet.getXcoord("P_5"),ggbApplet.getYcoord("P_5"));
ggbApplet.setValue("offsetReactionForces",0.5);
ggbApplet.setValue("offsetLoads",0);
resetParallel();
}


function resetParallel(){
ggbApplet.setCoords("I_1", ggbApplet.getXcoord("W"), ggbApplet.getYcoord("W"));
ggbApplet.setCoords("J_1", ggbApplet.getXcoord("Z"), ggbApplet.getYcoord("Z"));
ggbApplet.setCoords("T_1", ggbApplet.getXcoord("A_1"), ggbApplet.getYcoord("A_1"));
ggbApplet.setCoords("U_1", ggbApplet.getXcoord("B_1"), ggbApplet.getYcoord("B_1"));
ggbApplet.setCoords("V_1", ggbApplet.getXcoord("C_1"), ggbApplet.getYcoord("C_1"));
ggbApplet.setCoords("W_1", ggbApplet.getXcoord("D_1"), ggbApplet.getYcoord("D_1"));
ggbApplet.setCoords("Base",ggbApplet.getXcoord("Q_5"),ggbApplet.getYcoord("Q_5"));
}









