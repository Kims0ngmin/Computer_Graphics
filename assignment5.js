import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Setup scene
let objects = [];
let raycaster, mouse;
let selectedObject = null;
let offset = new THREE.Vector3();
let intersection = new THREE.Vector3();

let plane;
let collisionEnabled = false;  // Flag to enable/disable collision detection

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

// Create a plane
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(30, 30);
scene.add(gridHelper);

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

// Add a directional light to see the rotation of wheel
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 2, 0);
scene.add(directionalLight);

camera.position.set(0, 5, 0);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);

// Setup groups
const trainGroup = new THREE.Group();
const frontWheelGroup = new THREE.Group();
const centerWheelGroup = new THREE.Group();
const rearWheelGroup = new THREE.Group();
scene.add(trainGroup);
trainGroup.add(frontWheelGroup);
trainGroup.add(centerWheelGroup);
trainGroup.add(rearWheelGroup);

// Setup the body of train
const rotationAngle = Math.PI / 2;

const boxGeometry = new THREE.BoxGeometry(1, 1.5, 1);
const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x191970, shininess: 80 });

// Adjust shininess
const box = new THREE.Mesh(boxGeometry, boxMaterial);
trainGroup.add(box);

const coneGeometry = new THREE.ConeGeometry(0.3, 0.4, 32);
const coneMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffff, shininess: 80 });

// Adjust shininess
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(0, 0.3, -1.5);
cone.rotation.set(Math.PI, 0, 0);
trainGroup.add(cone);

const cylindergeometry = new THREE.CylinderGeometry(0.5, 0.5, 2);
const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 80 });
const cylinder = new THREE.Mesh(cylindergeometry, cylinderMaterial);
cylinder.rotation.set(Math.PI / 2, 0, 0);
cylinder.position.set(0, -0.25, -1);
trainGroup.add(cylinder);

const geometry = new THREE.SphereGeometry(0.3, 32, 16, 0, 3.14, 0, 1.57);
const material = new THREE.MeshBasicMaterial({ color: 0xADD8E6 });
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 0.3, -0.5);
trainGroup.add(sphere);

// Setup the Wheels of train
const wheelGeometry = new THREE.TorusGeometry(0.15, 0.08, 7, 9, 5.5);
const bigwheel = new THREE.TorusGeometry(0.3, 0.15, 7, 9, 5.5);
const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00, reflectivity: 0, shininess: 30 });

// Front Wheels
const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
const wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
frontWheelGroup.add(wheel1);
frontWheelGroup.add(wheel2);
frontWheelGroup.position.set(0, -0.5, -1.8);
wheel1.position.set(-0.5, 0, 0);
wheel2.position.set(0.5, 0, 0);
wheel1.rotation.y += rotationAngle;
wheel2.rotation.y += rotationAngle;
// Center Wheels
const wheel3 = new THREE.Mesh(wheelGeometry, wheelMaterial);
const wheel4 = new THREE.Mesh(wheelGeometry, wheelMaterial);
centerWheelGroup.add(wheel3);
centerWheelGroup.add(wheel4);
centerWheelGroup.position.set(0, -0.5, -1.3);
wheel3.position.set(-0.5, 0, 0);
wheel4.position.set(0.5, 0, 0);
wheel3.rotation.y += rotationAngle;
wheel4.rotation.y += rotationAngle;
// Rear Wheels
const wheel5 = new THREE.Mesh(bigwheel, wheelMaterial);
const wheel6 = new THREE.Mesh(bigwheel, wheelMaterial);
rearWheelGroup.add(wheel5);
rearWheelGroup.add(wheel6);
rearWheelGroup.position.set(0, -0.5, 0.1);
wheel5.position.set(-0.5, 0, 0);
wheel6.position.set(0.5, 0, 0);
wheel5.rotation.y += rotationAngle;
wheel6.rotation.y += rotationAngle;

trainGroup.position.set(0, 1, 0);

// Setup groups for the second train
const trainGroup2 = new THREE.Group();
const frontWheelGroup2 = new THREE.Group();
const centerWheelGroup2 = new THREE.Group();
const rearWheelGroup2 = new THREE.Group();
scene.add(trainGroup2);
trainGroup2.add(frontWheelGroup2);
trainGroup2.add(centerWheelGroup2);
trainGroup2.add(rearWheelGroup2);

