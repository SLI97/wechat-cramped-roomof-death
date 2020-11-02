import BlockFrontTopState from './BlockFront/BlockFrontTopState'
import BlockFrontBottomState from './BlockFront/BlockFrontBottomState'
import BlocFrontLeftState from './BlockFront/BlocFrontLeftState'
import BlockFrontRightState from './BlockFront/BlockFrontRightState'
import DirectionStateMachine from '../../base/DirectionStateMachine'

const IMG_BLOCKFACE_PREFIX = 'images/blockface/blockface'

export default class BlockFrontSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.topClass = BlockFrontTopState
		this.bottomClass = BlockFrontBottomState
		this.leftClass = BlocFrontLeftState
		this.rightClass = BlockFrontRightState
	}

	initAnimations() {
		this.topAnimations = []
		this.bottomAnimations = []
		this.leftAnimations = []
		this.rightAnimations = []

		for (let i = 1; i <= 4; i++) {
			this.topAnimations.push(this.imageMap.get(`${IMG_BLOCKFACE_PREFIX} (${i }).png`))
		}

		for (let i = 9; i <= 12; i++) {
			this.bottomAnimations.push(this.imageMap.get(`${IMG_BLOCKFACE_PREFIX} (${i }).png`))
		}

		for (let i = 17; i <= 20; i++) {
			this.leftAnimations.push(this.imageMap.get(`${IMG_BLOCKFACE_PREFIX} (${i }).png`))
		}

		for (let i = 25; i <= 28; i++) {
			this.rightAnimations.push(this.imageMap.get(`${IMG_BLOCKFACE_PREFIX} (${i }).png`))
		}
	}
}
