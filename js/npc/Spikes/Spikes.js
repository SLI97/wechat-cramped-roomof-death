import Sprite from '../../base/Sprite'
import {
	EVENT_ENUM,
	SPIKES_TYPE_MAP_POINT,
	SPIKES_CUR_POINT_TYPE,
	PLAYER_STATE
} from '../../enums/index'
import EventManager from '../../runtime/EventManager'
import SpikesStateMachine, {
	PARAMS_NAME
} from './Animator/SpikesStateMachine'
import DataManager from '../../runtime/DataManager'

const BG_WIDTH = 128
const BG_HEIGHT = 128

export default class Spikes extends Sprite {
	constructor(dto) {
		super(null, BG_WIDTH, BG_HEIGHT)
		this.init(dto)
	}

	_curPointCount = 0

	get curPointCount() {
		return this._curPointCount
	}

	set curPointCount(value) {
		this._curPointCount = value
		if (this.fsm) {
			this.fsm.setParams(PARAMS_NAME.CUR_POINT_COUNT, value)
		}
	}

	init({
		x,
		y,
		count,
		type
	}) {
		this.x = x
		this.y = y
		this.fsm = new SpikesStateMachine(this)
		this.fsm.setParams(PARAMS_NAME.SPIKES_TYPE, SPIKES_TYPE_MAP_POINT[type])
		this.curPointCount = count
		this.totalPointCount = SPIKES_TYPE_MAP_POINT[type]

		this.onLoopHandler = this.onLoop.bind(this)
		EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onLoopHandler)
	}

	off() {
		EventManager.Instance.off(EVENT_ENUM.PLAYER_MOVE_END, this.onLoopHandler)
	}

	update() {
		if (this.fsm) {
			this.fsm.update()
		}
	}

	render() {
		if (this.fsm) {
			this.fsm.render()
		}
	}

	/***
	 * 当最大值时还没归零但人又触发移动，就让他变成1就好了
	 */
	onLoop() {
		if (this.curPointCount == this.totalPointCount) {
			this.curPointCount = 1
		} else {
			this.curPointCount++
		}
		this.onAttack()
	}

	backZero() {
		this.curPointCount = 0
	}

	onAttack() {
		const {
			x: playerX,
			y: playerY
		} = DataManager.Instance.player
		if (playerX === this.x && playerY === this.y && this.curPointCount === this.totalPointCount) {
			EventManager.Instance.emit(EVENT_ENUM.ATTACK_PLAYER, PLAYER_STATE.DEATH)
		}
	}
}
