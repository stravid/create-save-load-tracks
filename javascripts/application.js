var gridCanvasElement;
var gridDrawingContext;

// FIXME: calculate numberOf from width / height?
var numberOfColumns = 10;
var numberOfRows = 15;
var brickSize = 30;
var gridWidth = numberOfColumns * brickSize;
var gridHeight = numberOfRows * brickSize;
var canvasWidth = 301;
var canvasHeight = 451;

var selectedBrickClass = null;
var bricksOnGrid = [];
var currentButton = null;

var store;

$(document).ready(function() {
  setupGrid();
  drawGrid();
	
	initUI();
	
	store = new Store();
});

function initUI() {
	
	gridCanvasElement.onmouseup = onGridClicked;
	
	document.getElementById("square-brick").onmouseup = function() { setBrick("square-brick") };
	document.getElementById("triangle-brick").onmouseup = function() { setBrick("triangle-brick") };
	
	document.getElementById("save-track").onmouseup = onSaveTrack;
	
}

function setupGrid() {
  gridCanvasElement = document.getElementById('grid');
  gridDrawingContext = gridCanvasElement.getContext('2d');

  gridCanvasElement.width = canvasWidth;
  gridCanvasElement.height = canvasHeight;

  gridDrawingContext.translate(0.5, 0.5);
};

function drawGrid() {
  gridDrawingContext.beginPath();

  gridDrawingContext.moveTo(0, 0);
  gridDrawingContext.lineTo(gridWidth, 0);
  gridDrawingContext.lineTo(gridWidth, gridHeight);
  gridDrawingContext.lineTo(0, gridHeight);
  gridDrawingContext.lineTo(0, 0);

  for (var column = 0; column < numberOfColumns; column++) {
    gridDrawingContext.moveTo(column * brickSize, 0);
    gridDrawingContext.lineTo(column * brickSize, gridHeight);
  }

  for (var row = 0; row < numberOfRows; row++) {
    gridDrawingContext.moveTo(0, row * brickSize);
    gridDrawingContext.lineTo(gridWidth, row * brickSize);
  }

  gridDrawingContext.stroke();
};

function onSaveTrack() {
	store.saveTrack(bricksOnGrid);
}

function onGridClicked(event) {
  var column = Math.floor(event.offsetX / brickSize);
  var row = Math.floor(event.offsetY / brickSize);
	
  createBrickAt(column, row);
}

function createBrickAt(column, row) {
	if (!selectedBrickClass) return;
	
	var brick = new selectedBrickClass();
	
	brick.column = column;
	brick.row = row;
	
	brick.draw(gridDrawingContext);
	
	bricksOnGrid.push(brick);
}

function setBrick(buttonID) {
	
	if (currentButton) {
		currentButton.removeAttr("disabled");
	}
	
	currentButton = $("#" + buttonID);
	currentButton.attr("disabled", "disabled");
	
	switch (buttonID) {
		
		case "square-brick": 
			selectedBrickClass = Square;    
		break;
		
		case "triangle-brick":
			selectedBrickClass = Triangle;
		break;
	}
}

