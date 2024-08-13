import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
let scene, camera, renderer, controls;
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 2);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    const light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 10, 100);
    scene.add(light);
    // Load model
    // loadModel();
    loadFBXModel();
    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}
function loadModel() {
    const loader = new PLYLoader();
    loader.load('cube_tail.ply', function
        (geometry) {
        geometry.computeVertexNormals();
        const material = new THREE.MeshStandardMaterial({ color: 0x0055ff });
        const mesh = new THREE.Mesh(geometry, material);
        // Scale down the model
        mesh.scale.set(0.001, 0.001, 0.001);
        scene.add(mesh);
    }, undefined, function (error) {
        console.error(error);
    });
}
function loadFBXModel() {
    const loader = new FBXLoader();
    loader.load('./TP/cube_table.fbx', function (object) {
        object.scale.set(0.005, 0.005, 0.005); // Adjust the scale if necessary
        object.position.set(2, -0.5, 0); // Adjust the position if necessary
        scene.add(object);
        console.log('FBX model loaded successfully');
    }, undefined, function (error) {
        console.error('Error loading FBX model:', error);
    });
    loader.load('cube_tail.fbx', function (object1) {
        object1.scale.set(0.005, 0.005, 0.005); // Adjust the scale if necessary
        object1.position.set(6, -0.5, 0); // Adjust the position if necessary
        scene.add(object1);
        console.log('FBX model loaded successfully');
    }, undefined, function (error) {
        console.error('Error loading FBX model:', error);
    });
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init();
animate();

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

let scene, camera, renderer, controls;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 2);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 10, 100);
    scene.add(light);

    // Load model
    // loadModel();
    loadFBXModel();

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

function loadModel() {
    const loader = new PLYLoader();
    loader.load('cube_tail.ply', function (geometry) {
        geometry.computeVertexNormals();
        const material = new THREE.MeshStandardMaterial({ color: 0x0055ff });
        const mesh = new THREE.Mesh(geometry, material);
        // Scale down the model
        mesh.scale.set(0.001, 0.001, 0.001);
        scene.add(mesh);
    }, undefined, function (error) {
        console.error(error);
    });
}

function loadFBXModel() {
    const loader = new FBXLoader();

    // 받침대 로드
    loader.load('./TP/cube_table.fbx', function (object) {
        object.scale.set(0.005, 0.005, 0.005); // 크기 조정
        object.position.set(2, -0.5, 0); // 위치 조정
        scene.add(object);
        console.log('FBX model loaded successfully');

        // 타일 로드
        loader.load('cube_tail.fbx', function (object1) {
            object1.scale.set(0.005, 0.005, 0.005); // 크기 조정
            // 타일을 받침대 위에 위치하도록 조정
            const objectBox = new THREE.Box3().setFromObject(object);
            const object1Box = new THREE.Box3().setFromObject(object1);
            const objectHeight = objectBox.getSize(new THREE.Vector3()).y;
            const object1Height = object1Box.getSize(new THREE.Vector3()).y;

            object1.position.set(2, -0.5 + objectHeight / 2 + object1Height / 2, 0); // 타일 위치 조정
            scene.add(object1);
            console.log('FBX model loaded successfully');
        }, undefined, function (error) {
            console.error('Error loading FBX model:', error);
        });
    }, undefined, function (error) {
        console.error('Error loading FBX model:', error);
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init();
animate();
