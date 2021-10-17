import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { WorldSceneObject, WorldSceneSystem } from './WorldSceneSystem';

export interface CityObjectOptions {
  system: WorldSceneSystem;
  position: THREE.Vector3;
  mass?: number;
  color?: number;
}

export class CityObject implements WorldSceneObject {
  static SPAWN_RATE = 0.25;

  meshes: THREE.Mesh[];
  body?: CANNON.Body;

  constructor(options: CityObjectOptions) {
    if (options.mass === undefined) {
      options.mass = 1;
    }
    if (options.color === undefined) {
      options.color = 0xffffff;
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
