const BASE_URL = "https://taskmanagement-backend-dyfk.onrender.com";
const token = localStorage.getItem("token");

if (!token) window.location.href = "index.html";

function headers() {
    return {
        "Content-Type": "application/json",
        "Authorization": token
    };
}

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
        li.innerText = task.title;

        if (task.completed) {
            completed.appendChild(li);
        } else {
            li.onclick = () => completeTask(task._id);
            pending.appendChild(li);
        }
    });
}

async function addTask() {
    const title = document.getElementById("taskInput").value;

    await fetch(`${BASE_URL}/api/tasks`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ title })
    });

    document.getElementById("taskInput").value = "";
    loadTasks();
}

async function completeTask(id) {
    await fetch(`${BASE_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: headers()
    });
    loadTasks();
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

loadTasks();
