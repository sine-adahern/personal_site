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
  },
  {
    name: 'Portfolio',
    href: '/portfolio',
    thumb: '/thumbs/thumb-portfolio-dark.jpg',
    thumbLight: '/thumbs/thumb-portfolio-light.jpg',
  },
  {
    name: 'Awards and Achievements',
    href: '/awards',
    thumb: '/thumbs/thumb-awards-dark.png',
    thumbLight: '/thumbs/thumb-awards-light.png',
  },
  {
    name: 'Cyber SOC',
    href: '/cybersoc',
    thumb: '/thumbs/thumb-cybersoc-dark.jpg',
    thumbLight: '/thumbs/thumb-cybersoc-light.jpg',
  },
  { name: 'Public Speaking', href: '/speaking', thumb: '/thumbs/thumb-speaking.svg' },
  { name: 'Links', href: '/links', thumb: '/thumbs/thumb-patch.svg' },
];

/** Degrees between adjacent panels on the wheel. */
export const ANGLE_STEP = 360 / panels.length;

/**
 * Wheel geometry, in real CSS pixels, shared by the wheel and its miniature.
 * The miniature divides every one of these by the viewport width, so the small
 * copy is a true-to-scale reproduction rather than an approximation.
 */
export const WHEEL_GEOMETRY = {
  mobile: { cardW: 288, cardH: 162, radius: 450, perspective: 1200 },
  desktop: { cardW: 480, cardH: 270, radius: 780, perspective: 1800 },
} as const;
