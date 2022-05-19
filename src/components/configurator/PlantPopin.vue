<template>
  <section :class="isOpen ? 'w-[55%] p-10 xl:p-14 border-r': 'w-0'"
           class="flex flex-col h-full shrink-0 z-10 overflow-hidden border-white transition-all ease-in-out bg-white bg-opacity-30 backdrop-blur-xs">
    <Button class="ml-auto" icon="close" :background="false" round @click.native="$emit('closePopin')"/>
    <div class="flex justify-center items-center my-auto">
      <swiper
          :slides-per-view="1"
          navigation
          @swiper="onSwiper"
          @slideChange="onSlideChange"
      >
        <swiper-slide v-for="(plant, index) in plants" :key="plant" class="relative flex flex-col xl:flex-row gap-10 xl:gap-0 justify-center items-center">
          <div class="flex w-1/2 flex-col items-center ">
            <img :src="'/images/png/chlorophytum.png'"/>
            <div class="flex">
              <div class="flex items-center justify-center w-8 h-8 btn-border">
                <span class="w-full h-full hover:scale-50 transition-all ease-in-out btn-border bg-green-normal"/>
              </div>
            </div>
          </div>
          <div class="flex w-1/2 flex-col items-start gap-6 xl:gap-14">
            <div>
              <h2 class="font-title font-bold text-30 xl:text-40 capitalize">{{plant.name}}</h2>
              <p class="text-14 xl:text-16">{{plant.description}}</p>
            </div>
            <Rates reverse :data="rates(plant)"/>
            <Button text="Placer" @click.native="selectedPlant"/>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
// Import Swiper Vue.js components
import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/vue';

import Arrow from "../../../public/svg/slider-arrow.svg";

// Import Swiper styles
import 'swiper/css';
//import 'swiper/css/navigation';

import Button from "../Button.vue";
import Rates from "./Rates.vue";

export default {
  name: "Plant",
  components: {Rates, Button, Swiper, SwiperSlide, Arrow},
  props: {
    data: Object,
    isOpen: Boolean,
    plants: Array
  },
  setup() {
    const onSwiper = (swiper) => {
      //console.log(swiper);
    };
    const onSlideChange = () => {
      //console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation],
    };
  },
  mounted() {
    console.log(this.plants)
  },
  methods: {
    selectedPlant() {
      this.$emit('selectedPlant')
      this.$emit('closePopin')
    },
    rates(plant) {
      console.log(plant)
      return [
        {name: 'Absorption CO2', rate: plant.co2},
        {name: 'Besoin en eau', rate: plant.arrosage},
        {name: 'Pollinisation', rate: plant.pollinisation}
      ]
    }
  }
}
</script>

<style scoped>

</style>