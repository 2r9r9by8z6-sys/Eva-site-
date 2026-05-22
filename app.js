/* === TIRASMURFS === */

// Nav scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });

// Burger
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Scroll reveal
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const siblings = Array.from(e.target.parentElement.querySelectorAll('.reveal'));
    const i = siblings.indexOf(e.target);
    setTimeout(() => e.target.classList.add('visible'), Math.min(i * 70, 350));
    obs.unobserve(e.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Hero reveals immédiat
setTimeout(() => {
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 110 + 100);
  });
}, 50);

// Tabs menu
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// Flip cartes tiramisu (touch)
const isTouch = () => window.matchMedia('(hover: none)').matches;
document.querySelectorAll('.tc-card').forEach(card => {
  card.addEventListener('click', () => {
    if (isTouch()) card.classList.toggle('flipped');
  });
});

// Nav active highlight
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-links a');
new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + e.target.id ? 'var(--gold)' : '';
      });
    }
  });
}, { threshold: 0.35 }).observe.bind(sections.forEach(s =>
  new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + e.target.id ? 'var(--gold)' : '';
      });
    });
  }, { threshold: 0.35 }).observe(s)
));
