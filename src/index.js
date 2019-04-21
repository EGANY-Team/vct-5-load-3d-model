import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  SpotLight,
  HemisphereLight,
  Color,
  Box3,
  Vector3
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// declare variables
let scene, camera, renderer, loader, model, container;

// get container
container = document.getElementById("model");

// setup basic scene/camera/renderer camera
scene = new Scene();
scene.background = new Color(0xd6e6ff);
camera = new PerspectiveCamera(
  50,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0, -0.1, 1.4);
renderer = new WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);
// recommended configs by Three.js when loading glTF model
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;

// // setup lightings
// spotLight1 = new SpotLight(0xffead3, 0.4);
// spotLight1.position.set(2, 4, 4);
// scene.add(spotLight1);

// spotLight2 = new SpotLight(0xffead3, 0.4);
// spotLight2.position.set(-2, 4, -4);
// scene.add(spotLight2);

// hemiLight = new HemisphereLight(0xffffff, 0xffead3, 0.6);
// hemiLight.position.set(0, 5, 0);
// scene.add(hemiLight);

// load model
loader = new GLTFLoader();
loader.load(
  "/low_poly_mccree/scene.gltf",
  gltf => {
    model = gltf.scene;

    // setup center values
    let bbox = new Box3().setFromObject(model);
    let cent = bbox.getCenter(new Vector3());
    let size = bbox.getSize(new Vector3());
    let maxAxis = Math.max(size.x, size.y, size.z);

    // scale model
    model.scale.multiplyScalar(1.0 / maxAxis);
    bbox.setFromObject(model);
    bbox.getCenter(cent);
    bbox.getSize(size);

    // center model
    model.position.x -= cent.x;
    model.position.y -= cent.y;
    model.position.z -= cent.z;

    // add model to scene
    scene.add(model);
  },
  xhr => {
    // handle load progress here
  },
  error => console.log("glTF.load() error", error)
);

// render
container.appendChild(renderer.domElement);

renderer.setAnimationLoop(() => {
  if (model) {
    model.rotation.y += 0.02;
  }
  renderer.render(scene, camera);
});
