import {defineStore} from 'pinia'

import plantsData from "/public/json/plants.json";

export const useStore = defineStore('main', {
  state() {
    return {
      // Global steps
      steps: ["Hood", "Roof", "Door", "Trunk", "Global", "Estimate"], // ['capot', 'toit', 'portiere', 'coffre', 'global', 'devis'],
      activeStepIndex: 0,
      activeStep: 'Hood',

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
      isPopinOpen: false,

      // Loader
      isLoading: true,
      load: 10,
    }
  }
})