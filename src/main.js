import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'

import App from './App.vue'
import Home from './components/Home.vue'
import Configurator from './components/Configurator.vue'

import './css/style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', name: 'Home', component: Home},
    {path: '/configurator', name: 'Configurator', component: Configurator},
    //{path: '/user/login', name: 'Création de compte'}
  ]
})

createApp(App).use(router).mount('#app')

//import {App} from "./js/App";

//const canvas = document.getElementById('app-canvas')
//const app = new App(canvas)
//app.init()
//app.run()
