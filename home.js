window.onload = function() {
	new Datastore();
	new ActionModal();
	new Toolbar();
	window.connected = false;
	window.dhdomain = "http://localhost:9080/"
	let map = emptyWood();
	let userCharacter = makeCharacter(map, 2, 2, "lockune");
	let user = new User(userCharacter)
}