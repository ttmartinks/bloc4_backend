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

// Méthode pour vérifier si le mot de passe est de format SHA-256 (mais ne garantit pas qu'il soit valide)
const isSha256 = (password) => {
    const regex = /^[a-f0-9]{64}$/;
    return regex.test(password);
};

module.exports = { hashPassword, verifyPassword, isSha256 };