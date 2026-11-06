# Bright Department Website: Sales Funnel Plan (v3)

Prepared 6 November 2026. This version **replaces v2**. It builds on the first report (`brightdepartment-funnel-report.md`), the Master Playbook (v1.0), Playbook v1.2, and the owner's decisions below.

---

## 1. Decisions locked by the owner

| Topic | Decision | What it changes from v2 |
|---|---|---|
| Role of the website | **A full sales funnel in its own right**, not only a landing page for the dialer | The site has to turn cold visitors (Google, Instagram, referrals, GBP) into booked calls, as well as warm demo-email visitors. |
| Contact | **Both a contact form and a book-a-call calendar** | Two separate entry points with different jobs (Section 4). |
| 288 Exteriors | **Keep it, and name it publicly** | It becomes a headline proof asset. Playbook v1.2 should add 288 back so team materials match. |
| Case studies | **Case studies exist for Bright Department and 288 Exteriors** | These go on the site now, not at day 61–90. The honesty rule is satisfied because the results are real. Publish only measured numbers the owner has approved. |
| Lead magnets | **Both stay:** the AI Growth Scorecard and 25 AI Prompts | Two lead magnets for two buyer stages (Section 6). |
| Prices | **No prices on the site** | Price questions get the playbook's value answer and a booking CTA. |
| ROI calculator | **Keep it** | It stays ungated and gets better (Section 7). |

**Playbook housekeeping these decisions create:**
- The Master Playbook's honesty line ("no… published client results yet") and open item #20 (288 case study) are now out of date. Update both.
- Playbook v1.2 should add 288 Exteriors back to positioning and proof, so the team and the website say the same thing.

---

## 2. The funnel at a glance

```
TRAFFIC                    ENTRY PAGES                 CAPTURE (pick one)               FOLLOW-UP                 CLOSE
─────────────────────────  ──────────────────────────  ───────────────────────────────  ────────────────────────  ─────────────────────
Cold: Google / GBP / AI    Home                        HIGH intent                      Booked: confirmation +    10-min intro call
search, Instagram,         Industry pages              • Book a call (calendar)         reminders + no-show       → 30–45 min discovery
referrals, partners        Location pages              • Call the AI line               recovery                  → proposal in 24h
                           Case studies                MEDIUM intent                    Form: reply same          → 7-Day Launch
Warm: dialer demo emails,  Scorecard / Prompts pages   • Contact form                   business day + calendar
Instagram DMs, Brandon's   /book (tracked demo         LOW intent                       link
warm network               email landing)              • ROI calculator (ungated)       Lead magnet: playbook-
                                                       • AI Growth Scorecard (gated)    style email sequence
                                                       • 25 AI Prompts (gated)          → Scorecard → book
```

**Rule for every page:** one main CTA (**Book a call**), one secondary CTA (**Call (804) 635-3682**), and one low-commitment option (**calculator or lead magnet**). On mobile, a sticky bar shows **Book a call** and **Call**.

---

## 3. Site structure

| Page | Job | Main CTA | Notes |
|---|---|---|---|
| **Home** `/` | Explain the offer, prove it, route the visitor | Book a call | Order: hero → proof strip (288 + Bright Department results) → 3 AI employees → **dashboard section** → industries → how it works → case study teasers → calculator → lead magnets → FAQ → final CTA |
| **Services** `/services` | Detail the core services (receptionist, automations, **dashboards**) and supporting ones | Book a call | Add dashboards as the core service. Make the AI employees match the playbook: Receptionist, Follow-up & Booking, Marketing & Social. |
| **Case studies** `/case-studies` | Index of both | Book a call | |
| ↳ `/case-studies/288-exteriors` | Roofing, siding and gutters proof | Book a call | Use the quote follow-up story (open roof quotes, $22K–$27K each) plus the measured results |
| ↳ `/case-studies/bright-department` | "We run our own sales on it": AI dialer, inbound AI receptionist, dashboards | Book a call | Proves AI voice at volume. Use only numbers the owner approves for publication. |
| **How it works** `/how-it-works` | Bottleneck-first method, the 7-Day Launch, weekly syncs, the guarantee (once approved) | Book a call | Reduces "what happens next?" worries |
| **Industries** `/industries/[trade]` | Roofing & exteriors, HVAC & plumbing, general contractors first. Then auto, retail, and real estate/property management. | Book a call | Each has calculator presets for that trade, a matching case study, and that trade's custom-demo scenes |
| **Locations** `/ai-receptionist-[city]-va` | Short Pump, Glen Allen, Henrico, Midlothian, Chesterfield | Book a call | Real local content, not swapped city names |
| **Book a call** `/book` | **Calendar**, with the demo-email landing variant | Booking | Section 4 |
| **Contact** `/contact` | **Form**, plus email, phone, Instagram, map/service area | Submit | Section 4 |
| **Free tools** `/free-tools` | Hub for the calculator, Scorecard, and 25 AI Prompts | Start Scorecard | |
| ↳ `/scorecard` | AI Growth Scorecard | Start → results → book | Section 6 |
| ↳ `/ai-prompts` | 25 AI Prompts guide | Get the guide | Section 6 |
| **Thank-you pages** `/thanks/[type]` | Confirm the next step and offer the next action | Varies | Separate URLs so each conversion can be tracked |
| **Privacy** and **Terms** | Required for forms, SMS, and recording consent | — | |

