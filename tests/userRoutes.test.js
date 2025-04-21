const request = require('supertest');
const app = require('../app');

describe('Tests des routes /api/user', () => {
  test('POST /api/user/login - Connexion d\'un utilisateur', async () => {
    const loginData = {
        email: 'yegz@test.com',
        password: '123456',
    };

    const response = await request(app).post('/api/user/login').send(loginData);
    expect(response.status).toBe(200); // Vérifie que le statut est 200
    expect(response.body).toHaveProperty('token'); // Vérifie que la réponse contient un token
  });

  test('POST /api/user - Création d\'un utilisateur', async () => {
    const newUser = {
      email: 'newuser2@example.com',
      age: "25",
      pseudo: 'newuser2',
      password: 'password123',
    };
  
    const response = await request(app).post('/api/user').send(newUser);
    expect(response.status).toBe(201); // Vérifie que le statut est 201
    expect(response.body).toHaveProperty('id_user'); // Vérifie que l'utilisateur a été créé
  });

  test('POST /api/user/login - Vérification de non-régression', async () => {
    const loginData = {
      email: 'newuser2@example.com',
      password: 'password123',
    };
  
    const response = await request(app).post('/api/user/login').send(loginData);
    expect(response.status).toBe(200); // Vérifie que le statut est 200
    expect(response.body).toHaveProperty('token'); // Vérifie que la réponse contient un token
  });
  test('PUT /api/user/:id - Mise à jour d\'un utilisateur', async () => {
    const updatedUser = { pseudo: 'updatedUser' };
  
    const response = await request(app).put('/api/user/6').send(updatedUser);
    expect(response.status).toBe(200); // Vérifie que le statut est 200
    expect(response.body).toHaveProperty('pseudo_user', 'updatedUser'); // Vérifie que le pseudo est mis à jour
  });
});