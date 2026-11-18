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

## Keep a private master inventory

`inventory.private.json` is a local-only index of canonical pieces, their homes, possible duplicate relationships, build history, and schedule. It is intentionally excluded from Git so private links and notes cannot be published with the shelf. Organize records across four visibility levels:

- `public`: listed in `catalog.json` and visible on the public shelf.
- `unlisted`: shareable by direct link, but not listed in the public shelf or feed.
- `private`: private organizing metadata only; never included in the public feed.
- `muse-only`: vault contents stay exclusively in Meta Muse. At most, the private index holds a minimal reference; never export, upload, mirror, or back up vault files here or to another service.

The inventory starts with the items already on the shelf, marked `public`. Use it as a pointer/status layer, not another vault. Do not put passwords, access tokens, or private account data in either catalog.

For duplicates, keep one canonical record and point copies to it with `duplicateOf` set to that record's `id`. Keep distinct versions or remixes as separate records unless you confirm they are copies. In the public `catalog.json`, list only shareable homes on the canonical card; private inventory notes and private links stay local. `duplicateReview` can be `not-reviewed`, `same-work`, or `distinct-version`.

Use the `builds` and `schedules` lists for metadata only, with the same `visibility` levels. Record a build's version, status, date, and a pointer to its existing artifact home; keep the artifact itself in its existing home. Record schedule dates in ISO 8601 format with a timezone (for example, `2026-12-01T18:00:00-05:00`). These lists start empty because no build artifacts or schedule dates have been provided; Android version metadata on the shelf describes project configuration, not proof that a build was produced.

The private inventory is not synced or backed up by Git. If you choose to back up this metadata, use a location you trust; never include Muse vault contents. Check privacy before sharing the inventory.

## Share a Meta Muse space

Keep the space and its contents in Meta Muse. When Muse gives you a share link, add that URL as a door in `catalog.json` and set its platform to `Meta Muse`; the shelf links people back to the original space and does not copy or host it. Only add a link to the public catalog if the space's Muse sharing settings allow the audience you intend. If it is invite-only or private, keep it out of the public feed; you can track its minimal reference in your ignored local inventory instead.

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

## Extend the bridge carefully

The shelf is a read-only directory, not an account connector or auto-posting service. Start by manually adding links from one or two social platforms you use most. Keep each original where it lives; add its public/shareable URL as a `homes` link on the matching inventory item and, only if intended for everyone, as a `links` entry in `catalog.json`. If the same creation appears on several platforms, keep one canonical item and attach its distinct post URLs as homes rather than making duplicate cards.

The private inventory's `bridgePolicy` is a planning record. Add a `sources` entry only when you choose a platform to track, with fields like `platform`, `accountLabel`, `profileUrl`, `visibility`, `mode: "manual-read-only"`, and `lastReviewedAt`. Do not store passwords, API keys, access tokens, or cookies there. The source list starts empty; no social accounts are connected, scanned, copied, or published automatically. Keep auto-publishing off unless you later choose a specific workflow and explicitly enable it.

Public/shareable links from Meta, Microsoft services, Cloudflare-hosted video URLs, Neocities, and other platforms can be added as homes. Visitors still need whatever permissions the original service requires. A domain managed by Cloudflare can also point to GitHub Pages; this project does not change DNS or expose private storage.

## Publish on GitHub Pages

This repository is a plain static site, so it needs no build step. In the repository's **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save. GitHub Pages will publish `index.html`.

Once it is live, add the GitHub Pages address to your Neocities navigation so both sites can lead to this same collection.
