export class Model {
    
    
    constructor(model, type) {
        this.model = model
        this.type = type
    }

    dispose() {
        this.model = null
        this.type = null
    }
  }