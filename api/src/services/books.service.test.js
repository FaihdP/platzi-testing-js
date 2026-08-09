const BookServices = require('./books.service');
const MongoLib = require('../lib/mongo.lib');
const { generateManyBooks } = require('../fakes/book.fake');

jest.mock('../lib/mongo.lib', () => {
  const mockGetAll = jest.fn();
  const mockCreate = jest.fn();

  return jest.fn().mockImplementation(() => ({
    getAll: mockGetAll,
    create: mockCreate,
  }));
});

describe('Test for Book Services', () => {
  let service;
  beforeEach(() => {
    service = new BookServices();
    jest.clearAllMocks();
    MongoLib.mockClear();
    mongoLibInstance = new MongoLib();
  });

  describe('Test for getBooks', () => {
    test('should return a list of books', async () => {
      const fakeBooks = generateManyBooks(5);
      mongoLibInstance.getAll.mockResolvedValue(fakeBooks);
      console.log(fakeBooks);
      // AAA - Act
      const books = await service.getBooks({});
      // AAA - Assert
      expect(books.length).toBeGreaterThan(0);
      expect(mongoLibInstance.getAll).toHaveBeenCalled();
      expect(mongoLibInstance.getAll).toHaveBeenCalledWith('books', {});
    });

    test('should return the correct book name', async () => {
      const fakeBooks = generateManyBooks(5);
      mongoLibInstance.getAll.mockResolvedValue(fakeBooks);

      // AAA - Act
      const books = await service.getBooks();
      // AAA - Assert
      expect(books[0].name).toBe(fakeBooks[0].name);
    });
  });
});
