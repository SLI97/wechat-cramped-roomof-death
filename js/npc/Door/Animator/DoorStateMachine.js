import StateMachine from '../../base/StateMachine'
import {DIRECTION_ENUM, FSM_PARAM_TYPE_ENUM} from '../../../enums/index'
import IdleSubStateMachine from './IdleSubStateMachine'
import AttackSubStateMachine from './AttackSubStateMachine'
import DeathSubStateMachine from './DeathSubStateMachine'
import OpenTopState from './Open/OpenTopState'
import OpenBottomState from './Open/OpenBottomState'
import OpenLeftState from './Open/OpenLeftState'
import OpenRightState from './Open/OpenRightState'
import DoorOpenSubStateMachine from './DoorOpenSubStateMachine'
import DoorCloseSubStateMachine from './DoorCloseSubStateMachine'

export const PARAMS_NAME = {
	OPEN:'OPEN',
	DIRECTION:'DIRECTION'
}

const DOOR_STATE_ENUM = {
	OPEN:'OPEN',
	CLOSE:'CLOSE',
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
		this.params.set(PARAMS_NAME.OPEN, {
			type: FSM_PARAM_TYPE_ENUM.BOOLEAN,
			value: false
		})

		this.params.set(PARAMS_NAME.DIRECTION, {
			type: FSM_PARAM_TYPE_ENUM.NUMBER,
			value: 1
		})
	}

	initState() {
		this.states.set(DOOR_STATE_ENUM.OPEN, new DoorOpenSubStateMachine(this.owner, this))
		this.states.set(DOOR_STATE_ENUM.CLOSE, new DoorCloseSubStateMachine(this.owner, this))
		this.currentState = this.states.get(DOOR_STATE_ENUM.CLOSE)
	}

	run() {
		const currentState = this.currentState
		switch (currentState) {
			case this.states.get(DOOR_STATE_ENUM.OPEN):
				if (!this.params.get(PARAMS_NAME.OPEN).value) {
					this.currentState = this.states.get(DOOR_STATE_ENUM.CLOSE)
				}
				break
			case this.states.get(DOOR_STATE_ENUM.CLOSE):
				if (!this.params.get(PARAMS_NAME.OPEN).value) {
					this.currentState = this.states.get(DOOR_STATE_ENUM.OPEN)
				}
				break
			default:
				this.currentState = this.states.get(DOOR_STATE_ENUM.CLOSE)
				break
		}
	}

	render() {
		this.currentState.render()
	}
}
