import {defineStore} from 'pinia'

import plantsData from "/public/json/plants.json";

export const useStore = defineStore('main', {
  state() {
    return {
      // Global steps
      configSteps: ["Hood", "Roof", "Door", "Trunk", "Global", "Estimate"],
      landingSteps: ["Elvia", "Plants", "Tools", "Packs", "Services"],
      activeStepIndex: 0,
      activeStep: null,
      // Landing
      sectionIndex: 0,

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

      slotsCount: 0,

      // Popin
      isMenuOpen: false,
      isPlantPopinOpen: false,
      isRewardPopinOpen: false,
      rewardType: null,
      rewardGiven: [],

      // Loader
      isLoading: true,
      load: 0,

      cart: {
        length: 0
      }
    }
  }
})