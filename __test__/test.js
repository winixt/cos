class Hero {
  constructor(s) {
    this.str = s;
  }
  outputStr(s) {
    return this.str + s;
  }
}

const hero = new Hero('I am ');

console.log(hero.outputStr('hello'));