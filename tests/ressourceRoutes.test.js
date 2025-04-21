const request = require('supertest');
const app = require('../app');

describe('Tests des routes /api/ressource', () => {
  test('POST /api/ressource - Création d\'une ressource', async () => {
    const newRessource = {
      id_creator: 1,
      title_ressource: 'Nouvelle Ressource',
      content_ressource: 'Contenu de la ressource',
    };

    const response = await request(app).post('/api/ressource').send(newRessource);
    expect(response.status).toBe(201); // Vérifie que le statut est 201
    expect(response.body).toHaveProperty('id_ressource'); // Vérifie que la ressource a été créée
  });

  test('GET /api/ressource - Vérification de non-régression', async () => {
    const response = await request(app).get('/api/ressource');
    expect(response.status).toBe(200); // Vérifie que le statut est 200
    expect(Array.isArray(response.body)).toBe(true); // Vérifie que la réponse est un tableau
  });
  test('DELETE /api/ressource/:id - Suppression d\'une ressource', async () => {
    const response = await request(app).delete('/api/ressource/1');
    expect(response.status).toBe(200); // Vérifie que le statut est 200
    expect(response.body).toHaveProperty('message', 'Ressource supprimée avec succès.');
  });
});