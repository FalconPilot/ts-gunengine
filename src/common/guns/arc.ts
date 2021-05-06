import { Authors } from '$common/constants'
import { ARCParts, Caliber, Gun, GunParts } from '$common/types'

export const ARC: Gun<ARCParts> = {
  name: 'AR-C Rifle',
  caliber: Caliber.R556,
  parts: {
    ammo: {
      standard: {
        author: Authors.DrNoob,
        name: 'Regular',
        assetName: 'ARC_ammo1.png',
        offsetX: 366,
        offsetY: 160,
        explodedOffsetX: 444,
        explodedOffsetY: 240,
        layer: 5
      },
      piercing: {
        author: Authors.FalconPilot,
        name: 'AP',
        assetName: 'ARC_ammo2.png',
        offsetX: 366,
        offsetY: 160,
        explodedOffsetX: 444,
        explodedOffsetY: 240,
        layer: 5,
        stats: {
          piercing: 2,
          noise: 2,
          reliability: -15
        }
      }
    },
    lower: {
      forged: {
        author: Authors.AB,
        name: 'Forged lower receiver',
        assetName: 'ARC_lower1.png',
        offsetX: 250,
        offsetY: 142,
        layer: 50,
        stats: {
          weight: 280,
          reliability: 40
        }
      },
      pdw: {
        author: Authors.Wouter,
        name: 'PDW lower receiver',
        assetName: 'ARC_lower2.png',
        offsetX: 250,
        offsetY: 142,
        layer: 50,
        stats: {
          weight: 250,
          handling: 1,
          edge: 1,
          reliability: 20
        }
      }
    },
    upper: {
      valkyrie: {
        author: Authors.LuckyStriker,
        name: 'Valkyrie aluminum upper receiver',
        assetName: 'ARC_upper1.png',
        offsetX: 253,
        offsetY: 130,
        explodedOffsetY: 85,
        layer: 60,
        stats: {
          weight: 300,
          handling: 2,
          accuracy: -5,
          reliability: 20
        }
      },
      tactical: {
        author: Authors.Benjoo,
        name: 'Tactical upper receiver',
        assetName: 'ARC_upper2.png',
        offsetX: 242,
        offsetY: 130,
        explodedOffsetY: 85,
        layer: 60,
        stats: {
          weight: 350,
          accuracy: 10,
          reliability: 25
        }
      }
    },
    trigger: {
      regular: {
        author: Authors.Benjoo,
        name: 'Standard trigger',
        assetName: 'ARC_trigger1.png',
        offsetX: 292,
        offsetY: 159,
        explodedOffsetX: 271,
        explodedOffsetY: 253,
        layer: 4,
        stats: {
          weight: 50,
          accuracy: 5
        }
      }
    },
    magazine: {
      stanag30: {
        author: Authors.DrNoob,
        name: 'Standard STANAG',
        assetName: 'ARC_mag1.png',
        offsetX: 363,
        offsetY: 162,
        explodedOffsetY: 240,
        layer: 10,
        stats: {
          weight: 120,
          capacity: 30
        }
      },
      stanag20: {
        author: Authors.DrNoob,
        name: 'Short STANAG',
        assetName: 'ARC_mag3.png',
        offsetX: 363,
        offsetY: 162,
        explodedOffsetY: 240,
        layer: 10,
        stats: {
          weight: 90,
          capacity: 20,
          handling: 1
        }
      },
      stanag10: {
        author: Authors.DrNoob,
        name: 'Civilian STANAG',
        assetName: 'ARC_mag4.png',
        offsetX: 363,
        offsetY: 162,
        explodedOffsetY: 240,
        layer: 10,
        stats: {
          weight: 60,
          capacity: 10,
          handling: 1,
          reliability: 5
        }
      },
      tac30: {
        author: Authors.DrNoob,
        name: 'TAC-MAG',
        assetName: 'ARC_mag2.png',
        offsetX: 363,
        offsetY: 162,
        explodedOffsetY: 240,
        layer: 25,
        stats: {
          weight: 140,
          capacity: 30,
          edge: 1,
          reliability: -5
        }
      }
    },
    bolt: {
      milspecBolt: {
        author: Authors.DrNoob,
        name: 'MILSPEC bolt carrier',
        assetName: 'ARC_bolt1.png',
        offsetX: 264,
        offsetY: 136,
        explodedOffsetX: 60,
        explodedOffsetY: 96,
        layer: 35,
        stats: {
          weight: 330,
          reliability: 5
        }
      }
    },
    gastube: {
      standard: {
        author: Authors.DrNoob,
        name: 'Standard gas tube',
        assetName: 'ARC_gas1.png',
        offsetX: 413,
        offsetY: 137,
        explodedOffsetX: 457,
        explodedOffsetY: 190,
        layer: 7,
        stats: {
          weight: 50,
          handling: 1,
          reliability: -5
        }
      }
    },
    barrel: {
      long: {
        author: Authors.DrNoob,
        name: '16" Barrel',
        assetName: 'ARC_barrel1.png',
        offsetX: 417,
        offsetY: 142,
        explodedOffsetX: 457,
        layer: 30,
        stats: {
          weight: 800,
          handling: -3,
          accuracy: 50
        }
      },
      short: {
        author: Authors.DrNoob,
        name: '10.5" Barrel',
        assetName: 'ARC_barrel2.png',
        offsetX: 417,
        offsetY: 142,
        explodedOffsetX: 457,
        layer: 30,
        alterExplodedOffsetX: {
          muzzle: 130
        },
        alterOffsetX: {
          muzzle: -130
        },
        stats: {
          weight: 540,
          handling: 1,
          accuracy: 25
        }
      }
    },
    sight: {
      ironRear: {
        author: Authors.DrNoob,
        name: 'Rear iron sight',
        assetName: 'ARC_sight1.png',
        offsetX: 264,
        offsetY: 99,
        explodedOffsetX: 144,
        explodedOffsetY: 30,
        layer: 95,
        stats: {
          weight: 150,
          handling: 1
        }
      },
      vards: {
        author: Authors.Mattia,
        name: 'Valkyrie ARDS',
        assetName: 'ARC_sight2.png',
        offsetX: 271,
        offsetY: 69,
        explodedOffsetX: 97,
        explodedOffsetY: 10,
        layer: 95,
        stats: {
          weight: 320,
          accuracy: 10
        }
      }
    },
    stock: {
      milspecCollapsible: {
        author: Authors.DrNoob,
        name: 'Milspec collapsible stock',
        assetName: 'ARC_stock1.png',
        offsetX: 20,
        offsetY: 140,
        explodedOffsetX: 10,
        explodedOffsetY: 198,
        layer: 35,
        stats: {
          weight: 240,
          handling: 1
        }
      },
      milspecFixed: {
        author: Authors.DrNoob,
        name: 'Milspec fixed stock',
        assetName: 'ARC_stock2.png',
        offsetX: 15,
        offsetY: 146,
        explodedOffsetX: 10,
        explodedOffsetY: 198,
        layer: 35,
        stats: {
          weight: 710,
          handling: -2,
          reliability: 5,
          accuracy: 10
        }
      },
      ergonomic: {
        author: Authors.DrNoob,
        name: 'Padded collapsible stock',
        assetName: 'ARC_stock3.png',
        offsetX: 18,
        offsetY: 132,
        explodedOffsetX: 8,
        explodedOffsetY: 190,
        layer: 35,
        stats: {
          weight: 280,
          accuracy: 5
        }
      },
      pdw: {
        author: Authors.Wouter,
        name: 'PDW Stock',
        assetName: 'ARC_stock4.png',
        offsetX: 72,
        offsetY: 140,
        explodedOffsetX: 10,
        explodedOffsetY: 200,
        layer: 51,
        stats: {
          weight: 530,
          edge: 1
        }
      }
    },
    grip: {
      ergo: {
        author: Authors.DrNoob,
        name: 'Ergo grip',
        assetName: 'ARC_grip1.png',
        offsetX: 237,
        offsetY: 190,
        explodedOffsetX: 170,
        explodedOffsetY: 275,
        layer: 55,
        stats: {
          weight: 100,
          handling: 2,
          accuracy: -5
        }
      },
      tactical: {
        author: Authors.DrNoob,
        name: 'Tactical grip',
        assetName: 'ARC_grip2.png',
        offsetX: 240,
        offsetY: 189,
        explodedOffsetX: 170,
        explodedOffsetY: 275,
        layer: 55,
        stats: {
          weight: 120,
          accuracy: 5
        }
      }
    },
    handguard: {
      shortRounded: {
        author: Authors.DrNoob,
        name: 'Short round handguard',
        assetName: 'ARC_guard1.png',
        offsetX: 434,
        offsetY: 128,
        explodedOffsetX: 454,
        explodedOffsetY: 62,
        layer: 70,
        locks: ['accessory_bottom', 'accessory_side', 'accessory_top'],
        stats: {
          weight: 260,
          handling: 1,
          reliability: 5,
          accuracy: -5
        }
      },
      shortRoundedRail: {
        author: Authors.DrNoob,
        name: 'Short railed round handguard',
        assetName: 'ARC_guard4.png',
        offsetX: 434,
        offsetY: 128,
        explodedOffsetX: 454,
        explodedOffsetY: 62,
        layer: 70,
        locks: ['accessory_top'],
        alterOffsetX: {
          accessory_side: 60
        },
        alterOffsetY: {
          accessory_side: -9
        },
        stats: {
          weight: 300,
          handling: 1,
          accuracy: -5
        }
      },
      shortRail: {
        author: Authors.DrNoob,
        name: 'Short rail',
        assetName: 'ARC_guard3.png',
        offsetX: 434,
        offsetY: 130,
        explodedOffsetX: 454,
        explodedOffsetY: 62,
        layer: 70,
        stats: {
          weight: 500,
          handling: 1,
          reliability: -5,
          accuracy: -5
        }
      },
      longTactical: {
        author: Authors.FalconPilot,
        name: 'Long tactical handguard',
        assetName: 'ARC_guard2.png',
        offsetX: 420,
        offsetY: 129,
        explodedOffsetX: 442,
        explodedOffsetY: 55,
        layer: 70,
        locks: ['accessory_bottom', 'accessory_side'],
        suffixAssets: {
          gastube: 'alt1'
        },
        stats: {
          weight: 280,
          accuracy: 10,
          reliability: -10
        },
        alterOffsetX: {
          block: 41
        },
        alterExplodedOffsetX: {
          block: 72
        }
      }
    },
    block: {
      stdFrontSight: {
        author: Authors.DrNoob,
        name: 'Standard front sight',
        assetName: 'ARC_block1.png',
        offsetX: 592,
        offsetY: 97,
        explodedOffsetX: 632,
        explodedOffsetY: 33,
        layer: 65,
        stats: {
          weight: 150,
          accuracy: 5
        }
      }
    },
    muzzle: {
      regular: {
        author: Authors.DrNoob,
        name: 'Regular flash hider',
        assetName: 'ARC_muzzle1.png',
        offsetX: 799,
        offsetY: 145,
        explodedOffsetY: 85,
        layer: 45,
        stats: {
          weight: 100,
          accuracy: 5
        }
      },
      yankee: {
        author: Authors.AB,
        name: 'Regular Suppressor',
        assetName: 'ARC_muzzle2.png',
        offsetX: 800,
        offsetY: 139,
        explodedOffsetY: 78,
        layer: 45,
        stats: {
          weight: 360,
          noise: -5,
          handling: -1,
          piercing: -2
        }
      }
    },
    accessory_top: {
      none: {
        author: null,
        name: 'No top accessory',
        assetName: 'noacc.png',
        offsetX: 500,
        offsetY: 90,
        explodedOffsetX: 860,
        explodedOffsetY: 20,
        layer: 90
      },
      laserTop: {
        author: Authors.LilyRin,
        name: 'Tactical Laser',
        assetName: 'laser_top1.png',
        offsetX: 479,
        offsetY: 104,
        explodedOffsetX: 860,
        explodedOffsetY: 30,
        layer: 90,
        lockSpecificAssets: ['laserSide'],
        stats: {
          weight: 210,
          accuracy: 5
        }
      }
    },
    accessory_bottom: {
      none: {
        author: null,
        name: 'No bottom accessory',
        assetName: 'noacc.png',
        offsetX: 500,
        offsetY: 193,
        explodedOffsetX: 590,
        explodedOffsetY: 280,
        layer: 89
      },
      foregrip: {
        author: Authors.DrNoob,
        name: 'Vertical grip',
        assetName: 'foregrip1.png',
        offsetX: 500,
        offsetY: 175,
        explodedOffsetX: 590,
        explodedOffsetY: 280,
        layer: 89,
        stats: {
          weight: 50,
          handling: 1
        }
      },
      angledGrip: {
        author: Authors.DrNoob,
        name: 'Angled grip',
        assetName: 'foregrip2.png',
        offsetX: 490,
        offsetY: 170,
        explodedOffsetX: 590,
        explodedOffsetY: 280,
        layer: 89,
        stats: {
          weight: 80,
          edge: 1
        }
      },
      launcher40: {
        author: Authors.DrNoob,
        name: '40mm Grenade launcher',
        assetName: 'glauncher_1.png',
        offsetX: 425,
        offsetY: 174,
        explodedOffsetX: 525,
        explodedOffsetY: 284,
        layer: 89,
        stats: {
          weight: 1360,
          handling: -2,
          accuracy: -5
        },
        extra: [
          ['grenades', Caliber.G40]
        ]
      }
    },
    accessory_side: {
      none: {
        author: null,
        name: 'No side accessory',
        assetName: 'noacc.png',
        offsetX: 500,
        offsetY: 142,
        explodedOffsetX: 730,
        explodedOffsetY: 240,
        layer: 91
      },
      laserSide: {
        author: Authors.LilyRin,
        name: 'Tactical laser',
        assetName: 'laser_side1.png',
        offsetX: 476,
        offsetY: 129,
        explodedOffsetX: 730,
        explodedOffsetY: 240,
        lockSpecificAssets: ['laserTop'],
        layer: 91,
        stats: {
          weight: 210,
          accuracy: 5
        }
      },
      flashSide: {
        author: Authors.Turkeyshot,
        name: 'Flashlight',
        assetName: 'flashlight_side1.png',
        offsetX: 466,
        offsetY: 139,
        explodedOffsetX: 730,
        explodedOffsetY: 240,
        layer: 91,
        stats: {
          weight: 180,
          edge: 1
        }
      }
    }
  }
}

export const ARCDefaultParts: GunParts<ARCParts> = {
  lower: Object.values(ARC.parts.lower)[0],
  upper: Object.values(ARC.parts.upper)[0],
  barrel: Object.values(ARC.parts.barrel)[0],
  stock: Object.values(ARC.parts.stock)[0],
  muzzle: Object.values(ARC.parts.muzzle)[0],
  grip: Object.values(ARC.parts.grip)[0],
  handguard: Object.values(ARC.parts.handguard)[0],
  block: Object.values(ARC.parts.block)[0],
  magazine: Object.values(ARC.parts.magazine)[0],
  accessory_top: Object.values(ARC.parts.accessory_top)[0],
  sight: Object.values(ARC.parts.sight)[0],
  bolt: Object.values(ARC.parts.bolt)[0],
  ammo: Object.values(ARC.parts.ammo)[0],
  trigger: Object.values(ARC.parts.trigger)[0],
  gastube: Object.values(ARC.parts.gastube)[0],
  accessory_bottom: Object.values(ARC.parts.accessory_bottom)[0],
  accessory_side: Object.values(ARC.parts.accessory_side)[0]
}
