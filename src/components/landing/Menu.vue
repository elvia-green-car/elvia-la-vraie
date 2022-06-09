<template>
  <div :class="store.isMenuOpen ? '':'opacity-0 pointer-events-none'"
       class="fixed top-0 left-0 w-screen h-screen font-title font-bold text-40 xl:text-60 p-5 z-20 transition-opacity duration-200">
    <div class="flex flex-col justify-center items-center w-full h-full btn-bg border border-white rounded-xl">
      <router-link to="/" @click.native="store.isMenuOpen = false">Home</router-link>
      <router-link to="/configurator" @click.native="store.isMenuOpen = false">Configurer</router-link>
      <router-link @click.native.prevent="" to="/plants">Plantes</router-link>
      <router-link @click.native.prevent="" to="/tools">Outils</router-link>
      <router-link @click.native.prevent="" to="/services">Services</router-link>
    </div>
  </div>
</template>

<script>
import {useStore} from "../../js/stores/global";

export default {
  name: "Menu",
  setup() {
    const store = useStore()

    store.$subscribe((mutation, state) => {
      if (mutation.events.key === "isMenuOpen") {
        document.body.style.overflow = mutation.events.newValue ? 'hidden' : 'auto';
      }
    })

    return {
      store
    }
  }
}
</script>

<style scoped>

</style>