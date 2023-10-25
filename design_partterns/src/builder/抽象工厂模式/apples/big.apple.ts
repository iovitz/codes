import { AbstractApple } from './interface'

export class BigApple implements AbstractApple {
  public getName(): string {
    return 'BigApple'
  }
}
