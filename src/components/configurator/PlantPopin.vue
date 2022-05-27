<template>
  <section :class="isOpen ? 'p-10 xl:p-14 border-r': '-translate-x-full'"
           class="w-[55%] absolute top-0 left-0 flex flex-col h-full shrink-0 z-10 overflow-hidden border-white transition-transform ease-in-out bg-layered bg-opacity-30 backdrop-blur-sm">
    <Button class="ml-auto" icon="close" :background="false" round @click.native="$emit('closePopin')"/>
    <div class="flex justify-center items-center my-auto">
      <!-- Swiper -->
      <div ref="slider" class="swiper">
        <!-- Swiper-wrapper -->
        <div class="swiper-wrapper">
          <!-- Swiper-slide -->
          <div v-for="(plant, index) in plants" :key="index"
               class="swiper-slide relative flex flex-col xl:flex-row gap-10 xl:gap-0 justify-center items-center">
            <div class="flex w-1/2 flex-col items-center ">
              <img class="xl:w-full" :src="`/images/png/${plant.file}`"/>
              <div v-if="plant.colors" class="flex">
                <div v-for="color in plant.colors" :key="color"
                     class="flex items-center justify-center w-8 h-8 btn-border">
                <span class="w-full h-full hover:scale-50 transition-all ease-in-out btn-border bg-green-normal"
                      :style="{'backgroundColor': color}"/>
                </div>
              </div>
            </div>
            <div class="flex xl:w-1/2 flex-col items-start gap-6 xl:gap-14">
              <h2 class="font-title font-bold text-30 xl:text-40 capitalize">{{ plant.name }}</h2>
              <p class="text-14 xl:text-16">{{ plant.description }}</p>
              <Rates reverse :data="rates(plant)"/>
              <Button text="Placer" @click.native="plantClicked($event, plant, index)"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center gap-6 pointer-events-auto">
      <Button ref="prev" class="parent-prev" icon="ArrowSlider" :round="true"/>
      <Button ref="next" class="parent-next" icon="ArrowSlider" :round="true" :rotate="true"/>
    </div>
  </section>
</template>

<script>
import {useStore} from "../../js/stores/global";

import Swiper, {Navigation, Controller} from 'swiper';
import 'swiper/css';

import Button from "../Button.vue";
import Rates from "./Rates.vue";

import Arrow from "/public/svg/slider-arrow.svg";

export default {
  name: "Plant",
  components: {Rates, Button, Arrow},
  props: {
    data: Object,
    isOpen: Boolean,
    plants: Array,
  },
  data() {
    return {
      maxRate: 4,
      plantSelected: null,
      plantSelectedIndex: null,
    }
  },
  setup() {
    const store = useStore()

    return {
      store
    }
  },
  activated() {
    if (this.swiper) {
      this.swiper.update();
    }
  },
  mounted() {

    this.store.parent = new Swiper(this.$refs.slider, {
      slidesPerView: 1,
      threshold: 5,
      navigation: {
        nextEl: '.parent-next',// this.$refs.next,
        prevEl: '.parent-prev'// this.$refs.prev,
      },

      modules: [Navigation]
    })

    this.store.parent.on('activeIndexChange', (e) => {
      this.store.sliderActiveIndex = e.activeIndex
    })

    this.store.$subscribe((mutation, state) => {
      if(mutation.events.key === "sliderActiveIndex") {
        this.store.parent.slideTo(state.sliderActiveIndex, 300, true)
      }
    })
  },
  beforeUnmount() {
    this.store.parent.destroy()
  },
  methods: {
    selectedPlant() {
      this.$emit('selectedPlant')
    },
    plantClicked($event, plant, index) {
      this.plantSelected = plant
      this.plantSelectedIndex = index
      this.$emit('plantSelected', plant, index)
      this.$emit('closePopin')
    },
    rates(plant) {
      return [
        {name: 'Absorption CO2', rate: plant.co2 * 100 / this.maxRate},
        {name: 'Besoin en eau', rate: plant.arrosage * 100 / this.maxRate},
        {name: 'Pollinisation', rate: plant.pollinisation * 100 / this.maxRate}
      ]
    },
  }
}
</script>

<style scoped>

</style>