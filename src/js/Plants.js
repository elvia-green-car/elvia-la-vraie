export class Plants {
    
    constructor(model) {
        this.model = model
    }

    dispose() {
        this.model = null
    }
  }