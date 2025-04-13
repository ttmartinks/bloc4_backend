require('dotenv').config();
const crypto = require('crypto');

const SALT = process.env.SHA256_SALT;

// Méthode pour hasher le mot de passe avec SHA-256 et un sel fixe
const hashPassword = (password) => {
  if (!SALT) {
    throw new Error('SHA256_SALT is not defined in the environment variables');
  }
  return crypto.createHash('sha256').update(password + SALT).digest('hex');
};


// Méthode pour vérifier un mot de passe hashé avec le mot de passe hashé en bdd
const verifyPassword = (hashedPasswordInput, hashedPasswordStored) => {
    return hashedPasswordInput === hashedPasswordStored;
  };

module.exports = { hashPassword, verifyPassword };