<template>
  <!-- TODO: Custom slider -->
  <!-- TODO : mouseover, follow slider with popinOpen-->
  <!-- :modules="[Controller]"
      @swiper="setFirstSwiper"
      :controller="{ control: secondSwiper }"-->
  <div class="flex gap-8">
    <button ref="prev" class="swiper-button-prev">
      <Arrow class="w-4"/>
    </button>
    <div class="btn-bg btn-border overflow-hidden" @mouseleave="onMouseLeave">
      <div ref="helper"
           class="pointer-events-auto absolute hidden flex flex-col items-center gap-2 -translate-y-full mt-4 -translate-x-1/2"
           @click="openPlantPopin($event)">
        <More
            class="flex items-center justify-center rounded-full w-12 h-12 bg-white text-green-normal text-40"/>
        <span class="h-8 w-[2px] bg-white"/>
      </div>
      <div ref="draggable"
           class="pointer-events-none absolute hidden btn-border btn-shape btn-round w-24 h-24 z-20 overflow-hidden">
        <img v-if="plantSelected" :src="'/images/png/'+plantSelected.file" class="w-full h-full object-cover">
      </div>
      <div :style="{'max-width': swiperWidth}">
        <!-- Swiper -->
        <div ref="slider" class="swiper">
          <!-- Swiper-wrapper -->
          <div class="swiper-wrapper">
            <!-- Swiper-slide -->
            <div class="swiper-slide p-4 !w-32" v-for="(plant, index) in plants" :key="index"
                 @mouseover="onMouseOver($event, plant, index)" @mousedown="onMouseDown($event, plant, index)"
                 @click="onClick($event, plant, index)">
              <div class="Plant flex justify-center items-center">
                <img class="block w-full h-full object-cover" :src="'/images/png/'+plant.file"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button ref="next" class="swiper-button-next">
      <Arrow class="w-4 rotate-180"/>
    </button>
  </div>
</template>

<script>
import {useStore} from '../../js/stores/global'

import Swiper, {Navigation} from 'swiper';

import 'swiper/css';

import Arrow from "../../../public/svg/slider-arrow.svg?component";
import More from "../../../public/svg/more.svg?component";

export default {
  name: "PlantsBar",
  components: {
    Arrow,
    More
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
      swiper: null,
      plantEl: null,
      drag: false,
      plantSelected: null,
      plantSelectedIndex: null,
      plantOpenDetail: null,
      plantOpenDetailIndex: null
    }
  },
  setup() {
    const store = useStore()

    return {
      store,
    }
  },
  mounted() {
    this.swiper = new Swiper(this.$refs.slider, {
      slidesPerView: 'auto',
      spaceBetween: 45,
      //loop: true,
      //centeredSlides: true,
      navigation: {
        nextEl: this.$refs.next,
        prevEl: this.$refs.prev,
      },

      // For drag'n'drop
      touchStartPreventDefault: false,
      allowTouchMove: true,

      modules: [Navigation]
    })

    window.addEventListener('mouseup', this.onMouseUp)

    window.addEventListener('mousemove', ($event) => this.onMouseMove($event))
  },
  beforeDestroy() {
    window.removeEventListener('mouseup', this.onMouseUp)
    window.removeEventListener('mousemove', this.onMouseMove)
  },
  computed: {
    swiperWidth() {
      return this.width - 116 + 'px'
    }
  },
  methods: {
    onMouseOver($event, plant, index) {
      this.plantEl = $event.target.getBoundingClientRect()
      this.plantOpenDetail = plant
      this.plantOpenDetailIndex = index
      this.$refs.helper.style.left = this.plantEl.x + this.plantEl.width / 2 + 'px'
      this.$refs.helper.classList.remove('hidden')
    },
    onMouseLeave() {
      this.$refs.helper.classList.add('hidden')
    },
    onMouseDown($event, plant, index) {
      this.drag = true
      this.onClick($event, plant, index)
      this.$refs.draggable.classList.remove('hidden')
    },
    onMouseMove($event) {
      if (this.drag && this.$refs.draggable) {
        if (this.$refs.draggable.classList.contains('hidden')) {
          this.$refs.draggable.classList.remove('hidden')
        }
        this.$refs.draggable.style.left = $event.clientX - this.$refs.draggable.offsetWidth / 2 + 'px'
        this.$refs.draggable.style.top = $event.clientY - this.$refs.draggable.offsetHeight / 2 + 'px'
      }
    },
    onMouseUp(){
      this.drag = false
      if (this.$refs.draggable) {
        this.$refs.draggable.classList.add('hidden')
      }
    },
    onClick($event, plant, index) {
      this.plantSelected = plant
      this.plantSelectedIndex = index
      this.$emit('plantSelected', plant, index)
    },
    openPlantPopin() {
      this.$emit('openPlantPopin', this.plantOpenDetail, this.plantOpenDetailIndex)
      this.$refs.helper.classList.add('hidden')
    }
  }
}
</script>

<style scoped>

</style>