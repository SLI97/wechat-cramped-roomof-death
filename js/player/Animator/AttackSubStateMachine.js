import SubStateMachine from '../../base/SubStateMachine'
import {
	DIRECTION_ENUM,
	PLAYER_STATE
} from '../../enums/index'
import AttackTopState from './Attack/AttackTopState'
import AttackBottomState from './Attack/AttackBottomState'
import AttackLeftState from './Attack/AttackLeftState'
import AttackRightState from './Attack/AttackRightState'
import {
	PARAMS_NAME
} from './PlayerStateMachine'
import DirectionStateMachine from '../../base/DirectionStateMachine'
import ResourceManager from '../../runtime/ResourceManager'

const IMG_ATTACK_PREFIX = 'images/attack/attack'

export default class AttackSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.init()
	}

	init() {
		this.initAnimations()
		this.initState()
	}

	initAnimations() {
		this.attackFrontTopAnimations = []
		this.attackFrontBottomAnimations = []
		this.attackFrontLeftAnimations = []
		this.attackFrontRightAnimations = []

		const imageMap = ResourceManager.Instance.getImageMap()
		for (let i = 17; i <= 24; i++) {
			this.attackFrontTopAnimations.push(imageMap.get(`${IMG_ATTACK_PREFIX} (${i }).png`))
		}

		for (let i = 1; i <= 8; i++) {
			this.attackFrontBottomAnimations.push(imageMap.get(`${IMG_ATTACK_PREFIX} (${i }).png`))
		}

		for (let i = 25; i <= 32; i++) {
			this.attackFrontLeftAnimations.push(imageMap.get(`${IMG_ATTACK_PREFIX} (${i }).png`))
		}

		for (let i = 9; i <= 16; i++) {
			this.attackFrontRightAnimations.push(imageMap.get(`${IMG_ATTACK_PREFIX} (${i }).png`))
		}
	}

	initState() {
		this.states.set(DIRECTION_ENUM.TOP, new AttackTopState(this.owner, this.fsm, this.attackFrontTopAnimations))
		this.states.set(DIRECTION_ENUM.BOTTOM, new AttackBottomState(this.owner, this.fsm, this.attackFrontBottomAnimations))
		this.states.set(DIRECTION_ENUM.LEFT, new AttackLeftState(this.owner, this.fsm, this.attackFrontLeftAnimations))
		this.states.set(DIRECTION_ENUM.RIGHT, new AttackRightState(this.owner, this.fsm, this.attackFrontRightAnimations))
		this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
		console.log(this.currentState)
	}
}