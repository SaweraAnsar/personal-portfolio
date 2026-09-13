const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('.nav-menu');

const protectedShortcuts = new Set(['c', 'x', 'a', 'u', 's', 'p']);

const blockCopyShortcuts = (event) => {
  if (!(event.ctrlKey || event.metaKey)) return;

  const key = event.key.toLowerCase();
  if (protectedShortcuts.has(key)) {
    event.preventDefault();
  }
};

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

document.addEventListener('selectstart', (event) => {
  event.preventDefault();
});

document.addEventListener('copy', (event) => {
  event.preventDefault();
});

document.addEventListener('cut', (event) => {
  event.preventDefault();
});

document.addEventListener('dragstart', (event) => {
  if (event.target instanceof Element) {
    if (event.target.closest('img, video, canvas, svg, iframe, a, button')) {
      event.preventDefault();
    }
  }
});

document.addEventListener('keydown', blockCopyShortcuts);

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

document.querySelectorAll('img').forEach((image) => image.setAttribute('draggable', 'false'));

document.querySelectorAll('.project-video').forEach((video) => {
  video.setAttribute('playsinline', 'true');
  video.muted = true;
});

const researchCard = document.querySelector('.featured-research');
if (researchCard) {
  const tinyLabel = researchCard.querySelector('.tiny-label');
  if (tinyLabel) tinyLabel.textContent = 'Research in Progress';
  const researchSummary = researchCard.querySelector('.research-summary');
  if (researchSummary) {
    researchSummary.innerHTML = '<p><strong>Status:</strong> Research in Progress</p><p><strong>Supervision:</strong> Under the supervision of Dr. Zara Naeem</p><p>Currently working on this research topic under the supervision of Dr. Zara Naeem, with a focus on analytical approaches and future directions for mycotoxin detection, quantification, and detoxification.</p>';
  }
}

const milestoneGrid = document.querySelector('.milestone-grid');
if (milestoneGrid) {
  const milestonesSection = milestoneGrid.closest('.achievements-section');
  if (milestonesSection) milestonesSection.id = 'milestones';
  const achievementsSection = document.createElement('section');
  achievementsSection.className = 'section achievements-showcase';
  achievementsSection.id = 'achievements';
  achievementsSection.innerHTML = '<div class="container"><div class="section-heading reveal"><div><p class="kicker">05 / Achievements</p><h2>Recognition that<br><em>supports the work.</em></h2></div><p class="heading-note">Academic access<br><span>ACHIEVEMENT</span></p></div><p class="achievement-intro reveal">Academic opportunities that support continued learning, digital development, and research-oriented work.</p><div class="achievement-grid"><details class="achievement-card reveal"><summary><span class="milestone-icon" aria-hidden="true">▣</span><span class="timeline-date">Academic achievement</span><h3>Prime Minister\'s Youth Laptop Scheme Phase IV (2025)</h3><span class="card-index">+</span></summary><div class="achievement-detail"><p>Selected as a recipient of a laptop under the Prime Minister\'s Youth Laptop Scheme Phase IV (2025), supporting academic learning, digital development, and research-oriented work.</p><p class="milestone-outcomes"><b>Category:</b> Academic achievement · Technology access</p></div></details></div></div>';
  milestonesSection?.before(achievementsSection);
}

const footerNotice = document.querySelector('.footer-inner small');
if (footerNotice) {
  footerNotice.textContent = '© 2026 Sawera Ansar. All rights reserved. Portfolio content, original work, project materials, and certificate evidence may not be reproduced or redistributed without permission.';
}

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
  const key = event.key.toLowerCase();
  if ((event.ctrlKey || event.metaKey) && ['c', 'x', 'p', 's', 'u', 'a'].includes(key)) event.preventDefault();
  if (event.key === 'Escape' && !certificateViewer.hidden) closeCertificateViewer();
});

document.addEventListener('dragstart', (event) => {
  if (event.target.tagName === 'IMG') event.preventDefault();
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
    const status = document.querySelector('.form-status');
    if (status) status.textContent = 'Thanks. This demo form is ready to connect to your email service.';
    contactForm.reset();
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
