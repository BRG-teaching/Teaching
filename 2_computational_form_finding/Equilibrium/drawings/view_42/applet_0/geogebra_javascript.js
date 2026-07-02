function ggbOnInit() {}

function onClickButton1(){
resetGeometry();
}
function resetGeometry() {
ggbApplet.setCoords("A", 5, 4);
ggbApplet.setCoords("B", 10, 4);
ggbApplet.setCoords("C", 5, 8);
ggbApplet.setCoords("D", 5, 7);
ggbApplet.setValue("h", 1);
ggbApplet.setValue("scaleForceDiagram", 1.85);
}

function onClickButtonH1(){
resetH1();
}
function onClickButtonH2(){
resetH2();
}
function onClickButtonH100(){
resetH100();
}

function resetH1() {
ggbApplet.setValue("h", 1);
}
function resetH2() {
ggbApplet.setValue("h", 2);
}
function resetH100() {
ggbApplet.setValue("h", 100);
}
