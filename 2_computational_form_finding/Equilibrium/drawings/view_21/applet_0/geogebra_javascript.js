function ggbOnInit() {}

function onClickButton1(){
returnToStart();
fan();
resetSFD();
resetIF();
resetOffset();
}
function onClickButton2(){
fan();
}
function onClickButton3(){
harp();
}
function onClickButton4(){
semifan();
}

function returnToStart(){
	ggbApplet.setCoords("towerControl2", 20, 0);
	ggbApplet.setCoords("deckControl1", ggbApplet.getXcoord("deckControl"), ggbApplet.getYcoord("deckControl"));
	ggbApplet.setCoords("deckControl2", ggbApplet.getXcoord("deckControl1"+20), ggbApplet.getYcoord("deckControl"));
	ggbApplet.setCoords("tower1", ggbApplet.getXcoord("deckControl"), ggbApplet.getYcoord("deckControl")+10);
	ggbApplet.setCoords("O", 47, 8.6);
}
function fan(){
	var tx = ggbApplet.getXcoord("tower1");
	var ty = ggbApplet.getYcoord("tower1");
	ggbApplet.setCoords("tower2", tx, ty);
	ggbApplet.setCoords("tower3", tx, ty);
}
function harp(){
	var tH2x = ggbApplet.getXcoord("towerH2");
	var tH2y = ggbApplet.getYcoord("towerH2");
	var tH3x = ggbApplet.getXcoord("towerH3");
	var tH3y = ggbApplet.getYcoord("towerH3");
	ggbApplet.setCoords("tower2", tH2x, tH2y);
	ggbApplet.setCoords("tower3", tH3x, tH3y);
}
function semifan(){
	var tSF2x = ggbApplet.getXcoord("towerSF2");
	var tSF2y = ggbApplet.getYcoord("towerSF2");
	var tSF3x = ggbApplet.getXcoord("towerH2");
	var tSF3y = ggbApplet.getYcoord("towerH2");
	ggbApplet.setCoords("tower2", tSF2x, tSF2y);
	ggbApplet.setCoords("tower3", tSF3x, tSF3y);
}

function resetSFD() {
ggbApplet.setValue("scaleForceDiagram",1.5);
}

function resetIF() {
ggbApplet.setValue("scaleInternalForces",0);
}

function resetOffset(){
ggbApplet.setValue("offsetLoads",0);
ggbApplet.setValue("offsetReactionForces",2.5);
}
