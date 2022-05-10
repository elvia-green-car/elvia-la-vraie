import { createApp } from 'vue'
import App from './App.vue'
import './css/style.css'

createApp(App).mount('#app')

import {AppWebGL} from "./js/AppWebGL";

const canvas = document.getElementById('app-canvas')
const app = new AppWebGL(canvas)
app.init()
app.run()
