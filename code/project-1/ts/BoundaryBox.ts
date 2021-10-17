import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { WorldSceneObject } from './WorldSceneSystem';

export interface BoundaryBoxOptions {
  position?: THREE.Vector3;
  width?: number;
  height?: number;
  depth?: number;
  color?: number;
}

export class BoundaryBox implements WorldSceneObject {
  meshes: THREE.Mesh[];
  bodies: CANNON.Body[];
  
  constructor(options: BoundaryBoxOptions) {
    if (options.position === undefined) {
      options.position = new THREE.Vector3();
    }
    if (options.width === undefined) {
      options.width = 1;
    }
    if (options.height === undefined) {
      options.height = 1;
    }
    if (options.depth === undefined) {
      options.depth = 1;
    }
    if (options.color === undefined) {
      options.color = 0xffffff;
    }

    this.meshes = [];
    this.bodies = [];

    const geometry = new THREE.PlaneGeometry();
    const material = new THREE.MeshPhongMaterial({
      color: options.color,
      side: THREE.DoubleSide,
    });

    // floor
    const floorMesh = new THREE.Mesh(geometry, material);
    floorMesh.scale.set(options.width, options.depth, 1);
    this.meshes.push(floorMesh);

    const floorBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    });
    floorBody.position.set(
      options.position.x,
      options.position.y,
      options.position.z,
    );
    floorBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    this.bodies.push(floorBody);

    // left wall
    const leftMesh = new THREE.Mesh(geometry, material);
    leftMesh.scale.set(options.depth, options.height, 1);
    this.meshes.push(leftMesh);

    const leftBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    });
    leftBody.position.set(
      options.position.x - options.width / 2,
      options.position.y + options.height / 2,
      options.position.z, 
    );
    leftBody.quaternion.setFromEuler(0, Math.PI / 2, 0);
    this.bodies.push(leftBody);

    // right wall
    const rightMesh = new THREE.Mesh(geometry, material);
    rightMesh.scale.set(options.depth, options.height, 1);
    this.meshes.push(rightMesh);

    const rightBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    });
    rightBody.position.set(
      options.position.x + options.width / 2,
      options.position.y + options.height / 2,
      options.position.z, 
    );
    rightBody.quaternion.setFromEuler(0, -Math.PI / 2, 0);
    this.bodies.push(rightBody);

    // back wall (what the camera is looking right at)
    const backMesh = new THREE.Mesh(geometry, material);
    backMesh.scale.set(options.width, options.height, 1);
    this.meshes.push(backMesh);

    const backBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    });
    backBody.position.set(
      options.position.x,
      options.position.y + options.height / 2,
      options.position.z - options.depth / 2,
    );
    this.bodies.push(backBody);

    // front wall (behind the camera)
    const frontMesh = new THREE.Mesh(geometry, material);
    frontMesh.scale.set(options.width, options.height, 1);
    this.meshes.push(frontMesh);

    const frontBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    });
    frontBody.position.set(
      options.position.x,
      options.position.y + options.height / 2,
      options.position.z + options.depth / 2,
    );
    frontBody.quaternion.setFromEuler(Math.PI, 0, 0);
    this.bodies.push(frontBody);

    // set rotations and positions of meshes
    // this only needs to be done once because all bodies are static
    this.syncMeshAndBody();    
  }

  syncMeshAndBody(): void {
    // arrays should be the same length, but we wanna be extra safe here
    const length = Math.min(this.meshes.length, this.bodies.length);
    // using a traditional for loop cause index is needed and I feel like being old school
    for (let i = 0; i < length; i++) {
      this.meshes[i].position.set(
        this.bodies[i].position.x,
        this.bodies[i].position.y,
        this.bodies[i].position.z,
      );
      this.meshes[i].quaternion.set(
        this.bodies[i].quaternion.x,
        this.bodies[i].quaternion.y,
        this.bodies[i].quaternion.z,
        this.bodies[i].quaternion.w,
      );
    }
  }
}
