// ===================== PORTFOLIO SLIDER =====================
// Déclarées en scope global pour être accessibles partout
let currentSlide = 0;
let slides, dots, total;

function goToSlide(index) {
    if (!slides || !dots) return;
    dots[currentSlide].setAttribute('aria-selected', 'false');
    dots[currentSlide].classList.remove('active');
    slides[currentSlide].classList.remove('active');

    currentSlide = (index + total) % total;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    dots[currentSlide].setAttribute('aria-selected', 'true');
}

function slidePortfolio(direction) {
    goToSlide(currentSlide + direction);
}

// ===================== INITIALISATION =====================
document.addEventListener('DOMContentLoaded', () => {

    // Active le système reveal seulement quand JS est prêt
    document.body.classList.add('js-loaded');

    // ===================== SCROLL REVEAL =====================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Init du slider
    slides = document.querySelectorAll('.slide');
    dots   = document.querySelectorAll('.dot');
    total  = slides.length;

    // Boutons fleches
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    if (prevBtn) prevBtn.addEventListener('click', () => slidePortfolio(1));
    if (nextBtn) nextBtn.addEventListener('click', () => slidePortfolio(-1));

    // Dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goToSlide(i));
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(i);
            }
        });
    });

    // Swipe tactile mobile
    let touchStartX = 0;
    const sliderTrack = document.getElementById('sliderTrack');
    if (sliderTrack) {
        sliderTrack.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        sliderTrack.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) slidePortfolio(diff > 0 ? 1 : -1);
        });

        // Swipe trackpad desktop (deltaX) - un seul slide par geste
        let lastWheelTime = 0;
        sliderTrack.addEventListener('wheel', e => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
                const now = Date.now();
                if (now - lastWheelTime > 1200) {
                    slidePortfolio(e.deltaX > 0 ? 1 : -1);
                    lastWheelTime = now;
                }
            }
        }, { passive: false });
    }

    // ===================== MOBILE MENU =====================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks      = document.getElementById('navLinks');

    function toggleMenu() {
        const isOpen = navLinks.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-label', 'Ouvrir le menu');
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // ===================== SMOOTH SCROLL =====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ===================== FORM =====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Merci pour votre message ! Nous vous recontacterons tres bientot.');
            contactForm.reset();
        });
    }

    // ===================== HEADER SHADOW =====================
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.pageYOffset > 0
            ? '0 4px 30px rgba(0,0,0,0.1)'
            : '0 4px 20px rgba(0,0,0,0.05)';
    }, { passive: true });

    // ===================== MODAL MENTIONS LÉGALES =====================
    const legalModal  = document.getElementById('legalModal');
    const openLegal   = document.getElementById('openLegal');
    const closeLegal  = document.getElementById('closeLegal');

    if (openLegal && legalModal) {
        openLegal.addEventListener('click', () => {
            legalModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        closeLegal.addEventListener('click', () => {
            legalModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        legalModal.addEventListener('click', (e) => {
            if (e.target === legalModal) {
                legalModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                legalModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});