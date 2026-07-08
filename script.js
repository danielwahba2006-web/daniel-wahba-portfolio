// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
    observer.observe(el);
  });
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// Active nav link highlight on scroll
const sections = document.querySelectorAll('main section[id], .hero');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

if (sections.length && navAnchors.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (!id) return;
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.style.color = '');
        link.style.color = 'var(--text)';
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(s => navObserver.observe(s));
}
