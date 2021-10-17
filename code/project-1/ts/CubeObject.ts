import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { WorldSceneObject } from './WorldSceneSystem';

export interface CubeObjectOptions {
  position: THREE.Vector3;
  mass?: number;
  size?: number;
  color?: number;
}

export class CubeObject implements WorldSceneObject {
  static SPAWN_RATE = 1;

  mesh: THREE.Mesh;
  body: CANNON.Body;

  constructor(options: CubeObjectOptions) {
    if (options.mass === undefined) {
      options.mass = 1;
    }
    if (options.size === undefined) {
      options.size = 1;
    }
    if (options.color === undefined) {
      options.color = 0xffffff;
    }

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ color: options.color });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.scale.set(options.size, options.size, options.size);
    this.body = new CANNON.Body({
      mass: options.mass,
      shape: new CANNON.Box(new CANNON.Vec3(
        options.size / 2,
        options.size / 2,
        options.size / 2,
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

    this.syncMeshAndBody();
  }

  syncMeshAndBody(): void {
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
