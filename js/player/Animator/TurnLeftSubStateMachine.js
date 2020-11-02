import TurnLeftTopState from './TurnLeft/TurnLeftTopState'
import TurnLeftBottomState from './TurnLeft/TurnLeftBottomState'
import TurnLeftLeftState from './TurnLeft/TurnLeftLeftState'
import TurnLeftRightState from './TurnLeft/TurnLeftRightState'
import DirectionStateMachine from '../../base/DirectionStateMachine'

const IMG_TURN_PREFIX = 'images/turn/turn'


export default class TurnLeftSubStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.topClass = TurnLeftTopState
		this.bottomClass = TurnLeftBottomState
		this.leftClass = TurnLeftLeftState
		this.rightClass = TurnLeftRightState
	}

	initAnimations() {
		for (let i = 1; i <= 3; i++) {
			this.topAnimations.push(this.imageMap.get(`${IMG_TURN_PREFIX} (${i }).png`))
		}

		for (let i = 7; i <= 9; i++) {
			this.bottomAnimations.push(this.imageMap.get(`${IMG_TURN_PREFIX} (${i }).png`))
		}

		for (let i = 4; i <= 6; i++) {
			this.leftAnimations.push(this.imageMap.get(`${IMG_TURN_PREFIX} (${i }).png`))
		}

		for (let i = 10; i <= 12; i++) {
			this.rightAnimations.push(this.imageMap.get(`${IMG_TURN_PREFIX} (${i }).png`))
		}
	}
}
