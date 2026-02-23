import { createApp } from 'vue'
import App from './App.vue'
import revealOnScroll from './directives/revealOnScroll'
import './assets/fonts.css'

const app = createApp(App)

app.directive('reveal-on-scroll', revealOnScroll)

app.mount('#app')
