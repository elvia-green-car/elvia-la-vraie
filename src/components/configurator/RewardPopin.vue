<template>
  <div v-show="store.isRewardPopinOpen"
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 btn-border bg-layered bg-opacity-30 backdrop-blur-sm py-16 px-32 rounded-lg">
    <div class="flex flex-col gap-10 text-center items-center justify-center ">
      <div class="btn-border btn-round">
        <Flower class=""/>
      </div>
      <span class="font-title font-bold text-[35px]">Certification 1</span>
      <span>Bravo ! La certification 1 assure une dépollution de 20% de l’air autour de la voiture. Continuez à ajouter des plantes pour augmenter le pourcentage de dépollution.</span>
      <Button class="pointer-events-auto">
        <Arrow class="w-5"/>
      </Button>
    </div>
  </div>
</template>

<script>
import {useStore} from "../../js/stores/global";

import Arrow from "/public/svg/arrow.svg?component";
import Button from "../Button.vue";
//import Flower from "/public/svg/flower.svg?component";

export default {
  name: "RewardPopin",
  components: {Button, Arrow},
  props: {
    data: Object,
    isOpen: Boolean,
    plants: Array,
  },
  data() {
    return {}
  },
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
