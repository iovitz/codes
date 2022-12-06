import {Clipboard} from '../../browser/src'

const clipboard = new Clipboard()
clipboard.initGlobalCopy()
clipboard.addCopyMiddleware((str) => {
  return '复制内222容' + str
})
