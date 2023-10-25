import { Apple } from '../apples/interface'
import { AppleFactory } from './interface'
import { BigApple } from '../apples/big.apple'

export class BigAppleFactory extends AppleFactory {
  public factoryMethod(): Apple {
    return new BigApple()
  }
}
