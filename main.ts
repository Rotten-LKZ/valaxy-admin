import '../apis'
import 'md-editor-v3/lib/style.css'
import 'element-plus/es/components/message/style/css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component)

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(createPinia())
app.use(router)

app.mount('#app')
