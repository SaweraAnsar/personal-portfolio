const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('.nav-menu');

if (menuToggle && siteMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-menu a').forEach((link) => {
    link.addEventListener('click', () => {
      siteMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (!siteMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      siteMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

document.querySelectorAll('.project-details-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const details = document.getElementById(button.getAttribute('aria-controls'));
    if (!details) return;
    const isOpen = !details.hidden;
    details.hidden = isOpen;
    button.setAttribute('aria-expanded', String(!isOpen));
    const span = button.querySelector('span');
    if (span) span.textContent = isOpen ? '+' : '−';
  });
});

document.querySelectorAll('.project-video').forEach((video) => {
  video.setAttribute('playsinline', 'true');
  video.muted = true;
});

const certificateViewer = document.createElement('div');
certificateViewer.className = 'certificate-viewer';
certificateViewer.id = 'certificate-viewer';
certificateViewer.hidden = true;
certificateViewer.setAttribute('role', 'dialog');
certificateViewer.setAttribute('aria-modal', 'true');
certificateViewer.innerHTML = '<div class="certificate-viewer-panel"><div class="certificate-viewer-head"><h2>Certificate</h2><button class="certificate-viewer-close" type="button" aria-label="Close certificate viewer">×</button></div><iframe class="certificate-frame" title="Certificate viewer" src="about:blank"></iframe></div>';
document.body.append(certificateViewer);
const certificateFrame = certificateViewer.querySelector('.certificate-frame');
const certificateClose = certificateViewer.querySelector('.certificate-viewer-close');

const closeCertificateViewer = () => {
  certificateViewer.hidden = true;
  certificateFrame.src = 'about:blank';
};

document.querySelectorAll('.certificate-button').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    certificateFrame.src = `${button.getAttribute('href')}#toolbar=0&navpanes=0&scrollbar=1`;
    certificateViewer.hidden = false;
    certificateClose.focus();
  });
});

certificateClose.addEventListener('click', closeCertificateViewer);
certificateViewer.addEventListener('click', (event) => {
  if (event.target === certificateViewer) closeCertificateViewer();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !certificateViewer.hidden) {
    closeCertificateViewer();
    document.querySelector('.certificate-button:focus')?.blur();
  }
});

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.get('name')}`);
    const body = encodeURIComponent(`${formData.get('message')}\n\nFrom: ${formData.get('name')}\nEmail: ${formData.get('email')}`);
    const status = contactForm.querySelector('.form-status');
    if (status) status.textContent = 'Opening your email application to send this message.';
    window.location.href = `mailto:sawera.ansar0@gmail.com?subject=${subject}&body=${body}`;
  });
}

const yearElement = document.querySelector('#year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      const isMatch = link.getAttribute('href') === `#${entry.target.id}`;
      link.classList.toggle('active', isMatch);
    });
  });
}, { threshold: 0.45 });

sections.forEach((section) => activeObserver.observe(section));

const progressBar = document.querySelector('.scroll-progress');
const updateScrollProgress = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
  document.querySelector('.site-header')?.classList.toggle('scrolled', window.scrollY > 24);
};

window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const field = document.createElement('canvas');
field.className = 'science-field';
field.setAttribute('aria-hidden', 'true');
document.body.prepend(field);
const context = field.getContext('2d');
let fieldWidth = 0;
let fieldHeight = 0;
let particles = [];
let pointerX = 0;
let pointerY = 0;
let animationFrame = 0;

const resizeField = () => {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
  fieldWidth = window.innerWidth;
  fieldHeight = window.innerHeight;
  field.width = fieldWidth * pixelRatio;
  field.height = fieldHeight * pixelRatio;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  const count = Math.min(58, Math.max(22, Math.floor(fieldWidth / 25)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * fieldWidth,
    y: Math.random() * fieldHeight,
    dx: (Math.random() - 0.5) * 0.18,
    dy: (Math.random() - 0.5) * 0.18,
    radius: Math.random() * 1.6 + 0.7
  }));
};

const drawField = () => {
  context.clearRect(0, 0, fieldWidth, fieldHeight);
  particles.forEach((particle, index) => {
    particle.x += particle.dx;
    particle.y += particle.dy;
    if (particle.x < 0 || particle.x > fieldWidth) particle.dx *= -1;
    if (particle.y < 0 || particle.y > fieldHeight) particle.dy *= -1;
    const x = particle.x + pointerX * 10;
    const y = particle.y + pointerY * 10;
    context.beginPath();
    context.arc(x, y, particle.radius, 0, Math.PI * 2);
    context.fillStyle = 'rgba(73, 202, 234, 0.42)';
    context.fill();

    for (let next = index + 1; next < particles.length; next += 1) {
      const other = particles[next];
      const otherX = other.x + pointerX * 10;
      const otherY = other.y + pointerY * 10;
      const distance = Math.hypot(x - otherX, y - otherY);
      if (distance > 116) continue;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(otherX, otherY);
      context.strokeStyle = `rgba(73, 202, 234, ${(1 - distance / 116) * 0.13})`;
      context.lineWidth = 0.7;
      context.stroke();
    }
  });
  animationFrame = window.requestAnimationFrame(drawField);
};

const stopField = () => window.cancelAnimationFrame(animationFrame);
const startField = () => {
  stopField();
  if (!reducedMotion.matches) drawField();
};

window.addEventListener('resize', resizeField);
window.addEventListener('pointermove', (event) => {
  pointerX = event.clientX / window.innerWidth - 0.5;
  pointerY = event.clientY / window.innerHeight - 0.5;
  document.documentElement.style.setProperty('--pointer-x', `${pointerX * 8}px`);
  document.documentElement.style.setProperty('--pointer-y', `${pointerY * 8}px`);
}, { passive: true });
reducedMotion.addEventListener('change', startField);
resizeField();
startField();
