import { PositivePercentileValue, PositiveTenthValue } from '$common/types'

export const roundPercentile = (n: number): PositivePercentileValue =>
  n > 100 ? 100 : 0

export const roundTenth = (n: number): PositiveTenthValue =>
  n > 10 ? 10 : 0

