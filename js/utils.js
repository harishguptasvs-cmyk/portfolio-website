/**
 * S V S Harish Gupta Portfolio Website
 * Helper utilities & client interactions
 */

document.addEventListener('DOMContentLoaded', () => {

  // Theme initialization from localStorage
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Email Copy button direct handler
  const copyEmailBtn = document.getElementById('btn-copy-email');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('harishguptasvs@gmail.com')
        .then(() => {
          const originalText = copyEmailBtn.textContent;
          copyEmailBtn.textContent = 'COPIED!';
          copyEmailBtn.style.backgroundColor = 'var(--terminal-prompt)';
          copyEmailBtn.style.color = '#ffffff';
          setTimeout(() => {
            copyEmailBtn.textContent = originalText;
            copyEmailBtn.style.backgroundColor = '';
            copyEmailBtn.style.color = '';
          }, 2000);
        })
        .catch(err => console.error('Error copying email: ', err));
    });
  }

  // Scroll Progress Indicator
  window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress-bar');
    if (scrollProgress) {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (windowHeight > 0) ? (window.scrollY / windowHeight) * 100 : 0;
      scrollProgress.style.width = scrolled + '%';
    }
  });

  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Theme Toggle Button directly inside Navbar
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const html = document.documentElement;
      const currentTheme = html.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', nextTheme);
      localStorage.setItem('portfolio-theme', nextTheme);
    });
  }

  // Formspree Contact Form ajax validation
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      formFeedback.className = 'font-mono';
      formFeedback.textContent = '// TRANSMITTING_PAYLOAD_PLEASE_WAIT...';
      formFeedback.style.display = 'block';

      const data = new FormData(contactForm);
      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formFeedback.className = 'font-mono success';
          formFeedback.textContent = '=> SUCCESS: TRANSMISSION_RECEIVED_WILL_REPLY_SOON.';
          contactForm.reset();
        } else {
          const result = await response.json();
          formFeedback.className = 'font-mono error';
          formFeedback.textContent = `=> ERROR: ${result.errors ? result.errors.map(err => err.message).join(', ') : 'TRANSMISSION_FAILED'}`;
        }
      } catch (error) {
        formFeedback.className = 'font-mono error';
        formFeedback.textContent = '=> ERROR: TELEMETRY_SERVER_UNREACHABLE_PLEASE_TRY_AGAIN.';
      }
    });
  }
});