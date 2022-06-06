export class Plants {
    
    constructor(model, data) {
        this.model = model
        this.data = data
    }

    dispose() {
        this.model = null
        this.data = null
    }
  }