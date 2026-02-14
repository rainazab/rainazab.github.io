// Mobile menu toggle functionality
function toggleMenu() {
    const nav = document.getElementById('mainNav');
    const overlay = document.getElementById('menuOverlay');
    nav.classList.toggle('active');
    if (overlay) {
        overlay.classList.toggle('active');
    }
}

// Close menu when clicking outside or on overlay
document.addEventListener('click', function(event) {
    const nav = document.getElementById('mainNav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    const overlay = document.getElementById('menuOverlay');
    
    if (nav && toggle && !nav.contains(event.target) && !toggle.contains(event.target)) {
        nav.classList.remove('active');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
});

// Close menu when clicking a link
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            const nav = document.getElementById('mainNav');
            const overlay = document.getElementById('menuOverlay');
            if (nav) {
                nav.classList.remove('active');
            }
            if (overlay) {
                overlay.classList.remove('active');
            }
        });
    });
});

// Prevent body scroll when mobile menu is open
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('mainNav');
    if (nav) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (nav.classList.contains('active')) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = '';
                    }
                }
            });
        });
        observer.observe(nav, { attributes: true });
    }
});
