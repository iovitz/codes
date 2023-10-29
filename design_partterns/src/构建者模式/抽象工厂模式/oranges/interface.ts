import { Apple } from '../apples/interface'

export interface Orange {
  getName(): string
  sayHiToApple(collaborator: Apple): void
}
