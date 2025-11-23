/* global categories */
const categoryList = document.getElementById('categoryList');

function renderCategories () {
  categoryList.innerHTML = '';
  categories.forEach(cat => {
    const li = document.createElement('li');
    const title = document.createElement('div');
    title.className = 'name';
    title.textContent = cat.name;
    li.append(title);
    categoryList.appendChild(li);
  });
}

renderCategories();
