// Set the scene size.
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// Set some camera attributes.
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// Get the DOM element to attach to
const container = document.querySelector("#container");

// ===============================
// Create a WebGL renderer, camera
// ===============================
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

const scene = new THREE.Scene();

// Start the renderer.
renderer.setSize(WIDTH, HEIGHT);

// Attach the renderer-supplied
// DOM element.
container.appendChild(renderer.domElement);

// create a point light
const pointLight = new THREE.PointLight(0xffffff);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// create the sphere's material
const sphereMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff
});

var loader = new THREE.TextureLoader();
loader.load(
  // resource URL
  "2_no_clouds_16k.jpg",

  // onLoad callback
  function(texture) {
    // in this example we create the material when the texture is loaded
    var sphereMaterial = new THREE.MeshBasicMaterial({
      map: texture
    });
    // Set up the sphere vars
    const RADIUS = 25;
    const SEGMENTS = 32;
    const RINGS = 32;

    // Create a new mesh with
    // sphere geometry - we will cover
    // the sphereMaterial next!
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS),

      sphereMaterial
    );

    // Move the Sphere back in Z so we
    // can see it.
    earth.position.z = -300;
    scene.add(earth);
  },

  // onProgress callback currently not supported
  undefined,

  // onError callback
  function(err) {
    console.error("An error happened.");
  }
);

// ===============================
// add to the scene
// ===============================
scene.add(camera);
scene.add(pointLight);
//scene.add(earth);

function update() {
  // Draw!
  renderer.render(scene, camera);

  // Schedule the next frame.
  requestAnimationFrame(update);
}

// Schedule the first frame.
requestAnimationFrame(update);
