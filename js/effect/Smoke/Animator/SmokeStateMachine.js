import StateMachine from '../../../base/StateMachine'
import {
	DIRECTION_ENUM,
	FSM_PARAM_TYPE_ENUM
} from '../../../enums/index'
import SmokeSubStateMachine from './SmokeSubStateMachine'

const SMOKE_STATE_ENUM = {
	PLAY: 'PLAY'
}

const PARAMS_NAME = {
	DIRECTION: 'DIRECTION',
}

export default class SmokeStateMachine extends StateMachine {
	constructor(owner) {
		super()
		this.owner = owner
		this.init()
	}

	init() {
		this.initParams()
		this.initState()
	}

	initParams() {
		this.params.set(PARAMS_NAME.DIRECTION, {
			type: FSM_PARAM_TYPE_ENUM.NUMBER,
			value: 0
		})
	}

	initState() {
		this.states.set(SMOKE_STATE_ENUM.PLAY, new SmokeSubStateMachine(this.owner, this))
		this.currentState = this.states.get(SMOKE_STATE_ENUM.PLAY)
	}

	run() {
		const currentState = this.currentState
		// switch (currentState) {
		// 	default:
		// 		this.currentState = this.states.get(SMOKE_STATE_ENUM.PLAY)
		// 		break
		// }
		this.currentState.run()
		this.resetTrigger()
	}
}