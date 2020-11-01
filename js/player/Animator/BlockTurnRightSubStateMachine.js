import SubStateMachine from '../../base/SubStateMachine'
import {
	DIRECTION_ENUM,
	PLAYER_STATE,
} from '../../enums/index'
import BlockTurnRightTopState from './BlockTurnRight/BlockTurnRightTopState'
import BlockTurnRightBottomState from './BlockTurnRight/BlockTurnRightBottomState'
import BlockTurnRightLeftState from './BlockTurnRight/BlockTurnRightLeftState'
import BlockTurnRightRightState from './BlockTurnRight/BlockTurnRightRightState'
import {
	PARAMS_NAME
} from './PlayerStateMachine'
import ResourceManager from '../../runtime/ResourceManager'
import DirectionStateMachine from '../../base/DirectionStateMachine'

const IMG_BLOCKTURN_PREFIX = 'images/blockturn/blockturn'

export default class BlockTurnRightSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.init()
	}

	init() {
		this.initAnimations()
		this.initState()
	}

	initAnimations() {
		this.blockTrunrightTopAnimations = []
		this.blockTurnrightBottomAnimations = []
		this.blockTrunrightLeftAnimations = []
		this.blockTurnrightRightAnimations = []

		const imageMap = ResourceManager.Instance.getImageMap()
		for (let i = 5; i <= 8; i++) {
			this.blockTrunrightTopAnimations.push(imageMap.get(`${IMG_BLOCKTURN_PREFIX} (${i }).png`))
		}

		for (let i = 13; i <= 16; i++) {
			this.blockTurnrightBottomAnimations.push(imageMap.get(`${IMG_BLOCKTURN_PREFIX} (${i }).png`))
		}

		for (let i = 21; i <= 24; i++) {
			this.blockTrunrightLeftAnimations.push(imageMap.get(`${IMG_BLOCKTURN_PREFIX} (${i }).png`))
		}

		for (let i = 29; i <= 32; i++) {
			this.blockTurnrightRightAnimations.push(imageMap.get(`${IMG_BLOCKTURN_PREFIX} (${i }).png`))
		}
	}

	initState() {
		this.states.set(DIRECTION_ENUM.TOP, new BlockTurnRightTopState(this.owner, this.fsm, this.blockTrunrightTopAnimations))
		this.states.set(DIRECTION_ENUM.BOTTOM, new BlockTurnRightBottomState(this.owner, this.fsm, this.blockTurnrightBottomAnimations))
		this.states.set(DIRECTION_ENUM.LEFT, new BlockTurnRightLeftState(this.owner, this.fsm, this.blockTrunrightLeftAnimations))
		this.states.set(DIRECTION_ENUM.RIGHT, new BlockTurnRightRightState(this.owner, this.fsm, this.blockTurnrightRightAnimations))
		this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
	}
}