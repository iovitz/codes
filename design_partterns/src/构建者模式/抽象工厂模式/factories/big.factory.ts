import { BigApple } from '../apples/big.apple'
import { Apple } from '../apples/interface'
import { BigOrange } from '../oranges/big.orange'
import { Orange } from '../oranges/interface'
import { FruitFactory } from './interface'

export class BigFruitFactory implements FruitFactory {
  public createApple(): Apple {
    return new BigApple()
  }

  public createOrange(): Orange {
    return new BigOrange()
  }
}
