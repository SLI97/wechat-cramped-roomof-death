import DataBus from '../databus'
import Tile from './tile'


const BG_WIDTH = 32
const BG_HEIGHT = 32

const IMG_PREFIX = 'images/bg/bg'

let databus = new DataBus()

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

const {
  offset
} = databus

export default class BackGround {
  constructor(ctx) {
    this.tileMap = []

    this.initTile()
    this.render(ctx)
  }

  initTile() {
    const mapList = databus.getLevel().mapList

    for (let i = 0; i < mapList.length; i++) {
      const colum = mapList[i]
      this.tileMap[i] = []
      for (let j = 0; j < colum.length; j++) {
        const item = colum[j]
        if (item.src === null) {
          this.tileMap[i].push(null)
          continue
        }
        let number = parseInt(item.src)
        if (number === 1) {
          number += rnd(0, 4)
        } else if (number === 5) {
          number += rnd(0, 4)
        } else if (number === 9) {
          number += rnd(0, 4)
        }

        const imgSrc = `${IMG_PREFIX} (${number}).png`
        const x = i * BG_WIDTH + offset.width
        const y = j * BG_HEIGHT + offset.height
        const type = item.type

        const tile = new Tile(type, imgSrc, x, y)
        this.tileMap[i].push(tile)
      }
    }
  }

  update() {}

  render(ctx) {
    this.tileMap.forEach((list) => {
      list.forEach((tile) => {
        tile && tile.render(ctx)
      })
    })
  }
}