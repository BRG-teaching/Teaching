function ggbOnInit() {}

function onUpdateMode(){
resetGeometry();
resetStep() 
}

function resetGeometry() {
ggbApplet.setCoords("F", 7.3, 9.3);
ggbApplet.setCoords("R_2", 4, 4);
}

function resetStep() {
ggbApplet.setValue("step",0);
}

