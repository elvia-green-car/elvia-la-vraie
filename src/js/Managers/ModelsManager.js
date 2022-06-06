import {LoadingManager} from "three";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
import {Model} from "../Model";
import {pinia} from "../../main";
import {useStore} from "../stores/global";

export const MODEL_TYPE = {
  FBX: 'fbx',
  GLTF: 'gltf'
}

export class ModelsManager {
  constructor() {
    this.store = useStore(pinia)

    this.loaderFbx = null
    this.loaderGltf = null
    this.instance = null
    this.models = null
    this.hdri = null
    this.loaderManager = null
  }

  init() {
    this.loaderManager = new LoadingManager();

    this.loaderFbx = new FBXLoader(this.loaderManager)
    this.loaderGltf = new GLTFLoader(this.loaderManager)
    this.models = new Array()
    this.hdri = new Array()

    this.loaderManager.onStart = () => {
      this.store.isLoading = true
    }
    this.loaderManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      this.store.load = Math.round(itemsLoaded / itemsTotal * 100)
    }
    this.loaderManager.onLoad = () => {
      console.log('Loading complete!');
      this.store.isLoading = false
    }
  }

  /**
   * Load all model contains on dictionaryPathType and save in this.models
   * dictionaryPathType key : the index where the model is load
   * dictionaryPathType [0] : model path
   * dictionaryPathType [1] : type of model (MODEL_TYPE.GLTF or MODEL_TYPE.FBX)
   * @param {[int][string, MODEL_TYPE]} dictionaryPathType
   */
  load(dictionaryPathType, dictionaryPathHDRi) {
    for (var key in dictionaryPathType) {
      for(let i = 0; i < dictionaryPathType[key][0].length; i++) {
        if(dictionaryPathType[key][0][i] != "") {
          if (dictionaryPathType[key][1] == MODEL_TYPE.GLTF) {
            this.loadGltf(dictionaryPathType[key][0][i], (gltf, index) => {
              if(this.models[index] == null) {
                this.models[index] = new Model(MODEL_TYPE.GLTF)
              }
              if(i == 0) { 
                this.models[index].setModel(gltf)
              } else {
                this.models[index].addAltModel(gltf)
              }
            }, key)
          } else if (dictionaryPathType[key][1] == MODEL_TYPE.FBX) {
            this.loadFbx(dictionaryPathType[key][0][i], (fbx, index) => {
              if(this.models[index] == null) {
                this.models[index] = new Model(MODEL_TYPE.FBX)
              }
              if(i == 0) { 
                this.models[index].setModel(fbx)
              } else {
                this.models[index].addAltModel(fbx)
              }
            }, key)
          }
        }
      }
    }
    for (var key in dictionaryPathHDRi) {
      this.loadHdr(dictionaryPathHDRi[key][0], dictionaryPathHDRi[key][1], (texture, index) => {
        this.hdri[index] = texture;
      }, key)
    }
  }

  /**
   * load a fbx model
   * @param {string} fbxPath : file path and name
   * @param {void(Group, index?)} callback : run when model is loaded
   * @param {int} index : return in the callback
   */
  loadFbx(fbxPath, callback, index = 0) {
    this.loaderFbx.load(
      fbxPath,
      (fbx) => {
        callback(fbx, index)
      });
  }

  /**
   * load a gltf model
   * @param {string} gltfPath : file path and name
   * @param {void} callback : run when model is loaded
   * @param {int} index
   */
  loadGltf(gltfPath, callback, index = 0) {
    this.loaderGltf.load(
      gltfPath,
      (gltf) => {
        callback(gltf.scene, index)
      });
  }

  /**
   * load a hdri and add it to the scene
   * @param {string} path : file path
   * @param {string} textureName : file name
   * @param {Scene} scene
   * @param {WebGLRenderer} render
   */
  loadHdr(path, textureName, callback, index = 0) {
    new RGBELoader(this.loaderManager)
      .setPath(path)
      .load(textureName, function (texture) {
        callback(texture, index)
        /*texture.mapping = EquirectangularReflectionMapping;

        scene.background = texture;
        scene.environment = texture;

        render();*/
      });
  }

  dispose() {
    this.loaderManager = null
    this.loaderFbx = null
    this.loaderGltf = null
    this.instance = null
    this.models = null
  }
}