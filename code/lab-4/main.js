// set up the Pts namespace to make our coding life easier
Pts.namespace(window);

const colors = ['#46237a', '#3ddc97', '#ff495c'];
const shapes = ['circle', 'rectangle', 'triangle'];
let points = 0;
let combo = 1;
let selection = {
  color: -1,
  shape: -1
};
let removalEvent = false;
let activatedStyle = false;

// function boundLastItem(array, lower, upper) will wrap the last item of array around the bounds set by lower and upper
function boundLastItem(array, lower, upper) {
  if (array[array.length - 1] > upper) {
    array.pop();
    array.push(lower);
  }
  if (array[array.length - 1] < lower) {
    array.pop();
    array.push(upper);
  }
}

// function createRand3Order() creates a javascript array with 3 unique integer values between 0 and 2 that determine the order we index through other arrays
function createRand3Order() {
  let order = [];
  let d = Math.random() < 0.5 ? -1 : 1;
  order.push(Math.floor(Math.random() * 3));
  order.push(order[order.length - 1] + d);
  boundLastItem(order, 0, 2);
  order.push(order[order.length - 1] + d);
  boundLastItem(order, 0, 2);
  return order;
}

// function trackLayerWithClassList(el, colorArray, shapeArray) is a little hack I'm doing to use CSS classes to keep track (and store the state in an accessible manner) of the topmost layer of each canvas
// I wouldn't need to do any of this if I had made my life a little bit easier by programming with an OOP mindset to begin with, but all the Pts.js examples I was reading were so functional and they looked so clean, that I wanted to try and do the same. But a functional-ish coding paradigm is *very* much not my strong suite.
function trackLayerWithClassList(el, colorArray, shapeArray) {
  el.classList.remove('color-layer-0');
  el.classList.remove('color-layer-1');
  el.classList.remove('color-layer-2');
  el.classList.remove('shape-layer-0');
  el.classList.remove('shape-layer-1');
  el.classList.remove('shape-layer-2');
  if (colorArray.length > 0 && shapeArray.length > 0) {
    el.classList.add(`color-layer-${colorArray[colorArray.length - 1]}`);
    el.classList.add(`shape-layer-${shapeArray[shapeArray.length - 1]}`);
  }
}

// function checkForEligibleMoves(canvas, checkParent) checks the specified canvas aganist all other canvases on the DOM, and uses their CSS classes to determine if that canvas can be combo'd into another canvas (return true/false)
// the checkParent bool flag determines wether the parent divs of the canvases that are being check are allowed to be "active" or not
function checkForEligibleMoves(canvas, checkParent) {
  let eligibleMoves = false;
  document.querySelectorAll('canvas').forEach((documentCanvas) => {
    if (canvas !== documentCanvas) {
      if (canvas.className == documentCanvas.className && canvas.className != '') {
        if (!checkParent || (checkParent && !documentCanvas.parentElement.classList.contains('active-container'))) {
          eligibleMoves = true;
        }
      }
    }
  });
  return eligibleMoves;
}

