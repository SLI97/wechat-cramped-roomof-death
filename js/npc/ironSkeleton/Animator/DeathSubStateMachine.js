import DirectionStateMachine from '../../../base/DirectionStateMachine'
import DeathBottomState from './Death/DeathBottomState'
import DeathLeftState from './Death/DeathLeftState'
import DeathTopState from './Death/DeathTopState'
import DeathRightState from './Death/DeathRightState'

const IMG_IRONSKELETON_PREFIX = 'images/ironskeleton/ironskeleton'

export default class DeathSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
	}

  initClass(){
    this.topClass = DeathTopState
    this.bottomClass = DeathBottomState
    this.leftClass = DeathLeftState
    this.rightClass = DeathRightState
  }

	initAnimations() {
		this.topAnimations = []
		this.bottomAnimations = []
		this.leftAnimations = []
		this.rightAnimations = []

		for (let i = 59; i <= 72; i++) {
			this.topAnimations.push(this.imageMap.get(`${IMG_IRONSKELETON_PREFIX} (${i }).png`))
		}

		for (let i = 17; i <= 30; i++) {
			this.bottomAnimations.push(this.imageMap.get(`${IMG_IRONSKELETON_PREFIX} (${i }).png`))
		}

		for (let i = 45; i <= 58; i++) {
			this.leftAnimations.push(this.imageMap.get(`${IMG_IRONSKELETON_PREFIX} (${i }).png`))
		}

		for (let i = 31; i <= 44; i++) {
			this.rightAnimations.push(this.imageMap.get(`${IMG_IRONSKELETON_PREFIX} (${i }).png`))
		}
	}
}
