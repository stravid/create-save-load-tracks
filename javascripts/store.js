var Store = function() {
	this.tracks = [];
}

Store.prototype.saveTrack = function(brickArray) {
	
	var saveString = "";
	
	for (var i = 0; i < brickArray.length; i++) {
		if (saveString.length > 0) saveString += ";";
		saveString += brickArray[i].toString();
	}
	
	return id;
}

Store.prototype.getTrack = function(id) {
	
}