import Sprite from "../base/sprite"
import {
  CONTROLLER_ENUM
} from '../enums/index'

const IMG_PREFIX = 'images/ctrl/ctrl'
const CTRL_WIDTH = 48
const CTRL_HEIGHT = 48

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export default class Controller {
  constructor(player) {

    this.buttonList = []
    this.player = player

    this.initButton()
    this.initBind()
  }

  initButton() {
    const turnLeftButton = new Button(CONTROLLER_ENUM.TURNLEFT, 1, this.player)
    const leftButton = new Button(CONTROLLER_ENUM.LEFT, 2, this.player, )
    const topButton = new Button(CONTROLLER_ENUM.TOP, 3, this.player)
    const bottomButton = new Button(CONTROLLER_ENUM.BOTTOM, 4, this.player)
    const turnRightButton = new Button(CONTROLLER_ENUM.TURNRIGHT, 5, this.player)
    const rightButton = new Button(CONTROLLER_ENUM.RIGHT, 6, this.player)
    this.buttonList = [
      turnLeftButton,
      leftButton,
      topButton,
      bottomButton,
      turnRightButton,
      rightButton,
    ]
  }

  initBind() {
    this.touchHandler = this.touchEventHandler.bind(this)
    canvas.addEventListener('touchstart', this.touchHandler)

  }

  touchEventHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    for (let i = 0; i < this.buttonList.length; i++) {
      const button = this.buttonList[i]
      if (x >= button.position.startX &&
        x <= button.position.endX &&
        y >= button.position.startY &&
        y <= button.position.endY) {
        button.click()
        break
      }
    }
  }


  render(ctx) {
    this.buttonList.forEach((button) => {
      button.render(ctx)
    })
  }
}

/***
 * 按钮类
 */
class Button extends Sprite {
  constructor(type, index, player) {
    super(`${IMG_PREFIX} (${index}).png`)
    this.type = type
    this.index = index
    this.player = player

    const xaxis = Math.floor((index - 1) / 2)
    const yaxis = (index - 1) % 2
    this.position = {
      startX: (screenWidth / 2) - (CTRL_WIDTH * 3 / 2) + xaxis * CTRL_WIDTH,
      startY: screenHeight - (CTRL_HEIGHT * 2) - 40 + yaxis * CTRL_HEIGHT,
      endX: (screenWidth / 2) - (CTRL_WIDTH * 3 / 2) + xaxis * CTRL_WIDTH + CTRL_WIDTH,
      endY: screenHeight - (CTRL_HEIGHT * 2) - 40 + yaxis * CTRL_HEIGHT + CTRL_HEIGHT
    }
  }

  render(ctx) {
    ctx.drawImage(
      this.img,
      this.position.startX,
      this.position.startY,
      CTRL_WIDTH,
      CTRL_HEIGHT
    )
  }


  click() {
    this.player.changeState(this.type)
  }
}