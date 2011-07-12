var Store = function() {
	this.tracks = [];
}

Store.prototype.saveTrack = function(brickArray) {
	
	var bricksValues = brickArray.map(this.getBrickData);
	var bricksValuesJSON = JSON.stringify(brickArray);

	return 0;
}

Store.prototype.getTrack = function(id) {
	
}

Store.prototype.getBrickData = function(brick) {
	var values = {};
	
	values.column = brick.column;
	values.row = brick.row;
	values.type = brick.type;
	
	return values;
}