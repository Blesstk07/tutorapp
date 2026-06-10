-- Création de la base de données
CREATE DATABASE IF NOT EXISTS tutorapp;
USE tutorapp;

-- =========================
-- TABLE USERS
-- =========================
CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
nom VARCHAR(100) NOT NULL,
prenom VARCHAR(100) NOT NULL,
email VARCHAR(150) UNIQUE NOT NULL,
mot_de_passe VARCHAR(255) NOT NULL,
role ENUM('ETUDIANT','TUTEUR','ADMIN') NOT NULL DEFAULT 'ETUDIANT',
date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TABLE MATIERES
-- =========================
CREATE TABLE matieres (
id INT AUTO_INCREMENT PRIMARY KEY,
nom VARCHAR(100) NOT NULL
);

-- =========================
-- TABLE TUTEURS
-- =========================
CREATE TABLE tuteurs (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
specialite VARCHAR(150),
description TEXT,
tarif DECIMAL(10,2) DEFAULT 0,


FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE


);

-- =========================
-- TABLE RESERVATIONS
-- =========================
CREATE TABLE reservations (
id INT AUTO_INCREMENT PRIMARY KEY,
etudiant_id INT NOT NULL,
tuteur_id INT NOT NULL,
date_reservation DATETIME NOT NULL,
statut ENUM('EN_ATTENTE','ACCEPTEE','REFUSEE') DEFAULT 'EN_ATTENTE',
message TEXT,


FOREIGN KEY (etudiant_id) REFERENCES users(id)
ON DELETE CASCADE,

FOREIGN KEY (tuteur_id) REFERENCES tuteurs(id)
ON DELETE CASCADE


);

-- =========================
-- TABLE EVALUATIONS
-- =========================
CREATE TABLE evaluations (
id INT AUTO_INCREMENT PRIMARY KEY,
reservation_id INT NOT NULL,
note INT NOT NULL,
commentaire TEXT,
date_evaluation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


FOREIGN KEY (reservation_id) REFERENCES reservations(id)
ON DELETE CASCADE


);

-- =========================
-- TABLE TUTEUR_MATIERE (relation many-to-many)
-- =========================
CREATE TABLE tuteur_matiere (
id INT AUTO_INCREMENT PRIMARY KEY,
tuteur_id INT NOT NULL,
matiere_id INT NOT NULL,


FOREIGN KEY (tuteur_id) REFERENCES tuteurs(id)
ON DELETE CASCADE,

FOREIGN KEY (matiere_id) REFERENCES matieres(id)
ON DELETE CASCADE


);

-- =========================
-- ADMIN par défaut (optionnel)
-- =========================
INSERT INTO users (nom, prenom, email, mot_de_passe, role)
VALUES ('Admin', 'System', '[admin@tutorapp.com](mailto:admin@tutorapp.com)', 'admin123', 'ADMIN');

-- =========================
-- MATIERES DE BASE
-- =========================
INSERT INTO matieres (nom) VALUES
('Java'),
('HTML/CSS'),
('JavaScript'),
('Base de données'),
('Algorithmique');
