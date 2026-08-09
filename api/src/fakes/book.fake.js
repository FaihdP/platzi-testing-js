const { faker } = require('@faker-js/faker');

const generateOneBook = () => ({
  _id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
});

const generateManyBooks = (number = 10) => {
  return Array.from({ length: number }, generateOneBook);
};

module.exports = { generateOneBook, generateManyBooks };
