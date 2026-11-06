(function () {
  "use strict";

  var CFG = window.BD_CONFIG || {};
  var doc = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function store(kind) { try { return window[kind]; } catch (e) { return null; } }
  var session = store("sessionStorage");
  var local = store("localStorage");

  /* ---------- Analytics ---------- */
  function loadScript(src, attrs) {
    var s = document.createElement("script");
    s.async = true; s.src = src;
    if (attrs) Object.keys(attrs).forEach(function (k) { s.setAttribute(k, attrs[k]); });
    document.head.appendChild(s);
  }
  if (CFG.ga4Id) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", CFG.ga4Id);
    loadScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(CFG.ga4Id));
  }
  if (CFG.plausibleDomain) {
    window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments); };
    loadScript("https://plausible.io/js/script.js", { "data-domain": CFG.plausibleDomain, defer: "" });
  }
  if (CFG.clarityId) {
    (function (c, l, a, r, i) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      var t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      var y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CFG.clarityId);
  }
  function track(name, props) {
    props = props || {};
    try {
      if (window.gtag) window.gtag("event", name, props);
      if (window.plausible) window.plausible(name, { props: props });
      if (window.clarity) window.clarity("event", name);
    } catch (e) { /* analytics must never break the page */ }
  }
  window.bdTrack = track;

  /* ---------- Attribution (UTM + landing) ---------- */
  var ATTR_KEY = "bd_attrib";
  function readAttrib() {
    try { return JSON.parse((session && session.getItem(ATTR_KEY)) || "null"); } catch (e) { return null; }
  }
  (function captureAttrib() {
    var existing = readAttrib();
    var params = new URLSearchParams(location.search);
    var keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "src"];
    var fresh = {};
    var hasUtm = false;
    keys.forEach(function (k) { var v = params.get(k); if (v) { fresh[k] = v.slice(0, 120); hasUtm = true; } });
    if (!existing || hasUtm) {
      fresh.landing_page = location.pathname;
      fresh.referrer = (document.referrer || "").slice(0, 200);
      try { session && session.setItem(ATTR_KEY, JSON.stringify(fresh)); } catch (e) {}
    }
  })();
  function fillAttrib(form) {
    var a = readAttrib() || {};
    var map = { utm_source: a.utm_source || a.src || "", utm_medium: a.utm_medium || "", utm_campaign: a.utm_campaign || "", landing_page: a.landing_page || "", referrer: a.referrer || "", page: location.pathname };
    Object.keys(map).forEach(function (k) {
      var input = form.querySelector('input[name="' + k + '"]');
      if (!input) { input = document.createElement("input"); input.type = "hidden"; input.name = k; form.appendChild(input); }
      input.value = map[k];
    });
  }

  /* ---------- Header menu ---------- */
  var header = $(".site-header");
  var menuBtn = $(".menu-btn");
  if (header && menuBtn) {
    menuBtn.addEventListener("click", function () {
      var open = header.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.querySelector("use").setAttribute("href", "/assets/icons.svg#" + (open ? "i-close" : "i-menu"));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("menu-open")) { menuBtn.click(); menuBtn.focus(); }
    });
  }

  /* ---------- Click tracking ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (href.indexOf("tel:") === 0) track("call_click", { location: a.getAttribute("data-loc") || location.pathname });
    else if (href.indexOf("/book/") === 0) track("book_cta_click", { location: a.getAttribute("data-loc") || location.pathname });
    else if (href.indexOf("mailto:") === 0) track("email_click", {});
  });

  /* ---------- Hero video sound ---------- */
  $$("[data-sound-toggle]").forEach(function (btn) {
    var vid = document.getElementById(btn.getAttribute("data-sound-toggle"));
    if (!vid) return;
    var label = btn.querySelector("span");
    var use = btn.querySelector("use");
    btn.addEventListener("click", function () {
      if (vid.muted) {
        vid.muted = false; vid.currentTime = 0; var p = vid.play(); if (p && p.catch) p.catch(function () {});
        label.textContent = "Mute"; use.setAttribute("href", "/assets/icons.svg#i-mute");
        btn.setAttribute("aria-pressed", "true"); track("video_sound_on", {});
      } else {
        vid.muted = true; label.textContent = "Play with sound"; use.setAttribute("href", "/assets/icons.svg#i-volume");
        btn.setAttribute("aria-pressed", "false");
      }
    });
    if (reduceMotion) { vid.removeAttribute("autoplay"); vid.pause(); }
  });

  /* ---------- Forms (Netlify) ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function validate(form) {
    var firstBad = null;
    $$("[data-err]", form).forEach(function (n) { n.remove(); });
    $$("input, select, textarea", form).forEach(function (el) {
      if (el.type === "hidden" || el.closest(".hp")) return;
      el.removeAttribute("aria-invalid");
      var msg = "";
      var val = (el.value || "").trim();
      if (el.required && el.type === "checkbox" && !el.checked) msg = "Please tick this box to continue.";
      else if (el.required && !val) msg = "Please fill this in.";
      else if (val && el.type === "email" && !EMAIL_RE.test(val)) msg = "That email doesn't look right. Check for a typo.";
      else if (val && el.type === "tel" && val.replace(/\D/g, "").length < 10) msg = "Please enter a 10-digit phone number.";
      if (msg) {
        el.setAttribute("aria-invalid", "true");
        var err = document.createElement("p"); err.className = "field-error"; err.setAttribute("data-err", "");
        err.id = (el.id || el.name) + "-err"; err.textContent = msg;
        el.setAttribute("aria-describedby", err.id);
        (el.closest(".field") || el.parentNode).appendChild(err);
        if (!firstBad) firstBad = el;
      }
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }
  function encode(form) {
    var fd = new FormData(form);
    var parts = [];
    fd.forEach(function (v, k) { parts.push(encodeURIComponent(k) + "=" + encodeURIComponent(v)); });
    return parts.join("&");
  }
  $$("form[data-bd-form]").forEach(function (form) {
    fillAttrib(form);
    form.setAttribute("novalidate", "");
    var started = false;
    form.addEventListener("input", function () {
      if (!started) { started = true; track("form_start", { form: form.getAttribute("name") }); }
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (typeof form.bdBeforeSubmit === "function") form.bdBeforeSubmit();
      if (!validate(form)) return;
      fillAttrib(form);
      var btn = form.querySelector('[type="submit"]');
      var status = form.querySelector(".form-status");
      if (btn) { btn.setAttribute("aria-busy", "true"); btn.disabled = true; }
      if (status) { status.textContent = "Sending…"; status.classList.remove("is-error"); }
      fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: encode(form) })
        .then(function (r) {
          if (!r.ok) throw new Error("bad status " + r.status);
          var name = form.getAttribute("name");
          track(form.getAttribute("data-event") || (name + "_submit"), { form: name });
          var thanks = form.getAttribute("data-thanks");
          if (thanks) { location.href = thanks; return; }
          if (status) status.textContent = "Sent. We'll be in touch.";
          form.reset();
        })
        .catch(function () {
          if (status) {
            status.classList.add("is-error");
            status.textContent = "That didn't send. Check your connection and try again, or call " + (CFG.phone || "(804) 635-3682") + ".";
          }
        })
        .then(function () { if (btn) { btn.removeAttribute("aria-busy"); btn.disabled = false; } });
    });
  });

  /* ---------- Missed-call calculator ---------- */
  var money = function (n) { return "$" + Math.round(n).toLocaleString("en-US"); };
  $$("[data-calc]").forEach(function (calc) {
    var trade = $("[name=calc_trade]", calc);
    var calls = $("[name=calc_calls]", calc);
    var value = $("[name=calc_value]", calc);
    var close = $("[name=calc_close]", calc);
    var callsOut = $("[data-calls-out]", calc);
    var mo = $("[data-out-month]", calc);
    var yr = $("[data-out-year]", calc);
    var used = false;
    function num(el, d) { var v = parseFloat(String(el.value).replace(/[^0-9.]/g, "")); return isFinite(v) ? v : d; }
    function run() {
      var c = num(calls, 0), v = num(value, 0), p = Math.min(Math.max(num(close, 0), 0), 100) / 100;
      var m = c * 4.33 * p * v;
      if (callsOut) callsOut.textContent = c;
      mo.textContent = money(m);
      yr.textContent = money(m * 12) + " a year";
      calc.setAttribute("data-month", Math.round(m));
      var hidden = $$("[data-calc-hidden]", calc.parentNode);
      hidden.forEach(function (h) {
        var k = h.getAttribute("data-calc-hidden");
        h.value = k === "summary" ? (c + " missed calls/wk × " + money(v) + " job × " + Math.round(p * 100) + "% close = " + money(m) + "/mo") : "";
      });
    }
    function userInput() {
      run();
      if (!used) { used = true; track("calc_used", { trade: trade ? trade.value : "" }); }
    }
    if (trade) trade.addEventListener("change", function () {
      var opt = trade.options[trade.selectedIndex];
      if (opt && opt.dataset.value) { value.value = opt.dataset.value; close.value = opt.dataset.close; }
      userInput();
    });
    [calls, value, close].forEach(function (el) { el.addEventListener("input", userInput); });
    var preset = calc.getAttribute("data-preset");
    if (preset && trade) { trade.value = preset; var o = trade.options[trade.selectedIndex]; if (o && o.dataset.value) { value.value = o.dataset.value; close.value = o.dataset.close; } }
    run();
    var emailBtn = $("[data-calc-email]", calc);
    var emailForm = $(".calc-email", calc);
    if (emailBtn && emailForm) emailBtn.addEventListener("click", function () {
      emailForm.classList.add("is-open"); emailBtn.setAttribute("aria-expanded", "true");
      var first = emailForm.querySelector("input:not([type=hidden])"); if (first) first.focus();
    });
  });

  /* ---------- SAMPLE console tabs ---------- */
  $$("[data-console]").forEach(function (con) {
    var data = { today: ["37", "35", "2", "9"], week: ["214", "206", "8", "51"] };
    var subs = { today: ["since midnight", "on the first ring", "voicemail before go-live", "estimates on the calendar"], week: ["Mon to Sun", "on the first ring", "all called back", "estimates on the calendar"] };
    $$("[role=tab]", con).forEach(function (tab) {
      tab.addEventListener("click", function () {
        var k = tab.getAttribute("data-range");
        $$("[role=tab]", con).forEach(function (t) { t.setAttribute("aria-selected", String(t === tab)); });
        $$(".gauge", con).forEach(function (g, i) {
          var v = g.querySelector(".val"); var s = g.querySelector(".sub");
          if (v) v.textContent = data[k][i]; if (s) s.textContent = subs[k][i];
        });
      });
    });
  });

  /* ---------- Industries accordion (touch: first tap opens) ---------- */
  $$(".hacc").forEach(function (acc) {
    var coarse = window.matchMedia("(hover: none)").matches && window.innerWidth > 760;
    if (!coarse) return;
    $$(".hacc-item", acc).forEach(function (item) {
      item.addEventListener("click", function (e) {
        if (!item.classList.contains("is-open")) {
          e.preventDefault();
          $$(".hacc-item", acc).forEach(function (i) { i.classList.remove("is-open"); });
          item.classList.add("is-open");
        }
      });
    });
  });

  /* ---------- Book page ---------- */
  var book = $("[data-book]");
  if (book) {
    var params = new URLSearchParams(location.search);
    var biz = (params.get("biz") || "").replace(/[^\w\s&'.,-]/g, "").slice(0, 60).trim();
    var tradeP = (params.get("trade") || "").replace(/[^\w\s&-]/g, "").slice(0, 40).trim();
    if (biz) {
      var h = $("[data-book-title]");
      if (h) h.textContent = "Your custom demo for " + biz + ".";
      var l = $("[data-book-lede]");
      if (l) l.textContent = "You've seen the demo. Pick a time and we'll show you what it would take off your plate at " + biz + (tradeP ? ", built for " + tradeP : "") + ".";
      $$('input[name="business"]').forEach(function (i) { if (!i.value) i.value = biz; });
    }
    var slot = $("[data-cal-slot]");
    var fallback = $("[data-cal-fallback]");
    if (CFG.ghlCalendarUrl && slot) {
      var iframe = document.createElement("iframe");
      var a = readAttrib() || {};
      var u = CFG.ghlCalendarUrl + (CFG.ghlCalendarUrl.indexOf("?") > -1 ? "&" : "?") + "utm_source=" + encodeURIComponent(a.utm_source || a.src || "website");
      iframe.src = u; iframe.title = "Book a call with Bright Department"; iframe.loading = "lazy"; iframe.id = "ghl-cal";
      slot.innerHTML = ""; slot.appendChild(iframe);
      loadScript("https://link.msgsndr.com/js/form_embed.js");
      if (fallback) fallback.hidden = true;
      track("book_view", { calendar: "ghl", personalized: !!biz });
    } else {
      if (slot) slot.hidden = true;
      track("book_view", { calendar: "fallback", personalized: !!biz });
    }
  }

  /* ---------- Scorecard ---------- */
  var sc = $("[data-scorecard]");
  if (sc) initScorecard(sc);

  function initScorecard(root) {
    var LENSES = {
      reach: { name: "Reach", fix: ["AI search optimization: get found on Google, ChatGPT and Perplexity", "Job photos turned into posts you approve", "A Google Business Profile that's current and getting calls"], leak: 0.15 },
      acquire: { name: "Acquire", fix: ["AI receptionist that answers every call and text, 24/7", "Missed-call text-back in under a minute", "Booking straight onto your calendar"], leak: 0.35 },
      convert: { name: "Convert", fix: ["Quote follow-up on Day 1, 3, 7 and 14", "Appointment reminders that cut no-shows", "Deposit and invoice handoffs that don't get lost"], leak: 0.25 },
      expand: { name: "Expand", fix: ["A review request after every finished job", "Rebooking customers who are due", "Referral asks that go out automatically"], leak: 0.15 }
    };
    var qs = $$(".sc-q", root);
    var total = qs.length;
    var idx = 0;
    var bar = $(".sc-progress span", root);
    var back = $("[data-sc-back]", root);
    var next = $("[data-sc-next]", root);
    var count = $("[data-sc-count]", root);
    var results = $(".sc-results", root);
    var nav = $(".sc-nav", root);
    var started = false;
    function show(i) {
      qs.forEach(function (q, n) { q.classList.toggle("is-active", n === i); });
      bar.style.transform = "scaleX(" + (i / total) + ")";
      back.disabled = i === 0;
      count.textContent = (i + 1) + " of " + total + " · " + (qs[i].getAttribute("data-lens-label") || "");
      var answered = isAnswered(qs[i]);
      next.disabled = !answered;
      next.querySelector("span").textContent = i === total - 1 ? "See my bottleneck" : "Next";
      var h = qs[i].querySelector("h2, label");
      if (h && i > 0) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    }
    function isAnswered(q) {
      var radios = $$("input[type=radio]", q);
      if (radios.length) return radios.some(function (r) { return r.checked; });
      return $$("input", q).every(function (inp) { return String(inp.value).trim() !== ""; });
    }
    root.addEventListener("input", function (e) {
      if (!started) { started = true; track("scorecard_start", {}); }
      next.disabled = !isAnswered(qs[idx]);
    });
    root.addEventListener("change", function (e) {
      if (e.target.type === "radio") { next.disabled = false; }
    });
    back.addEventListener("click", function () { if (idx > 0) { idx--; show(idx); } });
    next.addEventListener("click", function () {
      if (!isAnswered(qs[idx])) return;
      if (idx < total - 1) { idx++; show(idx); } else finish();
    });
    function finish() {
      var scores = { reach: [], acquire: [], convert: [], expand: [] };
      $$("input[type=radio]:checked", root).forEach(function (r) {
        var lens = r.closest(".sc-q").getAttribute("data-lens");
        if (scores[lens]) scores[lens].push(parseInt(r.value, 10));
      });
      var pct = {};
      Object.keys(scores).forEach(function (k) {
        var arr = scores[k]; var sum = arr.reduce(function (a, b) { return a + b; }, 0);
        pct[k] = arr.length ? Math.round((sum / (arr.length * 3)) * 100) : 0;
      });
      var weakest = Object.keys(pct).sort(function (a, b) { return pct[a] - pct[b]; })[0];
      var leads = parseFloat($("[name=sc_leads]", root).value) || 0;
      var job = parseFloat($("[name=sc_job]", root).value) || 0;
      var gap = (100 - pct[weakest]) / 100;
      var monthly = leads * 4.33 * LENSES[weakest].leak * gap * 0.3 * job;

      $$(".sc-q", root).forEach(function (q) { q.classList.remove("is-active"); });
      nav.hidden = true;
      bar.style.transform = "scaleX(1)";
      results.classList.add("is-active");
      $("[data-sc-weak]", root).textContent = LENSES[weakest].name;
      $("[data-sc-cost]", root).textContent = money(monthly);
      var bars = $("[data-sc-bars]", root);
      bars.innerHTML = "";
      Object.keys(pct).forEach(function (k) {
        var row = document.createElement("div");
        row.className = "sc-bar" + (k === weakest ? " weak" : "");
        row.innerHTML = '<span></span><div class="track" role="img"><div class="fill"></div></div><span class="pct"></span>';
        row.children[0].textContent = LENSES[k].name;
        row.children[1].setAttribute("aria-label", LENSES[k].name + " score " + pct[k] + " out of 100");
        row.children[2].textContent = pct[k];
        bars.appendChild(row);
        requestAnimationFrame(function () { requestAnimationFrame(function () { row.querySelector(".fill").style.transform = "scaleX(" + (pct[k] / 100) + ")"; }); });
      });
      var fixes = $("[data-sc-fixes]", root);
      fixes.innerHTML = "";
      LENSES[weakest].fix.forEach(function (f) {
        var li = document.createElement("li");
        li.innerHTML = '<svg class="icon" aria-hidden="true"><use href="/assets/icons.svg#i-check"/></svg><span></span>';
        li.querySelector("span").textContent = f; fixes.appendChild(li);
      });
      var form = $("form[name=scorecard]", root.parentNode) || $("form[name=scorecard]");
      if (form) {
        form.querySelector("[name=weakest_stage]").value = LENSES[weakest].name;
        form.querySelector("[name=scores]").value = Object.keys(pct).map(function (k) { return LENSES[k].name + " " + pct[k]; }).join(", ");
        form.querySelector("[name=est_monthly_leak]").value = money(monthly);
        form.querySelector("[name=answers]").value = $$("input[type=radio]:checked", root).map(function (r) { return r.name + "=" + r.value; }).join("; ") + "; leads/wk=" + leads + "; job=" + job;
      }
      var bookLink = $("[data-sc-book]", root);
      if (bookLink) bookLink.href = "/book/?src=scorecard&stage=" + encodeURIComponent(LENSES[weakest].name);
      track("scorecard_complete", { weakest: LENSES[weakest].name });
      results.querySelector("h2").setAttribute("tabindex", "-1");
      results.querySelector("h2").focus();
      results.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
    show(0);
  }

  /* ---------- Motion ---------- */
  // Fleet stripe draw on load
  $$(".fleet-stripe[data-draw]").forEach(function (s) { if (!reduceMotion) s.classList.add("is-drawn"); });

  // Generic reveal (IntersectionObserver, no library needed)
  var reveals = $$("[data-reveal]");
  if (!reduceMotion && "IntersectionObserver" in window && reveals.length) {
    doc.classList.add("reveal-ready");
    reveals.forEach(function (el) { el.classList.add("reveal"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // Call trace: build path geometry from the real node positions
  var trace = $("[data-trace]");
  function layoutTrace() {
    if (!trace) return null;
    var track = $(".trace-track", trace);
    var svg = $(".trace-svg", trace);
    var steps = $$(".trace-step", trace);
    var nodes = steps.filter(function (s) { return !s.classList.contains("missed"); }).map(function (s) { return s.querySelector(".node"); });
    var tr = track.getBoundingClientRect();
    svg.setAttribute("viewBox", "0 0 " + svg.clientWidth + " " + track.offsetHeight);
    svg.style.height = track.offsetHeight + "px";
    function center(n) { var r = n.getBoundingClientRect(); return { x: r.left - tr.left + r.width / 2, y: r.top - tr.top + r.height / 2 }; }
    var first = center(nodes[0]); var last = center(nodes[nodes.length - 1]);
    var d = "M" + first.x + " " + first.y + " L" + last.x + " " + last.y;
    $(".base", svg).setAttribute("d", d);
    $(".live", svg).setAttribute("d", d);
    var missed = $(".trace-step.missed .miss-card", trace);
    if (missed) {
      var mr = missed.getBoundingClientRect();
      var mx = mr.left - tr.left; var my = mr.top - tr.top + 28;
      var md = "M" + first.x + " " + first.y + " C " + first.x + " " + (first.y + 50) + ", " + (mx - 10) + " " + (my - 30) + ", " + mx + " " + my;
      $(".miss", svg).setAttribute("d", md);
    }
    return { steps: steps };
  }
  var traceInfo = layoutTrace();
  if (trace) {
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { layoutTrace(); if (window.ScrollTrigger) window.ScrollTrigger.refresh(); }, 150); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { layoutTrace(); if (window.ScrollTrigger) window.ScrollTrigger.refresh(); });
  }

  function litAll() { if (traceInfo) traceInfo.steps.forEach(function (s) { s.classList.add("is-lit"); }); }

  if (reduceMotion || !window.gsap || !window.ScrollTrigger) {
    litAll();
    return;
  }
  var gsap = window.gsap; var ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);

  if (trace) {
    var live = $(".trace-svg .live", trace);
    var miss = $(".trace-svg .miss", trace);
    var len = function (p) { try { return p.getTotalLength(); } catch (e) { return 1000; } };
    gsap.set(live, { strokeDasharray: function () { return len(live); }, strokeDashoffset: function () { return len(live); } });
    gsap.to(live, {
      strokeDashoffset: 0, ease: "none",
      scrollTrigger: { trigger: $(".trace-track", trace), start: "top 60%", end: "bottom 65%", scrub: 0.6, invalidateOnRefresh: true }
    });
    if (miss) {
      gsap.fromTo(miss, { opacity: 0 }, { opacity: 1, ease: "none", scrollTrigger: { trigger: $(".trace-step.missed", trace), start: "top 75%", end: "top 50%", scrub: true } });
    }
    traceInfo.steps.forEach(function (s) {
      ST.create({ trigger: s, start: "top 62%", onEnter: function () { s.classList.add("is-lit"); }, onLeaveBack: function () { s.classList.remove("is-lit"); } });
    });
  }

  // Manifesto: words scrub from faint to full
  $$("[data-scrub-words]").forEach(function (p) {
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var s = document.createElement("span"); s.className = "w"; s.textContent = part; frag.appendChild(s);
          });
          child.parentNode.replaceChild(frag, child);
        } else if (child.nodeType === 1) walk(child);
      });
    };
    walk(p);
    gsap.fromTo($$(".w", p), { opacity: 0.14 }, {
      opacity: 1, stagger: 0.08, ease: "none",
      scrollTrigger: { trigger: p, start: "top 78%", end: "bottom 42%", scrub: 0.4 }
    });
  });

  // Console: grows into place, then dims as it leaves
  $$("[data-console-motion]").forEach(function (c) {
    gsap.fromTo(c, { scale: 0.88, rotateX: 8, opacity: 0.55 }, {
      scale: 1, rotateX: 0, opacity: 1, ease: "none",
      scrollTrigger: { trigger: c, start: "top 92%", end: "top 38%", scrub: 0.5 }
    });
    gsap.to(c, { opacity: 0.35, ease: "none", scrollTrigger: { trigger: c, start: "bottom 30%", end: "bottom top", scrub: true } });
  });
})();
