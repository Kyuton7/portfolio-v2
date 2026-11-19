import type { Credential, SocialLink } from './schema'

/**
 * Who the site is about. START HERE: every page, the sidebar, the SEO tags and the legal pages read
 * these values, so changing them here changes them everywhere.
 */
export const site = {
  name: 'Quelton Glenn Amba',
  brand: 'QG Automate',
  /** The brand name as the sidebar logo shows it: the second part takes the accent color. */
  brandParts: ['QG', 'Automate'],
  /** Your logo mark, one file per theme (`light` = for light backgrounds). The 96px copies are the
   *  sidebar header (shown at 32-36px); the full ones are the Work logo faces. */
  logo: {
    light: '/images/brand/mark.webp',
    dark: '/images/brand/mark-light.webp',
    headerLight: '/images/brand/mark-96.webp',
    headerDark: '/images/brand/mark-light-96.webp',
  },
  /** The live address, no trailing slash. Canonical URLs, the sitemap and the JSON-LD use it. */
  url: 'https://qgautomate.vercel.app',
  role: 'AI Automation Specialist',
  email: 'queltonglenn@gmail.com',
  emailSubject: 'Automation project',
  replyPromise: 'Reply within one business day.',
  location: 'Philippines, GMT+8',
  /** Two-letter country code (ISO 3166) for the Person JSON-LD address. */
  countryCode: 'PH',
  /** Your clock, shown live at the top of the sidebar. Any IANA zone, e.g. 'America/New_York'. */
  timeZone: 'Asia/Manila',
  timePlace: 'in the Philippines',
  avatar: {
    src: '/images/profile/avatar.webp',
    alt: 'Quelton Glenn Amba',
    width: 400,
    height: 400,
    srcSet: '/images/profile/800/avatar.webp 800w, /images/profile/avatar.webp 400w',
  },
  /** The sidebar picture (112px, 44px on the rail). */
  avatarSmall: '/images/profile/avatar-224.webp',
} as const

/** A credential shown in About and the sidebar check. Delete the `image` to show it without a badge. */
export const certification: Credential = {
  title: 'n8n Workflow Automation Certificate',
  detail: 'One of six automation and AI certifications',
  issuer: 'Technical Virtual Assistants PH',
  href: '/about',
  image: { src: '/images/badges/64/n8n.webp', alt: 'n8n certification badge', width: 64, height: 64 },
}

/** Up to five fit the sidebar header. `icon` picks the glyph in components/brand/SocialIcon.tsx. */
export const socials: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/quelton-glenn-c-amba-lpt-8a322a300',
    external: true,
    icon: 'linkedin',
  },
  { label: 'GitHub', href: 'https://github.com/Kyuton7', external: true, icon: 'github' },
]

/** Off-site links the pages point at. Replace each `#` with a real URL. */
export const externalLinks = {
  resource: 'https://calendly.com/queltonglenn/automation-strategy-call',
  showcase: '#',
  company: 'https://qgautomate.tech',
} as const

/** Booking is the only conversion goal on this site, same as v1 and the chat widget. */
export const booking = {
  href: 'https://calendly.com/queltonglenn/automation-strategy-call',
  label: 'Book a free automation strategy call',
  note: 'Free, 30 minutes.',
} as const

export function mailtoHref(): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(site.emailSubject)}`
}
