/**
 * LARP Adventures Theme Switcher
 * Persists theme choice via localStorage
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'larp-adventures-theme';
  const DEFAULT_THEME = 'dungeon';
  const THEMES = [
    { id: 'dungeon', name: 'Dungeon Master', icon: 'book' },
    { id: 'traveller', name: 'Traveller', icon: 'rocket' },
    { id: 'whitebox', name: 'White Box', icon: 'square' },
    { id: 'tavern', name: 'Tavern at Night', icon: 'moon' },
    { id: 'phb', name: "Player's Handbook", icon: 'book' },
    { id: 'arcane', name: 'Arcane Academy', icon: 'star' },
    { id: 'fey', name: 'Fey Court', icon: 'flower' },
    { id: 'frost', name: 'Frost Court', icon: 'snow' },
    { id: 'highcontrast', name: 'High Contrast', icon: 'eye' }
  ];

  // Get saved theme or default
  function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  }

  // Save theme choice
  function saveTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Apply theme to page
  function applyTheme(theme) {
    // Update data attribute
    document.documentElement.setAttribute('data-theme', theme);

    // Find and update the theme CSS link
    const themeLink = document.getElementById('theme-css');
    if (themeLink) {
      // Determine the correct path based on current location
      const currentPath = window.location.pathname;
      let cssPath;

      if (currentPath.includes('/public/') || currentPath.includes('/portal/')) {
        cssPath = `../css/theme-${theme}.css`;
      } else {
        cssPath = `css/theme-${theme}.css`;
      }

      themeLink.href = cssPath;
    }

    // Update button states
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });

    // Update current theme display
    const currentDisplay = document.querySelector('.theme-current-name');
    if (currentDisplay) {
      const themeData = THEMES.find(t => t.id === theme);
      currentDisplay.textContent = themeData ? themeData.name : theme;
    }
  }

  // Create the floating theme switcher UI
  function createSwitcherUI() {
    const switcher = document.createElement('div');
    switcher.className = 'theme-switcher-float';
    switcher.innerHTML = `
      <button type="button" class="theme-toggle" aria-label="Change theme" title="Change theme">
        <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
          <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z"/>
        </svg>
        <span class="theme-current-name">${THEMES.find(t => t.id === getSavedTheme())?.name || 'Theme'}</span>
      </button>
      <div class="theme-options">
        ${THEMES.map(t => `
          <button type="button" class="theme-btn ${t.id === getSavedTheme() ? 'active' : ''}" data-theme="${t.id}">
            ${t.name}
          </button>
        `).join('')}
      </div>
    `;

    // Add styles
    const styles = document.createElement('style');
    styles.textContent = `
      .theme-switcher-float {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .theme-toggle {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        background: #1a1a1a;
        color: #ffffff;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: all 0.2s ease;
      }

      .theme-toggle:hover {
        background: #333;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      }

      .theme-toggle svg,
      .theme-toggle span {
        pointer-events: none;
      }

      .theme-options {
        position: absolute;
        bottom: 100%;
        right: 0;
        margin-bottom: 8px;
        background: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
        transform: translateY(10px);
        transition: all 0.2s ease;
      }

      .theme-switcher-float.open .theme-options {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .theme-btn {
        display: block;
        width: 100%;
        padding: 12px 20px;
        background: transparent;
        border: none;
        text-align: left;
        cursor: pointer;
        font-size: 14px;
        color: #333;
        transition: background 0.15s ease;
        white-space: nowrap;
      }

      .theme-btn:hover {
        background: #f5f5f5;
      }

      .theme-btn.active {
        background: #e8e8e8;
        font-weight: 600;
      }

      .theme-btn + .theme-btn {
        border-top: 1px solid #eee;
      }
    `;

    document.head.appendChild(styles);
    document.body.appendChild(switcher);

    // Toggle options panel - using onclick for better Safari compatibility
    const toggle = switcher.querySelector('.theme-toggle');
    toggle.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      switcher.classList.toggle('open');
      return false;
    };

    // Handle theme selection
    switcher.querySelectorAll('.theme-btn').forEach(btn => {
      btn.onclick = function() {
        const theme = this.dataset.theme;
        saveTheme(theme);
        applyTheme(theme);
        switcher.classList.remove('open');
      };
    });

    // Close when clicking outside (with delay to avoid race condition)
    setTimeout(() => {
      document.addEventListener('click', (e) => {
        if (!switcher.contains(e.target)) {
          switcher.classList.remove('open');
        }
      });
    }, 100);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        switcher.classList.remove('open');
      }
    });
  }

  // Initialize on DOM ready
  function init() {
    const savedTheme = getSavedTheme();
    applyTheme(savedTheme);
    createSwitcherUI();
  }

  // Apply theme immediately to prevent flash
  (function() {
    const savedTheme = getSavedTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);
  })();

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
