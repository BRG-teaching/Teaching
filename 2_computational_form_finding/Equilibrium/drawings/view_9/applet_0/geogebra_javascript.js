function ggbOnInit() {}

function onUpdateMode(){
resetStep();
resetOverlay();
}

function resetStep() {
ggbApplet.setValue("step",0);
}

function resetOverlay(){
ggbApplet.setValue("overlay",0);
}
