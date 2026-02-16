// ============================================
// Task Board Frontend Application
// ============================================

const API_BASE = CONFIG.API_URL;

// ================= API =================
async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return response.json();
}

// ================= Load =================
async function loadTasks() {
  try {
    const tasks = await fetchAPI('/api/tasks');
    renderTasks(tasks);
  } catch (err) {
    console.error('Load error:', err);
  }
}

// ================= Render =================
function renderTasks(tasks) {
  const todo = document.getElementById('todo');
  const progress = document.getElementById('in-progress');
  const done = document.getElementById('done');

  todo.innerHTML = '';
  progress.innerHTML = '';
  done.innerHTML = '';

  tasks.forEach(task => {
    const card = document.createElement('div');
    card.className = 'task';

    card.innerHTML = `
      <strong>${task.title}</strong><br/>
      <small>${task.priority}</small><br/><br/>
      <button onclick="moveTask(${task.id}, 'IN_PROGRESS')">➡️</button>
      <button onclick="moveTask(${task.id}, 'DONE')">✅</button>
    `;

    if (task.status === 'TODO') todo.appendChild(card);
    else if (task.status === 'IN_PROGRESS') progress.appendChild(card);
    else done.appendChild(card);
  });
}

// ================= Actions =================
async function moveTask(id, status) {
  await fetchAPI(`/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  });
  loadTasks();
}

async function addTask() {
  const title = document.getElementById('title').value;
  if (!title) return;

  await fetchAPI('/api/tasks', {
    method: 'POST',
    body: JSON.stringify({ title })
  });

  document.getElementById('title').value = '';
  loadTasks();
}

// ================= Start =================
document.addEventListener('DOMContentLoaded', loadTasks);
