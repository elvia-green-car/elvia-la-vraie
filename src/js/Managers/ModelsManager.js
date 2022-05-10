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

    loadFbx(fbxPath, callback, index = -1) {
        this.loaderFbx.load( 
          fbxPath, 
          ( fbx ) => {    
            callback(fbx, index)     
          });
    }

    loadGltf(gltfPath, callback, index = -1) {
      this.loaderGltf.load( 
        gltfPath, 
        ( gltf ) => {    
          callback(gltf.scene, index)     
        });
  }

    loadHdr(path, textureName, scene, render) {
      new RGBELoader()
					.setPath( path )
					.load( textureName, function ( texture ) {

						texture.mapping = EquirectangularReflectionMapping;

						scene.background = texture;
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