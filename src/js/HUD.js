import {
  MeshBasicMaterial,
  DoubleSide,
  OrthographicCamera,
  Color,
  Mesh,
  PlaneBufferGeometry,
  Scene,
  CanvasTexture,
  Vector2,
  BoxGeometry, CameraHelper, PlaneGeometry
} from "three"
import {CSS3DObject} from "three/examples/jsm/renderers/CSS3DRenderer";

export class HUD {
  constructor(app, width, height) {
    this.app = app

    width = typeof width === "number" ? width : 600
    height = typeof height === "number" ? height : 200
    this.size = new Vector2(width, height)

    this.scene = null
    this.camera = null

    this.plantsSelector = null

    this.init()
  }

  init() {
    console.log('Init HUD')
    this.scene = new Scene()

    const camSize = new Vector2(this.app.canvas.width, this.app.canvas.height)
    //this.camera = new OrthographicCamera(-camSize.x / 2, camSize.x / 2, camSize.y / 2, -camSize.y / 2, 0, 10)
    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
    this.camera.position.set(0, 0, 5)
    this.camera.lookAt(0, 0, 0)
    this.helper = new CameraHelper(this.camera);
    this.scene.add(this.helper);

    const geometry = new BoxGeometry( 1, 1, 1 );
    const material = new MeshBasicMaterial( {color: 0x00ff00} );
    const cube = new Mesh( geometry, material );
    cube.position.set(0, 0, 0)
    //this.scene.add(cube)

    //this.createPlantsSelector()
  }

  createPlantsSelector() {
    const element = document.createElement('div')
    element.style.height = '50px';
    element.style.width = '70%';
    element.style.background = new Color(0xffffff).getStyle();

    this.plantsSelector = new CSS3DObject(element);
    this.plantsSelector.position.set(0, 0, 0)
    this.scene.add(this.plantsSelector);

    const geometry = new PlaneGeometry(100, 100);
    const mesh = new Mesh(geometry, material);
    mesh.position.copy(object.position);
    mesh.rotation.copy(object.rotation);
    mesh.scale.copy(object.scale);
    this.scene.add(mesh);
  }

  destroy() {
    this.plantsSelector = null
    this.camera = null
    this.scene = null
  }
}
