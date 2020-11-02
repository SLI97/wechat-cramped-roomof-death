import BlockLeftTopState from './BlockLeft/BlockLeftTopState'
import BlockLeftBottomState from './BlockLeft/BlockLeftBottomState'
import BlockLeftLeftState from './BlockLeft/BlockLeftLeftState'
import BlockLeftRightState from './BlockLeft/BlockLeftRightState'
import DirectionStateMachine from '../../base/DirectionStateMachine'

const IMG_BLOCKSIDE_PREFIX = 'images/blockside/blockside'

export default class BlockLeftSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.topClass = BlockLeftTopState
		this.bottomClass = BlockLeftBottomState
		this.leftClass = BlockLeftLeftState
		this.rightClass = BlockLeftRightState
	}

	initAnimations() {
		this.topAnimations = []
		this.bottomAnimations = []
		this.leftAnimations = []
		this.rightAnimations = []

		for (let i = 1; i <= 4; i++) {
			this.topAnimations.push(this.imageMap.get(`${IMG_BLOCKSIDE_PREFIX} (${i }).png`))
		}

		for (let i = 9; i <= 12; i++) {
			this.bottomAnimations.push(this.imageMap.get(`${IMG_BLOCKSIDE_PREFIX} (${i }).png`))
		}

		for (let i = 17; i <= 20; i++) {
			this.leftAnimations.push(this.imageMap.get(`${IMG_BLOCKSIDE_PREFIX} (${i }).png`))
		}

		for (let i = 25; i <= 28; i++) {
			this.rightAnimations.push(this.imageMap.get(`${IMG_BLOCKSIDE_PREFIX} (${i }).png`))
		}
	}
}
