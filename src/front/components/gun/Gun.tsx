import * as React from 'react'

import {
  Caliber,
  Gun,
  GunPartKeys,
  GunParts,
  Part,
  PartStats,
  PositivePercentileValue,
  PositiveTenthValue
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
  parts.reduce<PositivePercentileValue>((total, part) => {
    const val = part?.stats?.[key]
    const newTotal = typeof val === 'number' ? total + val : total
    return isPositivePercentileValue(newTotal)
      ? newTotal
      : roundPercentile(newTotal)
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
  parts.reduce<PositiveTenthValue>((total, part) => {
    const val = part?.stats?.[key]
    const newTotal = typeof val === 'number' ? total + val : total
    return isPositiveTenthValue(newTotal)
      ? newTotal
      : roundTenth(newTotal)
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

const statIntel = (k: keyof PartStats): ['bonus' | 'neutral' | 'malus', string, string?] => {
  switch (k) {
    case 'accuracy': return ['bonus', 'Accuracy', '%']
    case 'capacity': return ['neutral', 'Capacity', 'rds']
    case 'damage': return ['bonus', 'Damage']
    case 'noise': return ['neutral', 'Noise']
    case 'handling': return ['bonus', 'Handling']
    case 'piercing': return ['bonus', 'Piercing']
    case 'reliability': return ['bonus', 'Reliability', '%']
  }
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
    .reduce((acc, part) => ({
      ...acc,
      ...part.suffixAssets
    }), {}) as { [k in keyof typeof parts]: string }

  const accuracy = gunPercentile(gun.caliber, partsList, 'accuracy')
  const handling = gunTenth(gun.caliber, partsList, 'handling')
  const reliability = gunPercentile(gun.caliber, partsList, 'reliability')
  const noise = gunTenth(gun.caliber, partsList, 'noise')
  const damage = gunNumber(gun.caliber, partsList, 'damage')
  const piercing = gunNumber(gun.caliber, partsList, 'piercing')
  const capacity = gunNumber(gun.caliber, partsList, 'capacity')

  return (
    <GunContainer>
      <CentralView>
        <SideView>
          <NumberStat>Damage : {damage}</NumberStat>
          <NumberStat>Piercing : {piercing}</NumberStat>
          <NumberStat>Capacity : {capacity}rds</NumberStat>
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
            barColor='#8C4'
            wValue={handling}
          />
          <TenthStatBar
            tag='Noise'
            barColor='#A77'
            wValue={noise}
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
                <PartName>{part.name}</PartName>
                {!!part.stats && (
                  <PartCardStats>
                    {Object.entries(part.stats).map(([statKey, statValue]) => {
                      const [status, name, suffix] = statIntel(statKey as keyof PartStats)

                      return (
                        <GunStat key={`${selectedPart}-${statKey}`}>
                          <StatName>{name}</StatName>
                          <StatValue
                            status={status}
                            ev={statValue}
                          >{statValue}{suffix}</StatValue>
                        </GunStat>
                      )
                    })}
                  </PartCardStats>
                )}
              </PartCard>
            )
        })}
      </PartsChoiceWrapper>
    </GunContainer>
  )
}
