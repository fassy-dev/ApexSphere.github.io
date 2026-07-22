const allowedDomains = [
    'apexsphere.ru',
    'www.apexsphere.ru',
    'ApexSphere.github.io',
    'apexsphere.github.io'
];

if (!allowedDomains.includes(window.location.hostname.toLowerCase())) {
    document.body.innerHTML = '<h2>Доступ запрещен</h2>';
    throw new Error('Несанкционированный доступ');
}

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

function isRealBrowser() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return false;

    if (screen.width < 100 || screen.height < 100) return false;

    if (!('ontouchstart' in window) && navigator.maxTouchPoints === 0) {
        if (!window.matchMedia('(pointer: fine)').matches) return false;
    }
    return true;
}

const startTime = performance.now();
const timeSpent = performance.now() - startTime;
if (timeSpent < 1) {
    alert("Подозрительная активность");
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

// Умный поиск и навигация
class SmartSearch {
    constructor() {
        this.isOpen = false;
        this.searchIndex = [];
        this.selectedIndex = -1;
        this.modal = null;
        this.input = null;
        this.results = null;

        this.initSearchIndex();
        this.bindKeyboardShortcuts();
    }

    initSearchIndex() {
        // Индекс для поиска - собираем все данные со страницы
        this.searchIndex = [
            {
                title: 'Сервер Vanilla 26.1.2',
                description: 'Классическое выживание и честное комьюнити',
                section: '#servers',
                icon: '🎮',
                keywords: ['сервер', 'ванилла', 'выживание', 'vanilla', 'играть', 'ip']
            },
            {
                title: 'Как начать играть',
                description: 'Пошаговая инструкция для новичков',
                section: '#how-to',
                icon: '📖',
                keywords: ['начать', 'инструкция', 'гайд', 'помощь', 'новичок']
            },
            {
                title: 'Магазин услуг',
                description: 'VIP, Premium и другие привилегии',
                section: '#shop',
                icon: '🛒',
                keywords: ['донат', 'купить', 'привилегия', 'vip', 'premium', 'магазин']
            },
            {
                title: 'VIP Статус',
                description: 'Уникальный префикс, суффикс и цветной ник в табе',
                section: '#shop',
                icon: '💎',
                keywords: ['vip', 'статус', 'привилегия', 'префикс', '150₽']
            },
            {
                title: 'Premium Статус',
                description: 'Максимальный комфорт: все фишки VIP и множество другого',
                section: '#shop',
                icon: '👑',
                keywords: ['premium', 'премиум', 'максимальный', 'привилегия', '350₽']
            },
            {
                title: 'Режим Полёта',
                description: 'Доступ к команде /fly ровно на 24 часа',
                section: '#shop',
                icon: '🦅',
                keywords: ['полет', 'fly', 'летать', '25₽']
            },
            {
                title: 'Сравнение привилегий',
                description: 'Сравнение VIP с Premium на сервере Vanilla',
                section: '#compare',
                icon: '📊',
                keywords: ['сравнение', 'таблица', 'vip', 'premium', 'возможности']
            },
            {
                title: 'FAQ - Частые вопросы',
                description: 'Ответы на популярные вопросы игроков',
                section: '#faq',
                icon: '❓',
                keywords: ['вопросы', 'ответы', 'помощь', 'faq', 'проблема']
            },
            {
                title: 'Наши контакты',
                description: 'Discord, Telegram и другие способы связи',
                section: '#contacts',
                icon: '📞',
                keywords: ['контакты', 'дискорд', 'телеграм', 'связь', 'поддержка']
            },
            {
                title: 'Правила проекта',
                description: 'Ознакомьтесь с правилами сервера',
                section: 'rules/index.html',
                icon: '📜',
                keywords: ['правила', 'запреты', 'наказания', 'бан']
            },
            {
                title: 'Discord канал',
                description: 'Официальный Discord сервер ApexSphere',
                url: 'https://discord.com/QeWAYQmsEK',
                icon: '💬',
                keywords: ['дискорд', 'discord', 'чат', 'голос', 'общение']
            },
            {
                title: 'Telegram канал',
                description: 'Официальный Telegram канал с новостями',
                url: 'https://t.me/ApexSphereMine',
                icon: '📢',
                keywords: ['телеграм', 'telegram', 'новости', 'канал']
            }
        ];
    }

    open() {
        if (this.isOpen) return;

        // Создаем модальное окно
        this.modal = document.createElement('div');
        this.modal.className = 'search-modal';
        this.modal.innerHTML = `
            <div class="search-container">
                <div class="search-input-wrapper">
                    <span class="search-input-icon">🔍</span>
                    <input
                        type="text"
                        class="search-input"
                        placeholder="Поиск по сайту..."
                        autofocus
                        autocomplete="off"
                    >
                    <button class="search-close" onclick="smartSearch.close()">✕</button>
                </div>
                <div class="search-results"></div>
                <div class="search-footer">
                    <div class="search-hints">
                        <span><kbd>↑</kbd> <kbd>↓</kbd> Навигация</span>
                        <span><kbd>Enter</kbd> Открыть</span>
                        <span><kbd>Esc</kbd> Закрыть</span>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(this.modal);
        this.input = this.modal.querySelector('.search-input');
        this.results = this.modal.querySelector('.search-results');

        // Показываем начальные результаты
        this.showQuickLinks();

        // Обработчики событий
        this.input.addEventListener('input', (e) => this.handleSearch(e.target.value));
        this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Закрытие по клику вне окна
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        this.isOpen = true;
        document.body.style.overflow = 'hidden';

        // Анимация появления
        setTimeout(() => this.input.focus(), 100);
    }

    close() {
        if (!this.isOpen) return;

        this.modal.style.opacity = '0';
        setTimeout(() => {
            if (this.modal) {
                this.modal.remove();
                this.modal = null;
            }
            this.isOpen = false;
            this.selectedIndex = -1;
            document.body.style.overflow = '';
        }, 200);
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.showQuickLinks();
            return;
        }

        const searchTerm = query.toLowerCase().trim();
        const results = this.searchIndex.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(searchTerm);
            const descMatch = item.description.toLowerCase().includes(searchTerm);
            const keywordMatch = item.keywords.some(k => k.includes(searchTerm));

            return titleMatch || descMatch || keywordMatch;
        });

        this.displayResults(results, searchTerm);
    }

    showQuickLinks() {
        const quickLinks = [
            this.searchIndex.find(i => i.title.includes('Сервер')),
            this.searchIndex.find(i => i.title.includes('начать')),
            this.searchIndex.find(i => i.title.includes('Магазин')),
            this.searchIndex.find(i => i.title.includes('FAQ')),
            this.searchIndex.find(i => i.title.includes('Контакты')),
        ].filter(Boolean);

        this.results.innerHTML = `
            <div style="padding: 15px 10px; color: rgba(255,255,255,0.5); font-size: 0.85rem;">
                Быстрые ссылки
            </div>
            ${quickLinks.map((item, index) => `
                <div class="search-result-item" data-index="${index}" onclick="smartSearch.navigateTo('${item.section || item.url}')">
                    <div class="search-result-icon">${item.icon}</div>
                    <div class="search-result-info">
                        <div class="search-result-title">${item.title}</div>
                        <div class="search-result-description">${item.description}</div>
                    </div>
                    <div class="search-result-badge">${item.section ? 'Раздел' : 'Ссылка'}</div>
                </div>
            `).join('')}
        `;

        this.selectedIndex = -1;
    }

    displayResults(results, searchTerm) {
        if (results.length === 0) {
            this.results.innerHTML = `
                <div class="search-empty">
                    <div class="search-empty-icon">🔍</div>
                    <p>Ничего не найдено по запросу "<strong>${this.escapeHtml(searchTerm)}</strong>"</p>
                    <p style="margin-top: 10px; font-size: 0.85rem;">Попробуйте изменить запрос</p>
                </div>
            `;
            return;
        }

        const highlightTerm = (text, term) => {
            if (!term) return text;
            const regex = new RegExp(`(${this.escapeRegex(term)})`, 'gi');
            return text.replace(regex, '<span class="search-highlight">$1</span>');
        };

        this.results.innerHTML = `
            <div style="padding: 15px 10px; color: rgba(255,255,255,0.5); font-size: 0.85rem;">
                Найдено результатов: ${results.length}
            </div>
            ${results.map((item, index) => `
                <div class="search-result-item"
                     data-index="${index}"
                     data-section="${item.section || item.url}"
                     onclick="smartSearch.navigateTo('${item.section || item.url}')"
                     onmouseenter="smartSearch.highlightResult(${index})">
                    <div class="search-result-icon">${item.icon}</div>
                    <div class="search-result-info">
                        <div class="search-result-title">${highlightTerm(item.title, searchTerm)}</div>
                        <div class="search-result-description">${highlightTerm(item.description, searchTerm)}</div>
                    </div>
                    <div class="search-result-badge">${item.section ? '📄 Раздел' : '🔗 Ссылка'}</div>
                </div>
            `).join('')}
        `;

        this.selectedIndex = -1;
    }

    highlightResult(index) {
        const items = this.results.querySelectorAll('.search-result-item');
        items.forEach(item => item.classList.remove('active'));

        if (index >= 0 && index < items.length) {
            items[index].classList.add('active');
            this.selectedIndex = index;
        }
    }

    handleKeyDown(e) {
        const items = this.results.querySelectorAll('.search-result-item');

        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.selectedIndex = Math.min(this.selectedIndex + 1, items.length - 1);
                this.highlightResult(this.selectedIndex);
                break;

            case 'ArrowUp':
                e.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
                this.highlightResult(this.selectedIndex);
                break;

            case 'Enter':
                e.preventDefault();
                if (this.selectedIndex >= 0 && this.selectedIndex < items.length) {
                    const selectedItem = items[this.selectedIndex];
                    const section = selectedItem.dataset.section;
                    this.navigateTo(section);
                } else if (items.length === 1) {
                    // Если только один результат - сразу переходим
                    const section = items[0].dataset.section;
                    this.navigateTo(section);
                }
                break;

            case 'Escape':
                e.preventDefault();
                this.close();
                break;
        }
    }

    navigateTo(target) {
        this.close();

        if (!target) return;

        setTimeout(() => {
            if (target.startsWith('#')) {
                // Внутренняя навигация
                const element = document.querySelector(target);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });

                    // Подсветка секции
                    element.style.transition = 'box-shadow 0.3s';
                    element.style.boxShadow = '0 0 30px rgba(100, 255, 218, 0.5)';
                    setTimeout(() => {
                        element.style.boxShadow = '';
                    }, 2000);
                }
            } else if (target.startsWith('http')) {
                // Внешняя ссылка
                window.open(target, '_blank');
            } else {
                // Внутренняя страница
                window.location.href = target;
            }
        }, 300);
    }

    bindKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+K или Cmd+K для открытия поиска
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.open();
            }

            // / для быстрого поиска (кроме полей ввода)
            if (e.key === '/' && !this.isOpen &&
                !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                e.preventDefault();
                this.open();
            }
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

// Инициализация поиска
const smartSearch = new SmartSearch();

// Глобальная функция для HTML onclick
function openSearch() {
    smartSearch.open();
}

// Интерактивный тур по сайту
class SiteTour {
    constructor() {
        this.steps = [
            {
                target: '#main',
                title: '🏠 Добро пожаловать в ApexSphere!',
                description: 'Это главная страница нашего Minecraft проекта. Здесь вы найдете все необходимое для комфортной игры.',
                position: 'bottom',
                highlight: true
            },
            {
                target: '#servers',
                title: '🎮 Игровые серверы',
                description: 'Здесь отображаются наши серверы. Вы можете увидеть онлайн и скопировать IP-адрес для подключения.',
                position: 'top'
            },
            {
                target: '.ip-copy-wrapper',
                title: '📋 Копирование IP',
                description: 'Нажмите на этот блок, чтобы скопировать адрес сервера. Просто вставьте его в Minecraft и играйте!',
                position: 'right'
            },
            {
                target: '#how-to',
                title: '📖 Как начать играть',
                description: 'Следуйте этим 3 простым шагам: запустите Minecraft, скопируйте IP и присоединяйтесь к игре!',
                position: 'top'
            },
            {
                target: '#shop',
                title: '🛒 Магазин услуг',
                description: 'Здесь вы можете приобрести VIP, Premium и другие привилегии для улучшения игрового опыта.',
                position: 'bottom'
            },
            {
                target: '#compare',
                title: '📊 Сравнение привилегий',
                description: 'Подробная таблица сравнения возможностей VIP и Premium статусов. Выберите подходящий для вас вариант.',
                position: 'top'
            },
            {
                target: '#faq',
                title: '❓ Частые вопросы',
                description: 'Здесь собраны ответы на популярные вопросы. Если не нашли ответа - обращайтесь в поддержку!',
                position: 'top'
            },
            {
                target: '.theme-switch-wrapper',
                title: '🌓 Переключение темы',
                description: 'Нажмите сюда, чтобы переключить тему: темная, светлая или автоматическая (как в системе).',
                position: 'bottom'
            },
            {
                target: '#contacts',
                title: '📞 Связь с нами',
                description: 'Присоединяйтесь к нашему сообществу в Discord и Telegram. Будьте в курсе всех новостей!',
                position: 'top'
            }
        ];

        this.currentStep = 0;
        this.isActive = false;
        this.overlay = null;
        this.tooltip = null;
        this.highlight = null;

        this.init();
    }

    init() {
        // Создаем кнопку запуска тура
        this.createStartButton();

        // Проверяем, первый ли это визит
        this.checkFirstVisit();
    }

    createStartButton() {
        const btn = document.createElement('button');
        btn.className = 'start-tour-btn';
        btn.innerHTML = '🎯';
        btn.setAttribute('aria-label', 'Запустить тур по сайту');

        const label = document.createElement('span');
        label.className = 'tour-btn-label';
        label.textContent = 'Тур по сайту';
        btn.appendChild(label);

        btn.onclick = () => this.start();

        document.body.appendChild(btn);
    }

    checkFirstVisit() {
        const tourCompleted = localStorage.getItem('apex-tour-completed');

        //if (!tourCompleted) {
            // Показываем предложение через 3 секунды
            //setTimeout(() => {
                //this.showWelcomeMessage();
            //}, 3000);
        //}
    }

    showWelcomeMessage() {
        const message = document.createElement('div');
        message.className = 'tour-welcome-message';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(145deg, #1a1f2e, #151928);
            border: 1px solid rgba(100, 255, 218, 0.3);
            border-radius: 16px;
            padding: 20px 30px;
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 15px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            animation: slideDown 0.5s ease;
        `;

        message.innerHTML = `
            <span style="font-size: 2rem;">👋</span>
            <div>
                <strong style="color: #fff;">Добро пожаловать на ApexSphere!</strong>
                <p style="color: rgba(255,255,255,0.7); margin: 5px 0 0; font-size: 0.9rem;">Хотите быстрый тур по сайту?</p>
            </div>
            <button onclick="siteTour.start(); this.parentElement.remove();"
                    style="padding: 8px 20px; background: var(--cyan); color: #000; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                Да!
            </button>
            <button onclick="this.parentElement.remove();"
                    style="background: none; border: none; color: rgba(255,255,255,0.5); cursor: pointer; font-size: 1.2rem;">
                ✕
            </button>
        `;

        document.body.appendChild(message);

        // Автоматически скрываем через 15 секунд
        setTimeout(() => {
            if (message.parentElement) {
                message.remove();
            }
        }, 15000);
    }

    start() {
        if (this.isActive) return;

        this.isActive = true;
        this.currentStep = 0;

        // Прокручиваем наверх
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
            this.showStep(this.currentStep);
        }, 500);

        // Скрываем кнопку запуска
        const startBtn = document.querySelector('.start-tour-btn');
        if (startBtn) startBtn.style.display = 'none';
    }

    showStep(index) {
        // Удаляем предыдущие элементы
        this.cleanup();

        if (index >= this.steps.length) {
            this.complete();
            return;
        }

        const step = this.steps[index];
        const target = document.querySelector(step.target);

        if (!target) {
            console.warn(`Элемент ${step.target} не найден, пропускаем шаг`);
            this.nextStep();
            return;
        }

        // Прокручиваем к элементу
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(() => {
            const rect = target.getBoundingClientRect();

            // Создаем оверлей с подсветкой
            this.overlay = document.createElement('div');
            this.overlay.className = 'tour-overlay';

            this.highlight = document.createElement('div');
            this.highlight.className = 'tour-highlight';
            this.highlight.style.cssText = `
                left: ${rect.left - 10}px;
                top: ${rect.top - 10}px;
                width: ${rect.width + 20}px;
                height: ${rect.height + 20}px;
            `;

            this.overlay.appendChild(this.highlight);
            document.body.appendChild(this.overlay);

            // Создаем подсказку
            this.createTooltip(step, rect);

            // Обработчик клика по оверлею
            this.overlay.onclick = (e) => {
                if (e.target === this.overlay) {
                    this.nextStep();
                }
            };

            // Обработчик клавиатуры
            this.keyboardHandler = (e) => {
                switch(e.key) {
                    case 'ArrowRight':
                    case 'Enter':
                        e.preventDefault();
                        this.nextStep();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.previousStep();
                        break;
                    case 'Escape':
                        e.preventDefault();
                        this.skip();
                        break;
                }
            };
            document.addEventListener('keydown', this.keyboardHandler);

        }, 800);
    }

    createTooltip(step, targetRect) {
        this.tooltip = document.createElement('div');
        this.tooltip.className = `tour-tooltip tooltip-${step.position}`;

        // Позиционирование
        let left, top;
        const spacing = 20;

        switch(step.position) {
            case 'top':
                left = targetRect.left + targetRect.width / 2 - 200;
                top = targetRect.top - 250;
                break;
            case 'bottom':
                left = targetRect.left + targetRect.width / 2 - 200;
                top = targetRect.bottom + spacing;
                break;
            case 'left':
                left = targetRect.left - 420;
                top = targetRect.top + targetRect.height / 2 - 150;
                break;
            case 'right':
                left = targetRect.right + spacing;
                top = targetRect.top + targetRect.height / 2 - 150;
                break;
        }

        // Корректировка чтобы не выходило за экран
        left = Math.max(10, Math.min(left, window.innerWidth - 410));
        top = Math.max(10, Math.min(top, window.innerHeight - 250));

        this.tooltip.style.left = `${left}px`;
        this.tooltip.style.top = `${top}px`;

        this.tooltip.innerHTML = `
            <div class="tour-step-counter">
                Шаг ${this.currentStep + 1} из ${this.steps.length}
            </div>
            <h3>${step.title}</h3>
            <p>${step.description}</p>
            <div class="tour-actions">
                <button class="tour-btn" onclick="siteTour.previousStep()">
                    ← Назад
                </button>
                <div class="tour-progress">
                    <div class="tour-progress-bar" style="width: ${((this.currentStep + 1) / this.steps.length) * 100}%"></div>
                </div>
                <button class="tour-btn primary" onclick="siteTour.nextStep()">
                    ${this.currentStep === this.steps.length - 1 ? 'Завершить 🎉' : 'Далее →'}
                </button>
            </div>
            <div style="text-align: center; margin-top: 10px;">
                <button class="tour-skip" onclick="siteTour.skip()">
                    Пропустить тур
                </button>
            </div>
        `;

        document.body.appendChild(this.tooltip);
    }

    nextStep() {
        this.currentStep++;
        this.showStep(this.currentStep);
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showStep(this.currentStep);
        }
    }

    skip() {
        this.cleanup();
        this.complete();
    }

    complete() {
        this.cleanup();
        this.isActive = false;

        // Сохраняем отметку о прохождении
        localStorage.setItem('apex-tour-completed', 'true');

        // Показываем завершающее сообщение
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(145deg, #1a1f2e, #151928);
            border: 2px solid var(--cyan);
            border-radius: 20px;
            padding: 40px;
            z-index: 10004;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: slideIn 0.5s ease;
        `;

        message.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
            <h2 style="color: #fff; margin-bottom: 10px;">Тур завершён!</h2>
            <p style="color: rgba(255,255,255,0.7); margin-bottom: 20px;">
                Теперь вы знаете всё необходимое для комфортной игры на ApexSphere!
            </p>
            <p style="color: var(--cyan); margin-bottom: 25px;">
                Приятной игры! ⛏️
            </p>
            <button onclick="this.parentElement.remove()"
                    style="padding: 12px 30px; background: var(--cyan); color: #000; border: none; border-radius: 12px; cursor: pointer; font-weight: 600; font-size: 1rem;">
                Начать играть!
            </button>
        `;

        document.body.appendChild(message);

        // Показываем кнопку тура снова
        const startBtn = document.querySelector('.start-tour-btn');
        if (startBtn) startBtn.style.display = 'flex';

        // Автоматически скрываем
        setTimeout(() => {
            if (message.parentElement) {
                message.remove();
            }
        }, 5000);
    }

    cleanup() {
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
        }
        if (this.tooltip) {
            this.tooltip.remove();
            this.tooltip = null;
        }
        if (this.highlight) {
            this.highlight = null;
        }
        if (this.keyboardHandler) {
            document.removeEventListener('keydown', this.keyboardHandler);
            this.keyboardHandler = null;
        }
    }
}

// Инициализация тура
const siteTour = new SiteTour();

// Глобальные функции для HTML onclick
function startTour() {
    siteTour.start();
}

// Добавляем в консоль подсказку
console.log('💡 Подсказка: нажмите кнопку 🎯 в правом нижнем углу для тура по сайту');
