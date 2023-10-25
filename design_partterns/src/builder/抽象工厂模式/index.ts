import { AbstractFruitFactory } from './factories/interface'
import { BigFruitFactory } from './factories/big.factory'
import { SmallFruitFactory } from './factories/small.factory'

export function clientCode(factory: AbstractFruitFactory) {
  const apple = factory.createApple()
  const orange = factory.createOrange()
  orange.sayHiToApple(apple)
}

clientCode(new BigFruitFactory())

clientCode(new SmallFruitFactory())
