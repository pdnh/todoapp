// filterTasks.js — small filter bar + wraps render() to filter by title + priority
(function () {
  // Wait until showToDo.js defined render()
  function ready (fn) { document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    if (typeof window.render !== 'function') return; // showToDo.js
    if (window.__filterWrapped) return; // avoid double-wrapping

    // --- 1) Inject a tiny filter toolbar ---
    const form = document.getElementById('todoForm');
    const bar = document.createElement('div');
    bar.id = 'filters';
    bar.style.cssText = 'max-width:500px;margin:12px auto;display:flex;gap:8px;align-items:center;';

    const titleInput = document.createElement('input');
    titleInput.id = 'filterTitle';
    titleInput.placeholder = 'Nach Titel suchen…';
    titleInput.style.cssText = 'flex:1;padding:8px';

    const prioSelect = document.createElement('select');
    prioSelect.id = 'filterPriority';
    prioSelect.style.cssText = 'padding:8px';
    prioSelect.innerHTML = `
      <option value="">Alle Prioritäten</option>
      <option value="Hoch">Hoch</option>
      <option value="Mittel">Mittel</option>
      <option value="Niedrig">Niedrig</option>
    `;

    bar.appendChild(titleInput);
    bar.appendChild(prioSelect);
    form.insertAdjacentElement('afterend', bar);

    // --- 2) Wrap your render() ---
    const originalRender = window.render;

    function matches (li, titleNeedle, prioNeedle) {
      const titleEl = li.querySelector('.title');
      if (!titleEl) return false;

      const text = titleEl.textContent || '';
      const norm = s => (s || '').toLowerCase().trim();
      const titleOk = !titleNeedle || norm(text).includes(norm(titleNeedle));

      // Priority is in the text like: "Task title (Hoch|Mittel|Niedrig)"
      const m = text.match(/\((Hoch|Mittel|Niedrig)\)\s*$/);
      const prio = m ? m[1] : '';
      const prioOk = !prioNeedle || prio === prioNeedle;

      return titleOk && prioOk;
    }

    function postFilter () {
      const list = document.getElementById('taskList');
      if (!list) return;
      const titleNeedle = titleInput.value;
      const prioNeedle = prioSelect.value;

      Array.from(list.querySelectorAll('li')).forEach(li => {
        li.style.display = matches(li, titleNeedle, prioNeedle) ? '' : 'none';
      });
    }

    window.render = function wrappedRender () {
      originalRender(); // draw full list
      postFilter(); // then hide non-matching items
    };
    window.__filterWrapped = true;

    // Live updates when the user types/changes
    titleInput.addEventListener('input', () => window.render());
    prioSelect.addEventListener('change', () => window.render());

    // Initial pass
    try { window.render(); } catch {}
  });
})();
