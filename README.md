# brightdepartment.com redesign

A static site: HTML, CSS and JavaScript, deployed to Netlify. The deploy folder is `site/`.

## Run it locally

```bash
node tools/dev-server.mjs
```

Then open http://localhost:8788. The dev server answers form POSTs with 200, so the forms and thank-you redirects can be tested locally.

## Edit pages

The pages are generated from `tools/build-pages.mjs`, which holds the shared header, footer, calculator and forms. After changing it, rebuild with:

```bash
node tools/build-pages.mjs
```

You can also edit the HTML in `site/` directly, but the next rebuild will overwrite those edits.

- Styles: `site/assets/css/site.css`
- Behavior (forms, calculator, scorecard, motion, analytics): `site/assets/js/site.js`
- Settings (calendar, analytics IDs): `site/assets/js/config.js`

## Deploy

The site is set up to deploy from Git, so changes get version history and deploy previews.

1. Push this repo to GitHub.
2. In Netlify, open the `brightdept-preview` project, go to Project configuration, then Build & deploy, and link the repository. `netlify.toml` already sets the publish folder to `site`.
3. Forms are detected automatically: `contact`, `book-request`, `scorecard`, `ai-prompts` and `calculator`. Add a webhook or notification for each one to GoHighLevel or email.

Drag-and-drop also still works: drop the `site/` folder onto the project in Netlify. You get no history that way.

## Before launch

Placeholders are marked with yellow `[ ... ]` tags on the page. Search the code for `class="ph"`.

**Numbers and content**
- [ ] 288 Exteriors case study: before and after numbers, measured date range, the AI teammate's name, the owner's quote, and a real console screenshot.
- [ ] Bright Department case study: before and after numbers, date range, a quote, and a console screenshot.
- [ ] Home page proof strip and case teaser stats (`[NUMBER]`, `[#]`).
- [ ] Privacy policy and terms: these are drafts and need review, plus an "updated" date.

**Settings**
- [x] GoHighLevel calendar connected (`consultations-x8yc0`). Still to do in GHL: set the booking redirect to `/thanks/booked/`.
- [ ] Analytics: GA4 ID, Plausible domain, and/or Microsoft Clarity ID in `config.js`.
- [ ] 25 AI Prompts: make sure the guide is emailed automatically when the `ai-prompts` form is submitted.
- [ ] Scorecard: make sure the full report email goes out when the `scorecard` form is submitted.

**Decisions**
- [ ] Intro call length: the GoHighLevel event is 30 minutes, the hero video says 15, and the demo emails say 10. The site currently gives no minute count. Once the owner decides, add the length to the copy in `tools/build-pages.mjs`.
- [ ] The guarantee is not on the site. Add it word for word only after it's approved and lawyer-reviewed.
- [ ] SMS: register A2P 10DLC before sending any texts to people who opted in.

## Tracked events

These fire through GA4, Plausible or Clarity once their IDs are set in `config.js`:

`call_click`, `book_cta_click`, `book_view`, `form_start`, `contact_submit`, `book-request_submit`, `calc_used`, `calc_result_emailed`, `scorecard_start`, `scorecard_complete`, `scorecard_submit`, `prompts_download`, `video_sound_on`.

UTM tags are saved on every form submission (`utm_source`, `utm_medium`, `utm_campaign`, `landing_page`, `referrer`, `page`).

For the demo emails, link to `/book/?biz=Business%20Name&trade=roofing&utm_source=demo_email`. The booking page then greets the prospect by business name.
