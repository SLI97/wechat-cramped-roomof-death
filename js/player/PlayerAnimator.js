import DataManager from '../runtime/DataManager'
import Player from './Player'
import {PLAYER_STATE} from '../enums/index'
import ResourceManager from '../runtime/ResourceManager'
import Animator from '../base/Animator'
import CanvasManager from '../runtime/CanvasManager'

const IMG_IDLE_PREFIX = 'images/idle/idle'
const IMG_TURN_PREFIX = 'images/turn/turn'


export default class PlayerAnimator extends Animator{
  constructor() {
  	super()
    this.initFrames()
    this.playAnimation(0, true)
  }

  initFrames() {
    this.animation = {}

    for (const key in PLAYER_STATE) {
      if (PLAYER_STATE.hasOwnProperty(key)) {
        this.animation[key] = []
      }
    }

    const idleOrder = ['BOTTOM', 'RIGHT', 'TOP', 'LEFT']
    idleOrder.forEach((item, index) => {
      this.animation[PLAYER_STATE.IDLE][item] = []
      const offset = index * 4
      for (let i = 0; i < 4; i++) {
      	const image = ResourceManager.Instance.getImageMap().get(`${IMG_IDLE_PREFIX} (${i + 1 + offset}).png`)
        this.animation[PLAYER_STATE.IDLE][item][i] = image
      }
    })

    const turnLeftOrder = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT']
    turnLeftOrder.forEach((item, index) => {
      this.animation[PLAYER_STATE.TURNLEFT][item] = []
      const offset = index * 3
      for (let i = 0; i < 3; i++) {
	      const image = ResourceManager.Instance.getImageMap().get(`${IMG_TURN_PREFIX} (${i + 1 + offset}).png`)
	      this.animation[PLAYER_STATE.IDLE][item][i] = image
      }
    })

    const turnRightOrder = ['BOTTOM', 'LEFT', 'TOP', 'RIGHT']
    turnRightOrder.forEach((item, index) => {
      this.animation[PLAYER_STATE.TURNRIGHT][item] = []
      const offset = index * 3 + 12
      for (let i = 0; i < 3; i++) {
	      const image = ResourceManager.Instance.getImageMap().get(`${IMG_TURN_PREFIX} (${i + 1 + offset}).png`)
	      this.animation[PLAYER_STATE.IDLE][item][i] = image
      }
    })
  }
}
