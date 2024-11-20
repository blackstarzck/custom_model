import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// import dat from 'dat.gui';

// ----- 주제: glb 파일 불러오기

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.x = 50;
	camera.position.y = 120;
	camera.position.z = 100;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', .8);
	scene.add(ambientLight);

	const directionalLight1 = new THREE.DirectionalLight('white', 1);
	directionalLight1.position.set(-65, 35, 0);
	scene.add(directionalLight1);

	const directionalLight2 = new THREE.DirectionalLight('white', 1);
	directionalLight2.position.set(65, 35, -8);
	scene.add(directionalLight2);

	const dirLightHelper1 = new THREE.DirectionalLightHelper( directionalLight1, 10 );
	scene.add( dirLightHelper1 );
	const dirLightHelper2 = new THREE.DirectionalLightHelper( directionalLight2, 10 );
	scene.add( dirLightHelper2 );

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);

	// GUI
	const gui = new GUI();
	const cameraGui = gui.addFolder('Camera');
	const lightGui01 = gui.addFolder('Light1');
	const lightGui02 = gui.addFolder('Light2');

	cameraGui.add(camera.position, 'x', -150, 150, 0.01);
	cameraGui.add(camera.position, 'y', -150, 150, 0.01);
	cameraGui.add(camera.position, 'z', -150, 150, 0.01);

	lightGui01.add( directionalLight1, 'intensity', 0, 1, 0.02 );
	lightGui01.add( directionalLight1.position, 'x', -150, 150, 0.02 );
	lightGui01.add( directionalLight1.position, 'y', -150, 150, 0.02 );
	lightGui01.add( directionalLight1.position, 'z', -150, 150, 0.02 );

	lightGui02.add( directionalLight2, 'intensity', 0, 1, 0.02 );
	lightGui02.add( directionalLight2.position, 'x', -150, 150, 0.02 );
	lightGui02.add( directionalLight2.position, 'y', -150, 150, 0.02 );
	lightGui02.add( directionalLight2.position, 'z', -150, 150, 0.02 );

	// gltf loader
	const gltfLoader = new GLTFLoader();
	gltfLoader.load(
		'./models/hyundai-original.glb',
		gltf => {
			console.log(gltf.scene.children[0]);
			console.log(gltf.scene);
			const ilbuniMesh = gltf.scene.children[0];
			scene.add(ilbuniMesh)
		}
	)


	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
