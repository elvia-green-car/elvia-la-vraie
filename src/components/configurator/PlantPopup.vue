<template>
  <!-- TODO : Custom Slider with thumbnail-->
  <section
      class="absolute flex flex-col z-10 top-0 left-0 h-full w-3/5 p-10 bg-white backdrop-blur-xs bg-opacity-30 border border-white transition-all ease-in-out {{open ? '' : '-translate-x-full'}}">
    <Button class="ml-auto" icon="close" :background="false"/>
    <div class="flex justify-center items-center my-auto">
      <div class="flex flex-col items-center w-1/2">
        <img :src="'/images/png/chlorophytum.png'"/>
        <div class="flex">
          <span class="w-8 h-8 rounded-full border border-white bg-green-normal"/>
        </div>
      </div>
      <div class="flex flex-col items-start w-1/2 gap-14">
        <div>
          <h2 class="text-[60px] lg:text-[87px]">Titre</h2>
          <p class="text-18 lg:text-22">Loreum ipsum</p>
        </div>
        <Rates reverse :data="[
          {name: 'Absorption CO2', rate: 86},
          {name: 'Besoin en eau', rate: 54},
          {name: 'Pollinisation', rate: 67}
        ]"/>
        <Button text="Placer"/>
      </div>
    </div>
  </section>
</template>

<script>
import Button from "./Button.vue";
import Rates from "./Rates.vue";

export default {
  name: "Plant",
  components: {Rates, Button},
  props: {
    open: {
      default: false,
      type: Boolean
    },
  },
  methods: {}
}
</script>

<style scoped>

</style>