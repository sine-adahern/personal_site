import type { NavPanel } from '../types/nav';

/**
 * Single source of truth for the site's page list.
 *
 * Consumed by NavWheel (the 3D wheel on the home page), HomeMini (the live
 * miniature of that wheel rendered inside the Home card) and SideNav (the
 * drawer on every other page). Adding a page here adds it everywhere.
 */
export const panels: NavPanel[] = [
  {
    name: 'Home',
    href: '/',
    thumb: '/thumbs/thumb-home.svg',
    thumbLight: '/thumbs/thumb-home-light.svg',
    // Rendered as a live miniature of this page rather than a flat image.
    // The `thumb` above is only used one level deeper (inside the miniature)
    // and as the still frame for the click-to-expand transition.
    mini: true,
  },
  {
    name: 'About Me',
    href: '/about',
    thumb: '/thumbs/thumb-about-dark.jpg',
    thumbLight: '/thumbs/thumb-about-light.jpg',
    thumbMobile: '/thumbs/mobile/thumb-about-dark-mobile.png',
    thumbMobileLight: '/thumbs/mobile/thumb-about-light-mobile.png',
  },
  {
    name: 'Portfolio',
    href: '/portfolio',
    thumb: '/thumbs/thumb-portfolio-dark.jpg',
    thumbLight: '/thumbs/thumb-portfolio-light.jpg',
    thumbMobile: '/thumbs/mobile/thumb-portfolio-dark-mobile.png',
    thumbMobileLight: '/thumbs/mobile/thumb-portfolio-light-mobile.png',
  },
  {
    name: 'Awards and Achievements',
    href: '/awards',
    thumb: '/thumbs/thumb-awards-dark.png',
    thumbLight: '/thumbs/thumb-awards-light.png',
    thumbMobile: '/thumbs/mobile/thumb-awards-dark-mobile.png',
    thumbMobileLight: '/thumbs/mobile/thumb-awards-light-mobile.png',
  },
  {
    name: 'Cyber SOC',
    href: '/cybersoc',
    thumb: '/thumbs/thumb-cybersoc-dark.jpg',
    thumbLight: '/thumbs/thumb-cybersoc-light.jpg',
    thumbMobile: '/thumbs/mobile/thumb-cybersoc-dark-mobile.png',
    thumbMobileLight: '/thumbs/mobile/thumb-cybersoc-light-mobile.png',
  },
  {
    name: 'Public Speaking',
    href: '/speaking',
    thumb: '/thumbs/thumb-speaking-dark.png',
    thumbLight: '/thumbs/thumb-speaking-light.png',
    thumbMobile: '/thumbs/mobile/thumb-speaking-dark-mobile.png',
    thumbMobileLight: '/thumbs/mobile/thumb-speaking-light-mobile.png',
  },
  {
    name: 'Press',
    href: '/press',
    thumb: '/thumbs/thumb-press-dark.png',
    thumbLight: '/thumbs/thumb-press-light.png',
    thumbMobile: '/thumbs/mobile/thumb-press-dark-mobile.png',
    thumbMobileLight: '/thumbs/mobile/thumb-press-light-mobile.png',
  },
];

/** Degrees between adjacent panels on the wheel. */
export const ANGLE_STEP = 360 / panels.length;

/**
 * Wheel geometry, in real CSS pixels, shared by the wheel and its miniature.
 * The miniature divides every one of these by the viewport width (and height,
 * on mobile), so the small copy is a true-to-scale reproduction rather than an
 * approximation.
 *
 * Mobile cards are portrait (9:19.5, matching the real phone-screenshot
 * thumbnails in `thumbMobile`/`thumbMobileLight` above), not the 16:9 shape
 * used on desktop. The card size is an upper bound rather than a fixed size:
 * the front card is magnified by perspective / (perspective - radius) = 1.6,
 * so a naive width-only fit (288px wide → ~625px tall → 1000px on screen)
 * would overflow a phone's height long before its width. NavWheel and
 * HomeMini both fit the card against *both* the viewport width and height and
 * take whichever is more restrictive; see `--card-w` there and
 * `--mini-cardw` in HomeMini — the two formulas must stay identical, or the
 * miniature stops being a picture of the wheel it sits inside.
 */
export const WHEEL_GEOMETRY = {
  mobile: { maxCardW: 288, maxCardH: 624, aspectW: 9, aspectH: 19.5, radius: 450, perspective: 1200 },
  desktop: { cardW: 480, cardH: 270, radius: 780, perspective: 1800 },
} as const;
