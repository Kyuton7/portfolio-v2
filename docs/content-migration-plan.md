# v1 to v2 content migration plan

Written 2026-11-20. Source: `CLAUDE CODE/synap-automate` (live at qgautomate.tech).
Target: this repo, deployed at https://qgautomate.vercel.app.

The template renders every page from typed data in `src/content/`. No component is
touched to change copy. So this whole migration is: fill 14 typed files, add the
images they point at, and port the three things the template does not ship
(chatbot, Calendly, the knowledge base generator).

---

## 1. What v1 actually holds

Counted in the repo, not estimated.

| Thing | Count | Where it lives now |
|---|---|---|
| Projects | 23 (7 client, 16 capability) | `ProjectsSection.tsx`, 985 lines of inline JSX |
| Project screenshots | 26 | `src/assets/projects/` |
| Certificates | 6 (n8n, Make, Zapier, Canva, Prompt Engineering, TEFL) | `src/assets/certs/` |
| Process steps | 5 (Audit, Blueprint, Approval, Build, Documentation) | `ProcessSection.tsx` |
| Tools in the stack | 29 | `TechStackSection.tsx` |
| Services | 4 cards, GoHighLevel included | `ServicesSection.tsx` |
| Testimonials | text only | `TestimonialsSection.tsx` |
| Experience | roles and dates | `ExperienceSection.tsx` |
| Verified numbers | 100+ automations, 29 tools, 480+ hours/year, 584 contracts | `AboutSection.tsx` + `scripts/kb-policy.txt` |
| Booking | Calendly embed | `ContactSection.tsx` |
| Chat widget | 5 components + `useChat` | `src/components/chat/` |

**The shortcut that saves the most time:** `synap-automate/scripts/kb.generated.js`
is 12.7KB of plain text already extracted from every section of v1 by
`generate-kb.mjs`. That is the migration source for prose. The JSX is only needed
for exact headlines, image paths and link URLs.

## 2. Slot by slot

| v2 file | Source | Status |
|---|---|---|
| `site.ts` | name, role, socials, domain | Direct. Socials need an Instagram glyph added to `SocialIcon`, the union is facebook/linkedin/discord/github/x. |
| `home.ts` | HeroSection headline, About stat tiles | Direct. Manifesto is new writing, built from his own line in the KB. |
| `method.ts` | ProcessSection, 5 steps | Direct, 1:1. Best fit in the whole template. |
| `tools.ts` | TechStackSection, 29 tools | Direct. Needs 29 logo files, v1 only ships 5 in `public/logos`. |
| `services.ts` | ServicesSection, 4 cards | Direct. `Service` wants exactly 3 bullets plus an `outcome` phrase, v1 cards are looser, so each needs a trim. |
| `about.ts` | AboutSection + ExperienceSection + 6 certs | Direct. Certs map onto `Credential` with `issuer` and `image`. |
| `work.ts` | 23 projects, 26 screenshots | **The big one.** Needs regrouping into chapters, see section 3. |
| `proof.ts` | 6 clients + text testimonials | Client accounts and quotes only. Video slots left empty. |
| `showcase.ts` | MDS Command Centre | Repurposed, see section 4. |
| `automation.ts` | new | A live n8n flow diagram. Nothing to migrate, this is written from scratch and is the strongest new section for him. |
| `faqs.ts` | `kb-policy.txt` | The policy file already answers pricing, timelines, stack and handover. Lift those into FAQs. |
| `contact.ts` | ContactSection | Calendly replaces the mailto hand-off. |
| `legal.ts` | nothing | Template ships a draft privacy policy and terms. Edit the names and keep. |
| `schema.ts` | n/a | Types only. Do not edit. |

## 2b. Where "experience" goes

Decided 2026-11-20. v1's Experience section is not a work history at all, it is six
certificates with clickable full-size scans. So "experience" splits three ways:

| Piece | Home in v2 | Note |
|---|---|---|
| 6 certificates | Their own Work chapter, replacing `experiments` | The sheet's gallery lightbox gives the same open-the-scan behaviour v1 had. |
| Client engagements | `proof.ts` client accounts | Industry only, never a company name. That is his standing rule and the KB repeats it. |
| 5 testimonials | `proof.ts` quotes, with the role as the name | They are anonymised, so `Quote` loses its `date` field. No name and no date gets invented. |
| Work history with dates | Not shown | v1 never had one. The builds are the evidence; a thin history would read like a junior CV. |

The `Quote` type change is one optional field in `schema.ts` plus the line that
renders it. Nothing else reads `date`.

## 3. Work chapters: the regroup

