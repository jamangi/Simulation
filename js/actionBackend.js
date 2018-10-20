/////// generic ///////
function checkError(data) {
	if (data === undefined || data["msg"] !== undefined) 
		return true; 
	else return false;
}


function clearLog(ele) {
	ele.innerHTML = '';
}

function loadingClear() {
	messageLog(actionModal.actionLoading, "");
}
function loadingLog() {
	let load = "<span style='color:darkgreen;'> loading... </span>";
	messageLog(actionModal.actionLoading, load);
}
function loadingReturn(html) {
	messageLog(actionModal.actionLoading, html);
}
function loadingOutputClear(){
	messageLog(actionModal.actionOutputLoading, "");
}

function loadingOutputLog (){
	let load = "<span style='color:darkgreen;'> loading... </span>";
	messageLog(actionModal.actionOutputLoading, load);
}
function loadingOutputReturn(html) {
	messageLog(actionModal.actionOutputLoading, html);
}
function messageLog(ele, msg) {
	ele.innerHTML = msg;
}

function printError(display, data) {
	messageLog(display, data["msg"]);
}

function printUser(display, data) {
	let props = ["name", "id", "location",
				 "character", "form", "material",
				 "total_collected", "total_dropped"]

	let status = "healthy"
	if (data["user"]["form"] === "ghost")
		status = "ghost"

	for (let prop of props){
		let key = prop.replace("total_", "");
		let value = data["user"][prop];
		if (prop === "form") {
			key = "status";
			value = status;
		}
		returnLog(display, key +": "+value);
	}
}


function returnLog(ele, msg) {
	if (ele.innerHTML === '')
		ele.innerHTML = msg;
	else
		ele.innerHTML = ele.innerHTML + "<br>" + msg;
}

function reconnect(data) {
	toolbar.showConnect();
	actionModal.messageLog(data['msg'])
	actionModal.showSet();
}
////////// Drop (drop file) ////////////////
function showDrop(){
	toolbar.showStatus(datastore["userData"]);
}
function dropCallback(data) {
	if (checkError(data))
		reconnect(data);
	else{
		let script = data["script"];
		let worth = script["material"]
		let img = "<img src='images/icons/material.gif' width=10 height=15>"
		loadingReturn("Dropped script is worth "+ worth +" " + img + "");
		setInterval(showDrop, 2000);
		toolbar.showStatus(data);
		map.layScript(data);
	}
}

function dropSend() {
	let actionScriptname = document.getElementById("actionScriptname");
	let actionScripttext = document.getElementById("actionScripttext");
	if (actionScriptname.value.lenth === 0 || actionScripttext.value.length === 0)
		actionModal.messageLog("<small style='color:darkred;'>script name and text needed</small>")
	else {
		actionModal.loadingOn();
		data = {filename: actionScriptname.value,
				filetext: actionScripttext.value,
				row: user.row, col: user.col};
		datastore.drop(dropCallback, data)
	}
}

////////// Run (Run scripts) ///////////
function runCallback(data) {
	if (checkError(data))
		reconnect(data);
	else{
		actionModal.updateUser(data);
		toolbar.showStatus(data);
		actionModal.updateCollect(datastore['userData']);
		actionModal.showOutput(data);
		if (data['result']['has_heart'])
			loadingOutputReturn("<small style='color:darkgreen;'>script ran safely</small>");
		else if (data['result']['has_heart'] !== null)
			loadingOutputReturn("<small style='color:orange;'>heart file was destroyed</small>");
		else
			loadingOutputReturn("<small style='color:darkred;'>script failed to run</small>");

	}
}

function runSend() {
	let actionScriptname = document.getElementById("actionScriptname");
	let actionScripttext = document.getElementById("actionScripttext");
	if (actionScriptname.value.lenth === 0 || actionScripttext.value.length === 0)
		actionModal.messageLog("<small style='color:darkred;'>script name and text needed</small>")
	else {
		actionModal.clearOutput();
		actionModal.appendOutputUserTitle(datastore['userData']);
		actionModal.loadingOutputOn();
		data = {filename: actionScriptname.value,
				filetext: actionScripttext.value,
				row: user.row, col: user.col};
		datastore.run(runCallback, data)
	}
}

////////// Set (set username, character, and ip) ///////////
function setFormUpdate(char) {
	document.getElementById("actionRadioInput").value = char;
}

function setCallback(data) {
	actionModal.clear();
	if (checkError(data))
		reconnect(data)
	else{
		toolbar.showStatus(data);
		actionModal.showHeal(data);
		window.connected = true;
	}
}

function setSend() {
	let charInput = document.getElementById("actionRadioInput").value;
	let nameEle = document.getElementById("actionNameInput")
	let nameInput = nameEle.value;

	if (charInput.lenth === 0 || nameInput.length === 0)
		actionModal.messageLog("<small style='color:darkred;'>character and name must be selected</small>")
	else {
		data = {name: nameInput, character: charInput,
				location: "training"}
		datastore.set(setCallback, data)
	}
	// nameEle.value = '';
}

////////// Test (test script) ///////////
function testCallback(data) {
	if (checkError(data))
		reconnect(data);
	else{
		let script = data["script"];
		let worth = data["material"]
		let img = "<img src='images/icons/material.gif' width=10 height=15>"
		loadingReturn("Script is worth "+ worth +" " + img + "");
		if (connected)
			setTimeout(showDrop, 2000);
	}
}

function testSend() {
	let actionScriptname = document.getElementById("actionScriptname");
	let actionScripttext = document.getElementById("actionScripttext");
	if (actionScriptname.value.lenth === 0 || actionScripttext.value.length === 0)
		actionModal.messageLog("<small style='color:darkred;'>script name and text needed</small>")
	else {
		actionModal.loadingOn();
		data = {filename: actionScriptname.value,
				filetext: actionScripttext.value,
				row: user.row, col: user.col};
		datastore.test(testCallback, data)
	}
}


////////// Touch (fetch username, character, and ip) ///////////
function touchCallback(data) {
	actionModal.loadingOff();
	if (checkError(data))
		reconnect(data)
	else{
		toolbar.showStatus(data);
		actionModal.showHeal(data);
		window.connected = true;
	}
}
function touchSend() {
	actionModal.loadingOn();
	datastore.touch(touchCallback);
}

