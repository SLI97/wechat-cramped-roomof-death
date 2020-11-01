import SubStateMachine from '../../base/SubStateMachine'
import {
	PLAYER_STATE,
	DIRECTION_ENUM
} from '../../enums/index'
import TurnRightTopState from './TurnRight/TurnRightTopState'
import TurnRightBottomState from './TurnRight/TurnRightBottomState'
import TurnRightLeftState from './TurnRight/TurnRightLeftState'
import TurnRightRightState from './TurnRight/TurnRightRightState'
import {
	PARAMS_NAME
} from './PlayerStateMachine'
import ResourceManager from '../../runtime/ResourceManager'
import DirectionStateMachine from '../../base/DirectionStateMachine'


const IMG_TURN_PREFIX = 'images/turn/turn'

export default class TurnRightSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.init()
	}

	init() {
		this.initAnimations()
		this.initState()
	}

	initAnimations() {
		this.turnrightTopAnimations = []
		this.turnrightBottomAnimations = []
		this.turnrightLeftAnimations = []
		this.turnrightRightAnimations = []

		const imageMap = ResourceManager.Instance.getImageMap()
		for (let i = 19; i <= 21; i++) {
			this.turnrightTopAnimations.push(imageMap.get(`${IMG_TURN_PREFIX} (${i }).png`))
		}

		for (let i = 13; i <= 15; i++) {
			this.turnrightBottomAnimations.push(imageMap.get(`${IMG_TURN_PREFIX} (${i }).png`))
		}

		for (let i = 16; i <= 18; i++) {
			this.turnrightLeftAnimations.push(imageMap.get(`${IMG_TURN_PREFIX} (${i }).png`))
		}

		for (let i = 22; i <= 24; i++) {
			this.turnrightRightAnimations.push(imageMap.get(`${IMG_TURN_PREFIX} (${i }).png`))
		}
	}

	initState() {
		this.states.set(DIRECTION_ENUM.TOP, new TurnRightTopState(this.owner, this.fsm, this.turnrightTopAnimations))
		this.states.set(DIRECTION_ENUM.BOTTOM, new TurnRightBottomState(this.owner, this.fsm, this.turnrightBottomAnimations))
		this.states.set(DIRECTION_ENUM.LEFT, new TurnRightLeftState(this.owner, this.fsm, this.turnrightLeftAnimations))
		this.states.set(DIRECTION_ENUM.RIGHT, new TurnRightRightState(this.owner, this.fsm, this.turnrightRightAnimations))
		this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
	}
}