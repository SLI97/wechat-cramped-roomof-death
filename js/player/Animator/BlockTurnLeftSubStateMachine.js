import BlockTurnLeftTopState from './BlockTurnLeft/BlockTurnLeftTopState'
import BlockTurnLeftBottomState from './BlockTurnLeft/BlockTurnLeftBottomState'
import BlockTurnLeftLeftState from './BlockTurnLeft/BlockTurnLeftLeftState'
import BlockTurnLeftRightState from './BlockTurnLeft/BlockTurnLeftRightState'

const IMG_BLOCKTURN_PREFIX = 'images/blockturn/blockturn'
import DirectionStateMachine from '../../base/DirectionStateMachine'

export default class BlockTurnLeftSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.topClass = BlockTurnLeftTopState
		this.bottomClass = BlockTurnLeftBottomState
		this.leftClass = BlockTurnLeftLeftState
		this.rightClass = BlockTurnLeftRightState
	}

	initAnimations() {
		this.topAnimations = []
		this.bottomAnimations = []
		this.leftAnimations = []
		this.rightAnimations = []

		for (let i = 1; i <= 4; i++) {
			this.topAnimations.push(this.imageMap.get(`${IMG_BLOCKTURN_PREFIX} (${i }).png`))
		}

		for (let i = 9; i <= 12; i++) {
			this.bottomAnimations.push(this.imageMap.get(`${IMG_BLOCKTURN_PREFIX} (${i }).png`))
		}

		for (let i = 17; i <= 20; i++) {
			this.leftAnimations.push(this.imageMap.get(`${IMG_BLOCKTURN_PREFIX} (${i }).png`))
		}

		for (let i = 25; i <= 28; i++) {
			this.rightAnimations.push(this.imageMap.get(`${IMG_BLOCKTURN_PREFIX} (${i }).png`))
		}
	}
}
