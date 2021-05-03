import * as React from 'react'

import {
  Caliber,
  Gun,
  GunPartKeys,
  GunParts,
  Part,
  PartStats,
  PositivePercentileValue,
  PositiveTenthValue,
  StatType
} from '$common/types'

import {
  isCaliberStat,
  isNumber,
  isPositivePercentileValue,
  isPositiveTenthValue
} from '$common/utils'

import { caliberStats } from '$common/constants'

import {
  CentralView,
  GunContainer,
  GunStat,
  GunWrapper,
  NumberStat,
  NumberTable,
  PartCard,
  PartCardStats,
  PartName,
  PartsChoiceWrapper,
  PartWrapper,
  SideView,
  StaticGunWrapper,
  StatName,
  StatValue,
  ViewInput
} from './styled'

import { PercentileStatBar, TenthStatBar } from './StatBar'

type StatTuple = [string, number, StatType, string, string?]

const applyCaliberStats = <StatType extends number>(
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

const roundPercentile = (n: number): PositivePercentileValue =>
  n > 100 ? 100 : 0

const roundTenth = (n: number): PositiveTenthValue =>
  n > 10 ? 10 : 0

const gunPercentile = <P extends GunPartKeys>(
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

const gunTenth = <P extends GunPartKeys>(
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

const gunNumber = <P extends GunPartKeys>(
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

const shouldDisplay = (lockedKeys: string[], restrictedParts: string[]) => <P extends GunPartKeys>(
  [k, part]: [string, Part<P>]
): boolean => (
  !lockedKeys.includes(k) &&
  !restrictedParts.includes(k) &&
  part.assetName !== null
)

const statIntel = (k: keyof PartStats): [StatType, string, string?] => {
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

const isPositive = (t: StatTuple): boolean => {
  switch (t[2]) {
    case 'neutral': return false
    case 'bonus': return t[1] > 0
    case 'malus': return t[1] < 0
  }
}

const isNegative = (t: StatTuple): boolean => {
  switch (t[2]) {
    case 'neutral': return false
    case 'bonus': return t[1] < 0
    case 'malus': return t[1] > 0
  }
}

const sortStats = (v1: StatTuple, v2: StatTuple): -1 | 1 => {
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

export const GunView = <P extends GunPartKeys>(
  gun: Gun<P>,
  parts: GunParts<P>
): React.FunctionComponent<{
  xray: boolean
  exploded: boolean
  shouldAnimate: boolean
  reverseAnimation: boolean
  selectedPart: keyof typeof gun.parts | null
  toggleXray: () => void
  toggleExploded: () => void
  selectPart: (key: keyof typeof gun.parts | null) => () => void
  onPartChange: (partKey: keyof typeof gun.parts) => (evt: React.MouseEvent<HTMLButtonElement>) => void
}> => ({
  xray,
  exploded,
  selectedPart,
  shouldAnimate,
  reverseAnimation,
  toggleXray,
  selectPart,
  onPartChange,
  toggleExploded
}) => {
  const lockedKeys = Object
    .values<Part<P>>(parts)
    .reduce<P[]>((acc, part) => acc.concat(part.locks ?? []), [])

  const restrictedParts = Object
    .values<Part<P>>(parts)
    .reduce<string[]>((acc, part) => acc.concat(part.lockSpecificAssets ?? []), [])

  const partsList: Part<P>[] = Object
    .entries<Part<P>>(parts)
    .filter(shouldDisplay(lockedKeys, restrictedParts))
    .map(([_k, v]) => v)

  const toSuffix = Object
    .values<Part<P>>(parts)
    .reduce<{ [k in keyof typeof parts]?: string }>((acc, part) => ({
      ...acc,
      ...part.suffixAssets
    }), {})

  const accuracy = gunPercentile(gun.caliber, partsList, 'accuracy')
  const handling = gunTenth(gun.caliber, partsList, 'handling')
  const reliability = gunPercentile(gun.caliber, partsList, 'reliability')
  const noise = gunTenth(gun.caliber, partsList, 'noise')
  const damage = gunNumber(gun.caliber, partsList, 'damage')
  const piercing = gunNumber(gun.caliber, partsList, 'piercing')
  const capacity = gunNumber(gun.caliber, partsList, 'capacity')
  const edge = gunTenth(gun.caliber, partsList, 'edge')
  const weight = gunNumber(gun.caliber, partsList, 'weight')

  return (
    <GunContainer>
      <CentralView>
        <SideView>
          <NumberTable>
            <NumberStat tag='Damage' val={damage} />
            <NumberStat tag='Piercing' val={piercing} />
            <NumberStat tag='Capacity' val={`${capacity}rds`} />
            <NumberStat tag='Weight' val={`${weight / 1000}kg`} />
          </NumberTable>
          <PercentileStatBar
            tag='Accuracy'
            barColor='#28A'
            wValue={accuracy}
          />
          <PercentileStatBar
            tag='Reliability'
            barColor='#FC0'
            wValue={reliability}
          />
          <TenthStatBar
            tag='Handling'
            barColor='#E82'
            wValue={handling}
          />
          <TenthStatBar
            tag='Noise'
            barColor='#C55'
            wValue={noise}
          />
          <TenthStatBar
            tag='Edge'
            barColor='#3C1'
            wValue={edge}
          />
        </SideView>
        <StaticGunWrapper gunName={gun.name}>
          <GunWrapper exploded={exploded}>
            {Object
              .entries<Part<P>>(parts)
              .filter(shouldDisplay(lockedKeys, restrictedParts))
              .map(([rawPartKey, part]) => {
                const partKey = rawPartKey as P
                const offsetX = (offset: number, expl?: boolean): number => offset + partsList.reduce<number>((total, p) => (
                  total + (p?.alterOffsetX?.[partKey] ?? 0) + (
                    expl ? (p?.alterExplodedOffsetX?.[partKey] ?? 0) : 0
                  )
                ), 0)

                const offsetY = (offset: number, expl?: boolean): number => offset + partsList.reduce<number>((total, p) => (
                  total + (p?.alterOffsetY?.[partKey] ?? 0) + (
                    expl ? (p?.alterExplodedOffsetY?.[partKey] ?? 0) : 0
                  )
                ), 0)

                const assetPath = toSuffix[partKey]
                  ? part.assetName?.replace(/\.png$/, `_${toSuffix[partKey]}.png`)
                  : part.assetName

                return (
                  <PartWrapper
                    key={`part-${part.name}`}
                    src={`/assets/gunParts/${assetPath}`}
                    shouldAnimate={shouldAnimate}
                    reverseAnimation={reverseAnimation}
                    originX={offsetX(part.offsetX)}
                    originY={offsetY(part.offsetY)}
                    explodedX={offsetX(part.explodedOffsetX ?? part.offsetX, true)}
                    explodedY={offsetY(part.explodedOffsetY ?? part.offsetY, true)}
                    exploded={exploded}
                    layer={part.layer}
                    onClick={partKey === selectedPart ? selectPart(null) : selectPart(partKey)}
                    selected={partKey === selectedPart}
                    xray={xray}
                  />
                )
              })}
          </GunWrapper>
        </StaticGunWrapper>
        <SideView>
          <ViewInput>
            <input
              type='checkbox'
              onChange={toggleXray}
              checked={xray}
            />
            X-Ray
          </ViewInput>
          <ViewInput>
            <input
              type='checkbox'
              onChange={toggleExploded}
              checked={exploded}
            />
            Exploded view
          </ViewInput>
        </SideView>
      </CentralView>
      <PartsChoiceWrapper>
        {selectedPart !== null && Object
          .entries(gun.parts[selectedPart])
          .filter(([pkey]) => !restrictedParts.includes(pkey))
          .map(([pkey, part]) => {
            const assetPath = toSuffix[pkey as P]
              ? part.assetName?.replace(/\.png$/, `_${toSuffix[pkey as P]}.png`)
              : part.assetName

            return (
              <PartCard
                key={`${selectedPart}-${pkey}`}
                assetUrl={`/assets/gunParts/${assetPath}`}
                onClick={onPartChange(selectedPart)}
                value={pkey}
              >
                <PartName>{selectedPart === 'ammo' && `${gun.caliber} `}{part.name}</PartName>
                {!!part.stats && (
                  <PartCardStats>
                    {Object
                      .entries(part.stats)
                      .map<StatTuple>(([statKey, statValue]) => {
                        const [status, name, suffix] = statIntel(statKey as keyof PartStats)
                        return [statKey, (statValue as number), status, name, suffix]
                      })
                      .sort(sortStats)
                      .map(([statKey, statValue, status, name, suffix]) => {
                        const value = statKey === 'weight' ? statValue / 1000 : statValue
                        return (
                          <GunStat key={`${selectedPart}-${statKey}`}>
                            <StatName>{name}</StatName>
                            <StatValue
                              status={status}
                              ev={value}
                            >{value}{suffix}</StatValue>
                          </GunStat>
                        )
                      })
                    }
                  </PartCardStats>
                )}
              </PartCard>
            )
        })}
      </PartsChoiceWrapper>
    </GunContainer>
  )
}
