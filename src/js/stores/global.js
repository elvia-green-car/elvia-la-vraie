import {defineStore} from 'pinia'

import plantsData from "/public/json/plants.json";

export const useStore = defineStore('main', {
  state() {
    return {
      // Global steps
      configSteps: ["Hood", "Roof", "Door", "Trunk", "Global", "Estimate"],
      landingSteps: ["Home", "Configure", "Plants", "Tools", "Global", "Services"],
      activeStepIndex: 0,
      activeStep: null,

      // Cursor
      drag: false,

      // Sliders content
      plantsData: plantsData,
      plantsToShow: {},
      carPlants: {},

      // Swipers
      parent: {},
      thumbs: {},
      sliderActiveIndex: 0,

      // Popin
      isPlantPopinOpen: false,
      isRewardPopinOpen: false,
      isMenuOpen: false,

      // Loader
      isLoading: true,
      load: 0,

      cart: {
        length: 0
      }
    }
  }
})