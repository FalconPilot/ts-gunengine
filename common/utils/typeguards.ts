import { langs } from '$common/constants'
import { AppLang } from '$common/types'

export const isLang = (x: string): x is AppLang => langs.map(String).includes(x)
