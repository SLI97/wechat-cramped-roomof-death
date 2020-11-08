import Singleton from '../base/Singleton'

/***
 * 事件中心管理类（本质就是一张map，key是事件名称，value是对应事件的函数列表）
 */
export default class EventManager extends Singleton {

  static get Instance() {
    return super.GetInstance(EventManager)
  }

	constructor() {
		super()
		this.eventDic = new Map()
	}

	on(event, action) {
		if (this.eventDic.has(event)) {

			this.eventDic.get(event).push(action)
		} else {

			this.eventDic.set(event,[action])
		}
	}

	off(event, action) {
		if (this.eventDic.has(event)) {
			const index = this.eventDic.get(event).findIndex(i => action === i)
			index > -1 && this.eventDic.get(event).splice(index,1)
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
