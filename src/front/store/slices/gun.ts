import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ARCParts, Gun, GunPartKeys, GunParts, Part } from '$common/types'
import { GunState } from '$front/types'
import { ARC, ARCDefaultParts } from '$common/guns'

const initialState: GunState<ARCParts> = {
  currentGun: ARC,
  parts: ARCDefaultParts
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
): GunState<P> => ({
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
