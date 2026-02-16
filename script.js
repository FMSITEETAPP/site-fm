// Active le système reveal seulement quand JS est prêt
document.body.classList.add('js-loaded');

// Scroll Reveal via IntersectionObserver
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.05 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===================== PORTFOLIO SLIDER =====================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots   = document.querySelectorAll('.dot');
const total  = slides.length;

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + total) % total;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function slidePortfolio(direction) {
    goToSlide(currentSlide + direction);
}

// Swipe tactile mobile
let touchStartX = 0;
const sliderTrack = document.getElementById('sliderTrack');
if (sliderTrack) {
    sliderTrack.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
    sliderTrack.addEventListener('touchend',   e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) slidePortfolio(diff > 0 ? 1 : -1);
    });
}

// ===================== MOBILE MENU =====================
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

function closeMenu() {
    document.getElementById('navLinks').classList.remove('active');
}

// ===================== SMOOTH SCROLL =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===================== FORM =====================
function handleSubmit(event) {
    event.preventDefault();
    alert('Merci pour votre message ! Nous vous recontacterons très bientôt.');
    event.target.reset();
}

// ===================== HEADER SHADOW =====================
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.style.boxShadow = window.pageYOffset > 0
        ? '0 4px 30px rgba(0,0,0,0.1)'
        : '0 4px 20px rgba(0,0,0,0.05)';
});