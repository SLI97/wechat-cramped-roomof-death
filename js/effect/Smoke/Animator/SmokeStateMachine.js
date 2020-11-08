import StateMachine from '../../../base/StateMachine'
import {
	DIRECTION_ENUM,
	FSM_PARAM_TYPE_ENUM, PLAYER_STATE
} from '../../../enums/index'
import IdleSubStateMachine from './IdleSubStateMachine'
import DeathSubStateMachine from './DeathSubStateMachine'

const PARAMS_NAME = {
	DEATH: 'DEATH',
	IDLE: 'IDLE',
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
		this.params.set(PARAMS_NAME.IDLE, {
			type: FSM_PARAM_TYPE_ENUM.TRIGGER,
			value: false
		})

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
		this.states.set(PLAYER_STATE.IDLE, new IdleSubStateMachine(this.owner, this))
		this.states.set(PLAYER_STATE.DEATH, new DeathSubStateMachine(this.owner, this))
		this.currentState = this.states.get(PLAYER_STATE.DEATH)
	}

	update() {
		const currentState = this.currentState
		switch (currentState) {
			case this.states.get(PLAYER_STATE.IDLE):
				if (this.params.get(PARAMS_NAME.DEATH).value) {
					this.currentState = this.states.get(PARAMS_NAME.DEATH)
				}
				break
			case this.states.get(PLAYER_STATE.DEATH):
				if (this.params.get(PARAMS_NAME.IDLE).value) {
					this.currentState = this.states.get(PARAMS_NAME.IDLE)
				}
				break
			default:
				this.currentState = this.states.get(PLAYER_STATE.IDLE)
				break
		}

		super.update()
	}
}
