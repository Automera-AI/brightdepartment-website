// Builds the three short homepage versions for review into site/versions/.
// They reuse the header, footer and industry strip from the built home page, so run build-pages.mjs first.
import fs from "node:fs"; import path from "node:path"; import { fileURLToPath } from "node:url";
const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "site");
const home = fs.readFileSync(path.join(SITE, "index.html"), "utf8");
const grab = (re, what) => { const m = home.match(re); if (!m) throw new Error("Could not find " + what + " in site/index.html"); return m[0]; };
const header = grab(/<a class="skip-link"[\s\S]*?<\/header>/, "header");
const footer = grab(/<footer class="site-footer">[\s\S]*?<\/footer>\s*<nav class="action-bar"[\s\S]*?<\/nav>/, "footer");
const hacc = grab(/<div class="hacc">[\s\S]*?<\/div>/, "industry strip");

const icon = (id, cls = "") => `<svg class="icon ${cls}" aria-hidden="true"><use href="/assets/icons.svg#i-${id}"/></svg>`;
const PHONE = `<a class="tnum" href="tel:+18046353682" data-loc="hero">(804) 635-3682</a>`;
const VERSIONS = { a: "Switchboard", b: "Follow one lead", c: "Floor plan" };

const page = (key, title, body) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | Bright Department</title>
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#fbfbf9">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/BigShouldersDisplay-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/Barlow-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css">
<link rel="stylesheet" href="/versions/versions.css">
<script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"}}</script>
</head>
<body>
<div class="review-bar"><div class="wrap"><strong>Review version ${key ? key.toUpperCase() + ": " + VERSIONS[key] : "picker"}</strong><span>Not live. Homepage only.</span><nav aria-label="Review versions"><a href="/versions/"${key ? "" : ' aria-current="page"'}>All</a>${Object.keys(VERSIONS).map((k) => `<a href="/versions/${k}/"${k === key ? ' aria-current="page"' : ""}>${k.toUpperCase()}</a>`).join("")}</nav></div></div>
${header}
<main id="main">
${body}
</main>
${footer}
<script src="/assets/js/config.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="/assets/js/site.js" defer></script>
<script type="module" src="/versions/flow.js"></script>
</body>
</html>
`;

/* ----- shared blocks ----- */
const steps = `<ol class="flow-steps">
        <li data-flow-step><strong>1. It comes in</strong>A call, an email or a text, any hour.</li>
        <li data-flow-step><strong>2. AI picks up</strong>On the first ring, as your business.</li>
        <li data-flow-step><strong>3. It talks or texts</strong>Gets the details and books the job.</li>
        <li data-flow-step><strong>4. Lead is logged</strong>In your CRM or a Google Sheet.</li>
      </ol>`;
const say = `<p class="flow-say" data-flow-say><b>Ringing</b><span>A call is coming in.</span></p>`;

const industries = (band) => `
<section class="section v-tight ${band} rule-top" aria-labelledby="ind-h">
  <div class="wrap">
    <div class="section-head split">
      <h2 class="h2" id="ind-h">Built for businesses that live on the phone.</h2>
      <p class="lede">Crews on the job, not at a desk. Pick your trade.</p>
    </div>
    ${hacc}
    <p class="also-line">Not listed? <a href="/contact/">Ask us about yours</a>.</p>
  </div>
</section>`;

const offer = (band) => `
<section class="section v-tight ${band} rule-top" aria-labelledby="offer-h">
  <div class="wrap">
    <div class="section-head split">
      <h2 class="h2" id="offer-h">One launch. Your whole AI department.</h2>
      <p class="lede">Three AI employees, set up for you and tuned every month.</p>
    </div>
    <div class="v-offer">
      <div class="offer">
        <h3>The 7-Day AI Department Launch</h3>
        <ul>
          <li>Done-for-you setup</li>
          <li>Your own CRM account, built for you</li>
          <li>Training for your team</li>
          <li>Weekly tuning. No contract.</li>
        </ul>
        <a class="btn" href="/book/" data-loc="offer">${icon("calendar")}Book a free call ${icon("arrow", "icon-arrow")}</a>
      </div>
      <article class="tile" data-reveal><h3>AI receptionist</h3><p>Answers calls, emails and texts 24/7, qualifies the lead and books the job.</p></article>
      <article class="tile" data-reveal><h3>Follow-up &amp; booking</h3><p>Chases every lead and open quote, and asks for the review when the job is done.</p></article>
      <article class="tile" data-reveal><h3>Marketing &amp; social</h3><p>Turns your job-site photos into posts. Nothing goes out until you approve it.</p></article>
    </div>
  </div>
