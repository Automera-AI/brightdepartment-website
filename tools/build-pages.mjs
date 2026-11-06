// Generates the static HTML pages in /site from shared parts.
// Run:  node tools/build-pages.mjs
// The output is plain HTML. You can edit the generated files directly,
// but changes made here and re-run will overwrite them.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "site");
const SITE = "https://brightdepartment.com";
const PHONE = "(804) 635-3682";
const TEL = "tel:+18046353682";
const EMAIL = "team@brightdepartment.com";
const IG = "https://instagram.com/brightdepartmentai";
// OPEN DECISION: intro call length. The GHL event books 30 minutes; copy omits a minute count until the owner decides.
const YEAR = 2026;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const icon = (id, cls = "") => `<svg class="icon ${cls}" aria-hidden="true"><use href="/assets/icons.svg#i-${id}"/></svg>`;
const ph = (label = "NUMBER") => `<mark class="ph">[${label}]</mark>`;

/* ---------------- Shared shell ---------------- */
function head({ title, desc, url, jsonld = [], noindex = false }) {
  const canonical = SITE + url;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
${noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow">'}
<meta name="theme-color" content="#fbfbf9">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Bright Department">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE}/assets/video/hero-poster-v6.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/BigShouldersDisplay-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/Barlow-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css">
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join("\n")}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>`;
}

const NAV = [
  ["/services/", "Services"],
  ["/how-it-works/", "How it works"],
  ["/industries/", "Industries"],
  ["/case-studies/", "Case studies"],
  ["/free-tools/", "Free tools"],
];

function header(active) {
  const links = NAV.map(([href, label]) => `<a href="${href}"${active === href ? ' aria-current="page"' : ""}>${label}</a>`).join("");
  return `
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="/" aria-label="Bright Department home"><img src="/assets/brightdept-ink.svg" alt="Bright Department" width="214" height="27"></a>
    <nav class="nav" aria-label="Main">${links}</nav>
    <div class="header-cta">
      <a class="header-phone tnum" href="${TEL}" data-loc="header"><span class="live-dot" aria-hidden="true"></span>${PHONE}</a>
      <a class="btn btn-sm" href="/book/" data-loc="header">Book a call</a>
    </div>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Menu">${icon("menu")}</button>
  </div>
  <div class="mobile-menu" id="mobile-menu">
    <nav aria-label="Mobile">
      ${NAV.map(([href, label]) => `<a href="${href}">${label}</a>`).join("\n      ")}
      <a href="/contact/">Contact</a>
      <a class="btn btn-block" href="/book/" data-loc="mobile-menu">Book a free call</a>
    </nav>
  </div>
</header>`;
}

function footer() {
  return `
<footer class="site-footer">
  <div class="wrap footer-top">
    <div>
      <img src="/assets/brightdept-white.svg" alt="Bright Department" width="240" height="30" loading="lazy">
      <p class="small" style="margin-top:18px;max-width:34ch;color:#c7cad1">Your AI department, for small business. Based in Short Pump, serving Richmond and Central Virginia.</p>
      <a class="footer-phone tnum" href="${TEL}" data-loc="footer">${PHONE}</a>
      <p class="small" style="color:#9aa0aa;margin-top:6px">Our AI answers, day or night.</p>
    </div>
    <div>
      <h2>Company</h2>
      <ul>
        <li><a href="/services/">Services</a></li>
        <li><a href="/how-it-works/">How it works</a></li>
        <li><a href="/industries/">Industries</a></li>
        <li><a href="/case-studies/">Case studies</a></li>
        <li><a href="/contact/">Contact</a></li>
      </ul>
    </div>
    <div>
      <h2>Free tools</h2>
      <ul>
        <li><a href="/missed-call-calculator/">Missed-call calculator</a></li>
        <li><a href="/scorecard/">AI Growth Scorecard</a></li>
        <li><a href="/ai-prompts/">25 AI Prompts guide</a></li>
        <li><a href="/book/">Book a free call</a></li>
      </ul>
    </div>
    <div>
      <h2>Reach us</h2>
      <ul>
        <li><a href="mailto:${EMAIL}">${EMAIL}</a></li>
        <li><a href="${IG}" rel="noopener">Instagram @brightdepartmentai</a></li>
        <li>Short Pump · Richmond, VA</li>
        <li style="color:#9aa0aa">Richmond, Short Pump, Glen Allen, Henrico, Chesterfield, Midlothian, Mechanicsville and Central Virginia</li>
      </ul>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <span>© ${YEAR} Bright Department</span>
    <span><a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · <a href="/ai-receptionist-short-pump-va/">AI receptionist in Short Pump</a></span>
  </div>
</footer>
<nav class="action-bar" aria-label="Quick actions">
  <a class="ab-book" href="/book/" data-loc="action-bar">${icon("calendar")}Book a call</a>
  <a class="ab-call" href="${TEL}" data-loc="action-bar">${icon("phone")}Call</a>
</nav>`;
}

function scripts({ gsap = false } = {}) {
  return `
<script src="/assets/js/config.js"></script>
${gsap ? `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>` : ""}
<script src="/assets/js/site.js" defer></script>
</body>
</html>
`;
}

function page({ url, title, desc, active, body, jsonld, gsap, noindex }) {
  const html = head({ title, desc, url, jsonld, noindex }) + header(active) + `\n<main id="main">\n${body}\n</main>` + footer() + scripts({ gsap });
  const out = url === "/" ? path.join(ROOT, "index.html") : url.endsWith(".html") ? path.join(ROOT, url) : path.join(ROOT, url, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  PAGES.push({ url, noindex });
}
const PAGES = [];

/* ---------------- Reusable blocks ---------------- */
const attribHidden = `<input type="hidden" name="utm_source"><input type="hidden" name="utm_medium"><input type="hidden" name="utm_campaign"><input type="hidden" name="landing_page"><input type="hidden" name="referrer"><input type="hidden" name="page">`;
const honeypot = `<p class="hp" aria-hidden="true"><label>Leave this empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>`;
const smsConsent = (id) => `<label class="check" for="${id}"><input type="checkbox" id="${id}" name="sms_consent" value="yes"><span>Text me about my request. Message and data rates may apply. Reply STOP to opt out. Optional.</span></label>`;

const INDUSTRY_OPTIONS = ["Roofing & exteriors", "HVAC & plumbing", "General contractor", "Electrical", "Landscaping", "Automotive", "Retail", "Real estate & property management", "Other local service business"];
const industrySelect = (id, required = true) => `<select class="select" id="${id}" name="industry"${required ? " required" : ""}><option value="">Choose one</option>${INDUSTRY_OPTIONS.map((o) => `<option>${esc(o)}</option>`).join("")}</select>`;

const TRADES = [
  ["roofing", "Roofing & exteriors", 8500, 25],
  ["hvac", "HVAC & plumbing", 450, 50],
  ["gc", "General contractor", 12000, 20],
  ["auto", "Automotive", 600, 50],
  ["retail", "Retail", 80, 40],
  ["other", "Other", 500, 30],
];

function calculator({ id = "calc", preset = "roofing", headingTag = "h2", heading = "What are missed calls costing you?", lede = "Three numbers. Your answer updates as you type. Nothing to sign up for." } = {}) {
  const t = TRADES.find((x) => x[0] === preset) || TRADES[0];
  return `
<div class="section-head split">
  <${headingTag} class="h2">${heading}</${headingTag}>
  <p class="lede">${lede}</p>
</div>
<div class="calc" data-calc data-preset="${t[0]}" id="${id}">
  <div class="calc-inputs">
    <div class="field">
      <label for="${id}-trade">Your trade</label>
      <select class="select" id="${id}-trade" name="calc_trade">
        ${TRADES.map(([k, label, v, c]) => `<option value="${k}" data-value="${v}" data-close="${c}">${label}</option>`).join("")}
      </select>
      <span class="hint">Picks a starting estimate. Change any number to your own.</span>
    </div>
    <div class="field">
      <label for="${id}-calls">Missed calls per week: <span class="tnum" data-calls-out>8</span></label>
      <input class="range" type="range" id="${id}-calls" name="calc_calls" min="0" max="60" step="1" value="8">
    </div>
    <div class="form-grid">
      <div class="field">
        <label for="${id}-value">Average job value</label>
        <div class="prefix-input"><span>$</span><input class="input tnum" id="${id}-value" name="calc_value" inputmode="numeric" value="${t[2]}"></div>
      </div>
      <div class="field">
        <label for="${id}-close">Close rate</label>
        <div class="suffix-input"><input class="input tnum" id="${id}-close" name="calc_close" inputmode="numeric" value="${t[3]}"><span>%</span></div>
      </div>
    </div>
  </div>
  <div class="calc-out" aria-live="polite">
    <div class="big" data-out-month>$0</div>
    <span class="calc-cap">a month walking to the next company</span>
    <div class="yr tnum" data-out-year>$0 a year</div>
    <p class="formula">Missed calls a week × 4.33 weeks × close rate × average job value. The same math we use on a discovery call.</p>
    <div class="calc-next">
      <a class="btn btn-block" href="/book/?src=calculator" data-loc="calculator">${icon("calendar")}Check it on my real calls</a>
      <button class="btn btn-line btn-block" type="button" data-calc-email aria-expanded="false" aria-controls="${id}-email">${icon("mail")}Email me this result</button>
      <form class="calc-email" id="${id}-email" name="calculator" method="POST" data-netlify="true" netlify-honeypot="bot-field" data-bd-form data-thanks="/thanks/calculator/" data-event="calc_result_emailed">
        <input type="hidden" name="form-name" value="calculator">
        <input type="hidden" name="calc_summary" data-calc-hidden="summary">
        ${attribHidden}${honeypot}
        <div class="field"><label for="${id}-em">Email</label><input class="input" type="email" id="${id}-em" name="email" autocomplete="email" required></div>
        <div class="field"><label for="${id}-ph">Phone <span style="font-weight:400;color:#b9bdc6">(optional)</span></label><input class="input" type="tel" id="${id}-ph" name="phone" autocomplete="tel"></div>
        <label class="check" for="${id}-sms" style="color:#c7cad1"><input type="checkbox" id="${id}-sms" name="sms_consent" value="yes"><span>Text me too. Reply STOP to opt out. Optional.</span></label>
        <button class="btn btn-block" type="submit">Send it</button>
        <p class="form-status small" role="status"></p>
      </form>
      <a class="link-arrow" href="/scorecard/" style="color:#fff;width:fit-content">Not sure missed calls are the leak? Take the Scorecard ${icon("arrow")}</a>
    </div>
  </div>
</div>`;
}

function faq(items) {
  return `<div class="faq">${items.map(([q, a]) => `
  <details>
    <summary>${esc(q)}<span class="plus" aria-hidden="true"></span></summary>
    <div class="answer"><p>${a}</p></div>
  </details>`).join("")}
</div>`;
}
const faqLd = (items) => ({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.replace(/<[^>]+>/g, "") } })),
});

function finalCta({ heading = "Never miss another job.", lede = `A free call with our team. We'll find where jobs are leaking and tell you straight whether AI can fix it.` } = {}) {
  return `
<section class="final-cta band-cobalt section" aria-labelledby="final-h">
  <div class="wrap final-grid">
    <div>
      <h2 class="h1" id="final-h">${heading}</h2>
      <p class="lede" style="margin-top:24px">${lede}</p>
      <div class="btn-row" style="margin-top:32px">
        <a class="btn" href="/book/" data-loc="final-cta">${icon("calendar")}Book a free call ${icon("arrow", "icon-arrow")}</a>
        <a class="btn btn-line" href="/contact/">Send a message</a>
      </div>
    </div>
    <div class="final-phone">
      <small>Or call now. Our AI answers.</small>
      <a class="tnum" href="${TEL}" data-loc="final-cta">${PHONE}</a>
      <small>No contract. Cancel anytime. Live in 7 days.</small>
    </div>
  </div>
</section>`;
}

