import * as THREE from 'three';
import { CubeObject } from './CubeObject';
import { WorldSceneObject, WorldSceneSystem } from './WorldSceneSystem';

export enum WorldSceneObjectType {
  Cube,
  Car,
  Coal,
  City,
}

export interface ObjectSpawnerOptions {
  system: WorldSceneSystem;
  type: WorldSceneObjectType;
  position?: THREE.Vector3;
  width?: number;
  depth?: number;
  color?: number;
}

export class WorldSceneObjectSpawner {
  objects: WorldSceneObject[];
  options: ObjectSpawnerOptions;

  constructor(options: ObjectSpawnerOptions) {
    if (options.position === undefined) {
      options.position = new THREE.Vector3();
    }
    if (options.width === undefined) {
      options.width = 1;
    }
    if (options.depth === undefined) {
      options.depth = 1;
    }
    if (options.color === undefined) {
      options.color = 0xffffff;
    }

    this.objects = [];
    this.options = options;

    this.spawnObject();
  }

  spawnObject(): void {
    let rate = 1;
    switch (this.options.type) {
    case WorldSceneObjectType.Cube: {
      const cube = new CubeObject({
        position: new THREE.Vector3(
          Math.random() * this.options.width! -
          this.options.width! / 2 + this.options.position!.x,
          this.options.position!.y,
          Math.random() * this.options.depth! -
          this.options.depth! / 2 + this.options.position!.z,
        ),
        color: this.options.color,
      });
      this.objects.push(cube);
      this.options.system.add(cube);
      rate = CubeObject.SPAWN_RATE;
      break;
    }
    default:
      break;
    }
    setTimeout(() => { this.spawnObject(); }, 1000 / rate);
  }
}
