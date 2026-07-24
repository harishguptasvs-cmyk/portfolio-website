/**
 * S V S Harish Gupta Portfolio Website
 * Main controller and project filter engine
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Loading Screen Animation
  const loader = document.getElementById('loader');
  const loaderPercent = loader.querySelector('.loader-percent');
  const loaderFill = loader.querySelector('.loader-fill');

  if (loader && loaderPercent && loaderFill) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5; // Faster loading steps
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        loaderPercent.textContent = progress;
        loaderFill.style.width = progress + '%';

        setTimeout(() => {
          loader.style.opacity = '0';
          setTimeout(() => {
            loader.style.display = 'none';
          }, 500);
        }, 300);
      } else {
        loaderPercent.textContent = progress;
        loaderFill.style.width = progress + '%';
      }
    }, 50);
  }

  // 2. Project Filtering Engine
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button selection
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          // Force reflow
          card.offsetHeight;
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          // Wait for transition before hiding completely
          setTimeout(() => {
            if (card.style.opacity === '0') {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });

  // 3. Project Details Expanded (Case Studies Audit Toggles)
  const toggleButtons = document.querySelectorAll('.toggle-details-btn');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      const expandedSection = card.querySelector('.project-details-expanded');

      if (expandedSection) {
        const isHidden = expandedSection.style.display === 'none' || !expandedSection.classList.contains('show');

        if (isHidden) {
          expandedSection.style.display = 'block';
          expandedSection.offsetHeight; // Force layout
          expandedSection.classList.add('show');
          btn.textContent = 'Hide Engineering Audit';
          btn.classList.add('btn-primary');
          btn.classList.remove('btn-secondary');
        } else {
          expandedSection.classList.remove('show');
          expandedSection.style.display = 'none';
          btn.textContent = 'View Full Engineering Audit';
          btn.classList.remove('btn-primary');
          btn.classList.add('btn-secondary');
        }
      }
    });
  });

  // Active Navbar links tracking scroll
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section, header');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120; // offset

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

});