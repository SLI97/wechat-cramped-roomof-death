import Animatior from './Animator'
import DataManager from '../DataManager'
import EventManager from '../EventManager'
import {
  EVENT_ENUM
} from '../enums/index'
import Sprite from '../base/Sprite'
import Animator from './Animator'
import {
  DIRECTION_ENUM,
  CONTROLLER_ENUM,
  PLAYER_STATE
} from '../enums/index'
import Background from "../runtime/Background";

const PLAYER_IMG_SRC = 'images/idle/idle (1).png'

const PLAYER_WIDTH = 128
const PLAYER_HEIGHT = 128
const PLAYER_SPEED = 32

const DIRECTION_ORDER = [
  DIRECTION_ENUM.RIGHT,
  DIRECTION_ENUM.BOTTOM,
  DIRECTION_ENUM.LEFT,
  DIRECTION_ENUM.TOP,
]

// const __ = {
//   speed: Symbol('speed')
// }

export default class Player extends Sprite {

  static _instance

  static get Instance() {
    if (this._instance == null) {
      this._instance = new Player()
    }
    return this._instance
  }

  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)
    this.init()
    EventManager.Instance.on(EVENT_ENUM.PLAYER_CTRL, this.move.bind(this))
  }

  init(x, y, direction) {
    this.speed = PLAYER_SPEED
    this.direction = DIRECTION_ENUM.RIGHT
    this.state = PLAYER_STATE.IDLE
  }

  /***
   * 玩家渲染
   * @param ctx
   */
  render(ctx) {
    Animator.Instance.render(ctx)
  }


  /***
   * 根据type玩家移动
   * @param type 控制类型CONTROLLER_ENUM之一
   */
  move(type) {
    if (!this.canPlayerMpve(type)) {
      console.log("stop")
      return
    }

    Animator.Instance.resetIndex()
    if (type === CONTROLLER_ENUM.TURNLEFT) {
      this.state = PLAYER_STATE.TURNLEFT
      const index = DIRECTION_ORDER.findIndex(i => i === this.direction)
      const next = (index - 1 < 0) ? DIRECTION_ORDER.length - 1 : index - 1
      this.direction = DIRECTION_ORDER[next]
    } else if (type === CONTROLLER_ENUM.LEFT) {
      this.x -= this.speed
    } else if (type === CONTROLLER_ENUM.TOP) {
      this.y -= this.speed
    } else if (type === CONTROLLER_ENUM.BOTTOM) {
      this.y += this.speed
    } else if (type === CONTROLLER_ENUM.TURNRIGHT) {
      this.state = PLAYER_STATE.TURNRIGHT
      const index = DIRECTION_ORDER.findIndex(i => i === this.direction)
      const next = index + 1 > (DIRECTION_ORDER.length - 1) ? 0 : index + 1
      this.direction = DIRECTION_ORDER[next]
    } else if (type === CONTROLLER_ENUM.RIGHT) {
      this.x += this.speed
    }
  }

  /***
   * 判断角色是否能按预期进行移动
   * @param type
   */
  canPlayerMpve(type) {
    const {
      x,
      y,
      direction
    } = this
    const tileInfo = Background.Instance.getTileMap()
    const {
      row,
      column
    } = DataManager.Instance.getMapCount()

    //按钮方向——向上
    if (type === CONTROLLER_ENUM.TOP) {

      const playerNextY = y - 1
      if (playerNextY < 0) {
        return false
      }

      //玩家方向——向上
      if (direction === DIRECTION_ENUM.TOP) {
        const weaponNextY = y - 2
        const nextPlayerTile = tileInfo[x][playerNextY]
        const nextWeaponTile = tileInfo[x][weaponNextY]
        return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)

        //玩家方向——向下
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        const weaponNextY = y
        const nextPlayerTile = tileInfo[x][playerNextY]
        const nextWeaponTile = tileInfo[x][weaponNextY]
        return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)

        //玩家方向——向左
      } else if (direction === DIRECTION_ENUM.LEFT) {
        const weaponNextX = x - 1
        const weaponNextY = y - 1
        const nextPlayerTile = tileInfo[x][playerNextY]
        const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]
        return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile && nextWeaponTile.turnable)

        //玩家方向——向右
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        const weaponNextX = x + 1
        const weaponNextY = y - 1
        const nextPlayerTile = tileInfo[playerNextY][y]
        const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]
        return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)
      }

      //按钮方向——向下
    } else if (type === CONTROLLER_ENUM.BOTTOM) {

      const playerNextY = y + 1
      if (playerNextY > column - 1) {
        return false
      }

      //玩家方向——向上
      if (direction === DIRECTION_ENUM.TOP) {
        const weaponNextY = y
        const nextPlayerTile = tileInfo[x][playerNextY]
        const nextWeaponTile = tileInfo[x][weaponNextY]
        return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)

        //玩家方向——向下
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        const weaponNextY = y + 2
        const nextPlayerTile = tileInfo[x][playerNextY]
        const nextWeaponTile = tileInfo[x][weaponNextY]
        return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)

        //玩家方向——向左
      } else if (direction === DIRECTION_ENUM.LEFT) {
        const weaponNextX = x - 1
        const weaponNextY = y + 1
        const nextPlayerTile = tileInfo[playerNextY][y]
        const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]
        return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile && nextWeaponTile.turnable)

        //玩家方向——向右
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        const weaponNextX = x + 1
        const weaponNextY = y + 1
        const nextPlayerTile = tileInfo[playerNextY][y]
        const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]
        return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)
      }

      //按钮方向——向左
    } else if (type === CONTROLLER_ENUM.LEFT) {

      const playerNextX = x - 1
      if (playerNextX < 0) {
        return false
      }

      //玩家方向——向上
      if (direction === DIRECTION_ENUM.TOP) {
        const weaponNextX = x - 1
        const weaponNextY = y - 1
        const nextPlayerTile = tileInfo[playerNextX][y]
        const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]
        return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)

        //玩家方向——向下
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        const weaponNextX = x - 1
        const weaponNextY = y + 1
        const nextPlayerTile = tileInfo[playerNextX][y]
        const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]
        return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)

        //玩家方向——向左
      } else if (direction === DIRECTION_ENUM.LEFT) {
        const weaponNextX = x - 2
        const nextPlayerTile = tileInfo[playerNextX][y]
        const nextWeaponTile = tileInfo[weaponNextX][y]
        return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile && nextWeaponTile.turnable)

        //玩家方向——向右
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        const weaponNextX = x + 2
        const nextPlayerTile = tileInfo[playerNextX][y]
        const nextWeaponTile = tileInfo[weaponNextX][y]
        return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)
      }

      //按钮方向——向右
    } else if (type === CONTROLLER_ENUM.LEFT) {

      const playerNextX = x + 1
      if (playerNextX > row - 1) {
        return false
      }

      //玩家方向——向上
      if (direction === DIRECTION_ENUM.TOP) {
        const weaponNextX = x + 1
        const weaponNextY = y - 1
        const nextPlayerTile = tileInfo[playerNextX][y]
        const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]
        return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)

        //玩家方向——向下
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        const weaponNextX = x + 1
        const weaponNextY = y + 1
        const nextPlayerTile = tileInfo[playerNextX][y]
        const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]
        return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)

        //玩家方向——向左
      } else if (direction === DIRECTION_ENUM.LEFT) {
        const weaponNextX = x
        const nextPlayerTile = tileInfo[playerNextX][y]
        const nextWeaponTile = tileInfo[weaponNextX][y]
        return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile && nextWeaponTile.turnable)

        //玩家方向——向右
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        const weaponNextX = x + 2
        const nextPlayerTile = tileInfo[playerNextX][y]
        const nextWeaponTile = tileInfo[weaponNextX][y]
        return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)
      }

      //按钮方向——左转
    } else if (type === CONTROLLER_ENUM.TURNLEFT) {
      let nextY, nextX
      if (direction === DIRECTION_ENUM.TOP) {
        //朝上左转的话，左上角三个tile都必须turnable为true
        nextY = y - 1
        nextX = x - 1
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        nextY = y + 1
        nextX = x + 1
      } else if (direction === DIRECTION_ENUM.LEFT) {
        nextY = y + 1
        nextX = x - 1
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        nextY = y - 1
        nextX = x + 1
      }

      return (!tileInfo[x][nextY] || tileInfo[x][nextY].turnable) &&
        (!tileInfo[nextX][y] || tileInfo[nextX][y].turnable) &&
        (!tileInfo[nextX][nextY] || tileInfo[nextX][nextY].turnable)

      //按钮方向——右转
    } else if (type === CONTROLLER_ENUM.TURNRIGHT) {
      let nextX, nextY
      if (direction === DIRECTION_ENUM.TOP) {
        //朝上右转的话，右上角三个tile都必须turnable为true
        nextY = y - 1
        nextX = x + 1
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        nextY = y + 1
        nextX = x - 1
      } else if (direction === DIRECTION_ENUM.LEFT) {
        nextY = y - 1
        nextX = x - 1
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        nextY = y + 1
        nextX = x + 1
      }

      return (!tileInfo[x][nextY] || tileInfo[x][nextY].turnable) &&
        (!tileInfo[nextX][y] || tileInfo[nextX][y].turnable) &&
        (!tileInfo[nextX][nextY] || tileInfo[nextX][nextY].turnable)
    }

    return false
  }
}
