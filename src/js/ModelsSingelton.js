import {ModelsManager, MODEL_TYPE} from "./Managers/ModelsManager";
import {FileLoader, AudioLoader, AudioListener, Audio} from "three";

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

export const SOUNDS = {
  LoopCity: 0,
  LoopNature: 1,
  PopUp: 2,
  PopDown: 3
}

export const MODELS_OFFSET_PLANT = 1;         //offset of index plant

export var ModelsSingelton = (function () {
  var modelManager = null;
  var modelsPathType = null;
  var hdriPath = null;
  var audios = null;
  var audioLoader = null;
  var listener = null;

  var constructeur = function () {
    modelsPathType = new Array()
    hdriPath = new Array()
    audios = new Array()
    audioLoader = new AudioLoader();
    listener = new AudioListener();

    var json

    modelManager = new ModelsManager()
    modelManager.init()

    hdriPath[HDRI.Studio] = ['textures/Background/hdri/', 'studio_small_08_1k.hdr']
    //modelManager.loadHdr('textures/Background/hdri/', 'studio_small_08_1k.hdr', HDRI.Studio)

    modelsPathType[MODELS.Car] = [['models/Car/fbx/Configurateur_VoitureExterieur_v16.fbx'], MODEL_TYPE.FBX]

    const url = 'json/plants.json'
    var loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, (text) => {
      json = JSON.parse(text);
      //console.log(json)
      json.forEach((element) => {
        if (element.index != null && element.models.length > 0 && element.type != null) {
          let modelsPath = new Array()
          for(let i = 0; i < element.models.length; i++) {
            modelsPath.push(element.models[i])
          }
          modelsPathType[MODELS_OFFSET_PLANT + element.index] = [modelsPath, element.type]
        }
      });
      //console.log(modelsPathType)
      modelManager.load(modelsPathType, hdriPath)
    });

    this.getModelManager = function () {
      return modelManager
    }
    this.getModelsPathType = function () {
      return modelsPathType
    }
    this.getListener = function () {
      return listener
    }
    this.getAudios = function () {
      return audios
    }

    audioLoader.load( 'sounds/loop_city.mp3', function( buffer ) {
      audios[SOUNDS.LoopCity] = new Audio( listener );
      audios[SOUNDS.LoopCity].setBuffer( buffer );
      audios[SOUNDS.LoopCity].setLoop( true );
    });

    audioLoader.load( 'sounds/loop_nature.mp3', function( buffer ) {
      audios[SOUNDS.LoopNature] = new Audio( listener );
      audios[SOUNDS.LoopNature].setBuffer( buffer );
      audios[SOUNDS.LoopNature].setLoop( true );
    });

    audioLoader.load( 'sounds/pop_up.mp3', function( buffer ) {
      audios[SOUNDS.PopUp] = new Audio( listener );
      audios[SOUNDS.PopUp].setBuffer( buffer );
      audios[SOUNDS.PopUp].setLoop( false );
      audios[SOUNDS.PopUp].setVolume( 1 );
    });

    audioLoader.load( 'sounds/pop_down.mp3', function( buffer ) {
      audios[SOUNDS.PopDown] = new Audio( listener );
      audios[SOUNDS.PopDown].setBuffer( buffer );
      audios[SOUNDS.PopDown].setLoop( false );
      audios[SOUNDS.PopDown].setVolume( 1 );
    });

  }
  var instance = null;
  return new function () {
    this.getInstance = function () {
      if (instance == null) {
        instance = new constructeur();
        instance.constructeur = null;
      }

      return instance;
    }
  }
})();