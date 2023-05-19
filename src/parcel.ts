import {effect, ref} from './source_code/vue3'
const selfWindow: any = window
selfWindow.xobj = ref('niua')

effect(() => {
  document.querySelector('#box1')!.innerHTML = selfWindow.xobj.value
})
effect(() => {
  document.querySelector('#box2')!.innerHTML = selfWindow.xobj.value + '哈哈哈'
})

setTimeout(() => {
  selfWindow.xobj.value = '张三李四'
}, 1000)
