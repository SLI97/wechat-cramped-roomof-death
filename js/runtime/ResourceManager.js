import Singleton from '../base/Singleton'


const IMG_BG_PREFIX = 'images/bg/bg'
const IMG_BG_COUNT = 20

const IMG_IDLE_PREFIX = 'images/idle/idle'
const IMG_IDLE_COUNT = 16

const IMG_TURN_PREFIX = 'images/turn/turn'
const IMG_TURN_COUNT = 24

const IMG_CTRL_PREFIX = 'images/ctrl/ctrl'
const IMG_CTRL_COUNT = 24

export default class ResourceManager extends Singleton {

	static get Instance() {
		return super.GetInstance(ResourceManager)
	}

	// constructor() {
	// 	super()
	// 	this.init()
	// }

	load() {
		return new Promise(async (res, rej) => {
			this.imgMap = new Map()
			const bg = this.loadBgImage()
			const idle = this.loadIDLEImage()
			const turn = this.loadTurnImage()
			const ctrl = this.loadCtrlImage()
			Promise.all([...bg, ...idle, ...turn, ...ctrl]).then(() => {
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

	loadImage(src) {
		return new Promise((res, rej) => {
			const image = wx.createImage()
			image.src = src
			image.onload = () => {
				if (!this.imgMap.has(image.src)) {
					this.imgMap.set(image.src, image)
				}
				res()
			}
		})
	}

	getImageMap() {
		return this.imgMap
	}
}
