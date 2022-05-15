<template>
  <!-- TODO: Custom slider -->
  <div class="btn-bg overflow-hidden btn-border btn-oval p-0"><!-- overflow-hidden-->
    <swiper
        :slides-per-view="slidesPerView"
        :space-between="10"
        navigation
        @swiper="onSwiper"
        @slideChange="onSlideChange"
    >
      <div class="swiper-button-prev">
        <!--SliderArrow/-->
      </div>
      <swiper-slide class="relative flex justify-center items-center" v-for="(plant, i) in plantsToShow"
                    @click="plantClicked($event, i)">
        <div class="absolute flex flex-col items-center gap-2"><!--  -top-1/2 -->
          <span class="flex items-center justify-center rounded-full w-12 h-12 bg-white text-green-normal">+</span>
          <span class="h-8 w-[2px] bg-white"/>
        </div>
        <img :src="'/images/png/'+plant"/>
      </swiper-slide>
      <div class="swiper-button-next"></div>
    </swiper>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/vue';
import SliderArrow from "../../../public/svg/slider-arrow.svg";

// Import Swiper styles
import 'swiper/css';
//import 'swiper/css/navigation';

import plantsData from "../../../public/json/plants.json";


export default {
  name: "PlantsBar",
  props: {
    activeStep: String,
    slidesPerView: Number,
    // plants: Array
  },
  components: {
    Swiper,
    SwiperSlide,
    SliderArrow
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
      this.$emit('plantSelected', i)
    }
  }
}
</script>

<style scoped>

</style>