// Setup the body of the second train
const boxGeometry2 = new THREE.BoxGeometry(1, 1.5, 1);
const boxMaterial2 = new THREE.MeshPhongMaterial({ color: 0x191970, shininess: 80 });

const box2 = new THREE.Mesh(boxGeometry2, boxMaterial2);
trainGroup2.add(box2);

const coneGeometry2 = new THREE.ConeGeometry(0.3, 0.4, 32);
const coneMaterial2 = new THREE.MeshPhongMaterial({ color: 0x00ffff, shininess: 80 });

const cone2 = new THREE.Mesh(coneGeometry2, coneMaterial2);
cone2.position.set(0, 0.3, -1.5);
cone2.rotation.set(Math.PI, 0, 0);
trainGroup2.add(cone2);

const cylindergeometry2 = new THREE.CylinderGeometry(0.5, 0.5, 2);
const cylinderMaterial2 = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 80 });
const cylinder2 = new THREE.Mesh(cylindergeometry2, cylinderMaterial2);
cylinder2.rotation.set(Math.PI / 2, 0, 0);
cylinder2.position.set(0, -0.25, -1);
trainGroup2.add(cylinder2);

const geometry2 = new THREE.SphereGeometry(0.3, 32, 16, 0, 3.14, 0, 1.57);
const material2 = new THREE.MeshBasicMaterial({ color: 0xADD8E6 });
const sphere2 = new THREE.Mesh(geometry2, material2);
sphere2.position.set(0, 0.3, -0.5);
trainGroup2.add(sphere2);

// Setup the Wheels of the second train
const wheelGeometry2 = new THREE.TorusGeometry(0.15, 0.08, 7, 9, 5.5);
const bigwheel2 = new THREE.TorusGeometry(0.3, 0.15, 7, 9, 5.5);
const wheelMaterial2 = new THREE.MeshPhongMaterial({ color: 0xffff00, reflectivity: 0, shininess: 30 });

// Front Wheels
const wheel1_ = new THREE.Mesh(wheelGeometry2, wheelMaterial2);
const wheel2_ = new THREE.Mesh(wheelGeometry2, wheelMaterial2);
frontWheelGroup2.add(wheel1_);
frontWheelGroup2.add(wheel2_);
frontWheelGroup2.position.set(0, -0.5, -1.8);
wheel1_.position.set(-0.5, 0, 0);
wheel2_.position.set(0.5, 0, 0);
wheel1_.rotation.y += rotationAngle;
wheel2_.rotation.y += rotationAngle;
// Center Wheels
const wheel3_ = new THREE.Mesh(wheelGeometry2, wheelMaterial2);
const wheel4_ = new THREE.Mesh(wheelGeometry2, wheelMaterial2);
centerWheelGroup2.add(wheel3_);
centerWheelGroup2.add(wheel4_);
centerWheelGroup2.position.set(0, -0.5, -1.3);
wheel3_.position.set(-0.5, 0, 0);
wheel4_.position.set(0.5, 0, 0);
wheel3_.rotation.y += rotationAngle;
wheel4_.rotation.y += rotationAngle;
// Rear Wheels
const wheel5_ = new THREE.Mesh(bigwheel2, wheelMaterial2);
const wheel6_ = new THREE.Mesh(bigwheel2, wheelMaterial2);
rearWheelGroup2.add(wheel5_);
rearWheelGroup2.add(wheel6_);
rearWheelGroup2.position.set(0, -0.5, 0.1);
wheel5_.position.set(-0.5, 0, 0);
wheel6_.position.set(0.5, 0, 0);
wheel5_.rotation.y += rotationAngle;
wheel6_.rotation.y += rotationAngle;

trainGroup2.position.set(2, 1, 0);
objects.push(trainGroup);
objects.push(trainGroup2);

// Set up raycaster and mouse vector
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

// Add event listeners for mouse interactions
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mousemove', onMouseMove, false);
// window.addEventListener('keydown', onKeyDown, false);  // Add keydown event listener

