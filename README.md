# Everything Shelf

A small, static home for linking your projects together. It does not copy or move your existing work: the cards link back to the original sites and repositories. The collection follows a creative path that started from scratch in Meta Muse, grew through Copilot and other AI tools, and brings all the work together as one collage.

## What is included

- A collage-inspired, responsive front page.
- Search and filters for the project cards.
- A **Flush to share** button on every item for sharing a direct link to it, with a selectable-link fallback if clipboard access is blocked.
- Links to the public projects already in your collection.
- Named Kikiverse videos, plus a door to the full 79-clip public archive.

The private `Kiki-Library` repository is intentionally not listed on this public site.

## Add a video or another piece

1. Copy the shareable URL from wherever the video already lives. This shelf links to it; it does not store or upload video files.
2. Open `shelf.js` and add an entry to the `projects` array with `kind: "video"`.
3. Add a link with the label `"Watch"` and your video URL. You can include more links on the same card if a clip has several homes.
4. Give it a `collection` name to group it with related work, plus a few descriptive `tags`.
5. Commit the change. The new card will appear with the rest, and its **Flush to share** button will create a shareable link to that card.

Each entry has this shape:

```js
{
  id: "my-video",
  title: "My video",
  kind: "video",
  collection: "Behind the scenes",
  description: "A short note about it.",
  tags: ["video", "behind the scenes"],
  links: [
    { label: "Watch", url: "https://example.com/my-video" }
  ]
}
```

Use a unique, URL-friendly `id`. Links open in a new tab.

## Connect Neocities

The shelf is plain HTML, CSS, and JavaScript, so it can also be uploaded to Neocities. The easiest way to keep one shared collection is to leave GitHub Pages as the canonical shelf and add its URL to your Neocities navigation. If you upload a second copy, changes to `shelf.js` need to be uploaded there too. Neocities-hosted pages can also be added as links in any project entry.

## Use Cloudflare alongside GitHub

Keep GitHub as the code and version-history home. Cloudflare can keep doing its own job too: a domain managed there can point to GitHub Pages, and any already-public Cloudflare video URL can be added as a `kind: "video"` link. The shelf does not change DNS or expose private storage.

## Publish on GitHub Pages

This repository is a plain static site, so it needs no build step. In the repository's **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save. GitHub Pages will publish `index.html`.

Once it is live, add the GitHub Pages address to your Neocities navigation so both sites can lead to this same collection.
