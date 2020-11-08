## quickstart

## 源码目录介绍
```
./js
│  game.js
│
├─images
│
└─js
    │  Main.js
    │
    ├─background
    │      Background.js
    │      Tile.js
    │
    ├─base
    │      DirectionStateMachine.js
    │      Enemy.js
    │      Entity.js
    │      LoopState.js
    │      NoLoopState.js
    │      Singleton.js
    │      Sprite.js
    │      State.js
    │      StateMachine.js
    │      SubStateMachine.js
    │
    ├─effect
    │  └─Smoke
    │      │  Smoke.js
    │      │
    │      └─Animator
    │          │  DeathSubStateMachine.js
    │          │  IdleSubStateMachine.js
    │          │  SmokeStateMachine.js
    │          │
    │          └─Idle
    │                  IdleBottomState.js
    │                  IdleLeftState.js
    │                  IdleRightState.js
    │                  IdleState.js
    │                  IdleTopState.js
    │
    ├─enums
    │      index.js
    │
    ├─levels
    │      index.js
    │      level1.js
    │      level2.js
    │
    ├─libs
    │      symbol.js
    │      weapp-adapter.js
    │
    ├─npc
    │  ├─Burst
    │  │  │  Burst.js
    │  │  │
    │  │  └─Animator
    │  │          AttackState.js
    │  │          BurstState.js
    │  │          BurstStateMachine.js
    │  │          AirDeathStateate.js
    │  │          IdleState.js
    │  │
    │  ├─Door
    │  │  │  Door.js
    │  │  │
    │  │  └─Animator
    │  │      │  DeathSubStateMachine.js
    │  │      │  DoorStateMachine.js
    │  │      │  IdleStateMachine.js
    │  │      │
    │  │      └─Idle
    │  │              CloseBottomState.js
    │  │              CloseLeftState.js
    │  │              CloseRightState.js
    │  │              CloseState.js
    │  │              CloseTopState.js
    │  │
    │  ├─ironSkeleton
    │  │  │  IronSkeleton.js
    │  │  │
    │  │  └─Animator
    │  │      │  DeathSubStateMachine.js
    │  │      │  IdleSubStateMachine.js
    │  │      │  IronSkeletonStateMachine.js
    │  │      │
    │  │      ├─Death
    │  │      │      AirDeathBottomState.js.js
    │  │      │      AirDeathLeftState.js.js
    │  │      │      AirDeathRightState.js.js
    │  │      │      AirDeathState.js.js
    │  │      │      AirDeathTopState.js.js
    │  │      │
    │  │      └─Idle
    │  │              IdleBottomState.js
    │  │              IdleLeftState.js
    │  │              IdleRightState.js
    │  │              IdleState.js
    │  │              IdleTopState.js
    │  │
    │  ├─Spikes
    │  │  │  Spikes.js
    │  │  │
    │  │  └─Animator
    │  │      │  SpikesFourSubStateMachine.js
    │  │      │  SpikesOneSubStateMachine.js
    │  │      │  SpikesStateMachine.js
    │  │      │  SpikesThreeSubStateMachine.js
    │  │      │  SpikesTwoSubStateMachine.js
    │  │      │
    │  │      ├─SpikesFour
    │  │      │      SpikesFourPointFiveState.js
    │  │      │      SpikesFourPointFourState.js
    │  │      │      SpikesFourPointOneState.js
    │  │      │      SpikesFourPointState.js
    │  │      │      SpikesFourPointThreeState.js
    │  │      │      SpikesFourPointTwoState.js
    │  │      │      SpikesFourPointZeroState.js
    │  │      │
    │  │      ├─SpikesOne
    │  │      │      SpikesOnePointOneState.js
    │  │      │      SpikesOnePointState.js
    │  │      │      SpikesOnePointTwoState.js
    │  │      │      SpikesOnePointZeroState.js
    │  │      │
    │  │      ├─SpikesThree
    │  │      │      SpikesThreePointFourState.js
    │  │      │      SpikesThreePointOneState.js
    │  │      │      SpikesThreePointState.js
    │  │      │      SpikesThreePointThreeState.js
    │  │      │      SpikesThreePointTwoState.js
    │  │      │      SpikesThreePointZeroState.js
    │  │      │
    │  │      └─SpikesTwo
    │  │              SpikesTwoPointOneState.js
    │  │              SpikesTwoPointState.js
    │  │              SpikesTwoPointThreeState.js
    │  │              SpikesTwoPointTwoState.js
    │  │              SpikesTwoPointZeroState.js
    │  │
    │  └─woodenSkeleton
    │      │  WoodenSkeleton.js
    │      │
    │      └─Animator
    │          │  AttackSubStateMachine.js
    │          │  DeathSubStateMachine.js
    │          │  IdleSubStateMachine.js
    │          │  WoodenSkeletonStateMachine.js
    │          │
    │          ├─Attack
    │          │      AttackBottomState.js
    │          │      AttackLeftState.js
    │          │      AttackRightState.js
    │          │      AttackState.js
    │          │      AttackTopState.js
    │          │
    │          ├─Death
    │          │      AirDeathBottomState.js.js
    │          │      AirDeathLeftState.js.js
    │          │      AirDeathRightStateate.js
    │          │      AirDeathStateate.js
    │          │      AirDeathTopStateate.js
    │          │
    │          └─Idle
    │                  IdleBottomState.js
    │                  IdleLeftState.js
    │                  IdleRightState.js
    │                  IdleState.js
    │                  IdleTopState.js
    │
    ├─player
    │  │  Player.js
    │  │
    │  └─Animator
    │      │  AttackSubStateMachine.js
    │      │  BlockBackSubStateMachine.js
    │      │  BlockFrontSubStateMachine.js
    │      │  BlockLeftSubStateMachine.js
    │      │  BlockRightSubStateMachine.js
    │      │  BlockTurnLeftSubStateMachine.js
    │      │  BlockTurnRightSubStateMachine.js
    │      │  DeathSubStateMachine.js
    │      │  IdleSubStateMachine.js
    │      │  PlayerStateMachine.js
    │      │  TurnLeftSubStateMachine.js
    │      │  TurnRightSubStateMachine.js
    │      │
    │      ├─Attack
    │      │      AttackBottomState.js
    │      │      AttackLeftState.js
    │      │      AttackRightState.js
    │      │      AttackState.js
    │      │      AttackTopState.js
    │      │
    │      ├─BlockBack
    │      │      BlockBackBottomState.js
    │      │      BlockBackLeftState.js
    │      │      BlockBackRightState.js
    │      │      BlockBackState.js
    │      │      BlockBackTopState.js
    │      │
    │      ├─BlockFront
    │      │      BlocFrontLeftState.js
    │      │      BlockFrontBottomState.js
    │      │      BlockFrontRightState.js
    │      │      BlockFrontState.js
    │      │      BlockFrontTopState.js
    │      │
    │      ├─BlockLeft
    │      │      BlockLeftBottomState.js
    │      │      BlockLeftLeftState.js
    │      │      BlockLeftRightState.js
    │      │      BlockLeftState.js
    │      │      BlockLeftTopState.js
    │      │
    │      ├─BlockRight
    │      │      BlockRightBottomState.js
    │      │      BlockRightLeftState.js
    │      │      BlockRightRightState.js
    │      │      BlockRightState.js
    │      │      BlockRightTopState.js
    │      │
    │      ├─BlockTurnLeft
    │      │      BlockTurnLeftBottomState.js
    │      │      BlockTurnLeftLeftState.js
    │      │      BlockTurnLeftRightState.js
    │      │      BlockTurnLeftState.js
    │      │      BlockTurnLeftTopState.js
    │      │
    │      ├─BlockTurnRight
    │      │      BlockTurnRightBottomState.js
    │      │      BlockTurnRightLeftState.js
    │      │      BlockTurnRightRightState.js
    │      │      BlockTurnRightState.js
    │      │      BlockTurnRightTopState.js
    │      │
    │      ├─Death
    │      │      AirDeathBottomState.js.js
    │      │      AirDeathLeftState.js.js
    │      │      AirDeathRightStateate.js
    │      │      AirDeathStateate.js
    │      │      AirDeathTopState.js.js
    │      │
    │      ├─Idle
    │      │      IdleBottomState.js
    │      │      IdleLeftState.js
    │      │      IdleRightState.js
    │      │      IdleState.js
    │      │      IdleTopState.js
    │      │
    │      ├─TurnLeft
    │      │      TrunLeftState.js
    │      │      TurnLeftBottomState.js
    │      │      TurnLeftLeftState.js
    │      │      TurnLeftRightState.js
    │      │      TurnLeftTopState.js
    │      │
    │      └─TurnRight
    │              TurnRightBottomState.js
    │              TurnRightLeftState.js
    │              TurnRightRightState.js
    │              TurnRightState.js
    │              TurnRightTopState.js
    │
    ├─runtime
    │      CanvasManager.js
    │      DataManager.js
    │      EventManager.js
    │      MusicManager.js
    │      PoolManager.js
    │      ResourceManager.js
    │
    ├─scene
    │      BattleScene.js
    │      MainMenuScene.js
    │      Scene.js
    │      SceneManager.js
    │      StartScene.js
    │
    ├─ui
    │  │  Button.js
    │  │  RestartButton.js
    │  │  RevokeButton.js
    │  │  StartButton.js
    │  │  UIManager.js
    │  │
    │  └─Controller
    │          ControllerBottomButton.js
    │          ControllerButton.js
    │          ControllerLeftButton.js
    │          ControllerRightButton.js
    │          ControllerTopButton.js
    │          ControllerTurnLeftButton.js
    │          ControllerTurnRightButton.js
    │
    └─util
            index.js

```
