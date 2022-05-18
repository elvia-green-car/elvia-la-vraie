import {Scene, WebGLRenderer, PerspectiveCamera, DirectionalLight, Raycaster, Vector2, Vector3, MeshStandardMaterial} from "three";
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
    this.raycaster = null
    this.pointer = null
    this.intersects = null
    this.intersect_Z1 = null              //Last intersect object
    this.materialIntersect_Z1 = null      //to save the material of the last intersect


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

    this.raycaster = new Raycaster()
    this.pointer = new Vector2()

    this.modelManager = new ModelsManager()
    this.modelManager.init()

    this.modelManager.loadHdr('assets/textures/Background/hdri/', 'studio_small_08_1k.hdr', this.scene, this.render)

    this.modelsPathType[MODELS.Car] = ['assets/models/Car/fbx/Configurateur_VoitureExterieur_v08.fbx', MODEL_TYPE.FBX]
    this.modelsPathType[MODELS.Plant_Aglaomene] = ['assets/models/Plants/gltf/Configurator_Aglaomene_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_Bambou] = ['assets/models/Plants/gltf/Configurator_Bambou_V03.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_Clorophytum] = ['assets/models/Plants/gltf/Configurator_Chlorophytum_V03.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_Clorophytum02] = ['assets/models/Plants/gltf/Configurator_Clorophytum02_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_Eucalyptus] = ['assets/models/Plants/gltf/Configurator_Eucalyptus_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_FicusRoberta] = ['assets/models/Plants/gltf/Configurator_FicusRoberta_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_Gerbera] = ['assets/models/Plants/gltf/Configurator_Gerbera_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_Monstera] = ['assets/models/Plants/gltf/Configurator_Monstera_V04.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_Monstera02] = ['assets/models/Plants/gltf/Configurator_Monstera02_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_Paquerette] = ['assets/models/Plants/gltf/Configurator_Paquerette_V02.gltf', MODEL_TYPE.GLTF]
    this.modelsPathType[MODELS.Plant_Planteserpent] = ['assets/models/Plants/gltf/Configurator_Planteserpent_V02.gltf', MODEL_TYPE.GLTF]

    this.modelManager.load(this.modelsPathType)
  }

  //Left click to add a plant
  onPointerClickLeft( event ) {
    let slotName = ""

    this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    this.raycaster.setFromCamera( this.pointer, this.camera )
    this.intersects = this.raycaster.intersectObjects( this.scene.children )

    for ( let i = 0; i <  this.intersects.length; i ++ ) {
      slotName =  this.intersects[ i ].object.name
      if(slotName.startsWith("Slot_")) {
        if(this.car.plants[slotName] == null || this.car.plants[slotName].model == null) {
          this.car.addPlant(new Plants(this.modelManager.models[MODELS.Plant_Monstera].model.clone()), slotName)       
          this.intersects[ i ].object.attach(this.car.plants[slotName].model)
          this.car.plants[slotName].model.position.set(0,0,0)
          this.car.plants[slotName].model
        }
      }
    }
  }

  //right click to delete a plant
  onPointerClickRight( event ) {
    let slotName = ""

    this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    this.raycaster.setFromCamera( this.pointer, this.camera )
    this.intersects = this.raycaster.intersectObjects( this.scene.children )

    for ( let i = 0; i <  this.intersects.length; i ++ ) {
      slotName =  this.intersects[ i ].object.name
      if(slotName.startsWith("Slot_")) {
        if(this.car.plants[slotName] != null || this.car.plants[slotName].model != null) {
          this.intersects[ i ].object.remove(this.car.plants[slotName].model)
          this.car.plants[slotName].dispose()
        }
      }
    }
  }

  //Get mouse position on movement
  onPointerMove( event ) {
    this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  //Call in render, use to highlight slots
  raycasterUpdate() {
    let indexTemp = -1
    this.raycaster.setFromCamera( this.pointer, this.camera );

    const intersects = this.raycaster.intersectObjects( this.scene.children );

    if(intersects.length > 0) {
      intersects.forEach(intersect => {
        if(intersect.object.name != null) {
          if(intersect.object.name.startsWith("Slot_")) {
            return
          }
        }
        indexTemp++
      });
      if(indexTemp != -1){
        if(this.intersect_Z1 != intersects[ indexTemp ].object) {
          if(this.intersect_Z1 != null) {
            if(this.intersect_Z1.name.startsWith("Slot_")) {
              this.intersect_Z1.material = this.materialIntersect_Z1;
            }
          }
          if(intersects[ indexTemp ].object.name.startsWith("Slot_")) {
            this.materialIntersect_Z1 = intersects[ indexTemp ].object.material
            intersects[ indexTemp ].object.material = new MeshStandardMaterial({color: 0x00ff00});
          }
        }
        this.intersect_Z1 = intersects[ indexTemp ].object
      }
      
    }
    else {
      if(this.intersect_Z1 != null) {
        if(this.intersect_Z1.name.startsWith("Slot_")) {
          this.intersect_Z1.material = this.materialIntersect_Z1;
        }
        this.intersect_Z1 = null
      }
    }
    
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
    this.raycasterUpdate()
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
    for(let i = 0; i < this.modelManager.models.length; i++) {
      if(this.modelManager.models[i] != null) {
        if((i == MODELS.Car) && (this.car == null)) {
          this.car = new Car(this.modelManager.models[MODELS.Car].model.clone())
          this.car.model.animations = this.modelManager.models[MODELS.Car].model.animations
          this.scene.add(this.car.model)
        }

        if(this.modelsPathType.length == this.modelManager.models.length) {
          this.load = true
        }
      }
    }
    //if the load is not finished, we recheck 10ms later
    if(this.load == false) {
      setTimeout(function() {this.updateModelsLoad()}.bind(this),10);
    }
  }

  // Run app, load things, add listeners, ...
  run() {
    console.log("App run")

    this.animate()
    this.updateModelsLoad()

    this.canvas.addEventListener('click', (event) => {this.onPointerClickLeft(event);});
    this.canvas.addEventListener('contextmenu', (event) => {this.onPointerClickRight(event);});
    this.canvas.addEventListener('mousemove', (event) => {this.onPointerMove(event);});
  }

  // Memory management
  destroy() {
    this.scene = null
    this.camera = null
    this.renderer = null
    this.canvas = null
    this.load = false
    this.pointer = null
    this.raycaster = null
    this.car.dispose()
    this.car = null
    this.intersects = null
    this.intersect_Z1 = null  
    this.materialIntersect_Z1 = null  
  }
}
