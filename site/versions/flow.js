// Workflow scenes for the homepage review versions.
// One engine, three stagings: "switchboard" (auto loop), "journey" (scroll-scrubbed), "plan" (floor plan, continuous).
import * as THREE from "three";

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const tok = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (u, a, b) => clamp((u - a) / (b - a));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const V = (x, y, z) => new THREE.Vector3(x, y, z);

const P = {
  ink: tok("--ink") || "#111216",
  paper: tok("--paper") || "#ffffff",
  cobalt: tok("--cobalt") || "#1f3fd1",
  tint: tok("--cobalt-tint") || "#e7ebfb",
  grey: tok("--ground-2") || "#eef0f2",
  steel: "#aab0ba",
  rule: "#cfd3da"
};

const SAY = [
  [["Caller", "Water's coming through the kitchen ceiling."], ["AI", "I've marked it urgent. What's the address?"], ["AI", "You're booked: Wednesday, 8 to 10 AM."]],
  [["Email", "Can I get a quote on a roof replacement?"], ["AI", "Happy to. What's the address and best number?"], ["AI", "Estimate visit set for Thursday morning."]],
  [["Text", "Do you have anyone free this week?"], ["AI", "Yes. What do you need done, and where?"], ["AI", "Booked: Friday, 1 to 3 PM."]]
];

/* ---------- primitives ---------- */
const hullMat = new THREE.MeshBasicMaterial({ color: P.ink, side: THREE.BackSide });
const matCache = {};
const flat = (color) => matCache[color] || (matCache[color] = new THREE.MeshBasicMaterial({ color, vertexColors: true }));

function shade(geo) {
  const n = geo.attributes.normal, c = new Float32Array(n.count * 3);
  for (let i = 0; i < n.count; i++) {
    const s = n.getY(i) > 0.5 ? 1 : Math.abs(n.getX(i)) > 0.5 ? 0.55 : 0.76;
    c[i * 3] = c[i * 3 + 1] = c[i * 3 + 2] = s;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(c, 3));
  return geo;
}
// A flat-painted box with an ink silhouette. Origin sits at the centre of its base.
function block(w, h, d, color, hull = 0.05) {
  const geo = shade(new THREE.BoxGeometry(w, h, d)); geo.translate(0, h / 2, 0);
  const m = new THREE.Mesh(geo, flat(color));
  if (hull) {
    const hg = new THREE.BoxGeometry(w + hull * 2, h + hull * 2, d + hull * 2); hg.translate(0, h / 2, 0);
    m.add(new THREE.Mesh(hg, hullMat));
  }
  return m;
}
const put = (m, x, y, z, parent) => { m.position.set(x, y, z); if (parent) parent.add(m); return m; };
// A strip that grows from its left end.
function dash(w, color, d = 0.14) {
  const geo = shade(new THREE.BoxGeometry(w, 0.05, d)); geo.translate(w / 2, 0.025, 0);
  return new THREE.Mesh(geo, flat(color));
}

