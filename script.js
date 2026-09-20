const menuToggle = document.querySelector('.menu-toggle');
const primaryNavigation = document.querySelector('.primary-navigation');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
const githubAssetBase = 'Assets/';

const githubAssetSources = {
  '.brand-logo source': `${githubAssetBase}Brand_Logo/Green_arrow_logo_animation_202608241919.mp4`,
  '.footer-logo source': `${githubAssetBase}Brand_Logo/Green_arrow_logo_animation_202608241919.mp4`,
  '.social-link[aria-label="Facebook"] img': `${githubAssetBase}Icons/icons8-facebook.gif`,
  '.social-link[aria-label="LinkedIn"] img': `${githubAssetBase}Icons/icons8-linkedin-48.gif`,
  '.services-hero-video source': `${githubAssetBase}HeroSection/Service%20Bars.mp4`,
  '.hero-video source': `${githubAssetBase}HeroSection/HomeHero.mp4`,
  '.contact-video-background source': `${githubAssetBase}Contact%20Page/Flying_through_geometric_tunnel_1080p_20260914140440.mp4`,
  'input[value="request-a-meeting"] + .contact-intent-logo': `${githubAssetBase}Contact%20Page/request-a-meeting-organic-alt-1.png`,
  'input[value="careers"] + .contact-intent-logo': `${githubAssetBase}Contact%20Page/careers-icon-new.png`,
  'input[value="general-inquiries"] + .contact-intent-logo': `${githubAssetBase}Contact%20Page/general-inquiries-icon-only.png`
};

Object.entries(githubAssetSources).forEach(([selector, source]) => {
  const element = document.querySelector(selector);
  if (element) {
    if (element.tagName === 'SOURCE') {
      element.src = source;
      element.parentElement.load();
    } else {
      element.src = source;
    }
  }
});

const serviceVideoByPage = {
  'document-scanning.html': `${githubAssetBase}Services_VidBOX/DocScan_VidBOX.mp4`,
  'bpo-workflows.html': `${githubAssetBase}Services_VidBOX/BPO_WorkFlow_VidBOX.mp4`,
  'legacy-data-transformation.html': `${githubAssetBase}Services_VidBOX/Leg_Data_VidBOX.mp4`,
  'ai-ready-processing.html': `${githubAssetBase}Services_VidBOX/AI_Ready_VidBOX.mp4`
};

const currentPage = window.location.pathname.split('/').pop().split('?')[0];
const serviceVideoSource = serviceVideoByPage[currentPage];
if (serviceVideoSource) {
  document.querySelectorAll('.service-video-box').forEach((videoBox) => {
    const video = document.createElement('video');

    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.src = serviceVideoSource;
    videoBox.replaceChildren(video);
    video.load();
  });
}

if (currentPage === 'bpo-workflows.html') {
  const bpoVideo = document.querySelector('#bpo-workflows .service-video-box');
  const bpoCoverage = document.querySelector('#bpo-workflows .service-more-copy');

  if (bpoVideo && bpoCoverage) {
    const coverageBadges = document.createElement('div');
    coverageBadges.className = 'bpo-mobile-coverage-badges';
    coverageBadges.setAttribute('aria-label', 'BPO workflow coverage');
    coverageBadges.innerHTML = '<span>Revenue Cycle</span><span>Claims &amp; Denials</span><span>Payment Posting</span><span>Prior Authorization</span>';
    bpoVideo.after(coverageBadges);
    bpoCoverage.classList.add('bpo-workflow-coverage');
  }
}

const securityVideoByCard = {
  '.security-media-facility': `${githubAssetBase}Data%20Security/Physical%20%26%20Operational%20Controls.mp4`,
  '.security-media-data': `${githubAssetBase}Data%20Security/Data%20Protection%20Controls.mp4`,
  '.security-media-people': `${githubAssetBase}Data%20Security/Employee%20Confidentiality.mp4`,
  '.security-media-recovery': `${githubAssetBase}Data%20Security/Continuity%20Planning.mp4`
};

if (currentPage === 'data-security.html') {
  Object.entries(securityVideoByCard).forEach(([selector, videoSource]) => {
    const videoBox = document.querySelector(selector);
    if (!videoBox) {
      return;
    }

    const video = document.createElement('video');

    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.src = videoSource;
    videoBox.replaceChildren(video);
    video.load();
  });
}

const sectorsCanvas = document.querySelector('.sectors-hero-canvas');
const aboutBackground = document.querySelector('.hero-background');