// function drawTile(canvas) sets up a canvas as a tile in this NYT Tiles inspired game
function drawTile(canvas) {
  let space = new CanvasSpace(canvas);
  space.setup({ bgcolor: '#fcfcfc', resize: true, retina: true });
  let form = space.getForm();
  let layerColors = createRand3Order();
  let layerShapes = createRand3Order();
  let layerPositions = new Group();
  let canvasSize = new Pt();
  let potentialFutureRemoval = false;

  trackLayerWithClassList(canvas, layerColors, layerShapes);

  space.add({
    // function start(bound) is called once upon initializing the canvas, this is where most of the setup stuff goes
    start: (bound) => {
      canvasSize = bound.size;
      let margin = canvasSize.clone().scale(0.1);
      for (let i = 0; i < 3; i++) {
        layerPositions.push(Num.randomPt(margin, canvasSize.$subtract(margin)));
      }
    },

    // function animate() is called once per frame (like 60-ish times per seccond, give or take a some depending on how easy or hard it is to render each frame)
    animate: () => {
      if (removalEvent && potentialFutureRemoval) {
        layerColors.pop();
        layerShapes.pop();
        layerPositions.pop();
        trackLayerWithClassList(canvas, layerColors, layerShapes);
        removalEvent = false;
        potentialFutureRemoval = false;
      }
      if (!activatedStyle) {
        if (potentialFutureRemoval) {
          potentialFutureRemoval = false;
        }
        if (canvas.parentElement.classList.contains('active-container')) {
          canvas.parentElement.classList.remove('active-container');
          space.background = '#fcfcfc';
        }
      }
      let strokeWidth = canvasSize.magnitude() / 6;
      let shapeSize = canvasSize.magnitude() / 2.25;
      for (let i = 0; i < 3; i++) {
        form.strokeOnly(colors[layerColors[i]], strokeWidth, 'round');
        switch (shapes[layerShapes[i]]) {
          case 'circle':
            form.circle(Circle.fromCenter(layerPositions[i], shapeSize / 1.25));
            break;
          case 'rectangle':
            form.rect(Rectangle.fromCenter(layerPositions[i], shapeSize * 1.25));
            break;
          case 'triangle':
            form.polygon(Triangle.fromCenter(layerPositions[i], shapeSize));
            break;
          default:
            break;
        }
      }
    },

    // function action(type) is called every time a mouse event or touch event is triggered on the canvas
    action: (type) => {
      if (type == 'down') {
        if (selection.color == -1 && selection.shape == -1) {
          selection = {
            color: layerColors[layerColors.length - 1],
            shape: layerShapes[layerShapes.length - 1]
          };
          potentialFutureRemoval = true;
          activatedStyle = true;
          canvas.parentElement.classList.add('active-container');
          space.background = '#eaeaea';
        } else if (selection.color == layerColors[layerColors.length - 1]
                && selection.shape == layerShapes[layerShapes.length - 1]
                && !potentialFutureRemoval) {
          points += combo;
          if (combo == 1) {
            removalEvent = true;
          }
          if (checkForEligibleMoves(canvas, true)) {
            combo++;
            activatedStyle = true;
            canvas.parentElement.classList.add('active-container');
            space.background = '#eaeaea';
            let colorNames = ['purple', 'green', 'red'];
            document.querySelector('.slot').innerHTML = `${combo}x on ${colorNames[selection.color]} ${shapes[selection.shape]}!`;
          } else {
            combo = 1;
            selection = {
              color: -1,
              shape: -1
            };
            document.querySelector('.slot').innerHTML = 'None';
            activatedStyle = false;
          }
          layerColors.pop();
          layerShapes.pop();
          layerPositions.pop();
          trackLayerWithClassList(canvas, layerColors, layerShapes);
        } else {
          selection = {
            color: -1,
            shape: -1
          };
          document.querySelector('.slot').innerHTML = 'None';
          activatedStyle = false;
          if (combo > 1) {
            combo = 1;
          } else {
            points--;
          }
        }
        let gameWon = true;
        let eligibleMoves = false;
        document.querySelectorAll('canvas').forEach((documentCanvas) => {
          if (documentCanvas.className.length > 0) {
            gameWon = false;
          }
          if (checkForEligibleMoves(documentCanvas, false)) {
            eligibleMoves = true;
          }
        });
        if (gameWon) {
          score *= 2;
          document.querySelector('header').querySelector('p').innerHTML = `You win! You scored ${points} points!`;
        }
        if (!eligibleMoves) {
          document.querySelector('header').querySelector('p').innerHTML = `Game over! You got ${points} points! Sometimes it's the luck of the draw, sometimes it's how you play your cards. Hit refresh to try again for a higer score!`;
        }
      }
    },

    // function resize(size) is called every time the canvas's size changes
    resize: (size) => {
      let scale = size.size.$divide(canvasSize);
      layerPositions.scale(scale);
      canvasSize = size.size;
    }
  });

  space.bindMouse().bindTouch().play();
}

document.querySelectorAll('canvas').forEach(canvas => drawTile(canvas));
