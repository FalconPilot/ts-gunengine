import { caliberStats } from '$common/constants'

import {
  isCaliberStat,
  isNumber,
  isPositivePercentileValue,
  isPositiveTenthValue,
  roundPercentile,
  roundTenth
} from '$common/utils'

import {
  Caliber,
  ExtraFeatures,
  GunPartKeys,
  Part,
  PartStats,
  PositivePercentileValue,
  PositiveTenthValue,
  StatTuple,
  StatType
} from '$common/types'

export const applyCaliberStats = <StatType extends number>(
  caliber: Caliber,
  statKey: keyof PartStats,
  statValue: number,
  typeguard: (x: number) => x is StatType,
  transmute: (x: number) => StatType
): StatType => {
  const stats = caliberStats(caliber)
  const value = isCaliberStat(statKey, stats)
    ? statValue + (stats?.[statKey] ?? 0)
    : statValue
  return typeguard(value) ? value : transmute(value)
}

export const gunPercentile = <P extends GunPartKeys>(
  caliber: Caliber,
  parts: (Part<P>)[],
  key: keyof PartStats
): PositivePercentileValue => applyCaliberStats(
  caliber,
  key,
  parts.reduce<number>((total, part) => {
    const val = part?.stats?.[key]
    return typeof val === 'number' ? total + val : total
  }, 0),
  isPositivePercentileValue,
  roundPercentile
)

export const gunTenth = <P extends GunPartKeys>(
  caliber: Caliber,
  parts: (Part<P>)[],
  key: keyof PartStats
): PositiveTenthValue => applyCaliberStats(
  caliber,
  key,
  parts.reduce<number>((total, part) => {
    const val = part?.stats?.[key]
    return typeof val === 'number' ? total + val : total
  }, 0),
  isPositiveTenthValue,
  roundTenth
)

export const gunNumber = <P extends GunPartKeys>(
  caliber: Caliber,
  parts: (Part<P>)[],
  key: keyof PartStats
): number => applyCaliberStats(
  caliber,
  key,
  parts.reduce<number>((total, part) => (
    total + (part?.stats?.[key] ?? 0)
  ), 0),
  isNumber,
  Number
)

export const shouldDisplayGun = (lockedKeys: string[], restrictedParts: string[]) => <P extends GunPartKeys>(
  [k, part]: [string, Part<P>]
): boolean => (
  !lockedKeys.includes(k) &&
  !restrictedParts.includes(k) &&
  part.assetName !== null
)


export const statIntel = (k: keyof PartStats): [StatType, string, string?] => {
  switch (k) {
    case 'accuracy': return ['bonus', 'Accuracy', '%']
    case 'capacity': return ['neutral', 'Capacity', 'rds']
    case 'damage': return ['bonus', 'Damage']
    case 'edge': return ['bonus', 'Edge']
    case 'noise': return ['malus', 'Noise']
    case 'handling': return ['bonus', 'Handling']
    case 'piercing': return ['bonus', 'Piercing']
    case 'reliability': return ['bonus', 'Reliability', '%']
    case 'weight': return ['neutral', 'Weight', 'kg']
  }
}

export const extraName = (k: ExtraFeatures[0]): string => {
  switch (k) {
    case 'grenades': return 'Grenades'
  }
}

export const isPositive = (t: StatTuple): boolean => {
  switch (t[2]) {
    case 'neutral': return false
    case 'bonus': return t[1] > 0
    case 'malus': return t[1] < 0
  }
}

export const isNegative = (t: StatTuple): boolean => {
  switch (t[2]) {
    case 'neutral': return false
    case 'bonus': return t[1] < 0
    case 'malus': return t[1] > 0
  }
}

export const sortStats = (v1: StatTuple, v2: StatTuple): -1 | 1 => {
  const t1 = v1[2]
  const t2 = v2[2]
  const suffix1 = v1[4]
  const suffix2 = v2[4]

  if (t1 === 'neutral' && t2 !== 'neutral') {
    return -1
  }

  if (t2 === 'neutral' && t1 !== 'neutral') {
    return 1
  }

  if (isPositive(v1) && isNegative(v2)) {
    return -1
  }

  if (isPositive(v2) && isNegative(v1)) {
    return 1
  }

  if (suffix1 && suffix1 !== suffix2) {
    return 1
  }

  if (suffix2 && suffix2 !== suffix1) {
    return -1
  }

  return v1[0] > v2[0] ? 1 : -1
}
