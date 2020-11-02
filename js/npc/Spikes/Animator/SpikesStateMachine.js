import StateMachine from '../../../base/StateMachine'
import {DIRECTION_ENUM, FSM_PARAM_TYPE_ENUM} from '../../../enums/index'
import SpikesOneState from './SpikesOneState'
import SpikesTwoState from './SpikesTwoState'
import SpikesThreeState from './SpikesThreeState'
import SpikesFourState from './SpikesFourState'

export const PARAMS_NAME = {
	OPEN:'OPEN',
	DIRECTION:'DIRECTION'
}

const DOOR_STATE_ENUM = {
	OPEN:'OPEN',
	CLOSE:'CLOSE',
}

export default class SpikesStateMachine extends StateMachine {
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
		this.states.set(DOOR_STATE_ENUM.OPEN, new SpikesOneState(this.owner, this))
		this.states.set(DOOR_STATE_ENUM.OPEN, new SpikesTwoState(this.owner, this))
		this.states.set(DOOR_STATE_ENUM.OPEN, new SpikesThreeState(this.owner, this))
		this.states.set(DOOR_STATE_ENUM.OPEN, new SpikesFourState(this.owner, this))
		this.currentState = this.states.get(DOOR_STATE_ENUM.CLOSE)
	}

	update() {
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
}
