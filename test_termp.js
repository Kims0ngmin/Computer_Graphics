// import * as THREE from 'three';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// let scene, camera, renderer;
// let plane;
// let objects = [];
// let raycaster, mouse;
// let selectedObject = null;
// let offset = new THREE.Vector3();
// let intersection = new THREE.Vector3();
// let collisionEnabled = false;  // Flag to enable/disable collision detection

// let targetPosition = null;  // Target position for object1
// let moveSpeed = 10;       // Speed of movement

// scene = new THREE.Scene();

// // Setup orthographic camera
// const aspect = window.innerWidth / window.innerHeight;
// const d = 20; // Depth of view
// camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 0.1, 1000);

// renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// const light = new THREE.HemisphereLight(0xffffff, 0x444444);
// light.position.set(0, 10, 100);
// scene.add(light);

// // Create a plane
// const planeGeometry = new THREE.PlaneGeometry(20, 20);
// const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
// plane = new THREE.Mesh(planeGeometry, planeMaterial);
// plane.rotation.x = -Math.PI / 2;
// scene.add(plane);

// // // Create two cubes
// const geometry = new THREE.BoxGeometry(2, 1, 0);
// const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// let cube1 = new THREE.Mesh(geometry, material1);
// cube1.position.set(9, 8, 5);
// scene.add(cube1);

// const material2 = new THREE.MeshBasicMaterial({ color: 0xff00ff });
// let cube2 = new THREE.Mesh(geometry, material2);
// cube2.position.set(9, 6.75, 5);
// scene.add(cube2);

// const geometry3 = new THREE.BoxGeometry(2, 4, 0);
// const material3 = new THREE.MeshBasicMaterial({ color: 0xf0000f });
// let cube3 = new THREE.Mesh(geometry3, material3);
// cube3.position.set(9, 3.9, 5);
// scene.add(cube3);

// // Load objects
// let object, object1;
// const loader = new FBXLoader();
// loader.load('./TP/cube_table.fbx', function (obj) {
//     object = obj;
//     object.scale.set(0.005, 0.005, 0.005); // 크기 조정
//     object.position.set(0, 1., 6); // 위치 조정
//     object.rotation.y = -Math.PI / 2;
    
//     objects.push(object);
//     scene.add(object);
//     console.log('FBX model loaded successfully');
//     loader.load('./TP/ttjojo.fbx', function (obj1) {
//         object1 = obj1;
//         object1.scale.set(0.005, 0.005, 0.005); // 크기 조정
//         object1.position.set(4, 1, -4); // 위치 조정
//         objects.push(object1);
//         scene.add(object1);
//         console.log('FBX model loaded successfully');
//     }, undefined, function (error) {
//         console.error('Error loading FBX model:', error);
//     });
// }, undefined, function (error) {
//     console.error('Error loading FBX model:', error);
// });


// // Set initial camera position and look at the scene center
// camera.position.set(0, 10, 10);
// camera.lookAt(0, 0, 0);

// // const controls = new OrbitControls(camera, renderer.domElement);

// // Set up raycaster and mouse vector
// raycaster = new THREE.Raycaster();
// mouse = new THREE.Vector2();

// // Add event listeners for mouse interactions
// window.addEventListener('mousedown', onMouseDown, false);
// window.addEventListener('mousemove', onMouseMove, false);
// window.addEventListener('mouseup', onMouseUp, false);
// window.addEventListener('keydown', onKeyDown, false);  // Add keydown event listener

// function animate() {
//     requestAnimationFrame(animate);

//     // Move object1 towards targetPosition

//     console.log(`object1 && targetPosition:${object1 && targetPosition}`);
//     if (object1 && targetPosition) {
//         // Calculate direction from current position to target position
//         const direction = new THREE.Vector3().subVectors(targetPosition, object1.position);

//         // If the distance is greater than 0.01, move towards the target position
//         if (direction.length() > 0.01) {
//             // Normalize the direction vector and multiply by moveSpeed
//             direction.normalize().multiplyScalar(moveSpeed);
//             object1.position.add(direction);

//             console.log(`object1.position.add(direction);:${targetPosition}`);
//         } else {
//             // If the distance is less than 0.01, set the object1 position to the target position
//             object1.position.copy(targetPosition);
//             targetPosition = null; // Reset target position

