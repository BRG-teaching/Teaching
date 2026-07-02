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
resetLoads();
}
function resetLoads() {
for (var i =1; i< 8; i++){
ggbApplet.setValue("F_{"+i+"}",3);
}
}
