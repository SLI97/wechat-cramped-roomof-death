import DeathTopState from './Death/DeathTopState'
import DeathBottomState from './Death/DeathBottomState'
import DeathLeftState from './Death/DeathLeftState'
import DeathRightState from './Death/DeathRightState'
import DirectionStateMachine from '../../../base/DirectionStateMachine'

const IMG_WOODENSKELETON_PREFIX = 'images/woodenskeleton/woodenskeleton'

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

		for (let i = 49; i <= 62; i++) {
			this.topAnimations.push(this.imageMap.get(`${IMG_WOODENSKELETON_PREFIX} (${i }).png`))
		}

		for (let i = 63; i <= 76; i++) {
			this.bottomAnimations.push(this.imageMap.get(`${IMG_WOODENSKELETON_PREFIX} (${i }).png`))
		}

		for (let i = 77; i <= 90; i++) {
			this.leftAnimations.push(this.imageMap.get(`${IMG_WOODENSKELETON_PREFIX} (${i }).png`))
		}

		for (let i = 91; i <= 104; i++) {
			this.rightAnimations.push(this.imageMap.get(`${IMG_WOODENSKELETON_PREFIX} (${i }).png`))
		}
	}
}
