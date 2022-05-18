import { ModelsManager, MODEL_TYPE } from "./Managers/ModelsManager";

export const MODELS = {
  Car: 0,
  Plant_Aglaomene: 1,
  Plant_Bambou: 2,
  Plant_Clorophytum: 3,
  Plant_Clorophytum02: 4,
  Plant_Eucalyptus: 5,
  Plant_FicusRoberta: 6,
  Plant_Gerbera: 7,
  Plant_Monstera: 8,
  Plant_Monstera02: 9,
  Plant_Paquerette: 10,
  Plant_Planteserpent: 11
}

export var ModelsSingelton = (function() {
    var modelManager = null;
    var modelsPathType = null;

    var constructeur = function() {
      modelsPathType = new Array()

      modelManager = new ModelsManager()
      modelManager.init()
  
      modelManager.loadHdr('assets/textures/Background/hdri/', 'studio_small_08_1k.hdr', this.scene, this.render)
  
      modelsPathType[MODELS.Car] = ['assets/models/Car/fbx/Configurateur_VoitureExterieur_v08.fbx', MODEL_TYPE.FBX]
      modelsPathType[MODELS.Plant_Aglaomene] = ['assets/models/Plants/gltf/Configurator_Aglaomene_V02.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_Bambou] = ['assets/models/Plants/gltf/Configurator_Bambou_V03.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_Clorophytum] = ['assets/models/Plants/gltf/Configurator_Chlorophytum_V03.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_Clorophytum02] = ['assets/models/Plants/gltf/Configurator_Clorophytum02_V02.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_Eucalyptus] = ['assets/models/Plants/gltf/Configurator_Eucalyptus_V02.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_FicusRoberta] = ['assets/models/Plants/gltf/Configurator_FicusRoberta_V02.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_Gerbera] = ['assets/models/Plants/gltf/Configurator_Gerbera_V02.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_Monstera] = ['assets/models/Plants/gltf/Configurator_Monstera_V04.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_Monstera02] = ['assets/models/Plants/gltf/Configurator_Monstera02_V02.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_Paquerette] = ['assets/models/Plants/gltf/Configurator_Paquerette_V02.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_Planteserpent] = ['assets/models/Plants/gltf/Configurator_Planteserpent_V02.gltf', MODEL_TYPE.GLTF]
  
      modelManager.load(modelsPathType)

      this.getModelManager = function() {
        return modelManager
      }
      this.getModelsPathType = function() {
        return modelsPathType
      }

    }
    var instance = null;
    return new function() {
      this.getInstance = function() {
        if (instance == null) {
          instance = new constructeur();
          instance.constructeur = null;
        }

        return instance;
      }
    }
  })();