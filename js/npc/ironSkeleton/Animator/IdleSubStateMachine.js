import DirectionStateMachine from '../../../base/DirectionStateMachine'
import IdleTopState from './Idle/IdleTopState'
import IdleBottomState from './Idle/IdleBottomState'
import IdleLeftState from './Idle/IdleLeftState'
import IdleRightState from './Idle/IdleRightState'
import ResourceManager from '../../../runtime/ResourceManager'

import {
	PLAYER_STATE,
	DIRECTION_ENUM
} from '../../../enums/index'

const IMG_IRONSKELETON_PREFIX = 'images/ironskeleton/ironskeleton'

export default class IdleSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.init()
	}

	init() {
		this.initAnimations()
		this.initState()
	}

	initAnimations() {
		this.ironSkeletonIdleTopAnimations = []
		this.ironSkeletonIdleBottomAnimations = []
		this.ironSkeletonIdleLeftAnimations = []
		this.ironSkeletonIdleRightAnimations = []

		const imageMap = ResourceManager.Instance.getImageMap()
		for (let i = 13; i <= 16; i++) {
			this.ironSkeletonIdleTopAnimations.push(imageMap.get(`${IMG_IRONSKELETON_PREFIX} (${i }).png`))
		}

		for (let i = 1; i <= 4; i++) {
			this.ironSkeletonIdleBottomAnimations.push(imageMap.get(`${IMG_IRONSKELETON_PREFIX} (${i }).png`))
		}

		for (let i = 9; i <= 12; i++) {
			this.ironSkeletonIdleLeftAnimations.push(imageMap.get(`${IMG_IRONSKELETON_PREFIX} (${i }).png`))
		}

		for (let i = 5; i <= 8; i++) {
			this.ironSkeletonIdleRightAnimations.push(imageMap.get(`${IMG_IRONSKELETON_PREFIX} (${i }).png`))
		}
	}

	initState() {
		this.states.set(DIRECTION_ENUM.TOP, new IdleTopState(this.owner, this.fsm, this.ironSkeletonIdleTopAnimations))
		this.states.set(DIRECTION_ENUM.BOTTOM, new IdleBottomState(this.owner, this.fsm, this.ironSkeletonIdleBottomAnimations))
		this.states.set(DIRECTION_ENUM.LEFT, new IdleLeftState(this.owner, this.fsm, this.ironSkeletonIdleLeftAnimations))
		this.states.set(DIRECTION_ENUM.RIGHT, new IdleRightState(this.owner, this.fsm, this.ironSkeletonIdleRightAnimations))
		this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
	}
}