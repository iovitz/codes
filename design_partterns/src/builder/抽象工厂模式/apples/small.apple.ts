import { AbstractApple } from './interface'

export class SmallApple implements AbstractApple {
  public getName(): string {
    return 'SmallApple'
  }
}
