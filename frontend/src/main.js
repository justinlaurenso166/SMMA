import { createApp } from 'vue'
import App from './App.vue'
import Router from "./routers/index";
import "../src/assets/css/index.css"
import store from "./store"

createApp(App).use(Router).use(store).mount('#app')