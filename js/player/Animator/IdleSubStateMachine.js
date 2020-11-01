import SubStateMachine from '../../base/SubStateMachine'
import {
	PLAYER_STATE,
	DIRECTION_ENUM,
	DIRECTION_ORDER
} from '../../enums/index'
import IdleTopState from './Idle/IdleTopState'
import IdleBottomState from './Idle/IdleBottomState'
import IdleLeftState from './Idle/IdleLeftState'
import IdleRightState from './Idle/IdleRightState'

import {
	PARAMS_NAME
} from './PlayerStateMachine'
import DirectionStateMachine from '../../base/DirectionStateMachine'
import ResourceManager from '../../runtime/ResourceManager'

const IMG_IDLE_PREFIX = 'images/idle/idle'


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
		this.idleTopAnimations = []
		this.idleBottomAnimations = []
		this.idleLeftAnimations = []
		this.idleRightAnimations = []

		const imageMap = ResourceManager.Instance.getImageMap()
		for (let i = 9; i <= 12; i++) {
			this.idleTopAnimations.push(imageMap.get(`${IMG_IDLE_PREFIX} (${i }).png`))
		}

		for (let i = 1; i <= 4; i++) {
			this.idleBottomAnimations.push(imageMap.get(`${IMG_IDLE_PREFIX} (${i }).png`))
		}

		for (let i = 13; i <= 16; i++) {
			this.idleLeftAnimations.push(imageMap.get(`${IMG_IDLE_PREFIX} (${i }).png`))
		}

		for (let i = 5; i <= 8; i++) {
			this.idleRightAnimations.push(imageMap.get(`${IMG_IDLE_PREFIX} (${i }).png`))
		}
	}

	initState() {
		this.states.set(DIRECTION_ENUM.TOP, new IdleTopState(this.owner, this.fsm, this.idleTopAnimations))
		this.states.set(DIRECTION_ENUM.BOTTOM, new IdleBottomState(this.owner, this.fsm, this.idleBottomAnimations))
		this.states.set(DIRECTION_ENUM.LEFT, new IdleLeftState(this.owner, this.fsm, this.idleLeftAnimations))
		this.states.set(DIRECTION_ENUM.RIGHT, new IdleRightState(this.owner, this.fsm, this.idleRightAnimations))
		this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
	}
}