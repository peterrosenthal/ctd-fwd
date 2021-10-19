import * as THREE from 'three';
import { BoundaryBox } from './BoundaryBox';
import { CryptoType, WorldSceneObjectSpawner, WorldSceneObjectType } from './ObjectSpawner';
import { WorldSceneSystem } from './WorldSceneSystem';

// init world-scene system
const system = new WorldSceneSystem({
  gravity: -9.8,
  cameraFov: 60,
  cameraNear: 0.1,
  cameraFar: 1000,
  cameraPos: new THREE.Vector3(0, 2, 10),
  directionalLightIntensity: 0.8,
  directionalLightPosition: new THREE.Vector3(-1, 2, 4),
  ambientLightIntensity: 0.2,
});

// boundary box
const boundary = new BoundaryBox({
  position: new THREE.Vector3(0, -3, 7),
  width: 12,
  height: 10,
  depth: 18,
  color: 0x4c5f6b,
});
system.add(boundary);

// object spawner
const spawner = new WorldSceneObjectSpawner({
  system: system,
  type: WorldSceneObjectType.COAL,
  crypto: CryptoType.BITCOIN,
  position: new THREE.Vector3(0, 7, 1),
  width: 11,
  depth: 5,
});

// cryptocurrency selector
const crypto = document.getElementById('crypto') as HTMLSelectElement;
function changeSpawnerCrypto(): void {
  switch (crypto.value) {
    case 'bitcoin':
      spawner.options.crypto = CryptoType.BITCOIN;
      break;
    case 'ethereum':
      spawner.options.crypto = CryptoType.ETHEREUM;
      break;
    case 'tezos':
      spawner.options.crypto = CryptoType.TEZOS;
      break;
    default:
      break;
  }
}
crypto.addEventListener(('change'), () => {
  changeSpawnerCrypto();
  spawner.reset();
});
changeSpawnerCrypto();

// measurement/object selector
const measurement = document.getElementById('measurement') as HTMLSelectElement;
function changeSpawnerObject(): void {
  switch (measurement.value) {
    case 'coal':
      spawner.options.type = WorldSceneObjectType.COAL;
      break;
    case 'car':
      spawner.options.type = WorldSceneObjectType.CAR;
      break;
    case 'city':
      spawner.options.type = WorldSceneObjectType.CITY;
      break;
    default:
      // default cube
      spawner.options.type = WorldSceneObjectType.CUBE;
      break;
  }
}
measurement.addEventListener(('change'), () => {
  changeSpawnerObject();
  spawner.reset();
});
changeSpawnerObject();

// animation loop
function animate(): void {
  // run CANNON simulation
  system.step();

  // sync CANNON to THREE
  for (const object of spawner.objects) {
    object.syncMeshAndBody();
  }

  // render THREE
  system.render();

  // its a loooooooop!
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
