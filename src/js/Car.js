export class Car {
    
    constructor(model) {
        this.model = model
        this.plants = new Array()
    }

    /**
     * 
     * @param {Object3D} model 
     * @param {String} keySlot 
     */
    addPlant(model, keySlot) {
        this.plants[keySlot] = model
    }

    dispose() {
        this.model = null
        this.plants.forEach((plant) => {
            plant.dispose()
        })
    }
  }