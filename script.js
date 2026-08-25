// ===== Footer year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Welcome overlay (home page only, once per session) =====
(function welcomeAnimation() {
  const overlay = document.getElementById('welcome-overlay');
  if (!overlay) return;

  const alreadySeen = sessionStorage.getItem('mumbi_welcomed');

  if (alreadySeen) {
    overlay.style.display = 'none';
    return;
  }

  document.body.style.overflow = 'hidden';
  sessionStorage.setItem('mumbi_welcomed', '1');

  setTimeout(() => {
    overlay.classList.add('hide');
    document.body.style.overflow = '';
    setTimeout(() => { overlay.style.display = 'none'; }, 850);
  }, 2200);
})();

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const navCta = document.querySelector('.nav-cta');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('open');
    navLinks.classList.toggle('mobile-open', isOpen);
    if (navCta) navCta.classList.toggle('mobile-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('mobile-open');
      if (navCta) navCta.classList.remove('mobile-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Active nav link highlighting =====
(function highlightActiveLink() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// ===== Hero slideshow =====
(function heroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current = 0;
  const interval = 4800;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function start() {
    timer = setInterval(next, interval);
  }
  function stop() {
    clearInterval(timer);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stop();
      goTo(i);
      start();
    });
  });

  start();
})();

// ===== Gallery filter (gallery page) =====
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryTiles = document.querySelectorAll('.gallery-tile');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryTiles.forEach(tile => {
        tile.style.display = (filter === 'all' || tile.dataset.category === filter) ? '' : 'none';
      });
    });
  });
}

// ===== Nav shadow on scroll =====
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10 ? '0 8px 24px -14px rgba(59,42,30,0.2)' : 'none';
  });
}
