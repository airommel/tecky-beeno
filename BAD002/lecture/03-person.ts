export class Person {
  constructor(public name: string, public age: number) {}
  drink() {
    console.log(this.name, 'is drinking')
  }
}
