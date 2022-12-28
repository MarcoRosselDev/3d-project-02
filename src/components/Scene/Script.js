import * as THREE from "three";
import {
  OrbitControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";

// Global variables
let currentRef = null;

// Scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, 100 / 100, 0.1, 100);
scene.add(camera);
camera.position.set(5, 5, 5);
camera.lookAt(new THREE.Vector3());

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(100, 100);

// OrbitControls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;