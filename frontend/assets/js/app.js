const API_URL = "http://localhost:8080/api";

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const message = document.getElementById("message");

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    motDePasse: password
                })
            });

            const data = await res.json();

            if (!res.ok) {
                message.innerText = data || "Erreur login";
                message.style.color = "red";
                return;
            }

            message.innerText = "Connexion réussie ✔";
            message.style.color = "green";

            localStorage.setItem("user", JSON.stringify(data));

            // redirect simple
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);

        } catch (err) {
            console.log(err);
            message.innerText = "Backend inaccessible";
            message.style.color = "red";
        }
    });

});