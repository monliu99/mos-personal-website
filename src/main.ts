import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import revealOnScroll from './directives/revealOnScroll'
import './assets/fonts.css'

const app = createApp(App)

app.use(router)
app.directive('reveal-on-scroll', revealOnScroll)

app.mount('#app')
