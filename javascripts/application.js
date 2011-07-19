

// FIXME: calculate numberOf from width / height?
var NUMBER_OF_COLUMNS = 10;
var NUMBER_OF_ROWS = 15;
var BRICK_SIZE = 30;

// DOM Elements
var gridCanvasElement;
var gridDrawingContext;
var currentButton;

var gridWidth = NUMBER_OF_COLUMNS * BRICK_SIZE;
var gridHeight = NUMBER_OF_ROWS * BRICK_SIZE;
var canvasWidth = 301;
var canvasHeight = 451;

var selectedBrickClass = null;
var bricksOnGrid = [];

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

  for (var column = 0; column < NUMBER_OF_COLUMNS; column++) {
    gridDrawingContext.moveTo(column * BRICK_SIZE, 0);
    gridDrawingContext.lineTo(column * BRICK_SIZE, gridHeight);
  }

  for (var row = 0; row < NUMBER_OF_ROWS; row++) {
    gridDrawingContext.moveTo(0, row * BRICK_SIZE);
    gridDrawingContext.lineTo(gridWidth, row * BRICK_SIZE);
  }

  gridDrawingContext.stroke();
};

function onGridClicked(event) {
	// event offsetX does not work in all browsers
  var column = Math.floor(event.offsetX / BRICK_SIZE);
  var row = Math.floor(event.offsetY / BRICK_SIZE);
	
	var selectedBrick = getBrickAt(column, row);
	
	if (selectedBrick) {
		selectedBrick.rotation += 90;
		
		drawAll();
	} else {
 		createBrickAt(column, row);
	}
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

function getBrickAt(column, row) {
	for (var i = 0; i < bricksOnGrid.length; i++) {
		if (bricksOnGrid[i].column === column && bricksOnGrid[i].row === row) {
			return bricksOnGrid[i];
		}
	}
	
	return null;
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
	
	bricksOnGrid = store.getTrack(ID);
	
	for (var i = 0; i < bricksOnGrid.length; i++) {
		bricksOnGrid[i].draw(gridDrawingContext);
	}
}

function drawAll() {
	setupGrid();
  drawGrid();	
	
	for (var i = 0; i < bricksOnGrid.length; i++) {
		bricksOnGrid[i].draw(gridDrawingContext);
	}
}

