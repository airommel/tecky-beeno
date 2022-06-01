// export class Animal {
//   name: string
//   constructor(name: string) {
//     this.name = name
//   }
// }

export class Animal {
  constructor(
    public name: string,
    // private age: number,
    protected gender: string,
  ) {}
  greet() {
    // console.log(this.name)
  }
}
