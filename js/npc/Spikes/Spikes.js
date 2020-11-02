import Sprite from '../../base/Sprite'
import {DIRECTION_ENUM, DIRECTION_ORDER, ENEMY_TYPE_ENUM, EVENT_ENUM, PLAYER_STATE} from '../../enums/index'
import EventManager from '../../runtime/EventManager'
import SpikesStateMachine from './Animator/SpikesStateMachine'
import DataManager from '../../runtime/DataManager'

const BG_WIDTH = 128
const BG_HEIGHT = 128



export default class Spikes extends Sprite {
	constructor(x, y, type) {
		super(null, BG_WIDTH, BG_HEIGHT, x, y)
		this.init(type)
	}

	init(type) {
		this.spikesCount = 1
		if (type === ENEMY_TYPE_ENUM.SPIKES_ONE) {
			this.spikesCount = 1
		} else if (type === ENEMY_TYPE_ENUM.SPIKES_TWO) {
			this.spikesCount = 2
		} else if (type === ENEMY_TYPE_ENUM.SPIKES_THREE) {
			this.spikesCount = 3
		} else if (type === ENEMY_TYPE_ENUM.SPIKES_FOUR) {
			this.spikesCount = 4
		}

		this.count = 0
		this.states = type

		this.onLoopHandler = this.onLoop.bind(this)
		EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onLoopHandler)

		this.fsm = new SpikesStateMachine(this)
	}

	_state = PLAYER_STATE.IDLE

	get state() {
		return this._state
	}

	set state(value) {
		this._state = value
		if (this.fsm && this.fsm.params.has(value)) {
			//同样类型的blick不要覆盖
			if (this.fsm.currentState === this.fsm.states.get(value)) {
				return
			}
			if (value.indexOf("BLOCK") > -1) {
				EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
			}
			this.fsm.setParams(value, true)
		}
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
		if(this.count % this.spikesCount === 0){
			const {targetX: playerX, targetY: playerY} = DataManager.Instance.player
			if (playerX === this.x && playerY === this.y) {
				EventManager.Instance.emit(EVENT_ENUM.ATTACK_PLAYER)
			}
		}
	}
}
