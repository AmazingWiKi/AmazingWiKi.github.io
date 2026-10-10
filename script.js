/* ============================================
   AMAZING ONLINE — MAIN SCRIPT
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // 1. ПРЕЛОАДЕР
    // ============================================
    window.addEventListener('load', () => {
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            if (preloader) preloader.classList.add('hidden');
        }, 1500);
    });

    // ============================================
    // 2. КАСТОМНЫЙ КУРСОР
    // ============================================
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    if (cursor && cursorDot) {
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        });

        function animateCursor() {
            dotX += (cursorX - dotX) * 0.9;
            dotY += (cursorY - dotY) * 0.9;

            cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
            cursorDot.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();
    }

    // ============================================
    // 3. ХЕДЕР ПРИ СКРОЛЛЕ
    // ============================================
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // 4. АНИМАЦИЯ СЧЁТЧИКОВ
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, observerOptions);

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 60;
        const duration = 2000;
        const stepTime = duration / 60;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString('ru-RU');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString('ru-RU');
            }
        }, stepTime);
    }

    // ============================================
    // 5. ПОЯВЛЕНИЕ КАРТОЧЕК ПРИ СКРОЛЛЕ
    // ============================================
    const cards = document.querySelectorAll('.about-card');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => cardObserver.observe(card));

    // ============================================
    // 6. ГЕНЕРАЦИЯ СЕРВЕРОВ
    // ============================================
    constservers = [
        { name: 'RED', online: '1000/1000' },
        { name: 'BLACK', online: '1000/1000' },
        { name: 'SKY', online: '1000/1000' },
        { name: 'X', online: '1000/1000' },
        { name: 'LIME', online: '1000/1000' },
        { name: 'YELLOW', online: '949/1000' },
        { name: 'TITAN', online: '851/1000' },
        { name: 'ROSE', online: '849/1000' },
        { name: 'GREEN', online: '831/1000' },
        { name: 'SILVER', online: '820/1000' },
        { name: 'FIRE', online: '802/1000' },
        { name: 'AZURE', online: '796/1000' }
    ];

    const serversGrid = document.getElementById('servers-grid');

    if (serversGrid) {
        servers.forEach((server, index) => {
            const card = document.createElement('div');
            card.className = 'server-card';
            card.style.animationDelay = `${index * 50}ms`;
            card.innerHTML = `
                <div class="server-name">${server.name}</div>
                <div class="server-status">
                    <span class="status-dot"></span>
                    <span class="server-online">${server.online}</span>
                </div>
            `;
            serversGrid.appendChild(card);
        });
    }

    // ============================================
    // 7. ГЕНЕРАЦИЯ РАБОТ
    // ============================================
    const jobs = [
        { icon: '🚢', title: 'Порт', desc: 'Разгрузка контейнеров' },
        { icon: '🌲', title: 'Лесопилка', desc: 'Заготовка древесины' },
        { icon: '⛏️', title: 'Шахта', desc: 'Добыча ресурсов' },
        { icon: '🚛', title: 'Дальнобойщик', desc: 'Перевозка грузов' },
        { icon: '🚜', title: 'Ферма', desc: 'Выращивание урожая' },
        { icon: '🎣', title: 'Рыбалка', desc: 'Ловля рыбы' },
        { icon: '🚕', title: 'Таксист', desc: 'Перевозка пассажиров' },
        { icon: '🔧', title: 'Автомеханик', desc: 'Ремонт автомобилей' }
    ];

    const jobsSlider = document.getElementById('jobs-slider');

    if (jobsSlider) {
        jobs.forEach(job => {
            const card = document.createElement('div');
            card.className = 'job-card';
            card.innerHTML = `
                <div class="job-icon">${job.icon}</div>
                <h3>${job.title}</h3>
                <p>${job.desc}</p>
            `;
            jobsSlider.appendChild(card);
        });
    }

    // ============================================
    // 8. ПЛАВНЫЙ СКРОЛЛ
    // ============================================
    window.scrollToSection = function(id) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // ============================================
    // 9. ЭФФЕКТ ПЕЧАТИ ДЛЯ ЗАГОЛОВКА
    // ============================================
    const heroTitle = document.querySelector('.hero-title');

    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';

        let i = 0;
        function type() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }

        setTimeout(type, 500);
    }

})();
