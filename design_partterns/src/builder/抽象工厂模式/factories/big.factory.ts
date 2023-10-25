import { BigApple } from '../apples/big.apple'
import { AbstractApple } from '../apples/interface'
import { BigOrange } from '../oranges/big.orange'
import { AbstractOrange } from '../oranges/interface'
import { AbstractFruitFactory } from './interface'

export class BigFruitFactory implements AbstractFruitFactory {
  public createApple(): AbstractApple {
    return new BigApple()
  }

  public createOrange(): AbstractOrange {
    return new BigOrange()
  }
}
