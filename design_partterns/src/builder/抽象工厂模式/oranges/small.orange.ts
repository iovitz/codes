import { AbstractApple } from '../apples/interface'
import { AbstractOrange } from './interface'

export class SmallOrange implements AbstractOrange {
  public getName(): string {
    return 'SmallOrange'
  }

  public sayHiToApple(apple: AbstractApple): void {
    const appleName = apple.getName()
    const myName = this.getName()
    console.log(`Hi, ${appleName}, this is ${myName}`)
  }
}
