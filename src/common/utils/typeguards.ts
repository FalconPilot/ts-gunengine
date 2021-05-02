import { langs } from '$common/constants'
import { AppLang, GunPartKeys, PercentileValue, PositivePercentileValue, PositiveTenthValue, TenthValue } from '$common/types'

export const isLang = (x: string): x is AppLang => langs.map(String).includes(x)

export const isGunPart = <P extends GunPartKeys>(x: unknown, partsKeys: string[]): x is P =>
  typeof x === 'string' && partsKeys.includes(x)

export const isPercentileValue = (n: number): n is PercentileValue =>
  n >= -100 && n <= 100

export const isTenthValue = (n: number): n is TenthValue =>
  n >= -10 && n <= 10

export const isPositivePercentileValue = (n: number): n is PositivePercentileValue =>
  n >= 0 && n <= 100

export const isPositiveTenthValue = (n: number): n is PositiveTenthValue =>
  n >= 0 && n <= 10
