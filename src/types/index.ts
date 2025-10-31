export type ProfileJSON = {
  editor_name: string
  updated_at: string
  profiles: Profile[]
}

export type Profile = {
  name: string
  tribe: Tribe
  arcana: Arcana
  weapon: Weapon
  robe_piercing: RobePiercing
  debuff: Debuff
}

// Enum-like constants
export const Tribe = {
  ELF: '엘프',
  HUMAN: '인간',
  GIANT: '자이언트',
} as const

export const Arcana = {
  SEGA: '세가',
  SEBA: '세바',
  DARKME: '닼메',
  ALS: '알스',
  ELNA: '엘나',
  POAL: '포알',
  BLEN: '블랜',
  BAGGER: '배거',
} as const

export const Weapon = {
  NAV: '나브',
  SOUL: '소울',
} as const

export const RobePiercing = {
  ZERO: '0',
  ONE: '1',
  TWO: '2',
  THREE: '3',
} as const

// Types derived from constants
export type Tribe = (typeof Tribe)[keyof typeof Tribe]
export type Arcana = (typeof Arcana)[keyof typeof Arcana]
export type Weapon = (typeof Weapon)[keyof typeof Weapon]
export type RobePiercing = (typeof RobePiercing)[keyof typeof RobePiercing]

export type Debuff = {
  status_support: {
    level: number
  }
  death_marker: {
    level: number
    has_special: boolean
  }
  uppercut: {
    rate_level: number
    has_increased_protection: boolean
  }
  suport_shot: {
    has_set_bonus: boolean
    has_magigraph: boolean
  }
  fragrach: {
    has_throwing_star: boolean
  }
  pet_count: {
    cat: number
    mire: number
    fox: number
  }
  hydra: {
    level: number
  }
  smoke: boolean
}
