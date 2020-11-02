import DirectionStateMachine from '../../../base/DirectionStateMachine'
import SmokeTopState from './Smoke/SmokeTopState'
import SmokeBottomState from './Smoke/SmokeBottomState'
import SmokeLeftState from './Smoke/SmokeLeftState'
import SmokeRightState from './Smoke/SmokeRightState'

import {
  PLAYER_STATE,
  DIRECTION_ENUM
} from '../../../enums/index'

const IMG_SMOKE_PREFIX = 'images/smoke/smoke'

export default class SmokeSubStateMachine extends DirectionStateMachine {
  constructor(owner, fsm) {
    super(owner, fsm)
    this.init()
  }

  init() {
    this.initAnimations()
    this.initState()
  }

  initAnimations() {
    this.smokeTopAnimations = []
    this.smokeBottomAnimations = []
    this.smokeLeftAnimations = []
    this.smokeRightAnimations = []

    for (let i = 25; i <= 36; i++) {
      this.smokeTopAnimations.push(imageMap.get(`${IMG_SMOKE_PREFIX} (${i }).png`))
    }

    for (let i = 37; i <= 48; i++) {
      this.smokeBottomAnimations.push(imageMap.get(`${IMG_SMOKE_PREFIX} (${i }).png`))
    }

    for (let i = 13; i <= 24; i++) {
      this.smokeLeftAnimations.push(imageMap.get(`${IMG_SMOKE_PREFIX} (${i }).png`))
    }

    for (let i = 1; i <= 12; i++) {
      this.smokeRightAnimations.push(imageMap.get(`${IMG_SMOKE_PREFIX} (${i }).png`))
    }
  }

  initState() {
    this.states.set(DIRECTION_ENUM.TOP, new SmokeTopState(this.owner, this.fsm, this.smokeTopAnimations))
    this.states.set(DIRECTION_ENUM.BOTTOM, new SmokeBottomState(this.owner, this.fsm, this.smokeBottomAnimations))
    this.states.set(DIRECTION_ENUM.LEFT, new SmokeLeftState(this.owner, this.fsm, this.smokeLeftAnimations))
    this.states.set(DIRECTION_ENUM.RIGHT, new SmokeRightState(this.owner, this.fsm, this.smokeRightAnimations))
    this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
  }
}
