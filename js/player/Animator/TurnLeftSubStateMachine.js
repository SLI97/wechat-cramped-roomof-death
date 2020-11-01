import SubStateMachine from '../../base/SubStateMachine'
import {
	PLAYER_STATE,
	DIRECTION_ENUM,
	DIRECTION_ORDER
} from '../../enums/index'
import TurnLeftTopState from './TurnLeft/TurnLeftTopState'
import TurnLeftBottomState from './TurnLeft/TurnLeftBottomState'
import TurnLeftLeftState from './TurnLeft/TurnLeftLeftState'
import TurnLeftRightState from './TurnLeft/TurnLeftRightState'
import {
	PARAMS_NAME
} from './PlayerStateMachine'
import ResourceManager from '../../runtime/ResourceManager'
import DirectionStateMachine from '../../base/DirectionStateMachine'

const IMG_TURN_PREFIX = 'images/turn/turn'


export default class TurnLeftSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.init()
	}

	init() {
		this.initAnimations()
		this.initState()
	}

	initAnimations() {
		this.turnleftTopAnimations = []
		this.turnleftBottomAnimations = []
		this.turnleftLeftAnimations = []
		this.turnleftRightAnimations = []

		const imageMap = ResourceManager.Instance.getImageMap()
		for (let i = 1; i <= 3; i++) {
			this.turnleftTopAnimations.push(imageMap.get(`${IMG_TURN_PREFIX} (${i }).png`))
		}

		for (let i = 7; i <= 9; i++) {
			this.turnleftBottomAnimations.push(imageMap.get(`${IMG_TURN_PREFIX} (${i }).png`))
		}

		for (let i = 4; i <= 6; i++) {
			this.turnleftLeftAnimations.push(imageMap.get(`${IMG_TURN_PREFIX} (${i }).png`))
		}

		for (let i = 10; i <= 12; i++) {
			this.turnleftRightAnimations.push(imageMap.get(`${IMG_TURN_PREFIX} (${i }).png`))
		}
	}

	initState() {
		this.states.set(DIRECTION_ENUM.TOP, new TurnLeftTopState(this.owner, this.fsm, this.turnleftTopAnimations))
		this.states.set(DIRECTION_ENUM.BOTTOM, new TurnLeftBottomState(this.owner, this.fsm, this.turnleftBottomAnimations))
		this.states.set(DIRECTION_ENUM.LEFT, new TurnLeftLeftState(this.owner, this.fsm, this.turnleftLeftAnimations))
		this.states.set(DIRECTION_ENUM.RIGHT, new TurnLeftRightState(this.owner, this.fsm, this.turnleftRightAnimations))
		this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
	}
}