import { Arcana, RobePiercing, Tribe, Weapon } from '@/types'

// 빈 Profile 객체 생성 헬퍼
export const EMPTY_PROFILE = {
  name: '',
  tribe: Tribe.ELF,
  arcana: Arcana.SEGA,
  weapon: Weapon.NAV,
  robe_piercing: RobePiercing.ZERO,
  debuff: {
    status_support: {
      level: 0,
    },
    death_marker: {
      level: 0,
      has_special: false,
    },
    uppercut: {
      rate: 0,
      has_increased_protection: false,
    },
    suport_shot: {
      has_set_bonus: false,
      has_magigraph: false,
    },
    fragrach: {
      has_throwing_star: false,
    },
    pet_count: {
      cat: 0,
      mire: 0,
      fox: 0,
    },
    hydra: {
      level: 0,
    },
    smoke: false,
  },
}
