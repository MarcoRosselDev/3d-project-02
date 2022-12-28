import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Global variables
let currentRef = null;

// Scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 100 / 100, 0.1, 100);
scene.add(camera);
camera.position.set(5, 5, 5);
camera.lookAt(new THREE.Vector3());

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(100, 100);

// OrbitControls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

// Resize canvas
const resize = () => {
  renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
  camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener("resize", resize);

// Animate the scene
const animate = () => {
  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();

// load model 3d
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  "./model/scene.gltf",
  (gltf) => {
    scene.add(gltf.scene);
  },
  () => {
    console.log("Progress");
  },
  () => {
    console.log("Error");
  }
);

// Lights
const light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(3, 3, 3);
scene.add(light1);

// Init and mount the scene
export const initScene = (mountRef) => {
  currentRef = mountRef.current;
  resize();
  currentRef.appendChild(renderer.domElement);
};

// Dismount and clean up the buffer from the scene
export const cleanUpScene = () => {
  scene.dispose();
  currentRef.removeChild(renderer.domElement);
};
