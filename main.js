/**
 * Sowra Sree Energies - Main Controller (Light Theme)
 * Strictly based on official brochure details.
 */

// =============================================================================
// HERO SLIDER CONTROLLER
// =============================================================================

const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slider-dot');
const prevBtn = document.getElementById('sliderPrevBtn');
const nextBtn = document.getElementById('sliderNextBtn');
const sliderContainer = document.querySelector('.hero-slider-container');

let currentSlide = 0;
const totalSlides = slides.length;
let slideInterval = null;
const AUTO_PLAY_DELAY = 3000; // 3 seconds per slide

function showSlide(index) {
    if (totalSlides === 0) return;

    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, idx) => {
        if (idx === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    dots.forEach((dot, idx) => {
        if (idx === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, AUTO_PLAY_DELAY);
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoSlide();
    });
}

dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
        const targetIndex = parseInt(e.target.getAttribute('data-slide-to'), 10);
        showSlide(targetIndex);
        startAutoSlide();
    });
});

if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);

    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    }, { passive: true });

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        } else if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
        startAutoSlide();
    }, { passive: true });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
        startAutoSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
        startAutoSlide();
    }
});

// Initialize Hero Slider on load
showSlide(0);
startAutoSlide();

// =============================================================================
// MOBILE MENU CONTROLLER
// =============================================================================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// =============================================================================
// BROCHURE LIGHTBOX MODAL
// =============================================================================

const brochureModal = document.getElementById('brochureModal');

function openBrochureModal() {
    if (brochureModal) {
        brochureModal.classList.remove('hidden');
        brochureModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

function closeBrochureModal() {
    if (brochureModal) {
        brochureModal.classList.add('hidden');
        brochureModal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
}

if (brochureModal) {
    brochureModal.addEventListener('click', (e) => {
        if (e.target === brochureModal) {
            closeBrochureModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !brochureModal.classList.contains('hidden')) {
            closeBrochureModal();
        }
    });
}
