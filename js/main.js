/* === CONFIGURACIÓN DE NAVEGACIÓN === */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if(navToggle) navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
if(navClose) navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));

/* === EFECTO DE ESCRITURA === */
const text = "Desarrollo Web · Automatización · IA";
let charIndex = 0;
function typeWriter() {
    const typewriterElement = document.getElementById("typewriter");
    if (typewriterElement && charIndex < text.length) {
        typewriterElement.innerHTML += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

/* === MUNDO 3D (THREE.JS) === */
const earthContainer = document.getElementById('earth-container');
if (earthContainer) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, earthContainer.clientWidth / earthContainer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(earthContainer.clientWidth, earthContainer.clientHeight);
    earthContainer.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Land_ocean_ice_2048.jpg/1024px-Land_ocean_ice_2048.jpg');
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshPhongMaterial({ map: earthTexture, shininess: 15 });
    const earthMesh = new THREE.Mesh(geometry, material);
    scene.add(earthMesh);

    const ambientLight = new THREE.AmbientLight(0xcccccc); 
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    camera.position.z = 5;
    function animate() {
        requestAnimationFrame(animate);
        earthMesh.rotation.y += 0.002;
        renderer.render(scene, camera);
    }
    animate();
}

/* === CARGA DE PROYECTOS === */
const projectsData = [
    { title: "HM SYSTEM V74", image: "img/proyecto1.jpg", tech: "Sistemas", description: "Gestión y soporte de infraestructura." },
    { title: "FTP Media Browser", image: "img/proyecto2.jpg", tech: "Python", description: "Navegador de medios para estaciones de TV." },
    { title: "E-Commerce Seguro", image: "img/proyecto3.jpg", tech: "Next.js", description: "Pasarela de pagos encriptada." }
];

document.addEventListener('DOMContentLoaded', () => {
    const pContainer = document.getElementById('projects-container');
    if(pContainer) {
        projectsData.forEach(p => {
            pContainer.insertAdjacentHTML('beforeend', `
            <article class="project-card">
                <img src="${p.image}" class="project__img" onerror="this.src='https://via.placeholder.com/300x200?text=Imagen+No+Encontrada'">
                <div class="project__content">
                    <h3 class="project__tags">${p.tech}</h3>
                    <h2 class="project__title">${p.title}</h2>
                    <p>${p.description}</p>
                </div>
            </article>`);
        });
    }
    typeWriter();
});
