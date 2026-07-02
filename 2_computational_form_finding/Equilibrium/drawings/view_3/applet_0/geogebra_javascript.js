function ggbOnInit() {}

function stepslider() {
var value = ggbApplet.getValue("step");
if (1<value<7){
	ggbApplet.setValue("scaleOffset", 0);
	}
if (value>8){
	ggbApplet.setValue("scaleOffset", 0.4);
	}
if (value==0){
	ggbApplet.setValue("scaleOffset", 0.4);
	}
}

function resetstep() {
ggbApplet.setValue("step",0);
}

function resetnode() {
ggbApplet.setValue("node",0);
}

function resetIF() {
ggbApplet.setValue("scaleInternalForces",0);
}
