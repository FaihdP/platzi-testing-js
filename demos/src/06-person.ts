export enum IMC {
  Down = 'down',
  Normal = 'normal',
  Overweight = 'overweight',
  OverweightLevel1 = 'overweight level 1',
  OverweightLevel2 = 'overweight level 2',
  OverweightLevel3 = 'overweight level 3',
  NotFound = 'not found'
}

export default class Person {
  name: string;
  weight: number;
  height: number;

  constructor(name: string, weight: number, height: number) {
    this.name = name;
    this.weight = weight;
    this.height = height;
  }

  calcIMC() {
    if (this.weight < 0 || this.height < 0) return IMC.NotFound;

    const result = Math.round(this.weight / (this.height * this.height));
    if (result < 0) {
      return IMC.NotFound;
    } if (result >= 0 && result < 18) {
      return IMC.Down;
    } if (result >= 18 && result <= 24) {
      return IMC.Normal;
    } if (result >= 25 && result <= 26) {
      return IMC.Overweight;
    } if (result >= 27 && result <= 29) {
      return IMC.OverweightLevel1;
    } if (result >= 30 && result <= 39) {
      return IMC.OverweightLevel2;
    } if (result >= 40) {
      return IMC.OverweightLevel3;
    }
    return IMC.NotFound;
  }
}
