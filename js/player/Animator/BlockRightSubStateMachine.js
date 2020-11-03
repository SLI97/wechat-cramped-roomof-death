import BlockRightTopState from './BlockRight/BlockRightTopState'
import BlockRightBottomState from './BlockRight/BlockRightBottomState'
import BlockRightLeftState from './BlockRight/BlockRightLeftState'
import BlockRightRightState from './BlockRight/BlockRightRightState'
import DirectionStateMachine from '../../base/DirectionStateMachine'

const IMG_BLOCKSIDE_PREFIX = 'images/blockside/blockside'

export default class BlockRightSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
	}

  initClass(){
    this.topClass = BlockRightTopState
    this.bottomClass = BlockRightBottomState
    this.leftClass = BlockRightLeftState
    this.rightClass = BlockRightRightState
  }

	initAnimations() {
		this.topAnimations = []
		this.bottomAnimations = []
		this.leftAnimations = []
		this.rightAnimations = []

		for (let i = 5; i <= 8; i++) {
			this.topAnimations.push(this.imageMap.get(`${IMG_BLOCKSIDE_PREFIX} (${i }).png`))
		}

		for (let i = 13; i <= 16; i++) {
			this.bottomAnimations.push(this.imageMap.get(`${IMG_BLOCKSIDE_PREFIX} (${i }).png`))
		}

		for (let i = 21; i <= 24; i++) {
			this.leftAnimations.push(this.imageMap.get(`${IMG_BLOCKSIDE_PREFIX} (${i }).png`))
		}

		for (let i = 29; i <= 32; i++) {
			this.rightAnimations.push(this.imageMap.get(`${IMG_BLOCKSIDE_PREFIX} (${i }).png`))
		}
	}
}
