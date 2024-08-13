import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color(0xffffff);

const boxGeometry = new THREE.BoxGeometry(1, 2, 1); // Width, height, depth
const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff }); // Green color
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0,0,0)
scene.add(box);

// torus 
const torusGeometry = new THREE.TorusGeometry(0.25, 0.1, 24, 32); 
const torusMaterial = new THREE.MeshPhongMaterial({ color: 0xfefeff}); // Green color
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(.6,-.5,0)
torus.scale.set(1.5,1.5,1)
scene.add(torus);

const torus_a = new THREE.Mesh(torusGeometry, torusMaterial);
torus_a.position.set(-.6,-.5,0)
torus_a.scale.set(1.5,1.5,1)
scene.add(torus_a);

const torus1Geometry = new THREE.TorusGeometry(0.2, 0.08, 24, 32); 
const torus1 = new THREE.Mesh(torus1Geometry, torusMaterial);
torus1.position.set(.5,-.5, 1.5)
scene.add(torus1);

const torus2 = new THREE.Mesh(torus1Geometry, torusMaterial);
torus2.position.set(.5,-.5, 2.2)
scene.add(torus2);

const torus3 = new THREE.Mesh(torus1Geometry, torusMaterial);
torus3.position.set(-.5,-.5, 2.2)
scene.add(torus3);

const torus4 = new THREE.Mesh(torus1Geometry, torusMaterial);
torus4.position.set(-.5,-.5, 1.5)
scene.add(torus4);

// cylinder create
const cylinderGeometry = new THREE.CylinderGeometry( .5, .5, 2, 32 ); 
const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000});
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set(0, -0.2, 1.5)
scene.add(cylinder);

// cylinder create
const cylinder1Geometry = new THREE.CylinderGeometry( .4, .2, .5, 32 ); 
const cylinder1Material = new THREE.MeshPhongMaterial({ color: 0x000000});
const cylinder1 = new THREE.Mesh(cylinder1Geometry, cylinder1Material);
cylinder1.position.set(0, .5, 1.8)
scene.add(cylinder1);

// sphere
const sphereGeometry = new THREE.SphereGeometry(0.35, 32, 12, Math.PI / 2, Math.PI);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffff});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, .5, .5);
scene.add(sphere);

// torus 
const eulerRotation = new THREE.Euler(0, Math.PI / 2, 0);
box.rotation.setFromVector3(eulerRotation);
const eulerRotation_torus = new THREE.Euler(0, Math.PI / 2, 0);
torus.rotation.setFromVector3(eulerRotation_torus);
torus_a.rotation.setFromVector3(eulerRotation_torus);
torus1.rotation.setFromVector3(eulerRotation_torus);
torus2.rotation.setFromVector3(eulerRotation_torus);
torus3.rotation.setFromVector3(eulerRotation_torus);
torus4.rotation.setFromVector3(eulerRotation_torus);

// cylinder
const eulerRotation_cylinder = new THREE.Euler(Math.PI / 2, 0, 0);
cylinder.rotation.setFromVector3(eulerRotation_cylinder);

// sphere
const eulerRotation_sphere = new THREE.Euler(0, 0, Math.PI / 2);
sphere.rotation.setFromVector3(eulerRotation_sphere);

console.log("MyBox",box.rotation,box.quaternion)

const axesHelper = new THREE.AxesHelper(5); // Length of the axes
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(10, 10); // Size of the grid
scene.add(gridHelper);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

camera.position.set(5, 1, 5);
camera.lookAt(box.position);

// Initial Camera Position
camera.position.z = 5;

// Variables for Camera Control
let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};
let azimuth = 0;
//or polar angle
let elevation = Math.PI / 2;  // 90 degrees, looking horizontally
let distance = 5; // Distance from the cube

renderer.domElement.addEventListener('mousedown', function(e) {
    if (e.altKey && e.button === 0) { // Alt key + Left Mouse button
        isDragging = true;
    }
});

renderer.domElement.addEventListener('mousemove', function(e) {
    if (isDragging) {
        // Implement logic here to handle mouse movement when dragging
        // Hint: Calculate the change in mouse position (deltaX and deltaY)
        // Adjust azimuth and elevation based on the deltas to rotate the camera
        // Remember to call the updateCamera() function after adjusting the angles
        // **Write your code here**
        var deltaX = e.offsetX - previousMousePosition.x;
        var deltaY = e.offsetY - previousMousePosition.y;
        azimuth -= deltaX * 0.005; // Invert the direction of azimuth adjustment to be natural
        elevation = Math.max(0.1, Math.min(Math.PI, elevation - deltaY * 0.005)); // Invert thedirection of elevation adjustment to be natural
        updateCamera();
    }
    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});

document.addEventListener('mouseup', function(e) {
    isDragging = false;
});

function updateCamera() {
    // Convert azimuth and elevation angles to Cartesian coordinates for camera positioning
    // Hint: Use trigonometric functions to convert spherical to Cartesian coordinates
    // Set the camera's x, y, and z positions based on these calculations
    // Make the camera look at the center of the scene or an object
    // **Write your code here**
    // Convert spherical to Cartesian coordinates
    camera.position.x = distance * Math.sin(elevation) * Math.sin(azimuth);
    camera.position.y = distance * Math.cos(elevation);
    camera.position.z = distance * Math.sin(elevation) * Math.cos(azimuth);
    camera.lookAt(box.position); // Always look at the cube
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();