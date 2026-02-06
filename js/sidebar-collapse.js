// Sidebar section collapse persistence
// Saves collapsed/expanded state of sidebar sections to localStorage
(function() {
  const STORAGE_KEY = 'larp-sidebar-collapsed';

  function getSavedState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveState(id, collapsed) {
    const state = getSavedState();
    state[id] = collapsed;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  // Restore saved state on load
  const saved = getSavedState();
  Object.keys(saved).forEach(function(id) {
    const el = document.getElementById(id);
    if (el && saved[id]) {
      el.classList.remove('show');
      const toggle = document.querySelector('[href="#' + id + '"]');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Listen for collapse/expand events
  document.querySelectorAll('.sidebar-section-toggle').forEach(function(toggle) {
    const targetId = toggle.getAttribute('href').replace('#', '');
    const target = document.getElementById(targetId);
    if (!target) return;

    target.addEventListener('hidden.bs.collapse', function() {
      saveState(targetId, true);
    });

    target.addEventListener('shown.bs.collapse', function() {
      saveState(targetId, false);
    });
  });
})();
