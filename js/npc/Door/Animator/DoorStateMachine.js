import StateMachine from '../../../base/StateMachine'
import {FSM_PARAM_TYPE_ENUM, PLAYER_STATE} from '../../../enums/index'
import DeathSubStateMachine from './DeathSubStateMachine'
import IdleStateMachine from './IdleStateMachine'

const PARAMS_NAME = {
	DEATH: 'DEATH',
	DIRECTION: 'DIRECTION',
}

export default class DoorStateMachine extends StateMachine {
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
		this.params.set(PARAMS_NAME.DEATH, {
			type: FSM_PARAM_TYPE_ENUM.TRIGGER,
			value: false
		})

		this.params.set(PARAMS_NAME.DIRECTION, {
			type: FSM_PARAM_TYPE_ENUM.NUMBER,
			value: 0
		})
	}

	initState() {
		this.states.set(PLAYER_STATE.IDLE, new IdleStateMachine(this.owner, this))
		this.states.set(PLAYER_STATE.DEATH, new DeathSubStateMachine(this.owner, this))
		this.currentState = this.states.get(PLAYER_STATE.IDLE)
	}

	update() {
		super.update()

		const currentState = this.currentState
		switch (currentState) {
			case this.states.get(PLAYER_STATE.IDLE):
				if (!this.params.get(PARAMS_NAME.DEATH).value) {
					this.currentState = this.states.get(PLAYER_STATE.DEATH)
				}
				break
			case this.states.get(PLAYER_STATE.DEATH):
				if (this.params.get(PARAMS_NAME.OPEN).value) {
					this.currentState = this.states.get(PARAMS_NAME.IDLE)
				}
				break
			default:
				this.currentState = this.states.get(PLAYER_STATE.IDLE)
				break
		}
	}
}
