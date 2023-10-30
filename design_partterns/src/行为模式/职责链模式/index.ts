import { LowerCaseHandler } from './handler/lowercase.handler'
import { TrimHandler } from './handler/trim.handler'

const lowerCase = new LowerCaseHandler()
const trim = new TrimHandler()

lowerCase.setNext(trim)

console.log(lowerCase.handle('  HELLO WORLD  '))
