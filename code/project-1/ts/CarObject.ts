import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CryptoSpawnRate } from './ObjectSpawner';
import { WorldSceneObject, WorldSceneSystem } from './WorldSceneSystem';

export interface CarObjectOptions {
  system: WorldSceneSystem;
  position: THREE.Vector3;
  mass?: number;
  color?: number;
}

export class CarObject implements WorldSceneObject {
  // rates are based on the rates from the CoalObject, so see CoalObject.ts
  // for more initial explanation
  // to adjust for car driving time, I used information from the U.S. Energy
  // Information Administration - 1 kWh of coal electricity emits 2.21 lbs of
  // CO2 into the atmosphere
  // source: https://www.eia.gov/tools/faqs/faq.php?id=74&t=11
  // I also used information from the U.S. Environmental Protection Agency -
  // driving for 1 mile emits 404 grams (0.89 lbs) of CO2 into the atmosphere
  // source: https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle
  static SPAWN_RATE: CryptoSpawnRate = {
    bitcoin: 1000, // actual rate: 1023, but we cannot exceed spawning every 1 ms
    ethereum: 213,
    tezos: 0.028,
  };

  mesh?: THREE.Mesh;
  body?: CANNON.Body;

  constructor(options: CarObjectOptions) {
    if (options.mass === undefined) {
      options.mass = 1;
    }
    if (options.color === undefined) {
      options.color = 0x9d4d69;
    }

    const loader = new GLTFLoader();
    loader.load(
      '../blender/car.gltf',
      (gltf) => {
        const geometry = (gltf.scene.getObjectByName('Car') as THREE.Mesh).geometry;
        const material = new THREE.MeshPhongMaterial({ color: options.color });
        if (geometry !== undefined) {
          this.mesh = new THREE.Mesh(geometry, material);
          this.mesh.scale.set(0.3, 0.3, 0.3);
          const box = new THREE.Box3().setFromObject(this.mesh);
          const size = box.getSize(new THREE.Vector3());
          this.body = new CANNON.Body({
            mass: options.mass,
            shape: new CANNON.Box(new CANNON.Vec3(
              size.x / 2,
              size.y / 2,
              size.z / 2,
            )),
          });
          this.body.position.set(
            options.position.x,
            options.position.y,
            options.position.z,
          );
          this.body.quaternion.setFromEuler(
            Math.random() * 2 * Math.PI,
            Math.random() * 2 * Math.PI,
            Math.random() * 2 * Math.PI,
          );

          options.system.add(this);
          this.syncMeshAndBody();
        }
      },
      undefined,
      (error) => { console.error(error); },
    );
  }

  syncMeshAndBody(): void {
    if (this.mesh !== undefined && this.body !== undefined) {
      this.mesh.position.set(
        this.body.position.x,
        this.body.position.y,
        this.body.position.z,
      );
      this.mesh.quaternion.set(
        this.body.quaternion.x,
        this.body.quaternion.y,
        this.body.quaternion.z,
        this.body.quaternion.w,
      );
    }
  }
}
