import { Apple } from '../apples/interface'
import { Orange } from '../oranges/interface'

export interface FruitFactory {
  createApple(): Apple
  createOrange(): Orange
}
