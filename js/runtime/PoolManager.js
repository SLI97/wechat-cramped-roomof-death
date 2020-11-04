import Singleton from '../base/Singleton'

const poolDic = Symbol('poolDic')

/**
 * 对象池管理类
 */
export default class PoolManager extends Singleton {
	static get Instance() {
		return super.GetInstance(PoolManager)
	}

	constructor() {
		super()
		this[poolDic] = new Map()
	}

	/**
	 * 根据对象标识符
	 * 获取对应的对象池
	 */
	getPoolBySign(name) {
		return this[poolDic].get(name) || (this[poolDic].set(name, []))
	}

	/**
	 * 根据传入的对象标识符，查询对象池
	 * 对象池为空创建新的类，否则从对象池中取
	 */
	getItemByClass(name, className) {
		let pool = this.getPoolBySign(name)

		let result = pool.length ? pool.shift() : new className()
		return result
	}

	/**
	 * 将对象回收到对象池
	 * 方便后续继续使用
	 */
	recover(name, instance) {
		this.getPoolBySign(name).push(instance)
	}
}
