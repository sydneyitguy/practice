/**
 * HTML5 FileReader API
 * @author: Sebastian Kim
 */
function FileReaderAPI(inputs) {
	var results = new Array();
	var isDone = false;
	var inputs = inputs;	// Files objects
	var info = new Array();
	
	// Constructor
	this.checkSupport = function() {
		if(!(window.File && window.FileReader && window.FileList && window.Blob))
			alert('The File APIs are not fully supported in this browser.');
	}
	
	this.size = function() { return inputs.length; }
	this.getResults = function() { return results; }
	this.isDone = function() { return isDone; }
	
	this.read = function() {
		var reader;
		for (var i=0, f; f=inputs[i]; i++) {
			reader = new FileReader();
			reader.onloadend = function(evt) {	// Asynchronous!! 
				if (evt.target.readyState == FileReader.DONE) { // DONE == 2
					results.push(evt.target.result);
					console.log(results.length + " file(s) read successfully");
					if(results.length == inputs.length)
						isDone = true;
				}
			}
			
			info.push("<li><strong>", f.name, "<"+"/strong> (", (f.type || "n/a"), ") - ", f.size, " bytes<"+"/li>");
			reader.readAsText(f);
		}
	}
	
	this.printInfo = function(output) {
		output.html("<ul>" + info.join("") + "<"+"/ul>");
	}

	return this.checkSupport();
}