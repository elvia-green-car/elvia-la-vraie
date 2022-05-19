<template>
  <section :class="isOpen ? 'w-[55%] p-14 border-r': 'w-0'"
           class="flex flex-col h-full shrink-0 z-10 overflow-hidden border-white transition-all ease-in-out bg-white bg-opacity-30 backdrop-blur-xs">
    <Button class="ml-auto" icon="close" :background="false" round @click.native="$emit('closePopin')"/>
    <div class="flex justify-center items-center my-auto">
      <swiper
          ref="swiper"
          :modules="[Controller]"
          @swiper="setSecondSwiper"
          :controller="{ control: firstSwiper }"
          :slides-per-view="1"
          navigation
          @slideChange="onSlideChange"
      >
        <swiper-slide class="relative flex justify-center items-center">
          <div class="flex flex-col items-center w-1/2">
            <img :src="'/images/png/chlorophytum.png'"/>
            <div class="flex">
              <div class="flex items-center justify-center w-8 h-8 btn-border btn-round">
                <span class="w-8 h-8 hover:scale-50 transition-all ease-in-out btn-border btn-round bg-green-normal"/>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-start w-1/2 gap-14">
            <div>
              <h2 class="font-title font-bold text-30 xl:text-40">Titre</h2>
              <p class="text-14 xl:text-16">Loreum ipsum</p>
            </div>
            <Rates reverse :data="[
          {name: 'Absorption CO2', rate: 86},
          {name: 'Besoin en eau', rate: 54},
          {name: 'Pollinisation', rate: 67}
        ]"/>
            <Button text="Placer" @click.native="selectedPlant"/>
          </div>
        </swiper-slide>
        <swiper-slide class="relative flex justify-center items-center">
          <div class="flex flex-col items-center w-1/2">
            <img :src="'/images/png/chlorophytum.png'"/>
            <div class="flex">
              <div class="flex items-center justify-center w-8 h-8 btn-border btn-round">
                <span class="w-8 h-8 hover:scale-50 transition-all ease-in-out btn-border bg-green-normal"/>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-start w-1/2 gap-14">
            <div>
              <h2 class="font-title font-bold text-30 xl:text-40">Titre</h2>
              <p class="text-14 xl:text-16">Loreum ipsum</p>
            </div>
            <Rates reverse :data="[
          {name: 'Absorption CO2', rate: 86},
          {name: 'Besoin en eau', rate: 54},
          {name: 'Pollinisation', rate: 67}
        ]"/>
            <Button text="Placer" @click.native="selectedPlant"/>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
import {ref} from 'vue';
// Import Swiper Vue.js components
import {Navigation, Controller, Thumbs} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
//import 'swiper/css/navigation';

import Button from "../Button.vue";
import Rates from "./Rates.vue";

import Arrow from "../../../public/svg/slider-arrow.svg";

export default {
  name: "Plant",
  components: {Rates, Button, Swiper, SwiperSlide, Arrow},
  props: {
    data: Object,
    isOpen: Boolean,
    firstSwiper: Object
  },
  mounted() {
    console.log(this.$refs, this.$refs.swiper)
    console.log('firstSwiper', this.firstSwiper)
    this.$emit('secondSwiper', this.$refs.swiper)
  },
  setup() {
    const secondSwiper = ref(null);
    const setSecondSwiper = (swiper) => {
      secondSwiper.value = swiper;
      //setSwiper(swiper)
    };

    //const thumbsSwiper = ref(null);
    //const setThumbsSwiper = (swiper) => {
    //  thumbsSwiper.value = swiper;
    //};

    const onSwiper = (swiper) => {
      //console.log(swiper);
    };
    const onSlideChange = () => {
      //console.log('slide change');
    };
    return {
      //Thumbs,
      //thumbsSwiper,
      //setThumbsSwiper,
      Controller,
      secondSwiper,
      setSecondSwiper,
      onSwiper,
      onSlideChange,
      modules: [Navigation],
    };
  },
  computed: {},
  methods: {
    selectedPlant() {
      this.$emit('selectedPlant')
      this.$emit('closePopin')
    },
    setSwiper(swiper) {
      this.$emit('secondSwiper', swiper)
    }
  }
}
</script>

<style scoped>

</style>