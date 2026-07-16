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


function updateServerOnline() {
    const technicalIP = 'play.kek.team:25621';
    const statusBadge = document.getElementById('vanilla-status');
    const statusText = statusBadge.querySelector('.status-count-text');


    fetch(`https://api.mcstatus.io/v2/status/java/${technicalIP}`)
        .then(response => {
            if (!response.ok) throw new Error('Сеть не отвечает');
            return response.json();
        })
        .then(data => {
            if (data.online) {

                statusBadge.classList.remove('offline');
                statusBadge.classList.add('online');
                statusText.innerHTML = `Онлайн: ${data.players.online} / ${data.players.max}`;
            } else {

                statusBadge.classList.remove('online');
                statusBadge.classList.add('offline');
                statusText.innerText = 'Оффлайн';
            }
        })
        .catch(err => {
            console.error('Ошибка мониторинга:', err);
            statusBadge.classList.remove('online');
            statusBadge.classList.add('offline');
            statusText.innerText = 'Оффлайн';
        });
}


document.addEventListener("DOMContentLoaded", () => {
    updateServerOnline();

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
// ЛОГИКА ТРЕХРЕЖИМНОГО ПЕРЕКЛЮЧАТЕЛЯ ТЕМЫ (ТЕМНАЯ / СВЕТЛАЯ / СИСТЕМНАЯ)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (!themeBtn) return;
    const themeIcon = themeBtn.querySelector(".theme-icon-slot");


    let currentTheme = localStorage.getItem("apex-theme") || "dark";


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


    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        if (currentTheme === "system") {
            applyTheme("system");
        }
    });


    applyTheme(currentTheme);
});

// ==========================================================================
// РАСКРЫТИЕ И СВЕРТЫВАНИЕ СРАВНИТЕЛЬНОЙ ТАБЛИЦЫ
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggle-compare-btn");
    const hiddenRows = document.getElementById("compare-more");

    if (!toggleBtn || !hiddenRows) return;

    toggleBtn.addEventListener("click", () => {

        const isOpen = hiddenRows.classList.toggle("show");


        if (isOpen) {
            toggleBtn.innerHTML = "🔼 Свернуть список";
        } else {
            toggleBtn.innerHTML = "🔽 Раскрыть полностью";


            document.getElementById("compare").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// ==========================================================================
// АВТОМАТИЧЕСКОЕ СКРЫТИЕ ШАПКИ ПРИ СКРОЛЛЕ ВНИЗ
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    if (!header) return;

    let lastScrollTop = 0;
    const scrollThreshold = 10;

    window.addEventListener("scroll", () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;


        if (currentScroll < 50) {
            header.classList.remove("hide");
            return;
        }


        if (Math.abs(currentScroll - lastScrollTop) <= scrollThreshold) return;

        if (currentScroll > lastScrollTop) {
            header.classList.add("hide");
        } else {
            header.classList.remove("hide");
        }

        lastScrollTop = currentScroll;
    });
});

// ==========================================================================
// ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК МАГАЗИНА (ВАНИЛЛА / АНАРХИЯ)
// ==========================================================================
window.switchShopTab = function(tabName, clickedBtn) {
    // Находим все кнопки вкладок и убираем у них активный класс
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Находим все блоки с товарами и прячем их
    const tabs = document.querySelectorAll('.shop-content-tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Включаем активный класс нажатой кнопке
    clickedBtn.classList.add('active');

    // Показываем нужный магазин
    const activeTab = document.getElementById(`shop-${tabName}`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
};
