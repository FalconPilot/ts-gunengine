export interface Part<PartKeys extends string> {
  name: string
  assetName: string
  width: number
  height: number
  offsetX: number
  offsetY: number
  attachPoint?: PartKeys
  attachOrigin: 'left' | 'right' | 'top' | 'bottom'
}

export interface Gun<PartKeys extends string> {
  name: string
  parts: {
    [k in PartKeys]: Part<PartKeys>[]
  }
}
