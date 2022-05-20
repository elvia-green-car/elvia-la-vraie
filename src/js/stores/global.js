import {defineStore} from 'pinia'

import plantsData from "../../../public/json/plants.json";

export const useStore = defineStore('main', {
  state() {
    return {
      steps: ['capot', 'toit', 'portiere', 'coffre', 'global', 'devis'],
      activeStepIndex: 0,
      activeStep: 'capot',


      plantsData: plantsData,
      plantsToShow: {},
      carPlants: {}
    }
  }
})