</section>`;

const calc = `<div class="calc" data-calc data-preset="roofing" id="v-calc">
      <div class="calc-inputs">
        <div class="field">
          <label for="v-calc-trade">Your trade</label>
          <select class="select" id="v-calc-trade" name="calc_trade">
            <option value="roofing" data-value="8500" data-close="25">Roofing &amp; exteriors</option><option value="hvac" data-value="450" data-close="50">HVAC &amp; plumbing</option><option value="gc" data-value="12000" data-close="20">General contractor</option><option value="auto" data-value="600" data-close="50">Automotive</option><option value="retail" data-value="80" data-close="40">Retail</option><option value="other" data-value="500" data-close="30">Other</option>
          </select>
        </div>
        <div class="field">
          <label for="v-calc-calls">Missed calls per week: <span class="tnum" data-calls-out>8</span></label>
          <input class="range" type="range" id="v-calc-calls" name="calc_calls" min="0" max="60" step="1" value="8">
        </div>
        <div class="form-grid">
          <div class="field"><label for="v-calc-value">Average job value</label><div class="prefix-input"><span>$</span><input class="input tnum" id="v-calc-value" name="calc_value" inputmode="numeric" value="8500"></div></div>
          <div class="field"><label for="v-calc-close">Close rate</label><div class="suffix-input"><input class="input tnum" id="v-calc-close" name="calc_close" inputmode="numeric" value="25"><span>%</span></div></div>
        </div>
      </div>
      <div class="calc-out" aria-live="polite">
        <div class="big" data-out-month>$0</div>
        <span class="calc-cap">a month walking to the next company</span>
        <div class="yr tnum" data-out-year>$0 a year</div>
        <div class="calc-next"><a class="btn btn-block" href="/book/?src=calculator" data-loc="calculator">${icon("calendar")}Check it on my real calls</a></div>
      </div>
    </div>`;

const q = (question, answer) => `<details><summary>${question}<span class="plus" aria-hidden="true"></span></summary><div class="answer"><p>${answer}</p></div></details>`;
const faq = `<div class="faq">
      ${q("Will it sound robotic?", `Call <a href="tel:+18046353682">(804) 635-3682</a> and decide for yourself. If a caller sincerely asks, it says it's an AI assistant.`)}
      ${q("Where do my leads go?", "Into your own CRM account. We build it for you on GoHighLevel, separate from every other business we work with. Prefer a Google Sheet? It can log there too.")}
      ${q("How much does it cost?", `It depends on the setup, so we don't post prices. For most trades, one recovered job a month covers it. <a href="/book/">Book a call</a> and we'll run your numbers.`)}
      ${q("Am I locked in?", "No. Month to month, no contract, cancel anytime.")}
      ${q("How fast can we be live?", "Seven days from kickoff, starting with after-hours if you prefer.")}
      ${q("Where are you based?", "Short Pump. We serve Richmond and Central Virginia, and good-fit businesses outside the area too.")}
    </div>`;

const answers = (band) => `
<section class="section v-tight ${band} rule-top" aria-labelledby="faq-h">
  <div class="wrap v-faq-grid">
    <div>
      <h2 class="h2" id="calc-h">What are missed calls costing you?</h2>
      ${calc}
    </div>
    <div>
      <h2 class="h2" id="faq-h">Straight answers.</h2>
      ${faq}
    </div>
  </div>
</section>`;

const finalCta = `
<section class="final-cta band-cobalt section v-tight" aria-labelledby="final-h">
  <div class="wrap final-grid">
    <div>
      <h2 class="h1" id="final-h">Never miss another job.</h2>
      <p class="lede" style="margin-top:24px">A free call with our team. We'll find where jobs are leaking and tell you straight whether AI can fix it.</p>
      <div class="btn-row" style="margin-top:32px"><a class="btn" href="/book/" data-loc="final-cta">${icon("calendar")}Book a free call ${icon("arrow", "icon-arrow")}</a></div>
    </div>
    <div class="final-phone">
      <small>Or call now. Our AI answers.</small>
      <a class="tnum" href="tel:+18046353682" data-loc="final-cta">(804) 635-3682</a>
      <small>No contract. Cancel anytime. Live in 7 days.</small>
    </div>
  </div>
