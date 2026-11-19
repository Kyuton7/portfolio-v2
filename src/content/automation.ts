import { method } from './method'

/**
 * The live automation diagram on Home: a client's journey through an automation build, drawn stage by
 * stage as the page scrolls (enquiry -> audit -> blueprint -> approval -> build -> handover). It is the
 * five steps of method.ts as an actual pipeline, which is the thing he is selling.
 *
 * Coordinates are in the diagram's own 1200 x 600 units: the main path is the top row, delivery the
 * bottom row. `plane` is who moves it: `lead` = the client / him, `auto` = the system does it.
 * `step` is the method step (0 to 4: the five steps in method.ts). Nodes are listed in build order.
 */
export type FlowPlane = 'lead' | 'auto'
export type FlowIcon = 'form' | 'email' | 'booked' | 'reminder' | 'alarm' | 'call' | 'proposal' | 'won' | 'later' | 'nurture' | 'lost'

export type FlowNode = {
  id: string
  title: string
  tag: string
  plane: FlowPlane
  icon: FlowIcon
  x: number
  y: number
  w: number
  h: number
  step: number
  /** One line for the inspector. */
  about: string
}

/** `solid` links are the main path (arrows a packet runs); `dashed` links reroute it: a change request loops back, the build drops into delivery. */
export type FlowLink = { from: string; to: string; style: 'solid' | 'dashed'; label?: string }

const ROWS = [64, 376]
const box = (col: number, row: number) => ({ x: 24 + col * 200, y: ROWS[row]!, w: 156, h: 136 })


export const liveAutomation = {
  eyebrow: 'How a build runs',
  titleThin: 'Audit first.',
  titleBold: 'Approve, then build.',
  steps: method.steps.map((step) => ({ name: step.name, body: step.body })),
  panel: { lead: 'Enquiry to', rest: 'Live System' },
  legend: { auto: 'Automated', lead: 'Your path' },
  zones: { booking: 'Scoping', pipeline: 'Delivery' },
  connected: 'System live',
  hint: { hover: 'Hover a stage to inspect', tap: 'Tap a stage to inspect' },
  nodes: [
    { id: 'enquiry', title: 'New Enquiry', tag: 'Form or chat', plane: 'lead', icon: 'form', ...box(0, 0), step: 0, about: 'You reach me through the site, the chat widget or a referral. No form filling beyond a first message.' },
    { id: 'booking', title: 'Call Booked', tag: 'Calendly slot', plane: 'auto', icon: 'booked', ...box(1, 0), step: 0, about: 'The booking link takes your details once. Nothing asks for them twice.' },
    { id: 'audit', title: 'Audit Call', tag: 'How you actually work', plane: 'lead', icon: 'call', ...box(2, 0), step: 0, about: 'Thirty minutes on the systems you already run, where the time goes, and what keeps breaking.' },
    { id: 'blueprint', title: 'Blueprint', tag: 'Process map and timeline', plane: 'auto', icon: 'proposal', ...box(3, 0), step: 1, about: 'The process mapped end to end, the right tools named, and a timeline. In writing, before any build.' },
    { id: 'approval', title: 'You Approve', tag: 'We walk the map', plane: 'lead', icon: 'reminder', ...box(4, 0), step: 2, about: 'We go through the map together. Nothing is built until you have signed it off, so there are no surprises later.' },
    { id: 'build', title: 'Build', tag: 'On the stack that fits', plane: 'auto', icon: 'alarm', ...box(5, 0), step: 3, about: 'Usually self-hosted n8n, sometimes GoHighLevel, Make or Zapier. Whatever fits the business, not whatever I prefer.' },
    { id: 'tests', title: 'Error Paths', tag: 'Not just the happy path', plane: 'auto', icon: 'lost', ...box(0, 1), step: 3, about: 'What happens when the API is down, the field is empty, or two records collide. Handled before handover, not after.' },
    { id: 'live', title: 'System Live', tag: 'Running on your data', plane: 'auto', icon: 'won', ...box(1, 1), step: 3, about: 'It runs on your real data, watched for the first days, and tuned where reality disagrees with the map.' },
    { id: 'sop', title: 'Plain-English SOP', tag: 'No jargon', plane: 'lead', icon: 'proposal', ...box(2, 1), step: 4, about: 'A document a non-technical person can follow: what it does, how to use it, what to do when it breaks.' },
    { id: 'handover', title: 'Handover', tag: 'Walkthrough', plane: 'lead', icon: 'call', ...box(3, 1), step: 4, about: 'A walkthrough with whoever runs it day to day, so the system does not depend on me being reachable.' },
    { id: 'support', title: 'Support Window', tag: 'After handover', plane: 'auto', icon: 'nurture', ...box(4, 1), step: 4, about: 'A window after handover to catch anything the first weeks of real use turn up.' },
  ] satisfies FlowNode[],
  links: [
    { from: 'enquiry', to: 'booking', style: 'solid' },
    { from: 'booking', to: 'audit', style: 'solid' },
    { from: 'audit', to: 'blueprint', style: 'solid' },
    { from: 'blueprint', to: 'approval', style: 'solid' },
    { from: 'approval', to: 'build', style: 'solid' },
    { from: 'approval', to: 'blueprint', style: 'dashed', label: 'Changes requested' },
    { from: 'build', to: 'tests', style: 'dashed' },
    { from: 'tests', to: 'live', style: 'solid' },
    { from: 'live', to: 'sop', style: 'solid' },
    { from: 'sop', to: 'handover', style: 'solid' },
    { from: 'handover', to: 'support', style: 'solid' },
  ] satisfies FlowLink[],
}