const marquee = () => {
  const towns = ["Short Pump", "Glen Allen", "Henrico", "Richmond", "Chesterfield", "Midlothian", "Mechanicsville", "Central Virginia"];
  const row = towns.map((t) => `<span>${t}</span>`).join("");
  return `<div class="marquee" aria-label="Service area: ${towns.join(", ")}"><div class="marquee-track" aria-hidden="true">${row}${row}</div></div>`;
};

function consoleSample({ caption = "Modeled on the console we run for 288 Exteriors." } = {}) {
  return `
<div class="console-wrap">
  <div class="console" data-console data-console-motion>
    <div class="console-bar">
      <span class="title">Main console</span>
      <span class="sample-tag">Sample data</span>
      <div class="tabs" role="tablist" aria-label="Range">
        <button type="button" role="tab" aria-selected="true" data-range="today">Today</button>
        <button type="button" role="tab" aria-selected="false" data-range="week">This week</button>
      </div>
    </div>
    <div class="console-body">
      <div class="gauge"><span class="lbl">Calls in</span><span class="val">37</span><span class="sub">since midnight</span></div>
      <div class="gauge"><span class="lbl">Answered by AI</span><span class="val">35</span><span class="sub">on the first ring</span></div>
      <div class="gauge missed"><span class="lbl">Missed</span><span class="val">2</span><span class="sub">voicemail before go-live</span></div>
      <div class="gauge booked"><span class="lbl">Booked</span><span class="val">9</span><span class="sub">estimates on the calendar</span></div>
      <div class="console-quotes">
        <h3 class="ch">Open quotes going cold</h3>
        <table class="quote-table">
          <thead><tr><th>Job</th><th>Value</th><th>Follow-up</th><th>Age</th></tr></thead>
          <tbody>
            <tr><td>Roof replacement, Glen Allen</td><td>$24,600</td><td>3 emails, no reply</td><td class="cold">9 days</td></tr>
            <tr><td>Siding and gutters, Henrico</td><td>$22,150</td><td>2 emails, no reply</td><td class="cold">6 days</td></tr>
            <tr><td>Full re-roof, Short Pump</td><td>$27,300</td><td>Day 3 follow-up sent</td><td>3 days</td></tr>
            <tr><td>Gutter guards, Midlothian</td><td>$3,480</td><td>Walkthrough booked</td><td>1 day</td></tr>
          </tbody>
        </table>
      </div>
      <div class="console-top2">
        <h3 class="ch">Top two things today</h3>
        <ol>
          <li>Call back the Glen Allen re-roof. $24.6K, cold 9 days.</li>
          <li>Approve 3 review requests from last week's jobs.</li>
        </ol>
      </div>
    </div>
    <div class="console-foot"><span>Sample data. ${caption}</span><span>Refreshes every morning</span></div>
  </div>
</div>`;
}

function contactForm({ name = "contact", thanks = "/thanks/contact/", idp = "c", heading = "Send us a message", topic = true, buttonLabel = "Send message", extra = "" } = {}) {
  return `
<form class="form-card" name="${name}" method="POST" data-netlify="true" netlify-honeypot="bot-field" data-bd-form data-thanks="${thanks}" data-event="${name}_submit">
  <input type="hidden" name="form-name" value="${name}">
  ${attribHidden}${honeypot}
  <h2>${heading}</h2>
  <div class="form-grid">
    <div class="field"><label for="${idp}-name">Your name</label><input class="input" id="${idp}-name" name="name" autocomplete="name" required></div>
    <div class="field"><label for="${idp}-biz">Business name</label><input class="input" id="${idp}-biz" name="business" autocomplete="organization" required></div>
    <div class="field"><label for="${idp}-phone">Phone</label><input class="input" type="tel" id="${idp}-phone" name="phone" autocomplete="tel" required></div>
    <div class="field"><label for="${idp}-email">Email</label><input class="input" type="email" id="${idp}-email" name="email" autocomplete="email" required></div>
    <div class="field full"><label for="${idp}-ind">Industry</label>${industrySelect(idp + "-ind")}</div>
    ${topic ? `<div class="field full"><label for="${idp}-topic">How can we help?</label><select class="select" id="${idp}-topic" name="topic" required><option value="">Choose one</option><option>I'd like a demo</option><option>I have a question</option><option>Partner or referral</option><option>Something else</option></select></div>` : ""}
    ${extra}
    <div class="field full"><label for="${idp}-msg">Message <span class="muted" style="font-weight:400">(optional)</span></label><textarea class="textarea" id="${idp}-msg" name="message" placeholder="Where does your team lose the most time: phones, follow-up, or paperwork?"></textarea></div>
    <div class="full">${smsConsent(idp + "-sms")}</div>
  </div>
  <button class="btn btn-block" type="submit">${buttonLabel} ${icon("arrow", "icon-arrow")}</button>
  <p class="form-status small" role="status"></p>
  <p class="small muted" style="margin:0">We reply the same business day. We never sell your details. See our <a href="/privacy/">privacy policy</a>.</p>
</form>`;
}

const businessLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Bright Department",
  url: SITE + "/",
  telephone: "+1-804-635-3682",
  email: EMAIL,
  image: SITE + "/assets/video/hero-poster-v6.jpg",
  description: "Done-for-you AI receptionists, follow-up automations and company-wide dashboards for local small businesses.",
  address: { "@type": "PostalAddress", addressLocality: "Short Pump", addressRegion: "VA", addressCountry: "US" },
  areaServed: ["Richmond", "Short Pump", "Glen Allen", "Henrico", "Chesterfield", "Midlothian", "Mechanicsville", "Central Virginia"].map((n) => ({ "@type": "Place", name: n + ", VA" })),
  sameAs: [IG],
};

const HOME_FAQ = [
  ["How much does it cost?", `It depends on the setup, so we don't post prices. For most trades, one recovered job a month covers it. On a free call we'll show you the math on your own numbers. <a href="/book/">Book a call</a>.`],
  ["Will it sound robotic?", `Call <a href="${TEL}">${PHONE}</a> and decide for yourself. If a caller sincerely asks, it says it's an AI assistant, and it hands anything sensitive to your team.`],
  ["Am I locked in?", "No. Month to month, no contract, cancel anytime. You stay because it works."],
  ["How fast can we be live?", "Seven days from kickoff. We build inside your tools, test it, train your team, then go live, starting with after-hours if you prefer."],
  ["Do I have to learn new software?", "No. We build inside the tools you already use: your CRM, calendar, phone system, QuickBooks or Square."],
  ["What do you need from me?", "About 30 to 45 minutes up front, read-only access to your tools, and one staff member for a short weekly sync."],
  ["Where are you based?", "Short Pump. We serve Richmond, Glen Allen, Henrico, Chesterfield, Midlothian, Mechanicsville and Central Virginia. The AI works anywhere, so good-fit businesses outside the area are welcome too."],
];

function toolsBlock() {
  return `<div class="tools-lead">
  <a class="tools-feature" href="/scorecard/">
    <h3>AI Growth Scorecard</h3>
    <p>About 12 questions across the four places jobs leak. See your weakest stage, and what it's costing you a month, on screen right away.</p>
    <span class="btn">Find my bottleneck ${icon("arrow", "icon-arrow")}</span>
  </a>
  <div class="tools-rows">
    <a class="tools-row" href="/ai-prompts/"><h3>25 AI Prompts</h3><p>Prompts that get local businesses more customers. Copy, paste, use them today.</p><span class="link-arrow">Get the guide ${icon("arrow")}</span></a>
    <a class="tools-row" href="/missed-call-calculator/"><h3>Missed-call calculator</h3><p>Three numbers, and you'll see what missed calls cost you a month and a year.</p><span class="link-arrow">Run the numbers ${icon("arrow")}</span></a>
  </div>
</div>`;
}

