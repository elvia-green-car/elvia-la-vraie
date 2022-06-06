import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import {createPinia} from 'pinia'

import App from './App.vue'
import Home from './components/Home.vue'
import Configurator from './components/Configurator.vue'

import './css/style.css'
import {useStore} from "./js/stores/global";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', name: 'Home', component: Home},
    {path: '/configurator', name: 'Configurator', component: Configurator},
    //{path: '/user/login', name: 'Création de compte'}
  ]
})

export const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')

//router.beforeEach((to) => {
//  const store = useStore(pinia)
//
//})
