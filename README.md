# Everything Shelf

A small, static home for linking your projects together. It does not copy or move your existing work: the cards link back to the original sites and repositories. The collection follows a creative path that started from scratch in Meta Muse, grew through Copilot and other AI tools, and brings all the work together as one collage.

## What is included

- A collage-inspired, responsive front page.
- Search, type, collection, and platform filters for the project cards.
- A **Flush to share** button on every item for sharing a direct link to it, with a selectable-link fallback if clipboard access is blocked.
- Links to the public projects already in your collection.
- Named Kikiverse videos, plus a door to the full 79-clip public archive.
- A public JSON catalog that other websites and apps can reuse.

The private `Kiki-Library` repository is intentionally not listed on this public site.

## Add a video or another piece

1. Copy the shareable URL from wherever the video already lives. This shelf links to it; it does not store or upload video files.
2. Open `catalog.json` and add an entry to its `items` array with `kind: "video"`.
3. Add a link with the label `"Watch"` and your video URL. You can include more links on the same card if a clip has several homes.
4. Give it a `collection` name to group it with related work, plus a few descriptive `tags`.
5. Commit the change. The new card will appear with the rest, and its **Flush to share** button will create a shareable link to that card.

Each entry has this shape. Use `platforms` to record a website, OS, or app version; this creates a platform filter and makes the details available to other apps:

```json
{
  "id": "my-video",
  "title": "My video",
  "kind": "video",
  "collection": "Behind the scenes",
  "description": "A short note about it.",
  "tags": ["video", "behind the scenes"],
  "platforms": [{ "name": "Android", "versionName": "27.0", "versionCode": 27 }],
  "links": [
    { "label": "Watch", "url": "https://example.com/my-video" }
  ]
}
```

Use a unique, URL-friendly `id`. Links open in a new tab.

## Reuse the catalog in other sites and apps

The public JSON feed is the source of truth for the shelf:

`https://grogusmom1989-creator.github.io/content-shelf/catalog.json`

Websites can fetch it cross-origin, and apps can request the same JSON URL:

```js
const response = await fetch("https://grogusmom1989-creator.github.io/content-shelf/catalog.json");
if (!response.ok) throw new Error("Could not load the content catalog");
const { items } = await response.json();
const androidBuilds = items.flatMap((item) =>
  item.platforms
    .filter((platform) => platform.name === "Android")
    .map((platform) => ({ title: item.title, ...platform }))
);
```

For example, a Neocities page or another website can fetch the feed and select the entries it wants:

```js
const response = await fetch("https://grogusmom1989-creator.github.io/content-shelf/catalog.json");
if (!response.ok) throw new Error("Could not load the content catalog");
const { items } = await response.json();
const videos = items.filter((item) => item.kind === "video");
```

The Tigger entries currently include Android app version `27.0` and API-level metadata. Add Muse spaces, KikiOS, Microsoft links, and other versions as new catalog entries or platform records when you have their share URLs. The data format does not require the work to be hosted on GitHub.

## Connect Neocities

The shelf is plain HTML, CSS, and JavaScript, so it can also be uploaded to Neocities. The easiest way to keep one shared collection is to leave GitHub Pages as the canonical shelf and add its URL to your Neocities navigation, or fetch the JSON feed from a Neocities page. Neocities-hosted pages can also be added as links in any project entry.

## Use your bridge and other platforms

Keep GitHub as the code and version-history home, and keep using the tools and bridge that help you create. This static shelf is a catalog, not an automatic sync engine: add the shareable links your bridge surfaces as entries here.

Public/shareable links from Microsoft services, Cloudflare-hosted video URLs, Neocities pages, and other platforms can all be added as links. Visitors still need whatever permissions the original service requires. A domain managed by Cloudflare can also point to GitHub Pages; this project does not change DNS or expose private storage.

## Publish on GitHub Pages

This repository is a plain static site, so it needs no build step. In the repository's **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save. GitHub Pages will publish `index.html`.

Once it is live, add the GitHub Pages address to your Neocities navigation so both sites can lead to this same collection.
