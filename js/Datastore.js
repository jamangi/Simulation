// holds all scripts in memory 

class Datastore {

	constructor(){
		window.datastore = this;
	}

	check(callback, data){this.ajaxCall("GET", "check", callback, data);}
	collect(callback, data){this.ajaxCall("POST", "collect", callback, data);}
	dump(callback, data){this.ajaxCall("POST", "dump", callback, data);}
	drop(callback, data) {this.ajaxCall("POST", "drop", callback, data);}
	edit(callback, data){this.ajaxCall("POST", "edit", callback, data);}
	full_restore(callback, data){this.ajaxCall("GET", "full_restore", callback, data);}
	heal(callback, data){this.ajaxCall("GET", "heal", callback, data);}
	load(callback, data){this.ajaxCall("GET", "load", callback, data);}
	run(callback, data){this.ajaxCall("POST","run", callback, data);}
	set(callback, data){this.ajaxCall("POST","set", callback, data);}
	start(callback, data){this.ajaxCall("GET","start", callback, data);}
	status(callback, data){this.ajaxCall("GET","status", callback, data);}
	test(callback, data){this.ajaxCall("POST","test", callback, data);}
	touch(callback, data){this.ajaxCall("GET","touch", callback, data);}


	ajaxCall(method, endpoint, callback, data){
		let query = "";
		if (method == "GET" && data !== undefined)
			query = "/"+data;
		let service = window.dhdomain+endpoint+query;
		let xhr = new XMLHttpRequest();
		let datastore = this;
		xhr.open(method, service, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
	        	let json = JSON.parse(xhr.responseText);
	        	datastore[endpoint+"Data"] = json;
	        	if (endpoint !== "test" && endpoint !== "load")
	        		datastore["userData"] = json;
	        	if (callback !== undefined) {
	        		callback(json);
	        	}
	    	}
		}
		if (method === "POST"){
			xhr.setRequestHeader("Content-Type", "application/json");
			let toSend = JSON.stringify(data);
			xhr.send(toSend);
		}
		else
			xhr.send();
		
	}

}