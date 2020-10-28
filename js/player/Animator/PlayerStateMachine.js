import StateMachine from '../../base/StateMachine'
import {PLAYER_STATE, FSM_PARAM_TYPE_ENUM} from '../../enums/index'
import IdleSubStateMachine from './IdleSubStateMachine'
import AttackSubStateMachine from './AttackSubStateMachine'
import TurnLeftSubStateMachine from './TurnLeftSubStateMachine'
import TurnRightSubStateMachine from './TurnRightSubStateMachine'
import BlockSubStateMachine from './BlockSubStateMachine'
import DeathSubStateMachine from './DeathSubStateMachine'

export const PARAMS_NAME = {
	IDLE: 'IDLE',
	ATTACK: 'ATTACK',
	TURNLEFT: 'TURNLEFT',
	TURNRIGHT: 'TURNRIGHT',
	BLOCK: 'BLOCK',
	DEATH: 'DEATH',
	DIRECTION: 'DIRECTION',
}

export default class PlayerStateMachine extends StateMachine {
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
			value: false,
		})

		this.params.set(PARAMS_NAME.ATTACK, {
			type: FSM_PARAM_TYPE_ENUM.TRIGGER,
			value: false,
		})

		this.params.set(PARAMS_NAME.TURNLEFT, {
			type: FSM_PARAM_TYPE_ENUM.TRIGGER,
			value: false,
		})

		this.params.set(PARAMS_NAME.TURNRIGHT, {
			type: FSM_PARAM_TYPE_ENUM.TRIGGER,
			value: false,
		})

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
		this.states.set(PLAYER_STATE.ATTACK, new AttackSubStateMachine(this.owner, this))
		this.states.set(PLAYER_STATE.TURNRIGHT, new TurnLeftSubStateMachine(this.owner, this))
		this.states.set(PLAYER_STATE.TURNLEFT, new TurnRightSubStateMachine(this.owner, this))
		this.states.set(PLAYER_STATE.BLOCK, new BlockSubStateMachine(this.owner, this))
		this.states.set(PLAYER_STATE.DEATH, new DeathSubStateMachine(this.owner, this))
		this.currentState = this.states.get(PLAYER_STATE.IDLE)
	}

	run() {
		const currentState = this.currentState
		switch (currentState) {
			case this.states.get(PLAYER_STATE.IDLE):
				this.switch()
				break
			case this.states.get(PLAYER_STATE.ATTACK):
				this.switch()
				break
			case  this.states.get(PLAYER_STATE.TURNLEFT):
				this.switch()
				break
			case this.states.get(PLAYER_STATE.TURNRIGHT):
				this.switch()
				break
			case this.states.get(PLAYER_STATE.BLOCK):
				this.switch()
				break
			case  this.states.get(PLAYER_STATE.DEATH):
				this.switch()
				break
			default:
				this.currentState = this.states.get(PLAYER_STATE.IDLE)
				break
		}
		this.resetTrigger()
	}

	render() {
		this.currentState.render()
	}

	switch() {
		if (this.params.get(PARAMS_NAME.ATTACK).value) {
			this.currentState = this.states.get(PLAYER_STATE.ATTACK)
		} else if (this.params.get(PARAMS_NAME.BLOCK).value) {
			this.currentState = this.states.get(PLAYER_STATE.BLOCK)
		} else if (this.params.get(PARAMS_NAME.DEATH).value) {
			this.currentState = this.states.get(PLAYER_STATE.DEATH)
		} else if (this.params.get(PARAMS_NAME.TURNLEFT).value) {
			this.currentState = this.states.get(PLAYER_STATE.TURNLEFT)
		} else if (this.params.get(PARAMS_NAME.TURNRIGHT).value) {
			this.currentState = this.states.get(PLAYER_STATE.TURNRIGHT)
		} else if (this.params.get(PARAMS_NAME.IDLE).value) {
			this.currentState = this.states.get(PLAYER_STATE.IDLE)
		}
	}
}
