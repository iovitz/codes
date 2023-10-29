import { Apple } from './interface'

export class SmallApple implements Apple {
  public getName(): string {
    return 'SmallApple'
  }
}
