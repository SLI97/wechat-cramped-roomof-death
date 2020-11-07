import Singleton from '../base/Singleton'

/**
 * 全局数据管理类
 */
export default class DataManager extends Singleton {
	static get Instance() {
		return super.GetInstance(DataManager)
	}

	constructor() {
		super()
		this.reset()
	}

	reset() {
		this.frame = 0
		this.dpr = 1

		//地图偏移
		this.offset = {
			width: 0,
			height: 0
		}

		//地图信息
		this.mapInfo = []
		this.mapRowCount = 0
		this.mapColumnCount = 0

		//活动元素信息
		this.player = null
		this.enemies = []
		this.spikes = []
		this.bursts = []
		this.door = null
		this.smokes = []

		this.records = []

		this.levelIndex = 21
	}
}