//             console.log(`targetPosition:${targetPosition}`);
//         }
//     }

//     renderer.render(scene, camera);
// }

// function onMouseDown(event) {
//     event.preventDefault();

//     // Update mouse position
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

//     // Update the raycaster with the camera and mouse position
//     raycaster.setFromCamera(mouse, camera);

//     // Check for intersections with objects
//     const intersects = raycaster.intersectObjects(objects);

//     if (intersects.length > 0) {
//         selectedObject = intersects[0].object;

//         console.log(`${raycaster.intersectObjects(objects)} point로 향함`);
//         // If the selected object is object1, set target position to (0, 0, 0)
//         if (selectedObject === object1) {
//             // Check if object1 is defined
//             console.log(`${intersects} 1point로 향함`);

//             if (object) {
//                 targetPosition = new THREE.Vector3(0, 0, 0);
//                 console.log(`${intersects} 2point로 향함`);
//             }
//         } else {
//             // Calculate offset for other objects
//             const planeIntersect = raycaster.intersectObject(plane);
//             if (planeIntersect.length > 0) {
//                 offset.copy(planeIntersect[0].point).sub(selectedObject.position);
//             }
//         }
//     }
// }

// function onMouseMove(event) {
//     event.preventDefault();

//     // Update mouse position
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

//     // If an object is selected and it's not object1, move it with the mouse
//     if (selectedObject && selectedObject !== object1) {
//         raycaster.setFromCamera(mouse, camera);
//         const intersects = raycaster.intersectObject(plane);

//         if (intersects.length > 0) {
//             intersection.copy(intersects[0].point).sub(offset);
//             selectedObject.position.copy(intersection);

//             if (collisionEnabled) {
//                 for (let obj of objects) {
//                     if (obj !== selectedObject && checkCollision(selectedObject, obj)) {
//                         resolveCollision(selectedObject, obj);
//                     }
//                 }
//             }
//         }
//     }
// }

// function onMouseUp(event) {
//     event.preventDefault();
//     selectedObject = null; // Deselect the object
// }

// function onKeyDown(event) {
//     if (event.key === '1') {
//         collisionEnabled = !collisionEnabled;
//         console.log(`Collision detection: ${collisionEnabled ? 'enabled' : 'disabled'}`);
//     }
// }

// function checkCollision(obj1, obj2) {
//     const box1 = new THREE.Box3().setFromObject(obj1);
//     const box2 = new THREE.Box3().setFromObject(obj2);
//     return box1.intersectsBox(box2);
// }

// function resolveCollision(obj1, obj2) {
//     const box1 = new THREE.Box3().setFromObject(obj1);
//     const box2 = new THREE.Box3().setFromObject(obj2);

//     const overlapX = Math.min(box1.max.x - box2.min.x, box2.max.x - box1.min.x);
//     const overlapZ = Math.min(box1.max.z - box2.min.z, box2.max.z - box1.min.z);

//     if (overlapX < overlapZ) {
//         if (obj1.position.x < obj2.position.x) {
//             obj1.position.x -= overlapX;
//         } else {
//             obj1.position.x += overlapX;
//         }
//     } else {
//         if (obj1.position.z < obj2.position.z) {
//             obj1.position.z -= overlapZ;
//         } else {
//             obj1.position.z += overlapZ;
//         }
//     }
// }

// animate();

// window.addEventListener('resize', () => {
//     const aspect = window.innerWidth / window.innerHeight;
//     camera.left = -d * aspect;
//     camera.right = d * aspect;
//     camera.top = d;
//     camera.bottom = -d;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });

import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { HelvetikerFont } from 'three/examples/fonts/helvetiker_regular.typeface.json';

let scene, camera, renderer;
let plane;
let objects = [];
let raycaster, mouse;
let selectedObject = null;
let offset = new THREE.Vector3();
let intersection = new THREE.Vector3();
let collisionEnabled = false;  // Flag to enable/disable collision detection

let targetPosition = null;  // Target position for object1
let moveSpeed = 10;       // Speed of movement

scene = new THREE.Scene();

// Setup orthographic camera
const aspect = window.innerWidth / window.innerHeight;
const d = 20; // Depth of view
camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 0.1, 1000);

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
light.position.set(0, 10, 100);
scene.add(light);