// Animation
function animate() {
    requestAnimationFrame(animate);
    wheel_rot();

    checkCollisions();
    renderer.render(scene, camera);
}
let isAnimating = false; // Add this line to define isAnimating
let selectedObjects = []; // Change selectedObject to an array

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

        // Find the parent train group
        while (clickedObject.parent && !clickedObject.parent.isScene) {
            clickedObject = clickedObject.parent;
        }

        const index = selectedObjects.indexOf(clickedObject);
        if (index !== -1) {
            // If the same train is clicked again, toggle selection
            selectedObjects.splice(index, 1);
        } else {
            // If a different train is clicked, add it to selection
            selectedObjects.push(clickedObject);
        }

        // Calculate offset
        const planeIntersect = raycaster.intersectObject(plane);
        if (planeIntersect.length > 0) {
            const targetPosition = new THREE.Vector3(
                (Math.random() - 0.5) * 20,
                1, // Use planeIntersect instead of selectedObject.position
                (Math.random() - 0.5) * 20
            );

            selectedObjects.forEach(obj => {
                offset.copy(planeIntersect[0].point).sub(obj.position);
                const direction = new THREE.Vector3().subVectors(targetPosition, obj.position).normalize();
                const lookAtTarget = new THREE.Vector3().addVectors(obj.position, direction);

                // Animate movement
                const animateMove = () => {
                    if (selectedObjects.includes(obj) && obj.position) {  // Ensure obj is still selected
                        const distance = obj.position.distanceTo(targetPosition);
                        if (distance > 0.1) {
                            obj.position.addScaledVector(direction, 0.01);
                            obj.lookAt(lookAtTarget);
                            requestAnimationFrame(animateMove);
                        }
                    }
                };
                animateMove();
            });
        }

    }
}


function onMouseMove(event) {
    event.preventDefault();

    // Update mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

// function onKeyDown(event) {
//     if (event.key === '1') {
//         collisionEnabled = !collisionEnabled;
//         console.log(`Collision detection: ${collisionEnabled ? 'enabled' : 'disabled'}`);
//     }
// }

function checkCollision(obj1, obj2) {
    const distanceThreshold = 1; // Adjust this threshold as needed

    const distance = obj1.position.distanceTo(obj2.position);
    return distance < distanceThreshold;
}

let collisionDetected = false; // Add a variable to track collision state

function checkCollisions() {
    const collisionDetected = checkCollision(trainGroup, trainGroup2);
    if (collisionDetected) {
        // Change color when collision detected
        trainGroup.children.forEach(child => {
            if (child.material) {
                child.material.color.set(0xff0000); // Change color to red
            }
        });
        trainGroup2.children.forEach(child => {
            if (child.material) {
                child.material.color.set(0xff0000); // Change color to red
            }
        });
    } else {
        // Restore original color if no collision
        trainGroup.children.forEach(child => {
            if (child.material) {
                child.material.color.set(0x191970); // Restore original color
            }
        });
        trainGroup2.children.forEach(child => {
            if (child.material) {
                child.material.color.set(0x191970); // Restore original color
            }
        });
    }
}





function resolveCollision(obj1, obj2) {
    const box1 = new THREE.Box3().setFromObject(obj1);
    const box2 = new THREE.Box3().setFromObject(obj2);

    const overlapX = Math.min(box1.max.x - box2.min.x, box2.max.x - box1.min.x);
    const overlapZ = Math.min(box1.max.z - box2.min.z, box2.max.z - box1.min.z);

    if (overlapX < overlapZ) {
        if (obj1.position.x < obj2.position.x) {
            obj1.position.x -= overlapX;
        } else {
            obj1.position.x += overlapX;
        }
    } else {
        if (obj1.position.z < obj2.position.z) {
            obj1.position.z -= overlapZ;
        } else {
            obj1.position.z += overlapZ;
        }
    }
}
// Start animation
animate();

function wheel_rot() {
    // Rotate the wheels
    frontWheelGroup.rotation.x -= 0.05;
    centerWheelGroup.rotation.x -= 0.05;
    rearWheelGroup.rotation.x -= 0.05;

    frontWheelGroup2.rotation.x -= 0.05;
    centerWheelGroup2.rotation.x -= 0.05;
    rearWheelGroup2.rotation.x -= 0.05;
}

