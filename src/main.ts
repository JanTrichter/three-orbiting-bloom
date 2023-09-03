import './main.css';
import * as THREE from 'three';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//@ts-ignore
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';

const canvas = document.querySelector('#bg')!;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(40);

renderer.render(scene, camera);
const renderScene = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);

composer.addPass(renderScene);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.2, 0.1, 0.1);

composer.addPass(bloomPass);

// SCENE

let objOne = geometryIcoFactory(new THREE.Color(0xFFC0CB), 0.2);
let objTwo = geometryOctaFactory(new THREE.Color(0x04d9ff), 0.1);
let objThree = geometryOctaFactory(new THREE.Color(0x04d9ff), 0.1);

// const gridHelper = new THREE.GridHelper(40, 20);
// const gridHelperTwo = new THREE.GridHelper(30, 15);
// gridHelperTwo.rotation.x = Math.PI/2;

scene.add(objOne, objTwo, objThree,);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

animate();



// HELPERS

function animate() {
  requestAnimationFrame(animate);

  rotate([objOne, objTwo, objThree], 0.005);

  orbitXY(objTwo, 19,6);
  orbitXZ(objThree, 10, 6);

  composer.render();
}

function geometryIcoFactory(color: THREE.Color, lineWidth: number): THREE.Mesh {
  const geom = new THREE.IcosahedronGeometry(6, 1);
  const mat = new MeshLineMaterial({ color: color, lineWidth: lineWidth });
  const line = new MeshLine();
  line.setGeometry(geom);
  return new THREE.Mesh(line, mat);
}

function geometryOctaFactory(color: THREE.Color, lineWidth: number): THREE.Mesh {
  const geom = new THREE.OctahedronGeometry(3, 1);
  const mat = new MeshLineMaterial({ color: color, lineWidth: lineWidth });
  const line = new MeshLine();
  line.setGeometry(geom);
  return new THREE.Mesh(line, mat);
}

function rotate(obj: THREE.Mesh[], speed: number) {

  obj.forEach(item => {
    item.rotateX(speed);
    item.rotateY(speed);
  })
}

function orbitXY(obj: THREE.Mesh, distance: number, speed: number) {
  let timestamp = Date.now() * 0.0001;

  obj.position.x = Math.cos(timestamp * speed) * distance;
  obj.position.y = Math.sin(timestamp * speed) * distance;
}

function orbitXZ(obj: THREE.Mesh, distance: number, speed: number) {
  let timestamp = Date.now() * 0.0001;

  obj.position.x = Math.cos(timestamp * speed) * distance;
  obj.position.z = Math.sin(timestamp * speed) * distance;
}

