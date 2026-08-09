const request = require('supertest');
const createApp = require('../src/app');

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

  beforeAll(() => {
    app = createApp();
    server = app.listen(3001, () => {
      console.log('Server is running on port 3000');
    });
  })

  afterAll(async () => {
    await server.close();
  })

  describe('GET /', () => {
    test('should return "Hello World!', async () => {
      const response = await request(app).get('/');
      expect(response.text).toEqual('Hello World!');
    });
  });

});
