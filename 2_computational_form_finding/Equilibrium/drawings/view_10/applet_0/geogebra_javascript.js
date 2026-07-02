function ggbOnInit() {}

function returntostart() {
var Z1X = ggbApplet.getXcoord("Z_1");
var Z1Y = ggbApplet.getYcoord("Z_1");
var Z2X = ggbApplet.getXcoord("Z_2");
var Z2Y = ggbApplet.getYcoord("Z_2");
var Z3X = ggbApplet.getXcoord("Z_3");
var Z3Y = ggbApplet.getYcoord("Z_3");
var Z4X = ggbApplet.getXcoord("Z_4");
var Z4Y = ggbApplet.getYcoord("Z_4");
var Z5X = ggbApplet.getXcoord("Z_5");
var Z5Y = ggbApplet.getYcoord("Z_5");
ggbApplet.setCoords("D_1", Z1X, Z1Y);
ggbApplet.setCoords("D_2", Z2X, Z2Y);
ggbApplet.setCoords("D_3", Z3X, Z3Y);
ggbApplet.setCoords("a", Z4X, Z4Y);
ggbApplet.setCoords("a_1", Z5X, Z5Y);
}

function resetstep() {
ggbApplet.setValue("step",0);
}

