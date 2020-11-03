import BlockTurnRightTopState from './BlockTurnRight/BlockTurnRightTopState'
import BlockTurnRightBottomState from './BlockTurnRight/BlockTurnRightBottomState'
import BlockTurnRightLeftState from './BlockTurnRight/BlockTurnRightLeftState'
import BlockTurnRightRightState from './BlockTurnRight/BlockTurnRightRightState'
import DirectionStateMachine from '../../base/DirectionStateMachine'

const IMG_IDLE_PREFIX = 'images/idle/idle'

export default class DeathSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
	}

  initClass(){
    this.topClass = BlockTurnRightTopState
    this.bottomClass = BlockTurnRightBottomState
    this.leftClass = BlockTurnRightLeftState
    this.rightClass = BlockTurnRightRightState
  }

	initAnimations() {
		this.topAnimations = []
		this.bottomAnimations = []
		this.leftAnimations = []
		this.rightAnimations = []

		for (let i = 5; i <= 8; i++) {
			this.topAnimations.push(this.imageMap.get(`${IMG_IDLE_PREFIX} (${i }).png`))
		}

		for (let i = 13; i <= 16; i++) {
			this.bottomAnimations.push(this.imageMap.get(`${IMG_IDLE_PREFIX} (${i }).png`))
		}

		for (let i = 21; i <= 24; i++) {
			this.leftAnimations.push(this.imageMap.get(`${IMG_IDLE_PREFIX} (${i }).png`))
		}

		for (let i = 29; i <= 32; i++) {
			this.rightAnimations.push(this.imageMap.get(`${IMG_IDLE_PREFIX} (${i }).png`))
		}
	}
}
