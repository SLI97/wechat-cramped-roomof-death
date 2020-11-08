import Entity from '../../base/Entity'
import BurstStateMachine from './Animator/BurstStateMachine'
import EventManager from '../../runtime/EventManager'
import {DIRECTION_ENUM, EVENT_ENUM, PLAYER_STATE} from '../../enums/index'
import DataManager from '../../runtime/DataManager'
import MusicManager from '../../runtime/MusicManager'

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
		this.onBurstHandler = this.onBurst.bind(this)
		EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onBurstHandler)
	}

	off(){
		EventManager.Instance.off(EVENT_ENUM.PLAYER_MOVE_END, this.onBurstHandler)
	}

	onBurst() {
		//我都死了，别烦我了
		if (this.state === PLAYER_STATE.DEATH) {
			return
		}
		const {targetX: curPlayerX, targetY: curPlayerY} = DataManager.Instance.player
		if(this.x === curPlayerX && this.y === curPlayerY && this.state === PLAYER_STATE.IDLE){
			this.state = PLAYER_STATE.ATTACK
		}else if (this.state === PLAYER_STATE.ATTACK) {
			this.state = PLAYER_STATE.DEATH
			//如果我裂开的时候你人在我上面，你直接狗带吧
			if (this.x === curPlayerX && this.y === curPlayerY) {
				EventManager.Instance.emit(EVENT_ENUM.ATTACK_PLAYER,PLAYER_STATE.AIRDEATH)
			}
		}
	}
}
