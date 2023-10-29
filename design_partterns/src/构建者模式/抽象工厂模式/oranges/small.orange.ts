import { Apple } from '../apples/interface'
import { Orange } from './interface'

export class SmallOrange implements Orange {
  public getName(): string {
    return 'SmallOrange'
  }

  public sayHiToApple(apple: Apple): void {
    const appleName = apple.getName()
    const myName = this.getName()
    console.log(`Hi, ${appleName}, this is ${myName}`)
  }
}