</section>`;

const heroCopy = (line) => `<div class="v-copy">
        <p class="trade-line">${line}</p>
        <div class="v-phone"><small>Call it right now. Our AI answers.</small>${PHONE}</div>
        <div class="btn-row"><a class="btn" href="/book/" data-loc="hero">${icon("calendar")}Book a free call ${icon("arrow", "icon-arrow")}</a></div>
        <p class="v-note">Free call. No contract. Live in 7 days.</p>
      </div>`;

/* ----- version A: the scene is the hero ----- */
const A = `
<section class="va-hero" aria-labelledby="hero-h">
  <div class="wrap">
    <h1 class="display h1" id="hero-h">Every call, email and text. <span class="c-cobalt">Answered.</span></h1>
    <div class="va-grid">
      ${heroCopy("An AI receptionist that picks up, talks it through, and puts every lead in your CRM.")}
      <div class="flow" data-flow="switchboard">
        <div class="flow-bar">
          <span class="title">Watch one come in</span>
          <div class="flow-tabs" role="group" aria-label="Choose a channel">
            <button type="button" data-flow-channel="0" aria-pressed="true">Call</button><button type="button" data-flow-channel="1" aria-pressed="false">Email</button><button type="button" data-flow-channel="2" aria-pressed="false">Text</button>
          </div>
        </div>
        <div class="flow-stage"></div>
        ${say.replace("</p>", '<span class="sample-tag">Sample</span></p>')}
        ${steps}
      </div>
    </div>
  </div>
  <div class="fleet-stripe" data-draw aria-hidden="true"></div>
</section>
${industries("")}
${offer("band-steel")}
${answers("band-paper")}
${finalCta}`;

/* ----- version B: live-site hero with video, then a pinned scroll journey ----- */
const B = `
<section class="door" aria-labelledby="hero-h">
  <div class="wrap door-inner">
    <h1 class="display h1 door-title" id="hero-h">Your AI department, <span class="c-cobalt">for small business.</span></h1>
    <div class="door-copy">
      <p class="trade-line">AI that answers every call, email and text, then puts the lead in your CRM.</p>
      <div class="door-phone"><small>${icon("phone", "icon-sm")}Call it right now. Our AI answers.</small>${PHONE}</div>
      <div class="btn-row"><a class="btn" href="/book/" data-loc="hero">${icon("calendar")}Book a free call ${icon("arrow", "icon-arrow")}</a><a class="btn btn-line" href="#journey">See how it works</a></div>
      <p class="door-note">Free call. No contract. Live in 7 days.</p>
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
    </div>
  </div>
  <div class="fleet-stripe" data-draw aria-hidden="true"></div>
</section>
<section class="vb-journey" id="journey" data-flow-pin aria-labelledby="journey-h">
  <div class="wrap vb-grid">
    <div>
      <h2 class="h2" id="journey-h">Follow one lead, start to finish.</h2>
      <ol class="vb-steps">
        <li data-step="0"><span class="n">1</span><strong>It comes in</strong><p>A call, an email or a text. 9:42 PM, crew's gone home.</p></li>
        <li data-step="1"><span class="n">2</span><strong>AI picks up</strong><p>On the first ring, as your business. No voicemail.</p></li>
        <li data-step="2"><span class="n">3</span><strong>It talks or texts</strong><p>Name, address, the problem, how urgent. Then it books the job.</p></li>
        <li data-step="3"><span class="n">4</span><strong>Lead is logged</strong><p>In your own CRM account, or a Google Sheet. Nothing to type.</p></li>
      </ol>
    </div>
    <div class="flow" data-flow="journey">
      <div class="flow-stage"></div>
      ${say.replace("</p>", '<span class="sample-tag">Sample</span></p>')}
    </div>
  </div>
