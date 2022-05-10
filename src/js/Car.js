export class Car {
    
    constructor(model) {
        this.model = model
    }

    dispose() {
        this.model = null
    }
  }