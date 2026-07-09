// 1. ЧАСТИЦЫ
function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    const colors = ['#64ffda', '#ffffff', '#38e038', '#ffcc00'];
    for (let i = 0; i < 60; i++) {
        let p = document.createElement('div');
        p.className = 'particle';
        let s = Math.random() * 4 + 2 + 'px';
        p.style.width = s; p.style.height = s;
        p.style.left = Math.random() * 100 + 'vw';
        p.style.animationDuration = Math.random() * 12 + 8 + 's';
        p.style.animationDelay = Math.random() * 5 + 's';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(p);
    }
}
createParticles();

// 2. СКРОЛЛ-АНИМАЦИЯ И ПОКАЗ УВЕДОМЛЕНИЯ
function reveal() {
    let reveals = document.querySelectorAll(".reveal");
    reveals.forEach(r => {
        let top = r.getBoundingClientRect().top;
        if (top < window.innerHeight - 150) r.classList.add("active");
    });
}

function showNotif() {
    const notif = document.getElementById('notification');
    if (notif) {
        setTimeout(() => notif.classList.add('active'), 2000);
    }
}

function closeNotif() {
    const notif = document.getElementById('notification');
    if (notif) notif.classList.remove('active');
}

window.addEventListener("scroll", reveal);
window.onload = () => { reveal(); showNotif(); };

// 3. ПЕРЕВОД
const userLang = navigator.language || navigator.userLanguage;
if (!userLang.startsWith('ru')) {
    document.querySelectorAll('nav a').forEach(el => {
        const enText = el.getAttribute('data-en');
        if (enText) el.innerText = enText;
    });
    const rulesLink = document.querySelector('nav a[href*="index.html"]');
    if (rulesLink && rulesLink.innerText.includes('Правила')) rulesLink.innerText = "Rules";

    const elements = {
        'dl-text': 'Download Launcher',
        'welcome-p': 'Your ideal Minecraft world. Info about opening in Discord/TG!',
        'h-servers': 'Our Servers',
        'h-shop': 'Store',
        'h-support': 'Support',
        'status-text': 'Preparing for launch...',
        'notif-desc': 'We are working on improvements and will open soon! Stay tuned.'
    };
    for (let id in elements) {
        let el = document.getElementById(id);
        if (el) el.innerText = elements[id];
    }
}

console.log("%cApexSphere", "color: #64ffda; font-size: 40px; font-weight: bold; text-shadow: 3px 3px 0 #000;");
