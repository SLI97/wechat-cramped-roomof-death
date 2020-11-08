import Singleton from '../base/Singleton'

/**
 * 统一的音效管理器
 */
export default class MusicManager extends Singleton {

  static get Instance() {
    return super.GetInstance(MusicManager)
  }


  constructor() {
		super()

    this.bgmAudio = wx.createInnerAudioContext()
    this.bgmAudio.loop = true
    this.bgmAudio.src  = 'audio/bgm.mp3'
    this.bgmAudio.volume = 0.3
		//
    // this.boomAudio     = new Audio()
    // this.boomAudio.src = 'audio/boom.mp3'
		//
    // this.playBgm()
  }

  // playMenu() {
  //   this.menuAudio.play()
  // }

  // stopMenu(){
  //   this.menuAudio.stop()
  // }

  playBgm() {
    this.bgmAudio.play()
  }

  stopBgm(){
    this.bgmAudio.stop()
  }

}
