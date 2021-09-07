// --------------------------------------------------------------------------
// global variables
// --------------------------------------------------------------------------
// debugging flag, set to true to enable console.log debugging
const debugging = false;
// state variables need to be global because they hold the state of the application
let watering = false;
let waterOverPlant = false;
let plantWaterAmount = 0;
let plantWaterLevel = 0;
let wateringIntervalId = null;
// document element variables
// document.getElementById is a relatively expensive call, the cost of using it as a global variable rather than calling it **every** mouse movement is definitely worth it.
const wateringCan = document.getElementById('wateringCan');
const plant = document.getElementById('plant');

// --------------------------------------------------------------------------
// functions
// --------------------------------------------------------------------------
const followCursor = (object, event) => {
  const width = event.clientX - object.clientWidth / 2;
  const height = event.clientY;
  object.style.left = `${width}px`;
  object.style.top = `${height}px`;
};

const pourWateringCan = () => {
  if (watering && waterOverPlant) {
    plantWaterAmount++;
    const newPlantWaterLevel = Math.floor(plantWaterAmount / 25);
    if (newPlantWaterLevel > plantWaterLevel && newPlantWaterLevel < 4) {
      plantWaterLevel = newPlantWaterLevel;
      plant.src = `images/plant-level${newPlantWaterLevel}.png`;
      plant.alt = `An illustrated plant that can be grown taller by holding down the mouse to water. The plant is currently ${100/3 * newPlantWaterLevel}% grown.`
    }
    if (debugging) {
      console.log(`plantWaterAmount: ${plantWaterAmount}`);
      console.log(`plantWaterLevel: ${plantWaterLevel}`);
    }
    setTimeout(pourWateringCan, 200);
  }
};

const setWatering = (value) => {
  watering = value;
  if (watering) {
    wateringCan.src = 'images/wateringcan-tipped.gif';
    pourWateringCan();
  } else {
    wateringCan.src = 'images/wateringcan-upright.png';
  }
  if (debugging) {
    console.log(`set watering to ${value}`);
  }
};

const setWaterOverPlant = (value) => {
  waterOverPlant = value;
  if (watering) {
    pourWateringCan();
  }
  if (debugging) {
    console.log(`set waterOverPlant to ${value}`);
  }
};

// --------------------------------------------------------------------------
// event listeners
// --------------------------------------------------------------------------
document.addEventListener('mousemove', (event) => {
  followCursor(wateringCan, event);
});
document.addEventListener('mousedown', () => {
  setWatering(true);
});
document.addEventListener('mouseup', () => {
  setWatering(false);
});
plant.addEventListener('mouseenter', () => {
  setWaterOverPlant(true);
});
plant.addEventListener('mouseleave', () => {
  setWaterOverPlant(false);
});
// attempt to disable image dragging on the plant, we can't do it in css like we did for the watering can, so we need to do it in js
plant.addEventListener('dragstart', () => {});
plant.addEventListener('drag', () => {});
plant.addEventListener('dragenter', () => {});
