# CESIZen – Backend API

## 📋 Présentation

CESIZen est une plateforme de gestion du stress et de sensibilisation à la santé mentale. Ce dépôt contient l'**API REST backend** développée en Node.js/Express, connectée à une base PostgreSQL Azure et déployée sur Heroku avec une pipeline CI/CD complète.

---

## 📚 Table des matières

- [Architecture](#architecture)
- [Installation et développement local](#installation-et-développement-local)
- [Configuration des variables d'environnement](#configuration-des-variables-denvironnement)
- [Documentation API](#documentation-api)
- [CI/CD et automatisation](#cicd-et-automatisation)
- [Sécurité](#sécurité)
- [Tests automatisés](#tests-automatisés)
- [Monitoring et observabilité](#monitoring-et-observabilité)
- [Déploiement](#déploiement)
- [Maintenance et gestion des évolutions](#maintenance-et-gestion-des-évolutions)
- [Veille technologique](#veille-technologique)
- [Troubleshooting](#troubleshooting)

---

## 🏗️ Architecture

### Stack technique
- **Runtime** : Node.js 18+
- **Framework** : Express.js 5.x
- **Base de données** : PostgreSQL (Azure Database)
- **ORM** : Sequelize 6.x
- **Authentification** : JWT (jsonwebtoken)
- **Cryptographie** : SHA-256 + salt pour les mots de passe
- **Tests** : Jest + Supertest
- **Déploiement** : Heroku
- **CI/CD** : GitHub Actions

### Architecture des dossiers
```
├── .github/workflows/     # Workflows GitHub Actions
├── config/               # Configuration base de données
├── controllers/          # Logique métier des endpoints
├── models/              # Modèles Sequelize (entités DB)
├── queries/             # Requêtes et interactions DB
├── routes/              # Définition des routes API
├── tests/               # Tests unitaires et d'intégration
├── utils/               # Utilitaires (JWT, password, etc.)
├── app.js               # Configuration Express
├── server.js            # Point d'entrée de l'application
└── package.json         # Dépendances et scripts
```

---

## 🚀 Installation et développement local

### Prérequis
- Node.js 18+ et npm
- Accès à une base PostgreSQL (Azure ou locale)
- Git

### Installation
```bash
# Cloner le repository
git clone https://github.com/<username>/cesizen-backend.git
cd cesizen-backend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer le fichier .env avec vos configurations

# Lancer le serveur en développement
npm start
```

### Scripts disponibles
```bash
npm start          # Lancer le serveur de production
npm test           # Exécuter les tests Jest
npm run dev        # Mode développement avec auto-reload (à configurer)
```

---

## ⚙️ Configuration des variables d'environnement

### Variables requises dans `.env`
```env
# Base de données PostgreSQL
PGHOST=cesizen.postgres.database.azure.com
PGUSER=admin_cesizen
PGPORT=5432
PGDATABASE=postgres
PGPASSWORD=your_password

# Serveur
PORT=3000

# Sécurité
SHA256_SALT=your_random_salt
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=72h

# Outils externes (optionnels)
SONAR_API_KEY=your_sonar_key
HEROKU_API_KEY=your_heroku_key
```

### Configuration Heroku
Variables à définir dans les **Config Vars** Heroku :
- `PGHOST`, `PGUSER`, `PGPORT`, `PGDATABASE`, `PGPASSWORD`
- `SHA256_SALT`, `JWT_SECRET`, `JWT_EXPIRES_IN`
- `PORT` (automatiquement défini par Heroku)

---

## 📡 Documentation API

### Base URL
- **Local** : `http://localhost:3000`
- **Production** : `https://cesizenbackend-0b349b880511.herokuapp.com`

### Authentification
L'API utilise des tokens JWT. Incluez le token dans l'en-tête :
```
Authorization: Bearer <your_jwt_token>
```

### Endpoints principaux

#### 👤 Authentification & Utilisateurs
| Méthode | Endpoint | Description | Auth requise |
|---------|----------|-------------|--------------|
| POST | `/api/user` | Créer un compte utilisateur | Non |
| POST | `/api/user/login` | Connexion (retourne un JWT) | Non |
| GET | `/api/user` | Liste tous les utilisateurs | Oui |
| GET | `/api/user/:id` | Détails d'un utilisateur | Oui |
| PUT | `/api/user/:id` | Modifier un utilisateur | Oui |
| DELETE | `/api/user/:id` | Supprimer un utilisateur | Oui |

#### 📚 Ressources
| Méthode | Endpoint | Description | Auth requise |
|---------|----------|-------------|--------------|
| POST | `/api/ressource` | Créer une ressource | Oui |
| GET | `/api/ressource` | Liste toutes les ressources | Non |
| GET | `/api/ressource/:id` | Détails d'une ressource | Non |
| PUT | `/api/ressource/:id` | Modifier une ressource | Oui |
| DELETE | `/api/ressource/:id` | Supprimer une ressource | Oui |
| GET | `/api/ressource/user/:id` | Ressources d'un utilisateur | Oui |
| GET | `/api/ressource/favorites/:id` | Favoris d'un utilisateur | Oui |
| POST | `/api/ressource/favorites` | Ajouter/retirer des favoris | Oui |

#### 🧘 Exercices de respiration
| Méthode | Endpoint | Description | Auth requise |
|---------|----------|-------------|--------------|
| POST | `/api/exercise` | Créer un exercice | Oui |
| GET | `/api/exercise` | Liste tous les exercices | Non |
| GET | `/api/exercise/:id` | Détails d'un exercice | Non |
| PUT | `/api/exercise/:id` | Modifier un exercice | Oui |
| DELETE | `/api/exercise/:id` | Supprimer un exercice | Oui |
| GET | `/api/exercise/user/:id` | Exercices d'un utilisateur | Oui |
| POST | `/api/exercise/history` | Enregistrer une session | Oui |
| GET | `/api/exercise/history/:id_user` | Historique utilisateur | Oui |

#### 🔧 Utilitaires
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/hello` | Test de santé de l'API |
| GET | `/api/test` | Endpoint de test |

### Exemples de requêtes

#### Créer un utilisateur
```bash
curl -X POST https://cesizenbackend-0b349b880511.herokuapp.com/api/user \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "age": "25",
    "pseudo": "monpseudo",
    "password": "monmotdepasse"
  }'
```

#### Se connecter
```bash
curl -X POST https://cesizenbackend-0b349b880511.herokuapp.com/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "monmotdepasse"
  }'
```

---

## 🔄 CI/CD et automatisation

### Workflows GitHub Actions

#### 1. CI Pipeline (`.github/workflows/ci.yml`)
Déclenché à chaque **Pull Request** vers `main` :

```yaml
jobs:
  branch-name-check:    # Vérifie le format des noms de branches
  db-check:            # Teste la connexion à la base de données
  test:                # Exécute les tests Jest
  sonar:               # Analyse qualité du code SonarQube
```

#### 2. Auto-suppression des branches (`.github/workflows/delete-branch.yml`)
Supprime automatiquement les branches après merge des PR.

### Protection de la branche `main`
- **Pull Request obligatoire** pour tout changement
- **Review requise** avant merge
- **Checks CI obligatoires** :
  - ✅ Format du nom de branche (`feature_*` ou `fix_*`)
  - ✅ Connexion base de données
  - ✅ Tests Jest
  - ✅ Analyse SonarQube

### Déploiement automatique
- **Push sur `main`** → Déploiement automatique sur Heroku
- **Variables d'environnement** configurées dans Heroku Config Vars
- **Rollback automatique** en cas d'échec de déploiement

---

## 🔒 Sécurité

### Authentification et autorisation
- **JWT tokens** avec expiration (72h par défaut)
- **Mots de passe hashés** avec SHA-256 + salt unique
- **Validation des entrées** dans tous les contrôleurs
- **CORS configuré** pour limiter les origines autorisées

### Protection des données
- **Variables sensibles** stockées dans des secrets (jamais en dur)
- **Base de données** : connexion SSL obligatoire
- **Logs** : pas d'exposition de données sensibles
- **Headers de sécurité** configurés via CORS

### Bonnes pratiques implémentées
- **ORM Sequelize** pour prévenir les injections SQL
- **Validation des paramètres** d'entrée
- **Gestion des erreurs** sans exposition d'informations système
- **Rate limiting** (à implémenter si nécessaire)

### Conformité RGPD
- **Collecte minimale** des données personnelles
- **Droit à l'oubli** : endpoint de suppression utilisateur
- **Chiffrement** des mots de passe
- **Audit trail** des accès sensibles

---

## 🧪 Tests automatisés

### Types de tests
- **Tests unitaires** : Fonctions utilitaires (JWT, password)
- **Tests d'intégration** : Endpoints API complets
- **Tests de régression** : Validation du comportement existant

### Structure des tests
```
tests/
├── userRoutes.test.js      # Tests des endpoints utilisateurs
├── ressourceRoutes.test.js # Tests des endpoints ressources
├── exerciseRoutes.test.js  # Tests des endpoints exercices
├── userQueries.test.js     # Tests des requêtes DB utilisateurs
├── passwordUtils.test.js   # Tests des utilitaires cryptographiques
└── ...
```

### Exécution des tests
```bash
# Tous les tests
npm test

# Tests en mode verbose
npm test -- --verbose

# Tests d'un fichier spécifique
npm test userRoutes.test.js
```

### Couverture de tests
Les tests couvrent :
- ✅ Création, lecture, mise à jour, suppression (CRUD)
- ✅ Authentification et autorisation
- ✅ Validation des données
- ✅ Gestion des erreurs
- ✅ Logique métier spécifique

---

## 📊 Monitoring et observabilité

### Logs applicatifs
- **Connexion DB** : Logs de succès/échec
- **Erreurs serveur** : Logs détaillés pour debugging
- **Accès API** : Logs des requêtes importantes
- **Performance** : Temps de réponse des endpoints

### Monitoring en production (Heroku)
```bash
# Voir les logs en temps réel
heroku logs --tail --app cesizenbackend

# Logs des dernières heures
heroku logs --app cesizenbackend

# Métriques de performance
heroku ps --app cesizenbackend
```

### Santé de l'application
- **Endpoint de santé** : `GET /api/hello`
- **Test de base de données** : Vérification automatique de la connexion
- **Alertes Heroku** : Notifications en cas de crash

### Outils de monitoring externe (optionnels)
- **Sentry** : Remontée d'erreurs en temps réel
- **New Relic** : Monitoring de performance
- **Datadog** : Observabilité complète

---

## 🚀 Déploiement

### Environnements
1. **Développement** : Local avec base Azure
2. **Test** : GitHub Actions avec base Azure
3. **Production** : Heroku avec base Azure

### Processus de déploiement

#### Déploiement automatique (recommandé)
1. Créer une branche `feature_*` ou `fix_*`
2. Développer et tester en local
3. Push et création d'une Pull Request
4. Review et validation des checks CI
5. Merge vers `main` → Déploiement automatique

#### Déploiement manuel (urgence)
```bash
# Déploiement direct sur Heroku
git push heroku main

# Avec une branche spécifique
git push heroku mybranch:main
```

### Configuration Heroku
```bash
# Configurer les variables d'environnement
heroku config:set PGHOST=... --app cesizenbackend
heroku config:set PGUSER=... --app cesizenbackend

# Voir la configuration actuelle
heroku config --app cesizenbackend

# Redémarrer l'application
heroku restart --app cesizenbackend
```

---

## 🔧 Maintenance et gestion des évolutions

### Outils de ticketing
- **GitHub Issues** : Gestion des bugs et demandes d'évolution
- **GitHub Projects** : Suivi visuel avec Kanban board
- **Templates d'issues** : Structure pour les rapports de bugs

### Processus de maintenance
1. **Création d'une issue** (bug report ou feature request)
2. **Qualification** : Labels, priorité, assignation
3. **Développement** : Branche dédiée, développement, tests
4. **Pull Request** : Review, CI/CD, validation
5. **Merge et déploiement** : Mise en production
6. **Clôture** : Validation et fermeture de l'issue

### Gestion des versions
- **Semantic Versioning** : `major.minor.patch`
- **Tags Git** : Marquage des releases importantes
- **Changelog** : Documentation des modifications

---

## 📡 Veille technologique

### Sources d'information automatisées
- **GitHub Dependabot** : Alertes de sécurité sur les dépendances
- **Node Weekly** : Newsletter hebdomadaire sur Node.js
- **PostgreSQL Weekly** : Actualités base de données
- **OWASP Newsletter** : Alertes de sécurité
- **Express.js GitHub** : Notifications des releases

### Processus de veille
1. **Réception automatique** des alertes et newsletters
2. **Évaluation** de l'impact sur le projet
3. **Planification** des mises à jour lors des sprints
4. **Tests** et validation des nouvelles versions
5. **Documentation** des changements majeurs

---

## 🐛 Troubleshooting

### Problèmes courants

#### Erreur de connexion base de données
```bash
# Tester la connexion manuellement
psql "host=cesizen.postgres.database.azure.com port=5432 dbname=postgres user=admin_cesizen password='P1HJ8{m>e7pC'"

# Vérifier les variables d'environnement
heroku config --app cesizenbackend
```

#### Application qui ne démarre pas (R10 Boot timeout)
```bash
# Vérifier les logs
heroku logs --tail --app cesizenbackend

# Problèmes fréquents :
# - Port mal configuré (doit être process.env.PORT || 3000)
# - Connexion DB qui échoue
# - Dépendances manquantes
```

#### Tests qui échouent
```bash
# Exécuter les tests en local
npm test

# Vérifier la connexion DB pour les tests
# S'assurer que les variables d'environnement sont définies
```

### Commandes utiles

```bash
# Status de l'application Heroku
heroku ps --app cesizenbackend

# Redémarrer l'application
heroku restart --app cesizenbackend

# Accéder aux métriques
heroku logs --app cesizenbackend --dyno web

# Voir la configuration
heroku config --app cesizenbackend

# Exécuter une commande dans le container
heroku run bash --app cesizenbackend
```

---

## 👨‍💻 Contribution

### Workflow de développement
1. Fork du repository
2. Création d'une branche `feature_*` ou `fix_*`
3. Développement et tests en local
4. Commit avec messages explicites
5. Push et création d'une Pull Request
6. Review et merge après validation CI

### Standards de code
- **ESLint** : Respect des conventions JavaScript
- **Tests** : Couverture minimale de 80%
- **Documentation** : Commentaires pour la logique complexe
- **Commits** : Messages explicites et atomiques

---

## 📞 Support

- **Issues GitHub** : Pour les bugs et demandes d'évolution
- **Documentation** : Ce README et commentaires du code
- **Logs** : `heroku logs --app cesizenbackend`

---

## 📄 Licence

Projet à usage pédagogique – CDA CESI 2025  
Tous droits réservés.

---

## 🏆 Auteur

**Martin Dubosq**  
Concepteur Développeur d'Applications – CESI 2025  
📧 dubosq.martin.lgm@gmail.com