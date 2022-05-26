import {defineStore} from 'pinia'

import plantsData from "../../../public/json/plants.json";

export const useStore = defineStore('main', {
  state() {
    return {
      steps:  ["Hood", "Roof", "Door", "Trunk", "Global", "Estimate"], // ['capot', 'toit', 'portiere', 'coffre', 'global', 'devis'],
      activeStepIndex: 0,
      activeStep: 'Hood',

      plantsData: plantsData,
      plantsToShow: {},
      carPlants: {}
    }
  }
})