if (aboutBackground) {
  const barColors = ['#02264a', '#033b6d', '#00558f', '#0874bb', '#1594dd', '#0a477e'];
  const columns = 84;
  const rows = 10;
  const animationSeconds = 9;
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < columns * rows; index += 1) {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const isDarkBlock = (column >= 17 && column <= 24 && row <= 1)
      || (column >= 32 && column <= 37 && row >= 2 && row <= 4)
      || (column >= 51 && column <= 58 && row >= 4 && row <= 6)
      || (column >= 5 && column <= 10 && row >= 7);
    const bar = document.createElement('span');

    bar.className = 'hero-background__bar';
    bar.style.backgroundColor = isDarkBlock
      ? '#031d36'
      : barColors[(column + row * 2) % barColors.length];
    bar.style.animationDelay = `-${((column / columns) * animationSeconds + row * 0.08).toFixed(2)}s`;
    bar.style.opacity = isDarkBlock
      ? '0.82'
      : String(0.2 + (row / rows) * 0.68 + (column % 5) * 0.025);
    fragment.appendChild(bar);
  }

  aboutBackground.appendChild(fragment);
}

if (sectorsCanvas) {
  const context = sectorsCanvas.getContext('2d');
  const particles = [];
  const targetParticles = [];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width;
  let height;
  let animationFrame;
  let startTime;

  const resizeSectorsCanvas = () => {
    const scale = window.devicePixelRatio || 1;
    width = sectorsCanvas.clientWidth;
    height = sectorsCanvas.clientHeight;
    sectorsCanvas.width = width * scale;
    sectorsCanvas.height = height * scale;
    context.setTransform(scale, 0, 0, scale, 0, 0);
  };

  const randomParticle = (isTarget = false) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 2.8,
    vy: (Math.random() - 0.5) * 2.8,
    radius: 0.8 + Math.random() * 1.4,
    life: 0,
    targetX: isTarget ? width * 0.68 : 0,
    targetY: isTarget ? height * 0.5 : 0,
    target: isTarget,
    targetIndex: Math.floor(Math.random() * Math.max(1, targetParticles.length))
  });

  const buildWordTargets = () => {
    const sampleCanvas = document.createElement('canvas');
    const sampleContext = sampleCanvas.getContext('2d');
    const fontSize = Math.max(32, Math.min(88, width * 0.08));
    const wordmarkCenter = width < 600 ? width * 0.62 : width * 0.69;
    const sampleStep = width < 600 ? 5 : 7;
    sampleCanvas.width = Math.ceil(Math.max(320, Math.min(width * 0.82, 900)));
    sampleCanvas.height = Math.ceil(fontSize * 1.5);
    sampleContext.font = `700 ${fontSize}px Manrope, sans-serif`;
    sampleContext.textAlign = 'center';
    sampleContext.textBaseline = 'middle';
    sampleContext.fillStyle = '#ffffff';
    sampleContext.fillText('A&K Consultancy', sampleCanvas.width / 2, sampleCanvas.height / 2);
    const pixels = sampleContext.getImageData(0, 0, sampleCanvas.width, sampleCanvas.height).data;
    targetParticles.length = 0;

    for (let y = 0; y < sampleCanvas.height; y += sampleStep) {
      for (let x = 0; x < sampleCanvas.width; x += sampleStep) {
        if (pixels[(y * sampleCanvas.width + x) * 4 + 3] > 150) {
          targetParticles.push({
            x: wordmarkCenter - sampleCanvas.width / 2 + x,
            y: height * 0.5 - sampleCanvas.height / 2 + y
          });
        }
      }
    }
  };

  const seedParticles = () => {
    particles.length = 0;
    for (let index = 0; index < 320; index += 1) {
      particles.push(randomParticle());
    }
  };

  const splitParticle = (particle) => {
    if (particles.length > 380 || particle.radius < 1.8) {
      return;
    }
    particle.radius *= 0.72;
    particles.push({ ...particle, vx: -particle.vy * 1.25, vy: particle.vx * 1.25, radius: particle.radius });
  };

  const updateParticle = (particle, convergence) => {
    if (particle.target) {
      particle.vx *= 0.8;
      particle.vy *= 0.8;
      particle.x += (particle.targetX - particle.x) * 0.16;
      particle.y += (particle.targetY - particle.y) * 0.16;
      return;
    }

    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vx *= 1.002;
    particle.vy *= 1.002;

    if (particle.x < particle.radius || particle.x > width - particle.radius) {
      particle.vx *= -1;
      particle.x = Math.max(particle.radius, Math.min(width - particle.radius, particle.x));
      splitParticle(particle);
    }
    if (particle.y < particle.radius || particle.y > height - particle.radius) {
      particle.vy *= -1;
      particle.y = Math.max(particle.radius, Math.min(height - particle.radius, particle.y));
      splitParticle(particle);
    }

    if (convergence > 0.45 && targetParticles.length) {
      const target = targetParticles[particle.targetIndex % targetParticles.length];
      particle.targetX = target.x;
      particle.targetY = target.y;
      particle.x += (target.x - particle.x) * convergence * 0.025;
      particle.y += (target.y - particle.y) * convergence * 0.025;
    }
    particle.life += 1;
  };

  const collideParticles = () => {
    for (let first = 0; first < particles.length; first += 1) {
      for (let second = first + 1; second < particles.length; second += 1) {
        const left = particles[first];
        const right = particles[second];
        const distanceX = right.x - left.x;
        const distanceY = right.y - left.y;
        const distance = Math.hypot(distanceX, distanceY);
        const minimumDistance = left.radius + right.radius;
        if (distance && distance < minimumDistance) {
          const normalX = distanceX / distance;
          const normalY = distanceY / distance;
          const velocity = left.vx * normalX + left.vy * normalY;
          const rebound = right.vx * normalX + right.vy * normalY;
          left.vx += (rebound - velocity) * normalX;
          left.vy += (rebound - velocity) * normalY;
          right.vx += (velocity - rebound) * normalX;
          right.vy += (velocity - rebound) * normalY;
          if (Math.random() > 0.94) {
            splitParticle(left);
          }
        }
      }
    }
  };

  const drawSectorsScene = (now) => {
    const elapsed = reducedMotion ? 0.82 : ((now - startTime) % 18000) / 18000;
    const formation = Math.max(0, Math.min(1, (elapsed - 0.3) / 0.42));
    const disperse = Math.max(0, Math.min(1, (elapsed - 0.88) / 0.12));
    const activeTargets = Math.floor(targetParticles.length * formation);

    context.clearRect(0, 0, width, height);
    context.fillStyle = '#1c1c1c';
    context.fillRect(0, 0, width, height);
    collideParticles();

    particles.forEach((particle, index) => {
      particle.target = index < activeTargets && disperse < 0.2;
      particle.targetIndex = index % Math.max(1, targetParticles.length);
      if (targetParticles.length) {
        particle.targetX = targetParticles[particle.targetIndex].x;
        particle.targetY = targetParticles[particle.targetIndex].y;
      }
      updateParticle(particle, formation);
      if (disperse > 0) {
        particle.target = false;
        particle.vx += (Math.random() - 0.5) * disperse * 0.8;
        particle.vy += (Math.random() - 0.5) * disperse * 0.8;
      }
      const alpha = particle.target ? 0.78 : 0.22 + Math.random() * 0.2;
      const gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius * 2.1);
      gradient.addColorStop(0, `rgba(104, 196, 255, ${alpha})`);
      gradient.addColorStop(1, 'rgba(26, 105, 190, 0)');
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius * 5, 0, Math.PI * 2);
      context.fill();
    });

    if (!reducedMotion) {
      animationFrame = requestAnimationFrame(drawSectorsScene);
    }
  };

  resizeSectorsCanvas();
  buildWordTargets();
  seedParticles();
  startTime = performance.now();
  window.addEventListener('resize', resizeSectorsCanvas);
  window.addEventListener('resize', buildWordTargets);
  drawSectorsScene(performance.now());

  if (reducedMotion) {
    cancelAnimationFrame(animationFrame);
  }
}

