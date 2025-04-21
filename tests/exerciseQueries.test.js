const { getAllHistoriesForUser } = require('../queries/exerciseQueries');
const { HistoricExercises } = require('../models');

jest.mock('../models', () => ({
  HistoricExercises: {
    findAll: jest.fn(),
  },
}));

describe('getAllHistoriesForUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Retourne l\'historique des exercices pour un utilisateur', async () => {
    const mockHistories = [{ id_history: 1, id_user: 1, seconds_exercise: 300 }];
    HistoricExercises.findAll.mockResolvedValue(mockHistories);

    const result = await getAllHistoriesForUser(1);
    expect(HistoricExercises.findAll).toHaveBeenCalledWith({
      where: { id_user: 1 },
      order: [['date_historic', 'DESC']],
    });
    expect(result).toEqual(mockHistories);
  });
  test('deleteExercise - Supprime un exercice', async () => {
    Exercises.destroy.mockResolvedValue(1); // Simule la suppression réussie
  
    const result = await deleteExercise(1);
    expect(Exercises.destroy).toHaveBeenCalledWith({ where: { id_exercise: 1 } });
    expect(result).toBe(true);
  });
});