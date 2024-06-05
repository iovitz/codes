import $ from 'jquery'
import mousetrap from 'mousetrap'

const scopeWindow = window as any

scopeWindow.__TAMP_UTILS_ = {
  $,
  mousetrap,
}
