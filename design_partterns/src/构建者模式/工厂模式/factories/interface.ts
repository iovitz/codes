import { Apple } from '../apples/interface'

export abstract class AppleFactory {
  public abstract factoryMethod(): Apple

  public saiHi(): string {
    const apple = this.factoryMethod()
    return `Hi, This is ${apple.getName()}`
  }
}
