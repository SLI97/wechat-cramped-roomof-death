import Entity from '../../base/Entity'
import BurstStateMachine from './Animator/BurstStateMachine'
import EventManager from '../../runtime/EventManager'
import {DIRECTION_ENUM, EVENT_ENUM, PLAYER_STATE} from '../../enums/index'
import DataManager from '../../runtime/DataManager'

const BG_WIDTH = 32
const BG_HEIGHT = 32

/***
 * 裂地板类
 */
export default class Burst extends Entity {
	constructor(dto) {
		super(dto, BurstStateMachine,null, BG_WIDTH, BG_HEIGHT)
	}

	init() {
		this.prePlayerX = DataManager.Instance.player.x
		this.prePlayerY = DataManager.Instance.player.y

		this.onBurstHandler = this.onBurst.bind(this)
		EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onBurstHandler)
	}

	onBurst() {
		//我都死了，别烦我了
		if (this.state === PLAYER_STATE.DEATH) {
			return
		}
		const {prePlayerX, prePlayerY} = this
		const {x: curPlayerX, y: curPlayerY} = DataManager.Instance.player
		//如果触发移动事件后，玩家上一步的位置等于我的位置，我他妈直接裂开
		if (this.x === prePlayerX && this.y === prePlayerY) {
			this.state = PLAYER_STATE.DEATH
			//如果我裂开的时候你人在我上面，你直接狗带吧
			if (this.x === curPlayerX && this.y === curPlayerY) {
				EventManager.Instance.emit(EVENT_ENUM.ATTACK_PLAYER)
			}
		}
		this.prePlayerX = curPlayerX
		this.prePlayerY = curPlayerY
	}
}
