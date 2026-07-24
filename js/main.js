/* =====================================================
   6 THÁI TỬ - NATURAL SMOOTH SCROLL & AOS ANIMATIONS
   ===================================================== */

let lenis;

document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('aos-enabled');
    initMobileMenu();
    initLenisScroll();
    initAOSAnimation();
    initHeaderScroll();
    initButtonRipples();
    initBackToTop();
    initClearFilters();
    initDetailCounters();
});

/* ── 1. Dynamic Mobile Header & Hamburger Slide Drawer ── */
function initMobileMenu() {
    const headerRight = document.querySelector('.header-right');
    if (!headerRight) return;

    // Inject hamburger toggle button into header-right if not present
    if (!document.getElementById('mobileMenuToggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'mobileMenuToggle';
        toggleBtn.className = 'mobile-toggle-btn';
        toggleBtn.setAttribute('aria-label', 'Toggle Mobile Menu');
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        headerRight.appendChild(toggleBtn);
    }

    // Inject backdrop overlay & drawer if not present
    if (!document.getElementById('mobileMenuOverlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'mobileMenuOverlay';
        overlay.className = 'mobile-menu-overlay';

        const drawer = document.createElement('div');
        drawer.id = 'mobileMenuDrawer';
        drawer.className = 'mobile-menu-drawer';

        // Read active page to highlight current link
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        drawer.innerHTML = `
            <div class="drawer-header">
                <img src="images/logo.png" alt="6 Thái Tử Logo" class="drawer-logo">
                <button id="mobileMenuClose" class="drawer-close-btn" aria-label="Close Menu">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="drawer-body">
                <a href="index.html" class="drawer-nav-item ${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}">
                    <i class="fa-solid fa-house"></i>
                    <span>Trang chủ</span>
                </a>
                <a href="flight.html" class="drawer-nav-item ${currentPath.includes('flight') ? 'active' : ''}">
                    <i class="fa-solid fa-plane"></i>
                    <span>Tìm vé máy bay</span>
                </a>
                <a href="train.html" class="drawer-nav-item ${currentPath.includes('train') ? 'active' : ''}">
                    <i class="fa-solid fa-train"></i>
                    <span>Tìm vé tàu</span>
                </a>
                <a href="cruise.html" class="drawer-nav-item ${currentPath.includes('cruise') ? 'active' : ''}">
                    <i class="fa-solid fa-ship"></i>
                    <span>Tìm du thuyền</span>
                </a>
                <a href="about.html" class="drawer-nav-item ${currentPath === 'about.html' ? 'active' : ''}">
                    <i class="fa-solid fa-circle-info"></i>
                    <span>Về chúng tôi</span>
                </a>
                <a href="contact.html" class="drawer-nav-item ${currentPath === 'contact.html' ? 'active' : ''}">
                    <i class="fa-solid fa-envelope"></i>
                    <span>Liên hệ</span>
                </a>

                <div class="drawer-divider"></div>

                <div class="drawer-call-box">
                    <h4>Tổng đài đặt vé 24/7</h4>
                    <p style="font-size:12px; margin:0; opacity:0.9;">Tư vấn miễn phí & hỗ trợ giữ chỗ nhanh</p>
                    <a href="tel:0936363636" class="drawer-call-btn">
                        <i class="fa-solid fa-phone"></i>
                        <span>0936363636</span>
                    </a>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(drawer);
    }

    // Toggle menu event listeners
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const closeBtn = document.getElementById('mobileMenuClose');
    const overlay = document.getElementById('mobileMenuOverlay');
    const drawer = document.getElementById('mobileMenuDrawer');

    function openMenu() {
        if (overlay) overlay.classList.add('active');
        if (drawer) drawer.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeMenu() {
        if (overlay) overlay.classList.remove('active');
        if (drawer) drawer.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Close menu when clicking any nav item
    const drawerItems = document.querySelectorAll('.drawer-nav-item');
    drawerItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });
}

/* ── 2. Lenis Smooth Scroll ── */
function initLenisScroll() {
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 0.9,
            easing: (t) => 1 - Math.pow(1 - t, 3), // Natural smooth cubic easing
            smoothWheel: true,
            smoothTouch: false,
            wheelMultiplier: 1.1,
            touchMultiplier: 1.0,
            infinite: false
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }
}

/* ── 3. AOS (Animate On Scroll) Initialization & Lenis Sync ── */
function initAOSAnimation() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            once: true,
            offset: 40
        });

        // Sync AOS trigger checks on Lenis smooth scroll updates
        if (lenis) {
            lenis.on('scroll', () => {
                AOS.refresh();
            });
        }
    }
}

/* ── 4. Glassmorphism Header Scroll Effect ── */
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

/* ── 5. Luxury Ripple Effect on Button Clicks ── */
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

/* ── 6. Back to Top Smooth Scroll ── */
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
        lenis.scrollTo(0, { duration: 1.2 });
    } else {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

/* ── 7. Interactive Filter Clear Button (Xóa lọc) ── */
function initClearFilters() {
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('mixi-filter-clear')) {
            e.preventDefault();
            const sidebar = e.target.closest('.mixi-filter-sidebar');
            if (sidebar) {
                const checkboxes = sidebar.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(cb => {
                    cb.checked = false;
                });
            }
        }
    });
}

/* ── 8. Mixivivu Detail Interactive Counters (- 0 +) & Total Price Calculation ── */
function initDetailCounters() {
    function updatePricingTotal() {
        const totalEl = document.getElementById('mixiTotalPriceVal');
        if (!totalEl) return;

        let total = 0;
        const roomItems = document.querySelectorAll('.mixi-room-item');
        roomItems.forEach(item => {
            const price = parseInt(item.getAttribute('data-price') || '0', 10);
            const valEl = item.querySelector('.mixi-counter-val');
            const count = valEl ? parseInt(valEl.textContent || '0', 10) : 0;
            total += price * count;
        });

        totalEl.textContent = total.toLocaleString('vi-VN') + ' đ';
    }

    document.addEventListener('click', function(e) {
        // Plus button
        if (e.target && e.target.classList.contains('mixi-plus-btn')) {
            const item = e.target.closest('.mixi-room-item');
            const valEl = item ? item.querySelector('.mixi-counter-val') : null;
            if (valEl) {
                let val = parseInt(valEl.textContent || '0', 10);
                val++;
                valEl.textContent = val;
                const minusBtn = item.querySelector('.mixi-minus-btn');
                if (minusBtn) minusBtn.disabled = false;
                updatePricingTotal();
            }
        }

        // Minus button
        if (e.target && e.target.classList.contains('mixi-minus-btn')) {
            const item = e.target.closest('.mixi-room-item');
            const valEl = item ? item.querySelector('.mixi-counter-val') : null;
            if (valEl) {
                let val = parseInt(valEl.textContent || '0', 10);
                if (val > 0) {
                    val--;
                    valEl.textContent = val;
                    if (val === 0) {
                        e.target.disabled = true;
                    }
                    updatePricingTotal();
                }
            }
        }

        // Clear selection button
        if (e.target && e.target.classList.contains('mixi-clear-rooms-btn')) {
            const roomItems = document.querySelectorAll('.mixi-room-item');
            roomItems.forEach(item => {
                const valEl = item.querySelector('.mixi-counter-val');
                const minusBtn = item.querySelector('.mixi-minus-btn');
                if (valEl) valEl.textContent = '0';
                if (minusBtn) minusBtn.disabled = true;
            });
            updatePricingTotal();
        }

        // Thumbnail gallery click
        if (e.target && e.target.closest('.mixi-thumb-item')) {
            const thumb = e.target.closest('.mixi-thumb-item');
            const mainImg = document.getElementById('mixiMainGalleryImg');
            if (mainImg && thumb) {
                const newSrc = thumb.querySelector('img').getAttribute('src');
                mainImg.setAttribute('src', newSrc);
                document.querySelectorAll('.mixi-thumb-item').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            }
        }
    });
}
