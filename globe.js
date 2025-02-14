import ThreeGlobe from 'three-globe';

import { WebGLRenderer, Scene } from "three";
import {
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  Color,
  Fog,
  PointLight,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

fetch("globe-data-min.json").then((response) => {
    response.json().then((countries) => {
        fetch("points.json").then((response) => {
            response.json().then((points) => {
                const pairs = [];
                for (let i = 0; i < points.length; i++) {
                    for (let j = i + 1; j < points.length; j++) {
                        pairs.push({
                            startLat: points[i].lat,
                            startLng: points[i].lng,
                            endLat: points[j].lat,
                            endLng: points[j].lng
                        });
                        pairs.push({
                            endLat: points[i].lat,
                            endLng: points[i].lng,
                            startLat: points[j].lat,
                            startLng: points[j].lng
                        })
                    }}
                renderGlobe(points, pairs, countries);
            })
        })
    })
})

var renderer, camera, scene, controls;
var Globe;

function renderGlobe(points, pairs, countries) {
    init();
    initGlobe(points, pairs, countries);
    onWindowResize();
}

// SECTION Initializing core ThreeJS elements
function init() {
    // Initialize renderer
    renderer = new WebGLRenderer({ 
        antialias: true,
        canvas: document.getElementById("globe")
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    // renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild(renderer.domElement);

    // Initialize scene, light
    scene = new Scene();
    scene.add(new AmbientLight(0xbbbbbb, 0.3));
    scene.background = new Color(0x040d21);

    // Initialize camera, light
    camera = new PerspectiveCamera();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Setup camera
    var dLight = new DirectionalLight(0xffffff, 10);
    dLight.position.set(-800, 2000, 400);
    camera.add(dLight);

    var dLight1 = new DirectionalLight(0x7982f6, 5);
    dLight1.position.set(-200, 500, 200);
    camera.add(dLight1);

    var dLight2 = new PointLight(0x8566cc, 15, 0, 0);
    dLight2.position.set(-200, 500, 200);
    camera.add(dLight2);

    camera.position.z = 400;
    camera.position.x = 0;
    camera.position.y = 0;

    scene.add(camera);

    // Additional effects
    scene.fog = new Fog(0x535ef3, 400, 2000);

    // Initialize controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;

    controls.minPolarAngle = Math.PI * (3 / 16);
    controls.maxPolarAngle = Math.PI * (5 / 16);

    //window.addEventListener("resize", onWindowResize, false);
}

// SECTION Globe
function initGlobe(points, pairs, countries) {
    // Initialize the Globe
    Globe = new ThreeGlobe({
        waitForGlobeReady: true,
        animateIn: true,
    })
    .hexPolygonsData(countries.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.7)
    .showAtmosphere(true)
    .atmosphereColor("#3a228a")
    .atmosphereAltitude(0.5)
    .hexPolygonColor((e) => { return "rgba(255,255,255, 1)";});

    // NOTE Arc animations are followed after the globe enters the scene
    setTimeout(() => {
        Globe.arcsData(pairs)
        .arcColor((e) => {return "#ffffff";})
        .arcAltitude((e) => {
            0.5
        })
        .arcStroke((e) => {
            return 0.2;
        })
        .arcDashLength(0.9)
        .arcDashGap(4)
        .arcDashAnimateTime(3000)
        .arcsTransitionDuration(3000)
        .arcDashInitialGap((e) => Math.random()*5)
        .pointsData(points)
        .pointColor(() => "#ffffff")
        .pointsMerge(true)
        .pointAltitude(0.12)
        .pointRadius(0.05);
    }, 1000);

    const globeMaterial = Globe.globeMaterial();
    globeMaterial.color = new Color(0x3a228a);
    globeMaterial.emissive = new Color(0x220038);
    globeMaterial.emissiveIntensity = 0.7;
    globeMaterial.shininess = 0.7;

    scene.add(Globe);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    controls.update();
    renderer.render(scene, camera);
}
