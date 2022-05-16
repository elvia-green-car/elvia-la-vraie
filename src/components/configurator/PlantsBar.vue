<template>
  <!-- TODO: Custom slider -->
  <!-- overflow-hidden-->
  <!-- :modules="[Controller]"
      @swiper="setFirstSwiper"
      :controller="{ control: secondSwiper }"-->
  <div class="relative">
    <swiper
        class="mx-10"
        ref="swiper pointer-events-none"
        slides-per-view="auto"
        :space-between="10"
        navigation
        @slideChange="onSlideChange"
    >
      <swiper-slide class="Plant pointer-events-none flex justify-center items-center pt-20" v-for="(plant, i) in plantsToShow">
        <div class="Plant__help pointer-events-auto absolute flex-col items-center gap-2 -translate-y-full"
             @click="openPlantPopin($event, i)">
          <span class="flex items-center justify-center rounded-full w-12 h-12 bg-white text-green-normal">+</span>
          <span class="h-8 w-[2px] bg-white"/>
        </div>
        <img class="pointer-events-auto w-32 h-32" :src="'/images/png/'+plant" @click="plantClicked($event, i)"/>
      </swiper-slide>
    </swiper>
    <div class="absolute w-full h-32 bottom-0 btn-bg btn-border btn-oval p-0"></div>
  </div>
</template>

<script>
import {ref} from "vue";
// Import Swiper Vue.js components
import {Navigation, Controller, Thumbs} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
//import 'swiper/css/navigation';

import plantsData from "../../../public/json/plants.json";

import Arrow from "../../../public/svg/slider-arrow.svg?component";

export default {
  name: "PlantsBar",
  props: {
    activeStep: String,
    slidesPerView: Number,
    // plants: Array
    secondSwiper: Object
  },
  components: {
    Swiper,
    SwiperSlide,
    Arrow
  },
  //mounted() {
  //  console.log(this.$refs, this.$refs.swiper)
  //  console.log('secondSwiper', this.secondSwiper)
  //  this.$emit('firstSwiper', this.$refs.swiper)
  //},
  setup() {
    //const firstSwiper = ref(null);
    //const setFirstSwiper = (swiper) => {
    //  firstSwiper.value = swiper;
    //  //this.setSwiper(swiper)
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
      //Controller,
      //firstSwiper,
      //setFirstSwiper,
      onSwiper,
      onSlideChange,
      modules: [Navigation],
    };
  },
  computed: {
    plantsToShow() {
      //let array = []
      Object.entries(plantsData).forEach(([key, value]) => {
        if (value.zone.find(zone => zone === this.activeStep)) {
          //array.push(key+ '.png')
        }
      });
      const array = ['chlorophytum.png', 'chlorophytum.png', 'chlorophytum.png', 'chlorophytum.png', 'chlorophytum.png', 'chlorophytum.png', 'chlorophytum.png', 'chlorophytum.png', 'chlorophytum.png']
      return array
    }
  },
  methods: {
    plantClicked($event, i) {
      console.log('hey')
      this.$emit('plantSelected', i)
    },
    openPlantPopin($event, i) {
      console.log('hey')

      this.$emit('plantSelected', i)
      //this.$emit()
    },
    setSwiper(swiper) {
    }
  }
}
</script>

<style scoped>

</style>