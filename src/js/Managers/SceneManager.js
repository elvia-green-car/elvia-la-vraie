/**
 * Manage scenes
 * - Car
 * - HUD
 * - Pop-up
 */

class SceneManager {
  constructor() {
    this.carScene = null
    this.hudScene = null
    this.popupScene = null
  }
  init() {

    this.hudScene = new HUD()
  }
}