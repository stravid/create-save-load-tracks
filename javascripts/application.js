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

	resetGrid();
	initUI();
	
	store = new Store();
});

function resetGrid() {
  setupGrid();
  drawGrid();	
	bricksOnGrid = [];
}

function initUI() {
	
	/* ---- Canvas Handler ----*/
	gridCanvasElement.onmouseup = onGridClicked;
	
	/* ---- Brick Button Handler ----*/
	$("#square-brick").click(function(event) {
		event.preventDefault();
		setBrick("square-brick");
	});
	
	$("#triangle-brick").click(function(event) {
		event.preventDefault();
		setBrick("triangle-brick");
	});
	
	/* ---- Clear & Save Button Handlers ----*/
	$("#save-track").click(function(event) {
		event.preventDefault();
		
		var trackID = store.saveTrack(bricksOnGrid);
		addTrackToList(trackID, $("#track-name").val());
	});
	
	$("#clear-track").click(function(event) {
		event.preventDefault();
		resetGrid();
	});
	
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

function addTrackToList(ID, name) {
	var p = $("<p>");
	var a = $('<a href="">Load</a>');
	
	a.click(function(event) {
		event.preventDefault();
		loadTrack(ID);	
	});
	
	p.append(a).append(" - " + name);
	
	$("#tracks-container").append(p);
}

function loadTrack(ID) {
	resetGrid();
	
	for (var i = 0; i < bricksOnGrid.length; i++) {
		bricksOnGrid[i].draw(gridDrawingContext);
	}
	
	bricksOnGrid = store.getTrack(ID);
}

