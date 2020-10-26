import {EVENT_ENUM} from './enums/index'
import Singleton from './base/Singleton'

export default class EventManager extends Singleton {

  static get Instance() {
    return super.GetInstance(EventManager)
  }

	constructor() {
		super()
		this.eventDic = new Map()

		// Object.keys(EVENT_ENUM).forEach(event => {
		// 	this.eventDic.put(event, [])
		// })
	}

	on(event, action) {
		if (this.eventDic.has(event)) {
			this.eventDic[event].push(action)
		} else {

			this.eventDic.set(event,[action])
		}
	}

	off(event, action) {
		if (this.eventDic.has(event)) {
			const index = this.eventDic[event].findIndex(i => action === i)
			index > -1 && this.eventDic[event].splice()
		}
	}

	emit(event, params) {
		if (this.eventDic.has(event)) {
			this.eventDic.get(event).forEach(action => {
				action(params)
			})
		}
	}

	clear() {
		this.eventDic.clear()
	}
}
