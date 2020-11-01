import SubStateMachine from '../../base/SubStateMachine'
import {
	DIRECTION_ENUM,
	PLAYER_STATE,
} from '../../enums/index'
import {
	PARAMS_NAME
} from './PlayerStateMachine'
import BlockFrontTopState from './BlockFront/BlockFrontTopState'
import BlockFrontBottomState from './BlockFront/BlockFrontBottomState'
import BlocFrontLeftState from './BlockFront/BlocFrontLeftState'
import BlockFrontRightState from './BlockFront/BlockFrontRightState'
import ResourceManager from '../../runtime/ResourceManager'
import DirectionStateMachine from '../../base/DirectionStateMachine'

const IMG_BLOCKFACE_PREFIX = 'images/blockface/blockface'

export default class BlockFrontSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.init()
	}

	init() {
		this.initAnimations()
		this.initState()
	}

	initAnimations() {
		this.blockSideFrontTopAnimations = []
		this.blockSideFrontBottomAnimations = []
		this.blockSideFrontLeftAnimations = []
		this.blockSideFrontRightAnimations = []

		const imageMap = ResourceManager.Instance.getImageMap()
		for (let i = 1; i <= 4; i++) {
			this.blockSideFrontTopAnimations.push(imageMap.get(`${IMG_BLOCKFACE_PREFIX} (${i }).png`))
		}

		for (let i = 9; i <= 12; i++) {
			this.blockSideFrontBottomAnimations.push(imageMap.get(`${IMG_BLOCKFACE_PREFIX} (${i }).png`))
		}

		for (let i = 17; i <= 20; i++) {
			this.blockSideFrontLeftAnimations.push(imageMap.get(`${IMG_BLOCKFACE_PREFIX} (${i }).png`))
		}

		for (let i = 25; i <= 28; i++) {
			this.blockSideFrontRightAnimations.push(imageMap.get(`${IMG_BLOCKFACE_PREFIX} (${i }).png`))
		}
	}

	initState() {
		this.states.set(DIRECTION_ENUM.TOP, new BlockFrontTopState(this.owner, this.fsm, this.blockSideFrontTopAnimations))
		this.states.set(DIRECTION_ENUM.BOTTOM, new BlockFrontBottomState(this.owner, this.fsm, this.blockSideFrontBottomAnimations))
		this.states.set(DIRECTION_ENUM.LEFT, new BlocFrontLeftState(this.owner, this.fsm, this.blockSideFrontLeftAnimations))
		this.states.set(DIRECTION_ENUM.RIGHT, new BlockFrontRightState(this.owner, this.fsm, this.blockSideFrontRightAnimations))
		this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
	}
}