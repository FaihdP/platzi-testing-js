const request = require('supertest');
const createApp = require('../src/app');
const { config } = require('../src/config');

const { MongoClient } = require('mongodb');

describe('Test for API', () => {
  let app;
  let server;
  let database;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(3001);
    const client = new MongoClient(config.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    database = client.db(config.dbName);
  })

  afterAll(async () => {
    await server.close();
    await database.dropDatabase();
  })

  describe('GET /api/v1/books', () => {
    test('should return a list of books', async () => {
      const seedBooks = [
        { name: 'Book 1', author: 'Author 1' },
        { name: 'Book 2', author: 'Author 2' },
      ];

      const result = await database.collection('books').insertMany(seedBooks);

      const response = await request(app).get('/api/v1/books');
      console.log('response', response.body);
      expect(response.body.length).toEqual(result.insertedCount);
    });
  });

});
