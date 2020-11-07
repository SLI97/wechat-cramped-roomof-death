import State from './State'
import CanvasManager from '../runtime/CanvasManager'
import DataManager from '../runtime/DataManager'

import {
  PLAYER_STATE
} from '../enums/index'

export default class NoLoopState extends State {
  constructor(owner, fsm, animations) {
    super(animations, false)
    this.owner = owner
    this.fsm = fsm
  }

  render() {
    const image = this.animations[this.index]
    const {offset, dpr} = DataManager.Instance
    const {
      x,
      y,
      width,
      height,
    } = this.owner
    if (image) {
      CanvasManager.Ctx.drawImage(
        image,
        ((x * 32) - 32 - 16) * dpr + offset.width,
        ((y * 32) - 32 - 16) * dpr + offset.height,
        width * dpr,
        height * dpr
      )
    }
  }

  callback() {
    this.owner.state = PLAYER_STATE.IDLE
  }
}
