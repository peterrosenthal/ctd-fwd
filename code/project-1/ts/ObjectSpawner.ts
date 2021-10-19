import * as THREE from 'three';
import { CarObject } from './CarObject';
import { CityObject } from './CityObject';
import { CoalObject } from './CoalObject';
import { CubeObject } from './CubeObject';
import { WorldSceneObject, WorldSceneSystem } from './WorldSceneSystem';

export enum WorldSceneObjectType {
  CUBE,
  CAR,
  COAL,
  CITY,
}

export enum CryptoType {
  BITCOIN,
  ETHEREUM,
  TEZOS,
}

export interface CryptoSpawnRate {
  bitcoin: number;
  ethereum: number;
  tezos: number;
}

export interface ObjectSpawnerOptions {
  system: WorldSceneSystem;
  type: WorldSceneObjectType;
  crypto: CryptoType;
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

    this.objects = [];
    this.options = options;

    this.spawnObject();
  }

  getRandomPosition(): THREE.Vector3 {
    return new THREE.Vector3(
      Math.random() * this.options.width! -
      this.options.width! / 2 + this.options.position!.x,
      this.options.position!.y,
      Math.random() * this.options.depth! -
      this.options.depth! / 2 + this.options.position!.z,
    );
  }

  spawnObject(): void {
    let rate: CryptoSpawnRate;
    switch (this.options.type) {
      case WorldSceneObjectType.CUBE: {
        const cube = new CubeObject({
          position: this.getRandomPosition(),
          color: this.options.color,
        });
        this.objects.push(cube);
        this.options.system.add(cube);
        rate = CubeObject.SPAWN_RATE;
        break;
      }
      case WorldSceneObjectType.CAR: {
        const car = new CarObject({
          system: this.options.system,
          position: this.getRandomPosition(),
          color: this.options.color,
        });
        this.objects.push(car);
        rate = CarObject.SPAWN_RATE;
        break;
      }
      case WorldSceneObjectType.CITY: {
        const city = new CityObject({
          system: this.options.system,
          position: this.getRandomPosition(),
          color: this.options.color,
        });
        this.objects.push(city);
        rate = CityObject.SPAWN_RATE;
        break;
      }
      case WorldSceneObjectType.COAL: {
        const coal = new CoalObject({
          system: this.options.system,
          position: this.getRandomPosition(),
        });
        this.objects.push(coal);
        rate = CoalObject.SPAWN_RATE;
        break;
      }
      default:
        rate = {
          bitcoin: 1,
          ethereum: 1,
          tezos: 1,
        };
        break;
    }
    let spawn: number;
    switch (this.options.crypto) {
      case CryptoType.BITCOIN:
        spawn = rate.bitcoin;
        break;
      case CryptoType.ETHEREUM:
        spawn = rate.ethereum;
        break;
      case CryptoType.TEZOS:
        spawn = rate.tezos;
        break;
      default:
        spawn = 1;
        break;
    }
    setTimeout(() => { this.spawnObject(); }, 1000 / spawn);
  }
}
