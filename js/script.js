if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

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

document.addEventListener("DOMContentLoaded", () => {

    const revealElements = document.querySelectorAll(".reveal");

    const checkReveal = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add("active");
            }
        });
    };


    window.addEventListener("scroll", checkReveal);
    checkReveal();


    const navLinks = document.querySelectorAll("header nav a, header .logo");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");


            if (targetId.startsWith("#")) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });

    // 3. ГЕНЕРАЦИЯ ЧАСТИЦ (ДЛЯ PARTICLES-CONTAINER)
    const particlesContainer = document.getElementById("particles-container");
    if (particlesContainer) {
        const createParticle = () => {
            const particle = document.createElement("div");
            particle.classList.add("particle");


            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.background = Math.random() > 0.5 ? "var(--cyan)" : "var(--accent-blue)";
            particle.style.opacity = Math.random() * 0.5 + 0.2;

            const duration = Math.random() * 5 + 5;
            particle.style.animationDuration = `${duration}s`;

            particlesContainer.appendChild(particle);


            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        };


        setInterval(createParticle, 300);
    }
});

// ФУНКЦИЯ ДЛЯ АВТО-ОПРОСА ОНЛАЙНА СЕРВЕРА
function updateServerOnline() {
    // Твой реальный технический адрес и порт хостинга
    const technicalIP = 'play.kek.team:25621';
    const statusBadge = document.getElementById('vanilla-status');
    const statusText = statusBadge.querySelector('.status-count-text');

    // Используем современное и стабильное API от mcstatus.io
    fetch(`https://api.mcstatus.io/v2/status/java/${technicalIP}`)
        .then(response => {
            if (!response.ok) throw new Error('Сеть не отвечает');
            return response.json();
        })
        .then(data => {
            if (data.online) {
                // Если сервер работает — включаем зеленый статус и пишем онлайн
                statusBadge.classList.remove('offline');
                statusBadge.classList.add('online');
                statusText.innerHTML = `Онлайн: ${data.players.online} / ${data.players.max}`;
            } else {
                // Если сервер выключен
                statusBadge.classList.remove('online');
                statusBadge.classList.add('offline');
                statusText.innerText = 'Оффлайн';
            }
        })
        .catch(err => {
            console.error('Ошибка мониторинга:', err);
            statusBadge.classList.remove('online');
            statusBadge.classList.add('offline');
            statusText.innerText = 'Оффлайн'; // Если API упал, пишем что оффлайн
        });
}

// Запускаем мониторинг сразу при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    updateServerOnline();
    // Обновляем данные каждые 30 секунд, чтобы не спамить запросами, но держать инфу свежей
    setInterval(updateServerOnline, 30000);
});

const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach(q => {
    q.addEventListener("click", () => {
        const item = q.parentElement;
        item.classList.toggle("active");
    });
});

// ==========================================================================
// ШТУЧКА: ЛОГИКА ТРЕХРЕЖИМНОГО ПЕРЕКЛЮЧАТЕЛЯ ТЕМЫ (ТЕМНАЯ / СВЕТЛАЯ / СИСТЕМНАЯ)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (!themeBtn) return;
    const themeIcon = themeBtn.querySelector(".theme-icon-slot");

    // Доступные режимы: 'dark', 'light', 'system'
    let currentTheme = localStorage.getItem("apex-theme") || "dark";

    // Функция применения темы
    function applyTheme(theme) {
        if (theme === "system") {
            const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.setAttribute("data-theme", isSystemDark ? "dark" : "light");
            themeIcon.innerText = "🖥️";
            themeBtn.setAttribute("title", "Тема: Как на устройстве");
        } else if (theme === "light") {
            document.documentElement.setAttribute("data-theme", "light");
            themeIcon.innerText = "☀️";
            themeBtn.setAttribute("title", "Тема: Светлая");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            themeIcon.innerText = "🌙";
            themeBtn.setAttribute("title", "Тема: Тёмная");
        }
    }

    // Клик по кнопке — переключаем по кругу: dark -> light -> system -> dark
    themeBtn.addEventListener("click", () => {
        if (currentTheme === "dark") {
            currentTheme = "light";
        } else if (currentTheme === "light") {
            currentTheme = "system";
        } else {
            currentTheme = "dark";
        }

        localStorage.setItem("apex-theme", currentTheme);
        applyTheme(currentTheme);
    });

    // Слушаем изменения системных настроек устройства в реальном времени
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        if (currentTheme === "system") {
            applyTheme("system");
        }
    });

    // Инициализация при первой загрузке страницы
    applyTheme(currentTheme);
});