/* ---------------- HOME ---------------- */
page({
  url: "/",
  title: "Bright Department | Your AI department for small business | Short Pump & Richmond, VA",
  desc: "Done-for-you AI that answers your calls and texts 24/7, follows up every lead, books jobs, and shows the whole business on one dashboard. Based in Short Pump, serving Richmond.",
  active: "/",
  gsap: true,
  jsonld: [businessLd, faqLd(HOME_FAQ)],
  body: `
<section class="door" aria-labelledby="hero-h">
  <div class="wrap door-inner">
    <h1 class="display h1 door-title" id="hero-h">Your AI department, <span class="c-cobalt">for small business.</span></h1>
    <div class="door-copy">
      <p class="trade-line">AI that answers, follows up, books, and gets you reviews, inside the tools you already use.</p>
      <div class="door-phone">
        <small>${icon("phone", "icon-sm")}Call it right now. Our AI answers.</small>
        <a class="tnum" href="${TEL}" data-loc="hero">${PHONE}</a>
      </div>
      <div class="btn-row">
        <a class="btn" href="/book/" data-loc="hero">${icon("calendar")}Book a free call ${icon("arrow", "icon-arrow")}</a>
        <a class="btn btn-line" href="/how-it-works/">How it works</a>
      </div>
      <p class="door-note">Free call. No pressure. No contract.</p>
      <p class="door-dot"><span>Short Pump, VA</span><span>Serving Richmond &amp; Central Virginia</span><span>Live in 7 days</span></p>
    </div>
    <div class="cab">
      <div class="cab-frame">
        <div class="cab-window">
          <video id="heroVid" autoplay muted loop playsinline preload="metadata" poster="/assets/video/hero-poster-v6.jpg" width="1280" height="720" aria-label="Felt animation: an owner buried in paperwork, then work flowing smoothly, a happy owner, and a handshake.">
            <source src="/assets/video/hero-promo-v6.mp4" type="video/mp4">
          </video>
        </div>
        <button class="sound-btn" type="button" data-sound-toggle="heroVid" aria-pressed="false">${icon("volume", "icon-sm")}<span>Play with sound</span></button>
      </div>
      <p class="cab-caption">21 seconds on what changes when the phones, follow-up and paperwork run themselves.</p>
    </div>
  </div>
  <div class="fleet-stripe" data-draw aria-hidden="true"></div>
</section>

<section class="proof" aria-label="Proof">
  <div class="wrap proof-inner">
    <div class="proof-intro">
      <strong>Runs in our own businesses first.</strong>
      <span class="muted small">We only sell what we already run.</span>
    </div>
    <a class="proof-item" href="/case-studies/288-exteriors/">
      <span class="name">288 Exteriors</span>
      <span class="what">Roofing, siding and gutters. Client 0: every system goes live here first.</span>
      <span class="stat">${ph()} calls answered by AI</span>
    </a>
    <div class="proof-item">
      <span class="name">Our rentals</span>
      <span class="what">A real estate portfolio run on the same systems we install for you.</span>
    </div>
    <a class="proof-item" href="/case-studies/bright-department/">
      <span class="name">Bright Department</span>
      <span class="what">Our own sales: an AI caller, an AI receptionist and live dashboards.</span>
      <span class="stat">${ph()} dials a week</span>
    </a>
  </div>
</section>

<section class="section manifesto" aria-label="What we do differently">
  <div class="wrap">
    <p data-scrub-words>Most AI vendors sell a login. We sell the result: <span class="c-cobalt">your biggest bottleneck found, fixed and measured</span>, then kept working with your team every week.</p>
    <div class="manifesto-foot">
      <a class="link-arrow" href="/how-it-works/">See how we find the bottleneck ${icon("arrow")}</a>
      <span class="muted">Building is about 15% of the job. The other 85% is why we're on a monthly plan.</span>
    </div>
  </div>
</section>

<section class="section band-steel rule-top" aria-labelledby="dept-h">
  <div class="wrap">
    <div class="section-head split">
      <h2 class="h2" id="dept-h">Three AI employees. One department.</h2>
      <p class="lede">Each one works inside the tools you already use. All of it shows up on one dashboard.</p>
    </div>
    <div class="bento">
      <article class="tile t-recep" data-reveal>
        <h3>AI receptionist</h3>
        <p>Answers your calls and texts 24/7 as your business. Qualifies the caller, marks urgent jobs, books into the windows you approve, and texts your team a summary.</p>
        <div class="transcript" aria-label="Sample call">
          <div class="transcript-head"><span>Incoming call, 9:42 PM</span><span class="state">Answered</span></div>
          <ol>
            <li class="ai"><b>AI</b><span>Thanks for calling. This is the after-hours line, how can we help?</span></li>
            <li><b>Caller</b><span>Water's coming through the kitchen ceiling. Can someone come out?</span></li>
            <li class="ai"><b>AI</b><span>I'm sorry, let's get you taken care of. I've marked this urgent. What's the address?</span></li>
            <li class="ai"><b>AI</b><span>You're booked for tomorrow, 8 to 10 AM. The team has your details now.</span></li>
          </ol>
          <div class="transcript-foot"><span>${icon("check", "icon-sm")}Tagged urgent</span><span>${icon("calendar", "icon-sm")}Booked Wed 8–10 AM</span><span>${icon("message", "icon-sm")}Summary texted to team</span><span class="sample-tag" style="margin-left:auto">Sample</span></div>
        </div>
        <div class="tile-foot"><a class="link-arrow" href="${TEL}" data-loc="bento">Hear it: call ${PHONE} ${icon("arrow")}</a></div>
      </article>
      <article class="tile t-follow" data-reveal>
        <h3>Follow‑up &amp; booking</h3>
        <p>Chases every lead and open quote, rebooks customers who are due, and asks for the review when the job's done.</p>
        <ul class="day-track" aria-label="Quote follow-up schedule">
          <li><span>Day</span>1</li><li><span>Day</span>3</li><li><span>Day</span>7</li><li><span>Day</span>14</li>
        </ul>
      </article>
      <article class="tile t-social" data-reveal>
        <h3>Marketing &amp; social</h3>
        <p>Turns your job-site photos and videos into posts. Nothing goes out until you approve it.</p>
        <div class="tile-foot"><a class="link-arrow" href="/services/#marketing">What it posts ${icon("arrow")}</a></div>
      </article>
      <article class="tile t-dash" data-reveal>
        <h3>One dashboard for the whole business</h3>
        <span class="core-mark">Our core service</span>
        <p>Calls, leads, booked jobs, open quotes, cash and reviews on one screen every morning, for one business or several.</p>
        <div class="tile-foot"><a class="link-arrow" href="#console" style="color:#fff">See a sample console ${icon("arrow")}</a></div>
      </article>
      <article class="tile t-tools" data-reveal>
        <h3>Inside the tools you already use</h3>
        <p>No new app for your team to learn. We plug into what you run today.</p>
        <ul class="tool-list"><li>Your CRM</li><li>Google Calendar</li><li>QuickBooks</li><li>Square</li><li>Your phone system</li><li>Spreadsheets</li></ul>
      </article>
    </div>
  </div>
</section>

<section class="section band-paper rule-top trace" data-trace aria-labelledby="trace-h">
  <div class="wrap trace-grid">
    <div class="trace-pin">
      <h2 class="h2" id="trace-h">9:42 PM. Crew's gone home. The phone rings.</h2>
      <p class="lede">Follow one call through Bright Department, and see where it goes today.</p>
      <div class="trace-legend" aria-hidden="true"><span><i></i>With Bright Department</span><span><i class="red"></i>Today</span></div>
      <a class="btn btn-sm" href="/book/" data-loc="trace" style="width:fit-content">${icon("calendar")}Set this up for my calls</a>
    </div>
    <div class="trace-track">
      <svg class="trace-svg" aria-hidden="true"><path class="base"/><path class="miss"/><path class="live"/></svg>
      <div class="trace-step"><span class="node" aria-hidden="true"></span><h3 class="state-name">Ring</h3><p><b class="when">9:42 PM, Tuesday.</b> A homeowner calls about a leak over the kitchen. Your crew wrapped up an hour ago.</p></div>
      <div class="trace-step missed"><div class="miss-card"><h3 class="state-name">Missed</h3><p><b class="when">Today, without us.</b> Voicemail. Most people don't leave one. They call the next company on Google.</p></div></div>
      <div class="trace-step"><span class="node" aria-hidden="true"></span><h3 class="state-name">Answered</h3><p><b class="when">First ring.</b> Bright Department AI picks up as your business, any hour, any day.</p></div>
      <div class="trace-step"><span class="node" aria-hidden="true"></span><h3 class="state-name">Qualified</h3><p><b class="when">Two minutes in.</b> Name, address, the problem and how urgent, each spelled back. Water coming in? It's tagged urgent and handed to your on-call number.</p></div>
      <div class="trace-step"><span class="node" aria-hidden="true"></span><h3 class="state-name">Booked</h3><p><b class="when">Before hang-up.</b> The estimate goes on your calendar in a window you approved: Wednesday, 8 to 10 AM.</p></div>
      <div class="trace-step"><span class="node" aria-hidden="true"></span><h3 class="state-name">Texted</h3><p><b class="when">9:47 PM.</b> Your team gets a short summary: who, where, what and when.</p></div>
      <div class="trace-step"><span class="node" aria-hidden="true"></span><h3 class="state-name">Followed up</h3><p><b class="when">Day 1, 3, 7 and 14.</b> Quote sent but no answer? Follow-ups go out on schedule until they sign or say no.</p></div>
      <div class="trace-step"><span class="node" aria-hidden="true"></span><h3 class="state-name">Reviewed</h3><p><b class="when">Job done.</b> A review request goes out the day the job wraps. Happy customers get asked for a referral too.</p></div>
    </div>
  </div>
</section>

<section class="section rule-top" id="console" aria-labelledby="console-h">
  <div class="wrap">
    <div class="section-head split">
      <h2 class="h2" id="console-h">See the whole business before your first coffee.</h2>
      <p class="lede">One console shows what came in, what got answered, what's booked, and the two things that need you today. It's where your win number lives, too.</p>
    </div>
    ${consoleSample()}
  </div>
</section>

<section class="section band-paper rule-top" aria-labelledby="ind-h">
  <div class="wrap">
    <div class="section-head split">
      <h2 class="h2" id="ind-h">Built for crews <span class="pill-img" style="background-image:url('/assets/img/type-construction.webp')" aria-hidden="true"></span> on the job, not at a desk.</h2>
      <p class="lede">Local service businesses that live on the phone. Pick yours.</p>
    </div>
    <div class="hacc">
      <a class="hacc-item" href="/industries/roofing-exteriors/"><img src="/assets/img/type-construction.webp" alt="" loading="lazy" width="800" height="600"><span class="hacc-copy"><span class="hacc-name">Roofing &amp; exteriors</span><span class="hacc-pain">Crews on the roof, phone in the truck. Quotes go cold while you're working.</span><span class="hacc-go">See how ${icon("arrow", "icon-sm")}</span></span></a>
      <a class="hacc-item" href="/industries/hvac-plumbing/"><img src="/assets/img/type-hvac.webp" alt="" loading="lazy" width="800" height="600"><span class="hacc-copy"><span class="hacc-name">HVAC &amp; plumbing</span><span class="hacc-pain">No AC or a burst pipe at 2 a.m.? Answered and booked before you wake up.</span><span class="hacc-go">See how ${icon("arrow", "icon-sm")}</span></span></a>
      <a class="hacc-item" href="/industries/automotive/"><img src="/assets/img/type-automotive.webp" alt="" loading="lazy" width="800" height="600"><span class="hacc-copy"><span class="hacc-name">Automotive</span><span class="hacc-pain">Bays full and phones ringing. We answer, book service, and chase every estimate.</span><span class="hacc-go">See how ${icon("arrow", "icon-sm")}</span></span></a>
      <a class="hacc-item" href="/industries/retail/"><img src="/assets/img/type-retail.webp" alt="" loading="lazy" width="800" height="600"><span class="hacc-copy"><span class="hacc-name">Retail</span><span class="hacc-pain">Hours, stock and holds answered by call or text, then a review request.</span><span class="hacc-go">See how ${icon("arrow", "icon-sm")}</span></span></a>
    </div>
    <p class="also-line">Also: <a href="/industries/general-contractors/">general contractors</a>, real estate and property management, and most local service businesses. <a href="/contact/">Ask us about yours</a>.</p>
  </div>
</section>

<section class="section band-steel rule-top" aria-labelledby="calc-h">
  <div class="wrap">
    ${calculator({ id: "home-calc" }).replace('<h2 class="h2">', '<h2 class="h2" id="calc-h">')}
  </div>
</section>

<section class="section rule-top" aria-labelledby="how-h">
  <div class="wrap">
    <div class="section-head split">
      <h2 class="h2" id="how-h">From first call to live in 7 days.</h2>
      <p class="lede">A short, fixed launch. Then we keep tuning it with your team every week.</p>
    </div>
    <ol class="road road-wrap">
      <li data-reveal><span class="road-plate">Call</span><h3>Free intro call</h3><p>Two or three questions about your week. You'll know if this fits.</p></li>
      <li data-reveal><span class="road-plate">Day 1</span><h3>Kickoff</h3><p>We confirm your bottleneck, the one number that would make this a win, and today's baseline.</p></li>
      <li data-reveal><span class="road-plate">Day 2–4</span><h3>Build</h3><p>Receptionist, automations and your dashboard, inside your tools. Tracking goes in first.</p></li>
      <li data-reveal><span class="road-plate">Day 5–6</span><h3>Test &amp; train</h3><p>Scripted test calls and edge cases, then about 30 minutes with your team.</p></li>
      <li class="last" data-reveal><span class="road-plate">Day 7</span><h3>Live</h3><p>Start with after-hours if you like. Then a short weekly sync to keep improving it.</p></li>
    </ol>
  </div>
</section>

<section class="section band-paper rule-top" aria-labelledby="cases-h">
  <div class="wrap">
    <div class="section-head split">
      <h2 class="h2" id="cases-h">Proof from businesses we run.</h2>
      <p class="lede">Before a system goes into your business, it runs in ours.</p>
    </div>
    <div class="case-teasers">
      <a class="case-card" href="/case-studies/288-exteriors/">
        <div class="media"><div class="photo-ph" role="img" aria-label="288 Exteriors job photo coming soon"><mark class="ph">[288 EXTERIORS JOB PHOTO]</mark></div></div>
        <div class="body">
          <h3>288 Exteriors</h3>
          <p>Roofing, siding and gutters. Open roof quotes worth $22K to $27K each were sitting with unanswered follow-ups.</p>
          <div class="case-stats"><div><b>${ph("#")}</b><span>calls answered</span></div><div><b>${ph("#")}</b><span>quotes followed up</span></div><div><b>${ph("#")}</b><span>hours saved / wk</span></div></div>
          <span class="link-arrow" style="width:fit-content">Read the case study ${icon("arrow")}</span>
        </div>
      </a>
      <a class="case-card" href="/case-studies/bright-department/">
        <div class="media"><img src="/assets/video/hero-poster-v6.jpg" alt="Still from our felt explainer: an owner at a desk buried in paperwork" loading="lazy" width="1280" height="720"></div>
        <div class="body">
          <h3>Bright Department</h3>
          <p>We run our own sales on it: an AI caller every business day, an AI receptionist on our line, and one console over all of it.</p>
          <div class="case-stats"><div><b>${ph("#")}</b><span>dials a week</span></div><div><b>${ph("#")}</b><span>live conversations</span></div><div><b>${ph("#")}</b><span>calls answered</span></div></div>
          <span class="link-arrow" style="width:fit-content">Read the case study ${icon("arrow")}</span>
        </div>
      </a>
    </div>
  </div>
</section>

<section class="section rule-top" aria-labelledby="tools-h">
  <div class="wrap">
    <div class="section-head split">
      <h2 class="h2" id="tools-h">Not ready to talk? Start here.</h2>
      <p class="lede">Free, practical, and built from the same questions we ask on a discovery call.</p>
    </div>
    ${toolsBlock()}
  </div>
</section>

<section class="section band-paper rule-top" aria-labelledby="faq-h">
  <div class="wrap two-col">
    <div>
      <h2 class="h2" id="faq-h">Straight answers.</h2>
      <p class="lede" style="margin-top:20px">Still have a question? <a href="/contact/">Send it</a> and we'll reply the same business day.</p>
    </div>
    ${faq(HOME_FAQ)}
  </div>
</section>
${marquee()}
${finalCta()}`,
});

