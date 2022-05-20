<template>
  <div class="relative flex justify-between w-full h-full">
    <canvas ref="canvas" class="absolute top-0 left-0 z-0 w-full h-full border-red-200" id="app-canvas"></canvas>
    <a href="/" class="absolute p-12 xl:p-16 font-title font-bold text-14 uppercase z-20">Elvia</a>
    <!-- v-if="store.activeStep !== 'Estimate'" -->
    <PlantPopin :is-open="isPopinOpen" @plant-selected="onPlant" @close-popin="isPopinOpen = false"
                :plants="plantsToShow" :plant="plantSelected"/>
    <!-- v-if="store.activeStep === 'Estimate'" -->
    <DevisPopin :is-open="store.activeStep === 'Estimate'"/>
    <!--keep-alive>
      <component :is="popinIs" :is-open="isPopinOpen" @close-popin="isPopinOpen = false"/>
    </keep-alive-->
    <div class="flex flex-col flex-1 pointer-events-none">
      <aside ref="sidebar"
             class="flex flex-col h-full self-end justify-between items-end text-right p-10 xl:p-14 z-10 xl:mb-10">
        <a class="pointer-events-auto" href="/">
          <Button text="Quitter"/>
        </a>
        <p :class="store.activeStep === 'Estimate' ? 'opacity-0 pointer-events-none':''">Loreum ipsum</p>
        <Rates v-if="rates" :data="rates"/>
        <!--ici: {{ rates }}-->
        <Breadcrumb :class="store.activeStep === 'Estimate' ? 'opacity-0 pointer-events-none':'pointer-events-auto'"
                    :active-step="store.activeStep" @step-selected="updateSteps"/>
        <SwitchView :class="store.activeStep === 'Estimate' ? 'opacity-0 pointer-events-none':'pointer-events-auto'"
                    class="opacity-0"/>
      </aside>
      <section v-show="store.activeStep !== 'Global' && store.activeStep !== 'Estimate'"
               class="flex gap-6 pointer-events-auto mt-auto justify-between items-center p-10 xl:p-14 z-10">
        <!-- isPopinOpen ? 1 : 5.5 -->
        <PlantsBar :active-step="store.activeStep" @plant-selected="onPlant" @open-plant-popin="isPopinOpen = true"
                   :width="plantsBarWidth" :plants="plantsToShow"/>
        <div ref="nextStep" class="flex gap-6">
          <div class="flex flex-col justify-center items-center font-title text-14">
            <span>0{{ store.activeStepIndex + 1 }}</span>
            <span class="h-[1px] bg-white w-14 my-2"></span>
            <span>0{{ store.steps.length }}</span>
          </div>
          <Button icon="arrow" @click.native="updateSteps(store.activeStepIndex + 1)"/>
        </div>
      </section>
      <section v-if="store.activeStep === 'Global'"
               class="flex pointer-events-auto mt-auto justify-between items-center gap-10 p-10 xl:p-14 z-10">
        <!--Scroll class="absolute z-20 left-10 top-1/2 -translate-y-1/2"/-->
        <Button icon="arrow" text="Configurateur" background @click=""/>
        <div class="flex gap-6">
          <Button icon="download" round/>
          <Button text="Finaliser" @click.native="updateSteps(store.activeStepIndex + 1)"/>
        </div>
        <Socials/>
      </section>
      <section v-if="store.activeStep === 'Estimate'" class="flex pointer-events-auto mt-auto justify-end items-center gap-10 p-10 xl:p-14 z-10">
        <Button icon="download" round/>
        <Button text="Prendre rendez-vous"/>
        <Button text="Ajouter au panier"/>
      </section>
    </div>
  </div>
</template>

<!--
TODO: connect components with logic
TODO: change cursor
-->
<script>
import {useStore} from '../js/stores/global'
import {AppWebGL} from "../js/AppWebGL";

import Button from "./Button.vue";
import SwitchView from "./configurator/SwitchView.vue";
import PlantsBar from "./configurator/PlantsBar.vue";
import Rates from "./configurator/Rates.vue";
import Breadcrumb from "./configurator/Breadcrumb.vue";
import Socials from "./configurator/Socials.vue";
import Scroll from "./configurator/Scroll.vue";
import PlantPopin from "./configurator/PlantPopin.vue";
import DevisPopin from "./configurator/DevisPopin.vue";

export default {
  name: "Configurator",
  components: {Button, SwitchView, PlantsBar, Rates, Breadcrumb, Socials, Scroll, PlantPopin, DevisPopin},
  data() {
    return {
      //app: null,

      isPopinOpen: false,
      popinWidth: 0,

      plantSelected: null,

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
    console.log(this.store.activeStep)
    this.app = new AppWebGL(this.$refs.canvas) //document.getElementById('app-canvas')
    this.app.init()
    this.app.run()
  },
  computed: {
    /*popinIs() {
      switch (this.store.activeStep) {
        case 'Estimate':
          this.isPopinOpen = true
          this.popinWidth = window.innerWidth * 45 / 100
          return 'devis-popin'
          break;
        case 'Global':
          return
          break;
        default:
          this.popinWidth = window.innerWidth * 55 / 100
          return 'plant-popin'
          break
      }
    },*/
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
      switch (this.store.activeStep) {
        case 'Estimate':
          this.popinWidth = window.innerWidth * 45 / 100
          break;
        case 'Global':
          return
          break;
        default:
          this.popinWidth = window.innerWidth * 55 / 100
          break
      }

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
      console.log('updateSteps', index)
      this.store.activeStepIndex = index
      this.store.activeStep = this.store.steps[index]
      this.isPopinOpen = false
    },
    onPlant(plant) {
      this.plantSelected = plant
      console.log(this.plantSelected)
      if (this.app) {
        this.app.updatePlantSelected(this.plantSelected)
      }
    },
  },
}
</script>

<style scoped>

</style>