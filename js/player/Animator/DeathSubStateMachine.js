import DirectionStateMachine from '../../base/DirectionStateMachine'
import DeatTopState from '../../npc/ironSkeleton/Animator/Death/DeathTopState'
import DeathBottomState from '../../npc/woodenSkeleton/Animator/Death/DeathBottomState'
import DeathLeftState from '../../npc/woodenSkeleton/Animator/Death/DeathLeftState'
import DeathRightState from '../../npc/woodenSkeleton/Animator/Death/DeathRightState'

const IMG_DEATH_PREFIX = 'images/death/death'

export default class DeathSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
	}

  initClass(){
    this.topClass = DeatTopState
    this.bottomClass = DeathBottomState
    this.leftClass = DeathLeftState
    this.rightClass = DeathRightState
  }

	initAnimations() {
		this.topAnimations = []
		this.bottomAnimations = []
		this.leftAnimations = []
		this.rightAnimations = []

		for (let i = 29; i <= 42; i++) {
			this.topAnimations.push(this.imageMap.get(`${IMG_DEATH_PREFIX} (${i }).png`))
		}

		for (let i = 15; i <= 28; i++) {
			this.bottomAnimations.push(this.imageMap.get(`${IMG_DEATH_PREFIX} (${i }).png`))
		}

		for (let i = 43; i <= 56; i++) {
			this.leftAnimations.push(this.imageMap.get(`${IMG_DEATH_PREFIX} (${i }).png`))
		}

		for (let i = 1; i <= 14; i++) {
			this.rightAnimations.push(this.imageMap.get(`${IMG_DEATH_PREFIX} (${i }).png`))
		}
	}
}
