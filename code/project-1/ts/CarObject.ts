import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { WorldSceneObject, WorldSceneSystem } from './WorldSceneSystem';

export interface CarObjectOptions {
  system: WorldSceneSystem;
  position: THREE.Vector3;
  mass?: number;
  color?: number;
}

export class CarObject implements WorldSceneObject {
  static SPAWN_RATE = 0.5;

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
