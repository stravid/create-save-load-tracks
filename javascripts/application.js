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

$(document).ready(function() {
  setupGrid();

  drawGrid();
});

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