/* ---------------- SERVICES ---------------- */
const SERVICES = [
  ["receptionist", "AI receptionist & call bots", "Answers calls and texts 24/7 as your business. Qualifies callers, marks urgent calls, books into approved calendar windows, texts back missed calls, sends your team a summary after each call, and hands off to a person when it should.", "Moves: % of calls answered · minutes to first reply · bookings per 100 calls", ["Answers as \"we\" and \"our team\"", "Says it's an AI assistant if sincerely asked", "Never quotes prices unless you approve exactly what it may say", "Urgent calls go to your on-call number"]],
  ["follow-up", "Follow‑up & booking", "Chases every lead and open quote, rebooks customers who are due, and puts jobs straight on the calendar.", "Moves: quotes followed up · estimate-to-signed rate · rebook rate", ["Quote follow-up on Day 1, 3, 7 and 14", "Appointment reminders that cut no-shows", "Seasonal and maintenance rebooking", "Missed-call text-back in under a minute"]],
  ["marketing", "Marketing & social", "Turns job-site photos and videos into posts. Nothing goes out until you approve it.", "Moves: posts a week · inbound inquiries", ["Before-and-after posts from your own photos", "Review and referral asks after every job", "One call to action on every post", "You approve everything first"]],
  ["dashboards", "Company-wide dashboards", "Our core service. A main console for each business, or one across several: calls, leads, booked jobs, open quotes, revenue, reviews, team activity, and the top two things that need you today.", "Moves: visibility. It's where your win number and baseline live.", ["Built from the tools you already run", "Baseline captured before go-live", "One console across several businesses", "Reviewed with your team every week"]],
  ["automations", "Workflow automations", "Custom automations between your CRM, scheduling, invoicing, phone system and spreadsheets.", "Moves: hours saved · invoices out on time", ["Invoice and deposit handoffs", "Data entry between apps", "Rebooking and review requests", "Approval steps where you want them"]],
  ["training", "Team training", "Hands-on sessions built around your team's real work, with simple playbooks they can repeat.", "Moves: adoption. A system nobody uses is a system that failed.", ["About 30 minutes at launch", "Where summaries arrive and how to take a handoff", "How to flag a bad call", "Weekly sync to keep improving"]],
];
page({
  url: "/services/",
  title: "Services: AI receptionist, follow-up, dashboards | Bright Department",
  desc: "Done-for-you AI receptionists, follow-up and booking, marketing support, workflow automations and company-wide dashboards for Richmond-area small businesses.",
  active: "/services/",
  jsonld: [businessLd],
  body: `
<section class="page-hero">
  <div class="wrap">
    <h1 class="h1">Everything AI. One team that runs it.</h1>
    <p class="lede">Pick one piece or hand us the whole department. Every service exists to fix one stage of your pipeline, and we name the number it moves.</p>
    <div class="btn-row"><a class="btn" href="/book/" data-loc="services-hero">${icon("calendar")}Book a free call</a><a class="btn btn-line" href="${TEL}">${icon("phone")}Call ${PHONE}</a></div>
  </div>
  <div class="fleet-stripe" data-draw aria-hidden="true"></div>
</section>
<section class="section">
  <div class="wrap">
    <div class="feature-rows">
      ${SERVICES.map(([id, h, p, moves, list]) => `
      <article class="feature-row" id="${id}" data-reveal>
        <div><h2>${esc(h)}</h2><p class="moves">${esc(moves)}</p></div>
        <div><p class="lede" style="max-width:none">${esc(p)}</p><ul class="check-list" style="margin-top:20px">${list.map((l) => `<li>${icon("check")}<span>${esc(l)}</span></li>`).join("")}</ul></div>
      </article>`).join("")}
    </div>
  </div>
</section>
<section class="section band-steel rule-top" aria-labelledby="console-h">
  <div class="wrap">
    <div class="section-head split"><h2 class="h2" id="console-h">The dashboard ties it together.</h2><p class="lede">Every service reports to one console, so you can see what changed and we can prove it.</p></div>
    ${consoleSample()}
  </div>
</section>
${finalCta({ heading: "Hear it for yourself." , lede: `Call ${PHONE} and talk to our AI right now, or book a free call with our team.` })}`,
  gsap: true,
});

