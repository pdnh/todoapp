const todos = []; // Define todos as an empty array or load from storage if needed

function render () {
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  todos.forEach((todo) => {
    const li = document.createElement('li');
    if (todo.done) li.classList.add('done');

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = `${todo.title} (${todo.priority})`;

    const desc = document.createElement('div');
    desc.className = 'desc';
    desc.textContent = todo.desc;

    const actions = document.createElement('div');
    actions.className = 'actions';
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️ Löschen';
    deleteBtn.onclick = () => {
      const filtered = todos.filter(t => t.title !== todo.title);
      todos.splice(0, todos.length, ...filtered);
      save();
      render();
    };
    actions.appendChild(deleteBtn);

    li.appendChild(title);
    li.appendChild(desc);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

// Dummy save function to avoid errors; implement actual saving logic as needed
function save () {
  // For example, save to localStorage:
  // localStorage.setItem('todos', JSON.stringify(todos));
}

window.render = render;
