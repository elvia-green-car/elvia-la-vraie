<template>
  <div class="h-full bg-opacity-10 bg-white rounded-full border border-white overflow-hidden">
    <swiper
        :slides-per-view="5.5"
        :space-between="10"
        navigation
        @swiper="onSwiper"
        @slideChange="onSlideChange"
    >
      <div class="swiper-button-prev">
        <!--SliderArrow/-->
      </div>
      <swiper-slide class="flex justify-center items-center" v-for="(plant, i) in plantsToShow"
                    @click="plantClicked($event, i)">
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
import SliderArrow from "../../public/images/svg/slider-arrow.svg";

// Import Swiper styles
import 'swiper/css';
//import 'swiper/css/navigation';

import plantsData from "../../public/json/plants.json";


export default {
  name: "PlantsBar",
  props: {
    activeStep: String,
    // plants: Array
  },
  components: {
    Swiper,
    SwiperSlide,
    SliderArrow
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
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
        if(value.zone.find(zone => zone === this.activeStep)) {
          //array.push(key+ '.png')
        }
      });
      const array = ['chlorophytum.png', 'chlorophytum.png', 'chlorophytum.png', 'chlorophytum.png', 'chlorophytum.png', 'chlorophytum.png', 'chlorophytum.png', 'chlorophytum.png', 'chlorophytum.png']
      return array
    }
  },
  methods: {
    plantClicked($event, i) {
      console.log("plant clicked", $event.target, i)
      this.$emit('plantSelected', i)
    }
  }
}
</script>

<style scoped>

</style>