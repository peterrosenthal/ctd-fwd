// set up the Pts namespace to make our coding life easier
Pts.namespace(window);

const colors = ['#816e94', '#74226c', '#4b2142'];
const shapes = ['circle', 'rectangle', 'triangle'];
let points = 0;
let step = 1;
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

// function drawTile(canvas) sets up a canvas as a tile in this NYT Tiles inspired game
function drawTile(canvas) {
  let space = new CanvasSpace(canvas);
  space.setup({ bgcolor: '#97ead2', resize: true, retina: true });
  let form = space.getForm();
  let layerColors = createRand3Order();
  let layerShapes = createRand3Order();
  let layerPositions = new Group();
  let canvasSize = new Pt();
  let potentialFutureRemoval = false;

  canvas.classList.remove('color-layer-0');
  canvas.classList.remove('color-layer-1');
  canvas.classList.remove('color-layer-2');
  canvas.classList.remove('shape-layer-0');
  canvas.classList.remove('shape-layer-1');
  canvas.classList.remove('shape-layer-2');
  canvas.classList.add(`color-layer-${layerColors[layerColors.length - 1]}`);
  canvas.classList.add(`shape-layer-${layerShapes[layerShapes.length - 1]}`);

  space.add({
    start: (bound) => {
      canvasSize = bound.size;
      let margin = canvasSize.clone().scale(0.1);
      for (let i = 0; i < 3; i++) {
        layerPositions.push(Num.randomPt(margin, canvasSize.$subtract(margin)));
      }
    },

    animate: () => {
      if (removalEvent && potentialFutureRemoval) {
        layerColors.pop();
        layerShapes.pop();
        layerPositions.pop();
        canvas.classList.remove('color-layer-0');
        canvas.classList.remove('color-layer-1');
        canvas.classList.remove('color-layer-2');
        canvas.classList.remove('shape-layer-0');
        canvas.classList.remove('shape-layer-1');
        canvas.classList.remove('shape-layer-2');
        canvas.classList.add(`color-layer-${layerColors[layerColors.length - 1]}`);
        canvas.classList.add(`shape-layer-${layerShapes[layerShapes.length - 1]}`);
        removalEvent = false;
        potentialFutureRemoval = false;
      }
      if (!activatedStyle) {
        if (potentialFutureRemoval) {
          potentialFutureRemoval = false;
        }
        if (canvas.parentElement.classList.contains('active-container')) {
          canvas.parentElement.classList.remove('active-container');
          space.background = '#97ead2';
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
          space.background = '#8bceb0';
        } else if (selection.color == layerColors[layerColors.length - 1]
                && selection.shape == layerShapes[layerShapes.length - 1]
                && !potentialFutureRemoval) {
          points += step;
          step++;
          layerColors.pop();
          layerShapes.pop();
          layerPositions.pop();
          activatedStyle = true;
          canvas.parentElement.classList.add('active-container');
          space.background = '#8bceb0';
          let colorNames = ['light', 'medium', 'dark'];
          document.querySelector('.slot').innerHTML = `${step}x on ${colorNames[selection.color]} ${shapes[selection.shape]}!`;
          canvas.classList.remove('color-layer-0');
          canvas.classList.remove('color-layer-1');
          canvas.classList.remove('color-layer-2');
          canvas.classList.remove('shape-layer-0');
          canvas.classList.remove('shape-layer-1');
          canvas.classList.remove('shape-layer-2');
          canvas.classList.add(`color-layer-${layerColors[layerColors.length - 1]}`);
          canvas.classList.add(`shape-layer-${layerShapes[layerShapes.length - 1]}`);
          if (step == 2) {
            removalEvent = true;
          }
        } else {
          selection = {
            color: -1,
            shape: -1
          };
          document.querySelector('.slot').innerHTML = 'None';
          activatedStyle = false;
          if (step > 1) {
            step = 1;
          } else {
            points--;
          }
        }
        console.log(points);
      }
    },

    resize: (size) => {
      let scale = size.size.$divide(canvasSize);
      layerPositions.scale(scale);
      canvasSize = size.size;
    }
  });

  space.bindMouse().play();
}

document.querySelectorAll('canvas').forEach(canvas => drawTile(canvas));
