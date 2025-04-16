const { Resources } = require('../models');

// Créer une ressource
exports.createRessource = async (data) => {
  return await Resources.create(data);
};

// Récupérer toutes les ressources
exports.getAllRessources = async () => {
  return await Resources.findAll({ order: [['date_ressource', 'DESC']] });
};

// Récupérer une ressource par ID
exports.getRessourceById = async (id) => {
  return await Resources.findByPk(id);
};

// Mettre à jour une ressource
exports.updateRessource = async (id, data) => {
  const ressource = await Resources.findByPk(id);
  if (!ressource) return null;
  await ressource.update(data);
  return ressource;
};

// Supprimer une ressource
exports.deleteRessource = async (id) => {
  const ressource = await Resources.findByPk(id);
  if (!ressource) return null;
  await ressource.destroy();
  return ressource;
};