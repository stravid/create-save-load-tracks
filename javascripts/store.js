var Store = function() {
	this.tracks = [];
}

Store.prototype.saveTrack = function(brickArray) {
	
	var bricksValues = brickArray.map(this.getDataForBrick);
	var bricksValuesJSON = JSON.stringify(brickArray);
	
	/* this would be where one could send the data to an actual 
	   database - in this example it's only saved array  */
	this.tracks.push(bricksValuesJSON);

	return this.tracks.length - 1;
}

Store.prototype.getTrack = function(id) {
	var bricksValuesJSON = this.tracks[id];
	var bricksValues = JSON.parse(bricksValuesJSON);
	
	return bricksValues.map(this.getBrickForData);
}

Store.prototype.getDataForBrick = function(brick) {
	var values = {};
	
	values.column = brick.column;
	values.row = brick.row;
	values.type = brick.type;
	
	return values;
}

Store.prototype.getBrickForData = function(brickData) {
	var brick = new window[brickData.type]();
	
	brick.column = brickData.column;
	brick.row = brickData.row;
	
	return brick;
}