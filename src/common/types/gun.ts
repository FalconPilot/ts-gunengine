import { Authors } from '$common/constants'

import { PercentileValue, PositiveTenthValue, TenthValue } from './core'

export type ExtraFeatures =
  | ['grenades', Caliber]

export enum Caliber {
  R556 = '5.56x45mm',
  G40 = '40mm'
}

export interface CaliberStats {
  damage: number
  piercing: number
  noise: PositiveTenthValue
}

export interface PartStats {
  damage?: number
  piercing?: number
  capacity?: number
  accuracy?: PercentileValue
  handling?: TenthValue
  reliability?: PercentileValue
  noise?: TenthValue
  edge?: TenthValue
  weight?: number
}

export type GunPartKeys =
  | 'accessory_bottom'
  | 'accessory_side'
  | 'accessory_top'
  | 'ammo'
  | 'barrel'
  | 'block'
  | 'bolt'
  | 'gastube'
  | 'grip'
  | 'handguard'
  | 'lower'
  | 'magazine'
  | 'muzzle'
  | 'sight'
  | 'stock'
  | 'trigger'
  | 'upper'

export type ARCParts =
  | 'accessory_bottom'
  | 'accessory_side'
  | 'accessory_top'
  | 'ammo'
  | 'barrel'
  | 'bolt'
  | 'block'
  | 'gastube'
  | 'grip'
  | 'handguard'
  | 'lower'
  | 'magazine'
  | 'muzzle'
  | 'sight'
  | 'stock'
  | 'trigger'
  | 'upper'

export type StatType =
  | 'bonus'
  | 'neutral'
  | 'malus'

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
  lockSpecificAssets?: string[]
  stats?: PartStats
  extra?: ExtraFeatures[]
  suffixAssets?: {
    [k in PartKeys]?: string
  }
  alterExplodedOffsetX?: {
    [k in PartKeys]?: number
  }
  alterOffsetX?: {
    [k in PartKeys]?: number
  }
  alterExplodedOffsetY?: {
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
    [k in PartKeys]: Record<string, Part<PartKeys>>
  }
}

export type GunParts<PartKeys extends GunPartKeys> = {
  [k in PartKeys]: Part<PartKeys>
}

export type StatTuple = [string, number, StatType, string, string?]
