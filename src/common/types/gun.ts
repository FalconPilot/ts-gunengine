import { Authors } from '$common/constants'

import { PercentileValue, TenthValue } from './core'

export enum Caliber {
  R556 = '5.56x45mm'
}

export interface CaliberStats {
  damage: number
  piercing: number
}

export interface PartStats {
  damage?: number
  piercing?: number
  accuracy?: PercentileValue
  handling?: TenthValue
  reliability?: PercentileValue
  noise?: TenthValue
  capacity?: number
}

export type GunPartKeys =
  | 'accessory_bottom'
  | 'accessory_side'
  | 'accessory_top'
  | 'barrel'
  | 'block'
  | 'bolt'
  | 'gastube'
  | 'grip'
  | 'handguard'
  | 'lower'
  | 'magazine'
  | 'muzzle'
  | 'upper'
  | 'sight'
  | 'stock'

export type ARCParts =
  | 'accessory_top'
  | 'barrel'
  | 'bolt'
  | 'block'
  | 'grip'
  | 'handguard'
  | 'lower'
  | 'magazine'
  | 'muzzle'
  | 'sight'
  | 'stock'
  | 'upper'

export interface Part<PartKeys extends GunPartKeys> {
  author: Authors | null
  name: string
  assetName: string | null
  offsetX: number
  offsetY: number
  explodedOffsetX?: number
  explodedOffsetY?: number
  attachPoint?: PartKeys
  layer: number
  locks?: PartKeys[]
  lockSpecificAssets?: {
    [k in PartKeys]?: number
  }
  stats?: PartStats
  suffixAssets?: {
    [k in PartKeys]?: string
  }
  alterOffsetX?: {
    [k in PartKeys]?: number
  }
  alterOffsetY?: {
    [k in PartKeys]?: number
  }
}

export interface Gun<PartKeys extends GunPartKeys> {
  name: string
  caliber: Caliber
  parts: {
    [k in PartKeys]: Part<PartKeys>[]
  }
}

export type GunParts<PartKeys extends GunPartKeys> = {
  [k in PartKeys]: Part<PartKeys>
}
