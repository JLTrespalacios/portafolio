// =============================================================
//  PORTAFOLIO PROFESIONAL - OPTIMIZACIÓN ES6+
//  Autor: Jose Leonardo Trespalacios Bedoya
//  Versión: Premium Optimizada
// =============================================================

// ==================== SELECTORES REUTILIZABLES ====================
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ==================== SMOOTH SCROLL & ACTIVE LINK ====================
$$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = $(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            updateActiveLink();
        }
    });
});

function updateActiveLink() {
    const sections = $$('section');
    const navLinks = $$('.nav-link');

    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 200) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').slice(1) === current);
    });
}

window.addEventListener('scroll', updateActiveLink);

// ==================== HAMBURGER MENU ====================
const hamburger = $('.hamburger');
const navMenu = $('.nav-menu');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('show-menu');
    hamburger.classList.toggle('active');
});



// ==================== SCROLL ANIMATIONS ====================
const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

$$('.skill-card, .project-card, .cert-card, .info-item').forEach(el => fadeObserver.observe(el));

// ==================== FORM VALIDATION & SUBMISSION (EMAILJS) ====================
// Inicializar EmailJS GLOBALMENTE
(function() {
    // Inicializar EmailJS con la Public Key correcta del screenshot
    emailjs.init("gyXgDAJTWlp8jx45p");
})();

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Capturar dimensiones exactas antes de cambiar el contenido
    const originalWidth = submitBtn.offsetWidth;
    const originalHeight = submitBtn.offsetHeight;

    // Bloquear dimensiones para evitar "saltos"
    submitBtn.style.width = `${originalWidth}px`;
    submitBtn.style.height = `${originalHeight}px`;
    submitBtn.style.display = 'inline-flex';
    submitBtn.style.justifyContent = 'center';
    submitBtn.style.alignItems = 'center';
    
    // Validación básica
    if (!this.name.value || !this.email.value || !this.message.value || !this.subject.value) {
        formStatus.innerHTML = "⚠ Por favor completa todos los campos";
        formStatus.className = "status error";
        // Restaurar botón si hay error inmediato
        submitBtn.style.width = '';
        submitBtn.style.height = '';
        return;
    }

    // Loading state (Solo icono para asegurar que quepa en el mismo espacio)
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    // Enviar email
    const serviceID = "service_chnbzl9";
    const templateID = "template_u6ipyec";

    // NOTA: Ya no pasamos la public key aquí porque la inicializamos arriba
    emailjs.send(serviceID, templateID, {
        name: this.name.value,
        email: this.email.value,
        subject: this.subject.value,
        message: this.message.value
    })
    .then(() => {
        formStatus.innerHTML = "✔ Mensaje enviado con éxito";
        formStatus.className = "status success";
        this.reset();
        
        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
            formStatus.innerHTML = "";
            formStatus.className = "status";
        }, 5000);
    })
    .catch((error) => {
        console.error('EmailJS Error:', error);
        formStatus.innerHTML = `❌ Error: ${error.text || "Revisa la consola"}`;
        formStatus.className = "status error";
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
});

// ==================== FLOATING LABELS ====================
$$('.form-input').forEach(input => {
    input.addEventListener('focus', () => input.parentElement.classList.add('focused'));

    input.addEventListener('blur', () => {
        if (!input.value.trim()) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// ==================== PROJECT CARDS HOVER EFFECT ====================
const projectCards = $$('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        projectCards.forEach(c => (c !== card) && (c.style.opacity = '0.6'));
    });
    card.addEventListener('mouseleave', () => {
        projectCards.forEach(c => c.style.opacity = '1');
    });
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const y = window.pageYOffset;
    $$('.gradient-orb').forEach((orb, i) => {
        orb.style.transform = `translateY(${y * 0.25 * (i + 1)}px)`;
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = $('.nav');

window.addEventListener('scroll', () => {
    navbar?.classList.toggle('navbar-scrolled', window.scrollY > 100);
});

// ==================== BUTTON RIPPLE EFFECT ====================
$$('.btn, .btn-project, .btn-submit').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        ripple.classList.add('ripple');

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ==================== COUNTER ANIMATION ====================
const stats = $$('.stat h3');
const statsSection = $('.hero-stats');

const startCounter = () => {
    const values = [50, 100, 5];

    stats.forEach((stat, i) => {
        let start = 0;
        const end = values[i];
        const speed = 30;
        const increment = end / 50;

        const counter = setInterval(() => {
            start += increment;
            if (start >= end) {
                stat.textContent = end + (stat.textContent.includes('%') ? '%' : '+');
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(start) + (stat.textContent.includes('%') ? '%' : '+');
            }
        }, speed);
    });
};

if (statsSection) {
    new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
            startCounter();
            observer.unobserve(statsSection);
        }
    }, { threshold: 0.5 }).observe(statsSection);
}

// ==================== DARK MODE AUTO ====================
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
}

// ==================== PAGE LOAD ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==================== CLOSE MENU ON LINK ====================
navMenu && $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        hamburger.classList.remove('active');
    });
});

// ==================== ANIMACIÓN TITULARES ====================
$$('.section-header').forEach(el => {
    el.classList.add('hidden');
    fadeObserver.observe(el);
});

