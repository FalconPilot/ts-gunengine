import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ARCParts, Gun, GunPartKeys, GunParts, Part } from '$common/types'
import { GunState } from '$front/types'
import { ARC, ARCDefaultParts } from '$common/guns'

const initialState: GunState<ARCParts> = {
  currentGun: ARC,
  parts: ARCDefaultParts
}

const removeParts = <P extends GunPartKeys>(
  state: GunState<P>
): GunState<P> => {
  const lockedKeys = Object
    .values<Part<P>>(state.parts)
    .reduce<P[]>((acc, part) => acc.concat(part.locks ?? []), [])

  const forbiddenItems = Object
    .values<Part<P>>(state.parts)
    .reduce<string[]>((acc, part) => acc.concat(part.lockSpecificAssets ?? []), [])

  return forbiddenItems.reduce<GunState<P>>((acc, key) => ({
    ...acc,
    parts: Object.entries(acc.parts).reduce<GunParts<P>>((p, [k, v]) => ({
      ...p,
      [k]: (
        key === k || lockedKeys.includes(k as P)
          ? Object.values(state.currentGun.parts[k as P])[0]
          : v
      )
    }), acc.parts)
  }), state)
}

const setGun = <P extends GunPartKeys>(
  state: GunState<P>,
  action: PayloadAction<[Gun<P>, GunParts<P>]>
): GunState<P> => ({
  ...state,
  currentGun: action.payload[0],
  parts: action.payload[1]
})

const setPart = <P extends GunPartKeys>(
  state: GunState<P>,
  action: PayloadAction<[P, Part<P>]>
): GunState<P> => removeParts({
  ...state,
  parts: {
    ...state.parts,
    [action.payload[0]]: action.payload[1]
  }
})

export const gunSlice = createSlice({
  name: 'gun',
  initialState,
  reducers: {
    setPart,
    setGun
  }
})
