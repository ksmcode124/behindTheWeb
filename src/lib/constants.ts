export const SOCIAL_MEDIA = [
  {
    platform: 'instagram' as const,
    href: 'https://instagram.com/the.code124',
    label: 'the.code124',
  },
  {
    platform: 'whatsapp' as const,
    href: 'https://wa.me/6285777700124',
    label: '+6285-777-700-124',
  },
  {
    platform: 'email' as const,
    href: 'mailto:ksm.code124@gmail.com',
    label: 'ksm.code124@gmail.com',
  },
  {
    platform: 'linkedin' as const,
    href: 'https://linkedin.com/in/code124',
    label: 'code124',
  },
];


export const IMAGES = {
  LOGO_WHITE: '/images/logo_white.webp',
  LOGO_BLACK: '/images/logo_black.webp',

  // Hero
  HERO_BG: '/images/hero_bg.webp',
  PIXEL: '/images/retro_pixel.webp',
  HEADER_MEET_TEAM: '/images/header_meet_team.webp',
  HEADER_MEET_TEAM1: '/images/header_meet_team1.webp',
  
  // Origin
  FIRST_COMMIT: '/images/first_commit.webp',
  ORIGIN_BG: '/images/origin_img_bg.webp',
  ORIGIN_FIRST_COMMIT: '/images/origin_first_commit.webp',
  
  // Common
  LINE_BROWN_BLACK: '/images/line_brow_black.webp',
  LINE_BROWN_WHITE: '/images/line_brow_white.webp',
  LINE: '/images/line.webp',
  PIXEL_BORDER: '/images/pixel_border.webp',
  
  // Fallback
  FALLBACK: '/images/origin_first_commit.webp',
} as const;

export const TEXTURE = {
  TEXTURE1: "/textures/texture_1.webp",
  TEXTURE2: "/textures/texture_2.webp",
  TEXTURE3: "/textures/texture_3.webp",
  TEXTURE4: "/textures/texture_4.webp",
  TEXTURE5: "/textures/texture_5.webp",
  TEXTURE6: "/textures/texture_6.webp",
  TEXTURE7: "/textures/texture_7.webp",
  TEXTURE8: "/textures/texture_8.webp",
}

export const ROUTES = {
  HOME: '/',
  OUR_PAST: '/our-past',
  THE_TEAM: '/the-team',
};

export const NAV_ITEMS = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'The Team', href: ROUTES.THE_TEAM },
  { label: 'Our Past', href: ROUTES.OUR_PAST },
];


export const CAROUSEL_SPEED = 45;