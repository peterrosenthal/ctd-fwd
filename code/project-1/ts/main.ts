import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

// initialize CANNON
const world = new CANNON.World();
world.gravity.set(0, -0.98, 0);

// initialize THREE
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// THREE lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(-1, 2, 4);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);

scene.add(directionalLight);
scene.add(ambientLight);

// THREE + CANNON bounding box
const planeGeometry = new THREE.PlaneGeometry(8, 8);
const material = new THREE.MeshPhongMaterial({ color: 0xeffdfc, side: THREE.DoubleSide });

const floorMesh = new THREE.Mesh(planeGeometry, material);
floorMesh.position.set(0, -2.5, 0);
floorMesh.rotation.x = -Math.PI / 2;
const floorBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Plane(),
});
floorBody.position.set(0, -2.5, 0);
floorBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
scene.add(floorMesh);
world.addBody(floorBody);

const lWallMesh = new THREE.Mesh(planeGeometry, material);
lWallMesh.position.set(-4, 1.5, 0);
lWallMesh.rotation.y = Math.PI / 2;
const lWallBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Plane(),
});
lWallBody.position.set(-4, 1.5, 0);
lWallBody.quaternion.setFromEuler(0, Math.PI / 2, 0);
scene.add(lWallMesh);
world.addBody(lWallBody);

const rWallMesh = new THREE.Mesh(planeGeometry, material);
rWallMesh.position.set(4, 1.5, 0);
rWallMesh.rotation.y = -Math.PI / 2;
const rWallBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Plane(),
});
rWallBody.position.set(4, 1.5, 0);
rWallBody.quaternion.setFromEuler(0, -Math.PI / 2, 0);
scene.add(rWallMesh);
world.addBody(rWallBody);

const bWallMesh = new THREE.Mesh(planeGeometry, material);
bWallMesh.position.set(0, 1.5, -4);
const bWallBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Plane(),
});
bWallBody.position.set(0, 1.5, -4);
scene.add(bWallMesh);
world.addBody(bWallBody);

// THREE + CANNON cube falling out of the sky
interface Cube {
  mesh: THREE.Mesh,
  body: CANNON.Body,
}
const cubes: Cube[] = [];
const cubeGeometry = new THREE.BoxGeometry();
function addCube(): void {
  const cube: Cube = {
    mesh: new THREE.Mesh(cubeGeometry, material),
    body: new CANNON.Body({
      mass: 1,
      shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
    }),
  };
  cube.mesh.position.set(Math.random() * 6 - 3, 3, Math.random() * 6 - 3);
  cube.mesh.rotation.set(Math.PI / 4, Math.PI / 4, 0);
  cube.body.position.set(cube.mesh.position.x, 3, cube.mesh.position.z);
  cube.body.quaternion.setFromEuler(Math.PI / 4, Math.PI / 4, 0);
  scene.add(cube.mesh);
  world.addBody(cube.body);
  cubes.push(cube);
}
setInterval(addCube, 1000);

// THREE + CANNON animation loop
const timeStep = 1 / 60;
let previousTime: number | undefined;
function animate(time: number): void {
  if (!previousTime) {
    world.step(timeStep);
  } else {
    const dt = time - previousTime;
    world.step(timeStep, dt);
  }
  previousTime = time;

  for (const cube of cubes) {
    cube.mesh.position.set(cube.body.position.x, cube.body.position.y, cube.body.position.z);
    cube.mesh.quaternion.set(
      cube.body.quaternion.x,
      cube.body.quaternion.y,
      cube.body.quaternion.z,
      cube.body.quaternion.w,
    );
  }

  controls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
