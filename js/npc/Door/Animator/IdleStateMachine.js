import DirectionStateMachine from '../../../base/DirectionStateMachine'
import CloseTopState from './Idle/CloseTopState'
import CloseBottomState from './Idle/CloseBottomState'
import CloseLeftState from './Idle/CloseLeftState'
import CloseRightState from './Idle/CloseRightState'

const IMG_DOOR_PREFIX = 'images/bg/bg'

export default class IdleStateMachine extends DirectionStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.topClass = CloseTopState
		this.bottomClass = CloseBottomState
		this.leftClass = CloseLeftState
		this.rightClass = CloseRightState
	}

	initAnimations() {
		this.topAnimations = []
		this.bottomAnimations = []
		this.leftAnimations = []
		this.rightAnimations = []

		for (let i = 13; i <= 16; i++) {
			this.topAnimations.push(this.imageMap.get(`${IMG_DOOR_PREFIX} (${i }).png`))
		}

		for (let i = 1; i <= 4; i++) {
			this.bottomAnimations.push(this.imageMap.get(`${IMG_DOOR_PREFIX} (${i }).png`))
		}

		for (let i = 9; i <= 12; i++) {
			this.leftAnimations.push(this.imageMap.get(`${IMG_DOOR_PREFIX} (${i }).png`))
		}

		for (let i = 5; i <= 8; i++) {
			this.rightAnimations.push(this.imageMap.get(`${IMG_DOOR_PREFIX} (${i }).png`))
		}
	}
}
