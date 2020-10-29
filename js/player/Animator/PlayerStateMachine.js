import StateMachine from '../../base/StateMachine'
import {PARAMS_NAME, FSM_PARAM_TYPE_ENUM} from '../../enums/index'
import IdleSubStateMachine from './IdleSubStateMachine'
import AttackSubStateMachine from './AttackSubStateMachine'
import TurnLeftSubStateMachine from './TurnLeftSubStateMachine'
import TurnRightSubStateMachine from './TurnRightSubStateMachine'
import BlockRightSubStateMachine from './BlockRightSubStateMachine'
import DeathSubStateMachine from './DeathSubStateMachine'
import BlockLeftSubStateMachine from './BlockLeftSubStateMachine'
import BlockTurnLeftSubStateMachine from './BlockTurnLeftSubStateMachine'
import BlockTurnRightSubStateMachine from './BlockTurnRightSubStateMachine'

export const PARAMS_NAME = {
	IDLE: 'IDLE',
	ATTACK: 'ATTACK',
	TURNLEFT: 'TURNLEFT',
	TURNRIGHT: 'TURNRIGHT',
	BLOCKFRONT: 'BLOCKFRONT',
	BLOCKBACK: 'BLOCKBACK',
	BLOCKLEFT: 'BLOCKLEFT',
	BLOCKRIGHT: 'BLOCKRIGHT',
	BLOCKTURNLEFT: 'BLOCKTURNLEFT',
	BLOCKTURNRIGHT: 'BLOCKTURNRIGHT',
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

		this.params.set(PARAMS_NAME.BLOCKFRONT, {
			type: FSM_PARAM_TYPE_ENUM.TRIGGER,
			value: false,
		})

		this.params.set(PARAMS_NAME.BLOCKBACK, {
			type: FSM_PARAM_TYPE_ENUM.TRIGGER,
			value: false,
		})

		this.params.set(PARAMS_NAME.BLOCKLEFT, {
			type: FSM_PARAM_TYPE_ENUM.TRIGGER,
			value: false,
		})

		this.params.set(PARAMS_NAME.BLOCKRIGHT, {
			type: FSM_PARAM_TYPE_ENUM.TRIGGER,
			value: false,
		})

		this.params.set(PARAMS_NAME.BLOCKTURNLEFT, {
			type: FSM_PARAM_TYPE_ENUM.TRIGGER,
			value: false,
		})

		this.params.set(PARAMS_NAME.BLOCKTURNRIGHT, {
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
		this.states.set(PARAMS_NAME.IDLE, new IdleSubStateMachine(this.owner, this))
		this.states.set(PARAMS_NAME.ATTACK, new AttackSubStateMachine(this.owner, this))
		this.states.set(PARAMS_NAME.TURNRIGHT, new TurnLeftSubStateMachine(this.owner, this))
		this.states.set(PARAMS_NAME.TURNLEFT, new TurnRightSubStateMachine(this.owner, this))
		this.states.set(PARAMS_NAME.BLOCKLEFT, new BlockLeftSubStateMachine(this.owner, this))
		this.states.set(PARAMS_NAME.BLOCKRIGHT, new BlockRightSubStateMachine(this.owner, this))
		this.states.set(PARAMS_NAME.BLOCKTURNLEFT, new BlockTurnLeftSubStateMachine(this.owner, this))
		this.states.set(PARAMS_NAME.BLOCKTURNRIGHT, new BlockTurnRightSubStateMachine(this.owner, this))
		this.states.set(PARAMS_NAME.DEATH, new DeathSubStateMachine(this.owner, this))
		this.currentState = this.states.get(PARAMS_NAME.IDLE)
	}

	run() {
		const currentState = this.currentState
		switch (currentState) {
			case this.states.get(PARAMS_NAME.IDLE):
				this.switch()
				break
			case this.states.get(PARAMS_NAME.ATTACK):
				this.switch()
				break
			case  this.states.get(PARAMS_NAME.TURNLEFT):
				this.switch()
				break
			case this.states.get(PARAMS_NAME.TURNRIGHT):
				this.switch()
				break
			case this.states.get(PARAMS_NAME.BLOCK):
				this.switch()
				break
			case  this.states.get(PARAMS_NAME.DEATH):
				this.switch()
				break
			default:
				this.currentState = this.states.get(PARAMS_NAME.IDLE)
				break
		}
		this.resetTrigger()
	}

	render() {
		this.currentState.render()
	}

	switch() {
		if (this.params.get(PARAMS_NAME.ATTACK).value) {
			this.currentState = this.states.get(PARAMS_NAME.ATTACK)
		} else if (this.params.get(PARAMS_NAME.BLOCK).value) {
			this.currentState = this.states.get(PARAMS_NAME.BLOCK)
		} else if (this.params.get(PARAMS_NAME.DEATH).value) {
			this.currentState = this.states.get(PARAMS_NAME.DEATH)
		} else if (this.params.get(PARAMS_NAME.TURNLEFT).value) {
			this.currentState = this.states.get(PARAMS_NAME.TURNLEFT)
		} else if (this.params.get(PARAMS_NAME.TURNRIGHT).value) {
			this.currentState = this.states.get(PARAMS_NAME.TURNRIGHT)
		} else if (this.params.get(PARAMS_NAME.IDLE).value) {
			this.currentState = this.states.get(PARAMS_NAME.IDLE)
		}
	}
}
