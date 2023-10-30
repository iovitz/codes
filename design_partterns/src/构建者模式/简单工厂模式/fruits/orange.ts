import { Fruit } from './interface'

export class Orange implements Fruit {
  public name = 'Orange'

  sayHai(): void {
    console.log(`Hi, This is ${this.name}`)
  }
}
