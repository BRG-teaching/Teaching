function ggbOnInit() {}

function onUpdateMode(){
resetStep();
}

function resetStep(){
ggbApplet.setValue("step",0);
}

function waterloo(){
	ggbApplet.setCoords("E",1,0);
	ggbApplet.setCoords("G",14,0);
	ggbApplet.evalCommand("Bezier1:Point[d]")
	ggbApplet.setCoords("Bezier1",0,0);
	ggbApplet.evalCommand("Bezier2:Point[g]")
	ggbApplet.setCoords("Bezier2",1,5.29);
	ggbApplet.setCoords("Bezier3",8.43,5.61);
	ggbApplet.evalCommand("Bezier4:Point[i]")
	ggbApplet.setCoords("Bezier4",14,4.37);
	ggbApplet.evalCommand("Bezier5:Point[e]")
	ggbApplet.setCoords("Bezier5",0,0.9);
	ggbApplet.setCoords("M",3.4,3.94);
	ggbApplet.setValue("T",12);
	ggbApplet.setValue("scaleForceDiagram",0.5);
}

function berlin(){
	ggbApplet.setCoords("E",1,0);
	ggbApplet.setCoords("G",17,0);
	ggbApplet.evalCommand("Bezier1:Point[d]")
	ggbApplet.setCoords("Bezier1",0,0);
	ggbApplet.evalCommand("Bezier2:Point[g]")
	ggbApplet.setCoords("Bezier2",1,5.5);
	ggbApplet.setCoords("Bezier3",9,4);
	ggbApplet.evalCommand("Bezier4:Point[i]")
	ggbApplet.setCoords("Bezier4",17,5.5);
	ggbApplet.evalCommand("Bezier5:Point[e]")
	ggbApplet.setCoords("Bezier5",18,0);
	ggbApplet.setCoords("M",3.2,3.32);
	ggbApplet.setValue("T",10);
	ggbApplet.setValue("scaleForceDiagram",0.5);
}

function zha(){
	ggbApplet.setCoords("E",2,0);
	ggbApplet.setCoords("G",15,0);
	ggbApplet.evalCommand("Bezier1:Point[d]")
	ggbApplet.setCoords("Bezier1",0,10);
	ggbApplet.evalCommand("Bezier2:Point[g]")
	ggbApplet.setCoords("Bezier2",2,10.6);
	ggbApplet.setCoords("Bezier3",4.5,8);
	ggbApplet.evalCommand("Bezier4:Point[i]")
	ggbApplet.setCoords("Bezier4",15,0.75);
	ggbApplet.evalCommand("Bezier5:Point[e]")
	ggbApplet.setCoords("Bezier5",18,0);
	ggbApplet.setCoords("M",4,8.5);
	ggbApplet.setValue("T",30);
	ggbApplet.setValue("scaleForceDiagram",0.15);
}
