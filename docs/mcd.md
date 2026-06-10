# MCD - TutorApp

## Entités

### Utilisateur

* id_user
* nom
* prenom
* email
* mot_de_passe
* role

### Tuteur

* id_tuteur
* specialite
* description
* tarif

### Matiere

* id_matiere
* nom_matiere

### Reservation

* id_reservation
* date_reservation
* statut

### Evaluation

* id_evaluation
* note
* commentaire

## Relations

Un utilisateur peut être étudiant ou tuteur.

Un tuteur enseigne une ou plusieurs matières.

Un étudiant peut effectuer plusieurs réservations.

Une réservation concerne un seul tuteur.

Une réservation peut recevoir une seule évaluation.
