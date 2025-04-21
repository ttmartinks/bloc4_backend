const { addFavoriteRessource } = require('../queries/ressourceQueries');
const { UsersFavorites } = require('../models');

jest.mock('../models', () => ({
  UsersFavorites: {
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
  },
}));

describe('addFavoriteRessource', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Ajoute une ressource aux favoris si elle n\'existe pas déjà', async () => {
    UsersFavorites.findOne.mockResolvedValue(null);
    UsersFavorites.create.mockResolvedValue({ id_user: 1, id_related_item: 42, type_favorite: 1 });

    const result = await addFavoriteRessource(1, 42);

    expect(UsersFavorites.findOne).toHaveBeenCalledWith({
      where: { id_user: 1, id_related_item: 42, type_favorite: 1 },
    });
    expect(UsersFavorites.create).toHaveBeenCalledWith({
      id_user: 1,
      id_related_item: 42,
      type_favorite: 1,
    });
    expect(result).toEqual({ message: 'Ressource ajoutée aux favoris.', favorite: { id_user: 1, id_related_item: 42, type_favorite: 1 } });
  });

  test('Supprime une ressource des favoris si elle existe déjà', async () => {
    const existingFavorite = { destroy: jest.fn() };
    UsersFavorites.findOne.mockResolvedValue(existingFavorite);

    const result = await addFavoriteRessource(1, 42);

    expect(UsersFavorites.findOne).toHaveBeenCalledWith({
      where: { id_user: 1, id_related_item: 42, type_favorite: 1 },
    });
    expect(existingFavorite.destroy).toHaveBeenCalled();
    expect(result).toEqual({ message: 'Ressource retirée des favoris.' });
  });

  test('getRessourceById - Retourne une ressource par ID', async () => {
    const mockRessource = { id_ressource: 2, title_ressource: 'Test Ressource' };
    Resources.findByPk.mockResolvedValue(mockRessource);
  
    const result = await getRessourceById(2);
    expect(Resources.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockRessource);
  });
  test('createRessource - Crée une nouvelle ressource', async () => {
    const mockRessource = { id_ressource: 1, title_ressource: 'Test Ressource' };
    Resources.create.mockResolvedValue(mockRessource);
  
    const result = await createRessource(mockRessource);
    expect(Resources.create).toHaveBeenCalledWith(mockRessource);
    expect(result).toEqual(mockRessource);
  });
});