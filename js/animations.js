/**
 * S V S Harish Gupta Portfolio Website
 * On-Scroll and micro-interactions animations module
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Intersection Observer for On-Scroll Reveal Effects
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Reveal only once for performance
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewports
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 2. Animated Counters for Stats
  const statsElements = document.querySelectorAll('.stat-number');

  const animateStats = (entry) => {
    const el = entry.target;
    const targetValue = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1500; // ms
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
      const currentValue = Math.round(easeProgress * targetValue);

      el.textContent = currentValue;

      if (frame >= totalFrames) {
        el.textContent = targetValue;
        clearInterval(counter);
      }
    }, frameRate);
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats(entry);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statsElements.forEach(stat => statsObserver.observe(stat));

  // 3. Dynamic Interactive skill tags tag hovering tracking
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = 'scale(1.05) translateY(-2px)';
      tag.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = 'none';
    });
  });
});