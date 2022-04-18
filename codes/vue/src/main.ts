import { createApp } from 'vue'
import App from './App'
import router from './config/router'
import { createPinia } from 'pinia'
import antDesignVue from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(antDesignVue)
app.mount('#ZEARTH')
