import SubStateMachine from '../../base/SubStateMachine'
import {PLAYER_STATE} from '../../enums/index'
import {DIRECTION_ENUM} from '../../enums/index'
import TurnRightTopState from './TurnRight/TurnRightTopState'
import TurnRightBottom from './TurnRight/TurnRightBottom'
import TurnRightLeftState from './TurnRight/TurnRightLeftState'
import TurnRightRightState from './TurnRight/TurnRightRightState'
import {PARAMS_NAME} from './PlayerStateMachine'

export default class TurnRightSubStateMachine extends SubStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.init()
	}

	init() {
		this.initState()
	}

	initState() {
		this.states.set(DIRECTION_ENUM.TOP, new TurnRightTopState(this.owner, this, []))
		this.states.set(DIRECTION_ENUM.BOTTOM, new TurnRightBottom(this.owner, this, []))
		this.states.set(DIRECTION_ENUM.LEFT, new TurnRightLeftState(this.owner, this, []))
		this.states.set(PLAYER_STATE.RIGHT, new TurnRightRightState(this.owner, this, []))
		this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
	}

	run() {
		const currentState = this.currentState
		switch (currentState) {
			case this.states.get(DIRECTION_ENUM.TOP):
				this.switch()
				break
			case this.states.get(DIRECTION_ENUM.BOTTOM):
				this.switch()
				break
			case  this.states.get(DIRECTION_ENUM.LEFT):
				this.switch()
				break
			case this.states.get(DIRECTION_ENUM.RIGHT):
				this.switch()
				break
			default:
				this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
				break
		}
	}

	switch(){
		if (this.params.get(PARAMS_NAME.DIRECTION).value === 0) {
			this.currentState = this.states.get(DIRECTION_ENUM.TOP)
		} else if (this.params.get(PARAMS_NAME.DIRECTION).value=== 1) {
			this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
		} else if (this.params.get(PARAMS_NAME.DIRECTION).value=== 1) {
			this.currentState = this.states.get(DIRECTION_ENUM.LEFT)
		} else if (this.params.get(PARAMS_NAME.DIRECTION).value=== 1) {
			this.currentState = this.states.get(DIRECTION_ENUM.RIGHT)
		}
	}

	render() {
		this.currentState.render()
	}
}