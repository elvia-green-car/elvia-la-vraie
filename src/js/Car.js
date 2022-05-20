import {useStore} from "./stores/global";
import {pinia} from "../main";

export class Car {

  constructor(model) {
    this.model = model
    this.store = useStore(pinia)
    this.plants = new Array()
  }

  /**
   *
   * @param {Object3D} model
   * @param {String} keySlot
   */
  addPlant(model, keySlot) {
    this.plants[keySlot] = model

    let found = Object.keys(this.store.carPlants).find(key => key === model.data.name)

    if (found) {
      this.store.carPlants[found] += 1 //this.store.carPlants[found] + 1
    } else {
      this.store.carPlants[model.data.name] = 1
    }
  }

  removePlant(slotName) {
    let model = this.plants[slotName]
    if(this.store.carPlants[model.data.name] > 1) {
      this.store.carPlants[model.data.name] -= 1
    } else {
      delete this.store.carPlants[model.data.name]
    }
    this.plants[slotName].dispose()
  }

  dispose() {
    this.model = null
    this.plants.forEach((plant) => {
      plant.dispose()
    })
  }
}