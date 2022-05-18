import {Scene, WebGLRenderer, PerspectiveCamera, DirectionalLight, Raycaster, Vector2, Vector3, MeshStandardMaterial} from "three";
import {HUD} from "./HUD";
import {Car} from "./Car";
import {ModelsSingelton, MODELS} from "./ModelsSingelton";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { Plants } from "./Plants";

export class Landing {
  constructor(canvas) {
    this.canvas = canvas
    this.scene = null
    this.camera = null
    this.renderer = null

    this.load = false
    this.car = null
    this.raycaster = null
    this.pointer = null
    this.intersects = null
    this.intersect_Z1 = null              //Last intersect object
    this.materialIntersect_Z1 = null      //to save the material of the last intersect

    this.scrollTrigger = new Array()


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

    this.camera.position.set(10, 3, 0)
    this.camera.lookAt(0, 0, 0)

    this.raycaster = new Raycaster()
    this.pointer = new Vector2()
  }

  addScrollTrigger(scrollTrigger) {
    this.scrollTrigger.push(scrollTrigger)
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
    for(let i = 0; i < ModelsSingelton.getInstance().getModelManager().models.length; i++) {
      if(ModelsSingelton.getInstance().getModelManager().models[i] != null) {
        if((i == MODELS.Car) && (this.car == null)) {
          this.car = new Car(ModelsSingelton.getInstance().getModelManager().models[MODELS.Car].model.clone())
          this.car.model.animations = ModelsSingelton.getInstance().getModelManager().models[MODELS.Car].model.animations
          this.car.model.scale.set(0.01, 0.01, 0.01)
          this.car.model.rotation.y = ((Math.PI * -(3/4)))
          this.scene.add(this.car.model)
          this.load = true
        }
      }
    }
    //if the load is not finished, we recheck 10ms later
    if(this.load == false) {
      setTimeout(function() {this.updateModelsLoad()}.bind(this),10);
    }
  }

  onScroll(event) {
      //console.log("Scrool")
      console.log(this.scrollTrigger[0].start)
      console.log(window.scrollY)
      if((this.scrollTrigger[0].end - this.scrollTrigger[0].start) < window.scrollY) {
        this.car.model.position.z -= window.scrollY / 10000
        this.car.model.rotation.y -= window.scrollY / 10000
      }
      else if((this.scrollTrigger[1].end - this.scrollTrigger[1].start) < window.scrollY) {
        this.car.model.position.z += window.scrollY / 10000
        this.car.model.rotation.y += window.scrollY / 10000
      }
      else if((this.scrollTrigger[2].end - this.scrollTrigger[2].start) < window.scrollY) {
        this.car.model.position.z -= window.scrollY / 10000
        this.car.model.rotation.y -= window.scrollY / 10000
      }
  }

  // Run app, load things, add listeners, ...
  run() {
    console.log("App run")

    window.addEventListener('scroll', (event) => {this.onScroll(event);});

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
    this.pointer = null
    this.raycaster = null
    this.car.dispose()
    this.car = null
    this.intersects = null
    this.intersect_Z1 = null  
    this.materialIntersect_Z1 = null  
    this.scrollTrigger = null
  }
}
