import {EquirectangularReflectionMapping} from "three";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const MODEL_TYPE = {
  FBX: 0,
  GLTF: 1
}
export class ModelsManager {
    constructor () {
        this.loaderFbx = null
        this.loaderGltf = null
        this.instance = null
    }

    init() {
        this.loaderFbx = new FBXLoader()
        this.loaderGltf = new GLTFLoader()
        this.models = new Array()
    }
    
    getInstance() {
      if (this.instance == null) {
        this.instance = new constructor()
        this.instance.constructor = null
      }
      
      return this.instance;
    }
    
    load(callback) {
      //this.loadFbx('assets/models/fbx/Voiture_Exterieur_AnimationRoue_V00.fbx', callback)
      //this.loadGltf('assets/models/gltf/Configurateur_VoitureExterieur_04.gltf', callback)
    }

    loadFbx(fbxPath, callback) {
        this.loaderFbx.load( 
          fbxPath, 
          ( fbx ) => {    
            callback(fbx)     
          });
    }

    loadGltf(gltfPath, callback) {
      this.loaderGltf.load( 
        gltfPath, 
        ( gltf ) => {    
          callback(gltf.scene)     
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
      this.models = {}
    }
}