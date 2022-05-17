<template>
  <!-- TODO: Custom slider -->
  <!-- :modules="[Controller]"
      @swiper="setFirstSwiper"
      :controller="{ control: secondSwiper }"-->
  <div class="flex gap-8">
    <button slot="button-prev" ref="prev" @click="swiper.slidePrev()">
      <Arrow class="w-4"/>
    </button>
    <div class="btn-bg btn-border" @mouseleave.native="onMouseLeave">
      <div ref="helper"
           class="pointer-events-auto absolute hidden flex flex-col items-center gap-2 -translate-y-full mt-4 -translate-x-1/2"
           @click="openPlantPopin($event, plantOverviewIndex)">
        <span class="flex items-center justify-center rounded-full w-12 h-12 bg-white text-green-normal">+</span>
        <span class="h-8 w-[2px] bg-white"/>
      </div>
      <swiper ref="slider" :slides-per-view="slidesPerView" :space-between="10" :modules="modules"
              @slideChange="onSlideChange" :navigation="navigation">
        <swiper-slide v-for="(plant, i) in plantsToShow"
                      @mouseover.native="onMouseOver($event, i)">
          <div class="Plant flex justify-center items-center">
            <img class="w-32 h-32" :src="'/images/png/'+plant" @click="plantClicked($event, i)"/>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <button slot="button-next" ref="next" @click="swiper.slideNext()">
      <Arrow class="w-4 rotate-180"/>
    </button>
  </div>
</template>

<script>
import {ref} from "vue";
import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/vue';
import {useSwiper} from 'swiper/vue';

import 'swiper/css';
//import 'swiper/css/navigation';

import plantsData from "../../../public/json/plants.json";

import Arrow from "../../../public/svg/slider-arrow.svg?component";

export default {
  name: "PlantsBar",
  components: {
    Swiper,
    SwiperSlide,
    Arrow
  },
  props: {
    activeStep: String,
    slidesPerView: Number,
    // plants: Array
    secondSwiper: Object
  },
  data() {
    return {
      plant: null,
      plantOverviewIndex: null,
      navigation: {
        prevEl: this.$refs.prev,
        nextEl: this.$refs.next
      }
    }
  },

  setup() {
    const swiper = useSwiper();

    const onSwiper = (swiper) => {
      console.log(swiper);
    }
    const onSlideChange = () => {
      console.log('slide change');
    }
    return {
      //Thumbs,
      //thumbsSwiper,
      //setThumbsSwiper,
      //Controller,
      //firstSwiper,
      //setFirstSwiper,
      swiper,
      onSwiper,
      onSlideChange,
      modules: [Navigation],
    }
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
    onMouseOver($event, i) {
      this.plant = $event.target.getBoundingClientRect()
      this.$refs.helper.style.left = this.plant.x + this.plant.width / 2 + 'px'
      this.$refs.helper.classList.remove('hidden')
      this.plantOverviewIndex = i
    },
    onMouseLeave() {
      this.$refs.helper.classList.add('hidden')
      this.plantOverviewIndex = null
      this.plant = null
    },
    plantClicked($event, i) {
      console.log('plantSelected', i)
      this.$emit('plantSelected', i)
    },
    openPlantPopin() {
      this.$emit('openPlantPopin', this.plantOverviewIndex)
    }
  }
}
</script>

<style scoped>

</style>