document.querySelectorAll('.navigation-link, .footer-sectors a').forEach((link) => {
  if (link.textContent.trim() === 'Sectors') {
    link.href = 'sectors.html';
  }
});

document.querySelectorAll('.footer-sectors h2').forEach((heading) => {
  if (!heading.querySelector('a')) {
    heading.innerHTML = '<a href="sectors.html">Sectors</a>';
  }
});

const inquiryTypeInputs = document.querySelectorAll('input[name="inquiry-type"]');
const contactFormPanels = document.querySelectorAll('.contact-form-panel');
const meetingTitle = document.getElementById('meeting-title');
const careersTitle = document.getElementById('careers-title');
const panelCopy = document.querySelector('.contact-panel-copy');
const careersCopy = document.getElementById('careers-copy');

const updateInquiryState = () => {
  const selectedInquiry = document.querySelector('input[name="inquiry-type"]:checked')?.value || 'careers';

  contactFormPanels.forEach((panel) => {
    panel.hidden = panel.dataset.inquiry !== selectedInquiry;
  });

  if (selectedInquiry === 'careers') {
    if (meetingTitle) {
      meetingTitle.textContent = 'Careers';
    }
    if (panelCopy) {
      panelCopy.textContent = 'The more context you share, the better we can help.';
    }
    return;
  }

  if (meetingTitle) {
    meetingTitle.textContent = 'Request a Meeting';
  }
  if (panelCopy) {
    panelCopy.textContent = 'Want to see what outsourcing your next project will cost you? Enter your project details below and get a free quote.';
  }
};

