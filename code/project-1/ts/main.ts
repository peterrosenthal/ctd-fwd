import * as THREE from 'three';
import { BoundaryBox } from './BoundaryBox';
import { WorldSceneObjectSpawner, WorldSceneObjectType } from './ObjectSpawner';
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
  color: 0xaafeda,
});
system.add(boundary);

// object spawner
const spawner = new WorldSceneObjectSpawner({
  system: system,
  type: WorldSceneObjectType.Coal,
  position: new THREE.Vector3(0, 7, 1),
  width: 11,
  depth: 5,
  color: 0xab339a,
});

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