function makePhone() {
  const g = new THREE.Group(), tilt = new THREE.Group(); g.add(tilt);
  put(block(1.0, 1.9, 0.2, P.ink), 0, 0, 0, tilt);
  put(block(0.8, 1.45, 0.05, P.tint, 0), 0, 0.28, 0.1, tilt);
  put(block(0.3, 0.07, 0.05, P.cobalt, 0), 0, 0.12, 0.1, tilt);
  tilt.rotation.x = -0.3;
  g.userData.bob = tilt;
  return g;
}
function makeEnvelope() {
  const g = new THREE.Group(), tilt = new THREE.Group(); g.add(tilt);
  put(block(1.7, 1.1, 0.16, P.paper), 0, 0, 0, tilt);
  [-1, 1].forEach((s) => {
    const f = block(1.0, 0.06, 0.04, P.ink, 0);
    f.position.set(s * 0.42, 0.8, 0.09); f.rotation.z = s * -0.62; tilt.add(f);
  });
  put(block(0.28, 0.28, 0.04, P.cobalt, 0), 0.56, 0.12, 0.09, tilt);
  tilt.rotation.x = -0.3;
  g.userData.bob = tilt;
  return g;
}
function makeBubble() {
  const g = new THREE.Group(), tilt = new THREE.Group(); g.add(tilt);
  put(block(0.42, 0.42, 0.3, P.cobalt), -0.45, 0.02, 0, tilt).rotation.z = 0.785;
  put(block(1.7, 1.0, 0.32, P.cobalt), 0, 0.3, 0, tilt);
  [-0.42, 0, 0.42].forEach((x) => put(block(0.2, 0.2, 0.05, P.paper, 0), x, 0.7, 0.17, tilt));
  tilt.rotation.x = -0.3;
  g.userData.bob = tilt;
  return g;
}
function makeAgent() {
  const g = new THREE.Group();
  put(block(2.7, 0.3, 2.7, P.ink), 0, 0, 0, g);
  const core = put(block(1.8, 1.8, 1.8, P.cobalt), 0, 0.3, 0, g);
  const bars = [];
  for (let i = 0; i < 5; i++) {
    const geo = shade(new THREE.BoxGeometry(0.16, 1, 0.05));
    const b = new THREE.Mesh(geo, flat(P.paper));
    b.position.set(-0.56 + i * 0.28, 1.2, 0.93); b.scale.y = 0.18; g.add(b); bars.push(b);
  }
  const lamp = put(block(0.5, 0.16, 0.5, P.paper), 0, 2.1, 0, g);
  g.userData = { bars, core, lamp };
  return g;
}
function makeCrm(withHistory) {
  const g = new THREE.Group();
  put(block(4.6, 0.16, 3.4, P.ink), 0, 0, 0, g);
  put(block(1.7, 0.16, 0.5, P.ink), -1.45, 0, -1.9, g);
  put(block(4.3, 0.12, 3.1, P.paper, 0), 0, 0.16, 0, g);
  put(block(4.3, 0.04, 0.5, P.tint, 0), 0, 0.28, -1.3, g);
  [-0.72, 0.72].forEach((x) => put(block(0.05, 0.05, 3.1, P.ink, 0), x, 0.28, 0, g));
  put(block(4.3, 0.05, 0.05, P.ink, 0), 0, 0.28, -1.05, g);
  const slot = (i) => V(-1.43 + Math.floor(i / 3) * 1.43, 0.28, -0.6 + (i % 3) * 0.66);
  const cards = [];
  for (let i = 0; i < 9; i++) { const c = block(1.12, 0.12, 0.46, P.cobalt, 0.035); c.position.copy(slot(i)); c.visible = false; g.add(c); cards.push(c); }
  if (withHistory) [3, 4, 6].forEach((i) => { const c = block(1.12, 0.1, 0.46, P.grey, 0.035); c.position.copy(slot(i)); g.add(c); });
  g.userData = { cards, slot };
  return g;
}
function makeSheet() {
  const g = new THREE.Group();
  put(block(3.0, 0.14, 2.5, P.paper), 0, 0, 0, g);
  put(block(3.0, 0.04, 0.42, P.grey, 0), 0, 0.14, -1.04, g);
  [-0.75, 0, 0.75].forEach((x) => put(block(0.04, 0.045, 2.5, P.ink, 0), x, 0.14, 0, g));
  const rows = [];
  for (let r = 0; r < 5; r++) {
    const z = -0.62 + r * 0.42;
    put(block(3.0, 0.045, 0.04, P.ink, 0), 0, 0.14, z - 0.21, g);
    const old = [], fresh = [];
    for (let c = 0; c < 4; c++) {
      const x = -1.4 + c * 0.75;
      const o = dash(0.42 - (c % 2) * 0.12, P.steel); o.position.set(x, 0.14, z); g.add(o); old.push(o);
      const f = dash(0.5, P.cobalt, 0.2); f.position.set(x, 0.14, z); g.add(f); fresh.push(f);
    }
    rows.push({ old, fresh });
  }
  g.userData = { rows };
  return g;
}

