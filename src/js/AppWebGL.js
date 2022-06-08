import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  DirectionalLight,
  Raycaster,
  Vector2,
  MeshStandardMaterial,
  MeshBasicMaterial,
  EquirectangularReflectionMapping,
  sRGBEncoding,
  Mesh,
  Color,
  DoubleSide,
  SphereGeometry, ShaderMaterial, InstancedMesh, Matrix4, Vector3, Object3D
} from "three";
import {ModelsSingelton, MODELS, HDRI, MODELS_OFFSET_PLANT} from "./ModelsSingelton";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {TWEEN} from 'three/examples/jsm/libs/tween.module.min'
import {Car} from "./Car";
import {Plants} from "./Plants";

import p_fragment from "../assets/shaders/pollution_fragment.glsl?raw"
import p_vertex from "../assets/shaders/pollution_vertex.glsl?raw"

import {useStore} from "./stores/global";
import {pinia} from "../main";

export class AppWebGL {
  constructor(canvas) {
    this.store = useStore(pinia)

    this.canvas = canvas
    this.scene = null
    this.camera = null
    this.renderer = null

    this.load = false
    this.car = null
    this.plantSelected = null
    this.hdri = null
    this.raycaster = null
    this.pointer = null
    this.intersects = null
    this.intersect_Z1 = null              //Last intersect object
    this.intersectClone = null

    this.clouds = null
    this.cloudsCount = 20

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
    //this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.outputEncoding = sRGBEncoding;

    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))

    const gl = this.renderer.getContext()
    const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
    this.camera = new PerspectiveCamera(50, aspect, 0.1, 2000)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = false;
    this.controls.enablePan = false;
    //this.controls.enableZoom = false;
    this.controls.maxPolarAngle = (Math.PI / 7) * 3
    this.controls.minPolarAngle = (Math.PI / 8) * 2
    this.controls.maxDistance = 700
    this.controls.minDistance = 400

    this.dirLight1 = new DirectionalLight(0xffffff, 0.5)
    this.dirLight1.color.setHSL(0.1, 1, 0.95);
    this.dirLight1.position.set(-600, 300, 200)
    this.dirLight2 = new DirectionalLight(0xffffff, 0.5)
    this.dirLight2.color.setHSL(0.1, 1, 0.95);
    this.dirLight2.position.set(-600, 300, -200)
    this.dirLight3 = new DirectionalLight(0xffffff, 0.5)
    this.dirLight3.color.setHSL(0.1, 1, 0.95);
    this.dirLight3.position.set(600, 300, 200)
    this.dirLight4 = new DirectionalLight(0xffffff, 0.5)
    this.dirLight4.color.setHSL(0.1, 1, 0.95);
    this.dirLight4.position.set(600, 300, -200)
    this.scene.add(this.dirLight1)
    this.scene.add(this.dirLight2)
    this.scene.add(this.dirLight3)
    this.scene.add(this.dirLight4)

    this.camera.position.set(-470, 190, 502)
    this.camera.rotation.set(0, 0.03, 0.06)
    this.camera.lookAt(0, 0, 0)

    this.smog()

    this.raycaster = new Raycaster()
    this.pointer = new Vector2()
  }

  //Left click to add a plant
  onPointerClickLeft(event) {
    console.log('onPointerClickLeft canvas')
    if (this.store.activeStepIndex >= 0 && this.store.activeStepIndex <= 3) {
      let slotName = ""
      let slotNameTemp = ""

      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.pointer, this.camera)
      this.intersects = this.raycaster.intersectObjects(this.scene.children)

      for (let i = 0; i < this.intersects.length; i++) {
        slotName = this.intersects[i].object.name
        //if (slotName.startsWith("Slot_") && slotName.includes(this.store.configSteps[this.store.activeStepIndex])) {
        //if((this.car.plants[slotName] == null || this.car.plants[slotName].model == null) && this.plantSelected != null) {
        if ((slotName.startsWith("Slot_"))
          && ((slotName.includes(this.store.activeStep)) || (this.store.activeStep == "Trunk" && slotName.includes("BackRocker")))
        ) {
          if (this.plantSelected != null) {
            let previousPlant = null
            if (this.car.plants[slotName] != null) {
              if (this.car.plants[slotName].model != null) {
                previousPlant = this.car.plants[slotName].data.name
                this.intersects[i].object.remove(this.car.plants[slotName].model)
                this.car.plants[slotName].dispose()
              }

            }
            let model = ModelsSingelton.getInstance().getModelManager().models[MODELS_OFFSET_PLANT + this.plantSelected.index].model.clone()
            if ((this.store.activeStepIndex == 2)
              && (ModelsSingelton.getInstance().getModelManager().models[MODELS_OFFSET_PLANT + this.plantSelected.index].altModel.length > 0)) {
              model = ModelsSingelton.getInstance().getModelManager().models[MODELS_OFFSET_PLANT + this.plantSelected.index].altModel[0].clone()
            }

            this.car.addPlant(new Plants(model.clone(), this.plantSelected), slotName, previousPlant)
            this.intersects[i].object.attach(this.car.plants[slotName].model)
            this.car.plants[slotName].model.position.set(0, 0, 0)
            this.car.plants[slotName].model
            //console.log(this.car.plants[slotName].model)
            if (this.store.activeStepIndex == 2) {
              this.car.plants[slotName].model.rotation.x = (2 * Math.PI) / 3
              slotNameTemp = slotName.replace("Right", "Left")
              this.car.addPlant(new Plants(model.clone(), this.plantSelected), slotNameTemp)
              this.car.model.traverse((child) => {
                if (child.name == slotNameTemp) {
                  this.car.plants[slotNameTemp].model.rotation.x = Math.PI / 4
                  this.car.plants[slotNameTemp].model.rotation.y = Math.PI
                  child.attach(this.car.plants[slotNameTemp].model)
                  return
                }
              })
              this.car.plants[slotNameTemp].model.position.set(0, 0, 0)
              this.car.plants[slotNameTemp].model
            }
          } else {
            alert("Veuillez séléctionner une plante")
          }
        }
      }
    }
  }

  //right click to delete a plant
  onPointerClickRight(event) {
    event.preventDefault();         //to disable context menu 
    if (this.store.activeStepIndex >= 0 && this.store.activeStepIndex <= 3) {
      let slotName = ""
      let slotNameTemp = ""

      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.pointer, this.camera)
      this.intersects = this.raycaster.intersectObjects(this.scene.children)

      for (let i = 0; i < this.intersects.length; i++) {
        slotName = this.intersects[i].object.name
        //if (slotName.startsWith("Slot_") && slotName.includes(this.store.configSteps[this.store.activeStepIndex])) {
        if ((slotName.startsWith("Slot_"))
          && ((slotName.includes(this.store.activeStep)) || (this.store.activeStep == "Trunk" && slotName.includes("BackRocker")))
        ) {
          if (this.car.plants[slotName] != null || this.car.plants[slotName].model != null) {
            this.intersects[i].object.remove(this.car.plants[slotName].model)
            this.car.removePlant(slotName)
            if (this.store.activeStepIndex == 2) {
              slotNameTemp = slotName.replace("Right", "Left")
              this.car.model.traverse((child) => {
                if (child.name == slotNameTemp) {
                  child.remove(this.car.plants[slotNameTemp].model)
                  return
                }
              })
              this.car.removePlant(slotNameTemp)
            }
          }
        }
      }
    }
  }

  //Get mouse position on movement
  onPointerMove(event) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  //Call in render, use to highlight slots
  raycasterUpdate() {
    let indexTemp = -1
    this.raycaster.setFromCamera(this.pointer, this.camera);

    const intersects = this.raycaster.intersectObjects(this.scene.children);

    if (intersects.length > 0) {
      for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.name.startsWith("Slot_")) {
          indexTemp = i;
        }
      }
      if (indexTemp != -1) {
        if (this.intersect_Z1 != intersects[indexTemp].object) {
          if (this.intersect_Z1 != null) {
            if (this.intersect_Z1.name.startsWith("Slot_")) {
              this.intersect_Z1.remove(this.intersectClone)
              this.intersectClone = null
            }
          }
          //if (intersects[indexTemp].object.name.startsWith("Slot_")) {
          const name = intersects[indexTemp].object.name
          if ((name.startsWith("Slot_"))
            && ((name.includes(this.store.activeStep)) || (this.store.activeStep == "Trunk" && name.includes("BackRocker")))
          ) {
            //Create a clone object to save the original 
            this.intersectClone = intersects[indexTemp].object.clone()
            //Remove all childs on the slot clone (like plants)
            if (this.intersectClone.children.length > 0) {
              for (var i = this.intersectClone.children.length - 1; i >= 0; i--) {
                this.intersectClone.remove(this.intersectClone.children[i]);
              }
            }
            this.intersectClone.name = "Clone_" + this.intersectClone.name
            if (this.intersectClone.name.includes("BackRockerPanel")) {
              this.intersectClone.position.set(0.02, 0, 0)
              this.intersectClone.rotation.set(0, 0, 0)
            } else {
              this.intersectClone.position.set(0, 0, 0.02)
              this.intersectClone.rotation.set(0, 0, 0)
            }

            this.intersectClone.material = new MeshStandardMaterial({color: 0x00ff00, opacity: 0.5, transparent: true});
            intersects[indexTemp].object.add(this.intersectClone)
          }
        }
        this.intersect_Z1 = intersects[indexTemp].object
      }

    } else {
      if (this.intersect_Z1 != null) {
        if (this.intersect_Z1.name.startsWith("Slot_")) {
          this.intersect_Z1.remove(this.intersectClone)
          this.intersectClone = null
        }
        this.intersect_Z1 = null
      }
    }

  }

  // fog
  smog() {
    const vertexShader = p_vertex
    const fragmentShader = p_fragment

    const geometry = new SphereGeometry(150, 80, 80)
    const material = new ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        anglePower: {
          value: 6
        },
        lightColor: {
          value: new Color(0x333333)
        },
        attenuation: {
          value: 3
        }
      },
      side: DoubleSide,
      // Sympa pour donner un effet clair au milieu
      // blending    : AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    //console.log("Material : ")
    //console.log(material)

    this.clouds = new InstancedMesh(geometry, material, this.cloudsCount);
    this.scene.add(this.clouds)

    let dummy = new Object3D();

    for (let p = 0; p < this.cloudsCount; p++) {
      dummy.position.set(Math.random() * 600 - 300, Math.random() * 300, Math.random() * 600 - 300)
      dummy.updateMatrix()
      this.clouds.setMatrixAt(p, dummy.matrix)
      this.clouds.instanceMatrix.needsUpdate = true;
      this.clouds.frustumCulled = false
      this.clouds.castShadow = false;
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
    TWEEN.update()
    // Update ...
    if (this.resizeRendererToDisplaySize()) {
      const gl = this.renderer.getContext()
      this.camera.aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
      this.camera.updateProjectionMatrix()
    }
    this.camera.lookAt(0, 0, 0)

    // Remove fog
    for (let i = 0; i <= this.cloudsCount; i++) {
      if (this.store.rates.co2 > i * (80 / this.cloudsCount)) {
        this.updateMatrix(i)
      }
    }

    // Render ...
    this.render()
  }

  updateMatrix(p) {
    let scale = new Vector3()
    let matrix = new Matrix4()
    this.clouds.getMatrixAt(p, matrix);
    matrix.makeScale(0, 0, 0)
    this.clouds.setMatrixAt(p, matrix)
    this.clouds.instanceMatrix.needsUpdate = true;
  }

  // this function execute while all model isn't load
  updateModelsLoad() {
    for (let i = 0; i < ModelsSingelton.getInstance().getModelManager().models.length; i++) {
      if (ModelsSingelton.getInstance().getModelManager().models[i] != null) {
        if ((i == MODELS.Car) && (this.car == null)) {
          this.car = new Car(ModelsSingelton.getInstance().getModelManager().models[MODELS.Car].model.clone())
          this.car.model.animations = ModelsSingelton.getInstance().getModelManager().models[MODELS.Car].model.animations
          this.car.model.position.x -= 100
          this.scene.add(this.car.model)
          this.updateSteps(0)            //to animate camera on start
          console.log(ModelsSingelton.getInstance().getModelManager().models)
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
      //this.scene.background = this.hdri;
      this.scene.environment = this.hdri;
      //this.render();
    }

    //if the load is not finished, we recheck 10ms later
    if (this.load == false) {
      setTimeout(function () {
        this.updateModelsLoad()
      }.bind(this), 10);
    }
  }

  updateSteps(index) {
    let pos = null;
    switch (index) {
      case 0 :
        pos = this.car.model.children[4].position
        break;
      case 1 :
        pos = this.car.model.children[2].position
        break;
      case 2 :
        pos = this.car.model.children[3].position
        break;
      case 3 :
        pos = this.car.model.children[1].position
        break;
      case 4 :
        pos = this.car.model.children[5].position
        break;
    }
    if (pos != null) {
      let coords = this.camera.position
      this.controls.enabled = false;
      new TWEEN.Tween(coords)
        .to({
            x: pos.x,
            y: pos.y,
            z: pos.z
          },
          3000)
        .easing(TWEEN.Easing.Quartic.InOut)
        .onComplete(() => {
          if (index == 4) {
            this.controls.enabled = true;
          }
        })
        .onUpdate(() => {
          this.camera.position.set(coords.x, coords.y, coords.z)
        })
        .start()
    }

  }

  updatePlantSelected(plant) {
    this.plantSelected = plant
  }

  // Run app, load things, add listeners, ...
  run() {
    console.log("App run")

    this.animate()
    this.updateModelsLoad()

    // TODO: clickRight remove, not clear
    this.canvas.addEventListener('mouseup', (event) => this.onPointerClickLeft(event))
    //this.canvas.addEventListener('contextmenu', (event) => this.onPointerClickRight(event));
    this.canvas.addEventListener('mousemove', (event) => this.onPointerMove(event));

    window.onselectstart = function () {
      return false
    };        //disbale selection text for drag and drop
    window.onmousedown = function () {
      return false
    };          //disbale selection text for drag and drop
  }

  // Memory management
  destroy() {
    this.canvas.removeEventListener('mouseup', (event) => this.onPointerClickLeft(event))
    //this.canvas.removeEventListener('contextmenu', (event) => this.onPointerClickRight(event));
    this.canvas.removeEventListener('mousemove', (event) => this.onPointerMove(event));


    this.scene = null
    this.camera = null
    this.renderer = null
    this.canvas = null
    this.load = false
    this.pointer = null
    this.raycaster = null
    this.car.dispose()
    this.car = null
    this.plantSelected = null
    this.intersects = null
    this.intersect_Z1 = null
    this.intersectClone = null
    this.hdri.dispose()
    this.hdri = null
  }
}
