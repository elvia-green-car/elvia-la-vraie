<template>
  <div class="relative flex justify-between w-full h-full">
    <canvas class="absolute top-0 left-0 z-0 w-full h-full border-red-200" id="app-canvas"></canvas>
    <!--
    <PlantPopin v-if="activeStep !== 'devis'" :is-open="isPopinOpen" @close-popin="isPopinOpen = false"/>
    <DevisPopin v-if="activeStep === 'devis'"/>
    -->
    <keep-alive>
      <component ref="popin" :is="popinIs" :data="''" :is-open="isPopinOpen"
                 @close-popin="isPopinOpen = false"/>
    </keep-alive>
    <div class="flex flex-col flex-1">
      <aside ref="sidebar"
             class="flex flex-col h-full self-end justify-between items-end text-right p-10 z-10">
        <a href="/">
          <Button text="Quitter"/>
        </a>
        <p>Loreum ipsum</p>
        <Rates :data="[
          {name: 'Absorption CO2', rate: 86},
          {name: 'Besoin en eau', rate: 54},
          {name: 'Pollinisation', rate: 67}
      ]"/>
        <Breadcrumb :active-step="activeStep" :steps="steps" @step-selected="updateSteps"/>
        <SwitchView/>
      </aside>
      <p v-if="activeStep !== 'devis'" class="ml-6 lg:ml-12 mb-3">Loreum ipsum</p>
      <section v-if="activeStep !== 'global' && activeStep !== 'devis'" :class="'w-['+plantsBarWidth+']'"
               class="flex shrink grow-0 mt-auto justify-between items-center px-10 pb-10 z-10">
        <div class="flex-1 w-1/3">
          <!--PlantsBar active-step="capot" @plant-selected="" :slides-per-view="isPopinOpen ? 1 : 5.5"/-->
        </div>
        <div class="flex gap-6">
          <div class="flex flex-col justify-center items-center font-title text-14">
            <span>0{{ stepIndex + 1 }}</span>
            <span class="h-[1px] bg-white w-14 my-2"></span>
            <span>0{{ steps.length }}</span>
          </div>
          <Button icon="arrow" @click.native="updateSteps(stepIndex + 1)"/>
        </div>
      </section>
      <section v-if="activeStep === 'global'" class="flex mt-auto justify-between items-center gap-10 px-10 pb-10 z-10">
        <!--Scroll class="absolute z-20 left-10 top-1/2 -translate-y-1/2"/-->
        <Button icon="arrow" text="Configurateur" background @click=""/>
        <div class="flex gap-6">
          <Button icon="download" round/>
          <Button text="Finaliser" @click.native="updateSteps(stepIndex + 1)"/>
        </div>
        <Socials/>
      </section>
      <section v-if="activeStep === 'devis'" class="flex mt-auto justify-end items-center gap-10 px-10 pb-10 z-10">
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
      steps: ['launch', 'capot', 'toit', 'portiere', 'coffre', 'global', 'devis'],
      stepIndex: 0,
      activeStep: 'launch',
      isPopinOpen: true
    }
  },
  computed: {
    popinIs() {
      switch (this.activeStep) {
        case 'devis':
          this.isPopinOpen = true
          return 'devis-popin'
          break;
        case 'global':
          return
          break;
        default:
          return 'plant-popin'
          break
      }
    },
    plantsBarWidth() {
      let width = 0
      if (this.$refs.popin && this.$refs.sidebar) {
      }
      return '100px'
    }
  },
  mounted() {
    console.log(this.$refs.popin, this.$refs.sidebar)
    console.log('width', this.$refs.popin.offsetWidth, this.$refs.sidebar.offsetWidth)
  },
  methods: {
    updateSteps(index) {
      console.log('updateSteps', index)
      this.stepIndex = index
      this.activeStep = this.steps[index]
      this.isPopinOpen = false
    },
  }
}
</script>

<style scoped>

</style>