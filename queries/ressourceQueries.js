const { Resources, UsersFavorites } = require('../models');

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

exports.getRessourcesByUser = async (userId) => {
  return await Resources.findAll({
    where: { id_creator: userId },
    order: [['date_ressource', 'DESC']], // Trier par date décroissante
  });
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

// FAVORITES

exports.getFavoriteRessourcesUser = async (userId) => {
  const query = `
    SELECT 
      uf.id_favorite,
      uf.id_user,
      uf.id_related_item,
      uf.type_favorite,
      r.id_ressource,
      r.title_ressource,
      r.content_ressource
    FROM users_favorites uf
    JOIN resources r ON uf.id_related_item = r.id_ressource
    WHERE uf.id_user = :userId AND uf.type_favorite = 1
  `;

  const [results] = await sequelize.query(query, {
    replacements: { userId },
    type: sequelize.QueryTypes.SELECT,
  });

  return results;
};

// Ajouter une ressource aux favoris d'un utilisateur
exports.addFavoriteRessource = async (userId, ressourceId) => {
  return await UsersFavorites.create({
    id_user: userId,
    id_related_item: ressourceId,
    type_favorite: 1, 
  });
};