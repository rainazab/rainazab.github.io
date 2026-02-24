(function () {
    function initHeader() {
        const progress = document.getElementById("scrollProgress");
        const header = document.getElementById("header");
        if (!progress || !header) return;
        window.addEventListener("scroll", () => {
            const h = document.documentElement;
            const ratio = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
            progress.style.transform = `scaleX(${ratio})`;
            header.classList.toggle("scrolled", h.scrollTop > 20);
        }, { passive: true });
    }

    function initMobileMenu() {
        const hamburger = document.getElementById("hamburger");
        const mobileMenu = document.getElementById("mobileMenu");
        const menuOverlay = document.getElementById("menuOverlay");
        if (!hamburger || !mobileMenu || !menuOverlay) return;

        function closeMenu() {
            hamburger.classList.remove("open");
            mobileMenu.classList.remove("open");
            menuOverlay.classList.remove("open");
        }

        hamburger.addEventListener("click", () => {
            const open = mobileMenu.classList.toggle("open");
            hamburger.classList.toggle("open", open);
            menuOverlay.classList.toggle("open", open);
        });
        menuOverlay.addEventListener("click", closeMenu);
        mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    }

    function initReveal() {
        const targets = document.querySelectorAll(".fade-in-up");
        if (!targets.length) return;
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add("visible");
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });
        targets.forEach((el) => io.observe(el));
    }

    initHeader();
    initMobileMenu();
    initReveal();
})();
