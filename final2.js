import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 500);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let selectedObject = null;

let raycaster, mouse;
let count =0;
let count_1 = 0;
let objects = [];
scene.background = new THREE.Color(0xffffff);

// Meshes
const boxGeometry = new THREE.BoxGeometry(2, 3, 4);
const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

const conegeometry = new THREE.ConeGeometry(2, 2, 32);
const conematerial = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
const cone = new THREE.Mesh(conegeometry, conematerial );
scene.add( cone );

const cube = new THREE.Mesh(boxGeometry, boxMaterial);
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial); 

cone.position.set(5, 0, 0);
cube.position.set(0, 5, 0);

scene.add(sphere);
scene.add(cube);
cube.name = 'cube';
sphere.name = 'sphere';

objects.push(cube);
objects.push(sphere);

const eulerRotation_cone = new THREE.Euler(0, 0, Math.PI);
cone.rotation.setFromVector3(eulerRotation_cone);

camera.position.set(0, 0, 8);

// Lights
const ambientLight = new THREE.AmbientLight(0xff0000, 2);
ambientLight.name = 'ambient';
scene.add(ambientLight);
ambientLight.position.set(2.5, 2.5, 5);

const spotLight = new THREE.SpotLight(0xffffff, 2);
spotLight.position.set(2.5, 2.5, 5);
spotLight.name = 'spot';
scene.add(spotLight);

// Set initial visibility of lights
ambientLight.visible = true; // Initially, only ambient light is on
spotLight.visible = false;

// Keyboard event handling to toggle lights
window.addEventListener('keydown', function (event) {
    switch (event.key) {
    case 'a':
    ambientLight.visible = !ambientLight.visible;
    break;
    case 's':
    spotLight.visible = !spotLight.visible;
    break;
    }
    });    

// Set up raycaster and mouse vector
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mouseup', onMouseUp, false);
window.addEventListener('mousedown', onMouseDown, false);  // Add keydown event listener
// window.addEventListener('click', onMouseDown, { once: true });

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onMouseDown(event) {
    event.preventDefault();

    // Update mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections with objects
    const intersects = raycaster.intersectObjects(objects, true);

    if (intersects.length > 0) {
        let clickedObject = intersects[0].object;


        console.log(clickedObject);
        // Find the parent train group
        while (clickedObject.parent && !clickedObject.parent.isScene) {
            clickedObject = clickedObject.parent;
            console.log(clickedObject);
        }

        if (clickedObject.name === 'sphere') {
            // If the same train is clicked again, toggle selection
            sphere.material.color.set(0x00ff00);
            if(count===2){count=0;}
            if(count===1){
                sphere.material.color.set(0x0000ff);
                
            count = count+1;}
            count = count+1;
        } else if(clickedObject.name === 'cube') {
            // If a different train is clicked, add it to selection
            cube.material.color.set(0xff0000);

            if(count_1===2){count_1=0;}
            if(count_1===1){
                cube.material.color.set(0x00ff00);

                
            count_1 = count_1+1;
            }
            count_1 = count_1+1;

        }

    }
}

function onMouseMove(event) {
    event.preventDefault();

    // Update mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseUp(event) {
    event.preventDefault();
    selectedObject = null; // Deselect the object
}

animate();