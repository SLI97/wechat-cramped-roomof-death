import SubStateMachine from '../../base/SubStateMachine'
import {
	PLAYER_STATE
} from '../../enums/index'

import {
	DIRECTION_ENUM
} from '../../enums/index'
import BlockTurnLeftTopState from './BlockTurnLeft/BlockTurnLeftTopState'
import BlockTurnLeftBottomState from './BlockTurnLeft/BlockTurnLeftBottomState'
import BlockTurnLeftLeftState from './BlockTurnLeft/BlockTurnLeftLeftState'
import BlockTurnLeftRightState from './BlockTurnLeft/BlockTurnLeftRightState'
import {
	PARAMS_NAME
} from './PlayerStateMachine'
import ResourceManager from '../../runtime/ResourceManager'
import DirectionStateMachine from '../../base/DirectionStateMachine'

const IMG_BLOCKSIDE_PREFIX = 'images/blockside/blockside'

export default class BlockRightSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.init()
	}

	init() {
		this.initAnimations()
		this.initState()
	}

	initAnimations() {
		this.blockSideRightTopAnimations = []
		this.blockSideRightBottomAnimations = []
		this.blockSideRightLeftAnimations = []
		this.blockSideRightRightAnimations = []

		const imageMap = ResourceManager.Instance.getImageMap()
		for (let i = 5; i <= 8; i++) {
			this.blockSideRightTopAnimations.push(imageMap.get(`${IMG_BLOCKSIDE_PREFIX} (${i }).png`))
		}

		for (let i = 13; i <= 16; i++) {
			this.blockSideRightBottomAnimations.push(imageMap.get(`${IMG_BLOCKSIDE_PREFIX} (${i }).png`))
		}

		for (let i = 21; i <= 24; i++) {
			this.blockSideRightLeftAnimations.push(imageMap.get(`${IMG_BLOCKSIDE_PREFIX} (${i }).png`))
		}

		for (let i = 29; i <= 32; i++) {
			this.blockSideRightRightAnimations.push(imageMap.get(`${IMG_BLOCKSIDE_PREFIX} (${i }).png`))
		}
	}

	initState() {
		this.states.set(DIRECTION_ENUM.TOP, new BlockTurnLeftTopState(this.owner, this.fsm, this.blockSideRightTopAnimations))
		this.states.set(DIRECTION_ENUM.BOTTOM,
			new BlockTurnLeftBottomState(this.owner, this.fsm, this.blockSideRightBottomAnimations))
		this.states.set(DIRECTION_ENUM.LEFT, new BlockTurnLeftLeftState(this.owner, this.fsm, this.blockSideRightLeftAnimations))
		this.states.set(DIRECTION_ENUM.RIGHT, new BlockTurnLeftRightState(this.owner, this.fsm, this.blockSideRightRightAnimations))
		this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
	}
}