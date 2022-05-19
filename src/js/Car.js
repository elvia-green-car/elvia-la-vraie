import {reactive} from "vue";
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

        /**
         * Format du tableau:
         */
        this.store.carPlants = {
            "sansevieria trifasciata": 12,
            "paquerette": 5
        }

    }

    dispose() {
        this.model = null
        this.plants.forEach((plant) => {
            plant.dispose()
        })
    }
  }