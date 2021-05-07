import * as React from 'react'

import {
  ExtraFeatures,
  Gun,
  GunPartKeys,
  GunParts,
  Part,
  PartStats,
  StatTuple
} from '$common/types'

import {
  extraName,
  gunNumber,
  gunPercentile,
  gunTenth,
  shouldDisplayGun,
  sortStats,
  statIntel
} from '$front/utils'

import {
  CentralView,
  ExtraFeature,
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

export const GunView = <P extends GunPartKeys>({
  gun,
  parts,
  xray,
  exploded,
  shouldAnimate,
  reverseAnimation,
  selectedPart,
  toggleXray,
  toggleExploded,
  selectPart,
  onPartChange
}: {
  gun: Gun<P>,
  parts: GunParts<P>,
  xray: boolean
  exploded: boolean
  shouldAnimate: boolean
  reverseAnimation: boolean
  selectedPart: keyof GunParts<P> | null
  toggleXray: () => void
  toggleExploded: () => void
  selectPart: (key: keyof GunParts<P> | null) => () => void
  onPartChange: (partKey: keyof GunParts<P>) => (evt: React.MouseEvent<HTMLButtonElement>) => void
}): React.ReactElement | null => {
  const lockedKeys = Object
    .values<Part<P>>(parts)
    .reduce<P[]>((acc, part) => acc.concat(part.locks ?? []), [])

  const restrictedParts = Object
    .values<Part<P>>(parts)
    .reduce<string[]>((acc, part) => acc.concat(part.lockSpecificAssets ?? []), [])

  const partsList: Part<P>[] = Object
    .entries<Part<P>>(parts)
    .filter(shouldDisplayGun(lockedKeys, restrictedParts))
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
          <NumberTable>
            {partsList
              .reduce<ExtraFeatures[]>((acc, p) => acc.concat(p?.extra ?? []), [])
              .map(extra => (
                <ExtraFeature key={extra[0]} tag={extraName(extra[0])} val={extra[1]} />
              ))
            }
          </NumberTable>
        </SideView>
        <StaticGunWrapper gunName={gun.name}>
          <GunWrapper exploded={exploded}>
            {Object
              .entries<Part<P>>(parts)
              .filter(shouldDisplayGun(lockedKeys, restrictedParts))
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
