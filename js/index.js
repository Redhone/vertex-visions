

gsap.registerPlugin(Flip)

const links = document.querySelectorAll('.nav-item a')
const currentelement = document.querySelector('.current-link')

links.forEach(link  => {
   link.addEventListener('click' , (e) => {
      const elementstate = Flip.getState(currentelement)
      link.appendChild(currentelement)
      Flip.from(elementstate , {
         duration:1,
         absolute:true,
         ease :"elastic.out(1 , 0.2)"
      })
   })
})

const cards = document.querySelectorAll('.project-card')
cards.forEach((card , index) => {
   card.addEventListener('click', () => {
      const state = Flip.getState(cards)
      // add active class to one and inactive others
      const isCardActive = card.classList.contains('active') // checking being active
      cards.forEach((otherCard , otherIndex) => {
         otherCard.classList.remove('active')
         otherCard.classList.remove('is-inactive')
         if(!isCardActive && index !== otherIndex){
            otherCard.classList.add('is-inactive')
         }
      })
      if(!isCardActive) card.classList.add('active')
      Flip.from(state , {
         duration:1.5,
         absolute:true,
         ease: 'elastic.out(1,0.5)',
         onComplete : () => {
            gsap.to('.project-card img' , {duration:1,opacity:0.5})
         }
      })
   })
})

// adding 3d models

const container = document.getElementById('our-model')
// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.5, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x1E1E1E);
container.appendChild(renderer.domElement);

// Load the .glb model
const loader = new THREE.GLTFLoader();
loader.load(
    'villa.glb', // Replace with the path to your .glb file
    function (gltf) {
        scene.add(gltf.scene);
        gltf.scene.position.set(-90,0 , 0); // Optional: Set model position
        gltf.scene.scale.set(.035,.035,.035)
        animate();
    },
    undefined,
    function (error) {
        console.log('An error happened while loading the model:', error);
    }
);

// Add lighting (optional)
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(15, 15, 15).normalize();
scene.add(light);

camera.position.z = 30;
camera.position.x = 35
camera.position.y = 10
// Add Directional Light
/* const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Light color and intensity
directionalLight.position.set(5, 10, 5).normalize(); // Position of the light
scene.add(directionalLight);

// Add a Point Light for more brightness
const pointLight = new THREE.PointLight(0xffffff, 1, 100); // Light color, intensity, distance
pointLight.position.set(10, 10, 10); // Position of the light
scene.add(pointLight);
 */
// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();
// Handle window resize
window.addEventListener('resize', () => {
camera.aspect = container.clientWidth / container.clientHeight;
camera.updateProjectionMatrix();
renderer.setSize(container.clientWidth, container.clientHeight);
});


// Arrow function to toggle terminal visibility

