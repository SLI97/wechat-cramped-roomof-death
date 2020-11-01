import SubStateMachine from '../../base/SubStateMachine'
import {
	PLAYER_STATE,
	DIRECTION_ENUM
} from '../../enums/index'
import {
	PARAMS_NAME
} from './PlayerStateMachine'
import BlockBackTopState from './BlockBack/BlockBackTopState'
import BlockBackBottomState from './BlockBack/BlockBackBottomState'
import BlockBackLeftState from './BlockBack/BlockBackLeftState'
import BlockBackRightState from './BlockBack/BlockBackRightState'
import ResourceManager from '../../runtime/ResourceManager'
import DirectionStateMachine from '../../base/DirectionStateMachine'

const IMG_BLOCKFACE_PREFIX = 'images/blockface/blockface'

export default class BlockBackSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.init()
	}

	init() {
		this.initAnimations()
		this.initState()
	}

	initAnimations() {
		this.blockFaceBackTopAnimations = []
		this.blockFaceBackBottomAnimations = []
		this.blockFaceBackLeftAnimations = []
		this.blockFaceBackRightAnimations = []

		const imageMap = ResourceManager.Instance.getImageMap()
		for (let i = 5; i <= 8; i++) {
			this.blockFaceBackTopAnimations.push(imageMap.get(`${IMG_BLOCKFACE_PREFIX} (${i }).png`))
		}

		for (let i = 13; i <= 16; i++) {
			this.blockFaceBackBottomAnimations.push(imageMap.get(`${IMG_BLOCKFACE_PREFIX} (${i }).png`))
		}

		for (let i = 21; i <= 24; i++) {
			this.blockFaceBackLeftAnimations.push(imageMap.get(`${IMG_BLOCKFACE_PREFIX} (${i }).png`))
		}

		for (let i = 29; i <= 32; i++) {
			this.blockFaceBackRightAnimations.push(imageMap.get(`${IMG_BLOCKFACE_PREFIX} (${i }).png`))
		}
	}

	initState() {
		this.states.set(DIRECTION_ENUM.TOP, new BlockBackTopState(this.owner, this.fsm, this.blockFaceBackTopAnimations))
		this.states.set(DIRECTION_ENUM.BOTTOM, new BlockBackBottomState(this.owner, this.fsm, this.blockFaceBackBottomAnimations))
		this.states.set(DIRECTION_ENUM.LEFT, new BlockBackLeftState(this.owner, this.fsm, this.blockFaceBackLeftAnimations))
		this.states.set(DIRECTION_ENUM.RIGHT, new BlockBackRightState(this.owner, this.fsm, this.blockFaceBackRightAnimations))
		this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
	}
}