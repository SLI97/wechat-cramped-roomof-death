import BlockBackTopState from './BlockBack/BlockBackTopState'
import BlockBackBottomState from './BlockBack/BlockBackBottomState'
import BlockBackLeftState from './BlockBack/BlockBackLeftState'
import BlockBackRightState from './BlockBack/BlockBackRightState'
import DirectionStateMachine from '../../base/DirectionStateMachine'

const IMG_BLOCKFACE_PREFIX = 'images/blockface/blockface'

export default class BlockBackSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.topClass = BlockBackTopState
		this.bottomClass = BlockBackBottomState
		this.leftClass = BlockBackLeftState
		this.rightClass = BlockBackRightState
	}

	initAnimations() {
		this.topAnimations = []
		this.bottomAnimations = []
		this.leftAnimations = []
		this.rightAnimations = []

		for (let i = 5; i <= 8; i++) {
			this.topAnimations.push(this.imageMap.get(`${IMG_BLOCKFACE_PREFIX} (${i }).png`))
		}

		for (let i = 13; i <= 16; i++) {
			this.bottomAnimations.push(this.imageMap.get(`${IMG_BLOCKFACE_PREFIX} (${i }).png`))
		}

		for (let i = 21; i <= 24; i++) {
			this.leftAnimations.push(this.imageMap.get(`${IMG_BLOCKFACE_PREFIX} (${i }).png`))
		}

		for (let i = 29; i <= 32; i++) {
			this.rightAnimations.push(this.imageMap.get(`${IMG_BLOCKFACE_PREFIX} (${i }).png`))
		}
	}
}
