import DirectionStateMachine from '../../../base/DirectionStateMachine'
import IdleTopState from './Idle/IdleTopState'
import SmokeBottomState from './Idle/IdleBottomState'
import IdleLeftState from './Idle/IdleLeftState'
import IdleRightState from './Idle/IdleRightState'

const IMG_SMOKE_PREFIX = 'images/smoke/smoke'

export default class IdleSubStateMachine extends DirectionStateMachine {
  constructor(owner, fsm) {
    super(owner, fsm)
  }

  initClass(){
    this.topClass = IdleTopState
    this.bottomClass = SmokeBottomState
    this.leftClass = IdleLeftState
    this.rightClass = IdleRightState
  }

	initAnimations() {
		this.topAnimations = []
		this.bottomAnimations = []
		this.leftAnimations = []
		this.rightAnimations = []

		for (let i = 28; i <= 36; i++) {
			this.topAnimations.push(this.imageMap.get(`${IMG_SMOKE_PREFIX} (${i }).png`))
		}

		for (let i = 40; i <= 48; i++) {
			this.bottomAnimations.push(this.imageMap.get(`${IMG_SMOKE_PREFIX} (${i }).png`))
		}

		for (let i = 16; i <= 24; i++) {
			this.leftAnimations.push(this.imageMap.get(`${IMG_SMOKE_PREFIX} (${i }).png`))
		}

		for (let i = 4; i <= 12; i++) {
			this.rightAnimations.push(this.imageMap.get(`${IMG_SMOKE_PREFIX} (${i }).png`))
		}
	}
}
