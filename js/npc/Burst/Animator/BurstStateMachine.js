import StateMachine from '../../../base/StateMachine'
import {DIRECTION_ENUM, FSM_PARAM_TYPE_ENUM} from '../../../enums/index'
import BurstState from './BurstState'

export const PARAMS_NAME = {
	INACTIVE:'INACTIVE',
}

const BURST_STATE_ENUM = {
	ACTIVE:'ACTIVE',
	INACTIVE:'INACTIVE',
}


export default class BurstStateMachine extends StateMachine {
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
		this.params.set(PARAMS_NAME.INACTIVE, {
			type: FSM_PARAM_TYPE_ENUM.TRIGGER,
			value: false
		})
	}

	initState() {
		this.states.set(BURST_STATE_ENUM.INACTIVE, new BurstState(this.owner, this))
		this.currentState = this.states.get(BURST_STATE_ENUM.INACTIVE)
	}

	run() {
		const currentState = this.currentState
		switch (currentState) {
			case this.states.get(BURST_STATE_ENUM.ACTIVE):
				if (this.params.get(PARAMS_NAME.INACTIVE).value) {
					this.currentState = this.states.get(BURST_STATE_ENUM.INACTIVE)
				}
				break
			default:
				break
		}
		this.resetTrigger()
	}

	render() {
		this.currentState.render()
	}
}