/* ---------------- HOW IT WORKS ---------------- */
const HOW_FAQ = [
  ["What if AI gets something wrong?", "It only answers from information you approve, hands off when it isn't sure, and every call is reviewed in the weekly sync. Each mistake becomes a test case so it doesn't happen twice."],
  ["Do you replace my office staff?", "No. We take the repetitive work off their plate (answering after hours, chasing quotes, data entry) so they can do the work that needs a person."],
  ["Who owns the setup if I leave?", "It's built in your own tools, so there's nothing to migrate. Month to month, no contract."],
  ["Is my data safe?", "Your data is used only for your business. We use read-only access first, you approve each system one at a time, and we never ask for passwords by email or chat."],
];
page({
  url: "/how-it-works/",
  title: "How it works: find the bottleneck, live in 7 days | Bright Department",
  desc: "We find the one bottleneck costing you the most, agree one number that would make it a win, go live in 7 days, and keep tuning it with your team every week.",
  active: "/how-it-works/",
  jsonld: [faqLd(HOW_FAQ)],
  body: `
<section class="page-hero">
  <div class="wrap">
    <h1 class="h1">Find the bottleneck. Fix it. Prove it.</h1>
    <p class="lede">A business only moves as fast as its slowest step. We find yours, put a number on it, and fix that first. Then we find the next one.</p>
    <div class="btn-row"><a class="btn" href="/book/" data-loc="how-hero">${icon("calendar")}Book a free call</a><a class="btn btn-line" href="/scorecard/">Find my bottleneck first</a></div>
  </div>
  <div class="fleet-stripe" data-draw aria-hidden="true"></div>
</section>
<section class="section">
  <div class="wrap">
    <div class="section-head split"><h2 class="h2">Four places jobs leak.</h2><p class="lede">On every call we look at the same four stages, with your rough numbers. The weakest one is your bottleneck.</p></div>
    <div class="lens-list">
      <div data-reveal><h3>Reach</h3><p>Getting found. Do you show up on Google, in your profile, in AI answers?</p></div>
      <div class="is-bottleneck" data-reveal><h3>Acquire</h3><p>Answering. How many calls go to voicemail? How long do web leads wait?</p></div>
      <div data-reveal><h3>Convert</h3><p>Closing. Who follows up on open quotes, and how many are sitting cold right now?</p></div>
      <div data-reveal><h3>Expand</h3><p>Repeat business. Reviews, rebooking customers who are due, and referrals.</p></div>
    </div>
    <p class="small muted" style="margin-top:14px">Highlighted: the most common bottleneck we see in the trades. Yours may be different.</p>
  </div>
</section>
<section class="section band-steel rule-top">
  <div class="wrap">
    <div class="section-head split"><h2 class="h2">The 7-Day Launch.</h2><p class="lede">A short, fixed launch keeps scope tight and gets you a working system before second thoughts set in.</p></div>
    <ol class="road road-wrap">
      <li><span class="road-plate">Call</span><h3>Free intro call</h3><p>A few questions, one demo matched to your pain, and a straight answer on fit.</p></li>
      <li><span class="road-plate">Day 1</span><h3>Kickoff</h3><p>Confirm the bottleneck, the win number and the baseline. Collect approved info: services, hours, FAQs, service area.</p></li>
      <li><span class="road-plate">Day 2–4</span><h3>Build</h3><p>Receptionist script and knowledge, automations, calendar and CRM connections, your dashboard. Tracking first.</p></li>
      <li><span class="road-plate">Day 5–6</span><h3>Test &amp; train</h3><p>Urgent calls, price questions, wrong numbers, angry callers. Then about 30 minutes with your team.</p></li>
      <li class="last"><span class="road-plate">Day 7</span><h3>Live</h3><p>After-hours first if you like, then full. Daily monitoring for the first week.</p></li>
    </ol>
  </div>
</section>
<section class="section rule-top">
  <div class="wrap two-col">
    <div>
      <h2 class="h2">Then, every week.</h2>
      <p class="lede" style="margin-top:20px">Building is about 15% of the job. The weekly sync with your team is the other 85%, and it's why the system keeps getting better instead of drifting.</p>
    </div>
    <ul class="check-list">
      <li>${icon("check")}<span><b>Your number.</b> The win number against the baseline and target.</span></li>
      <li>${icon("check")}<span><b>Real calls.</b> We play two or three, one good, one weak, and ask what your best person would have said.</span></li>
      <li>${icon("check")}<span><b>Friction.</b> What is your team working around? What did the AI get wrong?</span></li>
      <li>${icon("check")}<span><b>Fixes.</b> One to three changes for next week, each tested before it ships.</span></li>
      <li>${icon("check")}<span><b>Notes in two hours.</b> Owners and dates logged, dashboard updated.</span></li>
    </ul>
  </div>
</section>
<section class="section band-paper rule-top">
  <div class="wrap two-col">
    <div><h2 class="h2">What we need from you.</h2></div>
    <ul class="check-list">
      <li>${icon("check")}<span>About 30 to 45 minutes of your time up front.</span></li>
      <li>${icon("check")}<span>Read-only access to your tools first. You approve each system one at a time.</span></li>
      <li>${icon("check")}<span>One staff member for a short weekly sync.</span></li>
      <li>${icon("check")}<span>One number that would make this a win, agreed in writing before we start.</span></li>
    </ul>
  </div>
</section>
<section class="section rule-top">
  <div class="wrap two-col"><div><h2 class="h2">Good questions.</h2></div>${faq(HOW_FAQ)}</div>
</section>
${finalCta()}`,
});

/* ---------------- INDUSTRIES ---------------- */
const INDUSTRIES = [
  { slug: "roofing-exteriors", name: "Roofing & exteriors", h1: "AI for roofing and exterior contractors.", img: "type-construction.webp", preset: "roofing", case: "288-exteriors",
    lede: "Your crew is on a roof when the phone rings. Quotes pile up at night and go cold. We run this exact setup in our own roofing company, 288 Exteriors.",
    pains: [["Calls go to voicemail", "On a roof, in the truck, after 5 p.m. The caller tries the next company on Google."], ["Big quotes go cold", "At 288 Exteriors, open roof quotes worth $22K to $27K each sat with unanswered follow-ups."], ["Reviews never get asked for", "The job's done, the crew's on the next one, and nobody asks."]],
    does: ["Answers every call and text 24/7 and books the estimate", "Marks storm and leak calls urgent and hands them to your on-call number", "Follows up every open quote on Day 1, 3, 7 and 14", "Sends a review request the day the job wraps"] },
  { slug: "hvac-plumbing", name: "HVAC & plumbing", h1: "AI for HVAC and plumbing companies.", img: "type-hvac.webp", preset: "hvac", case: "bright-department",
    lede: "No AC in July or a burst pipe at 2 a.m. The call that gets answered first gets the job.",
    pains: [["Emergencies after hours", "The most valuable calls come when nobody's at the desk."], ["Maintenance never gets rebooked", "Customers due for a tune-up don't hear from you, so they call someone else."], ["The office is stretched", "Your one office person can't answer, schedule and invoice at once."]],
    does: ["Answers and books emergency calls, day or night", "Tags urgent jobs and hands them to the on-call tech", "Rebooks customers due for seasonal maintenance", "Texts your team a summary after every call"] },
  { slug: "general-contractors", name: "General contractors", h1: "AI for general contractors and remodelers.", img: "type-construction.webp", preset: "gc", case: "288-exteriors",
    lede: "Big jobs, long sales cycles, and a phone that rings while you're on site. Every open estimate needs a follow-up nobody has time for.",
    pains: [["Estimates sit open", "High-value quotes need several touches, and they don't get them."], ["Leads wait hours", "A web lead that waits a day has already called someone else."], ["Numbers live in five apps", "You can't see what's booked, open and paid without digging."]],
    does: ["Replies to web leads in under a minute", "Follows up open estimates until they sign or say no", "Books site visits into the windows you approve", "Puts the whole pipeline on one console"] },
  { slug: "automotive", name: "Automotive", h1: "AI for auto repair and service shops.", img: "type-automotive.webp", preset: "auto", case: "bright-department",
    lede: "Bays are full and the phone keeps ringing. Every unanswered call is a car that goes to the shop down the road.",
    pains: [["Phones ring during jobs", "Techs can't stop mid-repair to answer."], ["Estimates don't get chased", "Customers go quiet after the quote."], ["No-shows waste bay time", "An empty slot is lost money."]],
    does: ["Answers calls and books service appointments", "Chases open estimates automatically", "Sends reminders that cut no-shows", "Asks happy customers for a review"] },
  { slug: "retail", name: "Retail", h1: "AI for local retail shops.", img: "type-retail.webp", preset: "retail", case: "bright-department",
    lede: "Hours, stock, holds. The same questions all day, by phone and by text, while you're helping the customer in front of you.",
    pains: [["Repeat questions", "Hours, stock and directions eat your day."], ["Missed texts", "Customers text and wait."], ["Few reviews", "Happy shoppers leave without being asked."]],
    does: ["Answers calls and texts about hours, stock and holds", "Takes hold requests and messages for your team", "Requests reviews from happy customers", "Turns your shop photos into posts you approve"] },
];
page({
  url: "/industries/",
  title: "Industries we help | Bright Department, Richmond VA",
  desc: "AI receptionists, follow-up and dashboards for roofing, HVAC, plumbing, general contractors, automotive and retail businesses around Richmond.",
  active: "/industries/",
  body: `
<section class="page-hero"><div class="wrap"><h1 class="h1">Built for businesses that live on the phone.</h1><p class="lede">If your crew is on the job while the phone rings, we can help. Pick your trade.</p></div><div class="fleet-stripe" data-draw aria-hidden="true"></div></section>
<section class="section"><div class="wrap">
  <div class="case-teasers" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))">
  ${INDUSTRIES.map((i) => `<a class="case-card" href="/industries/${i.slug}/"><div class="media"><img src="/assets/img/${i.img}" alt="" loading="lazy" width="800" height="450"></div><div class="body"><h3>${esc(i.name)}</h3><p>${esc(i.lede)}</p><span class="link-arrow" style="width:fit-content">See how ${icon("arrow")}</span></div></a>`).join("")}
  </div>
  <p class="also-line">Also real estate and property management, electrical, painting, fencing, landscaping, and most local service businesses. <a href="/contact/">Ask about yours</a>.</p>
</div></section>
${finalCta()}`,
});

