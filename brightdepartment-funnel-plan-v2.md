# Bright Department Website: Updated Funnel Plan (v2)

Prepared 6 November 2026. This version cross-references the first report (`brightdepartment-funnel-report.md`) with the owner's two documents:

- **Master Playbook** (v1.0, 2 Nov 2026, internal and confidential). It has the full detail: owner, 288 Exteriors proof, finances, and the open [TBD] list.
- **Playbook v1.2** (for team members). It's the same playbook with the owner's name, 288 Exteriors, dialer numbers, finances, and the open-items list removed, plus a new Team Guide and Quick Reference.

Where the first report and the playbooks disagree, **the playbooks win**. The items that changed are listed in Section 2.

---

## 1. The big reframe

The first report treated the website as a standalone lead source that needed SEO traffic. The playbooks show it plays a different role. **The site is mainly the landing point for the outbound funnel:**

> AI dialer (Joan) → captures the decision-maker's name and email → custom 60–90 second demo video by email → **follow-up emails asking them to book a free short call** → discovery → proposal → 7-Day Launch

The playbook names its own weakest stage: **"turning captures into booked calls"** (Section 7.1). It recorded 1,676 dials, 245 conversations, and 16 emails captured from 16–28 Oct. Three people said yes to a demo on 22 Oct, and none of them booked.

So the site's first job is to **turn a warm prospect, who just got a demo video, into a booked call**. SEO and cold traffic come second. That puts booking, trust, and the guarantee at the top of the list, and industry or location pages lower.

This also follows the owner's own rule: *"work on the single stage of our own funnel that is weakest, and don't add channels… until that stage is moving."*

---

## 2. What changed from the first report

