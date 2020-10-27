import DataManager from '../DataManager'
import Player from './Player'
import {PLAYER_STATE} from '../enums/index'
import ResourceManager from '../runtime/ResourceManager'
import Animator from '../base/Animator'

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

  // 将播放中的帧绘制到canvas上
  render(ctx) {
    const {
      x,
      y,
      width,
      height,
      state,
      direction
    } = Player.Instance

    const image = this.animation[state][direction][this.index]
	  if(image){
		  ctx.drawImage(
			  image,
			  (x * 32) + this.offset.width - 32 - 15,
			  (y * 32) + this.offset.height - 32 - 18,
			  width,
			  height
		  )
	  }
  }

  // 播放预定的帧动画
  playAnimation(index = 0, loop = false) {

    // 动画播放的时候精灵图不再展示，播放帧动画的具体帧
    // this.visible = false
    const {
      state,
      direction
    } = Player.Instance
    const currentList = this.animation[state][direction]

    this.isPlaying = true
    this.loop = loop

    this.index = index

    if (this.interval > 0 && currentList.length) {
      this.timer = setInterval(
        this.frameLoop.bind(this),
        this.interval
      )
    }
  }

  // 帧遍历
  frameLoop() {
    const {
      state,
      direction
    } = Player.Instance
    const currentList = this.animation[state][direction]

    this.index++
    // console.log(state, direction)
    if (this.index > currentList.length - 1) {
      if (state === PLAYER_STATE.TURNLEFT || state === PLAYER_STATE.TURNRIGHT) {
        this.resetIndex()
        Player.Instance.state = PLAYER_STATE.IDLE
      }
      if (this.loop) {
        this.resetIndex()
      } else {
        this.index--
        this.stop()
      }
    }
  }
}
