const { getUserByEmail } = require('../queries/userQueries');
const { Users } = require('../models');

jest.mock('../models', () => ({
  Users: {
    findOne: jest.fn(),
  },
}));

describe('getUserByEmail', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Retourne un utilisateur si l\'email existe', async () => {
    const mockUser = { id_user: 1, email_user: 'test@example.com' };
    Users.findOne.mockResolvedValue(mockUser);

    const result = await getUserByEmail('test@example.com');
    expect(Users.findOne).toHaveBeenCalledWith({ where: { email_user: 'test@example.com' } });
    expect(result).toEqual(mockUser);
  });

  test('Retourne null si l\'email n\'existe pas', async () => {
    Users.findOne.mockResolvedValue(null);

    const result = await getUserByEmail('notfound@example.com');
    expect(Users.findOne).toHaveBeenCalledWith({ where: { email_user: 'notfound@example.com' } });
    expect(result).toBeNull();
  });
  test('createUser - Crée un nouvel utilisateur', async () => {
    const mockUser = { id_user: 1, email_user: 'test@example.com' };
    Users.create.mockResolvedValue(mockUser);
  
    const result = await createUser(mockUser);
    expect(Users.create).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });
});