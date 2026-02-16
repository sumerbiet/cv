/* ==================== CONFIGURACIÓN ==================== */
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 1000, once: true });
    typeWriter();
    renderProjects();
    renderCertifications(); // Nueva función
    
    setTimeout(() => {
        VanillaTilt.init(document.querySelectorAll(".glass-card"), {
            max: 10, speed: 400, glare: true, "max-glare": 0.1
        });
    }, 500);
});

/* ==================== MÁQUINA DE ESCRIBIR ==================== */
const roles = ["Sistemas & Redes", "TV Broadcast", "Automatización IA"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentRole = roles[roleIndex];
    const typeElement = document.getElementById("typewriter");
    
    if (typeElement) {
        if (!isDeleting) {
            typeElement.innerHTML = currentRole.substring(0, charIndex + 1);
            charIndex++;
        } else {
            typeElement.innerHTML = currentRole.substring(0, charIndex - 1);
            charIndex--;
        }
        let typeSpeed = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false; roleIndex = (roleIndex + 1) % roles.length;
        }
        setTimeout(typeWriter, typeSpeed);
    }
}

/* ==================== CERTIFICADOS DINÁMICOS ==================== */
// ¡AGREGA AQUÍ TUS CERTIFICADOS!
// Si tienes el archivo: pon "assets/nombre_archivo.pdf" en 'link'
// Si NO tienes archivo aún: deja 'link' como comillas vacías ""
const certificationsData = [
    {
        title: "CCNA Routing & Switching",
        desc: "En proceso de certificación para dominar redes empresariales.",
        icon: "fas fa-network-wired",
        status: "En Progreso 70%",
        link: "" // Vacío = No botón
    },
    {
        title: "Python Automation",
        desc: "Scripts para automatización de procesos.",
        icon: "fab fa-python",
        status: "Completado",
        link: "assets/certificado_python.pdf" // Ejemplo con botón
    },
    {
        title: "Soporte Broadcast",
        desc: "Especialización en GV Stratus y ENPS.",
        icon: "fas fa-tv",
        status: "Experiencia 3+ Años",
        link: "" 
    }
];

function renderCertifications() {
    const container = document.getElementById('certs-container');
    if (container) {
        container.innerHTML = '';
        certificationsData.forEach((c, index) => {
            // Lógica: Si hay link, crea botón. Si no, nada.
            const buttonHtml = c.link ? `<a href="${c.link}" target="_blank" class="cert-btn">Ver Documento</a>` : '';
            const largeClass = index === 0 ? 'bento-large' : ''; // El primero es grande
            
            container.insertAdjacentHTML('beforeend', `
            <div class="bento-item ${largeClass} glass-card">
                <i class="${c.icon}"></i>
                <h3>${c.title}</h3>
                <p>${c.desc}</p>
                <span class="status-badge">${c.status}</span>
                ${buttonHtml}
            </div>`);
        });
    }
}

/* ==================== PLANETA 3D ==================== */
const earthContainer = document.getElementById('earth-container');
if (earthContainer) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, earthContainer.clientWidth / earthContainer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(earthContainer.clientWidth, earthContainer.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    earthContainer.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshPhongMaterial({
        map: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'),
        specularMap: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'),
        bumpMap: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'),
        bumpScale: 0.05, shininess: 15
    });
    const earth = new THREE.Mesh(geometry, material);
    earthGroup.add(earth);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    camera.position.z = 5;
    function animate() { requestAnimationFrame(animate); earth.rotation.y += 0.002; renderer.render(scene, camera); }
    animate();

    window.addEventListener('resize', () => {
        const w = earthContainer.clientWidth; const h = earthContainer.clientHeight;
        renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
    });
}

/* ==================== ESTRELLAS ==================== */
const canvas = document.getElementById('starfield');
if(canvas) {
    const ctx = canvas.getContext('2d');
    let stars = []; 
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize); resize();
    for(let j=0; j<150; j++) stars.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, z:Math.random()*canvas.width});
    function animStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = "white";
        stars.forEach(s => {
            s.z -= 0.5; if(s.z<=0) s.z = canvas.width;
            let x = (s.x-canvas.width/2)*(canvas.width/s.z)+canvas.width/2;
            let y = (s.y-canvas.height/2)*(canvas.width/s.z)+canvas.height/2;
            if(x>0 && x<canvas.width && y>0 && y<canvas.height) { ctx.beginPath(); ctx.arc(x,y,1.5,0,Math.PI*2); ctx.fill(); }
        });
        requestAnimationFrame(animStars);
    }
    animStars();
}

/* ==================== DATOS PROYECTOS ==================== */
const projects = [
    { title: "HM SYSTEM V74", img: "img/proyecto1.jpg", tech: "Sistemas · Soporte", desc: "Gestión de infraestructura crítica y soporte técnico nivel 2 en Multimedios Canal 6.", link: "#" },
    { title: "FTP Media Browser", img: "img/proyecto2.jpg", tech: "Python · Automation", desc: "Navegador de medios optimizado para flujos de trabajo de Broadcast TV.", link: "#" },
    { title: "MH Portafolio", img: "img/proyecto3.jpg", tech: "Three.js · Web Dev", desc: "Plataforma personal interactiva con tecnología 3D y diseño responsivo.", link: "#" }
];

function renderProjects() {
    const container = document.getElementById('projects-container');
    if(container) {
        container.innerHTML = '';
        projects.forEach(p => {
            container.insertAdjacentHTML('beforeend', `
            <article class="project-card glass-card">
                <img src="${p.img}" class="project__img" onerror="this.src='https://via.placeholder.com/400x300/222/fff?text=Proyecto'">
                <div class="project__content">
                    <span class="project__tech">${p.tech}</span>
                    <h3 class="project__title">${p.title}</h3>
                    <p class="project__desc">${p.desc}</p>
                    <a href="${p.link}" class="project__link">Ver Proyecto <i class="fas fa-arrow-right"></i></a>
                </div>
            </article>`);
        });
    }
}

/* ==================== MENU MOVIL ==================== */
const navToggle = document.getElementById('nav-toggle'), navClose = document.getElementById('nav-close'), navMenu = document.getElementById('nav-menu');
if(navToggle) navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
if(navClose) navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
document.querySelectorAll('.nav__link').forEach(n => n.addEventListener('click', () => navMenu.classList.remove('show-menu')));