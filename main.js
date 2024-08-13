import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer;
let plane;
let objects = [];
let raycaster, mouse;
let selectedObject = null;
let offset = new THREE.Vector3();
let intersection = new THREE.Vector3();
let collisionEnabled = false;

let targetPosition = null;
let moveSpeed = 0.01;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 배경색 설정
scene.background = new THREE.Color(0xdddddd);

// 앰비언트 라이트 추가
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 색상, 강도
scene.add(ambientLight);

// // 조명 추가
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 색상, 강도
// directionalLight.position.set(1, 1, 1);
// scene.add(directionalLight);

// 포그 설정
scene.fog = new THREE.FogExp2(0xffffff, 0.001); // 색상, 밀도

const lights = [ambientLight]; // 주변광을 사용할 경우

// Create a plane
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
planeMaterial.refractionRatio = 0.;
planeMaterial.reflectivity = 0;
plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Create cubes

const geometry11 = new THREE.BoxGeometry(1, .5, 0);
const material11 = createTextMaterial1('<<<');
material11.transparent = true;
material11.opacity = 1;
material11.refractionRatio = 0.;

let cube11 = new THREE.Mesh(geometry11, material11);
cube11.position.set(9, 10, 5);
scene.add(cube11);

const material113 = createTextMaterial1('start!')
let cube113 = new THREE.Mesh(geometry11, material113);
cube113.position.set(7, 10, 5);
scene.add(cube113);


const geometry12 = new THREE.BoxGeometry(2, .8, 0);
const material12 = createTextMaterial('200K🤣‪‬‪');
material12.transparent = true;
material12.opacity = 1;

let cube12 = new THREE.Mesh(geometry12, material12);
cube12.position.set(9, 9, 5);
scene.add(cube12);

const geometry = new THREE.BoxGeometry(2, 1, 0);
const material1 = createTextMaterial1('7 8 9');
material1.transparent = true;
material1.opacity = 1;


let cube1 = new THREE.Mesh(geometry, material1);
cube1.position.set(9, 8, 5);
scene.add(cube1);

const material2 = createTextMaterial1('7 7 7');
material2.transparent = true;
material2.opacity = 1;
let cube2 = new THREE.Mesh(geometry, material2);
cube2.position.set(9, 6.75, 5);
scene.add(cube2);

// Create a cube with text (cube3)
const geometry3 = new THREE.BoxGeometry(2, 4, 0);
const material3 = createTextMaterial('+'); // Use the function to create text material
material3.transparent = true;
material3.opacity = 1;
let cube3 = new THREE.Mesh(geometry3, material3);
cube3.position.set(9, 3.9, 5);
scene.add(cube3);

// Function to create text texture
function createTextTexture(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 256;

    // Background color
    context.fillStyle = 'navy';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Text settings
    context.font = '75px Arial';
    context.fillStyle = 'orange';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    // Convert canvas to texture
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}
// Function to create text material
function createTextMaterial(text) {
    const texture = createTextTexture(text);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    material.transparent = true;
    material.opacity = 1;
    return material;
}

