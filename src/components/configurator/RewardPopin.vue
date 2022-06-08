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
import {Rewards} from "../../js/constants";

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
  mounted() {
    this.store.$subscribe((mutation) => this.onStoreMutation())
  },
  computed: {
    reward() {
      return this.store.rewardType ? rewardsData.find(r => r.type === this.store.rewardType).text : ''
    }
  },
  methods: {
    onStoreMutation() {
      let carPlants = Object.entries(this.store.carPlants)
      let rewardsGiven = Object.values(this.store.rewardGiven)

      if (carPlants.length === 1 && rewardsGiven.find(r => r === Rewards.FIRST_PLANT) === undefined) {
        this.store.isRewardPopinOpen = true
        this.store.rewardType = Rewards.FIRST_PLANT
        this.store.rewardGiven.push(Rewards.FIRST_PLANT)
      }
      if (carPlants.length === 5 && this.store.rewardGiven.find(r => r === Rewards.GREEN_HAND) === undefined) {
        this.store.isRewardPopinOpen = true
        this.store.rewardType = Rewards.GREEN_HAND
        this.store.rewardGiven.push(Rewards.GREEN_HAND)
      }
      if (carPlants.length === this.store.slotsCount && this.store.rewardGiven.find(r => r === Rewards.FULLFILL) === undefined) {
        this.store.isRewardPopinOpen = true
        this.store.rewardType = Rewards.FULLFILL
        this.store.rewardGiven.push(Rewards.FULLFILL)
      }
    },
  }
}
</script>

<style scoped>

</style>
