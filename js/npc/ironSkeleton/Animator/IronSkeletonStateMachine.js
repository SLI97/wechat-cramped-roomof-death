import StateMachine from '../../../base/StateMachine'
import {
	PLAYER_STATE,
	FSM_PARAM_TYPE_ENUM
} from '../../../enums/index'
import IdleSubStateMachine from './IdleSubStateMachine'
import DeathSubStateMachine from './DeathSubStateMachine'

const PARAMS_NAME = {
	DEATH: 'DEATH',
	DIRECTION: 'DIRECTION',
}


export default class IronSkeletonStateMachine extends StateMachine {
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
		this.params.set(PARAMS_NAME.BLOCK, {
			type: FSM_PARAM_TYPE_ENUM.TRIGGER,
			value: false,
		})

		this.params.set(PARAMS_NAME.DEATH, {
			type: FSM_PARAM_TYPE_ENUM.TRIGGER,
			value: false,
		})

		this.params.set(PARAMS_NAME.DIRECTION, {
			type: FSM_PARAM_TYPE_ENUM.NUMBER,
			value: 1
		})
	}

	initState() {
		this.states.set(PLAYER_STATE.IDLE, new IdleSubStateMachine(this.owner, this))
		this.states.set(PLAYER_STATE.DEATH, new DeathSubStateMachine(this.owner, this))
		this.currentState = this.states.get(PLAYER_STATE.IDLE)
	}

	render() {
		if (this.currentState) {
			this.currentState.render()
		}
	}

	run() {
		const currentState = this.currentState
		switch (currentState) {
			case this.states.get(PLAYER_STATE.IDLE):
				if (this.params.get(PARAMS_NAME.DEATH).value) {
					this.currentState = this.states.get(PLAYER_STATE.DEATH)
				}
				break
			case this.states.get(PLAYER_STATE.DEATH):
				break
			default:
				this.currentState = this.states.get(PLAYER_STATE.IDLE)
				break
		}
		this.currentState.run()
		this.resetTrigger()
	}
}