import { AbstractApple } from '../apples/interface'
import { AbstractOrange } from './interface'

export class BigOrange implements AbstractOrange {
  public getName(): string {
    return 'BigOrange'
  }

  public sayHiToApple(apple: AbstractApple): void {
    const appleName = apple.getName()
    const myName = this.getName()
    console.log(`Hi, ${appleName}, this is ${myName}`)
  }
}
