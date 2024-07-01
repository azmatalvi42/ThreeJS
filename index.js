import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js"

/*
Need to set up the scene
3 things needed for scene: Renderer, Camera, Scene Object
*/

// Set up renderer
const w = window.innerWidth;
const h= window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true})
//antialias gets rid of jagged lines and creates  smoother interface
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

// Set up camera
const aspect = w/h;
const near= 0.1;
const far= 10;
const fov = 75; //75 degree field of view
const camera= new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z=3 ; //brings camera back

// Create a Three.js scene
const scene= new THREE.Scene()

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor= 0.03;

// Create a geometry (shape) and material, then combine them into a mesh
const geo= new THREE.IcosahedronGeometry(1.3,2);
const mat= new THREE.MeshBasicMaterial({
  color: 0x2EC51F,
  flatShading: true

}); // Basic material with color

const mesh= new THREE.Mesh(geo, mat); // Combine geometry and material into a mesh
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true
});

const wireMesh= new THREE.Mesh(geo,wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

const hemiLight= new THREE.HemisphereLight(0x0099ff, 0xdd5500);
scene.add(hemiLight);

function animate(t=0) {
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
  controls.update()
}

animate();