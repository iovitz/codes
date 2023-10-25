import { AbstractApple } from '../apples/interface'
import { AbstractOrange } from '../oranges/interface'

export interface AbstractFruitFactory {
  createApple(): AbstractApple
  createOrange(): AbstractOrange
}
