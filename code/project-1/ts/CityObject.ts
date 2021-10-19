import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CryptoSpawnRate } from './ObjectSpawner';
import { WorldSceneObject, WorldSceneSystem } from './WorldSceneSystem';

export interface CityObjectOptions {
  system: WorldSceneSystem;
  position: THREE.Vector3;
  mass?: number;
  color?: number;
}

export class CityObject implements WorldSceneObject {
  // rates are based on the rates from the CoalObject, so see CoalObject.ts
  // for more initial explanation
  // to adjust for city electrity usage, I used numbers from Wikipedia - in
  // the US, the average energy consumption per person is 1,387 watts
  // for a city, I chose Denver, which has a population of 749,103 people,
  // meaning in just one minute, Denver uses more than 17 MWh of elecricity
  static SPAWN_RATE: CryptoSpawnRate = {
    bitcoin: 0.24,
    ethereum: 0.05,
    tezos: 0.0000006,
  };

  meshes: THREE.Mesh[];
  body?: CANNON.Body;

  constructor(options: CityObjectOptions) {
    if (options.mass === undefined) {
      options.mass = 1;
    }
    if (options.color === undefined) {
      options.color = 0x19293e;
    }

    this.meshes = [];

    const loader = new GLTFLoader();
    loader.load(
      '../blender/city.gltf',
      (gltf) => {
        const buildingsGeometry =
          (gltf.scene.getObjectByName('Buildings') as THREE.Mesh).geometry;
        const buildingsMaterial = new THREE.MeshPhongMaterial({ color: options.color });
        const lightsGeometry =
          (gltf.scene.getObjectByName('Lights') as THREE.Mesh).geometry;
        const lightsMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
        if (buildingsGeometry !== undefined && lightsGeometry !== undefined) {
          const buildingsMesh = new THREE.Mesh(buildingsGeometry, buildingsMaterial);
          buildingsMesh.scale.set(0.3, 0.8, 0.3);
          this.meshes.push(buildingsMesh);
          const lightsMesh = new THREE.Mesh(lightsGeometry, lightsMaterial);
          lightsMesh.scale.set(0.25, 0.7, 0.25);
          this.meshes.push(lightsMesh);
          const box = new THREE.Box3().setFromObject(buildingsMesh);
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
    if (this.body !== undefined) {
      for (const mesh of this.meshes) {
        mesh.position.set(
          this.body.position.x,
          this.body.position.y,
          this.body.position.z,
        );
        mesh.quaternion.set(
          this.body.quaternion.x,
          this.body.quaternion.y,
          this.body.quaternion.z,
          this.body.quaternion.w,
        );
      }
    }
  }
}
