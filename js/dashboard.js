const BASE_URL = "https://taskmanagement-backend-dyfk.onrender.com";
const token = localStorage.getItem("token");

if (!token) window.location.href = "index.html";

function headers() {
    return {
        "Content-Type": "application/json",
        "Authorization": token
    };
}

// Load tasks
async function loadTasks() {
    const res = await fetch(`${BASE_URL}/api/tasks`, {
        headers: headers()
    });

    const tasks = await res.json();

    const pending = document.getElementById("pendingTasks");
    const completed = document.getElementById("completedTasks");

    pending.innerHTML = "";
    completed.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${task.title}</span>
            <button onclick="updateTask('${task._id}', '${task.title}')">Edit</button>
            <button onclick="deleteTask('${task._id}')">Delete</button>
            ${
                task.completed
                    ? `<button onclick="undoTask('${task._id}')">Undo</button>`
                    : `<button onclick="completeTask('${task._id}')">Complete</button>`
            }
        `;

        if (task.completed) {
            completed.appendChild(li);
        } else {
            pending.appendChild(li);
        }
    });
}

// Add task
async function addTask() {
    const title = document.getElementById("taskInput").value.trim();
    if (!title) return alert("Task title required");

    await fetch(`${BASE_URL}/api/tasks`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ title })
    });

    document.getElementById("taskInput").value = "";
    loadTasks();
}

// Update task
async function updateTask(id, oldTitle) {
    const newTitle = prompt("Update task", oldTitle);
    if (!newTitle) return;

    await fetch(`${BASE_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify({ title: newTitle })
    });

    loadTasks();
}

// Complete task
async function completeTask(id) {
    await fetch(`${BASE_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify({ completed: true })
    });

    loadTasks();
}

// Undo completed task
async function undoTask(id) {
    await fetch(`${BASE_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify({ completed: false })
    });

    loadTasks();
}

// Delete task
async function deleteTask(id) {
    if (!confirm("Are you sure you want to delete this task?")) return;

    await fetch(`${BASE_URL}/api/tasks/${id}`, {
        method: "DELETE",
        headers: headers()
    });

    loadTasks();
}

// Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

loadTasks();
