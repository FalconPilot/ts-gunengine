import { Authors } from '$common/constants'
import { ARCParts, Caliber, Gun, GunParts } from '$common/types'

export const ARC: Gun<ARCParts> = {
  name: 'AR-C Rifle',
  caliber: Caliber.R556,
  parts: {
    lower: [{
      author: Authors.AB,
      name: 'Standard lower receiver',
      assetName: 'ARC_lower1.png',
      offsetX: 250,
      offsetY: 122,
      layer: 50,
      stats: {
        handling: 2,
        reliability: 30
      }
    }],
    upper: [{
      author: Authors.LuckyStriker,
      name: 'Valkyrie upper receiver',
      assetName: 'ARC_upper1.png',
      offsetX: 250,
      offsetY: 110,
      explodedOffsetY: 85,
      layer: 60,
      stats: {
        accuracy: 5,
        reliability: 25
      }
    }],
    magazine: [{
      author: Authors.DrNoob,
      name: '30rds STANAG',
      assetName: 'ARC_mag1.png',
      offsetX: 363,
      offsetY: 139,
      explodedOffsetY: 220,
      layer: 10,
      stats: {
        capacity: 30
      }
    }, {
      author: Authors.DrNoob,
      name: '30rds TAC-MAG',
      assetName: 'ARC_mag2.png',
      offsetX: 363,
      offsetY: 139,
      explodedOffsetY: 220,
      layer: 10,
      stats: {
        capacity: 30,
        handling: 1,
        reliability: -5
      }
    }],
    bolt: [{
      author: Authors.DrNoob,
      name: 'MILSPEC bolt carrier',
      assetName: 'ARC_bolt1.png',
      offsetX: 264,
      offsetY: 116,
      explodedOffsetX: 60,
      explodedOffsetY: 76,
      layer: 45,
      stats: {
        reliability: 5
      }
    }],
    barrel: [{
      author: Authors.DrNoob,
      name: '16" Barrel',
      assetName: 'ARC_barrel1.png',
      offsetX: 417,
      offsetY: 122,
      explodedOffsetX: 457,
      layer: 40,
      stats: {
        handling: -1,
        accuracy: 50
      }
    }],
    sight: [{
      author: Authors.DrNoob,
      name: 'Rear iron sight',
      assetName: 'ARC_sight1.png',
      offsetX: 264,
      offsetY: 79,
      explodedOffsetY: 10,
      layer: 95,
      stats: {
        handling: 1
      }
    }],
    stock: [{
      author: Authors.DrNoob,
      name: 'Milspec collapsible stock',
      assetName: 'ARC_stock1.png',
      offsetX: 45,
      offsetY: 125,
      explodedOffsetX: 15,
      layer: 35,
      stats: {
        handling: 1
      }
    }, {
      author: Authors.DrNoob,
      name: 'Milspec fixed stock',
      assetName: 'ARC_stock2.png',
      offsetX: 15,
      offsetY: 126,
      explodedOffsetX: 2,
      layer: 35,
      stats: {
        handling: -1,
        accuracy: 5
      }
    }],
    grip: [{
      author: Authors.DrNoob,
      name: 'Ergo grip',
      assetName: 'ARC_grip1.png',
      offsetX: 237,
      offsetY: 170,
      explodedOffsetX: 170,
      explodedOffsetY: 235,
      layer: 55,
      stats: {
        handling: 2,
        accuracy: -5
      }
    }],
    handguard: [{
      author: Authors.DrNoob,
      name: 'Short round handguard',
      assetName: 'ARC_guard1.png',
      offsetX: 434,
      offsetY: 112,
      explodedOffsetX: 454,
      explodedOffsetY: 42,
      layer: 70,
      locks: ['accessory_top'],
      stats: {
        handling: 1,
        accuracy: -5
      }
    }, {
      author: Authors.FalconPilot,
      name: 'Long tactical handguard',
      assetName: 'ARC_guard2.png',
      offsetX: 420,
      offsetY: 99,
      explodedOffsetX: 434,
      explodedOffsetY: 19,
      layer: 70,
      stats: {
        accuracy: 10,
        reliability: -10
      },
      alterOffsetX: {
        block: 120
      }
    }],
    block: [{
      author: Authors.DrNoob,
      name: 'Standard front sight',
      assetName: 'ARC_block1.png',
      offsetX: 592,
      offsetY: 83,
      explodedOffsetY: 13,
      explodedOffsetX: 622,
      layer: 65,
      stats: {
        accuracy: 5
      }
    }],
    muzzle: [{
      author: Authors.DrNoob,
      name: 'Regular flash hider',
      assetName: 'ARC_muzzle1.png',
      offsetX: 799,
      offsetY: 125,
      explodedOffsetY: 65,
      layer: 45,
      stats: {
        handling: 1,
        noise: 7
      }
    }, {
      author: Authors.AB,
      name: 'Yankee Suppressor',
      assetName: 'ARC_muzzle2.png',
      offsetX: 800,
      offsetY: 118,
      explodedOffsetY: 58,
      layer: 45,
      stats: {
        noise: 1,
        damage: -1
      }
    }],
    accessory_top: [{
      author: null,
      name: 'No top accessory',
      assetName: null,
      offsetX: 0,
      offsetY: 0,
      layer: 90
    }]
  }
}

export const ARCDefaultParts: GunParts<ARCParts> = {
  lower: ARC.parts.lower[0],
  upper: ARC.parts.upper[0],
  barrel: ARC.parts.barrel[0],
  stock: ARC.parts.stock[0],
  muzzle: ARC.parts.muzzle[0],
  grip: ARC.parts.grip[0],
  handguard: ARC.parts.handguard[0],
  block: ARC.parts.block[0],
  magazine: ARC.parts.magazine[0],
  accessory_top: ARC.parts.accessory_top[0],
  sight: ARC.parts.sight[0],
  bolt: ARC.parts.bolt[0]
}
