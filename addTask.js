/* global render */
const titleInput = document.getElementById('taskTitle');
const descInput = document.getElementById('taskDesc');
const priorityInput = document.getElementById('taskPriority');
const form = document.getElementById('todoForm');
const todos = JSON.parse(localStorage.getItem('todos') || '[]');

function save () {
  localStorage.setItem('todos', JSON.stringify(todos));
}

window.save = save;

form.onsubmit = e => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const desc = descInput.value.trim();
  const priority = priorityInput.value;
  if (!title) return;

  todos.push({ title, desc, priority, done: false });
  titleInput.value = '';
  descInput.value = '';
  priorityInput.value = 'Mittel';
  save();
  render(); // <-- funktioniert jetzt, weil render global ist
};

render();
