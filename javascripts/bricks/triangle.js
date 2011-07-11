var Triangle = function() {
  this.row = 0;
  this.column = 0;
	this.type = "Triangle";
}

Triangle.prototype.draw = function(context) {
	
  context.save();
	
	context.translate(this.column * brickSize, this.row * brickSize);
  context.beginPath();
	
  context.fillColor = 0;
  context.moveTo(0, 0);
  context.lineTo(brickSize, brickSize);
  context.lineTo(0, brickSize);
	
  context.closePath();
	
  context.fill();
	
  context.restore();
}