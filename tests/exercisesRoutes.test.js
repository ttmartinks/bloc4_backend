const request = require('supertest');
const app = require('../app'); // Importer l'application Express

describe('Tests des routes /api/exercise', () => {
  test('GET /api/exercise - Récupérer tous les exercices', async () => {
    const response = await request(app).get('/api/exercise');
    expect(response.status).toBe(200); // Vérifie que le statut est 200
    expect(Array.isArray(response.body)).toBe(true); // Vérifie que la réponse est un tableau
  });

  test('POST /api/exercise - Créer un exercice', async () => {
    const newExercise = {
      title_exercise: 'Exercice de test',
      type_exercise: 1,
      id_creator: 1,
      seconds_inspiration: 5,
      seconds_apnea: 5,
      seconds_expiration: 5,
      number_repetitions: 10,
    };

    const response = await request(app).post('/api/exercise').send(newExercise);
    expect(response.status).toBe(201); // Vérifie que le statut est 201
    expect(response.body).toHaveProperty('exercise'); // Vérifie que la réponse contient un exercice
    expect(response.body.exercise.title_exercise).toBe('Exercice de test'); // Vérifie le titre
  });

  test('GET /api/exercise/:id - Récupérer un exercice par ID', async () => {
    const response = await request(app).get('/api/exercise/2'); // Remplace "1" par un ID valide
    expect(response.status).toBe(200); // Vérifie que le statut est 200
    expect(response.body).toHaveProperty('title_exercise'); // Vérifie que la réponse contient un titre
  });

  test('GET /api/exercise/history/:id_user - Récupérer l\'historique des exercices d\'un utilisateur', async () => {
    const response = await request(app).get('/api/exercise/history/7'); // Remplace "1" par un ID utilisateur valide
    expect(response.status).toBe(200); // Vérifie que le statut est 200
    expect(Array.isArray(response.body)).toBe(true); // Vérifie que la réponse est un tableau
  });
  test('GET /api/exercise - Vérification de non-régression', async () => {
    const response = await request(app).get('/api/exercise');
    expect(response.status).toBe(200); // Vérifie que le statut est 200
    expect(Array.isArray(response.body)).toBe(true); // Vérifie que la réponse est un tableau
  });
  test('POST /api/exercise - Création d\'un exercice', async () => {
    const newExercise = {
      title_exercise: 'Exercice de test',
      type_exercise: 1,
      id_creator: 1,
      seconds_inspiration: 5,
      seconds_apnea: 5,
      seconds_expiration: 5,
      number_repetitions: 10,
    };
  
    const response = await request(app).post('/api/exercise').send(newExercise);
    expect(response.status).toBe(201); // Vérifie que le statut est 201
    expect(response.body).toHaveProperty('exercise'); // Vérifie que l'exercice a été créé
  });
  test('GET /api/exercise - Vérification de non-régression', async () => {
    const response = await request(app).get('/api/exercise');
    expect(response.status).toBe(200); // Vérifie que le statut est 200
    expect(Array.isArray(response.body)).toBe(true); // Vérifie que la réponse est un tableau
  });
  test('PUT /api/exercise/:id - Mise à jour d\'un exercice', async () => {
    const updatedExercise = { title_exercise: 'Updated Exercise' };
  
    const response = await request(app).put('/api/exercise/1').send(updatedExercise);
    expect(response.status).toBe(200); // Vérifie que le statut est 200
    expect(response.body).toHaveProperty('exercise.title_exercise', 'Updated Exercise'); // Vérifie que le titre est mis à jour
  });
});