import { langs } from '$common/constants'

export type ValueOf<T> = T[keyof T]

export type ValuesOfArray<T extends unknown[] | readonly unknown[]>= T[number]

export type AppLang = ValuesOfArray<typeof langs>