// Function to create text texture
function createTextTexture1(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 256;

    // Background color
    context.fillStyle = 'navy';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Text settings
    context.font = '80px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    // Convert canvas to texture
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

// Function to create text material
function createTextMaterial1(text) {
    const texture = createTextTexture1(text);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    material.transparent = true;
    material.opacity = 1;
    return material;
}


// Load objects
let object, object1, object123;
const loader = new FBXLoader();
loader.load('./TP/cube_table.fbx', function (obj) {
    object = obj;
    object.scale.set(0.005, 0.005, 0.005); // 크기 조정
    object.position.set(0, 1., 6); // 위치 조정
    object.rotation.y = -Math.PI / 2;
    
    objects.push(object);
    scene.add(object);
    // console.log('FBX model loaded successfully');
    for (let light of lights) {
        object.add(light.clone());
    }
}, undefined, function (error) {
    // console.error('Error loading FBX model:', error);
});

loader.load('./TP/bl2_cube_tail.fbx', function (obj1) {
    object1 = obj1;
    object1.scale.set(0.003, 0.003, 0.003); // 크기 조정
    object1.position.set(-4.5, 0.,1); // 위치 조정
    objects.push(object1);
    scene.add(object1);
    console.log('FBX model loaded successfully');
    for (let light of lights) {
        object1.add(light.clone());
    }
}, undefined, function (error) {
    console.error('Error loading FBX model:', error);
});
loader.load('./TP/bl3_cube_tail.fbx', function (obj1) {
    object1 = obj1;
    object1.scale.set(0.003, 0.003, 0.003); // 크기 조정
    object1.position.set(-3, 0.,1); // 위치 조정
    objects.push(object1);
    scene.add(object1);
    // console.log('FBX model loaded successfully');
    for (let light of lights) {
        object1.add(light.clone());
    }
}, undefined, function (error) {
    // console.error('Error loading FBX model:', error);
});
loader.load('./TP/bl4_cube_tail.fbx', function (obj1) {
    object1 = obj1;
    object1.scale.set(0.003, 0.003, 0.003); // 크기 조정
    object1.position.set(-1.5, 0.,1); // 위치 조정
    objects.push(object1);
    scene.add(object1);
    // console.log('FBX model loaded successfully');
    for (let light of lights) {
        object1.add(light.clone());
    }
}, undefined, function (error) {
    // console.error('Error loading FBX model:', error);
});

loader.load('./TP/bl5_cube_tail.fbx', function (obj1) {
    object1 = obj1;
    object1.scale.set(0.003, 0.003, 0.003); // 크기 조정
    object1.position.set(0, 0.,1); // 위치 조정
    objects.push(object1);
    scene.add(object1);
    // console.log('FBX model loaded successfully');
    for (let light of lights) {
        object1.add(light.clone());
    }
}, undefined, function (error) {
    // console.error('Error loading FBX model:', error);
});
loader.load('./TP/bl5_cube_tail.fbx', function (obj1) {
    object1 = obj1;
    object1.scale.set(0.003, 0.003, 0.003); // 크기 조정
    object1.position.set(0, 0.,1); // 위치 조정
    objects.push(object1);
    scene.add(object1);
    // console.log('FBX model loaded successfully');
    for (let light of lights) {
        object1.add(light.clone());
    }
}, undefined, function (error) {
    // console.error('Error loading FBX model:', error);
});
loader.load('./TP/r6_cube_tail.fbx', function (obj1) {
    object1 = obj1;
    object1.scale.set(0.003, 0.003, 0.003); // 크기 조정
    object1.position.set(-6, 0.,-3); // 위치 조정
    objects.push(object1);
    scene.add(object1);
    // console.log('FBX model loaded successfully');
    for (let light of lights) {
        object1.add(light.clone());
    }
}, undefined, function (error) {
    // console.error('Error loading FBX model:', error);
});
loader.load('./TP/r7_cube_tail.fbx', function (obj1) {
    object1 = obj1;
    object1.scale.set(0.003, 0.003, 0.003); // 크기 조정
    object1.position.set(-4.5, 0.,-3); // 위치 조정
    objects.push(object1);
    scene.add(object1);
    // console.log('FBX model loaded successfully');
    for (let light of lights) {
        object1.add(light.clone());
    }
}, undefined, function (error) {
    // console.error('Error loading FBX model:', error);
});
loader.load('./TP/r8_cube_tail.fbx', function (obj1) {
    object1 = obj1;
    object1.scale.set(0.003, 0.003, 0.003); // 크기 조정
    object1.position.set(-3, 0.,-3); // 위치 조정
    objects.push(object1);
    scene.add(object1);
    // console.log('FBX model loaded successfully');
    for (let light of lights) {
        object1.add(light.clone());
    }
}, undefined, function (error) {
    // console.error('Error loading FBX model:', error);
});
loader.load('./TP/r9_cube_tail.fbx', function (obj1) {
    object1 = obj1;
    object1.scale.set(0.003, 0.003, 0.003); // 크기 조정
    object1.position.set(-1.5, 0.,-3); // 위치 조정
    objects.push(object1);
    scene.add(object1);
    // console.log('FBX model loaded successfully');
    for (let light of lights) {
        object1.add(light.clone());
    }
}, undefined, function (error) {
    // console.error('Error loading FBX model:', error);
});


// const loader1 = new FBXLoader();
// loader1.load('./TP/jojo.fbx', function (obj11) {
//     object123 = obj11;
//     object123.scale.set(0.003, 0.003, 0.003); // 크기 조정
//     object123.position.set(1.5, 3.,6); // 위치 조정

//     object123.rotation.x = Math.PI / 2;
//     objects.push(object123);
//     scene.add(object123);
//     // console.log('FBX model loaded successfully');

//     for (let light of lights) {
//         object123.add(light.clone());
//     }
// }, undefined, function (error) {
//     // console.error('Error loading FBX model:', error);
// });

camera.position.set(0, 10, 15);
camera.lookAt(0, 0, 0);

let controls; // 전역 변수로 OrbitControls를 저장할 변수 추가

// Set up raycaster and mouse vector
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

// Add event listeners for mouse interactions
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mouseup', onMouseUp, false);
window.addEventListener('keydown', onKeyDown, false);  // Add keydown event listener

// Web Audio API 설정
const audioContext = new (window.AudioContext || window.AudioContext)();
let bounceSoundBuffer;

const audioContext1 = new (window.AudioContext || window.AudioContext)();
let bounceSoundBuffer1;

function initAudioContext() {
    // Check if audio context is suspended and resume if needed
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // Load sound if not already loaded
    if (!bounceSoundBuffer) {
        loadSound('./sound/time.mp3');
    }
}
function initAudioContext1() {
    // Check if audio context is suspended and resume if needed
    if (audioContext1.state === 'suspended') {
        audioContext1.resume();
    }

    // Load sound if not already loaded
    if (!bounceSoundBuffer1) {
        loadSound('./sound/tail_effect.mp3');
    }
}

function loadSound(url) {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    audioContext.decodeAudioData(request.response, function(buffer) {
      bounceSoundBuffer = buffer;
    });
  };
  request.send();
}
function loadSound1(url) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
  
    request.onload = function() {
      audioContext.decodeAudioData(request.response, function(buffer) {
        bounceSoundBuffer1 = buffer;
      });
    };
    request.send();
  }

