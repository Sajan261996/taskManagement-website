const BASE_URL = "https://taskmanagement-backend-dyfk.onrender.com";
const msg = document.getElementById("msg");

/* TOGGLE FORMS */
function showSignup() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
    msg.innerText = "";
}

function showLogin() {
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    msg.innerText = "";
}

/* LOGIN */
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    console.log("LOGIN DATA:", email, password);

    const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    console.log("LOGIN RESPONSE:", data);

    if (!res.ok) {
        msg.innerText = data.message || "Login failed";
        return;
    }

    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
});

/* SIGNUP */
document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = signupName.value;
    const email = signupEmail.value;
    const password = signupPassword.value;

    const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    msg.innerText = data.message;

    if (res.ok) showLogin();
});
