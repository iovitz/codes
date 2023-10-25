import { BigAppleFactory } from './factories/big.factory'
import { AppleFactory } from './factories/interface'
import { SmallAppleFactory } from './factories/small.factory'

function clientCode(factory: AppleFactory) {
  console.log(factory.saiHi())
}

clientCode(new BigAppleFactory())

clientCode(new SmallAppleFactory())
