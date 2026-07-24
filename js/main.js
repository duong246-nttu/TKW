/* =====================================================
   6 THÁI TỬ - LENIS SMOOTH SCROLL + AOS ANIMATIONS SCRIPT
   ===================================================== */

let lenis;

document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('aos-enabled');
    initLenisScroll();
    initAOSAnimation();
    initHeaderScroll();
    initButtonRipples();
    initBackToTop();
});

/* ── 1. Lenis Butter-Smooth Scroll Initialization ── */
function initLenisScroll() {
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.5
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }
}

/* ── 2. AOS (Animate On Scroll) Initialization & Lenis Sync ── */
function initAOSAnimation() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            once: true,
            offset: 60
        });

        // Sync AOS trigger checks on Lenis smooth scroll updates
        if (lenis) {
            lenis.on('scroll', () => {
                AOS.refresh();
            });
        }
    }
}

/* ── 3. Glassmorphism Header Scroll Effect ── */
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ── 4. Luxury Ripple Effect on Button Clicks ── */
function initButtonRipples() {
    const buttons = document.querySelectorAll(
        '.btn-book, .search-submit-btn, .header-contact-btn, ' +
        '.continue-btn, .search-btn, .btn-destination-view, .partner-tab, .pill-btn'
    );

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            const rect = button.getBoundingClientRect();
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - rect.left - radius}px`;
            circle.style.top = `${e.clientY - rect.top - radius}px`;
            circle.classList.add('luxury-ripple');

            const ripple = button.getElementsByClassName('luxury-ripple')[0];
            if (ripple) {
                ripple.remove();
            }

            button.appendChild(circle);
        });
    });
}

/* ── 5. Back to Top Smooth Scroll (Integrated with Lenis) ── */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 350) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });
}

function scrollToTop() {
    if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
    } else {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}
