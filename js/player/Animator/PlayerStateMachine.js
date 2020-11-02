import StateMachine from '../../base/StateMachine'
import {
	FSM_PARAM_TYPE_ENUM
} from '../../enums/index'
import IdleSubStateMachine from './IdleSubStateMachine'
import AttackSubStateMachine from './AttackSubStateMachine'
import TurnLeftSubStateMachine from './TurnLeftSubStateMachine'
import TurnRightSubStateMachine from './TurnRightSubStateMachine'
import BlockFrontSubStateMachine from './BlockFrontSubStateMachine'
import BlockBackSubStateMachine from './BlockBackSubStateMachine'
import BlockLeftSubStateMachine from './BlockLeftSubStateMachine'
import BlockRightSubStateMachine from './BlockRightSubStateMachine'
import DeathSubStateMachine from './DeathSubStateMachine'
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

/***
 * 玩家状态机，根据参数调节自身信息渲染人物
 */
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
			value: 0
		})
	}

	initState() {
		this.states.set(PARAMS_NAME.IDLE, new IdleSubStateMachine(this.owner, this))
		this.states.set(PARAMS_NAME.ATTACK, new AttackSubStateMachine(this.owner, this))
		this.states.set(PARAMS_NAME.TURNLEFT, new TurnLeftSubStateMachine(this.owner, this))
		this.states.set(PARAMS_NAME.TURNRIGHT, new TurnRightSubStateMachine(this.owner, this))
		this.states.set(PARAMS_NAME.BLOCKFRONT, new BlockFrontSubStateMachine(this.owner, this))
		this.states.set(PARAMS_NAME.BLOCKBACK, new BlockBackSubStateMachine(this.owner, this))
		this.states.set(PARAMS_NAME.BLOCKLEFT, new BlockLeftSubStateMachine(this.owner, this))
		this.states.set(PARAMS_NAME.BLOCKRIGHT, new BlockRightSubStateMachine(this.owner, this))
		this.states.set(PARAMS_NAME.BLOCKTURNLEFT, new BlockTurnLeftSubStateMachine(this.owner, this))
		this.states.set(PARAMS_NAME.BLOCKTURNRIGHT, new BlockTurnRightSubStateMachine(this.owner, this))
		// this.states.set(PARAMS_NAME.DEATH, new DeathSubStateMachine(this.owner, this))
		this.currentState = this.states.get(PARAMS_NAME.IDLE)
	}

	update() {
		super.update()

		const currentState = this.currentState
		switch (currentState) {
			case this.states.get(PARAMS_NAME.IDLE):
				this.switch()
				break
			case this.states.get(PARAMS_NAME.ATTACK):
				this.switch()
				break
			case this.states.get(PARAMS_NAME.TURNLEFT):
				this.switch()
				break
			case this.states.get(PARAMS_NAME.TURNRIGHT):
				this.switch()
				break
			case this.states.get(PARAMS_NAME.BLOCKTURNLEFT):
				this.switch()
				break
			case this.states.get(PARAMS_NAME.BLOCKTURNRIGHT):
				this.switch()
				break
			case this.states.get(PARAMS_NAME.BLOCKFRONT):
				this.switch()
				break
			case this.states.get(PARAMS_NAME.BLOCKBACK):
				this.switch()
				break
			case this.states.get(PARAMS_NAME.BLOCKLEFT):
				this.switch()
				break
			case this.states.get(PARAMS_NAME.BLOCKRIGHT):
				this.switch()
				break
			case this.states.get(PARAMS_NAME.DEATH):
				this.switch()
				break
			default:
				this.currentState = this.states.get(PARAMS_NAME.IDLE)
				break
		}
	}

	switch () {
		if (this.params.get(PARAMS_NAME.TURNLEFT).value) {
			this.currentState = this.states.get(PARAMS_NAME.TURNLEFT)
		} else if (this.params.get(PARAMS_NAME.TURNRIGHT).value) {
			this.currentState = this.states.get(PARAMS_NAME.TURNRIGHT)
		} else if (this.params.get(PARAMS_NAME.IDLE).value) {
			this.currentState = this.states.get(PARAMS_NAME.IDLE)
		} else if (this.params.get(PARAMS_NAME.BLOCKFRONT).value) {
			this.currentState = this.states.get(PARAMS_NAME.BLOCKFRONT)
		} else if (this.params.get(PARAMS_NAME.BLOCKBACK).value) {
			this.currentState = this.states.get(PARAMS_NAME.BLOCKBACK)
		} else if (this.params.get(PARAMS_NAME.BLOCKLEFT).value) {
			this.currentState = this.states.get(PARAMS_NAME.BLOCKLEFT)
		} else if (this.params.get(PARAMS_NAME.BLOCKRIGHT).value) {
			this.currentState = this.states.get(PARAMS_NAME.BLOCKRIGHT)
		} else if (this.params.get(PARAMS_NAME.BLOCKTURNLEFT).value) {
			this.currentState = this.states.get(PARAMS_NAME.BLOCKTURNLEFT)
		} else if (this.params.get(PARAMS_NAME.BLOCKTURNRIGHT).value) {
			this.currentState = this.states.get(PARAMS_NAME.BLOCKTURNRIGHT)
		} else if (this.params.get(PARAMS_NAME.ATTACK).value) {
			this.currentState = this.states.get(PARAMS_NAME.ATTACK)
		}
	}
}
