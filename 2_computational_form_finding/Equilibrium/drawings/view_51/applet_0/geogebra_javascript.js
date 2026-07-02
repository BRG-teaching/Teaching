function ggbOnInit() {}

function onUpdateMode(){
resetGeometry();
resetStep() 
}

function onClickButton1(){
resetGeometry();
}

function resetGeometry() {
ggbApplet.setCoords("Z_3", 8.5, 9.17);
ggbApplet.setCoords("W", 3.25, 9.1);
}

function resetStep() {
ggbApplet.setValue("step",0);
}

