import Person, { IMC } from "./06-person";

describe('Person class', () => {
  let person: Person;
  beforeEach(() => {
    person = new Person('Faihd', 79, 1.65);
  });

  test('should calculate IMC correctly', () => {
    const imc = person.calcIMC();
    expect(imc).toBe(IMC.OverweightLevel1);
  });

  test('should return NotFound for negative weight', () => {
    person.weight = -79;
    const imc = person.calcIMC();
    expect(imc).toBe(IMC.NotFound);
  });

  test('should return NotFound for negative height', () => {
    person.height = -1.65;
    const imc = person.calcIMC();
    expect(imc).toBe(IMC.NotFound);
  });

  test('should return Down for weight below 18', () => {
    person.weight = 50;
    const imc = person.calcIMC();
    expect(imc).toBe(IMC.Down);
  });

  test('should return Normal for weight between 18 and 24', () => {
    person.weight = 60;
    const imc = person.calcIMC();
    expect(imc).toBe(IMC.Normal);
  });

  test('should return Overweight for weight between 25 and 26', () => {
    person.weight = 70;
    const imc = person.calcIMC();
    expect(imc).toBe(IMC.Overweight);
  });

  test('should return OverweightLevel1 for weight between 27 and 29', () => {
    person.weight = 80;
    const imc = person.calcIMC();
    expect(imc).toBe(IMC.OverweightLevel1);
  });
})

