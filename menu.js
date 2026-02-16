// ============================================
// bottlr - Interaction Logic
// ============================================

// ============================================
// PREMIUM HAMBURGER MENU
// ============================================

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');
const body = document.body;
const header = document.querySelector('header');
const appGalleryTrack = document.querySelector('.app-gallery-track');
const isIOS = /iP(ad|hone|od)/.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

// Toggle menu
function toggleMenu() {
    const isActive = mobileMenu.classList.contains('active');
    
    if (isActive) {
        closeMenu();
    } else {
        openMenu();
    }
}

// Open menu
function openMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('active');
    menuOverlay.classList.add('active');
    body.style.overflow = 'hidden'; // Disable scroll
    
    // Trap focus
    trapFocus(mobileMenu);
}

// Close menu
function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    body.style.overflow = ''; // Re-enable scroll
}

// Event listeners
hamburger.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', closeMenu);

// Close menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        closeMenu();
    });
});

// Close menu on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMenu();
    }
});

// ============================================
// FOCUS TRAP (Accessibility)
// ============================================

function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    });
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================

const scrollProgress = document.getElementById('scrollProgress');
let marqueeRestartTimer;

function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.transform = `scaleX(${progress / 100})`;
    }
}

function updateHeaderState() {
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 24);
    }
}

function restartMarqueeAnimation() {
    if (!appGalleryTrack) return;
    appGalleryTrack.style.animation = 'none';
    appGalleryTrack.style.webkitAnimation = 'none';
    // Force a reflow so iOS Safari reattaches the keyframe timeline.
    void appGalleryTrack.offsetWidth;
    appGalleryTrack.style.animation = '';
    appGalleryTrack.style.webkitAnimation = '';
}

function scheduleMarqueeRecovery() {
    if (!isIOS || !appGalleryTrack) return;
    clearTimeout(marqueeRestartTimer);
    marqueeRestartTimer = window.setTimeout(restartMarqueeAnimation, 140);
}

let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
        updateScrollProgress();
        updateHeaderState();
        scheduleMarqueeRecovery();
        scrollTicking = false;
    });
}, { passive: true });

window.addEventListener('load', () => {
    updateScrollProgress();
    updateHeaderState();
});

// ============================================
// FADE-IN ON SCROLL ANIMATION
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in-up elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));
});

// ============================================
// SMOOTH SCROLL TO ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for just "#"
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

if (isIOS && appGalleryTrack) {
    window.addEventListener('pageshow', restartMarqueeAnimation);
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            restartMarqueeAnimation();
        }
    });
    document.addEventListener('DOMContentLoaded', () => {
        window.setTimeout(restartMarqueeAnimation, 150);
    });
}

// ============================================
// PREVENT SCROLL BOUNCE ON iOS
// ============================================

let scrollPosition = 0;

function disableBodyScroll() {
    scrollPosition = window.pageYOffset;
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
    body.style.width = '100%';
}

function enableBodyScroll() {
    body.style.removeProperty('overflow');
    body.style.removeProperty('position');
    body.style.removeProperty('top');
    body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
}

// Update menu functions to use these
const originalOpenMenu = openMenu;
openMenu = function() {
    originalOpenMenu();
    disableBodyScroll();
};

const originalCloseMenu = closeMenu;
closeMenu = function() {
    originalCloseMenu();
    enableBodyScroll();
};

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
const handleResize = debounce(() => {
    // Close mobile menu if window is resized to desktop
    if (window.innerWidth >= 1024 && mobileMenu.classList.contains('active')) {
        closeMenu();
    }
}, 250);

window.addEventListener('resize', handleResize);

// ============================================
// PRELOAD CRITICAL RESOURCES
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for CSS transitions
    body.classList.add('loaded');
    
    // Log for demo purposes
    console.log('🚀 bottlr - Hackathon Demo Ready');
    console.log('📱 Mobile-first design loaded');
    console.log('✨ Premium animations active');
});


