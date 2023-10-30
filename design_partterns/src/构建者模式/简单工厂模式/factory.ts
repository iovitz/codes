import { Apple } from './fruits/apple'
import { Orange } from './fruits/orange'

export class FruitFactory {
  static FruitMap = {
    Apple: Apple,
    Orange: Orange,
  }

  static getFruit(name: keyof typeof this.FruitMap) {
    const Constructor = this.FruitMap[name]
    return new Constructor()
  }
}
