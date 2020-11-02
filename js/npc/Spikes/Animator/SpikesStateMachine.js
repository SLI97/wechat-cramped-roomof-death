import StateMachine from '../../../base/StateMachine'
import {DIRECTION_ENUM, FSM_PARAM_TYPE_ENUM} from '../../../enums/index'
import SpikesOneSubStateMachine from './SpikesOneSubStateMachine'
import SpikesTwoSubStateMachine from './SpikesTwoSubStateMachine'
import SpikesThreeSubStateMachine from './SpikesThreeSubStateMachine'
import SpikesFourSubStateMachine from './SpikesFourSubStateMachine'

export const PARAMS_NAME = {
	TYPE:'TYPE',
	COUNT:'COUNT',
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

		this.params.set(PARAMS_NAME.COUNT, {
			type: FSM_PARAM_TYPE_ENUM.NUMBER,
			value: 1
		})
	}

	initState() {
		this.states.set(DOOR_STATE_ENUM.OPEN, new SpikesOneSubStateMachine(this.owner, this))
		this.states.set(DOOR_STATE_ENUM.OPEN, new SpikesTwoSubStateMachine(this.owner, this))
		this.states.set(DOOR_STATE_ENUM.OPEN, new SpikesThreeSubStateMachine(this.owner, this))
		this.states.set(DOOR_STATE_ENUM.OPEN, new SpikesFourSubStateMachine(this.owner, this))
		this.currentState = this.states.get(DOOR_STATE_ENUM.CLOSE)
	}
	//
	// update() {
	// 	super.update()
	// }
}