function playSound(buffer) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start(0);
}
function playSound1(buffer) {
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
  }

// 사운드 파일 로드 (파일 경로는 변경 필요)
loadSound('./sound/time.mp3');
loadSound1('./sound/tail_effect.mp3');

// 사용자 제스처로 오디오 컨텍스트 초기화
window.addEventListener('click', initAudioContext, { once: true });

window.addEventListener('click', initAudioContext1, { once: true });

function animate() {
    requestAnimationFrame(animate);
    
    // console.log(selectedObject);
    if (targetPosition !== null) {
        console.log(targetPosition);
        const direction = new THREE.Vector3().subVectors(targetPosition, object123.position);
        if (direction.length() > 0.01) {
            direction.normalize().multiplyScalar(moveSpeed);
            object1.position.add(direction);
        } else {
            object123.position.copy(targetPosition);
            targetPosition = null;
        }
    }
    
    renderer.render(scene, camera);
}
function onMouseDown(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(objects.concat(cube113), true);

    if (intersects.length > 0) {
        selectedObject = intersects[0].object;

        playSound1(bounceSoundBuffer1);
        // targetPosition = new THREE.Vector3(1.5, 3, 6);

        if (selectedObject === object) {
            // Set the target position to the current position to enable dragging
            const planeIntersect = raycaster.intersectObject(plane);
            if (planeIntersect.length > 0) {
                offset.copy(planeIntersect[0].point).sub(selectedObject.position);

                targetPosition = new THREE.Vector3(3, 3, 3);
            }
        } else if (selectedObject === object1) {
            if (object) {
                targetPosition = new THREE.Vector3(3, 3, 3);
            }
        } else if (selectedObject === cube113) {
            playSound(bounceSoundBuffer);
        } else if (selectedObject === object123) { // 이 부분을 추가합니다.

            console.log('sel obj:', selectedObject);
            targetPosition = new THREE.Vector3(1.5, 3, 6); // 이동할 좌표를 설정합니다.
        } else {
            const planeIntersect = raycaster.intersectObject(plane);
            if (planeIntersect.length > 0) {
                offset.copy(planeIntersect[0].point).sub(selectedObject.position);
            }
        }
    }
}


function onMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    if (selectedObject) {
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
    selectedObject = null;
}

// 숫자 1을 눌렀을 때 OrbitControls를 활성화하는 함수
function enableOrbitControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2; // 카메라가 위를 향할 수 있는 최대 각도 (라디안)
    controls.minPolarAngle = Math.PI / 6; // 카메라가 아래를 향할 수 있는 최소 각도 (라디안)
    controls.minAzimuthAngle = -Math.PI / 4; // 카메라가 좌측으로 회전할 수 있는 최소 각도 (라디안)
    controls.maxAzimuthAngle = Math.PI / 4; // 카메라가 우측으로 회전할 수 있는 최대 각도 (라디안)
}

// 숫자 2를 눌렀을 때 OrbitControls를 비활성화하고 카메라를 원래 위치로 돌리는 함수
function disableOrbitControls() {
    controls.dispose(); // OrbitControls 해제
    camera.position.set(0, 10, 15); // 원래 카메라 위치로 설정
    camera.lookAt(0, 0, 0); // 카메라가 원점을 향하도록 설정
}

// 키보드 이벤트 핸들러에 추가
function onKeyDown(event) {
    if (event.key === '1') {
        enableOrbitControls();
    } else if (event.key === '2') {
        disableOrbitControls();
    }
    if (event.key === '3') {
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
