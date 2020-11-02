import Singleton from '../base/Singleton'


const IMG_BG_PREFIX = 'images/bg/bg'
const IMG_BG_COUNT = 20

const IMG_IDLE_PREFIX = 'images/idle/idle'
const IMG_IDLE_COUNT = 16

const IMG_TURN_PREFIX = 'images/turn/turn'
const IMG_TURN_COUNT = 24

const IMG_CTRL_PREFIX = 'images/ctrl/ctrl'
const IMG_CTRL_COUNT = 6

const IMG_BLOCKTURN_PREFIX = 'images/blockturn/blockturn'
const IMG_BLOCKTURN_COUNT = 32

const IMG_BLOCKSIDE_PREFIX = 'images/blockside/blockside'
const IMG_BLOCKSIDE_COUNT = 32

const IMG_BLOCKFACE_PREFIX = 'images/blockface/blockface'
const IMG_BLOCKFACE_COUNT = 32

const IMG_IRONSKELETON_PREFIX = 'images/ironskeleton/ironskeleton'
const IMG_IRONSKELETOE_COUNT = 72

const IMG_WOODENSKELETOE_PREFIX = 'images/woodenskeleton/woodenskeleton'
const IMG_WOODENSKELETOE_COUNT = 104

const IMG_ATTACK_PREFIX = 'images/attack/attack'
const IMG_ATTACK_COUNT = 32

const IMG_SMOKE_PREFIX = 'images/smoke/smoke'
const IMG_SMOKE_COUNT = 48

/***
 * 资源管理类，主要负责加载图片的加载（监听img的onload事件全部执行）
 */
export default class ResourceManager extends Singleton {

	static get Instance() {
		return super.GetInstance(ResourceManager)
	}

	constructor() {
		super()
		// 	this.init()
	}

	load() {
		return new Promise(async (res, rej) => {
			this.imgMap = new Map()
			const bg = this.loadBgImage()
			const idle = this.loadIDLEImage()
			const attack = this.loadAttackImage()
			const turn = this.loadTurnImage()
			const ctrl = this.loadCtrlImage()
			const blockturn = this.loadBlockTurnImage()
			const blockside = this.loadBlockSideImage()
			const blockface = this.loadBlockFaceImage()
			const ironskeleton = this.loadIronSkeletonImage()
			// const woodenskeleton = this.loadWoodenSkeletonImage()
			const smoke = this.loadSmokeImage()
			Promise.all(
				[
					...bg,
					...idle,
					...attack,
					...turn,
					...ctrl,
					...blockturn,
					...blockside,
					...blockface,
					...ironskeleton,
					...smoke
				]
			).then(() => {
				res()
			})
		})
	}

	loadBgImage() {
		const promiseList = []
		for (let i = 0; i < IMG_BG_COUNT; i++) {
			promiseList.push(this.loadImage(`${IMG_BG_PREFIX} (${i + 1}).png`))
		}

		return promiseList
	}

	loadIDLEImage() {
		const promiseList = []
		for (let i = 0; i < IMG_IDLE_COUNT; i++) {
			promiseList.push(this.loadImage(`${IMG_IDLE_PREFIX} (${i + 1}).png`))
		}
		return promiseList
	}

	loadTurnImage() {
		const promiseList = []
		for (let i = 0; i < IMG_TURN_COUNT; i++) {
			promiseList.push(this.loadImage(`${IMG_TURN_PREFIX} (${i + 1}).png`))
		}
		return promiseList
	}

	loadCtrlImage() {
		const promiseList = []
		for (let i = 0; i < IMG_CTRL_COUNT; i++) {
			promiseList.push(this.loadImage(`${IMG_CTRL_PREFIX} (${i + 1}).png`))
		}
		return promiseList
	}

	loadBlockTurnImage() {
		const promiseList = []
		for (let i = 0; i < IMG_BLOCKTURN_COUNT; i++) {
			promiseList.push(this.loadImage(`${IMG_BLOCKTURN_PREFIX} (${i + 1}).png`))
		}
		return promiseList
	}

	loadBlockSideImage() {
		const promiseList = []
		for (let i = 0; i < IMG_BLOCKSIDE_COUNT; i++) {
			promiseList.push(this.loadImage(`${IMG_BLOCKSIDE_PREFIX} (${i + 1}).png`))
		}
		return promiseList
	}

	loadBlockFaceImage() {
		const promiseList = []
		for (let i = 0; i < IMG_BLOCKFACE_COUNT; i++) {
			promiseList.push(this.loadImage(`${IMG_BLOCKFACE_PREFIX} (${i + 1}).png`))
		}
		return promiseList
	}

	loadIronSkeletonImage() {
		const promiseList = []
		for (let i = 0; i < IMG_IRONSKELETOE_COUNT; i++) {
			promiseList.push(this.loadImage(`${IMG_IRONSKELETON_PREFIX} (${i + 1}).png`))
		}
		return promiseList
	}

	loadWoodenSkeletonImage() {
		const promiseList = []
		for (let i = 0; i < IMG_WOODENSKELETOE_COUNT; i++) {
			promiseList.push(this.loadImage(`${IMG_WOODENSKELETOE_PREFIX} (${i + 1}).png`))
		}
		return promiseList
	}

	loadAttackImage() {
		const promiseList = []
		for (let i = 0; i < IMG_ATTACK_COUNT; i++) {
			promiseList.push(this.loadImage(`${IMG_ATTACK_PREFIX} (${i + 1}).png`))
		}
		return promiseList
	}

	loadSmokeImage() {
		const promiseList = []
		for (let i = 0; i < IMG_SMOKE_COUNT; i++) {
			promiseList.push(this.loadImage(`${IMG_SMOKE_PREFIX} (${i + 1}).png`))
		}
		return promiseList
	}

	loadImage(src) {
		return new Promise((res, rej) => {
			const image = wx.createImage()
			image.src = src
			image.onload = () => {
				if (!this.imgMap.has(image.src)) {
					this.imgMap.set(src, image)
				}
				res()
			}
		})
	}

	getImageMap() {
		return this.imgMap
	}
}
