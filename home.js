window.onload = function() {
	new Datastore();
	new ActionModal();
	new Toolbar();
	window.connected = false;
	window.dhdomain = "http://localhost:9080/"
	window.selectedId = null;
	let map = emptyWood();
	let userCharacter = makeCharacter(map, 3, 3, "lockune");
	let user = new User(userCharacter)
}