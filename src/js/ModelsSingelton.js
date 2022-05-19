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

export const HDRI = {
  Studio: 0
}

export var ModelsSingelton = (function() {
    var modelManager = null;
    var modelsPathType = null;
    var hdriPath = null;

    var constructeur = function() {
      modelsPathType = new Array()
      hdriPath = new Array()

      modelManager = new ModelsManager()
      modelManager.init()
  
      hdriPath[HDRI.Studio] = ['textures/Background/hdri/', 'studio_small_08_1k.hdr']
      //modelManager.loadHdr('textures/Background/hdri/', 'studio_small_08_1k.hdr', HDRI.Studio)
  
      modelsPathType[MODELS.Car] = ['models/Car/fbx/Configurateur_VoitureExterieur_v08.fbx', MODEL_TYPE.FBX]
      modelsPathType[MODELS.Plant_Aglaomene] = ['models/Plants/gltf/Configurator_Aglaomene_V02.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_Bambou] = ['models/Plants/gltf/Configurator_Bambou_V03.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_Clorophytum] = ['models/Plants/gltf/Configurator_Chlorophytum_V03.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_Clorophytum02] = ['models/Plants/gltf/Configurator_Clorophytum02_V02.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_Eucalyptus] = ['models/Plants/gltf/Configurator_Eucalyptus_V02.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_FicusRoberta] = ['models/Plants/gltf/Configurator_FicusRoberta_V02.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_Gerbera] = ['models/Plants/gltf/Configurator_Gerbera_V02.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_Monstera] = ['models/Plants/gltf/Configurator_Monstera_V04.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_Monstera02] = ['models/Plants/gltf/Configurator_Monstera02_V02.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_Paquerette] = ['models/Plants/gltf/Configurator_Paquerette_V02.gltf', MODEL_TYPE.GLTF]
      modelsPathType[MODELS.Plant_Planteserpent] = ['models/Plants/gltf/Configurator_Planteserpent_V02.gltf', MODEL_TYPE.GLTF]
  
      modelManager.load(modelsPathType, hdriPath)

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