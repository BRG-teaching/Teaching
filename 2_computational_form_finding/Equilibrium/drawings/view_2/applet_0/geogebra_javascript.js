function ggbOnInit() {}

function stepslider() {
var value = ggbApplet.getValue("step");
if (4>=value>=1){
	ggbApplet.setValue("scaleOffset", 0);
	}
if (value==5){
	ggbApplet.setValue("scaleOffset", 0.3);
	}
if (value==0){
	ggbApplet.setValue("scaleOffset", 0.3);
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
