import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  DirectionalLight,
  Raycaster,
  Vector2,
  Vector3,
  Box3,
  Clock,
  AnimationMixer,
  EquirectangularReflectionMapping
} from "three";
import {Car} from "./Car";
import {ModelsSingelton, MODELS, HDRI, MODELS_OFFSET_PLANT} from "./ModelsSingelton";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Plants} from "./Plants";
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'

import {useStore} from "./stores/global";
import {pinia} from "../main";

export class Landing {
  constructor(canvas) {
    this.canvas = canvas
    this.scene = null
    this.camera = null
    this.renderer = null

    this.load = false
    this.car = null
    this.clock = null
    this.wheelsAnimation = null
    this.carMixer = null
    this.carAction = null
    this.hdri = null
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

    this.clock = new Clock()

    const gl = this.renderer.getContext()
    const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
    this.camera = new PerspectiveCamera(50, aspect, 0.01, 2000)

    this.dirLight1 = new DirectionalLight(0xffffff, 1)
    this.dirLight1.position.set(-600, 300, 200)
    this.dirLight2 = new DirectionalLight(0xffffff, 1)
    this.dirLight2.position.set(-600, 300, -200)
    this.dirLight3 = new DirectionalLight(0xffffff, 1)
    this.dirLight3.position.set(600, 300, 200)
    this.dirLight4 = new DirectionalLight(0xffffff, 1)
    this.dirLight4.position.set(600, 300, -200)
    this.scene.add(this.dirLight1)
    this.scene.add(this.dirLight2)
    this.scene.add(this.dirLight3)
    this.scene.add(this.dirLight4)

    //this.camera.position.set(-600, 200, 0)
    this.camera.position.set(-500, 200, -500)
    //this.camera.rotateY(-(2*Math.PI/2))
    //this.camera.rotateX(-(Math.PI/12))
    this.camera.lookAt(0, 70, 0)

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
    TWEEN.update()
    if(this.car != null) {
      //this.car.model.position.z += 1
      //this.car.model.rotation.y -= Math.PI / 200
    }

    // Update ...
    if (this.resizeRendererToDisplaySize()) {
      const gl = this.renderer.getContext()
      this.camera.aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
      this.camera.updateProjectionMatrix()
    }
    const delta = this.clock.getDelta();
    if ( this.carMixer ) this.carMixer.update( delta );

    // Render ...
    this.render()
  }

  // this function execute while all model isn't load
  updateModelsLoad() {
    for (let i = 0; i < ModelsSingelton.getInstance().getModelManager().models.length; i++) {
      if (ModelsSingelton.getInstance().getModelManager().models[i] != null) {
        if ((i == MODELS.Car) && (this.car == null)) {
          this.car = new Car(ModelsSingelton.getInstance().getModelManager().models[MODELS.Car].model.clone())
          this.car.model.animations = ModelsSingelton.getInstance().getModelManager().models[MODELS.Car].model.animations
          this.carMixer = new AnimationMixer( this.car.model );
          this.wheelsAnimation = this.car.model.animations[1]
          this.carAction = this.carMixer.clipAction(this.wheelsAnimation)
          //this.car.model.rotation.y = Math.PI / 4
          this.car.model.position.set(1200, 0, 0)
          //this.car.model.position.set(400, -60, 0)
          const pos = new Vector3(-130, 0, 0)
          let coords = this.car.model.position
          this.carAction.play()
          new TWEEN.Tween(coords)
                  .to({
                      x: pos.x,
                      y: pos.y,
                      z: pos.z
                    },
                      3000)
                  .easing(TWEEN.Easing.Quintic.Out)
                  .onComplete(() => {
                    this.carAction.stop()
                  })
                  .onUpdate(() => {
                    this.car.model.position.set(coords.x, coords.y, coords.z)
                  })
                  .start()
          this.scene.add(this.car.model)
        }

        if ((ModelsSingelton.getInstance().getModelsPathType().length == ModelsSingelton.getInstance().getModelManager().models.length)
          && (ModelsSingelton.getInstance().getModelManager().hdri.length == 1)) {
          this.load = true
        }
      }
    }
    //Add hdri
    if (this.hdri == null && (ModelsSingelton.getInstance().getModelManager().hdri.length == 1)) {
      this.hdri = ModelsSingelton.getInstance().getModelManager().hdri[HDRI.Studio].clone()
      this.hdri.mapping = EquirectangularReflectionMapping;
      this.scene.background = this.hdri.renderTarget;           //.renderTarget use to hide hdri in background
      this.scene.environment = this.hdri;
      //render();
    }

    //if the load is not finished, we recheck 10ms later
    if (this.load == false) {
      setTimeout(function () {
        this.updateModelsLoad()
      }.bind(this), 10);
    }
  }

  updateSection(index) {
    console.log("updateSteps : " + index)
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
    this.car = null
    this.clock = null
    this.wheelsAnimation = null
    this.carMixer = null
    this.carAction = null
    this.hdri.dispose()
    this.hdri = null
  }
}
