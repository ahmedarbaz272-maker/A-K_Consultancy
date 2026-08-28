const menuToggle = document.querySelector('.menu-toggle');
const primaryNavigation = document.querySelector('.primary-navigation');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

const pageConfigs = {
  'document-scanning-title': {
    subtitle: '<strong>Transition your files</strong> to digital systems without sacrificing crucial workflow details.'
  },
  'legacy-data-title': {
    subtitle: '<strong>Turn legacy records</strong> into clear, trusted, and usable operational data.'
  }
};

const targetTitle = document.querySelector('#document-scanning-title, #legacy-data-title');

if (targetTitle) {
  const config = pageConfigs[targetTitle.id];
  if (config) {
    const subtitle = document.createElement('p');
    subtitle.className = 'service-title-subtitle';
    subtitle.innerHTML = config.subtitle;
    targetTitle.after(subtitle);
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