for (const ind of INDUSTRIES) {
  const caseLabel = ind.case === "288-exteriors" ? "See it running at 288 Exteriors" : "See how we run our own sales on it";
  const indFaq = [
    ["How much does it cost?", `It depends on the setup. For most ${ind.name.toLowerCase()} businesses, one recovered job a month covers it. We'll show you the math on a free call.`],
    ["Will my customers know it's AI?", "If they sincerely ask, it tells them. It answers as your business, in your words, and hands anything sensitive to your team."],
    ["How long until it's live?", "Seven days from kickoff, starting with after-hours if you prefer."],
  ];
  page({
    url: `/industries/${ind.slug}/`,
    title: `${ind.h1.replace(".", "")} | Richmond VA | Bright Department`,
    desc: `${ind.lede} Done-for-you AI receptionist, follow-up and dashboards from a Short Pump team.`,
    active: "/industries/",
    gsap: false,
    jsonld: [faqLd(indFaq)],
    body: `
<section class="page-hero">
  <div class="wrap two-col" style="align-items:center">
    <div>
      <p class="crumbs"><a href="/industries/">Industries</a><span aria-hidden="true">/</span><span>${esc(ind.name)}</span></p>
      <h1 class="h1">${esc(ind.h1)}</h1>
      <p class="lede">${esc(ind.lede)}</p>
      <div class="btn-row"><a class="btn" href="/book/?src=industry-${ind.slug}" data-loc="industry-hero">${icon("calendar")}Book a free call</a><a class="btn btn-line" href="${TEL}">${icon("phone")}${PHONE}</a></div>
    </div>
    <div class="cab-window" style="clip-path:polygon(18% 0,100% 0,100% 100%,0 100%,0 28%)"><img src="/assets/img/${ind.img}" alt="" width="800" height="600"></div>
  </div>
  <div class="fleet-stripe" data-draw aria-hidden="true"></div>
</section>
<section class="section">
  <div class="wrap">
    <div class="section-head"><h2 class="h2">Where the jobs leak.</h2></div>
    <div class="lens-list" style="grid-template-columns:repeat(3,minmax(0,1fr))">
      ${ind.pains.map(([h, p]) => `<div data-reveal><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join("")}
    </div>
  </div>
</section>
<section class="section band-paper rule-top">
  <div class="wrap two-col">
    <div><h2 class="h2">What your AI department does.</h2><p class="lede" style="margin-top:20px">Built inside the tools you already use, live in 7 days.</p><a class="link-arrow" style="margin-top:24px" href="/case-studies/${ind.case}/">${caseLabel} ${icon("arrow")}</a></div>
    <ul class="check-list">${ind.does.map((d) => `<li>${icon("check")}<span>${esc(d)}</span></li>`).join("")}</ul>
  </div>
</section>
<section class="section band-steel rule-top"><div class="wrap">${calculator({ id: "ind-calc", preset: ind.preset, heading: `What missed calls cost a ${ind.name.toLowerCase()} business.` })}</div></section>
<section class="section rule-top"><div class="wrap two-col"><div><h2 class="h2">Questions.</h2></div>${faq(indFaq)}</div></section>
${finalCta()}`,
  });
}

/* ---------------- CASE STUDIES ---------------- */
page({
  url: "/case-studies/",
  title: "Case studies | Bright Department",
  desc: "How 288 Exteriors and Bright Department run on the same AI receptionist, follow-up and dashboards we install for clients.",
  active: "/case-studies/",
  body: `
<section class="page-hero"><div class="wrap"><h1 class="h1">We run it before you do.</h1><p class="lede">Every system we sell runs first in our own businesses. Here's what it found and what changed.</p></div><div class="fleet-stripe" data-draw aria-hidden="true"></div></section>
<section class="section"><div class="wrap">
  <div class="case-teasers">
    <a class="case-card" href="/case-studies/288-exteriors/"><div class="media"><div class="photo-ph" role="img" aria-label="288 Exteriors job photo coming soon"><mark class="ph">[288 EXTERIORS JOB PHOTO]</mark></div></div><div class="body"><h3>288 Exteriors</h3><p>Roofing, siding and gutters in Richmond. Client 0, where every system goes live first.</p><span class="link-arrow" style="width:fit-content">Read it ${icon("arrow")}</span></div></a>
    <a class="case-card" href="/case-studies/bright-department/"><div class="media"><img src="/assets/video/hero-poster-v6.jpg" alt="" loading="lazy" width="1280" height="720"></div><div class="body"><h3>Bright Department</h3><p>Our own sales, run on an AI caller, an AI receptionist and live dashboards.</p><span class="link-arrow" style="width:fit-content">Read it ${icon("arrow")}</span></div></a>
  </div>
</div></section>
${finalCta({ heading: "Want this running at your business?" })}`,
});

function caseStudy({ slug, name, h1, lede, facts, lenses, bottleneck, built, rows, img, imgAlt, quoteBy }) {
  page({
    url: `/case-studies/${slug}/`,
    title: `${name} case study | Bright Department`,
    desc: lede,
    active: "/case-studies/",
    gsap: true,
    jsonld: [{ "@context": "https://schema.org", "@type": "Article", headline: h1, about: name, author: { "@type": "Organization", name: "Bright Department" }, publisher: { "@type": "Organization", name: "Bright Department" } }],
    body: `
<section class="page-hero">
  <div class="wrap">
    <p class="crumbs"><a href="/case-studies/">Case studies</a><span aria-hidden="true">/</span><span>${esc(name)}</span></p>
    <div class="case-hero">
      <div><h1 class="h1">${esc(h1)}</h1><p class="lede">${esc(lede)}</p></div>
      <dl class="case-facts">${facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v}</dd></div>`).join("")}</dl>
    </div>
  </div>
  <div class="fleet-stripe" data-draw aria-hidden="true"></div>
</section>
<section class="section">
  <div class="wrap">
    <div class="section-head split"><h2 class="h2">The bottleneck.</h2><p class="lede">${bottleneck}</p></div>
    <div class="lens-list">${lenses.map(([h, p, hit]) => `<div${hit ? ' class="is-bottleneck"' : ""}><h3>${esc(h)}</h3><p>${p}</p></div>`).join("")}</div>
  </div>
</section>
<section class="section band-paper rule-top">
  <div class="wrap two-col">
    <div><h2 class="h2">What we built.</h2><figure class="case-fig">${img ? `<img src="${img}" alt="${esc(imgAlt)}" loading="lazy">` : `<div class="photo-ph" role="img" aria-label="Job photo coming soon"><mark class="ph">[288 EXTERIORS JOB PHOTO]</mark></div>`}</figure></div>
    <ul class="check-list">${built.map((b) => `<li>${icon("check")}<span>${b}</span></li>`).join("")}</ul>
  </div>
</section>
<section class="section rule-top">
  <div class="wrap">
    <div class="section-head split"><h2 class="h2">The numbers.</h2><p class="lede">Measured from go-live, ${ph("START DATE")} to ${ph("END DATE")}.</p></div>
    <div style="overflow-x:auto"><table class="ba-table"><thead><tr><th>Measure</th><th>Before</th><th>After</th></tr></thead><tbody>
      ${rows.map(([m]) => `<tr><td>${esc(m)}</td><td>${ph()}</td><td class="after">${ph()}</td></tr>`).join("")}
    </tbody></table></div>
  </div>
</section>
<section class="section band-steel rule-top">
  <div class="wrap">
    <div class="section-head split"><h2 class="h2">The console.</h2><p class="lede">${ph("REPLACE WITH REAL SCREENSHOT")} Until then, this sample shows the layout.</p></div>
    ${consoleSample()}
  </div>
</section>
<section class="section rule-top">
  <div class="wrap">
    <blockquote class="quote-block"><p>${ph("OWNER QUOTE")}</p><footer>${esc(quoteBy)}</footer></blockquote>
  </div>
</section>
${finalCta({ heading: "Want this running at your business?" })}`,
  });
}

caseStudy({
  slug: "288-exteriors",
  name: "288 Exteriors",
  h1: "288 Exteriors: client 0.",
  lede: "Roofing, siding and gutters around Richmond. The business we run ourselves, and the first place every Bright Department system goes live.",
  facts: [["Trade", "Roofing, siding &amp; gutters"], ["Where", "Richmond, VA"], ["Role", "Client 0, run by our team"], ["Systems", "CRM, AI receptionist, quote follow-up, main console"]],
  bottleneck: "Convert. The console showed open roof quotes worth about $22K to $27K each, each with several follow-up emails and no reply.",
  lenses: [["Reach", "Leads coming in from referrals and search."], ["Acquire", "Calls missed while crews were on roofs."], ["Convert", "Big quotes sitting open with no follow-up that landed.", true], ["Expand", "Reviews and referrals asked for inconsistently."]],
  built: ["<b>The CRM template</b> every client now starts from, built here first", "<b>AI receptionist</b> answering and booking estimates 24/7", "<b>Quote follow-up</b> on Day 1, 3, 7 and 14", `<b>The AI teammate</b>, named ${ph("NAME")}`, "<b>Main console</b> with open quotes and the top two things for the day"],
  rows: [["Calls answered"], ["Time to first reply"], ["Open quotes followed up"], ["Office hours saved per week"], ["Revenue traced to the system"]],
  img: "",
  imgAlt: "",
  quoteBy: "288 Exteriors",
});
caseStudy({
  slug: "bright-department",
  name: "Bright Department",
  h1: "We run our own sales on it.",
  lede: "Our AI caller dials local businesses every business day. Our AI receptionist answers our line. One console shows all of it.",
  facts: [["Business", "Bright Department"], ["Where", "Short Pump, VA"], ["AI caller", "Every business day, two lines"], ["Line", PHONE]],
  bottleneck: "Acquire. Most calls land on voicemail or phone menus, so we cut the opener to under 12 seconds and asked a question by second 5.",
  lenses: [["Reach", "Targeted lists of local businesses, scored after every call."], ["Acquire", "Getting a decision-maker to stay on the line.", true], ["Convert", "Turning a yes into a booked call, fast."], ["Expand", "Referrals from every live client."]],
  built: ["<b>AI caller</b> dialing in small batches, checked before scaling", "<b>AI receptionist</b> on (804) 635-3682 taking every callback", "<b>Custom demo videos</b> sent the same day", "<b>Daily console</b> with dials, live conversations, decision-makers reached and emails captured"],
  rows: [["Dials per week"], ["Live conversations"], ["Decision-makers reached"], ["Callbacks answered by AI"], ["Demo videos sent same day"]],
  img: "/assets/video/hero-poster-v6.jpg",
  imgAlt: "Still from our felt explainer video",
  quoteBy: "Our team at Bright Department",
});

/* ---------------- LOCATION ---------------- */
page({
  url: "/ai-receptionist-short-pump-va/",
  title: "AI receptionist in Short Pump, VA | Bright Department",
  desc: "A Short Pump team that sets up and runs AI receptionists, follow-up and dashboards for local businesses in the West End, Glen Allen, Henrico and Richmond.",
  active: "",
  jsonld: [businessLd],
  body: `
<section class="page-hero"><div class="wrap"><h1 class="h1">An AI receptionist from your neighbors in Short Pump.</h1><p class="lede">We're based in Short Pump. Same roads, same time zone, and a number that answers. We set it up, train your team, and keep it running.</p><div class="btn-row"><a class="btn" href="/book/?src=short-pump" data-loc="location-hero">${icon("calendar")}Book a free call</a><a class="btn btn-line" href="${TEL}">${icon("phone")}${PHONE}</a></div></div><div class="fleet-stripe" data-draw aria-hidden="true"></div></section>
<section class="section"><div class="wrap two-col">
  <div><h2 class="h2">Local, and accountable.</h2></div>
  <div class="prose">
    <p>Most AI vendors are remote, national and faceless. They hand you a login and leave. We're a Short Pump team that runs the same systems in our own roofing company and rental portfolio, and we meet with your staff every week to keep improving them.</p>
    <p>We work with roofing and exterior contractors, HVAC and plumbing companies, general contractors, auto shops, retail stores and property managers across the West End, Glen Allen, Henrico, Richmond, Chesterfield, Midlothian and Mechanicsville.</p>
    <ul><li>An AI receptionist that answers calls and texts 24/7 and books the job</li><li>Follow-up on every lead and open quote</li><li>One dashboard that shows the whole business</li><li>Live in 7 days. No contract.</li></ul>
  </div>
</div></section>
<section class="section band-steel rule-top"><div class="wrap">${calculator({ id: "loc-calc" })}</div></section>
${marquee()}
${finalCta()}`,
});

