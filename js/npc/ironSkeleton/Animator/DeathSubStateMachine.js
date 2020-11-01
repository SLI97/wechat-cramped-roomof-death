import DirectionStateMachine from '../../../base/DirectionStateMachine'
import ResourceManager from '../../../runtime/ResourceManager'
import {
	PLAYER_STATE,
	DIRECTION_ENUM
} from '../../../enums/index'
import DeathBottomState from './Death/DeathBottomState'
import DeathLeftState from './Death/DeathLeftState'
import DeathTopState from './Death/DeathTopState'
import DeathRightState from './Death/DeathRightState'

const IMG_IRONSKELETON_PREFIX = 'images/ironskeleton/ironskeleton'

export default class DeathSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.init()
	}

	init() {
		this.initAnimations()
		this.initState()
	}

	initAnimations() {
		this.ironSkeletonDeathTopAnimations = []
		this.ironSkeletonDeathBottomAnimations = []
		this.ironSkeletonDeathLeftAnimations = []
		this.ironSkeletonDeathRightAnimations = []

		const imageMap = ResourceManager.Instance.getImageMap()
		for (let i = 59; i <= 72; i++) {
			this.ironSkeletonDeathTopAnimations.push(imageMap.get(`${IMG_IRONSKELETON_PREFIX} (${i }).png`))
		}

		for (let i = 17; i <= 30; i++) {
			this.ironSkeletonDeathBottomAnimations.push(imageMap.get(`${IMG_IRONSKELETON_PREFIX} (${i }).png`))
		}

		for (let i = 45; i <= 58; i++) {
			this.ironSkeletonDeathLeftAnimations.push(imageMap.get(`${IMG_IRONSKELETON_PREFIX} (${i }).png`))
		}

		for (let i = 31; i <= 44; i++) {
			this.ironSkeletonDeathRightAnimations.push(imageMap.get(`${IMG_IRONSKELETON_PREFIX} (${i }).png`))
		}
	}
	initState() {
		this.states.set(DIRECTION_ENUM.TOP, new DeathTopState(this.owner, this.fsm, this.ironSkeletonDeathTopAnimations))
		this.states.set(DIRECTION_ENUM.BOTTOM, new DeathBottomState(this.owner, this.fsm, this.ironSkeletonDeathBottomAnimations))
		this.states.set(DIRECTION_ENUM.LEFT, new DeathLeftState(this.owner, this.fsm, this.ironSkeletonDeathLeftAnimations))
		this.states.set(DIRECTION_ENUM.RIGHT, new DeathRightState(this.owner, this.fsm, this.ironSkeletonDeathRightAnimations))
		this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
	}
}