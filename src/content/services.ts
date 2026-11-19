import type { Service } from './schema'
import { tools } from './tools'

export const servicesPage = {
  eyebrow: 'Services',
  title: 'Everything I build, in one line each.',
  lede: 'Five things, and most clients start with one. The next gets added once the first is paying for itself.',
}

/**
 * The Home Services section: a stack of cards dealt onto a pile as the page scrolls. The display line
 * is the thin + bold pair below.
 */
export const servicesSection = {
  eyebrow: servicesPage.eyebrow,
  titleThin: 'Pick one',
  titleBold: 'or stack a few.',
  explore: 'Explore',
  /** The Work chapter each card opens, by service id (a chapter id from work.ts). */
  work: {
    'ai-automation': 'ai-agents',
    'workflow-automation': 'client-systems',
    'process-automation': 'back-office',
    'systems-integration': 'client-systems',
    'funnels': 'lead-engines',
  } as Record<string, string>,
}

export const services: Service[] = [
  {
    id: 'ai-automation',
    title: 'AI Automation Development',
    summary: 'AI that does the judgement work: reading, classifying, drafting and deciding, with you holding the send button.',
    outcome: 'Fewer manual calls',
    bullets: [
      'AI agents behind a human approval gate',
      'Voice AI agents that handle inbound and outbound calls',
      'Website chatbots built to book, not to chat',
    ],
    tools: [tools.openai, tools.claude, tools.n8n],
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    summary: 'The repetitive half of your week moved into systems that run whether or not anyone remembers.',
    outcome: 'Hours back weekly',
    bullets: [
      'Self-hosted n8n builds, the default stack',
      'Make and Zapier architecture when the team already lives there',
      'GoHighLevel workflow automation',
    ],
    tools: [tools.n8n, tools.make, tools.zapier],
  },
  {
    id: 'process-automation',
    title: 'Business Process Automation',
    summary: 'Lead handling, follow-up and document work running end to end without a person pushing it along.',
    outcome: 'Lower admin load',
    bullets: [
      'CRM and pipeline builds',
      'SMS and email follow-up sequences',
      'Document processing, sorting and filing',
    ],
    tools: [tools.ghl, tools.sheets, tools.gmail],
  },
  {
    id: 'systems-integration',
    title: 'Systems Integration',
    summary: 'Tools that do not talk to each other, wired together so the same data stops being retyped.',
    outcome: 'One source of truth',
    bullets: [
      'API and webhook integrations',
      'Slack approval and alerting workflows',
      'Automated data pipelines across platforms',
    ],
    tools: [tools.slack, tools.airtable, tools.hubspot],
  },
  {
    id: 'funnels',
    title: 'Funnels and Landing Pages',
    summary: 'Pages built to get the call booked, wired straight into the automation sitting behind them.',
    outcome: 'Booked calls',
    bullets: [
      'Landing pages and full multi-step funnels',
      'Booking and lead capture wired in, not bolted on',
      'Built in GoHighLevel or as code, whichever you will maintain',
    ],
    tools: [tools.ghl, tools.stripe, tools.n8n],
  },
]
