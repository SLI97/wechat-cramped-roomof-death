import Sprite from '../../base/Sprite'
import {DIRECTION_ENUM, DIRECTION_ORDER, ENEMY_TYPE_ENUM, EVENT_ENUM, PLAYER_STATE} from '../../enums/index'
import EventManager from '../../runtime/EventManager'
import SpikesStateMachine,{PARAMS_NAME} from './Animator/SpikesStateMachine'
import DataManager from '../../runtime/DataManager'

const BG_WIDTH = 128
const BG_HEIGHT = 128



export default class Spikes extends Sprite {
	constructor(x, y, type) {
		super(null, BG_WIDTH, BG_HEIGHT, x, y)
		this.init(type)
	}

	init(type) {
		this.count = 0
		this.type = type

		this.totalCount = 1
		if (type === ENEMY_TYPE_ENUM.SPIKES_ONE) {
			this.totalCount = 1
		} else if (type === ENEMY_TYPE_ENUM.SPIKES_TWO) {
			this.totalCount = 2
		} else if (type === ENEMY_TYPE_ENUM.SPIKES_THREE) {
			this.totalCount = 3
		} else if (type === ENEMY_TYPE_ENUM.SPIKES_FOUR) {
			this.totalCount = 4
		}

		this.onLoopHandler = this.onLoop.bind(this)
		EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onLoopHandler)

		this.fsm = new SpikesStateMachine(this)
		this.fsm.setParams(PARAMS_NAME.SPIKES_TYPE, this.totalCount)
	}

	update(){
		if (this.fsm) {
			this.fsm.update()
		}
		this.onAttack()
	}

	render() {
		if (this.fsm) {
			this.fsm.render()
		}
	}

	onLoop() {
		this.count++
	}

	onAttack() {
		if(this.count % this.totalCount === 0){
			const {targetX: playerX, targetY: playerY} = DataManager.Instance.player
			if (playerX === this.x && playerY === this.y) {
				EventManager.Instance.emit(EVENT_ENUM.ATTACK_PLAYER)
			}
		}
	}
}