</section>
${offer("")}
${industries("band-paper")}
${answers("band-steel")}
${finalCta}
<script>
// Mirror the scene's current step onto the step list beside it.
(function () {
  var flow = document.querySelector('[data-flow="journey"]'), items = document.querySelectorAll(".vb-steps li");
  function paint() { var s = flow.dataset.step; items.forEach(function (li) { li.classList.toggle("is-on", li.dataset.step === s); }); }
  new MutationObserver(paint).observe(flow, { attributes: true, attributeFilter: ["data-step"] });
  items[0].classList.add("is-on");
})();
</script>`;

/* ----- version C: type-led hero over a full-width floor plan ----- */
const C = `
<section class="vc-hero" aria-labelledby="hero-h">
  <div class="wrap">
    <h1 class="display h1" id="hero-h">Your front desk, <span class="c-cobalt">answered by AI.</span></h1>
    <p class="trade-line">Calls, emails and texts come in. Our AI answers each one, and the lead lands in your CRM.</p>
    <div class="vc-actions">
      <a class="btn" href="/book/" data-loc="hero">${icon("calendar")}Book a free call ${icon("arrow", "icon-arrow")}</a>
      <div class="v-phone"><small>Or call. Our AI answers.</small>${PHONE}</div>
    </div>
  </div>
</section>
<section class="vc-plan" aria-labelledby="plan-h">
  <div class="wrap">
    <div class="flow" data-flow="plan">
      <div class="flow-bar">
        <h2 class="title" id="plan-h">Your AI department, from above</h2>
        <div class="flow-tabs" role="group" aria-label="Show one channel">
          <button type="button" data-flow-channel="all" aria-pressed="true">All</button><button type="button" data-flow-channel="0" aria-pressed="false">Calls</button><button type="button" data-flow-channel="1" aria-pressed="false">Email</button><button type="button" data-flow-channel="2" aria-pressed="false">Texts</button>
        </div>
      </div>
      <div class="flow-stage"></div>
      ${say.replace("</p>", '<span class="sample-tag">Sample</span></p>')}
    </div>
  </div>
  <ul class="vc-facts">
    <li><h3>Every channel, one desk</h3><p>Calls, emails and texts all reach the same AI agent, day or night.</p></li>
    <li><h3>It holds the conversation</h3><p>It speaks or texts as your business, gets the details and books the job.</p></li>
    <li><h3>Your own CRM account</h3><p>We build you a GoHighLevel account of your own. Every lead is logged there, or in a Google Sheet.</p></li>
  </ul>
</section>
${offer("")}
${industries("band-paper")}
${answers("band-steel")}
${finalCta}`;

const picker = `
<section class="pick">
  <div class="wrap">
    <h1 class="display h1">Three shorter homepages.</h1>
    <p class="lede" style="margin-top:20px">Each is six sections, the same length as the live site, with a three.js scene showing a call, email or text becoming a lead in the CRM.</p>
    <div class="pick-grid">
      <a href="/versions/a/"><h2>A. Switchboard</h2><p>The scene is the hero. It loops on its own; visitors can pick Call, Email or Text.</p><dl><dt>Hero</dt><dd>Headline, phone number, scene</dd><dt>Motion</dt><dd>Plays without scrolling</dd></dl><span class="link-arrow">Open version A ${icon("arrow")}</span></a>
      <a href="/versions/b/"><h2>B. Follow one lead</h2><p>Hero keeps the felt video, like the live site. The scene pins and plays as you scroll.</p><dl><dt>Hero</dt><dd>Headline, phone number, video</dd><dt>Motion</dt><dd>Scroll drives the story</dd></dl><span class="link-arrow">Open version B ${icon("arrow")}</span></a>
      <a href="/versions/c/"><h2>C. Floor plan</h2><p>Centered headline over a full-width plan of the department, with leads flowing through all day.</p><dl><dt>Hero</dt><dd>Headline, then the plan</dd><dt>Motion</dt><dd>Continuous, filter by channel</dd></dl><span class="link-arrow">Open version C ${icon("arrow")}</span></a>
    </div>
  </div>
</section>`;

const out = (dir, html) => { const d = path.join(SITE, "versions", dir); fs.mkdirSync(d, { recursive: true }); fs.writeFileSync(path.join(d, "index.html"), html); };
out("", page("", "Homepage versions for review", picker));
out("a", page("a", "Version A: Switchboard", A));
out("b", page("b", "Version B: Follow one lead", B));
out("c", page("c", "Version C: Floor plan", C));
console.log("Built site/versions/{,a,b,c}/index.html");
