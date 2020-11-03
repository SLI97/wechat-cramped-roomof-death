import AttackTopState from './Attack/AttackTopState'
import AttackBottomState from './Attack/AttackBottomState'
import AttackLeftState from './Attack/AttackLeftState'
import AttackRightState from './Attack/AttackRightState'
import DirectionStateMachine from '../../../base/DirectionStateMachine'

const IMG_WOODENSKELETON_PREFIX = 'images/woodenskeleton/woodenskeleton'

export default class AttackSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.topClass = AttackTopState
		this.bottomClass = AttackBottomState
		this.leftClass = AttackLeftState
		this.rightClass = AttackRightState
	}

  initClass(){
    this.topClass = AttackTopState
    this.bottomClass = AttackBottomState
    this.leftClass = AttackLeftState
    this.rightClass = AttackRightState
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
