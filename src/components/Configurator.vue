<template>
  <div class="relative flex justify-between w-full h-full">
    <canvas ref="canvas" class="absolute top-0 left-0 z-0 w-full h-full border-red-200" id="app-canvas"></canvas>
    <a href="/" class="absolute p-12 xl:p-16 font-title font-bold text-14 uppercase z-20">Elvia</a>
    <!-- v-if="activeStep !== 'devis'" -->
    <PlantPopin :is-open="isPopinOpen" @close-popin="isPopinOpen = false"/>
    <!-- v-if="activeStep === 'devis'" -->
    <DevisPopin :is-open="activeStep === 'devis'"/>
    <!--keep-alive>
      <component :is="popinIs" :is-open="isPopinOpen" @close-popin="isPopinOpen = false"/>
    </keep-alive-->
    <div class="flex flex-col flex-1 pointer-events-none">
      <aside ref="sidebar"
             class="flex flex-col h-full self-end justify-between items-end text-right p-10 xl:p-14 z-10 xl:mb-10">
        <a class="pointer-events-auto" href="/">
          <Button text="Quitter"/>
        </a>
        <p :class="activeStep === 'devis' ? 'opacity-0 pointer-events-none':''">Loreum ipsum</p>
        <Rates :data="[
          {name: 'Absorption CO2', rate: 86},
          {name: 'Besoin en eau', rate: 54},
          {name: 'Pollinisation', rate: 67}
      ]"/>
        <Breadcrumb :class="activeStep === 'devis' ? 'opacity-0 pointer-events-none':'pointer-events-auto'"
                    :active-step="activeStep" :steps="steps" @step-selected="updateSteps"/>
        <SwitchView :class="activeStep === 'devis' ? 'opacity-0 pointer-events-none':'pointer-events-auto'"
                    class="opacity-0"/>
      </aside>
      <section v-show="activeStep !== 'global' && activeStep !== 'devis'"
               class="flex gap-6 pointer-events-auto mt-auto justify-between items-center p-10 xl:p-14 z-10">
        <!-- isPopinOpen ? 1 : 5.5 -->
        <PlantsBar active-step="capot" @plant-selected="onPlant" @open-plant-popin="isPopinOpen = true"
                   :width="plantsBarWidth"/>
        <div ref="nextStep" class="flex gap-6">
          <div class="flex flex-col justify-center items-center font-title text-14">
            <span>0{{ activeStepIndex + 1 }}</span>
            <span class="h-[1px] bg-white w-14 my-2"></span>
            <span>0{{ steps.length }}</span>
          </div>
          <Button icon="arrow" @click.native="updateSteps(activeStepIndex + 1)"/>
        </div>
      </section>
      <section v-if="activeStep === 'global'"
               class="flex mt-auto justify-between items-center gap-10 p-10 xl:p-14 z-10">
        <!--Scroll class="absolute z-20 left-10 top-1/2 -translate-y-1/2"/-->
        <Button icon="arrow" text="Configurateur" background @click=""/>
        <div class="flex gap-6">
          <Button icon="download" round/>
          <Button text="Finaliser" @click.native="updateSteps(activeStepIndex + 1)"/>
        </div>
        <Socials/>
      </section>
      <section v-if="activeStep === 'devis'" class="flex mt-auto justify-end items-center gap-10 p-10 xl:p-14 z-10">
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
      app: null,
      steps: ['capot', 'toit', 'portiere', 'coffre', 'global', 'devis'],
      activeStepIndex: 0,
      activeStep: 'capot',

      isPopinOpen: false,
      popinWidth: 0,

      plantSelected: null,

      firstSwiper: null,
      secondSwiper: null,
      isMounted: false
    }
  },
  computed: {
    /*popinIs() {
      switch (this.activeStep) {
        case 'devis':
          this.isPopinOpen = true
          this.popinWidth = window.innerWidth * 45 / 100
          return 'devis-popin'
          break;
        case 'global':
          return
          break;
        default:
          this.popinWidth = window.innerWidth * 55 / 100
          return 'plant-popin'
          break
      }
    },*/
    plantsBarWidth() {
      switch (this.activeStep) {
        case 'devis':
          this.popinWidth = window.innerWidth * 45 / 100
          break;
        case 'global':
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
  },
  methods: {
    //setFirstSwiper(swiper) {
    //  console.log('setFirstSwiper', swiper)
    //  this.firstSwiper = swiper
    //},
    //setSecondSwiper(swiper) {
    //  console.log('setSecondSwiper', swiper)
    //  this.secondSwiper = swiper
    //},
    updateSteps(index) {
      console.log('updateSteps', index)
      this.activeStepIndex = index
      this.activeStep = this.steps[index]
      this.isPopinOpen = false
    },
    onPlant(plant) {
      this.plantSelected = plant
      console.log(this.plantSelected)
    }
  },
  mounted() {
    const app = new AppWebGL(this.$refs.canvas) //document.getElementById('app-canvas')
    app.init()
    app.run()
  }
}
</script>

<style scoped>

</style>