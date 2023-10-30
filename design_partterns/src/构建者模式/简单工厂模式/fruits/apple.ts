import { Fruit } from './interface'

export class Apple implements Fruit {
  public name = 'Apple'

  sayHai(): void {
    console.log(`Hi, This is ${this.name}`)
  }
}
