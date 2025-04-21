const queries = require('../queries/ressourceQueries');

exports.createRessource = async (req, res) => {
  try {
    const { id_creator, title_ressource, content_ressource } = req.body;

    if (!id_creator || !title_ressource || !content_ressource) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    const newRessource = await queries.createRessource({ id_creator, title_ressource, content_ressource });
    return res.status(201).json(newRessource);
  } catch (error) {
    console.error('Erreur lors de la création de la ressource :', error);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};

exports.getAllRessources = async (req, res) => {
  try {
    const ressources = await queries.getAllRessources();
    return res.status(200).json(ressources);
  } catch (error) {
    console.error('Erreur lors de la récupération des ressources :', error);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};

exports.getRessourceById = async (req, res) => {
  try {
    const ressource = await queries.getRessourceById(req.params.id);
    if (!ressource) {
      return res.status(404).json({ error: 'Ressource non trouvée.' });
    }
    return res.status(200).json(ressource);
  } catch (error) {
    console.error('Erreur lors de la récupération de la ressource :', error);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};

exports.getRessourcesByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const ressources = await queries.getRessourcesByUser(userId);
    if (!ressources || ressources.length === 0) {
      return res.status(404).json({ error: 'Aucune ressource trouvée pour cet utilisateur.' });
    }
    return res.status(200).json(ressources);
  } catch (error) {
    console.error('Erreur lors de la récupération des ressources utilisateur :', error);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};

exports.updateRessource = async (req, res) => {
  try {
    const updatedRessource = await queries.updateRessource(req.params.id, req.body);
    if (!updatedRessource) {
      return res.status(404).json({ error: 'Ressource non trouvée.' });
    }
    return res.status(200).json(updatedRessource);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la ressource :', error);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};

exports.deleteRessource = async (req, res) => {
  try {
    const deletedRessource = await queries.deleteRessource(req.params.id);
    if (!deletedRessource) {
      return res.status(404).json({ error: 'Ressource non trouvée.' });
    }
    return res.status(200).json({ message: 'Ressource supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la ressource :', error);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};