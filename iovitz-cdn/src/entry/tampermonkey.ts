import $ from 'jquery'
import mousetrap from 'mousetrap'

const scopeWindow = window as any

scopeWindow.__TAMPERMONKEY_UTILS__ = {
  $,
  mousetrap,
}
