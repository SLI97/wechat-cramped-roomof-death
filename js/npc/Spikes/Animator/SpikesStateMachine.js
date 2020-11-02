import StateMachine from '../../../base/StateMachine'
import {DIRECTION_ENUM, ENEMY_TYPE_ENUM, FSM_PARAM_TYPE_ENUM} from '../../../enums/index'
import SpikesOneSubStateMachine from './SpikesOneSubStateMachine'
import SpikesTwoSubStateMachine from './SpikesTwoSubStateMachine'
import SpikesThreeSubStateMachine from './SpikesThreeSubStateMachine'
import SpikesFourSubStateMachine from './SpikesFourSubStateMachine'

export const PARAMS_NAME = {
	SPIKES_TYPE: 'SPIKES_TYPE',
	COUNT: 'COUNT',
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
		this.params.set(PARAMS_NAME.SPIKES_TYPE, {
			type: FSM_PARAM_TYPE_ENUM.NUMBER,
			value: false
		})

		this.params.set(PARAMS_NAME.COUNT, {
			type: FSM_PARAM_TYPE_ENUM.NUMBER,
			value: 1
		})
	}

	initState() {
		this.states.set(ENEMY_TYPE_ENUM.SPIKES_ONE, new SpikesOneSubStateMachine(this.owner, this))
		this.states.set(ENEMY_TYPE_ENUM.SPIKES_TWO, new SpikesTwoSubStateMachine(this.owner, this))
		this.states.set(ENEMY_TYPE_ENUM.SPIKES_THREE, new SpikesThreeSubStateMachine(this.owner, this))
		this.states.set(ENEMY_TYPE_ENUM.SPIKES_FOUR, new SpikesFourSubStateMachine(this.owner, this))
		this.currentState = this.states.get(this.owner.type)
	}
}
