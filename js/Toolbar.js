class Toolbar {
	constructor (){
		window.toolbar = this;
		this.scriptButton = document.getElementById("toolbarScript");
		this.actionButton = document.getElementById("toolbarAction");

		this.actionButton.addEventListener('click', function (evnt){
			touchSend();
		});

		this.scriptButton.addEventListener('click', function (envt){
			actionModal.showDrop(datastore['userData']);
		});

		this.showConnect();
	}

	showConnect() {
		this.scriptButton.setAttribute("disabled", true);
		this.actionButton.innerHTML = "Connect"
		this.actionButton.setAttribute("class", "btn btn-info");
	}

	showStatus(data) {
		this.scriptButton.removeAttribute("disabled");
		let user = data["user"]
		let form = user["form"]
		this.actionButton.innerHTML = "<span class='text-capitalize'>" + user["name"] + "</span>";
		if (form === "ghost")
			this.actionButton.setAttribute("class", "btn btn-warning");
		else
			this.actionButton.setAttribute("class", "btn btn-success");
	}
}