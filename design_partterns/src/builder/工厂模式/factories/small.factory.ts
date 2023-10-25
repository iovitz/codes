import { Apple } from '../apples/interface'
import { SmallApple } from '../apples/small.apple'
import { AppleFactory } from './interface'

export class SmallAppleFactory extends AppleFactory {
  public factoryMethod(): Apple {
    return new SmallApple()
  }
}
