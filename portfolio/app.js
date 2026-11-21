(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let motionPaused = reduceMotion.matches;
  document.documentElement.classList.add('js-ready');

  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 35px 0px' });
    reveals.forEach(el => observer.observe(el));
  } else reveals.forEach(el => el.classList.add('visible'));

  const menu = $('#mobile-nav');
  const menuButton = $('.menu-toggle');
  const closeMenu = () => { menu.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); };
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menu.hidden = expanded;
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  });
  $$('a', menu).forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { closeMenu(); menuButton.focus(); } });
  document.addEventListener('click', e => { if (!menu.hidden && !e.target.closest('.site-header')) closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 650) closeMenu(); }, { passive: true });

  const progress = $('.scroll-progress');
  const sections = $$('.section-anchor');
  let ticking = false;
  function updateScroll() {
    const range = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${range > 0 ? Math.min(100, window.scrollY / range * 100) : 0}%`;
    let active = 'home';
    sections.forEach(section => { if (section.getBoundingClientRect().top < window.innerHeight * 0.35) active = section.id; });
    $$('.desktop-nav a').forEach(link => { const isActive = link.getAttribute('href') === `#${active}`; link.classList.toggle('active', isActive); if (isActive) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(updateScroll); ticking = true; } }, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  updateScroll();

  const filters = $$('[data-filter]');
  const projects = $$('.project[data-category]');
  filters.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach(b => { const active = b === button; b.classList.toggle('is-active', active); b.setAttribute('aria-pressed', String(active)); });
    projects.forEach(project => { project.hidden = filter !== 'all' && project.dataset.category !== filter; project.classList.add('visible'); });
    const pair = $('.project-pair');
    const visiblePairCount = projects.filter(project => project.parentElement === pair && !project.hidden).length;
    pair.hidden = visiblePairCount === 0;
    pair.classList.toggle('single-project', visiblePairCount === 1);
  }));

  const projectData = {
    connecthub: {
      label: 'FULL-STACK NETWORKING PLATFORM', title: 'ConnectHub',
      description: 'A networking platform built for India’s startup ecosystem, connecting founders, developers, recruiters, and freelancers through real-time communication and community features.',
      bullets: ['Built end-to-end application workflows for profiles, connection requests, messaging, and notifications.', 'Implemented real-time communication with Socket.io and added 24-hour Stories.', 'Integrated ConnectBot using Hugging Face inference and managed media with Cloudinary.', 'Worked through real-time synchronization, persistence, and search issues while deploying the project on Render.'],
      stack: ['JavaScript', 'Node.js', 'Express', 'Socket.io', 'MongoDB', 'Cloudinary'],
      note: 'The preview on this portfolio is an illustrative interface study. Open the live project to explore the actual application.',
      source: 'https://github.com/yerrakamalkumar1/Startup-App', live: 'https://connecthub-f2sp.onrender.com/'
    },
    sartor: {
      label: 'CREATOR-LED FASHION PLATFORM', title: 'SARTOR',
      description: 'A fashion platform that brings creator collections, garment customization, and community into one experience for customers and creators.',
      bullets: ['Developed collection discovery and shopping interfaces for a creator-focused fashion experience.', 'Built a 3D garment design studio using Three.js and React Three Fiber.', 'Added community, messaging, and order workflows across the application.', 'Worked with a TypeScript frontend and Drizzle-based data access with Cloudflare D1/R2 infrastructure.'],
      stack: ['React', 'TypeScript', 'Tailwind', 'Three.js', 'Drizzle', 'Cloudflare D1/R2'],
      note: 'A product development project. No sales, customer traction, or royalty earnings are claimed. The preview is a concept interface, not a screenshot.',
      source: 'https://github.com/yerrakamalkumar1/SARTOR-', live: 'https://sator-fashion.netlify.app/'
    },
    assistant: {
      label: 'PYTHON VOICE AUTOMATION · LEARNING PROJECT', title: 'Personal AI Assistant',
      description: 'A desktop voice assistant that connects spoken commands to useful everyday actions, including web lookups, opening websites, and taking screenshots.',
      bullets: ['Explored speech recognition and spoken responses with SpeechRecognition and pyttsx3.', 'Used predefined command handling for Wikipedia queries, time and date, music, and desktop actions.', 'Worked with Python desktop automation and PyAutoGUI to understand voice-to-action workflows.'],
      stack: ['Python', 'SpeechRecognition', 'pyttsx3', 'Wikipedia', 'PyAutoGUI'],
      note: 'Learning project based on the open-source Jarvis project, credited in the repository to Kishan Kumar Rai. The implementation is rule-based; it does not claim an integrated LLM or RAG system.',
      source: 'https://github.com/yerrakamalkumar1/AI-PERSONAL-ASSISTANT'
    }
  };
  const dialog = $('#project-dialog');
  let dialogTrigger = null;
  const escapeHtml = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  $$('[data-project]').forEach(button => button.addEventListener('click', () => {
    const project = projectData[button.dataset.project];
    dialogTrigger = button;
    $('#dialog-content').innerHTML = `<p class="dialog-label">${escapeHtml(project.label)}</p><h2 id="dialog-title">${escapeHtml(project.title)}</h2><p class="dialog-description">${escapeHtml(project.description)}</p><h3>What I worked on</h3><ul>${project.bullets.map(text => `<li>${escapeHtml(text)}</li>`).join('')}</ul><h3>Built with</h3><div class="tech-tags">${project.stack.map(text => `<span>${escapeHtml(text)}</span>`).join('')}</div><p class="dialog-note">${escapeHtml(project.note)}</p><div class="dialog-links">${project.live ? `<a class="button button-primary" href="${project.live}" target="_blank" rel="noopener noreferrer">Open live project</a>` : ''}<a class="button button-secondary" href="${project.source}" target="_blank" rel="noopener noreferrer">View source code</a></div>`;
    dialog.showModal();
  }));
  $('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target !== dialog) return; const rect = dialog.getBoundingClientRect(); if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) dialog.close(); });
  dialog.addEventListener('close', () => { if (dialogTrigger) dialogTrigger.focus({ preventScroll: true }); });

  const toast = $('.toast');
  let toastTimer;
  function notify(message) { toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 3500); }
  $('.copy-email').addEventListener('click', async () => {
    const email = 'yerrakamalkumar1@gmail.com';
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(email);
      else { const field = document.createElement('textarea'); field.value = email; field.style.position = 'fixed'; field.style.left = '-9999px'; document.body.appendChild(field); field.select(); const success = document.execCommand('copy'); field.remove(); if (!success) throw new Error('Copy unavailable'); }
      notify('Email address copied. Let’s connect!');
    } catch { notify('Copy unavailable. Email: yerrakamalkumar1@gmail.com'); }
  });
  $('#year').textContent = String(new Date().getFullYear());

  const motionToggle = $('#motion-toggle');
  function applyMotion() { document.documentElement.classList.toggle('motion-paused', motionPaused); motionToggle.textContent = motionPaused ? 'Resume motion' : 'Pause motion'; motionToggle.setAttribute('aria-pressed', String(motionPaused)); }
  motionToggle.addEventListener('click', () => { motionPaused = !motionPaused; applyMotion(); });
  reduceMotion.addEventListener('change', e => { motionPaused = e.matches; applyMotion(); });
  applyMotion();

  const canvas = $('#orbital-canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let width = 0, height = 0, tick = 0, frame = 0;
  let pointerX = 0, pointerY = 0, smoothX = 0, smoothY = 0;
  function resizeCanvas() { const rect = canvas.getBoundingClientRect(); width = rect.width; height = rect.height; const ratio = Math.min(window.devicePixelRatio || 1, 2); canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio); ctx.setTransform(ratio, 0, 0, ratio, 0, 0); draw(); }
  const art = $('.hero-art');
  art.addEventListener('pointermove', e => { const rect = art.getBoundingClientRect(); pointerX = (e.clientX - rect.left) / rect.width - .5; pointerY = (e.clientY - rect.top) / rect.height - .5; }, { passive: true });
  art.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; });
  function project(x, y, z, rotation) {
    const cx = Math.cos(rotation), sx = Math.sin(rotation);
    const x1 = x * cx + z * sx, z1 = -x * sx + z * cx;
    const tilt = .5 + smoothY * .12;
    const y1 = y * Math.cos(tilt) - z1 * Math.sin(tilt), z2 = y * Math.sin(tilt) + z1 * Math.cos(tilt);
    const perspective = 650 / (650 + z2);
    return { x: width / 2 + x1 * perspective + smoothX * 12, y: height / 2 + y1 * perspective + smoothY * 10, z: z2 };
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    const radius = Math.min(width * .36, height * .38);
    const rotation = tick * .002 + .5 + smoothX * .15;
    const glow = ctx.createRadialGradient(width / 2, height / 2, radius * .1, width / 2, height / 2, radius * 1.5);
    glow.addColorStop(0, 'rgba(50,112,225,.08)'); glow.addColorStop(.6, 'rgba(30,80,175,.04)'); glow.addColorStop(1, 'rgba(20,70,170,0)');
    ctx.fillStyle = glow; ctx.fillRect(0,0,width,height);
    for (let ring = 0; ring < 9; ring++) {
      const latitude = (ring / 8 - .5) * Math.PI;
      const r = Math.cos(latitude) * radius, y = Math.sin(latitude) * radius;
      ctx.beginPath();
      for (let j = 0; j <= 100; j++) { const a = j / 100 * Math.PI * 2; const p = project(Math.cos(a) * r, y, Math.sin(a) * r, rotation); if (j === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); }
      ctx.strokeStyle = `rgba(74,130,227,${ring === 4 ? .28 : .12})`; ctx.lineWidth = ring === 4 ? 1 : .7; ctx.stroke();
    }
    for (let ring = 0; ring < 10; ring++) {
      const longitude = ring / 10 * Math.PI;
      ctx.beginPath();
      for (let j = 0; j <= 100; j++) { const a = j / 100 * Math.PI * 2; const p = project(Math.cos(a) * Math.cos(longitude) * radius, Math.sin(a) * radius, Math.cos(a) * Math.sin(longitude) * radius, rotation); if (j === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); }
      ctx.strokeStyle = 'rgba(81,142,247,.14)'; ctx.lineWidth = .7; ctx.stroke();
    }
    for (let orbit = 0; orbit < 3; orbit++) {
      const r = radius * (1.17 + orbit * .08), tilt = orbit * .7 + .2;
      ctx.beginPath();
      for (let j = 0; j <= 160; j++) { const a = j / 160 * Math.PI * 2; const p = project(Math.cos(a) * r, Math.sin(a) * r * Math.sin(tilt), Math.sin(a) * r * Math.cos(tilt), rotation + orbit * .9); if (j === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); }
      ctx.strokeStyle = orbit === 1 ? 'rgba(101,161,255,.45)' : 'rgba(69,125,218,.23)'; ctx.lineWidth = orbit === 1 ? 1.2 : .8; ctx.stroke();
      const a = tick * .006 * (orbit % 2 ? -1 : 1) + orbit * 2.5;
      const p = project(Math.cos(a) * r, Math.sin(a) * r * Math.sin(tilt), Math.sin(a) * r * Math.cos(tilt), rotation + orbit * .9);
      ctx.beginPath(); ctx.arc(p.x, p.y, orbit === 1 ? 3 : 2, 0, Math.PI * 2); ctx.fillStyle = '#a6caff'; ctx.shadowColor = '#5e9aff'; ctx.shadowBlur = 13; ctx.fill(); ctx.shadowBlur = 0;
    }
    for (let i = 0; i < 32; i++) { const angle = i * 2.39996 + tick * .0003; const distance = radius * (1.25 + (i % 7) * .065); const x = width / 2 + Math.cos(angle) * distance; const y = height / 2 + Math.sin(angle) * distance * .85; ctx.fillStyle = `rgba(116,166,255,${.12 + (i % 4) * .065})`; ctx.fillRect(x, y, 1.2, 1.2); }
  }
  function animate() { frame = requestAnimationFrame(animate); if (motionPaused || document.hidden || art.getBoundingClientRect().bottom < 0) return; tick += 1; smoothX += (pointerX - smoothX) * .04; smoothY += (pointerY - smoothY) * .04; draw(); }
  if ('ResizeObserver' in window) new ResizeObserver(resizeCanvas).observe(canvas); else window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas(); animate();
  window.addEventListener('pagehide', () => cancelAnimationFrame(frame), { once: true });
})();
