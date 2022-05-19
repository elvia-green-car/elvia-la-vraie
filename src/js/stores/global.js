import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state() {
    return {
      carPlants: {
        plant1: 0,
      }
    }
  }
})