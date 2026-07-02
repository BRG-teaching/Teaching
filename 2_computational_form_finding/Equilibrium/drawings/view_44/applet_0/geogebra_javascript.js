function ggbOnInit() {}

var divisions = ggbApplet.getValue ("divisions"); 


function loadlineForm(){
	for (var i =0; i< divisions; i++){
		ggbApplet.evalCommand("LP1"+i+"= (x(L1) + Distance(L1,L2) / divisions * "+(i + 0.5)+", y(L1))");
		ggbApplet.setVisible("LP1"+i+"", false);
		ggbApplet.evalCommand("loa"+i+"= (Line(LP1"+i+",Line(0,100)))");
	}
}

function loadlineForce(){
	for (var i =0; i< divisions; i++){
		ggbApplet.evalCommand("LL"+(i+1)+"= (x(LL0), y(LL"+i+") - k / divisions)");
		ggbApplet.setPointSize("LL"+(i+1)+"", 2)
	}
}
function segments(){
	for (var i =0; i<= divisions; i++){
		ggbApplet.evalCommand("seg"+(i)+"= Segment(LL"+i+", I_1)");
		ggbApplet.setLineThickness("seg"+i+"", 2);
		ggbApplet.setColor("seg"+i+"", 0, 0, 0);
	}
}

function funicular(){
	for (var i =0; i< divisions; i++){
		ggbApplet.evalCommand("FP"+(i+1)+"= Intersect(loa"+i+", Line(FP"+i+",seg"+i+"))");
	}
}

function segmentsM(){
	for (var i =0; i<= divisions; i++){
		ggbApplet.evalCommand("segM"+(i)+"= Segment(LL"+i+", E_5)");
		ggbApplet.setLineThickness("segM"+i+"", 2);
		ggbApplet.setColor("segM"+i+"", 0, 0, 0);
	}
}

function funicularM(){
	for (var i =0; i< divisions; i++){
		ggbApplet.evalCommand("FPM"+(i+1)+"= Intersect(loa"+i+", Line(FPM"+i+",segM"+i+"))");
	}
}

function loadlineFormT(){
	for (var i =0; i< divisions; i++){
		ggbApplet.evalCommand("LP1T"+i+"= (x(B_{SM}) + Distance(B_{SM},D_{SM}) / divisions * "+(i + 0.5)+", y(B_{SM}))");
		ggbApplet.setVisible("LP1T"+i+"", false);
		ggbApplet.evalCommand("loaT"+i+"= (Line(LP1T"+i+",loa0))");
	}
}

function loadlineForceT(){
	for (var i =0; i< divisions; i++){
		ggbApplet.evalCommand("LLT"+(i+1)+"= (x(LLT0), y(LLT"+i+") - k / divisions)");
		ggbApplet.setPointSize("LLT"+(i+1)+"", 2)
	}
}

function segmentsTM(){
	for (var i =0; i<= divisions; i++){
		ggbApplet.evalCommand("segTM"+(i)+"= Segment(LLT"+i+", F_5)");
		ggbApplet.setLineThickness("segTM"+i+"", 2);
		ggbApplet.setColor("segTM"+i+"", 0, 0, 0);
	}
}

function funicularTM(){
	for (var i =0; i< divisions; i++){
		ggbApplet.evalCommand("FPTM"+(i+1)+"= Intersect(loaT"+i+", Line(FPTM"+i+",segTM"+i+"))");
	}
}

