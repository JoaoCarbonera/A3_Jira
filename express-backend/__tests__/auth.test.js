const { PrismaClient } = require('@prisma/client');
const { register, logIn } = require('../controllers/auth.controller');
const bcrypt = require('bcrypt');

// Mock do Prisma Client para isolar os testes do banco de dados real
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    user: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    member: {
      create: jest.fn(),
    },
    project: {
      findUnique: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

// Mock de funções auxiliares
jest.mock('bcrypt');

let client;

beforeEach(() => {
  // Limpa os mocks antes de cada teste
  client = new PrismaClient();
  jest.clearAllMocks();
});

describe('Auth Controller', () => {
  // Mock de objetos de requisição e resposta do Express
  const mockRequest = (body) => ({ body });
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    res.end = jest.fn().mockReturnValue(res);
    return res;
  };

  // Teste 1: Deve registrar um novo usuário com sucesso
  test('CT-01: deve registrar um novo usuário com sucesso', async () => {
    const req = mockRequest({ email: 'test@example.com', pwd: 'password123', username: 'tester' });
    const res = mockResponse();

    client.user.findFirst.mockResolvedValue(null); // Nenhum usuário existente
    bcrypt.hash.mockResolvedValue('hashed_password');
    const createdUser = { id: 1, email: 'test@example.com', username: 'tester' };
    client.user.create.mockResolvedValue(createdUser);

    await register(req, res);

    expect(res.status).not.toHaveBeenCalled(); // Espera-se sucesso (sem status de erro)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ email: 'test@example.com' }));
    expect(res.cookie).toHaveBeenCalledWith('jira-clone', expect.any(String), expect.any(Object));
    expect(res.end).toHaveBeenCalled();
  });

  // Teste 2: Deve retornar erro 409 se o e-mail já existir no registro
  test('CT-02: deve retornar 409 se o e-mail já existir no registro', async () => {
    const req = mockRequest({ email: 'existing@example.com', pwd: 'password123' });
    const res = mockResponse();

    client.user.findFirst.mockResolvedValue({ id: 1, email: 'existing@example.com' }); // Simula usuário existente

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'user with this email already exists' });
  });

  // Teste 3: Deve retornar erro quando ocorre exceção durante o registro (dados inválidos)
  test('CT-03: deve retornar erro quando ocorre exceção durante o registro', async () => {
    const req = mockRequest({ email: 'test@example.com' }); // Falta pwd e username
    const res = mockResponse();

    client.user.findFirst.mockResolvedValue(null);
    client.user.create.mockRejectedValue(new Error('Missing required field'));

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  // Teste 4: Deve retornar erro 401 em caso de senha incorreta
  test('CT-04: deve retornar 401 em caso de senha incorreta', async () => {
    const req = mockRequest({ email: 'user@example.com', pwd: 'wrong_password' });
    const res = mockResponse();
    const existingUser = { id: 1, email: 'user@example.com', pwd: 'hashed_password' };

    client.user.findFirst.mockResolvedValue(existingUser);
    bcrypt.compare.mockResolvedValue(false); // Senha incorreta

    await logIn(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'password is incorrect :(' });
  });

  // Teste 5: Deve retornar erro 409 se o usuário não existir no login
  test('CT-05: Deve retornar erro 409 se o usuário não existir no login', async () => {
    const req = mockRequest({ email: 'nouser@example.com', pwd: 'password123' });
    const res = mockResponse();

    client.user.findFirst.mockResolvedValue(null); // Usuário não encontrado

    await logIn(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'no account was registered with this email' });
  });
});
