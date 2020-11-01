import StateMachine from '../../base/StateMachine'
import {DIRECTION_ENUM, FSM_PARAM_TYPE_ENUM} from '../../../enums/index'
import IdleSubStateMachine from './IdleSubStateMachine'
import AttackSubStateMachine from './AttackSubStateMachine'
import DeathSubStateMachine from './DeathSubStateMachine'

const PARAMS_NAME = {
	OPEN:'OPEN'
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
		this.params.set(PARAMS_NAME.OPEN, {
			type: FSM_PARAM_TYPE_ENUM.BOOLEAN,
			value: false
		})
	}

	initState() {
		this.states.set(DIRECTION_ENUM.TOP, new (this.owner, this))
		this.states.set(DIRECTION_ENUM.BOTTOM, new AttackSubStateMachine(this.owner, this))
		this.states.set(DIRECTION_ENUM.LEFT, new DeathSubStateMachine(this.owner, this))
		this.states.set(DIRECTION_ENUM.RIGHT, new DeathSubStateMachine(this.owner, this))
		this.currentState = this.states.get(PLAYER_STATE.IDLE)
	}

	run() {
		const currentState = this.currentState
		switch (currentState) {
			case this.states.get(PLAYER_STATE.IDLE):
				if (this.params.get(PARAMS_NAME.ATTACK).value) {
					this.currentState = this.states.get(PLAYER_STATE.ATTACK)
				} else if (this.params.get(PARAMS_NAME.DEATH).value) {
					this.currentState = this.states.get(PLAYER_STATE.DEATH)
				}
				break
			case this.states.get(PLAYER_STATE.ATTACK):
				break
			case  this.states.get(PLAYER_STATE.DEATH):
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
}
