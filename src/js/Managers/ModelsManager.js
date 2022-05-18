import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { Model } from "../Model";

export const MODEL_TYPE = {
  FBX: 0,
  GLTF: 1
}

export class ModelsManager {
    constructor () {
        this.loaderFbx = null
        this.loaderGltf = null
        this.instance = null
        this.models = null
        this.hdri = null
    }

    init() {
        this.loaderFbx = new FBXLoader()
        this.loaderGltf = new GLTFLoader()
        this.models = new Array()
        this.hdri = new Array()
    }
    
    /**
     * Load all model contains on dictionaryPathType and save in this.models
     * dictionaryPathType key : the index where the model is load
     * dictionaryPathType [0] : model path
     * dictionaryPathType [1] : type of model (MODEL_TYPE.GLTF or MODEL_TYPE.FBX)
     * @param {[int][string, MODEL_TYPE]} dictionaryPathType 
     */
    load(dictionaryPathType, dictionaryPathHDRi) {
      for(var key in dictionaryPathType) {
        if(dictionaryPathType[key][1] == MODEL_TYPE.GLTF) {
          this.loadGltf(dictionaryPathType[key][0], (gltf, index) => { 
            this.models[index] = new Model(gltf, MODEL_TYPE.GLTF);
          }, key)
        }
        else if (dictionaryPathType[key][1] == MODEL_TYPE.FBX) {
          this.loadFbx(dictionaryPathType[key][0], (fbx, index) => { 
            this.models[index] = new Model(fbx, MODEL_TYPE.FBX);
          }, key)
        }
      }
      for(var key in dictionaryPathHDRi) {
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
          ( fbx ) => {    
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
        ( gltf ) => {    
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
      new RGBELoader()
					.setPath( path )
					.load( textureName, function ( texture ) {
            callback(texture, index)
						/*texture.mapping = EquirectangularReflectionMapping;

						scene.background = texture;
						scene.environment = texture;

						render();*/
					} );
    }

    dispose() {
      this.loaderFbx = null
      this.loaderGltf = null
      this.instance = null
      this.models = null
    }
}