// const __ = {
// 	timer: Symbol('timer'),
// }


const _currentState = Symbol('currentState')

/***
 * 子有限状态机基类
 * 用处：例如有个idle的state，但是有多个方向，为了让主状态机更整洁，可以把同类型的但具体不同的state都封装在子状态机种
 */
export default class SubStateMachine {
	constructor(owner,fsm) {
		this.states = new Map()
		this.currentState = null
	}

	[_currentState] = null

	get currentState() {
		return this[_currentState]
	}

	set currentState(value) {
		this.stop()
		this[_currentState] = value
		this[_currentState].play()
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
}
