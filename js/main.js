document.addEventListener('DOMContentLoaded', () => {
    // Iniciar animaciones de entrada
    AOS.init({ duration: 800, once: true });
    
    // Iniciar efecto de máquina de escribir
    typeWriter();
    
    // Cargar los proyectos dinámicamente
    renderProjects();
    
    // Iniciar efecto 3D en tarjetas (solo en PC para ahorrar batería en cel)
    if(window.innerWidth > 768) {
        VanillaTilt.init(document.querySelectorAll(".glass-card"), { max: 10, speed: 400 });
    }
});

/* ==================== 1. MENÚ MÓVIL (LATERAL) ==================== */
const nt = document.getElementById('nav-toggle'), nc = document.getElementById('nav-close'), nm = document.getElementById('nav-menu');

if(nt) nt.addEventListener('click', () => nm.classList.add('show-menu'));
if(nc) nc.addEventListener('click', () => nm.classList.remove('show-menu'));

// Cerrar menú al dar clic en un enlace
document.querySelectorAll('.nav__link').forEach(n => n.addEventListener('click', () => nm.classList.remove('show-menu')));

/* ==================== 2. PROYECTOS (DATOS) ==================== */
const projects = [
    { 
        title: "HM SYSTEM V74", 
        img: "img/proyecto1.jpg", 
        tech: "Sistemas", 
        desc: "Gestión de infraestructura crítica y soporte técnico nivel 2 en Multimedios Canal 6.", 
        link: "#" 
    },
    { 
        title: "FTP Media Browser", 
        img: "img/proyecto2.jpg", 
        tech: "Python", 
        desc: "Automatización de archivos multimedia para flujos de broadcast.", 
        link: "#" 
    },
    { 
        title: "MH Portafolio", 
        img: "img/proyecto3.jpg", 
        tech: "Web Dev", 
        desc: "Plataforma personal interactiva con tecnología 3D y diseño responsivo.", 
        link: "#" 
    }
];

function renderProjects() {
    const c = document.getElementById('projects-container');
    if(c) {
        c.innerHTML = '';
        projects.forEach(p => {
            c.insertAdjacentHTML('beforeend', `
            <article class="project-card glass-card">
                <img src="${p.img}" class="project__img" onerror="this.src='https://via.placeholder.com/400x300/222/fff?text=Proyecto'">
                <div class="project__content">
                    <span class="project__tech">${p.tech}</span>
                    <h3 class="project__title">${p.title}</h3>
                    <p>${p.desc}</p>
                    <a href="${p.link}" class="project__link">Ver Proyecto <i class="fas fa-arrow-right"></i></a>
                </div>
            </article>`);
        });
    }
}

/* ==================== 3. LAB REDES (CCNA INTERACTIVO) ==================== */
// Esta es la función clave que hace que la consola cambie
function showConfig(device) {
    const output = document.getElementById('console-output');
    const title = document.getElementById('console-title'); // Si existe el título
    
    // Limpiamos la consola primero
    output.style.opacity = '0';
    
    setTimeout(() => {
        if(device === 'router') {
            // Simulación Router Cisco
            if(title) title.innerText = 'Router R1 (Cisco IOS)';
            output.innerHTML = `
                <span style="color:#888"># Conectando a Router R1...</span><br>
                R1> enable<br>
                R1# configure terminal<br>
                R1(config)# interface GigabitEthernet0/0<br>
                R1(config-if)# ip address 192.168.1.1 255.255.255.0<br>
                R1(config-if)# no shutdown<br>
                <span style="color:#00ff00"># Interface Gig0/0 changed state to UP</span>
            `;
        } 
        else if(device === 'switch') {
            // Simulación Switch Cisco
            if(title) title.innerText = 'Switch SW1 (Cisco IOS)';
            output.innerHTML = `
                <span style="color:#888"># Conectando a Switch SW1...</span><br>
                SW1> enable<br>
                SW1# show vlan brief<br><br>
                VLAN Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Status&nbsp;&nbsp;&nbsp;&nbsp;Ports<br>
                ---- ---------------- --------- ------------------<br>
                1&nbsp;&nbsp;&nbsp;&nbsp;default&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;active&nbsp;&nbsp;&nbsp;&nbsp;Fa0/1, Fa0/2...<br>
                10&nbsp;&nbsp;&nbsp;IT_Management&nbsp;&nbsp;&nbsp;&nbsp;active&nbsp;&nbsp;&nbsp;&nbsp;Fa0/24
            `;
        } 
        else {
            // Simulación PC Windows
            if(title) title.innerText = 'PC Admin (CMD)';
            output.innerHTML = `
                C:\\Users\\Admin> ping 192.168.1.1<br><br>
                Pinging 192.168.1.1 with 32 bytes of data:<br>
                Reply from 192.168.1.1: bytes=32 time<1ms TTL=255<br>
                Reply from 192.168.1.1: bytes=32 time<1ms TTL=255<br>
                Reply from 192.168.1.1: bytes=32 time<1ms TTL=255<br><br>
                Ping statistics for 192.168.1.1:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)
            `;
        }
        output.style.opacity = '1'; // Efecto suave de aparición
    }, 100);
}

/* ==================== 4. PLANETA 3D (BACKGROUND) ==================== */
const container = document.getElementById('earth-container');
if(container) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const earth = new THREE.Mesh(new THREE.SphereGeometry(2, 64, 64), new THREE.MeshPhongMaterial({
        map: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'),
        bumpMap: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'),
        bumpScale: 0.05
    }));

    scene.add(earth); 
    scene.add(new THREE.AmbientLight(0xffffff, 1)); // Luz suave
    
    camera.position.z = 5;

    function animate() { 
        requestAnimationFrame(animate); 
        earth.rotation.y += 0.003; // Rotación lenta
        renderer.render(scene, camera); 
    }
    animate();

    // Redimensionar si cambia la ventana
    window.addEventListener('resize', () => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
    });
}

/* ==================== 5. TYPEWRITER (TEXTO DINÁMICO) ==================== */
const roles = ["Soporte Broadcast", "Automatización IA", "Infraestructura"];
let ri=0, ci=0, del=false;

function typeWriter() {
    const el = document.getElementById('typewriter');
    if(el) {
        const cur = roles[ri];
        el.innerHTML = cur.substring(0, ci);
        
        if(!del && ci < cur.length) ci++;
        else if(del && ci > 0) ci--;
        else { 
            del = !del; 
            if(!del) ri = (ri + 1) % roles.length; 
        }
        
        setTimeout(typeWriter, del ? 50 : 150);
    }
}

/* ==================== 6. EXTRAS (CHATBOT & CMD) ==================== */
function toggleChat() { 
    document.getElementById('chat-window').classList.toggle('open'); 
}

function askBot(t) {
    const b = document.getElementById('chat-body');
    const r = t === 'tv' ? 'Doy soporte a sistemas críticos como GV Stratus en Canal 6.' : 'Puedes descargar mi CV en la sección superior.';
    
    b.innerHTML += `<div class="msg user-msg">${t}</div>`;
    setTimeout(() => {
        b.innerHTML += `<div class="msg bot-msg">${r}</div>`;
        b.scrollTop = b.scrollHeight;
    }, 500);
}

function toggleCmd() { 
    document.getElementById('cmd-overlay').classList.toggle('active');
    document.getElementById('cmd-input').focus();
}

// Cerrar con tecla Escape
document.addEventListener('keydown', e => { 
    if((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); toggleCmd(); }
    if(e.key === 'Escape') document.getElementById('cmd-overlay').classList.remove('active');
});