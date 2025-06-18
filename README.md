
# CESIZen – Backend

## Présentation

CESIZen est une plateforme de gestion du stress et de sensibilisation à la santé mentale. Ce dépôt concerne le **backend** de l’application, développé en Node.js/Express, connecté à une base PostgreSQL Azure, et déployé sur Heroku.

---

## Table des matières

- [Architecture et plan de déploiement](#architecture-et-plan-de-déploiement)
- [Environnements](#environnements)
- [CI/CD et automatisation](#cicd-et-automatisation)
- [Versioning et gestion des évolutions](#versioning-et-gestion-des-évolutions)
- [Maintenance et ticketing](#maintenance-et-ticketing)
- [Plan de sécurisation](#plan-de-sécurisation)
- [Bonnes pratiques de développement](#bonnes-pratiques-de-développement)
- [Veille technologique](#veille-technologique)
- [Auteur](#auteur)
- [Licence](#licence)

---

## Architecture et plan de déploiement

### Schéma général

- **Frontend** : React Native (hors de ce dépôt)
- **Backend** : Node.js/Express (ce dépôt)
- **Base de données** : PostgreSQL (Azure)
- **Hébergement** : Heroku

### Étapes de déploiement

1. **Développement local**  
   - Utilisation d’un fichier `.env` pour la configuration.
   - Lancement du serveur avec `npm start`.
2. **Versioning**  
   - Utilisation de Git et GitHub.
   - Branches : `main` (prod), `feature_xxx`, `fix_xxx`.
3. **CI/CD**  
   - Automatisation via GitHub Actions (voir section dédiée).
4. **Déploiement**  
   - Déploiement automatique sur Heroku à chaque merge sur `main`.
   - Variables d’environnement configurées dans Heroku (pas de `.env` en prod).

---

## Environnements

- **Développement** : Local, avec base Azure ou base locale.
- **Test** : CI GitHub Actions, connexion à la base Azure.
- **Production** : Heroku, connexion à la base Azure.

---

## CI/CD et automatisation

### Outils

- **GitHub Actions** pour l’intégration et le déploiement continus.
- **Heroku** pour l’hébergement.
- **SonarQube** pour l’analyse de la qualité du code.

### Workflows

- **CI** (Continuous Integration) :
  - Vérification du nom de branche (`feature_` ou `fix_`)
  - Vérification de la connexion à la BDD
  - Lancement des tests Jest
  - Analyse SonarQube
- **CD** (Continuous Deployment) :
  - Déploiement automatique sur Heroku à chaque push sur `main`

### Protection de la branche `main`

- **Merge uniquement via PR** (pas de push direct)
- **Checks obligatoires** : nom de branche, tests, SonarQube
- **Validation humaine requise** (review)

---

## Versioning et gestion des évolutions

- **Branches** :
  - `main` : branche de production, protégée
  - `feature_xxx` / `fix_xxx` : branches de développement
- **Pull Requests** :
  - Obligatoires pour toute modification sur `main`
  - Validation par un reviewer et passage des checks CI
- **Suppression automatique des branches mergées** : activée
- **Gestion des évolutions et corrections** :
  - Utilisation de GitHub Issues pour le ticketing (bugs, évolutions)
  - Méthodologie : création d’une issue, branche dédiée, PR, review, merge

---

## Maintenance et ticketing

- **Outil de ticketing** : GitHub Issues
- **Processus** :
  1. Création d’une issue (bug ou évolution)
  2. Attribution et planification
  3. Développement sur branche dédiée
  4. PR, review, merge
  5. Clôture de l’issue

---

## Plan de sécurisation

### Vulnérabilités et risques identifiés

- Fuite de secrets (évité par l’utilisation de secrets GitHub/Heroku)
- Injection SQL (ORM Sequelize)
- Authentification JWT sécurisée
- Données sensibles chiffrées (ex : SHA256 pour les mots de passe)
- RGPD : gestion des données personnelles, suppression sur demande

### Actions correctives et préventives

- Variables sensibles jamais versionnées (pas de `.env` dans le repo)
- Accès à la BDD limité par IP et credentials forts
- Utilisation de HTTPS sur Heroku
- Analyse SonarQube à chaque PR
- Logs d’erreur sans fuite d’informations sensibles

### Gestion de crise

- Procédure de rotation des secrets en cas de fuite
- Communication rapide via GitHub Issues et mails
- Documentation des incidents et correctifs

### RGPD et données personnelles

- Collecte minimale des données
- Droit à l’oubli : suppression sur demande
- Stockage sécurisé des mots de passe (hash + salt)
- Journalisation des accès sensibles

---

## Bonnes pratiques de développement

- Respect des conventions de nommage (branches, variables)
- Revue de code systématique
- Tests automatisés (Jest)
- Utilisation de l’ORM pour éviter les injections
- Séparation des responsabilités (routes, contrôleurs, modèles)
- Documentation du code et des endpoints

---

## Veille technologique

- **Abonnement à des newsletters spécialisées** (Node Weekly, OWASP, PostgreSQL Weekly) pour recevoir chaque semaine les nouveautés et alertes de sécurité.
- **Alertes de sécurité automatiques** via GitHub Dependabot : notifications immédiates en cas de vulnérabilité sur les dépendances du projet.
- **Suivi des mises à jour critiques** grâce aux notifications des repositories GitHub des principaux outils utilisés (Node.js, Express, Sequelize).
- **Participation à des groupes et forums** (Discord, Slack, Stack Overflow) avec notifications activées pour les sujets pertinents.
- **Flux RSS** pour recevoir en temps réel les articles et annonces des éditeurs de technologies utilisées.
---

## Auteur

Martin Dubosq – CDA CESI 2025

---

## Licence

Projet à usage pédagogique – Tous droits réservés.
