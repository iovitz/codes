import { Apple } from '../apples/interface'
import { Orange } from './interface'

export class BigOrange implements Orange {
  public getName(): string {
    return 'BigOrange'
  }

  public sayHiToApple(apple: Apple): void {
    const appleName = apple.getName()
    const myName = this.getName()
    console.log(`Hi, ${appleName}, this is ${myName}`)
  }
}
