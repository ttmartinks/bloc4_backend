const { hashPassword, verifyPassword, isSha256 } = require('../utils/password');

describe('Utils - Password', () => {
  const mockPassword = 'password123';
  const mockHashedPassword = hashPassword(mockPassword);

  test('hashPassword - Génère un hash SHA-256 valide', () => {
    expect(mockHashedPassword).toHaveLength(64); // SHA-256 produit un hash de 64 caractères
    expect(isSha256(mockHashedPassword)).toBe(true);
  });

  test('verifyPassword - Vérifie un mot de passe valide', () => {
    const isValid = verifyPassword(mockHashedPassword, hashPassword(mockPassword));
    expect(isValid).toBe(true);
  });

  test('isSha256 - Vérifie si une chaîne est un hash SHA-256', () => {
    expect(isSha256(mockHashedPassword)).toBe(true);
    expect(isSha256('notahash')).toBe(false);
  });
  test('hashPassword - Vérification de non-régression', () => {
    const password = 'password123';
    const hashedPassword = hashPassword(password);
    expect(hashedPassword).toHaveLength(64); // SHA-256 produit un hash de 64 caractères
  });
});