/* ---------------- BOOK ---------------- */
page({
  url: "/book/",
  title: "Book a free call | Bright Department",
  desc: `Book a free call with Bright Department. We'll find where jobs are leaking and tell you straight whether AI can fix it.`,
  active: "",
  body: `
<section class="section" data-book style="padding-top:clamp(48px,6vw,88px)">
  <div class="wrap book-grid book-areas">
    <div class="book-intro">
      <h1 class="h1" data-book-title>Book a free call with our team.</h1>
      <p class="lede" data-book-lede style="margin-top:22px">Pick a time that works. We'll ask two or three questions about your week, show you one thing the AI would take off your plate, and tell you straight whether it fits.</p>
      <ul class="check-list" style="margin-top:28px">
        <li>${icon("check")}<span>No pressure, no contract talk on the first call.</span></li>
        <li>${icon("check")}<span>Bring one number: missed calls a week, or open quotes.</span></li>
        <li>${icon("check")}<span>You'll leave knowing your biggest bottleneck.</span></li>
      </ul>
    </div>
    <div class="side-proof book-aside">
        <blockquote><p>We run this setup in our own roofing company, 288 Exteriors, before it goes into yours.</p><footer><a href="/case-studies/288-exteriors/">Read the 288 Exteriors case study</a></footer></blockquote>
        <a class="side-call" href="${TEL}" data-loc="book-side">${icon("phone", "icon-lg")}<span><span class="small muted">Rather talk now? Our AI answers.</span><b class="tnum">${PHONE}</b></span></a>
    </div>
    <div class="book-cal">
      <div class="cal-slot" data-cal-slot aria-label="Booking calendar"></div>
      <div data-cal-fallback>
        ${contactForm({ name: "book-request", thanks: "/thanks/request/", idp: "b", heading: "Request a time", topic: false, buttonLabel: "Request my call",
          extra: `<div class="field full"><label for="b-pain">Where does your team lose the most time?</label><select class="select" id="b-pain" name="biggest_headache" required><option value="">Choose one</option><option>Phones: calls go to voicemail</option><option>Follow-up: quotes and leads go cold</option><option>Paperwork: invoicing and data entry</option><option>Not sure yet</option></select></div>
          <div class="field full"><label for="b-time">Best time to talk</label><select class="select" id="b-time" name="preferred_time" required><option value="">Choose one</option><option>Weekday morning</option><option>Weekday midday</option><option>Weekday afternoon</option><option>Weekday evening</option></select></div>` })}
      </div>
    </div>
  </div>
</section>`,
});

/* ---------------- CONTACT ---------------- */
page({
  url: "/contact/",
  title: "Contact Bright Department | Short Pump, VA",
  desc: "Questions, partnerships or a demo. Message Bright Department, call (804) 635-3682, or email team@brightdepartment.com. We reply the same business day.",
  active: "",
  jsonld: [businessLd],
  body: `
<section class="section" style="padding-top:clamp(48px,6vw,88px)">
  <div class="wrap book-grid">
    <div>
      <h1 class="h1">Talk to our team.</h1>
      <p class="lede" style="margin-top:22px">A question, a partnership, or just want to see if this fits? Send a message and we'll reply the same business day.</p>
      <div class="side-proof">
        <a class="side-call" href="${TEL}" data-loc="contact">${icon("phone", "icon-lg")}<span><span class="small muted">Call. Our AI answers and our team calls back.</span><b class="tnum">${PHONE}</b></span></a>
        <a class="side-call" href="mailto:${EMAIL}">${icon("mail", "icon-lg")}<span><span class="small muted">Email</span><b style="font-size:1.4rem">${EMAIL}</b></span></a>
        <a class="side-call" href="${IG}" rel="noopener">${icon("instagram", "icon-lg")}<span><span class="small muted">Instagram</span><b style="font-size:1.4rem">@brightdepartmentai</b></span></a>
        <div class="side-call">${icon("pin", "icon-lg")}<span><span class="small muted">Based in</span><b style="font-size:1.4rem">Short Pump, VA</b><span class="small muted">Serving Richmond and Central Virginia</span></span></div>
      </div>
      <p style="margin-top:28px"><a class="link-arrow" href="/book/">Skip the back-and-forth: pick a time ${icon("arrow")}</a></p>
    </div>
    <div>${contactForm({})}</div>
  </div>
</section>`,
});

/* ---------------- FREE TOOLS ---------------- */
page({
  url: "/free-tools/",
  title: "Free tools for local businesses | Bright Department",
  desc: "Free missed-call calculator, AI Growth Scorecard and 25 AI Prompts guide for Richmond-area small businesses.",
  active: "/free-tools/",
  body: `
<section class="page-hero"><div class="wrap"><h1 class="h1">Free tools. No call required.</h1><p class="lede">Built from the same questions we ask on a discovery call. Use them, keep them, share them.</p></div><div class="fleet-stripe" data-draw aria-hidden="true"></div></section>
<section class="section"><div class="wrap">
  ${toolsBlock()}
</div></section>
<section class="section band-steel rule-top"><div class="wrap">${calculator({ id: "ft-calc" })}</div></section>
${finalCta()}`,
});

page({
  url: "/missed-call-calculator/",
  title: "Missed-call cost calculator | Bright Department",
  desc: "See what missed calls cost your business a month and a year. Free calculator with starting estimates for roofing, HVAC, plumbing, contractors, auto and retail.",
  active: "/free-tools/",
  body: `
<section class="section" style="padding-top:clamp(48px,6vw,88px)"><div class="wrap">
  ${calculator({ id: "mc-calc", headingTag: "h1", heading: "What are missed calls costing you?" })}
  <div class="two-col" style="margin-top:72px">
    <div><h2 class="h3">How the math works</h2></div>
    <div class="prose"><p>Missed calls a week, times 4.33 weeks in a month, times your close rate, times your average job value. It's deliberately simple, and it's the same math we use on a discovery call.</p><p>Not every missed call is a job, which is why the close rate is in there. Use your own numbers and keep them conservative.</p><p><a href="/scorecard/">Not sure missed calls are your biggest leak? Take the AI Growth Scorecard.</a></p></div>
  </div>
</div></section>
${finalCta()}`,
});

/* ---------------- SCORECARD ---------------- */
const SC_QS = [
  ["reach", "When someone searches your service and your town on Google, where do you show up?", ["In the top 3 on the map", "Somewhere on the first page", "Not sure", "We don't show up"]],
  ["reach", "Is your Google Business Profile claimed, current and getting calls?", ["Yes, all three", "Claimed, but not kept up", "Not sure", "No"]],
  ["reach", "When did you last post about a finished job?", ["This week", "This month", "This year", "Can't remember"]],
  ["acquire", "What happens to calls when you're on a job or after 5 p.m.?", ["Someone always answers live", "An answering service takes a message", "They go to voicemail", "It just rings"]],
  ["acquire", "When a web lead comes in, how fast does someone reply?", ["Under 5 minutes", "Within the hour", "Same day", "Next day or later"]],
  ["acquire", "Out of 10 people who reach out, how many end up booked?", ["8 or more", "5 to 7", "3 or 4", "Fewer than 3, or don't know"]],
  ["convert", "Who follows up on open estimates, and how many times?", ["A system follows up 3+ times", "Someone follows up once or twice", "Only if we remember", "Nobody"]],
  ["convert", "How many estimates are sitting open with no follow-up in the last week?", ["None", "1 to 5", "6 to 15", "More than 15, or don't know"]],
  ["convert", "How do you handle no-shows and late cancellations?", ["Automatic reminders", "We call or text by hand", "Rarely do anything", "Never"]],
  ["expand", "Do you ask every customer for a review?", ["Automatically, after every job", "Usually", "Sometimes", "Rarely"]],
  ["expand", "Do you rebook past customers who are due (maintenance, seasonal)?", ["Automatically", "By hand, sometimes", "Rarely", "Never"]],
  ["expand", "Do you ask happy customers for referrals?", ["Every time, automatically", "Usually", "Sometimes", "Rarely"]],
];
const LENS_NAME = { reach: "Reach: getting found", acquire: "Acquire: answering", convert: "Convert: closing", expand: "Expand: repeat business" };
page({
  url: "/scorecard/",
  title: "AI Growth Scorecard: find your bottleneck | Bright Department",
  desc: "Answer about 12 quick questions to find the weakest stage of your business (getting found, answering, closing or repeat business) and what it's costing you.",
  active: "/free-tools/",
  body: `
<section class="section" style="padding-top:clamp(48px,6vw,88px)">
  <div class="wrap">
    <div class="section-head split">
      <h1 class="h1">Find your bottleneck in about 5 minutes.</h1>
      <p class="lede">Twelve quick questions across the four places jobs leak. You'll see your weakest stage on screen right away. No email needed to see it.</p>
    </div>
    <div class="sc-shell" data-scorecard>
      <div class="sc-progress" aria-hidden="true"><span></span></div>
      <div class="sc-stage">
        <fieldset class="sc-q is-active" data-lens-label="First, two rough numbers" style="border:0;margin:0;padding:0">
          <legend class="visually-hidden">Your numbers</legend>
                    <h2>How busy is the phone?</h2>
          <div class="form-grid" style="max-width:720px">
            <div class="field"><label for="sc-leads">Calls, texts and web leads per week</label><input class="input tnum" id="sc-leads" name="sc_leads" inputmode="numeric" value="40"></div>
            <div class="field"><label for="sc-job">Average job value</label><div class="prefix-input"><span>$</span><input class="input tnum" id="sc-job" name="sc_job" inputmode="numeric" value="1500"></div></div>
          </div>
          <p class="small muted" style="margin:0">Best guesses are fine. These only size the cost estimate.</p>
        </fieldset>
        ${SC_QS.map(([lens, q, opts], i) => `
        <fieldset class="sc-q" data-lens="${lens}" data-lens-label="${LENS_NAME[lens]}" style="border:0;margin:0;padding:0">
          <legend class="visually-hidden">${esc(q)}</legend>
                    <h2>${esc(q)}</h2>
          <div class="sc-options">${opts.map((o, n) => `<label><input type="radio" name="q${i + 1}" value="${3 - n}"><span>${esc(o)}</span></label>`).join("")}</div>
        </fieldset>`).join("")}
        <div class="sc-results" aria-live="polite">
          <h2 class="h2">Your bottleneck: <span class="c-red" data-sc-weak></span></h2>
          <p class="lede" style="max-width:56ch">Rough estimate of what this stage leaks each month: <b class="tnum" data-sc-cost style="color:var(--red)"></b>. It assumes a 30% close rate, so treat it as a starting point, not a quote.</p>
          <div class="sc-bars" data-sc-bars></div>
          <div class="two-col">
            <div><h3 class="h3">What fixes it</h3><ul class="check-list" style="margin-top:18px" data-sc-fixes></ul></div>
            <div class="form-card" style="gap:16px">
              <h3 class="h3">Fix it this month</h3>
              <p class="muted" style="margin:0">Book a free call. We'll check this on your real numbers and tell you straight whether AI can fix it.</p>
              <a class="btn btn-block" href="/book/?src=scorecard" data-sc-book data-loc="scorecard">${icon("calendar")}Book my call</a>
            </div>
          </div>
          <form class="form-card" name="scorecard" method="POST" data-netlify="true" netlify-honeypot="bot-field" data-bd-form data-thanks="/thanks/scorecard/" data-event="scorecard_submit">
            <input type="hidden" name="form-name" value="scorecard">
            <input type="hidden" name="weakest_stage"><input type="hidden" name="scores"><input type="hidden" name="est_monthly_leak"><input type="hidden" name="answers">
            ${attribHidden}${honeypot}
            <h2>Email me the full report</h2>
            <div class="form-grid">
              <div class="field"><label for="scf-name">First name</label><input class="input" id="scf-name" name="name" autocomplete="given-name" required></div>
              <div class="field"><label for="scf-email">Email</label><input class="input" type="email" id="scf-email" name="email" autocomplete="email" required></div>
              <div class="field"><label for="scf-biz">Business name</label><input class="input" id="scf-biz" name="business" autocomplete="organization"></div>
              <div class="field"><label for="scf-phone">Phone <span class="muted" style="font-weight:400">(optional)</span></label><input class="input" type="tel" id="scf-phone" name="phone" autocomplete="tel"></div>
              <div class="full">${smsConsent("scf-sms")}</div>
            </div>
            <button class="btn" type="submit">Send my report ${icon("arrow", "icon-arrow")}</button>
            <p class="form-status small" role="status"></p>
          </form>
        </div>
      </div>
      <div class="sc-nav">
        <button class="btn btn-line btn-sm" type="button" data-sc-back>Back</button>
        <span class="small muted" data-sc-count style="align-self:center"></span>
        <button class="btn btn-sm" type="button" data-sc-next><span>Next</span> ${icon("arrow", "icon-arrow icon-sm")}</button>
      </div>
    </div>
  </div>
</section>`,
});

