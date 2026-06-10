// ======================
// DATA STORE
// ======================
let users = JSON.parse(localStorage.getItem("users")) || [];
let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// ======================
// AUTHENTICATION
// ======================

function register(event) {
    event.preventDefault();

    const user = {
        id: Date.now(),
        nom: document.querySelector("input[placeholder='Nom']").value,
        prenom: document.querySelector("input[placeholder='Prénom']").value,
        email: document.querySelector("input[placeholder='Email']").value,
        password: document.querySelector("input[placeholder='Mot de passe']").value,
        role: document.querySelector("select").value
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Inscription réussie !");
    window.location.href = "login.html";
}
function login(event) {
    event.preventDefault();

    const email = document.querySelector("input[type='email']").value;
    const password = document.querySelector("input[type='password']").value;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("Email ou mot de passe incorrect !");
        return;
    }

    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Connexion réussie !");

    redirectByRole(user.role);
}
// Pour rediriger les utilisateurs en fonction de leur rôle
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
function redirectByRole(role) {
    if (role === "ETUDIANT") {
        window.location.href = "student/dashboard.html";
    } else if (role === "TUTEUR") {
        window.location.href = "tutor/dashboard.html";
    } else {
        window.location.href = "admin/dashboard.html";
    }
}

// ======================
// RESERVATIONS
// ======================

function reserveTutor(tutorName, subject) {

    if (!currentUser) return;

    const reservation = {
        id: Date.now(),
        student: currentUser.nom + " " + currentUser.prenom,
        tutor: tutorName,
        subject: subject,
        date: new Date().toLocaleDateString(),
        time: "",
        status: "EN_ATTENTE"
    };

    reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(reservations));

    alert("Réservation envoyée !");
}
// Pour les tuteurs : accepter ou refuser une réservation
function updateStatus(id, status) {

    const res = reservations.find(r => r.id === id);

    if (!res) return;

    res.status = status;
    localStorage.setItem("reservations", JSON.stringify(reservations));

    location.reload();
}
// Pour les étudiants : voir leurs réservations
function loadStudentDashboard() {

    if (!currentUser) return;

    const table = document.getElementById("studentTable");
    if (!table) return;

    const myReservations = reservations.filter(r =>
        r.student === currentUser.nom + " " + currentUser.prenom
    );

    document.getElementById("myReservationsCount").innerText = myReservations.length;

    myReservations.forEach(r => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${r.tutor}</td>
            <td>${r.subject}</td>
            <td>${r.date}</td>
            <td>${r.time || "-"}</td>
            <td>${r.status}</td>
        `;

        table.appendChild(row);
    });
}
// Pour les tuteurs : voir les réservations reçues
function loadTutorDashboard() {

    const table = document.getElementById("tutorTable");
    if (!table) return;

    const myReservations = reservations.filter(r =>
        r.tutor === "Jean Mukendi"
    );

    myReservations.forEach(r => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${r.student}</td>
            <td>${r.subject}</td>
            <td>${r.date}</td>
            <td>
                <button onclick="updateStatus(${r.id}, 'ACCEPTE')">✔</button>
                <button onclick="updateStatus(${r.id}, 'REFUSE')">❌</button>
            </td>
        `;

        table.appendChild(row);
    });
}
// Pour les admins : voir tous les utilisateurs et statistiques
function loadAdminDashboard() {

    const table = document.getElementById("userTable");
    if (!table) return;

    document.getElementById("totalUsers").innerText = users.length;
    document.getElementById("totalReservations").innerText = reservations.length;

    const tutors = users.filter(u => u.role === "TUTEUR");
    document.getElementById("totalTutors").innerText = tutors.length;

    users.forEach(u => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${u.nom} ${u.prenom}</td>
            <td>${u.email}</td>
            <td>${u.role}</td>
        `;

        table.appendChild(row);
    });
}
// Pour charger les données au chargement de la page
document.addEventListener("DOMContentLoaded", () => {

    loadStudentDashboard();
    loadTutorDashboard();
    loadAdminDashboard();

});