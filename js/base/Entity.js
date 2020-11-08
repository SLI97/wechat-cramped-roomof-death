import Sprite from './Sprite'
import {
  DIRECTION_ORDER,
  DIRECTION_ENUM,
  EVENT_ENUM,
  PLAYER_STATE
} from '../enums/index'
import {randomByCount} from '../util/index'

import {
  PARAMS_NAME
} from '../player/Animator/PlayerStateMachine'
import EventManager from '../runtime/EventManager'

/***
 * 实体类，实体必须具备方向和状态
 */
export default class Entity extends Sprite {
  constructor({x, y, state, direction}, FsmClass, imgSrc, width, height) {
    super(imgSrc, width, height)
    this.x = x
    this.y = y
    this.fsm = new FsmClass(this)
    this.state = state
    this.direction = direction
    this.id = randomByCount(12)
    this.init()
  }

  init() {
  }

  _direction = DIRECTION_ENUM.BOTTOM
  _state = PLAYER_STATE.IDLE

  get direction() {
    return this._direction
  }

  set direction(value) {
    this._direction = value
    if (this.fsm) {
      // if(DIRECTION_ORDER.findIndex(i => i === this._direction) !== this.fsm.getParams(PARAMS_NAME.DIRECTION)){
        this.fsm.setParams(PARAMS_NAME.DIRECTION, DIRECTION_ORDER.findIndex(i => i === this._direction))
      // }
    }
  }

  get state() {
    return this._state
  }

  set state(value) {
    this._state = value
    if (this.fsm && this.fsm.params.has(value)) {
      //同样类型的block不要覆盖
      if (this.fsm.currentState === this.fsm.states.get(value)) {
        return
      }
      this.fsm.setParams(value, true)
    }
  }

  update() {
    if (this.fsm) {
      this.fsm.update()
    }
  }

  render() {
    if (this.fsm) {
      this.fsm.render()
    }
  }
}
