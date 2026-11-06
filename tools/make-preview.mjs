// Builds a preview copy of /site that works under a sub-folder, for GitHub Pages.
// Usage: node tools/make-preview.mjs <srcDir> <outDir> <basePath>
//   e.g. node tools/make-preview.mjs site _site /brightdepartment-website
// The preview:
// - prefixes root-relative links and assets with the base path
// - marks every page noindex and blocks crawlers (brightdepartment.com stays the canonical site)
// - turns on preview mode: forms go to their thank-you page without sending anything
// - shows a slim "preview" banner so nobody mistakes it for the live site
import fs from "node:fs";
import path from "node:path";

const [, , src = "site", out = "_site", baseArg = ""] = process.argv;
const BASE = baseArg.replace(/\/$/, "");

fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(src, out, { recursive: true });

const BANNER = `<div style="position:relative;z-index:70;background:#111216;color:#e4e6ea;font:600 14px/1.4 Barlow,system-ui,sans-serif;text-align:center;padding:8px 16px">Preview for review. Forms on this preview don't send anything. The calendar is live, so bookings made here are real.</div>`;

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) fixHtml(p);
  }
}

function fixHtml(file) {
  let h = fs.readFileSync(file, "utf8");
  if (BASE) {
    // attributes that hold root-relative URLs
    h = h.replace(/(\s(?:href|src|poster|action|data-thanks)=")\/(?!\/)/g, `$1${BASE}/`);
    // inline style url('/...')
    h = h.replace(/url\((['"]?)\/(?!\/)/g, `url($1${BASE}/`);
  }
  h = h.replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex, nofollow">');
  h = h.replace(/(<body[^>]*>)/, `$1\n${BANNER}`);
  fs.writeFileSync(file, h);
}

walk(out);

// preview settings appended to config.js
fs.appendFileSync(
  path.join(out, "assets/js/config.js"),
  `\n// Added by tools/make-preview.mjs for the GitHub Pages preview\nwindow.BD_CONFIG.basePath = ${JSON.stringify(BASE)};\nwindow.BD_CONFIG.previewMode = true;\n`
);

// crawlers stay out of the preview
fs.writeFileSync(path.join(out, "robots.txt"), "User-agent: *\nDisallow: /\n");
for (const f of ["_redirects", "sitemap.xml"]) fs.rmSync(path.join(out, f), { force: true });
fs.writeFileSync(path.join(out, ".nojekyll"), "");

console.log(`Preview built in ${out} with base path "${BASE || "/"}"`);
