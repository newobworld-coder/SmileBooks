# Smile Books

A pastel 3D bookshelf for your interactive storybooks. Each book stands on a warm
wooden shelf under a dreamy sky drifting with hearts and stars; tap a book and it
opens in a new page. Aimed at young children.

## How adding a book works

**Every book is its own folder, placed right at the top level** of the project —
next to `index.html`. There is no wrapper folder. A folder becomes a book simply
by containing an `.html` file; the site's own files and folders are ignored
automatically.

```
index.html            <- the shelf page (leave this here)
build-catalog.mjs     <- the builder (leave this here)
The Sleepy Star/      <- a book
  index.html          <- the book itself (opens when tapped)
  narration.mp3       <- its sounds / pictures live alongside it
  cover.png           <- optional cover art
  book.json           <- optional details
Bunny's Big Day/      <- another book
  story.html          <- if there's no index.html, the first .html is used
  ...
```

To add a book, **upload its folder to the top level of your repo.** To remove one,
delete the folder. Nothing else to touch.

- No `cover` image in the folder? The shelf makes a cute pastel cover from the
  title automatically.
- Folder contains audio? The book gets a little 🔊 badge.

### Optional: book details

Add a `book.json` inside a book's folder (every field optional):

```json
{
  "title": "The Sleepy Star",
  "author": "by Ms. Smile",
  "description": "A bedtime tale about a star who can't sleep.",
  "color": "#B5DCFF",
  "cover": "cover.png",
  "entry": "index.html",
  "order": 1
}
```

Site title and tagline live in `books.config.json`.

## Deploy to Netlify

Connect the folder to a GitHub repo and import it in Netlify — it reads
`netlify.toml`, runs `node build-catalog.mjs`, and publishes. After that, **adding
a book = upload its folder to the top level of the repo, and it appears after the
rebuild.** (CLI `netlify deploy --build --prod` works too; for manual drag-drop,
run `node build-catalog.mjs` first.)

Uploading a whole folder through github.com needs desktop Chrome, or use the
GitHub Desktop app — the same as the games site.

## Preview locally

After building once (`node build-catalog.mjs`), double-click `index.html`. It reads
the shelf from `catalog.js` and loads books by relative path, so browsing and
opening books work offline.

## Notes

- No size limits — books are plain static files.
- `catalog.js` is generated; it's committed so drag-drop and local preview work,
  and the build overwrites it each deploy. You never edit it by hand.
- Three tiny example books ship with the project — delete their folders and add
  your own.
