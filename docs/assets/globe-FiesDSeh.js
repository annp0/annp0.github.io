import u from"./node_modules/three-globe/dist/three-globe-DBhPqVZ0.js";import{WebGLRenderer as p}from"./node_modules/three/build/three.module-DDr6UARD.js";import{OrbitControls as b}from"./node_modules/three/examples/jsm/controls/OrbitControls-DsKfLLf6.js";import{Scene as x,AmbientLight as L,Color as c,PerspectiveCamera as P,DirectionalLight as g,PointLight as D,Fog as v}from"./node_modules/three/build/three.core-BhFki44V.js";fetch("globe-data-min.json").then(a=>{a.json().then(i=>{fetch("points.json").then(o=>{o.json().then(e=>{const r=[];for(let d=0;d<e.length;d++)for(let h=d+1;h<e.length;h++)r.push({startLat:e[d].lat,startLng:e[d].lng,endLat:e[h].lat,endLng:e[h].lng}),r.push({endLat:e[d].lat,endLng:e[d].lng,startLat:e[h].lat,startLng:e[h].lng});M(e,r,i)})})})});var s,t,l,n,m;function M(a,i,o){y(),A(a,i,o),f(),w()}function y(){s=new p({antialias:!0,canvas:document.getElementById("globe")}),s.setPixelRatio(window.devicePixelRatio),s.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(s.domElement),l=new x,l.add(new L(12303291,.3)),l.background=new c(265505),t=new P,t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix();var a=new g(16777215,10);a.position.set(-800,2e3,400),t.add(a);var i=new g(7963382,5);i.position.set(-200,500,200),t.add(i);var o=new D(8742604,15,0,0);o.position.set(-200,500,200),t.add(o),t.position.z=400,t.position.x=0,t.position.y=0,l.add(t),l.fog=new v(5463795,400,2e3),n=new b(t,s.domElement),n.enableDamping=!0,n.dynamicDampingFactor=.01,n.enablePan=!1,n.minDistance=200,n.maxDistance=1e3,n.rotateSpeed=.5,n.zoomSpeed=.5,n.autoRotate=!0,n.minPolarAngle=Math.PI/3.5,n.maxPolarAngle=Math.PI-Math.PI/3,window.addEventListener("resize",f,!1)}function A(a,i,o){m=new u({waitForGlobeReady:!0,animateIn:!0}).hexPolygonsData(o.features).hexPolygonResolution(3).hexPolygonMargin(.7).showAtmosphere(!0).atmosphereColor("#3a228a").atmosphereAltitude(.5).hexPolygonColor(r=>"rgba(255,255,255, 1)"),setTimeout(()=>{m.arcsData(i).arcColor(r=>"#ffffff").arcAltitude(r=>Math.random()*.2+.3).arcStroke(r=>.2).arcDashLength(.9).arcDashGap(4).arcDashAnimateTime(3e3).arcsTransitionDuration(3e3).arcDashInitialGap(r=>Math.random()*20).pointsData(a).pointColor(()=>"#ffffff").pointsMerge(!0).pointAltitude(.12).pointRadius(.05)},1e3);const e=m.globeMaterial();e.color=new c(3809930),e.emissive=new c(2228280),e.emissiveIntensity=.7,e.shininess=.7,l.add(m)}function f(){t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),s.setSize(window.innerWidth,window.innerHeight)}function w(){n.update(),s.render(l,t),requestAnimationFrame(w)}
