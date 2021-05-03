import { Theme } from '$front/types'

const mq = (minMax: 'min' | 'max') => (
  bp: keyof Theme['breakpoints'],
  theme: Theme
) => (): string =>
  `@media (${minMax}-width: ${theme.breakpoints[bp]}px)`

export const mqFrom = mq('min')
export const mqTo = mq('max')
