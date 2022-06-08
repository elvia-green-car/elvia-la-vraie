<template>
  <div v-show="store.isRewardPopinOpen"
       class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 btn-border bg-layered bg-opacity-30 backdrop-blur-sm py-16 px-32 rounded-lg z-20">
    <div class="flex flex-col gap-10 text-center items-center justify-center z-20">
      <div class="btn-border btn-round">
        <Flower class="w-12	h-12"/>
      </div>
      <span class="font-title font-bold text-[35px]">Certification</span>
      <span>{{ reward }}</span>
      <Button class="pointer-events-auto" @click.native="store.isRewardPopinOpen = false">
        <Arrow class="w-5"/>
      </Button>
    </div>
  </div>
</template>

<script>
import {useStore} from "../../js/stores/global";

import rewardsData from "/public/json/rewards.json";

import Arrow from "/public/svg/arrow.svg?component";
import Button from "../Button.vue";
import Flower from "/public/svg/flower.svg?component";

export default {
  name: "RewardPopin",
  components: {Button, Arrow, Flower},
  props: {
    data: Object,
    isOpen: Boolean,
    plants: Array,
  },
  setup() {
    const store = useStore()

    return {
      store
    }
  },
  computed: {
    reward() {
      return this.store.rewardType ? rewardsData.find(r => r.type === this.store.rewardType).text : ''
    }
  }
}
</script>

<style scoped>

</style>
