/* bottlr shared scripts */
(function() {
  // Scroll progress + header
  const progress = document.getElementById('scrollProgress');
  const hdr = document.getElementById('header');
  if (progress && hdr) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
      progress.style.transform = `scaleX(${pct || 0})`;
      hdr.classList.toggle('scrolled', h.scrollTop > 20);
    }, { passive: true });
  }

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  if (hamburger && mobileMenu && menuOverlay) {
    const close = () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      menuOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      menuOverlay.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menuOverlay.addEventListener('click', close);
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  }

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.desktop-nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
})();

// Waitlist inline (inline forms on pages)
function handleWaitlistInline(e) {
  e.preventDefault();
  const form = e.target;
  const emailInput = form.querySelector('input[type="email"]');
  const statusEl = form.querySelector('[data-role="status"]');
  const btn = form.querySelector('button[type="submit"]');
  if (!emailInput || !btn) return;
  const email = emailInput.value.trim();
  if (!email) return;
  btn.disabled = true;
  btn.textContent = 'joining...';
  const finish = () => {
    btn.textContent = "you're on the list";
    btn.style.background = 'var(--green)';
    if (statusEl) { statusEl.textContent = "we'll reach out when we launch near you."; statusEl.className = 'form-status form-status--ok'; }
    emailInput.value = '';
  };
  if (typeof db !== 'undefined') {
    db.collection('waitlist').add({ email, source: form.dataset.source || 'page', timestamp: new Date().toISOString() }).then(finish).catch(() => { btn.disabled = false; btn.textContent = 'try again'; });
  } else { setTimeout(finish, 700); }
}
