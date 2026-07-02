function ggbOnInit() {}

function onUpdateMode(){
resetStep();
resetNode();
resetIF();
fixPoints();
}

function onClickButton1(){
resetGeometry();
}

function resetStep() {
ggbApplet.setValue("step",0);
}

function resetNode() {
ggbApplet.setValue("node",0);
}

function resetIF() {
ggbApplet.setValue("scaleInternalForces",0);
}

function fixPoints(){
var mode = ggbApplet.getValue("mode");
if(mode==2){
ggbApplet.setCoords("Z_2",ggbApplet.getXcoord("H_1"),ggbApplet.getYcoord("H_1"));
ggbApplet.setCoords("A_3",ggbApplet.getXcoord("I_1"),ggbApplet.getYcoord("I_1"));
ggbApplet.setCoords("B_3",ggbApplet.getXcoord("J_1"),ggbApplet.getYcoord("J_1"));
ggbApplet.setFixed("G_1",true);
}
else{
ggbApplet.setCoords("Z_2",13,54);
ggbApplet.setCoords("A_3",21,50);
ggbApplet.setCoords("B_3",39,54);
ggbApplet.setFixed("G_1",false);
}
}

function resetGeometry() {
ggbApplet.setCoords("E_3", 3.99, 64.7);
ggbApplet.setCoords("G_3", 52.17, 63.21);
ggbApplet.setCoords("Z_2", 13, 54);
ggbApplet.setCoords("D", 12.02, 49.1);
ggbApplet.setCoords("A_3", 21, 50);
ggbApplet.setCoords("C", 21.14, 45);
ggbApplet.setCoords("B_3", 39, 54);
ggbApplet.setCoords("E", 40.2, 49.15);
}
