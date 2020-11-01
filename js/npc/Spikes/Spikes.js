import Sprite from '../../base/Sprite'
import Player from '../../player/Player'
import CanvasManager from '../../runtime/CanvasManager'
import {ENEMY_TYPE_ENUM, EVENT_ENUM, PLAYER_STATE} from '../../enums/index'
import EventManager from '../../runtime/EventManager'
import PlayerStateMachine from '../../player/Animator/PlayerStateMachine'
import SpikesStateMachine from './Animator/SpikesStateMachine'
import DataManager from '../../runtime/DataManager'

const BG_WIDTH = 32
const BG_HEIGHT = 32

const IMG_BG_PREFIX = 'images/bg/bg (20).png'

export default class Spikes extends Sprite {
	constructor(x, y, type) {
		super(IMG_BG_PREFIX, BG_WIDTH, BG_HEIGHT, x, y)
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
		this.runHandler = this.run.bind(this)
		EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE, this.runHandler)

		this.fsm = new SpikesStateMachine(this)
	}

	update() {
		// this.visible = false
		this.checkAttack()
	}

	run() {
		this.count++
	}

	render() {
		this.fsm.render()
	}

	checkAttack() {
		if (this.count % this.spikesCount === 0) {
			return
		}
		const {x: playerX, y: playerY} = DataManager.Instance.player
		if (playerX === this.x && playerY === this.y) {
			EventManager.Instance.emit(EVENT_ENUM.ATTACK_PLAYER)
		}
	}
}
