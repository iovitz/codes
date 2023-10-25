import { AbstractApple } from '../apples/interface'

export interface AbstractOrange {
  getName(): string
  sayHiToApple(collaborator: AbstractApple): void
}