inquiryTypeInputs.forEach((input) => {
  input.addEventListener('change', updateInquiryState);
});

updateInquiryState();

const servicesEyebrow = document.querySelector('.services-hero .services-eyebrow');
const servicesTitle = document.querySelector('.services-hero h1');

if (servicesEyebrow && servicesTitle) {
  servicesEyebrow.innerHTML = '<span class="service-breadcrumb-prefix">Our Service</span><span class="service-breadcrumb-path"> / ' + servicesTitle.textContent + '</span>';
}

const pageConfigs = {
  'document-scanning-title': {
    subtitle: 'Empowering organizations and public agencies, A&K Consultancy digitizes physical document backlogs via secure scanning and indexing to deliver access-ready records.',
    heading: '<span class="service-title-blue">Digitize documentation</span> with precision, ensuring that operational frameworks and contextual meanings are never lost in translation.'
  },
  'legacy-data-title': {
    subtitle: 'At A&K Consultancy, we deliver precision-driven, cost-effective solutions for your most critical data entry and document conversion needs. Backed by cutting-edge technology and rigorous quality assurance protocols, we ensure 99.999% accuracy, rapid project deployment, and highly competitive pricing to keep your operations running seamlessly.',
    heading: 'Data Entry &amp; Data <span class="service-title-blue">Services</span>'
  },
  'bpo-workflows-title': {
    subtitle: 'We empower healthcare organizations by transforming complex administrative bottlenecks into highly scalable, error-free operations. Our digitally orchestrated RCM workflows ensure maximum revenue realization, strict compliance, and rapid turnaround times.',
    heading: '<span class="service-title-blue">Manage high-volume workflows</span> where scale, dependability, and rapid turnaround are critical.'
  },
  'ai-ready-title': {
    subtitle: 'High-performance AI begins with high-quality data. Unstructured, unlabeled datasets create critical bottlenecks that slow down model training and deployment. At A&K Consultancy, we solve this challenge by transforming messy, fragmented information into structured, precisely annotated training assets engineered to power reliable AI outcomes.',
    heading: '<span class="service-title-blue">A&amp;K Data Labeling &amp; Annotation Services</span><br>For Machine Learning &amp; AI'
  }
};

const targetTitle = document.querySelector('#document-scanning-title, #legacy-data-title, #bpo-workflows-title, #ai-ready-title');

if (targetTitle) {
  const config = pageConfigs[targetTitle.id];
  if (config) {
    const subtitle = document.createElement('h3');
    subtitle.className = 'service-title-subtitle';
    subtitle.innerHTML = config.heading;
    targetTitle.after(subtitle);

    if (config.subtitle) {
      const intro = document.createElement('p');
      intro.className = 'service-intro-subtitle';
      intro.innerHTML = config.subtitle;
      subtitle.after(intro);
    }
  }
}

document.querySelectorAll('.case-studies-button').forEach((button) => {
  if (document.querySelector('#legacy-data-transformation, #ai-ready-processing')) {
    button.remove();
    return;
  }

  button.href = 'get-in-touch.html';
  button.textContent = 'Connect With Us';
});

const serviceFollowUp = {
  'legacy-data-transformation': {
    heading: 'Make Legacy Data Work Harder',
    copy: 'We convert complex historical and operational content into structured, searchable data that is ready for modern workflows, migration, and analysis.',
    badges: ['Structured Data', 'Quality Controlled', 'Migration Ready']
  },
  'ai-ready-processing': {
    heading: 'Prepare Data for What Comes Next',
    copy: 'We organize, validate, and enrich operational data so teams can build reliable automation and AI workflows on a clear, consistent foundation.',
    badges: ['AI-Ready Data', 'Validated Outputs', 'Scalable Workflows']
  }
};

