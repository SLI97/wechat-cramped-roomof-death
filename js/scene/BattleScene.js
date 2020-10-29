import Scene from './Scene'
import DataManager from '../runtime/DataManager'
import Player from '../player/Player'
import Background from '../background/Background'
import CanvasManager from '../runtime/CanvasManager'
import Enemy from '../npc/Enemy'
import EventManager from '../runtime/EventManager'
import {EVENT_ENUM} from '../enums'

const SCREEN_WIDTH = window.innerWidth
const SCREEN_HEIGHT = window.innerHeight
const BG_COLOR = '#140B28'

export default class BattleScene extends Scene {
	constructor(sceneManager) {
		super(sceneManager)
		this.sceneName = 'BattleScene'
		this.recordHandler = this.record.bind(this)
		this.revokeHandler = this.revoke.bind(this)
		this.restartHandler = this.restart.bind(this)
	}

	beginScene() {
		EventManager.Instance.on(EVENT_ENUM.RECORD_STEP, this.recordHandler)
		EventManager.Instance.on(EVENT_ENUM.REVOKE_STEP, this.revokeHandler)
		EventManager.Instance.on(EVENT_ENUM.RESTART_LEVEL, this.restartHandler)
	}

	updateScene() {
		Player.Instance.update()

		this.checkEnemyAttackPlayer()

		this.enemiesList = DataManager.Instance.getenemyInfo.map(enemy => {
			const obj = new Enemy()
			obj.x = enemy.x
			obj.y = enemy.y
			obj.direction = enemy.direction
		})

		this.render()
	}

	render() {
		CanvasManager.Ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
		CanvasManager.Ctx.fillStyle = BG_COLOR
		CanvasManager.Ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
		Background.Instance.render()
		Player.Instance.render()

		this.enemiesList.forEach(enemy => {
			enemy.render()
		})
	}

	record() {
		DataManager.Instance.record()
	}

	revoke(){
		DataManager.Instance.record()
	}

	restart() {
		DataManager.Instance.reset()

		const {playerInfo, enemyInfo} = DataManager.Instance.getLevel()
		Player.Instance.targetX = Player.Instance.x = playerInfo.x
		Player.Instance.targetY = Player.Instance.y = playerInfo.y
		Player.Instance.direction = playerInfo.direction
	}

	nextLevel() {
		DataManager.Instance.levelIndex = DataManager.Instance.levelIndex + 1
	}

	checkEnemyAttackPlayer() {
		const {x: px, y: py} = DataManager.Instance.getPlayerInfo()
		const enemyInfo = DataManager.Instance.getEnemyInfo()
		for (let i = 0; i < enemyInfo.length; i++) {

		}
		if (true) {
			Player.Instance.goDead()
		}
	}
}