The current `/demo` URL should redirect to `/book` with a Netlify `_redirects` rule, so older links keep working.

---

## 4. Contact form and book-a-call calendar

They do different jobs. Use both, and link each to the other.

### Book a call (`/book`): for people ready to talk
- **Tool:** GoHighLevel calendar embed, since GHL is the CRM in the playbook. Bookings go straight into the pipeline at the "Call booked" stage.
- **Meeting:** a free **10-minute intro call** (playbook Section 10.1). Pick one length and use it everywhere. Open item #15: the site currently says 15 minutes.
- **Questions on booking:** name, business, phone, email, **industry** (dropdown), "What's the biggest headache right now: phones, follow-up, or paperwork?" (the playbook's pain question), and an SMS consent checkbox.
- **After booking:** an instant confirmation email or text with an owner-approved template, a reminder 24 hours before and 1 hour before, and a reschedule link. If they don't show, send a reschedule message the same day.
- **Demo-email variant:** `/book?biz=[Business]&trade=[trade]&utm_source=demo_email`. It shows a "Your custom demo for [Business]" headline with the calendar above the fold. It fills the `[booking link]` placeholder in the playbook's demo emails and runs open item #18 (booking directly).
- **Side panel:** a short case study quote from 288 Exteriors, the "Call our AI now" option, and the guarantee once it's approved.

### Contact form (`/contact` and footer): for questions, partners, and people not ready to book
- **Fields:** name, business, phone, email, industry, "How can we help?" (dropdown: Book a demo, A question, Partner/referral, Other), message, and SMS consent. Keep the honeypot.
- **Routing:** Netlify Forms with a webhook to GHL (or a native GHL form), tagged `source=website_contact`.
- **Promise and follow-up:** "We reply the same business day" (matches the playbook's response-time standard). The thank-you page shows the calendar: "Want to skip the back-and-forth? Pick a time now."
- **Fix first:** the current Netlify `demo` form is registered with old fields (`first_name`, `industry`, `preferred_time`…), while the live form sends `name`. Redeploy the forms and submit a test of each before launch.

---

## 5. Proof: case studies and 288 Exteriors

**Case study template (both studies, same structure):**
1. **The business:** who they are, trade, size, and where they're based.
2. **The bottleneck:** described with Reach, Acquire, Convert, and Expand, in the owner's own words.
3. **What we built:** the AI teammate (by name), the automations, and the dashboard.
4. **The numbers:** baseline → after, measured and dated. Examples: calls answered, response time, quotes followed up, hours saved, revenue traced to the system.
5. **Dashboard screenshot:** real data, blurred where private.
6. **A quote and a photo or short video**, from Brandon for 288 and the team for Bright Department.
7. **CTA:** "Want this running at your business? Book a call."

**Where proof appears:**
- **Home:** a proof strip right under the hero, with "Runs in our own businesses: 288 Exteriors (roofing, siding & gutters) and our rental portfolio" plus 2–3 headline numbers from the case studies.
- **Industry pages:** the roofing/exteriors page leads with 288. The other trades use the Bright Department study ("we run our own sales on it") until they have a client of their own.
- **/book and /contact:** one short quote with a number beside the form or calendar.
- **Demo emails and Instagram:** link to the case studies.

**Rules (from the playbook):** use measured numbers only, never round them up, and get owner approval before publishing. Label anything illustrative as SAMPLE.

---

## 6. Lead magnets (both stay)

| | **AI Growth Scorecard** | **25 AI Prompts That Get Local Businesses More Customers** |
|---|---|---|
| Buyer stage | Has a problem and wants a diagnosis | Curious, early, wants to learn |
| Job | **Leads straight into a discovery call** | **Builds the email list**, with Instagram as the main way in |
| Format | About 12 number questions → finds the weakest stage (Reach, Acquire, Convert, Expand) → monthly cost → the AI fixes for that stage | PDF sent by email |
| Gate | Show the weakest stage on screen right away. **Email** (plus optional phone with SMS consent) unlocks the full report. | Email only |
| Next step | Results page: "Your bottleneck is [stage], costing about $[X]/month. Book a 10-minute call to fix it." Calendar embedded on the results page. | Thank-you page: "Want to know which prompt matters most for you? Take the Scorecard." |
| Follow-up | Day 0: report. Day 2: case study for their stage. Day 5: "what fixing [stage] looks like." Day 9: booking check-in. | Day 0: guide. Day 3: a tip. Day 7: case study. Day 10: invitation to the Scorecard. |
| Status | Draft PDF and landing copy built, not published | PDF built, not launched |

Follow-up emails go out on **business days only**, using **owner-approved templates**. Texts go only to people who **opted in**, after **A2P 10DLC** registration (playbook rules 16, 17, 23).

---

## 7. ROI calculator (keep it and improve it)

- **Keep it ungated.** Visitors see their monthly and yearly loss right away. It's the site's best interactive hook.
- **Trade presets:** a dropdown (roofing, HVAC, plumbing, auto, retail, other) fills in a typical job value and close rate. Visitors can still edit both. Label the defaults as estimates.
- **Same formula as the playbook:** missed calls per week × 4.33 × close rate × average job value. It matches what's said on discovery calls.
- **Next steps under the result:**
  1. **Book a call:** "Let's check this number on your real calls. 10 minutes, free."
  2. **Email me this result:** asks for email and optional phone, adds them to the CRM with `source=calculator`, and starts a short sequence.
  3. **Find my real bottleneck:** links to the Scorecard, because missed calls might not be the biggest leak.
- **Placement:** the homepage, every industry page (with that trade preset), and `/free-tools`.
- **Tracking:** `calc_used`, `calc_result_emailed`, `calc_to_book`, `calc_to_scorecard`.

---

## 8. No prices on the site: how to handle "how much?"

- **FAQ (playbook-approved phrasing):** "It depends on the setup. For most trades, one recovered job a month covers it. On a free 10-minute call we'll show you the math using your own numbers." Then the **Book a call** button.
- **Supporting copy:** "No contract. Cancel anytime. Live in 7 days." Once approved, add the guarantee in exact wording: *"If we don't pay for ourselves in 90 days, you get a full refund."*
- The calculator does the pricing work without a price: if their loss is $8K a month, they can see the value for themselves.

---

## 9. Trust and offer elements

| Element | Status |
|---|---|
| Dashboard section, using 288's real console (blurred) or one labeled SAMPLE | **Add.** It's the core service and no competitor shows one. |
| Guarantee, exact wording | Add **once the owner approves public use and the lawyer-reviewed terms exist** (open item #4) |
| "How it works": 10-min call → bottleneck and win number → live in 7 days → weekly sync | Add |
| "Our team, based in Short Pump" with 288 named | Add. Whether to show Brandon's face or name is still an owner decision. |
| Live AI line: "Call (804) 635-3682 and hear our AI answer" | Keep, but make the wording match what the line does. It's currently set up as a message-taker. |
| "Only 5 new local businesses a month" banner | Keep only if it's a real capacity limit |
| Footer: team@brightdepartment.com, @brightdepartmentai, service area, privacy, terms | Add |
| Google review stars | Add once there are real reviews from the Google Business Profile |

---

## 10. Follow-up behind the site

| Entry | Immediately | Then |
|---|---|---|
| Booked a call | Confirmation by email and text (if opted in) | Reminders at 24h and 1h, same-day no-show recovery, discovery → proposal within 24h (playbook Section 12) |
| Contact form | Thank-you page with calendar, plus an auto email | Human reply the same business day. If no booking after 2 business days, a follow-up with the booking link. |
| Called the AI line | AI takes the message (playbook Section 8.5) | Team calls back the same business day and offers the calendar link |
| Scorecard | Report by email | 4-touch sequence → book |
| 25 AI Prompts | Guide by email | 4-touch sequence → Scorecard → book |
| Calculator (emailed result) | Result by email | 3-touch sequence → book |

Every send follows the playbook: owner-approved templates, business days only, opt-out in every email, SMS only with consent, and STOP honored.

**Our own product as proof:** the confirmation text that arrives within a minute is a live demo of the speed-to-lead we sell. On discovery calls, point it out.

---

## 11. Getting found (feeds the funnel)

1. **Google Business Profile:** service-area business, official phone, email, and Instagram, with case study posts.
2. **Schema:** `LocalBusiness`/`ProfessionalService` (`sameAs` linking GBP and Instagram), `FAQPage`, `Article` on the case studies, and `aggregateRating` only once reviews exist.
3. **Industry and location pages** (Section 3), with roofing/exteriors and HVAC/plumbing first.
4. **AI search:** robots.txt already allows AI crawlers. Clear FAQs and case studies make Bright Department quotable in ChatGPT and Perplexity, which also showcases the "AI search optimization" add-on.
5. **Instagram:** every post links to a tracked page (`/book`, `/scorecard`, or `/ai-prompts`) instead of the homepage.

---

## 12. Measurement

- **Analytics:** GA4 or Plausible, plus Microsoft Clarity for heatmaps.
- **Events:** `book_view`, `booking_confirmed`, `contact_submit`, `call_click`, `calc_used`, `calc_result_emailed`, `scorecard_start`, `scorecard_submit`, `prompts_download`, `case_study_view`.
- **UTM rules:** `demo_email`, `instagram`, `gbp`, `cold_email`, `referral`, and a `source` field saved on every CRM contact.
- **Weekly funnel (add to the Friday pipeline review):** sessions by source → lead magnet and calculator captures → contact forms → booked calls → calls held → proposals → won. The two numbers to watch: **visit-to-booking rate** and **lead magnet-to-booking rate**.

---

## 13. Technical

- Move Netlify from drag-and-drop to **Git deploys**, for history and preview URLs to test changes.
- **Forms:** fix the field mismatch, connect a webhook to GHL, and add a separate thank-you URL per form.
- **Redirect** `/demo` to `/book`. Optionally block the WordPress probe paths.
- Add a favicon and basic security headers (`netlify.toml`).
- Check that the old line **(804) 567-7045** isn't listed anywhere public.

---

## 14. Rollout (30 days)

| Week | Build |
|---|---|
| **1: the conversion core** | `/book` with the GHL calendar and demo-email variant, `/contact` form, form fix and GHL webhook, thank-you pages, sticky mobile bar, analytics, events and UTMs, `/demo` redirect, privacy and terms with consent wording, footer contacts |
| **2: proof** | Both case study pages, homepage proof strip with 288 named, dashboard section, "how it works," AI employee cards matched to the playbook, align the call length, replace the "coming soon" videos |
| **3: lead magnets and calculator** | `/scorecard` live with results and booking, `/ai-prompts` live, calculator presets and the three next steps, `/free-tools` hub, follow-up templates sent to the owner for approval |
| **4: traffic** | GBP live, schema, roofing/exteriors and HVAC/plumbing industry pages, first location page (Short Pump), Instagram links switched to tracked pages, guarantee added if the terms are approved |

**What success looks like after 30 days:** every visitor has a clear next step at their level of interest (book, contact, call, calculator, Scorecard, or Prompts), every conversion is tracked to its source, and the Friday review shows the website as its own stage of the pipeline.

---

## 15. Still open (owner)

| # | Decision | Affects |
|---|---|---|
| 1 | Guarantee on the site, with lawyer-reviewed terms | §8, §9, week 4 |
| 2 | Which case study numbers are approved for public use | §5, week 2 |
| 3 | Intro call length: 10 or 15 minutes | §4 |
| 4 | Show Brandon's face or name on the site, or keep "our team" | §9 |
| 5 | Is "Only 5 a month" a real capacity limit? | §9 |
| 6 | Demo line: keep it as a message-taker, or a showcase agent for website callers | §9, §10 |
| 7 | Approve the follow-up email and SMS templates, and whether automatic confirmations are exempt from the weekend rule | §6, §10 |
| 8 | Who takes booked calls, and what availability windows go on the calendar | §4 |
| 9 | Update both playbooks for 288 and the case studies (§1 housekeeping) | Team consistency |
