import TurnRightTopState from './TurnRight/TurnRightTopState'
import TurnRightBottomState from './TurnRight/TurnRightBottomState'
import TurnRightLeftState from './TurnRight/TurnRightLeftState'
import TurnRightRightState from './TurnRight/TurnRightRightState'
import DirectionStateMachine from '../../base/DirectionStateMachine'

const IMG_TURN_PREFIX = 'images/turn/turn'

export default class TurnRightSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
	}

  initClass(){
    this.topClass = TurnRightTopState
    this.bottomClass = TurnRightBottomState
    this.leftClass = TurnRightLeftState
    this.rightClass = TurnRightRightState
  }

	initAnimations() {
		this.topAnimations = []
		this.bottomAnimations = []
		this.leftAnimations = []
		this.rightAnimations = []

		for (let i = 19; i <= 21; i++) {
			this.topAnimations.push(this.imageMap.get(`${IMG_TURN_PREFIX} (${i }).png`))
		}

		for (let i = 13; i <= 15; i++) {
			this.bottomAnimations.push(this.imageMap.get(`${IMG_TURN_PREFIX} (${i }).png`))
		}

		for (let i = 16; i <= 18; i++) {
			this.leftAnimations.push(this.imageMap.get(`${IMG_TURN_PREFIX} (${i }).png`))
		}

		for (let i = 22; i <= 24; i++) {
			this.rightAnimations.push(this.imageMap.get(`${IMG_TURN_PREFIX} (${i }).png`))
		}
	}
}
