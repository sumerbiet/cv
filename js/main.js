/* ==================== MENU & NAV ==================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if(navToggle) { navToggle.addEventListener('click', () => navMenu.classList.add('show-menu')); }
if(navClose) { navClose.addEventListener('click', () => navMenu.classList.remove('show-menu')); }

const navLink = document.querySelectorAll('.nav__link');
function linkAction() { navMenu.classList.remove('show-menu'); }
navLink.forEach(n => n.addEventListener('click', linkAction));

/* ==================== TYPEWRITER ==================== */
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

/* ==================== CURSOR ==================== */
const cursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", (e) => {
    if(cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    }
});

/* ==================== EARTH 3D ==================== */
const earthContainer = document.getElementById('earth-container');
if (earthContainer && typeof THREE !== 'undefined') {
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

    const ambientLight = new THREE.AmbientLight(0x999999); 
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    camera.position.z = 5;

    function animateEarth() {
        requestAnimationFrame(animateEarth);
        earthMesh.rotation.y += 0.002;
        renderer.render(scene, camera);
    }
    animateEarth();
    
    window.addEventListener('resize', () => {
        if(earthContainer) {
            const newWidth = earthContainer.clientWidth;
            const newHeight = earthContainer.clientHeight;
            renderer.setSize(newWidth, newHeight);
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
        }
    });
}

/* ==================== STARFIELD ==================== */
const starCanvas = document.getElementById('starfield');
if(starCanvas) {
    const starCtx = starCanvas.getContext('2d');
    let stars = []; const numStars = 200;

    function resizeStarCanvas() {
        starCanvas.width = window.innerWidth;
        starCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeStarCanvas);
    resizeStarCanvas();

    function createStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * window.innerWidth - window.innerWidth / 2,
                y: Math.random() * window.innerHeight - window.innerHeight / 2,
                z: Math.random() * window.innerWidth
            });
        }
    }
    createStars();

    function animateStars() {
        starCtx.fillStyle = "black";
        starCtx.fillRect(0, 0, starCanvas.width, starCanvas.height);
        starCtx.fillStyle = "rgba(255, 255, 255, 0.8)";
        let scrollSpeed = 1.5 + (window.scrollY * 0.03); 
        stars.forEach(star => {
            star.z -= scrollSpeed;
            if (star.z <= 0) {
                star.z = window.innerWidth;
                star.x = Math.random() * window.innerWidth - window.innerWidth / 2;
                star.y = Math.random() * window.innerHeight - window.innerHeight / 2;
            }
            const x = (star.x / star.z) * window.innerWidth / 2 + window.innerWidth / 2;
            const y = (star.y / star.z) * window.innerHeight / 2 + window.innerHeight / 2;
            const size = (1 - star.z / window.innerWidth) * 2.5;
            if (x >= 0 && x <= starCanvas.width && y >= 0 && y <= starCanvas.height) {
                starCtx.beginPath();
                starCtx.arc(x, y, size, 0, Math.PI * 2);
                starCtx.fill();
            }
        });
        requestAnimationFrame(animateStars);
    }
    animateStars();
}

/* ==================== DATA LOADER ==================== */
const projectsData = [
    { title: "Smart Web App", image: "img/proyecto1.jpg", tech: "React · Node", description: "Plataforma inteligente con UX moderna.", link: "#" },
    { title: "AI Automation", image: "img/proyecto2.jpg", tech: "Python · Selenium", description: "Flujos de trabajo automatizados.", link: "#" },
    { title: "Cyber Portfolio", image: "img/proyecto3.jpg", tech: "Three.js · CSS3", description: "Este portafolio interactivo.", link: "#" }
];

const certsData = [
    { title: "Google AI Essentials", issuer: "Google", icon: "fab fa-google" },
    { title: "Desarrollo Web", issuer: "Udemy", icon: "fas fa-code" },
    { title: "Ciberseguridad", issuer: "IBM", icon: "fas fa-shield-alt" }
];

document.addEventListener('DOMContentLoaded', () => {
    const pContainer = document.getElementById('projects-container');
    if(pContainer) {
        pContainer.innerHTML = '';
        projectsData.forEach(p => {
            pContainer.insertAdjacentHTML('beforeend', `
            <article class="project-card">
                <div class="project__image-container">
                    <img src="${p.image}" class="project__img" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x200?text=Imagen+No+Encontrada'">
                </div>
                <div class="project__content">
                    <h3 class="project__tags">${p.tech}</h3>
                    <h2 class="project__title">${p.title}</h2>
                    <p class="project__description">${p.description}</p>
                    <a href="${p.link}" target="_blank" class="project__link">Ver Proyecto <i class="fas fa-arrow-right"></i></a>
                </div>
            </article>`);
        });
    }

    const cContainer = document.getElementById('certs-container');
    if(cContainer) {
        cContainer.innerHTML = '';
        certsData.forEach(c => {
            cContainer.insertAdjacentHTML('beforeend', `
            <div class="cert-card">
                <div class="cert__icon"><i class="${c.icon}"></i></div>
                <div class="cert__content">
                    <h3 class="cert__title">${c.title}</h3>
                    <span class="cert__issuer">${c.issuer}</span>
                </div>
            </div>`);
        });
    }

    typeWriter();
});

/* ==================== FORM AJAX ==================== */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = document.getElementById('form-btn');
        const txt = document.getElementById('btn-text');
        btn.disabled = true; txt.innerHTML = 'Enviando...';
        try {
            await fetch(contactForm.action, { method: 'POST', body: new FormData(contactForm), headers: {'Accept': 'application/json'} });
            txt.innerHTML = '¡Enviado! ✅';
            contactForm.reset();
            setTimeout(() => { txt.innerHTML = 'Enviar'; btn.disabled = false; }, 3000);
        } catch {
            txt.innerHTML = 'Error ❌'; btn.disabled = false;
        }
    });
}