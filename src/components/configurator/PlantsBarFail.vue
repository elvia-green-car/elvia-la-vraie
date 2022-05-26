<template>
  <!-- TODO: Custom slider -->
  <!-- TODO : mouseover, follow slider woth popinOpen-->
  <!-- :modules="[Controller]"
      @swiper="setFirstSwiper"
      :controller="{ control: secondSwiper }"-->
  <div class="flex gap-8">
    <button slot="button-prev" ref="prev" @click.native="slider.slidePrev()">
      <Arrow class="w-4"/>
    </button>
    <div class="btn-bg btn-border" @mouseleave.native="onMouseLeave">
      <div ref="helper"
           class="pointer-events-auto absolute hidden flex flex-col items-center gap-2 -translate-y-full mt-4 -translate-x-1/2"
           @click="openPlantPopin($event)">
        <span
            class="flex items-center justify-center rounded-full w-12 h-12 bg-white text-green-normal text-40">+</span>
        <span class="h-8 w-[2px] bg-white"/>
      </div>
      <div :style="{'max-width': swiperWidth}">
        <swiper ref="slider" :slides-per-view="'auto'" :modules="modules" :touchStartPreventDefault="true"
                @slideChange="onSlideChange" :navigation="navigation">
          <swiper-slide class="p-4 w-32" v-for="(plant, index) in plants" :key="index"
                        @mouseover.native="onMouseOver($event, plant, index)">
            <div class="Plant flex justify-center items-center">
              <img class="block w-full h-full object-cover" :src="'/images/png/'+plant.file"
                   @click="plantClicked($event, plant, index)"/>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <button slot="button-next" ref="next" @click.native="onNext()">
      <Arrow class="w-4 rotate-180"/>
    </button>
  </div>
</template>

<script>
import {useStore} from '../../js/stores/global'

import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/vue';

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
    plants: Array,
    slidesPerView: Number,
    // plants: Array
    secondSwiper: Object,
    width: Number,
  },
  data() {
    return {
      slider: null,
      plantEl: null,
      plantSelected: null,
      plantSelectedIndex: null,
      navigation: {
        prevEl: this.$refs.prev,
        nextEl: this.$refs.next
      },
    }
  },
  setup() {
    const store = useStore()

    const onSwiper = (swiper) => {
      console.log(swiper);
    }
    const onSlideChange = () => {
      console.log('slide change');
    }
    return {
      store,
      //Thumbs,
      //thumbsSwiper,
      //setThumbsSwiper,
      //Controller,
      //firstSwiper,
      //setFirstSwiper,
      onSwiper,
      onSlideChange,
      modules: [Navigation],
    }
  },
  mounted() {
    if (this.$refs.slider && this.$refs.slider) {
      this.slider = this.$refs.slider.swiper
      console.log(this.slider)
    }
  },
  computed: {
    swiperWidth() {
      return this.width - 116 + 'px'
    }
  },
  methods: {
    onMouseOver($event, plant, index) {
      this.plantEl = $event.target.getBoundingClientRect()
      this.plantSelected = plant
      this.plantSelectedIndex = index
      this.$refs.helper.style.left = this.plantEl.x + this.plantEl.width / 2 + 'px'
      this.$refs.helper.classList.remove('hidden')
    },
    onMouseLeave() {
      this.$refs.helper.classList.add('hidden')
      this.plantEl = null
      this.plantSelected = null
      this.plantSelectedIndex = null
    },
    plantClicked($event, plant, index) {
      this.plantSelected = plant
      this.plantSelectedIndex = index
      this.$emit('plantSelected', plant, index)
    },
    openPlantPopin() {
      this.$refs.helper.classList.add('hidden')
      this.$emit('openPlantPopin')
      this.$emit('plantSelected', this.plantSelected, this.plantSelectedIndex)
    },
    onNext() {
      console.log(this.slider, this.$refs.slider.swiper)
      this.slider.slideNext()
    }
  }
}
</script>

<style scoped>

</style>