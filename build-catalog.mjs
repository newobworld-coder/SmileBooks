#!/usr/bin/env node
/* ---------------------------------------------------------------------------
 * Smile Books — shelf builder
 *
 * Every book is ONE folder placed at the TOP LEVEL of the project (right next
 * to index.html). No wrapper folder. A folder is treated as a book when it
 * contains an .html file. The site's own folders are skipped automatically.
 *
 *   index.html                 <- the shelf page (leave this here)
 *   build-catalog.mjs          <- this script
 *   The Sleepy Star/           <- a book (its own folder)
 *     index.html               <- the book itself (opened when tapped)
 *     narration.mp3            <- its audio / images live alongside it
 *     cover.png                <- optional cover art
 *     book.json                <- optional details
 *   Bunny's Big Day/
 *     story.html               <- if there's no index.html, the first .html is used
 *     ...
 *
 * Optional book.json inside a book's folder (every field optional):
 *   { "title": "...", "author": "...", "description": "...",
 *     "color": "#B5DCFF", "cover": "cover.png", "entry": "index.html", "order": 1 }
 *
 * Optional books.config.json in the project root:
 *   { "title": "SMILE BOOKS", "tagline": "A little library of stories." }
 * ------------------------------------------------------------------------- */

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONFIG_PATH = path.join(ROOT, "books.config.json");

// folders that are part of the site itself, never books
const SKIP = new Set(["node_modules", ".git", ".github", ".netlify", ".vscode", "dist", "build"]);

const PASTELS = ["#FFB5D2", "#FFD8B5", "#FFF0B5", "#B5F0D8", "#B5DCFF", "#D8C4FF", "#FFC7E4", "#C9EFC2"];
const prettify = (s) => s.replace(/\.html?$/i, "").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
const hash = (s) => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
const isImg = (n) => /\.(png|jpe?g|webp|gif|avif)$/i.test(n);
const isAudio = (n) => /\.(mp3|wav|m4a|ogg|aac|flac)$/i.test(n);
const isHtml = (n) => /\.html?$/i.test(n);

function normaliseColor(c, fallback) {
  if (c == null) return fallback;
  const s = String(c).trim();
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s)) return s;
  if (/^\d{1,3}$/.test(s)) return `hsl(${s} 78% 85%)`;
  return fallback;
}

const config = existsSync(CONFIG_PATH) ? JSON.parse(await readFile(CONFIG_PATH, "utf8")) : {};
const books = [];

const dirs = (await readdir(ROOT, { withFileTypes: true }))
  .filter((d) => d.isDirectory() && !d.name.startsWith(".") && !SKIP.has(d.name));

for (const d of dirs) {
  const dir = path.join(ROOT, d.name);
  const files = (await readdir(dir, { withFileTypes: true })).filter((f) => f.isFile()).map((f) => f.name);

  const htmls = files.filter(isHtml);
  if (!htmls.length) continue; // not a book — no HTML inside

  let meta = {};
  if (files.includes("book.json")) {
    try { meta = JSON.parse(await readFile(path.join(dir, "book.json"), "utf8")); }
    catch { console.warn(`  ! ${d.name}/book.json is not valid JSON — ignoring it.`); }
  }

  const entry = meta.entry && files.includes(meta.entry) ? meta.entry
    : (files.includes("index.html") ? "index.html" : htmls.sort()[0]);

  const cover = meta.cover && files.includes(meta.cover) ? meta.cover
    : files.find((n) => /^cover\.(png|jpe?g|webp|gif|avif)$/i.test(n))
    || files.filter(isImg).sort()[0] || null;

  const enc = (folder, file) => [folder, file].map(encodeURIComponent).join("/");
  const info = await stat(path.join(dir, entry));

  books.push({
    id: d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "book-" + hash(d.name),
    title: meta.title || prettify(d.name),
    author: meta.author || "",
    description: meta.description || "",
    color: normaliseColor(meta.color, PASTELS[hash(d.name) % PASTELS.length]),
    cover: cover ? enc(d.name, cover) : null,
    path: enc(d.name, entry),
    audio: files.some(isAudio),
    size: info.size,
    order: meta.order != null ? Number(meta.order) : null,
  });
}

books.sort((a, b) => ((a.order ?? 999) - (b.order ?? 999)) || a.title.localeCompare(b.title));
books.forEach((b) => delete b.order);

const catalog = {
  title: config.title || "SMILE BOOKS",
  tagline: config.tagline || "A little library of stories. Tap a book to read.",
  books,
  built: new Date().toISOString(),
};

await writeFile(path.join(ROOT, "catalog.js"), "window.__BOOKS__ = " + JSON.stringify(catalog) + ";\n");
console.log(`Built catalog.js — ${books.length} book${books.length === 1 ? "" : "s"} on the shelf.`);
