

// FIXME: calculate numberOf from width / height?
var NUMBER_OF_COLUMNS = 10;
var NUMBER_OF_ROWS = 15;
var BRICK_SIZE = 30;

// DOM Elements
var canvas;
var context;
var currentButton;

var gridWidth = NUMBER_OF_COLUMNS * BRICK_SIZE;
var gridHeight = NUMBER_OF_ROWS * BRICK_SIZE;
var canvasWidth = 301;
var canvasHeight = 451;

var selectedBrickClass = null;

//var bricksOnGrid = [];

var store;
var grid;

$(document).ready(function() {
	canvas = document.getElementById('grid');
  context = canvas.getContext('2d');
	
	clearCanvas();

	store = new Store();
	grid = new Grid(gridWidth, gridHeight, BRICK_SIZE);
	
	initUI();
	
	draw();
});

function draw() {
	clearCanvas();
	
	context.translate(0.5, 0.5);
	
	grid.draw(context);
}

function clearCanvas() {
	canvas.width = canvasWidth;
  canvas.height = canvasHeight;
}

function initUI() {
	
	/* ---- Canvas Handler ----*/
	canvas.onmouseup = onGridClicked;
	
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

function onGridClicked(event) {
	// event offsetX does not work in all browsers
  var column = Math.floor(event.offsetX / BRICK_SIZE);
  var row = Math.floor(event.offsetY / BRICK_SIZE);
	
	var selectedBrick = grid.getBrickAt(column, row);
	
	if (selectedBrick) {
		selectedBrick.rotation += 90;
		
		clearCanvas();
		draw();
		
	} else {
 		createBrickAt(column, row);
	}
}

function createBrickAt(column, row) {
	if (!selectedBrickClass) return;
	
	var brick = new selectedBrickClass();
	brick.column = column;
	brick.row = row;
	
	grid.addBrick(brick, context);
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
	
	bricksOnGrid = store.getTrack(ID);
	
	for (var i = 0; i < bricksOnGrid.length; i++) {
		bricksOnGrid[i].draw(gridDrawingContext);
	}
}

