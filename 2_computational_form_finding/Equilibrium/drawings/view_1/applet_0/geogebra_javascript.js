function ggbOnInit() {}

function returntostart() {
ggbApplet.evalCommand("changeModeofStress=0");
ggbApplet.evalCommand("n=false")
ggbApplet.evalCommand("o_2=false")
ggbApplet.evalCommand("o_1=false")
ggbApplet.setCoords("A", 24, 48);
ggbApplet.setCoords("B", ggbApplet.getXcoord("Q"), ggbApplet.getYcoord("Q"));
ggbApplet.setCoords("D", ggbApplet.getXcoord("Q'"), ggbApplet.getYcoord("Q'"));
ggbApplet.setCoords("C", ggbApplet.getXcoord("Q''"), ggbApplet.getYcoord("Q''"));
ggbApplet.setCoords("F_4", 96, 58); 
}
