const request = require('supertest');
const createApp = require('../src/app');
const MongoLib = require('../src/lib/mongo.lib');
const { generateManyBooks } = require('../src/fakes/book.fake');


jest.mock('../src/lib/mongo.lib', () => {
  const mockGetAll = jest.fn();
  const mockCreate = jest.fn();

  return jest.fn().mockImplementation(() => ({
    getAll: mockGetAll,
    create: mockCreate,
  }));
});

describe('Test for API', () => {
  let app;
  let server;
  let mongoLibInstance;

  beforeAll(() => {
    jest.clearAllMocks();
    MongoLib.mockClear();
    mongoLibInstance = new MongoLib();

    app = createApp();
    server = app.listen(3001, () => {
      console.log('Server is running on port 3000');
    });
  })

  afterAll(async () => {
    await server.close();
  })

  describe('GET /api/v1/books', () => {
    test('should return a list of books', async () => {
      const fakeBooks = generateManyBooks(3);
      mongoLibInstance.getAll.mockResolvedValue(fakeBooks);

      const response = await request(app).get('/api/v1/books');
      console.log('response', response.body);
      expect(response.status).toBe(200);
    });
  });

});
