/**
 * S V S Harish Gupta Portfolio Website
 * Command Palette Controller (Ctrl/Cmd + K Overlay)
 */

document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('cmd-palette');
  const trigger = document.getElementById('cmd-k-trigger');
  const closeBtn = document.getElementById('cmd-close-btn');
  const input = document.getElementById('cmd-input');
  const resultsContainer = document.getElementById('cmd-results');

  // Command palette datasets
  const commands = [
    { id: 'nav-about', title: 'Go to About Me', desc: 'Jump to the professional biography section', shortcut: 'G + A', action: () => scrollToSection('#about') },
    { id: 'nav-skills', title: 'Go to Technical Skills', desc: 'Jump to the expertise & tech stack section', shortcut: 'G + S', action: () => scrollToSection('#skills') },
    { id: 'nav-projects', title: 'Go to Projects & Systems', desc: 'Jump to the engineering case studies section', shortcut: 'G + P', action: () => scrollToSection('#projects') },
    { id: 'nav-timeline', title: 'Go to Timeline', desc: 'Jump to the career & study milestone timeline', shortcut: 'G + T', action: () => scrollToSection('#experience') },
    { id: 'nav-certifications', title: 'Go to Certifications', desc: 'Jump to verified credentials section', shortcut: 'G + C', action: () => scrollToSection('#certifications') },
    { id: 'nav-contact', title: 'Go to Contact Terminal', desc: 'Jump to the direct telemetry contact form', shortcut: 'G + M', action: () => scrollToSection('#contact') },
    { id: 'theme-switch', title: 'Switch Color Theme', desc: 'Toggle between dark and light modes', shortcut: 'T', action: () => toggleTheme() },
    { id: 'action-copy', title: 'Copy Email Address', desc: 'Copy harishguptasvs@gmail.com to clipboard', shortcut: 'C', action: () => copyEmailToClipboard() },
    { id: 'action-resume', title: 'Download Resume PDF', desc: 'Trigger file download for resume.pdf', shortcut: 'R', action: () => triggerResumeDownload() }
  ];

  let selectedIndex = 0;
  let filteredCommands = [...commands];

  // Open Command Palette
  function openPalette() {
    dialog.showModal();
    input.value = '';
    selectedIndex = 0;
    renderCommands();
    setTimeout(() => input.focus(), 50);
  }

  // Close Command Palette
  function closePalette() {
    dialog.close();
  }

  // Render list of commands
  function renderCommands() {
    resultsContainer.innerHTML = '';

    if (filteredCommands.length === 0) {
      resultsContainer.innerHTML = `
        <div class="cmd-item" style="cursor: default; justify-content: center; color: var(--text-muted); font-size: 0.9rem;">
          No matching systems found
        </div>
      `;
      return;
    }

    filteredCommands.forEach((cmd, idx) => {
      const item = document.createElement('div');
      item.className = `cmd-item ${idx === selectedIndex ? 'selected' : ''}`;
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', idx === selectedIndex ? 'true' : 'false');
      item.setAttribute('id', `cmd-opt-${cmd.id}`);

      item.innerHTML = `
        <div class="cmd-item-info">
          <span class="cmd-item-title">${cmd.title}</span>
          <span class="cmd-item-desc">${cmd.desc}</span>
        </div>
        <span class="cmd-item-shortcut font-mono">${cmd.shortcut}</span>
      `;

      item.addEventListener('click', () => {
        cmd.action();
        closePalette();
      });

      resultsContainer.appendChild(item);
    });

    // Ensure selected element is scrolled into view
    const selectedElement = resultsContainer.querySelector('.cmd-item.selected');
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: 'nearest' });
    }
  }

  // Filter actions
  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    filteredCommands = commands.filter(cmd =>
      cmd.title.toLowerCase().includes(query) ||
      cmd.desc.toLowerCase().includes(query)
    );
    selectedIndex = 0;
    renderCommands();
  });

  // Handle Keyboard inside Dialogue
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % filteredCommands.length;
      renderCommands();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
      renderCommands();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        closePalette();
      }
    }
  });

  // Hotkeys and shortcuts listeners
  trigger.addEventListener('click', openPalette);
  closeBtn.addEventListener('click', closePalette);

  document.addEventListener('keydown', (e) => {
    // Open Cmd+K / Ctrl+K
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (dialog.open) {
        closePalette();
      } else {
        openPalette();
      }
    }

    // Direct single letter hotkeys if not inside any input/textarea
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA' || dialog.open) {
      return;
    }

    const key = e.key.toLowerCase();

    // Toggle theme with 't'
    if (key === 't') {
      e.preventDefault();
      toggleTheme();
    }
    // Copy email with 'c'
    if (key === 'c') {
      e.preventDefault();
      copyEmailToClipboard();
    }
    // Download resume with 'r'
    if (key === 'r') {
      e.preventDefault();
      triggerResumeDownload();
    }
  });

  // Global helper actions
  function scrollToSection(selector) {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);

    // Update theme toggle icon state implicitly via CSS attributes
  }

  function copyEmailToClipboard() {
    navigator.clipboard.writeText('harishguptasvs@gmail.com')
      .then(() => {
        const btn = document.getElementById('btn-copy-email');
        if (btn) {
          const originalText = btn.textContent;
          btn.textContent = 'COPIED!';
          btn.style.backgroundColor = 'var(--terminal-prompt)';
          btn.style.color = '#ffffff';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
          }, 2000);
        }
      })
      .catch(err => console.error('Failed to copy email: ', err));
  }

  function triggerResumeDownload() {
    const link = document.createElement('a');
    link.href = 'resume.pdf';
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});