| First report said | Playbook says | Updated plan |
|---|---|---|
| Show a price or price range on the site | Prices are quoted **only by the owner or the AI Automation Lead, on a discovery or demo call, after the bottleneck is found**. Tiers are still PROPOSED. | **Don't publish prices yet.** Use the playbook's value anchor instead ("one recovered job a month covers it"). Showing prices stays an **owner decision**, since 3 of 5 competitors do. |
| Invent a guarantee ("live in 7 days or first month free") | There's already a guarantee, to be used **word for word**: *"If we don't pay for ourselves in 90 days, you get a full refund."* The website may use it **once the owner approves public use** (open items #4 and #16). | Drop my invented guarantee. **Put the official guarantee on the site** once the written terms are lawyer-reviewed. No competitor has one. |
| Get 3 local case studies in 30 days | **Honesty rule:** no clients, testimonials, or results exist yet, and none may be implied. 288 Exteriors is "client 0" and may be used as a **story or walkthrough, never as numbers**, until results are measured. | Proof comes from **"we run it in our own businesses"**, plus a SAMPLE-labeled dashboard, plus the live AI line. Real case studies come from the **founding-client offer** (open item #3), on the playbook's timeline (days 61–90). |
| Add a founder photo and bio | Brand rule: speak as **"our team."** Never share personal information about the owner. v1.2 removes the owner's name entirely. (The Master does allow the owner to say "I run it in my own roofing company" one-to-one.) | Use an **"our team, based in Short Pump"** section with no personal details. Whether to show a face or name is an **owner decision**. |
| A "Missed-Call Audit" lead magnet, or a new PDF | Two lead magnets are already drafted: the **AI Growth Scorecard** (landing copy built) and **25 AI Prompts**. The playbook recommends the Scorecard. | **Launch the Scorecard on the site** and drop my invented ones. |
| My own 5-touch nurture sequence | The playbook already has an approved-format sequence (Day 0 / 3 / 7 / 12). It goes out on **business days only** and needs **owner approval before any send**. | Reuse the playbook sequence for website non-bookers too. |
| Text every form submission within 60 seconds | Texting is allowed **only with consent or a real relationship**. **A2P 10DLC registration** is required before volume. **Nothing is sent without owner approval** (pre-approved template confirmations are allowed). **No business emails on weekends.** | Keep the idea, but only with: an **SMS consent checkbox**, A2P 10DLC done, and one **owner-approved template**. Owner decides whether automatic confirmations are exempt from the weekend rule. |
| Industry pages: HVAC and auto first | First targets are **roofing, HVAC, plumbing, and general contractors**. 288 Exteriors backs up roofing and exteriors. Real estate and property management are in the playbook but **missing from the site**. | Build industry pages for **roofing/exteriors** and **HVAC/plumbing** first. |
| The site's "marketing + social" employee is an inconsistency | The playbook's 3 AI employees are **receptionist, follow-up & booking, and marketing & social**. Reviews is a supporting service. | Change the third card to **Marketing & Social** and move Reviews into Follow-up, so the site matches the offer. |
| The first report missed dashboards entirely | **Company-wide dashboards are "our core service"** and the main differentiator. Open item #16 says to add them to the website. | **New top priority:** add a dashboard section with a SAMPLE-labeled console screenshot. |

**Unchanged from the first report:** check the Netlify form field mismatch, add analytics, replace the "coming soon" video placeholders (also open item #16), add a favicon, add privacy and terms, add `LocalBusiness` schema, set up the Google Business Profile, move to Git deploys, and make the live AI line more prominent.

---

## 3. Mismatches between the site and the playbook (fix these)

| # | Website today | Playbook | Fix |
|---|---|---|---|
| 1 | "Free 15-minute demo" | Demo emails offer a "free 10-minute call," then a 30–45 minute discovery (open item #15) | Owner picks one length. **10 minutes** matches the email sequence. |
| 2 | No mention of dashboards | Dashboards are the **core** service | Add a section (Section 4, item A3). |
| 3 | Third AI employee card is "Reviews & Reputation" | Third employee is "Marketing & Social" | Realign the cards. |
| 4 | No guarantee | Official guarantee, word for word | Add once approved (item A4). |
| 5 | "Only 5 new local businesses a month" banner | Not in the playbook. The honesty rule forbids unsupported claims. | Keep it **only if the owner confirms it's a real capacity limit**. It fits the model (1–3 new clients a month). Otherwise remove it or swap in a founding-client message. |
| 6 | Hero says "call our AI receptionist live" | The inbound script on (804) 635-3682 is now a **message-taker only**. It never books or demos. | The visitor's call should match the promise. Either (a) reword to "Call and hear our AI answer," or (b) add a separate **demo agent** that acts like a client's receptionist (Playbook 10.2 mentions a "demo agent loaded with their business name"). Owner decision. |
| 7 | No email or Instagram on the site | team@brightdepartment.com and @brightdepartmentai are official | Add both to the footer. |
| 8 | Demo form: name, email, phone, business | Netlify still has an older form registered with **industry** and **preferred_time** | Add an **industry** dropdown back (matching the playbook's industries) to route leads and pick the right demo. Then confirm Netlify stores every field. |
| 9 | Industries: construction, HVAC/plumbing, auto, retail | The playbook adds real estate and property management | Add a fifth card if the owner wants that vertical on the site. |
| 10 | — | An old line, **(804) 567-7045**, answered as Bright Department in October (open item #21) | Make sure it isn't listed anywhere public (site, GBP, directories). |

---

## 4. Updated plan

### Phase A: Fix the "capture to booked call" gap (week 1–2, highest priority)

This is the owner's own named bottleneck, so the site work starts here.

1. **Self-serve booking.** Embed a calendar (GHL calendar, since GoHighLevel is the CRM) on `/demo`, and put the **same booking link** in the demo emails, which already have a `[booking link]` placeholder in the Day 7 email. Prospects who got a demo video can book in one click instead of "reply or call." This is also the cheap way to run **open item #18** (testing direct booking).
2. **A demo-video landing path.** Demo emails link to `/demo?biz=[Business]&trade=[trade]` with UTM tags. The page greets them ("Your custom demo for [Business]"), shows the booking calendar above the fold, and repeats the live-call option. This lets you measure **demo-to-call rate** (a playbook KPI) from the website.
3. **Add the dashboard section** to the homepage and services page. Use a SAMPLE-labeled main console screenshot with the caption "The console we run across our own businesses." This is the core differentiator and no competitor shows one.
4. **Put the guarantee on the site** once the lawyer-reviewed terms exist (open item #4). Use the exact wording, then a one-line explanation: "Measured from go-live. Value = hours saved × agreed hourly rate + traceable new revenue. Refund covers our fees." **Until then, leave it off.**
5. **Replace the "Demo video coming soon" placeholders.** The playbook's custom demo video template (60–90 seconds, four scenes) can produce a generic version with "[your business]" in about 5 minutes.
6. **Install analytics** (GA4 or Plausible, plus Clarity). Use event names that map to playbook KPIs: `demo_page_view` (with `utm_source=demo_email`), `booking_confirmed`, `call_click`, `calc_used`, `scorecard_start`, `scorecard_submit`.
7. **Quick fixes:** check that Netlify saves every form field, favicon, footer email and Instagram, privacy and terms pages, SMS and recording consent wording, and align the call length (10 vs. 15 minutes).

### Phase B: Trust without invented proof (week 2–3)

8. **"We run it ourselves" proof block.** For example: "Every system we sell runs first in our own businesses: a roofing, siding and gutters company and a rental property portfolio." Whether to **name 288 Exteriors** publicly is an **owner decision**. The Master uses it as proof, v1.2 removes it, and the honesty rule allows it as a story but not as numbers.
9. **"Our team, in Short Pump" section.** Cover how we work (weekly syncs, built inside your tools, no contract), what "done-for-you" means, and the 7-Day Launch timeline (Day 0 → Day 7, taken from Playbook Section 13). No personal details.
10. **"How it works" in 4 steps**, from the playbook: free 10-minute call → find your bottleneck and agree on one win number → live in 7 days → weekly sync, with the number on your dashboard. This covers the "what happens next" gap from the first report without quoting prices.
11. **Answer price questions without a price.** Add a FAQ entry: "How much does it cost? It depends on the setup. For most trades, one recovered job a month covers it. We'll show you the math on your own numbers in a free 10-minute call." This mirrors the playbook's approved phrasing.
12. **Founding-client spots** (if the owner approves open item #3). Replace the "Only 5 a month" banner with something like "Founding client spots open for Richmond-area businesses." That's honest scarcity that also produces the first testimonials.

### Phase C: Catch people who aren't ready to book (week 3–4)

13. **Launch the AI Growth Scorecard** on the site. It's already drafted with landing copy. Visitors answer about 12 questions, get their weakest stage and its monthly cost, and are offered a booking. Per the playbook it also works as the dialer offer and a social series.
14. **Connect the calculator to the Scorecard.** After someone sees their "revenue lost" figure, offer: "Find out if missed calls are really your bottleneck: take the 10-minute Scorecard." Collect email, plus phone with SMS consent.
15. **Nurture sequence for non-bookers.** Reuse the playbook's Day 0 / 3 / 7 / 12 emails, adapted for website leads. Send on business days only, with owner approval of the templates.
16. **Instant confirmation text** to people who opt in (needs A2P 10DLC and an owner-approved template). On the discovery call, mention that they got the text within a minute of submitting. It's the product demonstrating itself.

### Phase D: Get found, practicing what we sell (month 2)

The playbook sells **"AI search optimization"** as an add-on (service and location pages, FAQs, schema, GBP, reviews). The site should be the showcase for it.

17. **Google Business Profile**, verified as a service-area business (address hidden), with the official phone, email, Instagram, and service area.
18. **`LocalBusiness`/`ProfessionalService` schema**, with `sameAs` links to GBP and Instagram. Add `aggregateRating` only once real reviews exist.
19. **Industry pages:** roofing/exteriors and HVAC/plumbing first, then general contractors. Use the playbook's "why they fit" text and the custom-demo scenes, with calculator presets for each trade.
20. **Location pages:** Short Pump, Glen Allen, Henrico, Midlothian, Chesterfield. Write real local content, not swapped-city templates (two competitors show what goes wrong with those).
21. **Instagram integration:** link in the footer and an embedded feed or posts. Every post's CTA (book a demo or call the line) should point to the tracked `/demo` page.

### Phase E: Real proof (days 61–90, following the playbook timeline)

22. **First case study and video testimonial**, with permission and measured numbers only (Playbook roadmap, days 61–90).
23. **288 Exteriors case study** once real measured numbers exist (open item #20).
24. **Review strip** near the CTAs once there are 5 or more genuine Google reviews.

### Ongoing: Measure and connect to the playbook KPIs

25. **Move from drag-and-drop to Git deploys** on Netlify so changes have history and preview URLs. The team already uses Claude Code.
26. **Add website numbers to the Friday pipeline review:** site sessions from demo emails, demo-to-call rate, bookings, Scorecard completions, and calculator → Scorecard → booking.

---

## 5. Decisions only the owner can make

These block parts of the plan. Several are already on the playbook's [TBD] list.

| # | Decision | Blocks | Playbook ref |
|---|---|---|---|
| 1 | Approve the guarantee for public use, with lawyer-reviewed terms | A4 | Open items #4, #16 |
| 2 | Show prices or a "from" price on the site, or keep them off | Section 2 | Section 4 rules |
| 3 | Name 288 Exteriors publicly, or keep it as "our own roofing company" | B8 | Master vs. v1.2 |
| 4 | Show a face or name on the site, or keep it "our team" only | B9 | Brand rules |
| 5 | Is "Only 5 new businesses a month" a real limit? Replace it with founding-client spots? | B12 | Open item #3 |
| 6 | Demo call length: 10 or 15 minutes | A7 | Open item #15 |
| 7 | Demo line: message-taker, or a showcase demo agent for website visitors | Mismatch #6 | Section 8.5 / 10.2 |
| 8 | Launch the Scorecard first | C13 | Open item #17 |
| 9 | Approve the SMS and email templates, and decide whether automatic confirmations are exempt from the weekend rule | C15–16 | Rules 16, 17, 23 |
| 10 | Add real estate and property management to the site | Mismatch #9 | Section 6 |

---

## 6. Differences between the two playbooks to resolve

The two documents are both labeled "Version 1.0 · November 2, 2026" but differ in these places:

- **Proof:** the Master uses 288 Exteriors and the rentals as proof and keeps a "Proof from businesses we own" row in the competitor table. **v1.2 removes all mentions of 288.** If v1.2 is the newer document, the owner may not want 288 named, which affects B8.
- **Pricing status:** the Master marks all tiers PROPOSED. v1.2's Section 4 drops the PROPOSED label and states "Setup fee collected at signing" as decided, but v1.2's Quick Reference still says "Tiers (PROPOSED)." These need to agree.
- **Removed from v1.2:** usage billing, the founding-client offer, the cash reserve, the refund timeline, the dialer numbers, the finances, and the [TBD] list. That's fine for a team document, but the owner should confirm whether those items are dropped or just hidden from the team.
- **Version labels:** the file name says v1.2, but the cover says 1.0. Update the cover so the team knows which one is current.

---

## 7. Updated 30-day order

| Week | Do |
|---|---|
| 1 | Form field check, analytics plus UTM-tagged demo-email links, booking calendar on `/demo` and in the demo emails, quick fixes, call length aligned, AI employee cards realigned |
| 2 | Dashboard section (SAMPLE), demo video replacing the placeholders, "how it works," "our team," the "we run it ourselves" block, price FAQ |
| 3 | AI Growth Scorecard live, calculator → Scorecard handoff, consent wording, nurture templates sent to the owner for approval |
| 4 | Guarantee on the site (if terms are approved), GBP live, schema, first industry page (roofing/exteriors) |

**What success looks like after 30 days:** we can measure **demo email → site visit → booked call**, the "capture to booked call" rate is moving, and the site makes no claim the playbook would forbid.
