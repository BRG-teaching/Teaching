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
