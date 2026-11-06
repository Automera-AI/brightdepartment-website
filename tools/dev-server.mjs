// Local preview server for /site with Netlify-like pretty URLs. POST returns 200 so forms can be tested.
import http from "node:http"; import fs from "node:fs"; import path from "node:path"; import { fileURLToPath } from "node:url";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "site");
const PORT = Number(process.env.PORT || 8788);
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".mp4": "video/mp4", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain" };
http.createServer((req, res) => {
  if (req.method === "POST") { let b = ""; req.on("data", (c) => (b += c)); req.on("end", () => { console.log("FORM POST", decodeURIComponent(b).slice(0, 300)); res.writeHead(200); res.end("ok"); }); return; }
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let f = path.join(ROOT, p);
  if (!f.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (!fs.existsSync(f)) { f = path.join(ROOT, "404.html"); res.statusCode = 404; }
  const ext = path.extname(f); const stat = fs.statSync(f);
  if (ext === ".mp4" && req.headers.range) {
    const [s, e] = req.headers.range.replace("bytes=", "").split("-"); const start = +s; const end = e ? +e : stat.size - 1;
    res.writeHead(206, { "Content-Range": `bytes ${start}-${end}/${stat.size}`, "Accept-Ranges": "bytes", "Content-Length": end - start + 1, "Content-Type": "video/mp4" });
    return fs.createReadStream(f, { start, end }).pipe(res);
  }
  res.setHeader("Content-Type", TYPES[ext] || "application/octet-stream");
  fs.createReadStream(f).pipe(res);
}).listen(PORT, () => console.log("Preview on http://localhost:" + PORT));
