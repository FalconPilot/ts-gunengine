import * as React from 'react'

import {
  Gun,
  GunPartKeys,
  GunParts,
  Part,
  PartStats,
  PositivePercentileValue,
  PositiveTenthValue
} from '$common/types'

import { isPositivePercentileValue, isPositiveTenthValue } from '$common/utils'

import {
  CentralView,
  GunContainer,
  GunStat,
  GunWrapper,
  PartCard,
  PartCardStats,
  PartName,
  PartsChoiceWrapper,
  PartWrapper,
  SideView,
  StatColumn,
  StaticGunWrapper,
  StatName,
  StatRow,
  StatValue,
  ViewControls,
  ViewInput
} from './styled'

import { PercentileStatBar, TenthStatBar } from './StatBar'

const roundPercentile = (n: number): PositivePercentileValue =>
  n > 100 ? 100 : 0

const roundTenth = (n: number): PositiveTenthValue =>
  n > 10 ? 10 : 0

const gunPercentile = <P extends GunPartKeys>(
  parts: (Part<P>)[],
  key: keyof PartStats
): PositivePercentileValue => (
  parts.reduce<PositivePercentileValue>((total, part) => {
    const val = part?.stats?.[key]
    const newTotal = typeof val === 'number' ? total + val : total
    return isPositivePercentileValue(newTotal)
      ? newTotal
      : roundPercentile(newTotal)
  }, 0)
)

const gunTenth = <P extends GunPartKeys>(
  parts: (Part<P>)[],
  key: keyof PartStats
): PositiveTenthValue => (
  parts.reduce<PositiveTenthValue>((total, part) => {
    const val = part?.stats?.[key]
    const newTotal = typeof val === 'number' ? total + val : total
    return isPositiveTenthValue(newTotal)
      ? newTotal
      : roundTenth(newTotal)
  }, 0)
)

const shouldDisplay = (lockedKeys: string[]) => <P extends GunPartKeys>(
  [k, part]: [string, Part<P>]
): boolean => !lockedKeys.includes(k) && part.assetName !== null

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
  const lockedKeys = Object.values<Part<P>>(parts).reduce<P[]>((acc, part) => acc.concat(part.locks ?? []), [])

  const partsList: Part<P>[] = Object.entries<Part<P>>(parts)
    .filter(([k, v]) => !lockedKeys.includes(k as P))
    .map(([k, v]) => v)

  const accuracy = gunPercentile(partsList, 'accuracy')
  const handling = gunTenth(partsList, 'handling')
  const reliability = gunPercentile(partsList, 'reliability')
  const noise = gunTenth(partsList, 'noise')

  return (
    <GunContainer>
      <CentralView>
        <SideView>
          <PercentileStatBar
            tag='Accuracy'
            barColor='#28A'
            wValue={accuracy}
          />
          <TenthStatBar
            tag='Handling'
            barColor='#8C4'
            wValue={handling}
          />
          <PercentileStatBar
            tag='Reliability'
            barColor='#C90'
            wValue={reliability}
          />
          <TenthStatBar
            tag='Noise'
            barColor='#C55'
            wValue={noise}
          />
        </SideView>
        <StaticGunWrapper gunName={gun.name} xray={xray}>
          <GunWrapper exploded={exploded}>
            {Object.entries<Part<P>>(parts).filter(shouldDisplay(lockedKeys)).map(([rawPartKey, part]) => {
              const partKey = rawPartKey as P
              const offsetX = (offset: number): number => offset + partsList.reduce<number>((total, p) => (
                total + (p?.alterOffsetX?.[partKey] ?? 0)
              ), 0)

              const offsetY = (offset: number): number => offset + partsList.reduce<number>((total, p) => (
                total = (p?.alterOffsetY?.[partKey] ?? 0)
              ), 0)

              return (
                <PartWrapper
                  key={`part-${part.name}`}
                  src={`/assets/gunParts/${part.assetName}`}
                  shouldAnimate={shouldAnimate}
                  reverseAnimation={reverseAnimation}
                  originX={offsetX(part.offsetX)}
                  originY={offsetY(part.offsetY)}
                  explodedX={offsetX(part.explodedOffsetX ?? part.offsetX)}
                  explodedY={offsetY(part.explodedOffsetY ?? part.offsetY)}
                  exploded={exploded}
                  layer={part.layer}
                  onClick={partKey === selectedPart ? selectPart(null) : selectPart(partKey)}
                  selected={partKey === selectedPart}
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
        {selectedPart !== null && gun.parts[selectedPart].map((part, idx) => {
          return (
            <PartCard
              key={`${selectedPart}-${part.name}`}
              assetUrl={`/assets/gunParts/${part.assetName}`}
              onClick={onPartChange(selectedPart)}
              value={idx}
            >
              <PartName>{part.name}</PartName>
              <PartCardStats>
                {!!part.stats && Object.entries(part.stats).map(([statKey, statValue]) => {
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
            </PartCard>
          )
        })}
      </PartsChoiceWrapper>
    </GunContainer>
  )
}
