import {PLAYER_STATE, FSM_PARAM_TYPE_ENUM} from '../enums/index'

const _currentState = Symbol('currentState')

/***
 * 有限状态机基类
 */
export default class StateMachine {
	[_currentState] = null

	get currentState() {
		return this[_currentState]
	}

	set currentState(value) {
		this.stop()
		this[_currentState] = value
		this[_currentState].play()
	}

	constructor() {
		this.params = new Map()
		this.states = new Map()
		this.currentState = null
	}

	update() {
		this.run()
	}

	run() {

	}

	render() {
	}

	stop() {
		for (const [key, value] of this.states) {
			value.stop()
		}
	}

	setParams(paramsName,value){
		if(this.params.has(paramsName)){
			this.params.set(paramsName, {
				type: FSM_PARAM_TYPE_ENUM.TRIGGER,
				value
			})
		}
	}

	resetTrigger() {
		for (const [key, value] of this.params) {
			if (key.type === FSM_PARAM_TYPE_ENUM.TRIGGER) {
				value.value = false
			}
		}
	}
}