const unit = new THREE.BoxGeometry(1, 0.03, 1);
function makeRoute(parent, pts, w = 0.16, y = 0) {
  const segs = []; let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1], len = a.distanceTo(b);
    if (len < 1e-4) continue;
    const dir = b.clone().sub(a).normalize(), rot = -Math.atan2(dir.z, dir.x);
    const base = new THREE.Mesh(unit, new THREE.MeshBasicMaterial({ color: P.rule }));
    base.rotation.y = rot; base.scale.set(len + w, 1, w); base.position.copy(a).addScaledVector(dir, len / 2); base.position.y = y;
    const live = new THREE.Mesh(unit, new THREE.MeshBasicMaterial({ color: P.cobalt }));
    live.rotation.y = rot; live.visible = false;
    parent.add(base, live);
    segs.push({ a, dir, len, start: total, live });
    total += len;
  }
  return {
    set(p) {
      const d = clamp(p) * total;
      segs.forEach((s) => {
        const cur = clamp(d - s.start, 0, s.len);
        s.live.visible = cur > 0.001;
        s.live.scale.set(cur + w, 1.4, w);
        s.live.position.copy(s.a).addScaledVector(s.dir, cur / 2); s.live.position.y = y + 0.012;
      });
    },
    at(p, out) {
      const d = clamp(p) * total; let s = segs[segs.length - 1];
      for (let i = 0; i < segs.length; i++) if (d <= segs[i].start + segs[i].len) { s = segs[i]; break; }
      return out.copy(s.a).addScaledVector(s.dir, clamp(d - s.start, 0, s.len));
    }
  };
}

/* ---------- staging 1 and 2: the line ---------- */
function buildLine(vertical) {
  const root = new THREE.Group(), labels = [];
  const Pt = (a, b, y = 0) => (vertical ? V(b * 0.9, y, a * 1.1) : V(a, y, b));
  const label = (text, sub, pos) => labels.push({ text, sub, pos });
  const tmp = V(0, 0, 0);

  const defs = [["Call", makePhone, -3.3], ["Email", makeEnvelope, 0], ["Text", makeBubble, 3.3]];
  const sources = defs.map(([name, make, b]) => {
    const g = make(); g.position.copy(Pt(-6.2, b)); root.add(g);
    label(name, "", Pt(-6.2, b).add(V(0, 0, 0.75)));
    return g;
  });
  const agent = makeAgent(); agent.position.copy(Pt(0, 0)); root.add(agent);
  label("AI agent", "Answers as your business", Pt(0, 0).add(V(0, 0, 1.75)));
  const crm = makeCrm(true); crm.position.copy(Pt(6.2, -2.1)); root.add(crm);
  label("Your CRM", "Your own GoHighLevel account", Pt(6.2, -2.1).add(V(0, 0, 2.3)));
  const sheet = makeSheet(); sheet.position.copy(Pt(6.0, 2.7)); root.add(sheet);
  label("Google Sheet", "If you'd rather keep it simple", Pt(6.0, 2.7).add(V(0, 0, 1.85)));

  const inA = vertical ? -6.0 : -5.2;
  const routesIn = defs.map(([, , b]) => makeRoute(root, [Pt(inA, b), Pt(-3.1, b), Pt(-3.1, 0), Pt(-1.55, 0)]));
  const routeCrm = makeRoute(root, [Pt(1.55, 0), Pt(3.1, 0), Pt(3.1, -2.1), Pt(vertical ? 4.6 : 3.85, -2.1)]);
  const routeSheet = makeRoute(root, [Pt(1.55, 0), Pt(3.1, 0), Pt(3.1, 2.7), Pt(vertical ? 4.85 : 4.45, 2.7)]);

  const packets = defs.map(() => { const p = block(0.36, 0.36, 0.36, P.ink); p.visible = false; root.add(p); return p; });
  const lead = block(0.8, 0.14, 0.5, P.cobalt); lead.visible = false; root.add(lead);
  const chip = block(0.5, 0.14, 0.3, P.cobalt); chip.visible = false; root.add(chip);

  function update(s) {
    const { u, chans, time, runs } = s;
    sources.forEach((g, i) => {
      const on = chans.indexOf(i) > -1, r = seg(u, 0, 0.14);
      g.userData.bob.position.y = on && r < 1 ? Math.abs(Math.sin(r * Math.PI * 3)) * 0.28 : 0;
      g.userData.bob.rotation.z = on && r < 1 ? Math.sin(r * Math.PI * 9) * 0.07 : 0;
      const p = on ? seg(u, 0.12, 0.4) : 0;
      routesIn[i].set(p);
      packets[i].visible = on && p > 0 && p < 1;
      if (packets[i].visible) routesIn[i].at(p, packets[i].position);
    });
    const k = seg(u, 0.4, 0.7), talking = k > 0 && k < 1;
    agent.userData.bars.forEach((b, i) => { b.scale.y = talking ? 0.22 + 0.78 * Math.abs(Math.sin(time * 7 + i * 1.3 + k * 9)) : 0.18; });
    agent.userData.lamp.material = flat(u >= 0.38 && u < 0.72 ? P.paper : P.steel);
    const q = seg(u, 0.7, 0.9);
    routeCrm.set(q); routeSheet.set(q);
    lead.visible = q > 0 && q < 1; chip.visible = lead.visible;
    if (lead.visible) { routeCrm.at(q, lead.position); lead.position.y = 0.03; routeSheet.at(q, chip.position); chip.position.y = 0.03; }
    const l = easeOut(seg(u, 0.9, 1)), row = runs % 3;
    crm.userData.cards.forEach((c, i) => {
      c.visible = i < 3 && (i < row || (i === row && u >= 0.9));
      if (c.visible) { c.position.copy(crm.userData.slot(i)); if (i === row) c.position.y += (1 - l) * 1.3; }
    });
    sheet.userData.rows.forEach((r, i) => {
      r.old.forEach((o) => { o.visible = i <= row; });
      r.fresh.forEach((f, c) => { const x = i === row + 1 ? easeOut(seg(u, 0.9 + c * 0.02, 0.96 + c * 0.012)) : 0; f.visible = x > 0.001; f.scale.x = Math.max(x, 0.001); });
    });
    return { step: u < 0.3 ? 0 : u < 0.46 ? 1 : u < 0.7 ? 2 : 3, say: u < 0.4 ? 0 : Math.min(3, 1 + Math.floor(k * 3)), sayCh: chans[0] };
  }
  return { root, labels, update, dir: vertical ? V(0.16, 0.86, 0.62) : V(0.26, 0.74, 0.86), tmp };
}

