class ActionModal {
	constructor() {
		window.actionModal = this;
		this.actionButtons = document.getElementById("actionButtons");
		this.actionContent = document.getElementById("actionContent");
		this.actionForm = document.getElementById("actionForm");

		this.actionTitle = document.getElementById("actionTitle");
		this.actionTitleImg = document.getElementById("actionTitleImg");

		this.actionLoading = document.getElementById("actionLoading");

		this.actionChangeButton = document.getElementById("actionChangeButton");
		this.actionCollectButton = document.getElementById("actionCollectButton");
		this.actionDropButton = document.getElementById("actionDropButton");
		this.actionHealButton = document.getElementById("actionHealButton");
		this.actionNewButton = document.getElementById("actionNewButton");
		this.actionRunButton = document.getElementById("actionRunButton");		
		this.actionUpdateButton = document.getElementById("actionUpdateButton");
		this.actionTestButton = document.getElementById("actionTestButton");

		this.actionUpdateForm = document.getElementById("actionUpdateForm");
		this.actionScriptForm = document.getElementById("actionScriptForm");
		this.actionScriptname = document.getElementById('actionScriptname');
		this.actionScripttext = document.getElementById('actionScripttext');	

		this.actionOutputTitle = document.getElementById("actionOutputTitle");
		this.actionOutputTitleImg = document.getElementById("actionOutputTitleImg");
		this.actionOutputLoading = document.getElementById("actionOutputLoading");
		this.actionOutputContent = document.getElementById("actionOutputContent");		
		
		this.actionUpdateForm.addEventListener('submit', function (evnt){
			evnt.preventDefault();
			updateSend();
		});

		this.actionChangeButton.addEventListener("click", function(){
			actionModal.showUpdate(datastore["userData"]);
		});

		this.actionDropButton.addEventListener('click', function(){dropSend();})
		this.actionTestButton.addEventListener('click', function(){testSend();})
		this.actionRunButton.addEventListener('click', function(){runSend();})

		this.components = [this.actionTitle, this.actionContent,
						   this.actionButtons, this.actionForm];
		this.outputComponents = [this.actionOutputTitle,
								 this.actionOutputContent];

		this.clear();
		this.clearOutput();
	}


	//////////////  api /////////////////////////

	appendUserTitle(data) {
		let u = data["user"];
		let name = u["name"];
		let form = u["form"];
		let imgdir = "images/characters/"
		let img = imgdir+form+"/"+form+"WalkDown.gif";
		messageLog(this.actionTitle, "<h2 style='float:right'; class='text-capitalize'>"
				  +name+"</h2>");
		this.actionTitleImg.setAttribute('src',img);
		this.actionTitle.appendChild(this.actionTitleImg);
	}

	appendOutputUserTitle(data) {
		let u = data["user"];
		let name = u["name"];
		let form = u["form"];
		let imgdir = "images/characters/"
		let img = imgdir+form+"/"+form+"WalkDown.gif";
		messageLog(this.actionOutputTitle, "<h2 style='float:right'; class='text-capitalize'>"
				  +name+"</h2>");
		this.actionOutputTitleImg.setAttribute('src',img);
		this.actionOutputTitle.appendChild(this.actionOutputTitleImg);
	}

	clear() {
		for (let component of this.components) 
			while (component.lastChild) 
				component.removeChild(component.lastChild);
		this.loadingOff();
	}

	clearOutput() {
		for (let component of this.outputComponents) 
			while (component.lastChild) 
				component.removeChild(component.lastChild);
		this.loadingOutputOff();
	}

	loadingOn(){loadingLog();}
	loadingOff(){loadingClear();}
	loadingOutputOn(){loadingOutputLog();}
	loadingOutputOff(){loadingOutputClear();}

	printUser(data){
		if (checkError(data))
			printError(this.actionLoading, data);
		else 
			printUser(this.actionContent, data);
	}

	messageLog(msg) {
		messageLog(this.actionLoading, msg);
	}


	showUpdate() {
		this.clear();
		this.actionContent.appendChild(this.actionUpdateForm);
	}

	showUpdate(data) {
		this.clear();
		this.updateUser(data);
		this.showUser(data);
		this.actionForm.appendChild(this.actionUpdateForm);
	}

	showUser(data) {
		this.clear();
		this.appendUserTitle(data);
		this.printUser(data);
	}

	showHeal(data) {
		this.showUser(data);
		this.updateUser(data);
		this.actionButtons.appendChild(this.actionChangeButton);
		this.actionButtons.appendChild(this.actionHealButton);
		this.actionButtons.appendChild(this.actionNewButton);
	}

	showDrop(data) {
		this.clear();
		this.appendUserTitle(data);
		this.updateUser(data);

		actionModal.actionScriptname.value = '';
		actionModal.actionScripttext.value = '';
		this.actionForm.appendChild(this.actionScriptForm);

		this.actionButtons.appendChild(this.actionRunButton);
		this.actionButtons.appendChild(this.actionTestButton);
		this.actionButtons.appendChild(this.actionDropButton);
	}
	
	showCollect() {
		actionModal.clear();
		let data = JSON.parse(this.getAttribute("data-script"));
		actionModal.appendUserTitle(data);

		let scriptname = data['filename'];
		let scripttext = data['filetext'];
		actionModal.actionScriptname.value = scriptname;
		actionModal.actionScripttext.value = scripttext;
		actionModal.actionForm.appendChild(actionModal.actionScriptForm);
		if (connected)
			if (window.user.ID === data['user']['id'])
				actionModal.actionButtons.appendChild(actionModal.actionRunButton);
			else
				actionModal.actionButtons.appendChild(actionModal.actionCollectButton);
		else
			actionModal.actionButtons.appendChild(actionModal.actionTestButton);
	}

	showError() {
		actionModal.clear();
		let output = datastore['error']['msg'];
		actionModal.actionContent.innerHTML = '<span style="color: darkred;">' + output+ '</span>';
	}

	showOutput(data) {
		actionModal.clearOutput();
		actionModal.appendOutputUserTitle(data);
		let output = data['result']['output'];
		actionModal.actionOutputContent.value = output; // must include newlines
	}

	updateCollect() {
		actionModal.appendUserTitle(datastore['userData']);
	}

	updateUser(data) {
		user.changeID(data["user"]["id"]);
		user.character = data["user"]["form"];
		user.name = data["user"]["name"];
		user.location = data["user"]["location"];
		user.total_collected = data["user"]["total_collected"];
		user.total_dropped = data["user"]["total_dropped"];
		user.update(user.row, user.col)
	}

}