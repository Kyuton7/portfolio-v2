import type { ToolMark } from './schema'

const mark = (name: string, file: string, mono?: true): ToolMark => ({ name, logo: `/images/tools/${file}`, mono })

/**
 * Every tool logo the site can show. Pages reference these, never a raw path. All of them are black
 * one-colour marks, so each takes `true` as the third argument: inverted on dark grounds so it never
 * disappears. GoHighLevel has no public one-colour mark, so it shows as a GHL lettermark.
 */
export const tools = {
  n8n: mark('n8n', 'n8n.svg', true),
  ghl: mark('GoHighLevel', 'gohighlevel.svg', true),
  make: mark('Make', 'make.svg', true),
  zapier: mark('Zapier', 'zapier.svg', true),
  openai: mark('OpenAI', 'openai.svg', true),
  claude: mark('Claude', 'claude.svg', true),
  slack: mark('Slack', 'slack.svg', true),
  sheets: mark('Google Sheets', 'googlesheets.svg', true),
  airtable: mark('Airtable', 'airtable.svg', true),
  notion: mark('Notion', 'notion.svg', true),
  gmail: mark('Gmail', 'gmail.svg', true),
  stripe: mark('Stripe', 'stripe.svg', true),
  hubspot: mark('HubSpot', 'hubspot.svg', true),
  supabase: mark('Supabase', 'supabase.svg', true),
  docker: mark('Docker', 'docker.svg', true),
} satisfies Record<string, ToolMark>

/** The daily drivers, in the order you want them shown. */
export const dailyTools: ToolMark[] = [
  tools.n8n,
  tools.ghl,
  tools.make,
  tools.zapier,
  tools.openai,
  tools.claude,
  tools.slack,
  tools.sheets,
  tools.airtable,
  tools.notion,
  tools.gmail,
]
