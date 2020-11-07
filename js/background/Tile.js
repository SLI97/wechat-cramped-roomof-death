import Sprite from '../base/Sprite'

import {
  TILE_TYPE_ENUM
} from '../enums/index'
import CanvasManager from '../runtime/CanvasManager'
import DataManager from '../runtime/DataManager'

const BG_WIDTH = 32
const BG_HEIGHT = 32

export default class Tile extends Sprite {
  constructor(type, imageSrc, x, y) {
    super(imageSrc, BG_WIDTH, BG_HEIGHT, x, y)
    this.type = type
    this.init()
  }

  init() {
    if (this.type === TILE_TYPE_ENUM.WALL_LEFT_TOP ||
      this.type === TILE_TYPE_ENUM.WALL_ROW ||
      this.type === TILE_TYPE_ENUM.WALL_RIGHT_TOP ||
      this.type === TILE_TYPE_ENUM.WALL_LEFT_BOTTOM ||
      this.type === TILE_TYPE_ENUM.WALL_RIGHT_BOOTM ||
      this.type === TILE_TYPE_ENUM.WALL_COLUMN
    ) {
      this.moveable = false
      this.turnable = false
    } else if (this.type === TILE_TYPE_ENUM.CLIFF_LEFT ||
      this.type === TILE_TYPE_ENUM.CLIFF_CENTER ||
      this.type === TILE_TYPE_ENUM.CLIFF_RIGHT
    ) {
      this.moveable = false
      this.turnable = true
    } else if (this.type === TILE_TYPE_ENUM.FLOOR) {
      this.moveable = true
      this.turnable = true
    }
  }

  render() {
    const {offset,dpr} = DataManager.Instance
    if (!this.img) {
      return
    }
    CanvasManager.Ctx.drawImage(
      this.img,
      ((this.x * 32) ) * dpr+ offset.width,
      ((this.y * 32) )* dpr + offset.height,
      this.width * dpr,
      this.height * dpr
    )
  }
}
