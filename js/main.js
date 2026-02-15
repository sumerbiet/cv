/* ==================== INICIALIZAR ANIMACIONES (AOS) ==================== */
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000, // Duración de la animación
        once: true, // Solo animar una vez al bajar
        offset: 100 // Empezar a animar antes de llegar
    });
    
    // Iniciar máquina de escribir
    typeWriter();
    
    // Iniciar renderizado de proyectos
    renderProjects();
    
    // Iniciar Vanilla Tilt en las tarjetas generadas
    setTimeout(() => {
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 15, // Inclinación máxima
            speed: 400, // Velocidad
            glare: true, // Brillo
            "max-glare": 0.2, // Opacidad del brillo
        });
    }, 500);
});

/* ==================== MENU MOVIL ==================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if(navToggle) navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
if(navClose) navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));

const navLink = document.querySelectorAll('.nav__link');
function linkAction() { navMenu.classList.remove('show-menu'); }
navLink.forEach(n => n.addEventListener('click', linkAction));

/* ==================== MAQUINA DE ESCRIBIR ==================== */
const textArray = ["Dev & AI Solutions", "Python Expert", "Network Specialist"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const delayNext = 2000;

function typeWriter() {
    const currentText = textArray[textIndex];
    const element = document.getElementById("typewriter");
    
    if(element) {
        if (!isDeleting) {
            element.innerHTML = currentText.substring(0, charIndex + 1);
            charIndex++;
        } else {
            element.innerHTML = currentText.substring(0, charIndex - 1);
            charIndex--;
        }

        let typeDelay = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentText.length) {
            typeDelay = delayNext;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
        }

        setTimeout(typeWriter, typeDelay);
    }
}

/* ==================== PLANETA 3D (Texturas Estables) ==================== */
const earthContainer = document.getElementById('earth-container');
if (earthContainer) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, earthContainer.clientWidth / earthContainer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(earthContainer.clientWidth, earthContainer.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    earthContainer.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    
    // Usando texturas oficiales de GitHub para asegurar que carguen siempre
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshPhongMaterial({
        map: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'),
        specularMap: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'),
        bumpMap: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'),
        bumpScale: 0.04,
        shininess: 10
    });
    const earth = new THREE.Mesh(geometry, material);
    earthGroup.add(earth);

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        earth.rotation.y += 0.002;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        const w = earthContainer.clientWidth;
        const h = earthContainer.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    });
}

/* ==================== ESTRELLAS FONDO ==================== */
const canvas = document.getElementById('starfield');
if(canvas) {
    const ctx = canvas.getContext('2d');
    let stars = []; 
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize);
    resize();
    
    for(let j=0; j<150; j++) stars.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, z:Math.random()*canvas.width});
    
    function animStars() {
        ctx.fillStyle = "#0a0a0f"; ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "white";
        stars.forEach(s => {
            s.z -= 0.5; if(s.z<=0) s.z = canvas.width;
            let x = (s.x-canvas.width/2) * (canvas.width/s.z) + canvas.width/2;
            let y = (s.y-canvas.height/2) * (canvas.width/s.z) + canvas.height/2;
            let size = (1 - s.z/canvas.width) * 2.5;
            if(x>0 && x<canvas.width && y>0 && y<canvas.height) {
                ctx.beginPath(); ctx.arc(x,y,size,0,Math.PI*2); ctx.fill();
            }
        });
        requestAnimationFrame(animStars);
    }
    animStars();
}

/* ==================== PROYECTOS ==================== */
const projects = [
    { 
        title: "HM SYSTEM V74", 
        img: "img/proyecto1.jpg", 
        tech: "Sistemas · Soporte", 
        desc: "Gestión integral de infraestructura crítica en Multimedios. Soporte a servidores físicos y virtuales.", 
        link: "#" 
    },
    { 
        title: "FTP Media Browser", 
        img: "img/proyecto2.jpg", 
        tech: "Python · Flask", 
        desc: "Automatización para la gestión de archivos multimedia en entornos de broadcast de TV.", 
        link: "#"
    },
    { 
        title: "Portafolio IA", 
        img: "img/proyecto3.jpg", 
        tech: "Three.js · AI", 
        desc: "Plataforma personal interactiva con elementos 3D y diseño generativo.", 
        link: "#" 
    }
];

function renderProjects() {
    const container = document.getElementById('projects-container');
    if(container) {
        container.innerHTML = '';
        projects.forEach(p => {
            container.insertAdjacentHTML('beforeend', `
            <article class="project-card" data-tilt>
                <div class="project__img-wrapper">
                    <img src="${p.img}" class="project__img" alt="${p.title}" onerror="this.src='https://via.placeholder.com/400x300/1a1a2e/ffffff?text=Proyecto'">
                </div>
                <div class="project__content">
                    <span class="project__tech">${p.tech}</span>
                    <h3 class="project__title">${p.title}</h3>
                    <p class="project__desc">${p.desc}</p>
                    <a href="${p.link}" class="project__link">Ver Detalles <i class="fas fa-arrow-right"></i></a>
                </div>
            </article>`);
        });
    }
}

/* ==================== FORMULARIO ==================== */
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
            setTimeout(() => { txt.innerHTML = 'Enviar Mensaje <i class="fas fa-paper-plane"></i>'; btn.disabled = false; }, 4000);
        } catch {
            txt.innerHTML = 'Error ❌'; btn.disabled = false;
        }
    });
}