import { Apple } from '../apples/interface'
import { SmallApple } from '../apples/small.apple'
import { Orange } from '../oranges/interface'
import { SmallOrange } from '../oranges/small.orange'
import { FruitFactory } from './interface'

export class SmallFruitFactory implements FruitFactory {
  public createApple(): Apple {
    return new SmallApple()
  }

  public createOrange(): Orange {
    return new SmallOrange()
  }
}
