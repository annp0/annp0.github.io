import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("frame"),
    stencil: true
})

const controls = new OrbitControls(camera, renderer.domElement);

controls.autoRotate = true

const backLight = new THREE.PointLight(0xffffff, 5)
backLight.position.y = 2
scene.add(backLight)

renderer.setSize(window.innerWidth, window.innerHeight)

const boxGeom = new THREE.BoxGeometry(2, 2, 2)
const line = new THREE.LineSegments(
    new THREE.EdgesGeometry(boxGeom),
    new THREE.LineBasicMaterial({color: 0x000000})
)


scene.add(new THREE.AmbientLight(0xffffff, 2))

scene.add(line)

function addStencilMat(position, rx, ry, rz, ref, group) {
    const geo = new THREE.PlaneGeometry(2, 2)
    const mat = new THREE.MeshBasicMaterial()
    mat.colorWrite = false
    mat.depthWrite = false
    mat.stencilRef = ref
    mat.stencilWrite = true
    mat.stencilZPass = THREE.ReplaceStencilOp
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.copy(position)
    mesh.rotation.x = rx
    mesh.rotation.y = ry
    mesh.rotation.z = rz

    scene.add(mesh)

    group.forEach((obj) => {
        const objMat = obj.material
        objMat.stencilFunc = THREE.EqualStencilFunc
        objMat.stencilRef = ref
        objMat.stencilFuncMask = 0xFF
        objMat.stencilWrite = true
        objMat.stencilFail = THREE.KeepStencilOp
        objMat.stencilZFail = THREE.KeepStencilOp
        objMat.stencilZPass = THREE.ReplaceStencilOp
        obj.renderOrder = 2
        scene.add(obj)
    });
}

const obj1Geo =  new THREE.OctahedronGeometry(0.5, 0)
const line1 = new THREE.LineSegments(new THREE.EdgesGeometry(obj1Geo), new THREE.LineBasicMaterial({color: 0x000000}))
const obj1Mat = new THREE.MeshStandardMaterial({color : new THREE.Color('cyan')})
const obj1 = new THREE.Mesh(obj1Geo, obj1Mat)

addStencilMat(
    new THREE.Vector3(0, 0, 1), 
    0, 0, 0, 1, 
    [
        new THREE.Mesh(new THREE.SphereGeometry(5, 20, 20), new THREE.MeshStandardMaterial({color : new THREE.Color('yellow'), side: THREE.DoubleSide})),
        obj1, line1
    ]
)

const obj2Geo =  new THREE.TorusGeometry(0.5, 0.1, 6, 6)
const line2 = new THREE.LineSegments(new THREE.EdgesGeometry(obj2Geo), new THREE.LineBasicMaterial({color: 0x000000}))
const obj2Mat = new THREE.MeshStandardMaterial({color : new THREE.Color('lightgreen')})
const obj2 = new THREE.Mesh(obj2Geo, obj2Mat)

addStencilMat(
    new THREE.Vector3(0, 0, -1), 
    0, Math.PI, 0, 2, 
    [
        new THREE.Mesh(new THREE.SphereGeometry(5, 20, 20), new THREE.MeshStandardMaterial({color : new THREE.Color('pink'), side: THREE.DoubleSide})), 
        line2, obj2
    ]
)

const obj3Geo =  new THREE.DodecahedronGeometry(0.5, 0)
const line3 = new THREE.LineSegments(new THREE.EdgesGeometry(obj3Geo), new THREE.LineBasicMaterial({color: 0x000000}))
const obj3Mat = new THREE.MeshStandardMaterial({color : new THREE.Color('lightblue')})
const obj3 = new THREE.Mesh(obj3Geo, obj3Mat)

addStencilMat(
    new THREE.Vector3(1, 0, 0), 
    0, Math.PI/2 , 0, 3, 
    [
        new THREE.Mesh(new THREE.SphereGeometry(5, 20, 20), new THREE.MeshStandardMaterial({color : new THREE.Color('lightgreen'), side: THREE.DoubleSide})), 
        obj3, line3
    ]
)

const obj4Geo =  new THREE.IcosahedronGeometry(0.5, 0)
const line4 = new THREE.LineSegments(new THREE.EdgesGeometry(obj4Geo), new THREE.LineBasicMaterial({color: 0x000000}))
const obj4Mat = new THREE.MeshStandardMaterial({color : new THREE.Color('yellow')})
const obj4 = new THREE.Mesh(obj4Geo, obj4Mat)

addStencilMat(
    new THREE.Vector3(-1, 0, 0), 
    0, -Math.PI/2 , 0, 4, 
    [
        new THREE.Mesh(new THREE.SphereGeometry(5, 20, 20), new THREE.MeshStandardMaterial({color : new THREE.Color('lightblue'), side: THREE.DoubleSide})), 
        obj4, line4
    ]
)

const obj5Geo =  new THREE.IcosahedronGeometry(0.5, 0)
const line5 = new THREE.LineSegments(new THREE.EdgesGeometry(obj5Geo), new THREE.LineBasicMaterial({color: 0x000000}))
const obj5Mat = new THREE.MeshStandardMaterial({color : new THREE.Color('pink')})
const obj5 = new THREE.Mesh(obj5Geo, obj5Mat)

addStencilMat(
    new THREE.Vector3(0, 1, 0), 
    -Math.PI/2, 0, 0, 5, 
    [
        new THREE.Mesh(new THREE.SphereGeometry(5, 20, 20), new THREE.MeshStandardMaterial({color : new THREE.Color('orange'), side: THREE.DoubleSide})), 
        line5, obj5
    ]
)

const obj6Geo =  new THREE.IcosahedronGeometry(0.5, 0)
const line6 = new THREE.LineSegments(new THREE.EdgesGeometry(obj6Geo), new THREE.LineBasicMaterial({color: 0x000000}))
const obj6Mat = new THREE.MeshStandardMaterial({color : new THREE.Color('orange')})
const obj6 = new THREE.Mesh(obj6Geo, obj6Mat)

addStencilMat(
    new THREE.Vector3(0, -1, 0), 
    Math.PI/2, 0, 0, 6, 
    [
        new THREE.Mesh(new THREE.SphereGeometry(5, 20, 20), new THREE.MeshStandardMaterial({color : new THREE.Color('cyan'), side: THREE.DoubleSide})), 
        line6, obj6
    ]
)

camera.position.z = 3;

function animate() {

    obj1.rotation.x += 0.005
    line1.rotation.x += 0.005
    obj1.rotation.y += 0.005
    line1.rotation.y += 0.005
    obj2.rotation.x += 0.005
    line2.rotation.x += 0.005
    obj2.rotation.y += 0.005
    line2.rotation.y += 0.005
    obj3.rotation.x += 0.005
    line3.rotation.x += 0.005
    obj3.rotation.y += 0.005
    line3.rotation.y += 0.005
    obj4.rotation.x += 0.005
    line4.rotation.x += 0.005
    obj4.rotation.y += 0.005
    line4.rotation.y += 0.005
    obj5.rotation.y += 0.001
    line5.rotation.y += 0.001
    obj6.rotation.y += 0.002
    line6.rotation.y += 0.002
    

    controls.update();
	renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
