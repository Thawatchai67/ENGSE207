const taskList = document.getElementById('task-list');

// Fetch all tasks
async function fetchTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    renderTasks(tasks);
}

// Create task
async function createTask(taskData) {
    await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
    });
    fetchTasks(); // reload
}

// Render tasks
function renderTasks(tasks) {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.title} [${task.status}] (${task.priority})`;
        taskList.appendChild(li);
    });
}

// Load on page load
document.addEventListener('DOMContentLoaded', fetchTasks);
