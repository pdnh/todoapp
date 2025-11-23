/* global render, save, todos */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.delete-btn');
  if (!btn) return;

  const index = btn.dataset.index;
  if (index === undefined) return;

  if (confirm('Diese Aufgabe wirklich löschen?')) {
    todos.splice(index, 1);
    save();
    render();
  }
});
