import { Caliber, CaliberStats, GunPartKeys } from "./types"

export const langs = ['fr', 'en'] as const

export const defaultLang = langs[0]

export enum Authors {
  AB = 'A.B.',
  Benjoo = 'Benjoo',
  DrNoob = 'Dr. Noob',
  FalconPilot = 'FalconPilot',
  LilyRin = 'Lily Rin',
  LuckyStriker = 'Lucky Striker',
  Mattia = 'El Mattia',
  Turkeyshot = 'Turkeyshot',
  Wouter = 'Wouter Kroon'
}

export const authorLink = (author: Authors): string => {
  switch (author) {
    case Authors.AB: return 'https://www.flickr.com/photos/69234163@N04/'
    case Authors.Benjoo: return 'https://www.flickr.com/photos/66666941@N02/'
    case Authors.DrNoob: return 'http://pimpmygun.doctornoob.com/'
    case Authors.FalconPilot: return 'https://www.flickr.com/photos/71549116@N04/'
    case Authors.LilyRin: return 'https://www.flickr.com/photos/10589790@N05/'
    case Authors.LuckyStriker: return 'https://www.flickr.com/photos/gogoluckystrike/'
    case Authors.Mattia: return 'https://www.flickr.com/photos/73711787@N03/'
    case Authors.Turkeyshot: return 'https://www.flickr.com/photos/53459776@N03/'
    case Authors.Wouter: return 'https://www.flickr.com/photos/sh0ckwave/'
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
    case 'ammo': return 'Ammunition type'
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
    case 'trigger': return 'Trigger group'
    case 'upper': return 'Upper receiver'
  }
}
