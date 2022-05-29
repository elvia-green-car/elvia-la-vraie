<template>
  <div :class="store.isMenuOpen ? '':'opacity-0 pointer-events-none'"
       class="w-full h-full font-title font-bold text-40 xl:text-60 p-5 z-30 transition-opacity duration-200">
    <div class="flex flex-col justify-center items-center w-full h-full btn-bg border border-white rounded-xl">
      <a href="#home">Home</a>
      <a href="#configure">Configurer</a>
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