import { Caliber, CaliberStats, GunPartKeys } from "./types"

export const langs = ['fr', 'en'] as const

export const defaultLang = langs[0]

export enum Authors {
  AB = 'A.B.',
  DrNoob = 'Dr. Noob',
  FalconPilot = 'FalconPilot',
  LuckyStriker = 'Lucky Striker'
}

export const authorLink = (author: Authors): string => {
  switch (author) {
    case Authors.AB: return 'https://www.flickr.com/photos/69234163@N04/'
    case Authors.DrNoob: return 'http://pimpmygun.doctornoob.com/'
    case Authors.FalconPilot: return 'https://www.flickr.com/photos/71549116@N04/'
    case Authors.LuckyStriker: return 'https://www.flickr.com/photos/gogoluckystrike/'
  }
}

export const caliberStats = (caliber: Caliber): CaliberStats => {
  switch (caliber) {
    case Caliber.R556: return {
      damage: 8,
      piercing: 2
    }
  }
}

export const partName = (partKey: GunPartKeys): string => {
  switch (partKey) {
    case 'accessory_bottom': return 'Bottom accessory'
    case 'accessory_side': return 'Side accessory'
    case 'accessory_top': return 'Top accessory'
    case 'barrel': return 'Barrel'
    case 'block': return 'Front block'
    case 'bolt': return 'Bolt'
    case 'gastube': return 'Gas tube'
    case 'grip': return 'Pistol grip'
    case 'handguard': return 'Handguard'
    case 'lower': return 'Lower receiver'
    case 'magazine': return 'Magazine'
    case 'muzzle': return 'Muzzle'
    case 'sight': return 'Rear sight/Optic'
    case 'stock': return 'Stock'
    case 'upper': return 'Upper receiver'
  }
}
