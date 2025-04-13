require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE_IN = process.env.JWT_EXPIRES_IN;

// Méthode pour générer un token
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN });
};

// Méthode pour vérifier un token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = { generateToken, verifyToken };