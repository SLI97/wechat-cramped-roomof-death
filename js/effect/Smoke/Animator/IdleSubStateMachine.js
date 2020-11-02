import DirectionStateMachine from '../../../base/DirectionStateMachine'
import IdleTopState from './Idle/IdleTopState'
import SmokeBottomState from './Idle/IdleBottomState'
import IdleLeftState from './Idle/IdleLeftState'
import IdleRightState from './Idle/IdleRightState'

const IMG_SMOKE_PREFIX = 'images/smoke/smoke'

export default class IdleSubStateMachine extends DirectionStateMachine {
  constructor(owner, fsm) {
    super(owner, fsm)
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

		for (let i = 13; i <= 16; i++) {
			this.topAnimations.push(this.imageMap.get(`${IMG_SMOKE_PREFIX} (${i }).png`))
		}

		for (let i = 1; i <= 4; i++) {
			this.bottomAnimations.push(this.imageMap.get(`${IMG_SMOKE_PREFIX} (${i }).png`))
		}

		for (let i = 9; i <= 12; i++) {
			this.leftAnimations.push(this.imageMap.get(`${IMG_SMOKE_PREFIX} (${i }).png`))
		}

		for (let i = 5; i <= 8; i++) {
			this.rightAnimations.push(this.imageMap.get(`${IMG_SMOKE_PREFIX} (${i }).png`))
		}
	}
}
