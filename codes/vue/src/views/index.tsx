import { defineComponent } from 'vue'
import HelloWorld from './HelloWorld.vue'

export default defineComponent({
  setup() {
    return () => <HelloWorld></HelloWorld>
  },
})