// ==================== MENSAJE EN CONSOLA ====================
console.log('%c🚀 Bienvenido al portafolio de Jose Leonardo Trespalacios Bedoya', 'color: #00d4ff; font-size: 18px; font-weight: bold;');
console.log('%c✨ Desarrollemos algo extraordinario juntos.', 'color: #7b2ff7; font-size: 14px;');

// ==================== NEW FUNCTIONALITY (FUTURISTIC) ====================

// --- 1. Button Functionality ---
$('#btn-get-started')?.addEventListener('click', () => {
    $('#projects')?.scrollIntoView({ behavior: 'smooth' });
});

$('#btn-watch-demo')?.addEventListener('click', () => {
    // Scroll to about or show a demo modal
    $('#about')?.scrollIntoView({ behavior: 'smooth' });
});

// --- 2. Custom Cursor ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows immediately
    if (cursorDot) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    }

    // Outline follows with delay
    if (cursorOutline) {
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    }
});

// Hover effects for cursor
const hoverables = document.querySelectorAll('a, button, .skill-card, .project-card, .info-item, .logo');

hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// --- 3. Typing Effect & Translations ---
let typingTimeout;
let textToType = "Construyendo el futuro digital.";
const typingElement = document.getElementById('typing-text');
let charIndex = 0;

function typeText() {
    if (typingElement && charIndex < textToType.length) {
        typingElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        typingTimeout = setTimeout(typeText, 100);
    }
}

// Start typing when page loads
setTimeout(typeText, 1000);

// Expose function for i18n
window.updateTypingText = function(newText) {
    if (typingElement) {
        clearTimeout(typingTimeout);
        typingElement.textContent = '';
        charIndex = 0;
        textToType = newText;
        typeText();
    }
};

/*
// ==================== TRANSLATION SYSTEM ====================
// MOVED TO js/i18n.js
// const translations = { ... };
// function updateLanguage(lang) { ... }
// ...
*/


// --- 4. Particles Background ---
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = '#00d4ff';

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                    + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = 'rgba(0, 212, 255,' + opacityValue + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    window.addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    });

    init();
    animate();
}

// --- 5. 3D Tilt Effect (Vanilla JS) ---
const tiltElements = document.querySelectorAll('.project-card, .skill-card, .cert-card');

tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const elRect = el.getBoundingClientRect();
        const x = e.clientX - elRect.left;
        const y = e.clientY - elRect.top;
        
        const centerX = elRect.width / 2;
        const centerY = elRect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg
        const rotateY = ((x - centerX) / centerX) * 10;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

document.querySelectorAll('.btn-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.cert-card');
        const details = card && card.querySelector('.cert-details');
        if (!details) return;
        const open = details.classList.toggle('open');
        details.style.maxHeight = open ? details.scrollHeight + 'px' : '0px';
    });
});

document.querySelectorAll('.cert-image img').forEach(img => {
    const explicit = img.getAttribute('data-diploma');
    const original = img.getAttribute('src');
    const lastSlash = original.lastIndexOf('/');
    const folder = original.slice(0, lastSlash + 1);
    const base = original.slice(lastSlash + 1, original.lastIndexOf('.'));

    const candidates = [];
    if (explicit) candidates.push(explicit);
    candidates.push(`${folder}${base}.jpg`);
    candidates.push(`${folder}${base}.png`);
    candidates.push(`${folder}${base}.webp`);
    candidates.push(`${folder}diplomas/${base}.jpg`);
    candidates.push(`${folder}diplomas/${base}.png`);
    candidates.push(`${folder}diplomas/${base}.webp`);

    const tryLoad = (url) => new Promise(resolve => {
        const t = new Image();
        t.onload = () => resolve(url);
        t.onerror = () => resolve(null);
        t.src = url;
    });

    (async () => {
        for (const url of candidates) {
            const ok = await tryLoad(url);
            if (ok) {
                img.src = ok;
                img.classList.add('diploma');
                break;
            }
        }
    })();
});

// ==================== FOOTER PARTICLES ====================
(function(){
    const canvas = document.getElementById("footerCanvas");
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h;
    
    function resize(){
        w = canvas.width = canvas.parentElement.offsetWidth;
        h = canvas.height = canvas.parentElement.offsetHeight;
    }
    window.addEventListener("resize", resize);
    resize();
    
    const particles = [];
    const P_COUNT = 45; 
    
    for(let i=0; i<P_COUNT; i++){
        particles.push({
            x: Math.random()*w,
            y: Math.random()*h,
            vx: (Math.random()-0.5)*0.4,
            vy: (Math.random()-0.5)*0.4,
            size: Math.random()*2+1
        });
    }
    
    function drawFooter(){
        ctx.clearRect(0,0,w,h);
        ctx.strokeStyle = "rgba(131, 56, 236, 0.15)";
        
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            
            if(p.x<0 || p.x>w) p.vx*=-1;
            if(p.y<0 || p.y>h) p.vy*=-1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
            ctx.fillStyle = "rgba(0, 212, 255, 0.4)";
            ctx.fill();
            
            // Connections
            for(let j=i+1; j<particles.length; j++){
                const p2 = particles[j];
                const d = Math.hypot(p.x-p2.x, p.y-p2.y);
                if(d < 120){
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(drawFooter);
    }
    drawFooter();
})();

