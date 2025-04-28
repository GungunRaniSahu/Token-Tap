document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
  
    const toggleBtn = document.getElementById("toggle-dark");
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem("theme");
  
    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        toggleBtn.textContent = document.documentElement.classList.contains("dark") ? "☀️" : "🌙";
        const theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
        localStorage.setItem("theme", theme);
      });
    }
  
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
  
        console.log("Logging in with", email, password);
  
        try {
          const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
  
          const data = await response.json();
          console.log("Response:", data);
  
          if (response.ok && data.token) {
            localStorage.setItem("token", data.token);
            console.log("Token saved:", data.token);
            window.location.href = "../pages/dashboard.html";
          } else {
            alert(data.message || "Invalid credentials.");
          }
        } catch (err) {
          console.error("Error:", err);
          alert("Something went wrong!");
        }
      });
    }
  
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
      signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("Signup form submitted!");
  
        const username  = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
  
        try {
          const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
          });
  
          const contentType = res.headers.get("content-type");
  
          if (!res.ok) {
            const text = await res.text();
            throw new Error(`HTTP ${res.status}: ${text}`);
          }
  
          const data = contentType.includes("application/json") ? await res.json() : {};
          alert(data.message || "Signed up successfully!");
        } catch (err) {
          console.error("Error during signup:", err.message);
          alert("Signup failed: " + err.message);
        }
      });
    }
  });
  