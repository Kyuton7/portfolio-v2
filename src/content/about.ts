import type { Image, ToolMark } from './schema'
import { certification, site } from './site'
import { tools } from './tools'

/**
 * The Home About section: the desk illustration stands on a hairline floor with the lead over its
 * space; roles with tool logos as raised keys, credentials below.
 */
export const aboutSection = {
  eyebrow: 'About',
  titleThin: "Hi, I'm",
  titleBold: `${site.name}.`,
  lede: 'I build automation systems for businesses losing hours a week to work a machine should be doing.',
  lead: 'I work solo and full-stack. I audit the systems you already run, map the process, build it, document it in plain English and hand it over myself. There is no second freelancer to brief and no gap between the build and the handover.',
  leadQuiet: 'In practice that means self-hosted n8n for most builds, GoHighLevel where the team already lives there, and AI doing the judgement work in between.',
  note: {
    company: `${site.brand} is my company`,
    product: { label: 'the Command Centre', href: '/showcase' },
    rest: 'is the build I can show you end to end: a live operations dashboard running inside a client CRM.',
  },
  picture: {
    src: '/images/profile/desk.webp',
    srcSet: '/images/profile/800/desk.webp 800w, /images/profile/desk.webp 1200w',
    alt: 'Illustration of a desk with a laptop, a lamp, a coffee and a plant',
    width: 1200,
    height: 889,
  } satisfies Image,
}

export const capabilities: { title: string; tools: ToolMark[] }[] = [
  { title: 'Workflow automation', tools: [tools.n8n, tools.make, tools.zapier] },
  { title: 'AI systems and agents', tools: [tools.openai, tools.claude, tools.n8n] },
  { title: 'CRM and pipelines', tools: [tools.ghl, tools.hubspot, tools.airtable, tools.sheets] },
  { title: 'Integrations and ops', tools: [tools.slack, tools.gmail, tools.notion, tools.stripe, tools.docker] },
]

export type AboutCredential = {
  id: 'cert' | 'place' | 'community' | 'partner'
  title: string
  detail: string
  image?: Image
  /** A dark-theme version of the mark, when the light one would vanish on a dark ground (or the reverse). */
  imageDark?: Image
  href?: string
}

export const credentials: AboutCredential[] = [
  { id: 'cert', title: certification.title, detail: certification.detail, image: { ...certification.image!, alt: '' } },
  { id: 'place', title: `Based ${site.timePlace}`, detail: 'GMT+8, with hours shifted to overlap yours' },
]
