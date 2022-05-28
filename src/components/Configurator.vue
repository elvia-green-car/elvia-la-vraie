<template>
  <div class="relative flex justify-between w-full h-full">
    <div ref="cursor" :class="store.drag ? 'hidden': 'flex'"
         class="pointer-events-none absolute justify-center items-center btn-border rounded-full w-16 h-16 z-20">
      <span v-show="store.activeStep !== 'Global'" class="bg-white w-1 h-1 rounded-full m-auto"/>
      <div v-if="store.activeStep === 'Global'" class="relative w-full h-full flex justify-center items-center">
        <span class="text-12">Drag</span>
        <Arrow class="absolute w-3 h-3 rotate-90 -top-3 -translate-y-full left-1/2 -translate-x-1/2"/>
        <Arrow class="absolute w-3 h-3 rotate-180 -right-3 translate-x-full top-1/2 -translate-y-1/2"/>
        <Arrow class="absolute w-3 h-3 -rotate-90 -bottom-3 translate-y-full left-1/2 -translate-x-1/2"/>
        <Arrow class="absolute w-3 h-3 -left-3 top-1/2 -translate-x-full -translate-y-1/2"/>
      </div>
    </div>
    <canvas ref="canvas" class="absolute top-0 left-0 z-0 w-full h-full border-red-200" id="app-canvas"></canvas>
    <a href="/" class="absolute p-12 xl:p-16 font-title font-bold text-14 uppercase z-20">Elvia</a>
    <PlantPopin :is-open="isPopinOpen" @plant-selected="onPlant" @close-popin="onClose"
                :plants="plantsToShow" :plant="openDetail"/>
    <DevisPopin :is-open="store.activeStep === 'Estimate'"/>
    <div ref="fakePopin" class="pointer-events-none transition-transform ease-in-out z-10"/>
    <div class="flex flex-col flex-1 pointer-events-none">
      <aside ref="sidebar"
             class="flex flex-col h-full self-end justify-between items-end text-right p-10 xl:p-12 pb-0 xl:pb-0 z-10">
        <a class="pointer-events-auto" href="/">
          <Button text="Quitter"/>
        </a>
        <p class="w-32 xl:w-48" :class="store.activeStep === 'Estimate' ? 'opacity-0 pointer-events-none':''">
          Une voiture fournie en plantes pour un impact décarbonisant plus grand
        </p>
        <Rates v-if="rates" :data="rates"/>
        <!--ici: {{ rates }}-->
        <Breadcrumb :class="store.activeStep === 'Estimate' ? 'opacity-0 pointer-events-none':'pointer-events-auto'"
                    :active-step="store.activeStep" @step-selected="updateSteps"/>
        <Switch class="w-32 h-32 animate-spin-slow"
                :class="store.activeStep === 'Estimate' ? 'opacity-0 pointer-events-none':''"/>
      </aside>
      <section v-show="store.activeStep !== 'Global' && store.activeStep !== 'Estimate'"
               class="flex flex-col gap-5 pointer-events-auto mt-auto p-10 xl:p-12 pt-0 xl:pt-0 z-10">
        <!-- isPopinOpen ? 1 : 5.5 -->
        <p class="text-14 xl:text-16 ml-28">Placer les plantes de votre choix sur les emplacements prévus à cet
          effet</p>
        <div class="flex gap-6 justify-between items-center">
          <PlantsBar :active-step="store.activeStep" @plant-selected="onPlant" @open-plant-popin="onOpen"
                     :width="plantsBarWidth" :plants="plantsToShow"/>
          <div ref="nextStep" class="flex gap-6">
            <div class="flex flex-col justify-center items-center font-title text-14">
              <span>0{{ store.activeStepIndex + 1 }}</span>
              <span class="h-[1px] bg-white w-14 my-2"></span>
              <span>0{{ store.steps.length }}</span>
            </div>
            <Button icon="arrow" @click.native="updateSteps(store.activeStepIndex + 1)"/>
          </div>
        </div>
      </section>
      <section v-if="store.activeStep === 'Global'"
               class="flex pointer-events-auto mt-auto justify-between items-center gap-10 p-10 xl:p-12 z-10">
        <Scroll/>
        <Button icon="arrow" text="Configurateur" :rotate="true"
                @click.native="updateSteps(store.activeStepIndex - 1)"/>
        <div class="flex gap-6">
          <Button icon="download" round/>
          <Button text="Finaliser" @click.native="updateSteps(store.activeStepIndex + 1)"/>
        </div>
        <Socials/>
      </section>
      <section v-if="store.activeStep === 'Estimate'"
               class="flex pointer-events-auto mt-auto justify-end items-center gap-10 p-10 xl:p-12 z-10">
        <Button icon="download" round/>
        <Button text="Prendre rendez-vous"/>
        <Button text="Ajouter au panier"/>
      </section>
    </div>
  </div>
