import * as THREE from 'three';
// Three.js 기본 설정
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 바닥 생성
const floorGeometry = new THREE.PlaneGeometry(200, 200);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// 공 생성
const ballGeometry = new THREE.SphereGeometry(1, 32, 32);
const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.position.y = 10;
scene.add(ball);

camera.position.z = 20;

// 공의 속도 및 중력
let velocity = 0;
const gravity = -0.1;

// Web Audio API 설정
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let bounceSoundBuffer;

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

function playSound(buffer) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start(0);
}

// 사운드 파일 로드 (파일 경로는 변경 필요)
loadSound('./sound/time.mp3');

function animate() {
  requestAnimationFrame(animate);

  // 중력 적용
  velocity += gravity;
  ball.position.y += velocity;

  // 바닥과의 충돌 감지
  if (ball.position.y <= 1) {
    ball.position.y = 1;
    velocity = -velocity * 0.9; // 반발력 적용

    // 사운드 재생
    if (bounceSoundBuffer) {
      playSound(bounceSoundBuffer);
    }
  }

  renderer.render(scene, camera);
}

animate();
