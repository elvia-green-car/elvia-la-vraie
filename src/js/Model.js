export class Model {
    
    
    constructor(type) {
        //this.model = model
        this.altModel = new Array()
        this.type = type
    }

    setModel(model) {
        this.model = model
    }

    addAltModel(model) {
        this.altModel.push(model)
    }

    dispose() {
        this.model = null
        this.altModel = null
        this.type = null
    }
  }