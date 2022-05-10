import {Scene, WebGLRenderer, PerspectiveCamera} from "three";
import {HUD} from "./HUD";
import {Car} from "./Car";
import { ModelsManager, MODEL_TYPE } from "./Managers/ModelsManager";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export class AppWebGL {
  constructor(canvas) {
    this.canvas = canvas
    this.scene = null
    this.camera = null
    this.renderer = null

    this.modelManager = null
    this.modelsPathType = new Array()
    this.load = false

    this.hud = null

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
    this.camera = new PerspectiveCamera(90, aspect, 0.01, 1000)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.camera.position.set(-300, 200, 100)
    this.camera.lookAt(0, 0, 0)

    this.modelManager = new ModelsManager()
    this.modelManager.init()

    this.modelManager.loadHdr('src/assets/textures/Background/hdri/', 'studio_small_08_1k.hdr', this.scene, this.render)

    //this.modelsPathType['src/assets/models/Car/fbx/Configurateur_VoitureExterieur_v05.fbx'] = [MODEL_TYPE.FBX, 0]
    this.modelsPathType[0] = ['src/assets/models/Plants/gltf/Configurator_Aglaomene_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[1] = ['src/assets/models/Plants/gltf/Configurator_Bambou_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[2] = ['src/assets/models/Plants/gltf/Configurator_Clorophytum_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[3] = ['src/assets/models/Plants/gltf/Configurator_Clorophytum02_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[4] = ['src/assets/models/Plants/gltf/Configurator_Eucalyptus_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[5] = ['src/assets/models/Plants/gltf/Configurator_FicusRoberta_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[6] = ['src/assets/models/Plants/gltf/Configurator_Gerbera_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[7] = ['src/assets/models/Plants/gltf/Configurator_Monstera_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[8] = ['src/assets/models/Plants/gltf/Configurator_Monstera02_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[9] = ['src/assets/models/Plants/gltf/Configurator_Paquerette_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[10] = ['src/assets/models/Plants/gltf/Configurator_Planteserpent_V02.gltf', MODEL_TYPE.GLTF]

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
    //this.renderer.render(this.hud.scene, this.camera)
    //this.renderer.render(this.hud.scene, this.hud.camera)
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this))
    if((this.modelManager.models.length == this.modelsPathType.length) && (this.load == false)) {
      for (let i = 0; i < this.modelManager.models.length; i++) {
        this.modelManager.models[i].model.position.set(50*i, 0, 0)
        this.scene.add(this.modelManager.models[i].model)
      }
      this.load = true
    }

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

  // Run app, load things, add listeners, ...
  run() {
    console.log("App run")
    this.animate()
  }

  // Memory management
  destroy() {
    this.scene = null
    this.camera = null
    this.renderer = null
    this.canvas = null
    this.hud = null
    this.load = false
  }
}
