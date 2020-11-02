import DeathTopState from './Death/DeathTopState'
import DeathBottomState from './Death/DeathBottomState'
import DeathLeftState from './Death/DeathLeftState'
import DeathRightState from './Death/DeathRightState'
import DirectionStateMachine from '../../../base/DirectionStateMachine'

const IMG_WOODENSKELETON_PREFIX = 'images/woodenskeleton/woodenskeleton'

export default class DeathSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
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

		for (let i = 13; i <= 16; i++) {
			this.topAnimations.push(this.imageMap.get(`${IMG_WOODENSKELETON_PREFIX} (${i }).png`))
		}

		for (let i = 1; i <= 4; i++) {
			this.bottomAnimations.push(this.imageMap.get(`${IMG_WOODENSKELETON_PREFIX} (${i }).png`))
		}

		for (let i = 9; i <= 12; i++) {
			this.leftAnimations.push(this.imageMap.get(`${IMG_WOODENSKELETON_PREFIX} (${i }).png`))
		}

		for (let i = 5; i <= 8; i++) {
			this.rightAnimations.push(this.imageMap.get(`${IMG_WOODENSKELETON_PREFIX} (${i }).png`))
		}
	}
}
