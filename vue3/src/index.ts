import { effect, reactive } from './reactivity'
import { computed } from './reactivity/computed'

export * from './reactivity'
const obj = reactive({
  name: 'zhangsan',
})

const computedObj = computed(() => {
  return '姓名：' + obj.name
})

effect(() => {
  document.querySelector('#app')!.innerHTML = computedObj.value as string
})

setTimeout(() => {
  obj.name = 'lisi'
}, 2000)
