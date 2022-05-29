<template>
  <div :class="content.bgColor, store.isLoading ? '':'opacity-0'"
       class="pointer-events-none absolute left-0 top-0 flex flex-col justify-center items-center w-full h-full z-50 transition-opacity duration-1000">
    <h1 class="font-title font-bold text-40 xl:text-80">{{ content.title }}</h1>
    <span class="text-16 xl:text-20 mb-10">{{ content.subtitle }}</span>
    <div class="w-1/2">
      <span class="relative block w-full h-[2px] bg-white">
        <span class="absolute left-0 top-1/2 -translate-y-1/2 h-[5px] bg-white transition-all ease-in-out"
              :style="{'width': store.load + '%'}"/>
      </span>
      <div class="flex justify-between items-center mt-5">
        <span class="w-1/2">{{ store.load + '%' }}</span>
        <span class="w-1/2 text-right">{{ content.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "../js/stores/global";

export default {
  name: "Loader",
  setup() {
    const store = useStore()

    return {
      store,
    }
  },
  data() {
    return {
      bgColor: String,
    }
  },
  computed: {
    content() {
      switch (this.$router.currentRoute.value.name) {
        case "Configurator":
          return {
            bgColor: "bg-gradient-green",
            title: "Configurateur",
            subtitle: "Créez votre configuration de plantes idéale.",
            text: "Choisissez et placez sur votre voiture les plantes de votre choix et créez une voiture dépolluante unique."
          }
        default:
          return {
            bgColor: "bg-gradient-yellow",
            title: "Elvia",
            subtitle: "Le nouveau poumon de la Terre",
            text: ""
          }
      }
    }
  }
}
</script>

<style scoped>

</style>