/* ---------- staging 3: the department floor plan ---------- */
function buildPlan(vertical) {
  const root = new THREE.Group(), labels = [];
  const Pt = (a, b, y = 0) => (vertical ? V(b, y, a) : V(a, y, b));
  const label = (text, sub, pos, cls) => labels.push({ text, sub, pos, cls });
  const FY = -0.06;

  const floor = (a1, b1, a2, b2, color, lift = 0) => {
    const p = Pt(a1, b1), q = Pt(a2, b2);
    const m = block(Math.abs(q.x - p.x), 0.06, Math.abs(q.z - p.z), color, 0);
    m.position.set((p.x + q.x) / 2, FY - 0.06 + lift, (p.z + q.z) / 2); root.add(m);
  };
  floor(-8, -4.5, 8, 4.5, P.paper);
  floor(1, -4.5, 8, 0.6, P.tint, 0.012);
  const wall = (a1, b1, a2, b2) => {
    const p = Pt(a1, b1), q = Pt(a2, b2), t = 0.2;
    const m = block(Math.abs(q.x - p.x) + t, 0.5, Math.abs(q.z - p.z) + t, P.ink, 0);
    m.position.set((p.x + q.x) / 2, FY, (p.z + q.z) / 2); root.add(m);
  };
  wall(-8, -4.5, 8, -4.5); wall(-8, 4.5, 8, 4.5); wall(8, -4.5, 8, 4.5);
  [[-4.5, -3.7], [-2.3, -0.7], [0.7, 2.3], [3.7, 4.5]].forEach(([b1, b2]) => wall(-8, b1, -8, b2));
  [[-4.5, -2.7], [-1.3, 2.0], [3.4, 4.5]].forEach(([b1, b2]) => wall(1, b1, 1, b2));
  wall(1, 0.6, 8, 0.6);

  const doors = [-3, 0, 3];
  const icons = [makePhone, makeEnvelope, makeBubble].map((make, i) => {
    const g = make(); g.position.copy(Pt(-10, doors[i])); g.userData.bob.rotation.x = -0.75; root.add(g);
    label(["Calls", "Email", "Texts"][i], "", Pt(-10, doors[i]).add(V(0, 0, 1.0)));
    return g;
  });
  const agent = makeAgent(); agent.scale.setScalar(0.8); agent.position.copy(Pt(-2.6, 0)); root.add(agent);
  label("AI agent", "", Pt(-2.6, 0).add(V(0, 0, 1.45)));
  const crm = makeCrm(false); crm.scale.setScalar(0.95); crm.position.copy(Pt(4.5, -2.0)); if (vertical) crm.rotation.y = Math.PI / 2; root.add(crm);
  label("Your CRM", "", Pt(4.5, -2.0).add(vertical ? V(0, 0, 2.45) : V(0, 0, 1.85)));
  const sheet = makeSheet(); sheet.position.copy(Pt(4.5, 2.35)); if (vertical) sheet.rotation.y = Math.PI / 2; root.add(sheet);
  label("Google Sheet", "", Pt(4.5, 2.35).add(vertical ? V(0, 0, 1.7) : V(0, 0, 1.38)));
  label("Your own GoHighLevel sub-account", "", vertical ? Pt(8.9, 0) : Pt(0, -5.5), "is-plate");

  const routesIn = doors.map((b) => makeRoute(root, b === 0 ? [Pt(-9.1, 0), Pt(-4.3, 0)] : [Pt(-9.1, b), Pt(-6, b), Pt(-6, 0), Pt(-4.3, 0)], 0.12, FY + 0.02));
  const routeCrm = makeRoute(root, [Pt(-4.3, 0), Pt(-4.3, -2), Pt(2.3, -2)], 0.12, FY + 0.02);
  const routeSheet = makeRoute(root, [Pt(-4.3, 0), Pt(-4.3, 2.7), Pt(3.0, 2.7)], 0.12, FY + 0.02);
  routesIn.forEach((r) => r.set(0)); routeCrm.set(0); routeSheet.set(0);

  const POOL = 6, GAP = 2.0, T_IN = 2.3, T_TALK = 1.5, T_OUT = 2.4, T_LAND = 0.5, LIFE = T_IN + T_TALK + T_OUT + T_LAND;
  const pool = [];
  for (let i = 0; i < POOL; i++) {
    const raw = block(0.4, 0.4, 0.4, P.ink), card = block(0.8, 0.14, 0.5, P.cobalt), chip = block(0.46, 0.14, 0.3, P.cobalt);
    [raw, card, chip].forEach((m) => { m.visible = false; root.add(m); });
    pool.push({ raw, card, chip });
  }

  function update(s) {
    const { time, filter } = s;
    const newest = Math.floor(time / GAP);
    let talkCh = -1, talkK = 0, pulse = [0, 0, 0];
    pool.forEach((p) => { p.raw.visible = p.card.visible = p.chip.visible = false; });
    for (let k = Math.max(0, newest - POOL + 1); k <= newest; k++) {
      const age = time - k * GAP; if (age < 0 || age > LIFE) continue;
      const ch = filter == null ? k % 3 : filter, p = pool[k % POOL];
      if (age < T_IN) {
        const x = age / T_IN; p.raw.visible = true; routesIn[ch].at(easeIO(x), p.raw.position); p.raw.position.y = FY;
        if (x < 0.3) pulse[ch] = Math.abs(Math.sin((x / 0.3) * Math.PI * 2)) * 0.22;
      } else if (age < T_IN + T_TALK) {
        p.raw.visible = true; routesIn[ch].at(1, p.raw.position); p.raw.position.y = FY;
        talkCh = ch; talkK = (age - T_IN) / T_TALK;
      } else if (age < T_IN + T_TALK + T_OUT) {
        const x = easeIO((age - T_IN - T_TALK) / T_OUT);
        p.card.visible = p.chip.visible = true;
        routeCrm.at(x, p.card.position); p.card.position.y = FY; routeSheet.at(x, p.chip.position); p.chip.position.y = FY;
      }
    }
    icons.forEach((g, i) => { g.userData.bob.position.y = pulse[i]; });
    agent.userData.bars.forEach((b, i) => { b.scale.y = talkCh > -1 ? 0.22 + 0.78 * Math.abs(Math.sin(time * 7 + i * 1.3)) : 0.18; });
    agent.userData.lamp.material = flat(talkCh > -1 ? P.paper : P.steel);
    const landed = Math.floor((time - (LIFE - T_LAND)) / GAP) + 1;
    const shown = landed <= 0 ? 0 : ((landed - 1) % 9) + 1;
    const lastAge = time - ((landed - 1) * GAP + LIFE - T_LAND);
    crm.userData.cards.forEach((c, i) => {
      c.visible = i < shown;
      if (c.visible) { c.position.copy(crm.userData.slot(i)); if (i === shown - 1) c.position.y += (1 - easeOut(clamp(lastAge / T_LAND))) * 1.2; }
    });
    const rowsShown = landed <= 0 ? 0 : ((landed - 1) % 5) + 1;
    sheet.userData.rows.forEach((r, i) => {
      r.old.forEach((o) => { o.visible = false; });
      r.fresh.forEach((f, c) => {
        const x = i < rowsShown - 1 ? 1 : i === rowsShown - 1 ? easeOut(clamp((lastAge - c * 0.08) / 0.4)) : 0;
        f.visible = x > 0.001; f.scale.x = Math.max(x, 0.001);
      });
    });
    return { step: -1, say: talkCh > -1 ? Math.min(3, 1 + Math.floor(talkK * 3)) : -1, sayCh: talkCh };
  }
  return { root, labels, update, dir: vertical ? V(0, 1, 0.34) : V(0, 1, 0.5) };
}

