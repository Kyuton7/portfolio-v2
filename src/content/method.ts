import type { MethodStep } from './schema'

/** Your method: the jobs your service does for a client, in order. It names the steps of the Home automation diagram. */
export const method = {
  eyebrow: 'How I work',
  title: 'Audit. Blueprint. Approval. Build. Documentation.',
  summary: 'Five steps, always in that order. The third one is why nothing in the build ever surprises you.',
  steps: [
    {
      name: 'Audit',
      body: 'I go through the systems you already run to find the gaps, and learn how the business actually works day to day.',
      inputs: ['Current tools', 'Daily workflow', 'Where the time goes', 'What keeps breaking'],
    },
    {
      name: 'Blueprint',
      body: 'You get a recommendation back: the process mapped end to end, the right tools for the job, and a timeline.',
      inputs: ['Process map', 'Tool choice', 'Timeline', 'Scope'],
    },
    {
      name: 'Approval',
      body: 'Nothing gets built until you have approved the blueprint and we have walked the process map together.',
      inputs: ['Walkthrough', 'Your changes', 'Sign-off'],
    },
    {
      name: 'Build',
      body: 'Built on whichever platform fits the business, handling the error paths and the edge cases, not just the happy path.',
      inputs: ['Happy path', 'Error paths', 'Edge cases', 'Live tests'],
    },
    {
      name: 'Documentation',
      body: 'Every build ships with an SOP in plain English, so non-technical staff can run and maintain it without me.',
      inputs: ['Plain-English SOP', 'Handover', 'Support window'],
    },
  ] satisfies MethodStep[],
}
