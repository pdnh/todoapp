/* global render, save, todos */
(function () {
  // Wait until DOM is ready and render() exists
  function ready (fn) { document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    if (typeof render !== 'function') return; // showToDo.js
    if (window.__prioWrapped) return; // avoid double wrapping

    const originalRender = render;

    // Enhance the list after the original render runs
    function enhancePriorities () {
      const list = document.getElementById('taskList');
      if (!list) return;

      const items = Array.from(list.querySelectorAll('li'));
      items.forEach((li, i) => {
        // Find or create the actions container
        let actions = li.querySelector('.actions');
        if (!actions) {
          actions = document.createElement('div');
          actions.className = 'actions';
          li.appendChild(actions);
        }

        // If a priority select already exists, skip creating a duplicate
        let select = actions.querySelector('select.prio-edit');
        if (!select) {
          select = document.createElement('select');
          select.className = 'prio-edit';
          ['Hoch', 'Mittel', 'Niedrig'].forEach(p => {
            const opt = document.createElement('option');
            opt.value = p;
            opt.textContent = p;
            select.appendChild(opt);
          });

          // Insert the select before the delete button if present, otherwise append
          const deleteBtn = actions.querySelector('button');
          if (deleteBtn) {
            actions.insertBefore(select, deleteBtn);
          } else {
            actions.appendChild(select);
          }
        }

        // Set current value from the in-memory todos array
        try { select.value = todos[i]?.priority ?? 'Mittel'; } catch {}

        // On change, update the model, save, and re-render
        select.onchange = (e) => {
          try {
            todos[i].priority = e.target.value;
            save();
            render();
          } catch {
            // Fallback: if something goes wrong, just re-render
            try { render(); } catch {}
          }
        };
      });
    }

    // Wrap global render()
    window.render = function wrappedRender () {
      originalRender(); // draw original UI
      enhancePriorities(); // add editable priority controls
    };

    window.__prioWrapped = true;

    // In case the page rendered before this script loaded
    try { render(); } catch {}
  });
})();
