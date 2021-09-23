// set up the Pts namespace to make our coding life easier
Pts.namespace(window);

// function drawTile(canvas) sets up a canvas as a tile in this NYT Tiles inspired game
const drawTile = (canvas) => {
  let space = new CanvasSpace(canvas);
  space.setup({ bgcolor: '#97ead2', resize: true, retina: true });

  space.play();
};

document.querySelectorAll('canvas').forEach(canvas => drawTile(canvas));