Object.entries(serviceFollowUp).forEach(([serviceId, content]) => {
  const feature = document.getElementById(serviceId);
  const videoBox = feature?.querySelector('.service-video-box');

  if (!feature || !videoBox) {
    return;
  }

  const followUp = document.createElement('div');
  followUp.className = 'service-follow-up-copy';
  followUp.innerHTML = `<h4>${content.heading}</h4><p>${content.copy}</p><div class="service-follow-up-badges">${content.badges.map((badge) => `<span><span class="certification-dot"></span>${badge}</span>`).join('')}</div><a class="service-follow-up-button" href="get-in-touch.html">Connect With Us</a>`;

  const rightColumn = document.createElement('div');
  rightColumn.className = 'service-follow-up-right';
  videoBox.replaceWith(rightColumn);
  rightColumn.append(videoBox, followUp);

  if (serviceId === 'legacy-data-transformation') {
    const button = followUp.querySelector('.service-follow-up-button');
    const serviceItem = feature.querySelector('.service-item');

    if (button && serviceItem) {
      serviceItem.append(button);
    }
  }
});

const bpoFeature = document.querySelector('#bpo-workflows');

if (bpoFeature) {
  const bpoItem = bpoFeature.querySelector('.service-item');
  const bpoVideo = bpoFeature.querySelector('.service-video-box');
  const bpoMore = bpoFeature.querySelector('.service-more-copy');
  const bpoBanner = bpoFeature.querySelector('.service-cta-banner');

  if (bpoItem && bpoVideo && bpoMore && bpoBanner) {
    const bpoServices = bpoItem.querySelectorAll('.data-rte-list li');
    const conciseBpoServices = [
      'Prior Auth & Pre-Certification',
      'Medical Coding',
      'Charge Entry & Encounter Capture',
      'Claim Scrubbing & E-Submission',
      'Clearinghouse Rejection Management',
      'Payment Posting & ERA/EOB Reconciliation',
      'Denials & Corrected Claims',
      'A/R & Claim Appeals',
      'Secondary & Tertiary Claim Filing',
      'Credit Balance & Refund Audits'
    ];

    bpoServices.forEach((service, index) => {
      if (conciseBpoServices[index]) {
        service.textContent = conciseBpoServices[index];
      }
    });

    const bpoColumnNote = document.createElement('aside');
    bpoColumnNote.className = 'bpo-column-note';
    bpoColumnNote.innerHTML = '<a class="bpo-column-note-cta" href="index.html#get-in-touch">Get in Touch</a><div class="bpo-column-note-copy"><span>Workflow coverage</span><strong>From intake to payment</strong><small>One coordinated process for every claim.</small></div>';
    bpoItem.append(bpoColumnNote);

    const bpoRight = document.createElement('div');
    bpoRight.className = 'service-bpo-right';
    bpoFeature.insertBefore(bpoRight, bpoVideo);

    bpoRight.append(bpoVideo, bpoMore);

    const bpoBadges = document.createElement('div');
    bpoBadges.className = 'service-trust-badges';
    bpoBadges.setAttribute('aria-label', 'Compliance credentials');
    bpoBadges.innerHTML = '<span><i class="certification-dot"></i>HIPAA</span><span><i class="certification-dot"></i>ISO 27001</span><span><i class="certification-dot"></i>SOC</span><span><i class="certification-dot"></i>24/7 Servicing</span>';
    bpoMore.append(bpoBadges);
  }
}


menuToggle.addEventListener('click', () => {
  const isOpen = primaryNavigation.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    if (toggle.tagName === 'A') {
      return;
    }

    const dropdown = toggle.closest('.has-dropdown');
    const isOpen = dropdown.classList.toggle('is-open');

    toggle.setAttribute('aria-expanded', String(isOpen));

    dropdownToggles.forEach((otherToggle) => {
      const otherDropdown = otherToggle.closest('.has-dropdown');
      if (otherToggle !== toggle) {
        otherDropdown.classList.remove('is-open');
        otherToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) {
    primaryNavigation.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');

    dropdownToggles.forEach((toggle) => {
      toggle.closest('.has-dropdown').classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }
});
