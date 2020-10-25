import Pool from './base/pool'
import {
  level1,
  level2
} from './levels/level1'

let instance

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_WIDTH = 32
const BG_HEIGHT = 32

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if (instance)
      return instance

    instance = this

    this.currentLevel = level1
    // console.log(this.currentLevel)

    this.offset = {
      width: 0,
      height: 0
    }

    // this.pool = new Pool()

    this.calcOffset()
    // this.reset()
  }

  calcOffset() {
    const {
      mapList
    } = this.currentLevel

    const rowCount = mapList.length
    const columnCount = mapList[0].length
    const disWidth = (screenWidth - (BG_WIDTH * rowCount)) / 2
    const disHeight = (screenHeight - (BG_HEIGHT * columnCount)) / 2
    this.offset.width = disWidth
    this.offset.height = disHeight
  }

  reset() {
    // this.frame = 0
    // this.score = 0
    // this.bullets = []
    // this.enemys = []
    // this.animations = []
    // this.gameOver = false
  }

  /**
   * 回收敌人，进入对象池
   * 此后不进入帧循环
   */
  // removeEnemey(enemy) {
  //   let temp = this.enemys.shift()

  //   temp.visible = false

  //   this.pool.recover('enemy', enemy)
  // }

  /**
   * 回收子弹，进入对象池
   * 此后不进入帧循环
   */
  // removeBullets(bullet) {
  //   let temp = this.bullets.shift()

  //   temp.visible = false

  //   this.pool.recover('bullet', bullet)
  // }

  getLevel() {
    return this.currentLevel
  }
}