v2 does not take a flat list of 23 cards. It takes chapters, each with a count, a
unit, a cover and its builds.

**The constraint that decided this:** the bento's grid areas in `work.css` are keyed
by chapter id, and each tile has its own shape. Inventing four new chapters means
redesigning that grid. Keeping the template's eight and mapping onto them costs one
id rename. So:

| Chapter | Holds | Source |
|---|---|---|
| `featured` | One standout client build, with a gallery | Client systems |
| `case-studies` | Two client builds told as problem and result | Client systems |
| `process` | A redacted blueprint or SOP | `Clients/_Past/*` docs, sanitised |
| `screens` | The 16 capability builds, one screenshot each | `src/assets/projects/` |
| `websites` | Funnels and landing pages | Van Ede Glas Schuifwanden and others |
| `apps` | Repurposed as dashboards and tools | MDS Command Centre, financial tracker, crypto tracker |
| `side-projects` | His own running systems | QG Lead Engine, WAT scraper, portfolio chatbot |
| `certifications` | The six certificate scans (renamed from `experiments`) | `src/assets/certs/` |

Counts are derived from the arrays, never typed in, per the schema comment. The one
code change is the `experiments` to `certifications` id in `work.css`, and widening
`AppBuild['kind']` to allow 'Web app'.

## 4. Showcase: MDS Command Centre

Decided 2026-11-20. The template wants a product with a film, feature tabs and
stats. He has no product, so the page becomes one deep case study.

Assets: `Clients/_Past/MDS/Dashboard/MDS_Dashboard_v2.html` runs locally, so the
tab images get captured from the real thing rather than sourced. The `ProductFilm`
slot needs a short screen recording of the dashboard in use. Until that exists,
the page runs poster-only.

Stats come from the verified list only. No new numbers.

## 5. What the template will not do out of the box

Four things, all known before starting:

1. **No chat widget.** Port `ChatWidget`, `useChat`, the launcher drag hook and the
   greeting bubble from v1. They are framer-motion, the template is GSAP, so
   framer-motion comes along as a second dependency. Scheduled after the content.
2. **The CSP blocks n8n and Calendly.** `vercel.json` currently ships
   `connect-src 'self'` and `frame-src` is absent. The bot needs
   `connect-src https://n8n.srv1684941.hstgr.cloud`, Calendly needs
   `frame-src https://calendly.com`. The inline theme script is pinned by hash, so
   run `npm run csp:check` after any edit to it.
3. **The contact form is mailto-only.** Replace the hand-off in `ContactForm.tsx`
   with the Calendly embed.
4. **The knowledge base generator breaks.** `generate-kb.mjs` parses v1 components
   by name (ProjectsSection, ServicesSection and so on). None of those exist here.
   Rewrite it to import `src/content/*.ts` instead. That is easier than the regex
   it replaces, typed data beats parsing JSX, but it is not free.

## 6. Order of work

1. `site.ts`, `home.ts`, `method.ts`, `services.ts`, `about.ts`, `tools.ts`. The
   spine of the site. Verifiable immediately in the browser.
2. `work.ts` plus copying 26 screenshots into `public/`. The longest step.
3. `proof.ts`, `faqs.ts`, `legal.ts`, `contact.ts` with Calendly, CSP opened for it.
4. `showcase.ts`, capturing MDS tab images locally.
5. `automation.ts`, the n8n flow diagram, written fresh.
6. Delete every placeholder asset left in `public/`, run the template's own checks
   (`check:home`, `check:work-sheet`, `check:services`, the responsive audit).
7. Port the chatbot, open the CSP for n8n, rewrite `generate-kb.mjs`, run `kb:push`.
8. Lighthouse and a real look on a machine with motion on. Domain switch only after
   v2 beats v1.

Steps 1 to 5 are content and can be checked in the browser as they land. Steps 7
and 8 are the only ones that touch the live n8n instance.

## 7. Risks

- **The site is public right now** at qgautomate.vercel.app with PLACEHOLDER copy
  and a stock avatar. Do not share the link until step 2 is done.
- **29 tool logos do not exist yet.** v1 only ships 5. Either source the rest or
  cut the stack section down to the tools that have marks.
- **No product film.** The Showcase runs poster-only until a screen recording of
  the MDS dashboard exists.
- **Reduced motion.** He has it enabled in Windows. Every judgement of how v2 looks
  has to be made with motion forced on, or the scroll scenes read as broken.
- **The licence bars client reuse.** PolyForm Noncommercial plus the Additional
  Permission allows his own portfolio and his own freelance business, and forbids
  selling or building sites for others from it. Nothing derived from this template
  goes near a client build.
