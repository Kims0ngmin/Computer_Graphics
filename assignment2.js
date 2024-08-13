import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); 
document.body.appendChild(renderer.domElement);
let geometry = new THREE.BoxGeometry( 10, 10, 10 );
let geometry1 = new THREE.BoxGeometry( 10, 10, 10 );
let geometry2 = new THREE.BoxGeometry( 10, 10, 10 );
let geometry3 = new THREE.BoxGeometry( 10, 10, 10 );


let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
let mesh = new THREE.Mesh(geometry, material);
let mesh1 = new THREE.Mesh(geometry1, material);
let mesh2 = new THREE.Mesh(geometry2, material);
let mesh3 = new THREE.Mesh(geometry3, material);

camera.position.z = 10;
const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff];
let colorIndex = 0;
material.color.set(colors[colorIndex]);

function cubeMesh() {
    const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 ); 
    mesh.geometry = cubeGeometry;
    mesh.position.set(-6, 0 , 0);

}function sphereMesh() {
    const sphereGeometry = new THREE.SphereGeometry( 1, 16, 16 ); 
    mesh1.geometry = sphereGeometry;
    mesh1.position.set(-2, 0 , 0);

}function cylinderMesh() {
    const cylinderGeometry = new THREE.CylinderGeometry( 1, 1, 1, 32 ); 
    mesh2.geometry = cylinderGeometry;
    mesh2.position.set(2, 0 , 0);

}function torusMesh() {
    const torusGeometry = new THREE.TorusGeometry( 1, 0.33, 16, 100 );
    mesh3.geometry = torusGeometry;
    mesh3.position.set(6, 0 , 0);

}

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case '1':
            scene.add(mesh);
            cubeMesh();
        break;
        case '2':
            scene.add(mesh1);
            sphereMesh();
        break;
        case '3':
            scene.add(mesh2);
            cylinderMesh();
        break;
        case '4':
            scene.add(mesh3);
            torusMesh();
        break;
    }
});

// 3D Box
document.addEventListener('keydown', function(event) {
    switch (event.key) {
    case 'w':
        mesh.position.y += 0.1;
    break;
    case 's':
        mesh.position.y -= 0.1;
    break;
    case 'a':
        mesh.position.x -= 0.1;
    break;
    case 'd':
        mesh.position.x += 0.1;
    break;
    }
});

// Circle
document.addEventListener('keydown', function(event) {
    switch (event.key) {
    case 't':
        mesh1.position.y += 0.1;
    break;
    case 'g':
        mesh1.position.y -= 0.1;
    break;
    case 'f':
        mesh1.position.x -= 0.1;
    break;
    case 'h':
        mesh1.position.x += 0.1;
    break;
    }
});

// Cylinder
document.addEventListener('keydown', function(event) {
    switch (event.key) {
    case 'i':
        mesh2.position.y += 0.1;
    break;
    case 'k':
        mesh2.position.y -= 0.1;
    break;
    case 'j':
        mesh2.position.x -= 0.1;
    break;
    case 'l':
        mesh2.position.x += 0.1;
    break;
    }
});

function changeColor() {
    colorIndex = (colorIndex + 1) % colors.length;
    mesh.material.color.set(colors[colorIndex]);
 }
 
 document.addEventListener('click', () => {
    changeColor();
 });

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();