/* ---------- mount ---------- */
function mount(host) {
  const mode = host.dataset.flow, stage = host.querySelector(".flow-stage");
  if (!stage) return;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
  catch (e) { host.classList.add("flow-nogl"); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.domElement.setAttribute("aria-hidden", "true");
  stage.prepend(renderer.domElement);
  const labelBox = document.createElement("div"); labelBox.className = "flow-labels"; labelBox.setAttribute("aria-hidden", "true"); stage.append(labelBox);

  const scene = new THREE.Scene(), cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 400);
  const steps = Array.from(host.querySelectorAll("[data-flow-step]"));
  const sayEl = host.querySelector("[data-flow-say]");
  const btns = Array.from(host.querySelectorAll("[data-flow-channel]"));
  let W = 0, H = 0, vertical = null, world = null, B = null, visible = true;
  let ch = 0, locked = null, t0 = performance.now(), runs = 0, scrubU = null, lastStep = -2, lastSay = "", tiltX = 0, tiltT = 0;
  const v = V(0, 0, 0);

  function rebuild() {
    if (world) { scene.remove(world.root); labelBox.textContent = ""; }
    world = mode === "plan" ? buildPlan(vertical) : buildLine(vertical);
    scene.add(world.root);
    world.labels.forEach((l) => {
      const el = document.createElement("span"); el.className = "flow-label" + (l.cls ? " " + l.cls : "");
      el.textContent = l.text;
      if (l.sub) { const sm = document.createElement("small"); sm.textContent = l.sub; el.append(sm); }
      labelBox.append(el); l.el = el;
    });
  }
  function fit() {
    cam.position.copy(world.dir).normalize().multiplyScalar(80); cam.lookAt(0, 0, 0); cam.updateMatrixWorld(true);
    world.root.rotation.y = 0; world.root.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(world.root);
    let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    for (let i = 0; i < 8; i++) {
      v.set(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z).applyMatrix4(cam.matrixWorldInverse);
      x0 = Math.min(x0, v.x); x1 = Math.max(x1, v.x); y0 = Math.min(y0, v.y); y1 = Math.max(y1, v.y);
    }
    x0 -= 0.5; x1 += 0.5; y1 += mode === "plan" && !vertical ? 1.5 : 0.5; y0 -= 1.5;
    B = { x0, x1, y0, y1 };
  }
  function frame(focus, zoom) {
    let { x0, x1, y0, y1 } = B;
    const asp = W / H;
    let w = (x1 - x0) / (vertical ? 1 : zoom), h = (y1 - y0) / (vertical ? zoom : 1);
    let cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    if (zoom > 1) {
      if (vertical) cy = y1 - h / 2 - focus * (y1 - y0 - h); else cx = x0 + w / 2 + focus * (x1 - x0 - w);
    }
    if (w / h < asp) w = h * asp; else h = w / asp;
    cam.left = cx - w / 2; cam.right = cx + w / 2; cam.top = cy + h / 2; cam.bottom = cy - h / 2;
    cam.updateProjectionMatrix();
  }
  function resize() {
    const r = stage.getBoundingClientRect(); if (r.width < 10 || r.height < 10) return;
    W = r.width; H = r.height;
    const vNow = W < 620;
    if (vNow !== vertical) { vertical = vNow; host.classList.toggle("flow-vertical", vertical); rebuild(); }
    renderer.setSize(W, H, false); fit();
    draw(performance.now());
  }
  function hud(out) {
    if (out.step !== lastStep) { lastStep = out.step; steps.forEach((el, i) => el.classList.toggle("is-on", i === out.step)); host.dataset.step = out.step; }
    if (!sayEl) return;
    const key = out.sayCh + ":" + out.say;
    if (key === lastSay || out.say < 0 || out.sayCh < 0) return;
    lastSay = key;
    const line = out.say === 0 ? null : SAY[out.sayCh][out.say - 1];
    sayEl.innerHTML = "";
    const b = document.createElement("b"), sp = document.createElement("span");
    if (line) { b.textContent = line[0]; sp.textContent = line[1]; sayEl.classList.toggle("is-ai", line[0] === "AI"); }
    else { b.textContent = ["Ringing", "New email", "New text"][out.sayCh]; sp.textContent = ["A call is coming in.", "An email just landed.", "A text just landed."][out.sayCh]; sayEl.classList.remove("is-ai"); }
    sayEl.append(b, sp);
  }
  function draw(now) {
    if (!world || !W) return;
    const time = now / 1000;
    let out, focus = 0, zoom = 1;
    if (mode === "plan") {
      out = world.update({ time: reduce ? 13.2 : (now - t0) / 1000, filter: locked });
    } else if (scrubU != null) {
      out = world.update({ u: scrubU, chans: [0, 1, 2], time: scrubU * 6, runs: 0 });
      zoom = vertical ? 1.7 : 1.55; focus = easeIO(seg(scrubU, 0.12, 0.86));
    } else if (reduce) {
      out = world.update({ u: 1, chans: [0, 1, 2], time: 0, runs: 0 });
    } else {
      let el = (now - t0) / 1000;
      if (el > 8.6) { t0 = now; el = 0; runs++; ch = locked != null ? locked : (ch + 1) % 3; sync(); }
      out = world.update({ u: clamp(el / 7.4), chans: [ch], time, runs });
    }
    tiltX += (tiltT - tiltX) * 0.06; world.root.rotation.y = tiltX;
    frame(focus, zoom);
    hud(out);
    renderer.render(scene, cam);
    world.root.updateMatrixWorld();
    world.labels.forEach((l) => {
      v.copy(l.pos).applyMatrix4(world.root.matrixWorld).project(cam);
      const x = (v.x * 0.5 + 0.5) * W, y = (-v.y * 0.5 + 0.5) * H;
      l.el.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px) translate(-50%,0)";
      l.el.style.opacity = x < 30 || x > W - 30 || y < 0 || y > H - 8 ? 0 : 1;
    });
  }
  function sync() { btns.forEach((b) => b.setAttribute("aria-pressed", String(mode === "plan" ? String(locked) === b.dataset.flowChannel || (locked == null && b.dataset.flowChannel === "all") : Number(b.dataset.flowChannel) === ch))); }

  btns.forEach((b) => b.addEventListener("click", () => {
    const val = b.dataset.flowChannel;
    if (mode === "plan") { locked = val === "all" ? null : Number(val); }
    else { locked = Number(val); ch = locked; runs++; t0 = performance.now(); lastSay = ""; }
    sync(); if (reduce) draw(performance.now());
  }));
  sync();

  if (!reduce && window.matchMedia("(pointer: fine)").matches) {
    stage.addEventListener("pointermove", (e) => { const r = stage.getBoundingClientRect(); tiltT = ((e.clientX - r.left) / r.width - 0.5) * (mode === "plan" ? 0.1 : 0.07); });
    stage.addEventListener("pointerleave", () => { tiltT = 0; });
  }

  new ResizeObserver(resize).observe(stage);
  new IntersectionObserver((es) => { visible = es[0].isIntersecting; }, { rootMargin: "120px" }).observe(stage);
  resize();
  host.classList.add("flow-ready");

  // Scroll-scrubbed journey: pin the section and drive the timeline from scroll.
  const pin = host.closest("[data-flow-pin]");
  if (mode === "journey" && pin && !reduce && window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    scrubU = 0;
    const headerH = parseFloat(tok("--header-h")) || 76;
    window.ScrollTrigger.create({
      trigger: pin, start: "top " + headerH + "px", end: "+=240%", pin: true, scrub: 0.5,
      onUpdate: (st) => { scrubU = st.progress; }
    });
    host.classList.add("flow-scrub");
  }

  if (reduce) return;
  (function loop(now) { if (visible && !document.hidden) draw(now); requestAnimationFrame(loop); })(performance.now());
}

document.querySelectorAll("[data-flow]").forEach(mount);
