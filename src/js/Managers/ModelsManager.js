import {EquirectangularReflectionMapping} from "three";
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
    }

    init() {
        this.loaderFbx = new FBXLoader()
        this.loaderGltf = new GLTFLoader()
        this.models = new Array()
    }
    
    /**
     * Load all model contains on dictionaryPathType and save in this.models
     * dictionaryPathType key : the index where the model is load
     * dictionaryPathType [0] : model path
     * dictionaryPathType [1] : type of model (MODEL_TYPE.GLTF or MODEL_TYPE.FBX)
     * @param {[int][string, MODEL_TYPE]} dictionaryPathType 
     */
    load(dictionaryPathType) {
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
    }

    /**
     * load a fbx model
     * @param {string} fbxPath : file path and name
     * @param {void(Group, index?)} callback : run when model is loaded
     * @param {int} index : return in the callback
     */
    loadFbx(fbxPath, callback, index = -1) {
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
    loadGltf(gltfPath, callback, index = -1) {
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
     * @param {boolean} hideHDRi : true hide HDRi, false display
     */
    loadHdr(path, textureName, scene, render, hideHDRi = false) {
      new RGBELoader()
					.setPath( path )
					.load( textureName, function ( texture ) {

						texture.mapping = EquirectangularReflectionMapping;

            if(hideHDRi){
              scene.background = texture.renderTarget;
            }
						else {
              scene.background = texture;
            }
						scene.environment = texture;

						render();
					} );
    }

    dispose() {
      this.loaderFbx = null
      this.loaderGltf = null
      this.instance = null
      this.models = null
    }
}