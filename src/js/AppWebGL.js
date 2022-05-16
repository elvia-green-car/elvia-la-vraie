import {Scene, WebGLRenderer, PerspectiveCamera, DirectionalLight, MeshStandardMaterial} from "three";
import {HUD} from "./HUD";
import {Car} from "./Car";
import { ModelsManager, MODEL_TYPE } from "./Managers/ModelsManager";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { Plants } from "./Plants";

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

export class AppWebGL {
  constructor(canvas) {
    this.canvas = canvas
    this.scene = null
    this.camera = null
    this.renderer = null

    this.modelManager = null
    this.modelsPathType = new Array()
    this.load = false
    this.car = null
    this.plants = new Array()


    console.log("New App created")
  }

  // Initialization
  init() {
    console.log("App init")
    this.scene = new Scene()

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    })
    this.renderer.autoClear = false
    this.renderer.shadowMap.enabled = true

    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))

    const gl = this.renderer.getContext()
    const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
    this.camera = new PerspectiveCamera(50, aspect, 0.01, 1000)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.dirLight1 = new DirectionalLight (0xffffff, 1)
    this.dirLight1.position.set(-600, 300, 200)
    this.dirLight2 = new DirectionalLight (0xffffff, 1)
    this.dirLight2.position.set(-600, 300, -200)
    this.dirLight3 = new DirectionalLight (0xffffff, 1)
    this.dirLight3.position.set(600, 300, 200)
    this.dirLight4 = new DirectionalLight (0xffffff, 1)
    this.dirLight4.position.set(600, 300, -200)
    this.scene.add(this.dirLight1)
    this.scene.add(this.dirLight2)
    this.scene.add(this.dirLight3)
    this.scene.add(this.dirLight4)

    this.camera.position.set(-300, 200, 100)
    this.camera.lookAt(0, 0, 0)

    this.modelManager = new ModelsManager()
    this.modelManager.init()

    this.modelManager.loadHdr('src/assets/textures/Background/hdri/', 'studio_small_08_1k.hdr', this.scene, this.render)

    this.modelsPathType[MODELS.Car] = ['src/assets/models/Car/fbx/Configurateur_VoitureExterieur_v05.fbx', MODEL_TYPE.FBX]
    this.modelsPathType[MODELS.Plant_Aglaomene] = ['src/assets/models/Plants/gltf/Configurator_Aglaomene_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_Bambou] = ['src/assets/models/Plants/gltf/Configurator_Bambou_V03.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_Clorophytum] = ['src/assets/models/Plants/gltf/Configurator_Clorophytum_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_Clorophytum02] = ['src/assets/models/Plants/gltf/Configurator_Clorophytum02_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_Eucalyptus] = ['src/assets/models/Plants/gltf/Configurator_Eucalyptus_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_FicusRoberta] = ['src/assets/models/Plants/gltf/Configurator_FicusRoberta_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_Gerbera] = ['src/assets/models/Plants/gltf/Configurator_Gerbera_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_Monstera] = ['src/assets/models/Plants/gltf/Configurator_Monstera_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_Monstera02] = ['src/assets/models/Plants/gltf/Configurator_Monstera02_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_Paquerette] = ['src/assets/models/Plants/gltf/Configurator_Paquerette_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_Planteserpent] = ['src/assets/models/Plants/gltf/Configurator_Planteserpent_V02.gltf', MODEL_TYPE.GLTF]

    this.modelManager.load(this.modelsPathType)

  }

  resizeRendererToDisplaySize() {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    const needResize = this.canvas.width !== width || this.canvas.height !== height
    if (needResize) {
      this.renderer.setSize(width, height, false)
    }
    return needResize
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this))

    // Update ...
    if (this.resizeRendererToDisplaySize()) {
      const gl = this.renderer.getContext()
      this.camera.aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
      this.camera.updateProjectionMatrix()
    }

    if ( this.mixer ) this.mixer.update( delta );

    // Render ...
    this.render()
  }

  // this function execute while all model isn't load
  updateModelsLoad() {
    let temp = false
    for(let i = 0; i < this.modelsPathType.length; i++) {
      if(this.modelManager.models[i] != null) {
        if((i == MODELS.Car) && (this.car == null)) {
          this.car = new Car(this.modelManager.models[MODELS.Car].model.clone())
          this.scene.add(this.car)
        }
        else if(this.plants[i] == null) {
          this.plants[i] = new Plants(this.modelManager.models[i].model.clone())
          this.plants[i].model.traverse((node) => {
            if(node.isMesh) {
              /*let clonedMaterial = node.material.clone();
              node.material = clonedMaterial;
              node.material.color.set(
                this.state.modelData.statusList[statusIndex].statusColor
              );*/
            }
          })
          this.plants[i].model.position.set(-100 * i, 0, 0)
          this.scene.add(this.plants[i].model)
        }

        if((this.plants.length == (MODELS.Plant_Planteserpent - MODELS.Plant_Aglaomene)) && (this.car != null)) {
          temp = true
        }

      }
    }
    //if the load is not finished, we recheck 10ms later
    if(temp == false) {
      setTimeout(function() {this.updateModelsLoad()}.bind(this),10);
    }
  }

  // Run app, load things, add listeners, ...
  run() {
    console.log("App run")
    this.animate()
    this.updateModelsLoad()
  }

  // Memory management
  destroy() {
    this.scene = null
    this.camera = null
    this.renderer = null
    this.canvas = null
    this.load = false
    this.car.dispose()
    this.plants.forEach((plant) => {
      plant.dispose()
    })
  }
}
