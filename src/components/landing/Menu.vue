<template>
  <div :class="store.isMenuOpen ? '':'opacity-0 pointer-events-none'"
       class="fixed top-0 left-0 w-screen h-screen font-title font-bold text-40 xl:text-60 p-5 z-20 transition-opacity duration-200">
    <div class="flex flex-col justify-center items-center w-full h-full btn-bg border border-white rounded-xl">
      <router-link to="/">Home</router-link>
      <router-link to="/configurator">Configurer</router-link>
      <a href="#plants">Plantes</a>
      <a href="#tools">Outils</a>
      <a href="#services">Services</a>
    </div>
  </div>
</template>

<script>
import {useStore} from "../../js/stores/global";

export default {
  name: "Menu",
  setup() {
    const store = useStore()

    return {
      store
    }
  }
}
</script>

<style scoped>

</style>