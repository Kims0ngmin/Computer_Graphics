import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 500);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0xffffff);

// Meshes
const boxGeometry = new THREE.BoxGeometry(3, 4, 5);
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
const boxMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

const conegeometry = new THREE.ConeGeometry(5, 5, 32);
const conematerial = new THREE.MeshBasicMaterial( {color: 0xffff00} ); 
const cone = new THREE.Mesh(conegeometry, conematerial );
scene.add( cone );

const cube = new THREE.Mesh(boxGeometry, boxMaterial);
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial); 

cone.position.set(10, 0, 0);
cube.position.set(0, 10, 0);

scene.add(sphere);
scene.add(cube);

const eulerRotation_cone = new THREE.Euler(0, 0, Math.PI);
cone.rotation.setFromVector3(eulerRotation_cone);

// // Show normal information of the cone // // 
function normalMaterial() {
    const normalMaterial = new THREE.MeshNormalMaterial(); 
    cone.material = normalMaterial;
}
normalMaterial()

const amblight = new THREE.AmbientLight(0xffffff, 20); 
scene.add(amblight);
const pointLight = new THREE.PointLight(0xffffff, 50, 100); 
pointLight.position.set(0, 5, 5);
scene.add(pointLight);

camera.position.set(0, 0, 8);
let distance = 8;

// Variables for Camera Tracking
let isTracking = false;
let lastMouseX = 0;
let lastMouseY = 0;

// track tool //
renderer.domElement.addEventListener('mousedown', function(event) {
    if (event.altKey && event.button === 1) { // Alt key + Middle Mouse Button
        isTracking = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }
});

document.addEventListener('mouseup', function(event) {
    isTracking = false;
});

renderer.domElement.addEventListener('mousemove', function(event) {
    if (isTracking) {
        const deltaX = event.clientX - lastMouseX;
        const deltaY = event.clientY - lastMouseY;

        updateCamera(deltaX, deltaY);
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }
});

function updateCamera(deltaX, deltaY) {
    camera.position.x -= deltaX * 0.01;
    camera.position.y += deltaY * 0.01;
    camera.position.z = distance;
    camera.updateProjectionMatrix();
}

// the camera should be moved back to its initial position. //
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'r':
            camera.position.set(0, 0, distance);
            cubeMesh();
        break;
    }
});
    
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
} animate();


