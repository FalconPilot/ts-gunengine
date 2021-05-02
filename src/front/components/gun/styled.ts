import styled, { css, keyframes } from 'styled-components'
import { viewportWidth } from '../app/styled'

const barHeight = 25

const gunWidth = 1050
const gunHeight = 450

export const GunContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

export const CentralView = styled.div`
  width: ${viewportWidth}px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`

export const SideView = styled.div`
  width: ${(viewportWidth - gunWidth) / 2}px;
  height: ${gunHeight}px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

export const StaticGunWrapper = styled.div<{
  gunName: string
  xray: boolean
}>`
  position: relative;
  width: ${gunWidth}px;
  height: ${gunHeight}px;
  flex-shrink: 0;
  margin: 8px 0;
  border-radius: 8px;
  border: 10px solid #CCC;
  box-shadow: 0px 0px 15px #333 inset;
  background-color: #CCC;
  overflow: hidden;

  &:before {
    content: "${p => p.gunName}";
    position: absolute;
    top: 10px;
    left: 10px;
    text-align: left;
    color: #FFF;
    text-shadow: 0px 0px 2px #333;
    font-weight: bold;
    z-index: 1;
  }

  ${p => p.xray && `
    & img {
      opacity: 0.7;
    }
  `}
`

export const ViewControls = styled.div`
  width: ${gunWidth}px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-start;
`

export const ViewInput = styled.label`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 4px;
  padding: 4px;
  border: 1px solid #CCC;
  border-radius: 4px;
  text-align: left;
  & > :first-child {
    margin-right: auto;
  }
`

export const GunWrapper = styled.div<{ exploded: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  transform: rotate(${p => p.exploded ? 0 : -5}deg);
`

const transitionAnimation = (
  baseLeft: number,
  baseTop: number,
  targetLeft: number,
  targetTop: number,
  reverse: boolean
) => keyframes`
  0% {
    transform: translate(${reverse ? targetLeft : baseLeft}px, ${reverse ? targetTop : baseTop}px);
  }
  100% {
    transform: translate(${reverse ? baseLeft : targetLeft}px, ${reverse ? baseTop : targetTop}px);
  }
`

const selectedPartStyles = css`
  opacity: 1 !important;
  filter: drop-shadow(0px 0px 4px #0CF);
`

export const PartWrapper = styled.img<{
  explodedX: number
  explodedY: number
  originX: number
  originY: number
  layer: number
  exploded: boolean
  shouldAnimate: boolean
  reverseAnimation: boolean
  selected: boolean
}>`
  position: absolute;
  transform: translate(${p => p.exploded ? p.explodedX : p.originX}px, ${p => p.exploded ? p.explodedY : p.originY}px);
  z-index: ${p => p.layer};
  transition: 0.1s filter opacity;

  &:hover {
    cursor: pointer;
  }

  ${p => p.selected ? selectedPartStyles : `
    &:hover {
      ${selectedPartStyles}
    }
  `}

  ${p => p.shouldAnimate && css`
    animation: ${transitionAnimation(p.originX, p.originY, p.explodedX, p.explodedY, p.reverseAnimation)} 0.2s ease-in-out;
  `}
`

export const StatRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`

export const StatColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

export const StatBarWrapper = styled.div<{ tag: string }>`
  position: relative;
  width: 100%;
  height: ${barHeight}px;
  flex-shrink: 0;
  box-sizing: content-box;
  border: 2px solid #CCC;
  margin: 4px 0;
  background-color: #333;
  border-radius: 4px;

  &:after {
    content: "${p => p.tag}";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: #FFF;
    padding-left: 4px;
    line-height: ${barHeight}px;
    text-align: left;
    font-weight: bold;
    text-shadow: 0 0 1px #333;
  }
`

export const Bar = styled.div<{ barColor: string, wValue: number }>`
  position: absolute;
  width: ${p => p.wValue}%;
  top: 0;
  left: 0;
  bottom: 0;
  border-radius: 2px;
  background-color: ${p => p.barColor};
  transition: 0.2s ease-in-out;
`

export const PartsChoiceWrapper = styled.div`
  width: ${gunWidth}px;
  height: 250px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  overflow-x: auto;
`

export const PartCard = styled.button<{
  assetUrl: string
}>`
  width: 220px;
  height: 220px;
  margin: 5px;
  padding: 5px;
  border-radius: 4px;
  border: 2px solid #CCC;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
  background-image: url("${p => p.assetUrl}");
  background-position-x: center;
  background-position-y: bottom;
  background-origin: content-box;
  background-repeat: no-repeat;

  &:hover {
    cursor: pointer;
  }
`

export const GunStat = styled.div`
  font-weight: bold;
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:last-child) {
    margin-bottom: 4px;
  }
`

const colorFromStatus = ({ ev, status }: {
  ev: number
  status: 'bonus' | 'malus' | 'neutral'
}): string => {
  if (status === 'bonus' && ev > 0 || status === 'malus' && ev < 0) {
    return '#5F5'
  }

  if (status === 'bonus' && ev < 0 || status === 'malus' && ev > 0) {
    return '#F55'
  }

  return '#FFF'
}

export const StatName = styled.span`
  display: inline-block;
`

export const StatValue = styled.span<{
  ev: number
  status: 'bonus' | 'neutral' | 'malus'
}>`
  font-style: normal;
  text-shadow: 0 0 2px #000;
  display: inline-block;
  color: ${colorFromStatus};
  flex: 1;
  text-align: right;
  margin-left: 12px;

  ${p => (p.status === 'bonus' || p.status === 'malus') && p.ev > 0 && `
    &:before {
      content: "+";
    }
  `}
`

export const PartCardStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  background-color: rgba(100, 100, 100, 0.3);
  padding: 5px;
  border-radius: 5px;
  border: 2px solid rgba(100, 100, 100, 0.1);
`

export const PartName = styled.div`
  width: 100%;
  margin-bottom: 4px;
  padding-bottom: 4px;
  font-size: 14px;
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid #CCC;
`
