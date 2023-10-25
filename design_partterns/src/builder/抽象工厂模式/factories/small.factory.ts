import { AbstractApple } from '../apples/interface'
import { SmallApple } from '../apples/small.apple'
import { AbstractOrange } from '../oranges/interface'
import { SmallOrange } from '../oranges/small.orange'
import { AbstractFruitFactory } from './interface'

export class SmallFruitFactory implements AbstractFruitFactory {
  public createApple(): AbstractApple {
    return new SmallApple()
  }

  public createOrange(): AbstractOrange {
    return new SmallOrange()
  }
}