// Create a plane
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Load objects
let object, object1;
const loader = new FBXLoader();
loader.load('./TP/cube_table.fbx', function (obj) {
    object = obj;
    object.scale.set(0.005, 0.005, 0.005); // 크기 조정
    object.position.set(0, 1., 6); // 위치 조정
    object.rotation.y = -Math.PI / 2;
    
    objects.push(object);
    scene.add(object);
    console.log('FBX model loaded successfully');
    loader.load('./TP/ttjojo.fbx', function (obj1) {
        object1 = obj1;
        object1.scale.set(0.005, 0.005, 0.005); // 크기 조정
        object1.position.set(4, 1, -4); // 위치 조정
        objects.push(object1);
        scene.add(object1);
        console.log('FBX model loaded successfully');
    }, undefined, function (error) {
        console.error('Error loading FBX model:', error);
    });
}, undefined, function (error) {
    console.error('Error loading FBX model:', error);
});

// Set initial camera position and look at the scene center
camera.position.set(20, 20, 20);
camera.lookAt(0, 0, 0);

// Set up raycaster and mouse vector
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

// Load font and create text
const fontLoader = new FontLoader();
fontLoader.load('path/to/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry('Hello Three.js!', {
        font: font,
        size: 1, // size of the text
        height: 0.2, // thickness to extrude text
        curveSegments: 12, // number of points on the curves
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 5
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(0, 5, 0); // Position the text in the scene
    scene.add(textMesh);
});

// Add event listeners for mouse interactions
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mouseup', onMouseUp, false);
window.addEventListener('keydown', onKeyDown, false);  // Add keydown event listener

function animate() {
    requestAnimationFrame(animate);

    // Move object1 towards targetPosition
    if (object1 && targetPosition) {
        // Calculate direction from current position to target position
        const direction = new THREE.Vector3().subVectors(targetPosition, object1.position);

        // If the distance is greater than 0.01, move towards the target position
        if (direction.length() > 0.01) {
            // Normalize the direction vector and multiply by moveSpeed
            direction.normalize().multiplyScalar(moveSpeed);
            object1.position.add(direction);
        } else {
            // If the distance is less than 0.01, set the object1 position to the target position
            object1.position.copy(targetPosition);
            targetPosition = null; // Reset target position
        }
    }

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
    const intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
        selectedObject = intersects[0].object;

        // If the selected object is object1, set target position to (0, 0, 0)
        if (selectedObject === object1) {
            // Check if object1 is defined
            if (object) {
                targetPosition = new THREE.Vector3(0, 0, 0);
            }
        } else {
            // Calculate offset for other objects
            const planeIntersect = raycaster.intersectObject(plane);
            if (planeIntersect.length > 0) {
                offset.copy(planeIntersect[0].point).sub(selectedObject.position);
            }
        }
    }
}

function onMouseMove(event) {
    event.preventDefault();

    // Update mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // If an object is selected and it's not object1, move it with the mouse
    if (selectedObject && selectedObject !== object1) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(plane);

        if (intersects.length > 0) {
            intersection.copy(intersects[0].point).sub(offset);
            selectedObject.position.copy(intersection);

            if (collisionEnabled) {
                for (let obj of objects) {
                    if (obj !== selectedObject && checkCollision(selectedObject, obj)) {
                        resolveCollision(selectedObject, obj);
                    }
                }
            }
        }
    }
}

function onMouseUp(event) {
    event.preventDefault();
    selectedObject = null; // Deselect the object
}

function onKeyDown(event) {
    if (event.key === '1') {
        collisionEnabled = !collisionEnabled;
        console.log(`Collision detection: ${collisionEnabled ? 'enabled' : 'disabled'}`);
    }
}

function checkCollision(obj1, obj2) {
    const box1 = new THREE.Box3().setFromObject(obj1);
    const box2 = new THREE.Box3().setFromObject(obj2);
    return box1.intersectsBox(box2);
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
animate();

window.addEventListener('resize', () => {
        const aspect = window.innerWidth / window.innerHeight;
        camera.left = -d * aspect;
        camera.right = d * aspect;
        camera.top = d;
        camera.bottom = -d;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });