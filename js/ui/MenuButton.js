import Button from './Button'
import SceneManager from '../scene/SceneManager'
import MainMenuScene from '../scene/MainMenuScene'

const IMG_PREFIX = 'images/ctrl/ctrl'

const START_BUTTON_WIDTH = 50
const START_BUTTON_HEIGHT = 60

const SCREEN_WIDTH = window.innerWidth
const SCREEN_HEIGHT = window.innerHeight

/***
 * 游戏开始按钮
 */
export default class MenuButton extends Button {
  constructor() {
    const imgSrc = `${IMG_PREFIX} (${10}).png`
    super(imgSrc)
  }

  init() {
    this.position = {
      startX: SCREEN_WIDTH / 2 + 60,
      startY: 20,
      endX: SCREEN_WIDTH / 2 + 60 + START_BUTTON_WIDTH,
      endY: 20 + START_BUTTON_HEIGHT,
      width: START_BUTTON_WIDTH,
      height: START_BUTTON_HEIGHT
    }
    this.touchHandler = this.touchEventHandler.bind(this)
  }

  onClick() {
    SceneManager.Instance.setScene(new MainMenuScene(SceneManager.Instance))
  }
}