/* ---------------- AI PROMPTS ---------------- */
page({
  url: "/ai-prompts/",
  title: "25 AI Prompts That Get Local Businesses More Customers | Bright Department",
  desc: "A free guide of 25 practical AI prompts for local service businesses: replying to leads, following up quotes, asking for reviews and more.",
  active: "/free-tools/",
  body: `
<section class="section" style="padding-top:clamp(48px,6vw,88px)">
  <div class="wrap book-grid">
    <div>
      <h1 class="h1">25 AI prompts that get local businesses more customers.</h1>
      <p class="lede" style="margin-top:22px">A free guide for owners who want to try AI themselves before handing it to anyone. Copy, paste, and use them today.</p>
      <ul class="check-list" style="margin-top:28px">
        <li>${icon("check")}<span>Reply to a new lead fast, in your voice</span></li>
        <li>${icon("check")}<span>Follow up a quote without sounding pushy</span></li>
        <li>${icon("check")}<span>Ask for a review the right way</span></li>
        <li>${icon("check")}<span>Turn a job photo into a post</span></li>
      </ul>
      <p class="small muted" style="margin-top:22px">Want to know which prompt matters most for your business? <a href="/scorecard/">Take the Scorecard</a>.</p>
    </div>
    <form class="form-card" name="ai-prompts" method="POST" data-netlify="true" netlify-honeypot="bot-field" data-bd-form data-thanks="/thanks/prompts/" data-event="prompts_download">
      <input type="hidden" name="form-name" value="ai-prompts">
      ${attribHidden}${honeypot}
      <h2>Send me the guide</h2>
      <div class="field"><label for="p-name">First name</label><input class="input" id="p-name" name="name" autocomplete="given-name" required></div>
      <div class="field"><label for="p-email">Email</label><input class="input" type="email" id="p-email" name="email" autocomplete="email" required></div>
      <div class="field"><label for="p-ind">Industry</label>${industrySelect("p-ind", false)}</div>
      <label class="check" for="p-ok"><input type="checkbox" id="p-ok" name="email_consent" value="yes" required><span>Email me the guide and a few short follow-ups. Unsubscribe anytime.</span></label>
      <button class="btn btn-block" type="submit">${icon("download")}Get the free guide</button>
      <p class="form-status small" role="status"></p>
    </form>
  </div>
</section>`,
});

/* ---------------- THANK-YOU PAGES ---------------- */
const THANKS = [
  ["contact", "Got it. We'll be in touch today.", "Your message is with our team. We reply the same business day, usually sooner.", true],
  ["request", "Request received.", "We'll call you in the window you picked to confirm a time. Want it locked in now? Call us.", false],
  ["booked", "You're booked.", "Check your email for the confirmation and calendar invite. Bring one number: missed calls a week, or open quotes.", false],
  ["scorecard", "Your report is on its way.", "Check your inbox in the next few minutes. Meanwhile, the fastest way to fix your bottleneck is a free call.", true],
  ["prompts", "Check your inbox.", "The 25 AI Prompts guide is on its way. Want to know which one matters most for you?", true],
  ["calculator", "Sent. Check your inbox.", "Your missed-call number is on its way. Want to check it against your real calls?", true],
];
for (const [slug, h, p, offerBook] of THANKS) {
  page({
    url: `/thanks/${slug}/`,
    title: `Thank you | Bright Department`,
    desc: "Thanks from Bright Department.",
    active: "",
    noindex: true,
    body: `
<section class="page-hero thanks-hero"><div class="wrap">
  <h1 class="h1">${h}</h1>
  <p class="lede">${p}</p>
  <div class="btn-row">${offerBook ? `<a class="btn" href="/book/?src=thanks-${slug}" data-loc="thanks">${icon("calendar")}Pick a time now</a>` : ""}<a class="btn btn-line" href="${TEL}" data-loc="thanks">${icon("phone")}${PHONE}</a></div>
  <div class="next-list">
    <a href="/case-studies/288-exteriors/"><b>288 Exteriors</b><span class="muted">See it running in our roofing company</span></a>
    <a href="/scorecard/"><b>Scorecard</b><span class="muted">Find your weakest stage</span></a>
    <a href="${IG}" rel="noopener"><b>Instagram</b><span class="muted">@brightdepartmentai</span></a>
  </div>
</div><div class="fleet-stripe" aria-hidden="true"></div></section>`,
  });
}

/* ---------------- LEGAL (DRAFTS) ---------------- */
page({
  url: "/privacy/",
  title: "Privacy policy | Bright Department",
  desc: "How Bright Department collects and uses information from this website.",
  active: "",
  body: `
<section class="page-hero"><div class="wrap"><h1 class="h1">Privacy policy</h1><p class="lede">${ph("DRAFT: have this reviewed before launch")} Last updated ${ph("DATE")}.</p></div></section>
<section class="section"><div class="wrap prose">
  <h2>What we collect</h2>
  <p>When you fill in a form, book a call or call our line, we collect what you give us: your name, business name, phone number, email, industry and message. We also record which page you came from and campaign tags in the link you used, so we know which of our efforts work.</p>
  <p>If analytics are switched on, we use cookies or similar tools to understand how the site is used in aggregate.</p>
  <h2>Calls to our line</h2>
  <p>Calls to ${PHONE} are answered by an AI assistant that takes a message for our team. Calls may be recorded and transcribed so we can call you back accurately.</p>
  <h2>How we use it</h2>
  <ul><li>To reply to you, schedule calls and send what you asked for</li><li>To follow up about your request, by email, and by text only if you opted in</li><li>To improve this website and our service</li></ul>
  <h2>Text messages</h2>
  <p>We only text you if you opt in. Message and data rates may apply. Reply STOP to opt out at any time, or HELP for help. We don't share your phone number with third parties for their marketing.</p>
  <h2>Sharing</h2>
  <p>We don't sell your information. We share it only with the service providers who help us run the business (for example our CRM, scheduling, email and hosting providers), and only so they can do that work.</p>
  <h2>Your choices</h2>
  <p>Ask us to see, correct or delete your information at <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
  <h2>Contact</h2>
  <p>Bright Department, Short Pump, Virginia. <a href="mailto:${EMAIL}">${EMAIL}</a> · <a href="${TEL}">${PHONE}</a></p>
</div></section>`,
});
page({
  url: "/terms/",
  title: "Terms of use | Bright Department",
  desc: "Terms of use for the Bright Department website.",
  active: "",
  body: `
<section class="page-hero"><div class="wrap"><h1 class="h1">Terms of use</h1><p class="lede">${ph("DRAFT: have this reviewed before launch")} Last updated ${ph("DATE")}.</p></div></section>
<section class="section"><div class="wrap prose">
  <h2>This website</h2>
  <p>This site describes Bright Department's services. Nothing on it is an offer or a contract. Services are provided under a separate written agreement.</p>
  <h2>Free tools</h2>
  <p>The missed-call calculator and AI Growth Scorecard give rough estimates based on the numbers you enter. They are not quotes, forecasts or guarantees of results.</p>
  <h2>Sample material</h2>
  <p>Screens and conversations marked "sample" are illustrations, not real customer data.</p>
  <h2>Contact</h2>
  <p><a href="mailto:${EMAIL}">${EMAIL}</a> · <a href="${TEL}">${PHONE}</a></p>
</div></section>`,
});

/* ---------------- 404 ---------------- */
page({
  url: "/404.html",
  title: "Page not found | Bright Department",
  desc: "That page doesn't exist.",
  active: "",
  noindex: true,
  body: `
<section class="page-hero"><div class="wrap"><h1 class="h1">Wrong turn.</h1><p class="lede">That page doesn't exist. Here's where most people are headed.</p><div class="btn-row"><a class="btn" href="/book/">${icon("calendar")}Book a free call</a><a class="btn btn-line" href="/">Home</a></div></div><div class="fleet-stripe" aria-hidden="true"></div></section>`,
});

/* ---------------- Sitemap ---------------- */
const today = new Date().toISOString().slice(0, 10);
const urls = PAGES.filter((p) => !p.noindex && !p.url.endsWith(".html")).map((p) => `  <url><loc>${SITE}${p.url}</loc><lastmod>${today}</lastmod></url>`);
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
console.log(`Built ${PAGES.length} pages into ${ROOT}`);
