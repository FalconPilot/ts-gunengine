import { Gun, GunPartKeys, GunParts, Part } from '$common/types'

export interface GunState<PartKeys extends GunPartKeys> {
  currentGun: Gun<PartKeys>
  parts: GunParts<PartKeys>
}
