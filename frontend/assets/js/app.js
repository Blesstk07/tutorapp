let users = JSON.parse(localStorage.getItem("users")) || [];
let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;


// Pour la page d'inscription
function register(event) {
    event.preventDefault();

    let user = {
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

// Pour la page de connexion
function login(event) {
    event.preventDefault();

    let email = document.querySelector("input[type='email']").value;
    let password = document.querySelector("input[type='password']").value;

    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Connexion réussie !");

        // redirection selon rôle
        if (user.role === "ETUDIANT") {
            window.location.href = "student/dashboard.html";
        } else if (user.role === "TUTEUR") {
            window.location.href = "tutor/dashboard.html";
        } else {
            window.location.href = "admin/dashboard.html";
        }

    } else {
        alert("Email ou mot de passe incorrect !");
    }
}

// Pour la page de réservation
function reserveTutor(tutorName, subject) {

    let reservation = {
        id: Date.now(),
        student: currentUser.nom + " " + currentUser.prenom,
        tutor: tutorName,
        subject: subject,
        date: new Date().toLocaleDateString(),
        status: "EN_ATTENTE"
    };

    reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(reservations));

    alert("Réservation envoyée !");
}

//Pour changer le dashboard étudiant
function loadStudentDashboard() {

    if (!currentUser) return;

    let userReservations = reservations.filter(r => r.student === currentUser.nom + " " + currentUser.prenom);

    console.log("Mes réservations :", userReservations);
}

// Pour quitter la session
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// Pour afficher les réservations de l'étudiant
function loadStudentReservations() {

    if (!currentUser) return;

    let table = document.getElementById("studentTable");

    if (!table) return;

    let myReservations = reservations.filter(r =>
        r.student === currentUser.nom + " " + currentUser.prenom
    );

    myReservations.forEach(r => {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${r.tutor}</td>
            <td>${r.subject}</td>
            <td>${r.date}</td>
            <td>${r.time}</td>
            <td>${r.status}</td>
        `;

        table.appendChild(row);
    });
}

//Pour afficher les réservations du tuteur
document.addEventListener("DOMContentLoaded", function() {
    loadStudentReservations();
});

//Pour afficher les réservations du tuteur
function loadTutorReservations() {

    if (!currentUser) return;

    let table = document.getElementById("tutorTable");

    if (!table) return;

    let myReservations = reservations.filter(r =>
        r.tutor === "Jean Mukendi"
    );

    myReservations.forEach(r => {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${r.student}</td>
            <td>${r.subject}</td>
            <td>${r.date}</td>
            <td>${r.time}</td>
            <td>
                <button onclick="updateStatus(${r.id}, 'ACCEPTE')">✔</button>
                <button onclick="updateStatus(${r.id}, 'REFUSE')">❌</button>
            </td>
        `;

        table.appendChild(row);
    });
}

// Pour mettre à jour le statut d'une réservation
function updateStatus(id, status) {

    let res = reservations.find(r => r.id === id);

    if (res) {
        res.status = status;
        localStorage.setItem("reservations", JSON.stringify(reservations));
        location.reload();
    }
}

// Pour afficher les réservations du tuteur
document.addEventListener("DOMContentLoaded", function() {
    loadTutorReservations();
});

// Pour afficher les utilisateurs dans le dashboard admin
function loadUsers() {

    let table = document.getElementById("userTable");

    if (!table) return;

    users.forEach(u => {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${u.nom} ${u.prenom}</td>
            <td>${u.email}</td>
            <td>${u.role}</td>
        `;

        table.appendChild(row);
    });
}

// Pour afficher les utilisateurs dans le dashboard admin
document.addEventListener("DOMContentLoaded", function() {
    loadUsers();
});