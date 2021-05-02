import * as React from 'react'

import { PositivePercentileValue } from '$common/types'

import { Bar, StatBarWrapper } from './styled'

export const PercentileStatBar: React.FunctionComponent<{
  wValue: PositivePercentileValue
  barColor: string
  tag: string
}> = ({ barColor, tag, wValue }) => (
  <StatBarWrapper tag={`${tag}: ${wValue}%`}>
    <Bar barColor={barColor} wValue={wValue} />
  </StatBarWrapper>
)

export const TenthStatBar: React.FunctionComponent<{
  wValue: PositivePercentileValue
  barColor: string
  tag: string
}> = ({ barColor, tag, wValue }) => (
  <StatBarWrapper tag={`${tag}: ${wValue} / 10`}>
    <Bar barColor={barColor} wValue={wValue * 10} />
  </StatBarWrapper>
)
