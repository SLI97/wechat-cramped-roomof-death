import SubStateMachine from '../../base/SubStateMachine'
import {
	DIRECTION_ENUM,
	PLAYER_STATE,
	DIRECTION_ORDER
} from '../../enums/index'
import BlockTurnLeftTopState from './BlockTurnLeft/BlockTurnLeftTopState'
import BlockTurnLeftBottomState from './BlockTurnLeft/BlockTurnLeftBottomState'
import BlockTurnLeftLeftState from './BlockTurnLeft/BlockTurnLeftLeftState'
import BlockTurnLeftRightState from './BlockTurnLeft/BlockTurnLeftRightState'
import {
	PARAMS_NAME
} from './PlayerStateMachine'
import ResourceManager from '../../runtime/ResourceManager'

const IMG_BLOCKTURN_PREFIX = 'images/blockturn/blockturn'
import DirectionStateMachine from '../../base/DirectionStateMachine'

export default class BlockTurnLeftSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.init()
	}

	init() {
		this.initAnimations()
		this.initState()
	}

	initAnimations() {
		this.blockTrunleftTopAnimations = []
		this.blockTurnleftBottomAnimations = []
		this.blockTrunleftLeftAnimations = []
		this.blockTurnleftRightAnimations = []

		const imageMap = ResourceManager.Instance.getImageMap()
		for (let i = 1; i <= 4; i++) {
			this.blockTrunleftTopAnimations.push(imageMap.get(`${IMG_BLOCKTURN_PREFIX} (${i }).png`))
		}

		for (let i = 9; i <= 12; i++) {
			this.blockTurnleftBottomAnimations.push(imageMap.get(`${IMG_BLOCKTURN_PREFIX} (${i }).png`))
		}

		for (let i = 17; i <= 20; i++) {
			this.blockTrunleftLeftAnimations.push(imageMap.get(`${IMG_BLOCKTURN_PREFIX} (${i }).png`))
		}

		for (let i = 25; i <= 28; i++) {
			this.blockTurnleftRightAnimations.push(imageMap.get(`${IMG_BLOCKTURN_PREFIX} (${i }).png`))
		}
	}

	initState() {
		this.states.set(DIRECTION_ENUM.TOP, new BlockTurnLeftTopState(this.owner, this.fsm, this.blockTrunleftTopAnimations))
		this.states.set(DIRECTION_ENUM.BOTTOM, new BlockTurnLeftBottomState(this.owner, this.fsm, this.blockTurnleftBottomAnimations))
		this.states.set(DIRECTION_ENUM.LEFT, new BlockTurnLeftLeftState(this.owner, this.fsm, this.blockTrunleftLeftAnimations))
		this.states.set(DIRECTION_ENUM.RIGHT, new BlockTurnLeftRightState(this.owner, this.fsm, this.blockTurnleftRightAnimations))
		this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
	}
}