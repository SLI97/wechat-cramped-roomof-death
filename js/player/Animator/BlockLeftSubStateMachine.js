import SubStateMachine from '../../base/SubStateMachine'
import {
	DIRECTION_ENUM,
	DIRECTION_ORDER,
	PLAYER_STATE
} from '../../enums/index'
import BlockLeftTopState from './BlockLeft/BlockLeftTopState'
import BlockLeftBottomState from './BlockLeft/BlockLeftBottomState'
import BlockLeftLeftState from './BlockLeft/BlockLeftLeftState'
import BlockLeftRightState from './BlockLeft/BlockLeftRightState'
import {
	PARAMS_NAME
} from './PlayerStateMachine'
import ResourceManager from '../../runtime/ResourceManager'
import DirectionStateMachine from '../../base/DirectionStateMachine'

const IMG_BLOCKSIDE_PREFIX = 'images/blockside/blockside'

export default class BlockLeftSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.init()
	}

	init() {
		this.initAnimations()
		this.initState()
	}

	initAnimations() {
		this.blockSideLeftTopAnimations = []
		this.blockSideLeftBottomAnimations = []
		this.blockSideLeftLeftAnimations = []
		this.blockSideLeftRightAnimations = []

		const imageMap = ResourceManager.Instance.getImageMap()
		for (let i = 1; i <= 4; i++) {
			this.blockSideLeftTopAnimations.push(imageMap.get(`${IMG_BLOCKSIDE_PREFIX} (${i }).png`))
		}

		for (let i = 9; i <= 12; i++) {
			this.blockSideLeftBottomAnimations.push(imageMap.get(`${IMG_BLOCKSIDE_PREFIX} (${i }).png`))
		}

		for (let i = 17; i <= 20; i++) {
			this.blockSideLeftLeftAnimations.push(imageMap.get(`${IMG_BLOCKSIDE_PREFIX} (${i }).png`))
		}

		for (let i = 25; i <= 28; i++) {
			this.blockSideLeftRightAnimations.push(imageMap.get(`${IMG_BLOCKSIDE_PREFIX} (${i }).png`))
		}
	}

	initState() {
		this.states.set(DIRECTION_ENUM.TOP, new BlockLeftTopState(this.owner, this.fsm, this.blockSideLeftTopAnimations))
		this.states.set(DIRECTION_ENUM.BOTTOM, new BlockLeftBottomState(this.owner, this.fsm, this.blockSideLeftBottomAnimations))
		this.states.set(DIRECTION_ENUM.LEFT, new BlockLeftLeftState(this.owner, this.fsm, this.blockSideLeftLeftAnimations))
		this.states.set(DIRECTION_ENUM.RIGHT, new BlockLeftRightState(this.owner, this.fsm, this.blockSideLeftRightAnimations))
		this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
	}
}