</template>

<!--
TODO: Hide fake panel at first open, create bugs at close
TODO: cursor lerp
-->
<script>
import {useStore} from '../js/stores/global'
import {AppWebGL} from "../js/AppWebGL";

import Button from "./Button.vue";
import PlantsBar from "./configurator/PlantsBar.vue";
import Rates from "./configurator/Rates.vue";
import Breadcrumb from "./configurator/Breadcrumb.vue";
import Socials from "./configurator/Socials.vue";
import Scroll from "./configurator/Scroll.vue";
import PlantPopin from "./configurator/PlantPopin.vue";
import DevisPopin from "./configurator/DevisPopin.vue";

import Arrow from "/public/svg/slider-arrow.svg?component";
import Switch from "/public/svg/switchview.svg?component";

export default {
  name: "Configurator",
  components: {
    Button,
    PlantsBar,
    Rates,
    Breadcrumb,
    Socials,
    Scroll,
    PlantPopin,
    DevisPopin,
    Arrow,
    Switch
  },
  data() {
    return {
      //app: null,

      x: 0,
      y: 0,

      isPopinOpen: false,
      popinWidth: 0,

      plantSelected: null,
      openDetail: null,

      firstSwiper: null,
      secondSwiper: null,
      isMounted: false,

      maxRate: 4,
    }
  },
  setup() {
    const store = useStore()

    return {
      store,
    }
  },
  mounted() {
    this.app = new AppWebGL(this.$refs.canvas) //document.getElementById('app-canvas')
    this.app.init()
    this.app.run()

    window.addEventListener('mousemove', this.onMouseMove)
    //this.animate()

    console.log(this.$refs.cursor.style.left)
  },
  beforeUnmount() {
    window.addEventListener('mousemove', this.onMouseMove)
  },
  computed: {
    plantsToShow() {
      let array = []
      Object.values(this.store.plantsData).forEach(value => {
        if (value.zone && value.zone.find(zone => zone === this.store.activeStep)) {
          //array.push(value.name + '.png')
          array.push(value)
        }
      });
      return array
    },
    plantsBarWidth() {
      this.popinWidth = window.innerWidth * 55 / 100

      if (this.isPopinOpen) {
        return window.innerWidth - this.popinWidth - 194
      } else {
        return window.innerWidth - 194
      }
    },
    rates() {
      let co2 = 0, arrosage = 0, pollinisation = 0, total = 0
      if (this.store.carPlants) {
        Object.entries(this.store.carPlants).forEach(([key, value]) => {
          const found = this.store.plantsData.find(el => {
            return el.name === key
          })
          co2 += found.co2 * value
          arrosage += found.arrosage * value
          pollinisation += found.pollinisation * value
          total += value
        })
      }
      return [
        {name: 'Absorption CO2', rate: co2 / total * 100 / this.maxRate},
        {name: 'Besoin en eau', rate: arrosage / total * 100 / this.maxRate},
        {name: 'Pollinisation', rate: pollinisation / total * 100 / this.maxRate}
      ]
    },
  },
  methods: {
    updateSteps(index) {
      this.store.activeStepIndex = index
      this.store.activeStep = this.store.steps[index]
      this.onClose()
    },
    onPlant(plant) {
      console.log('plantSelected', plant)
      this.plantSelected = plant
      if (this.app) {
        this.app.updatePlantSelected(this.plantSelected)
      }
    },
    onOpen(plant, index) {
      this.openDetail = plant
      this.isPopinOpen = true
      this.$refs.fakePopin.style.width = this.popinWidth + 'px'
    },
    onClose() {
      this.isPopinOpen = false
      this.$refs.fakePopin.style.width = 0 + 'px'
    },
    onMouseMove($event) {
      this.x = $event.clientX
      this.y = $event.clientY


      if (!this.store.drag && this.$refs.cursor) {
        if (this.$refs.cursor.classList.contains('hidden')) {
          this.$refs.cursor.classList.remove('hidden')
        }

        this.$refs.cursor.style.left = $event.clientX - this.$refs.cursor.offsetWidth * 3 / 4 + 'px'
        this.$refs.cursor.style.top = $event.clientY - this.$refs.cursor.offsetHeight * 3 / 4 + 'px'
      }
    },
    animate() {

      //this.$refs.cursor.style.left += (this.x - this.$refs.cursor.style.left) * 0.1
      //this.$refs.cursor.style.top += (this.y - this.$refs.cursor.style.top) * 0.1

      if (this.$refs.cursor) {
        //console.log(this.x, this.$refs.cursor.style.left, this.x - this.$refs.cursor.style.left)

      }
      requestAnimationFrame(this.animate)
    }
  },
}
</script>

<style scoped>

</style>