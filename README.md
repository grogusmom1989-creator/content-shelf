# Kiki Content Project Shelf

A small, static extension of one big Kiki universe made of mini worlds. It connects Kiki's Aetheria, KikiVerse, and their rooms, videos, social links, and projects without copying them; each doorway links to its original home.

## What is included

- A responsive Kiki-themed front page inspired by Aetheria's deep-purple, pink, and gold look.
- Search, type, collection, and platform filters for the project cards.
- A **Pick one for me** button that spotlights a random door from the currently visible collection.
- A **Flush to share** button on every item for sharing a direct link to it, with a selectable-link fallback if clipboard access is blocked.
- Links to the public projects already in your collection.
- Public Muse room doors, Kiki's public social links, the One Door page, and attributed links to videos she supports.
- Named Kikiverse videos, plus a door to the full 79-clip public archive.
- A public JSON catalog that other websites and apps can reuse.

The private `Kiki-Library` repository is intentionally not listed on this public site.

`catalog.json` is the public source of truth. GitHub Pages deploys catalog changes after they are pushed; the static site does not crawl Aetheria or Muse for new links by itself.

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

## Queue unfinished build work

Use the private inventory's `workQueue` for work that has not been built yet. Each task should state its project, goal, acceptance criteria, and any source links. Set `status` to `queued`, `in-progress`, `blocked`, or `done`; keep a task blocked if it needs a missing decision, link, or Muse-only action. The scheduled Copilot check runs every two hours, records verified public GitHub build/release results in the private inventory, and can take at most one well-defined GitHub/Copilot task per run, independent of Muse credits. It will not invent requirements, access Muse vaults, bypass Muse credits, or publish/commit changes without approval. The queue starts empty, so add concrete tasks before expecting scheduled implementation.

## Share a Meta Muse space

Keep the space and its contents in Meta Muse. The public rooms listed in Aetheria's **Space Viewing Rooms** section have individual doors on the shelf that lead to their existing Neocities room pages. The Aetheria PWA is represented on the same main-site door rather than copied as another app. When Muse gives you a direct share link for a room, it can be added as another link on that room's door; the shelf never copies or hosts the space. Private vaults and the names listed only under **Doorway Rooms** stay out of the public feed.

The **Build with Muse** door is the public Muse join/referral link, not an invite to one of your personal spaces. Its card includes the referral code and redemption window you provided.

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

## Map your app worlds and extend the bridge

Start with what you have built: give each original app or project a shelf item, then group related releases or iterations into an app family in the private inventory's `appFamilies` list. For example, the two known Tigger projects are grouped as iterations while remaining separate items. Record real platform and version details on each item; don't treat matching names or version numbers as proof of duplicates. When useful, you can note an outside app as an inspiration, compatible service, or integration—but only describe a relationship that is accurate.

The shelf is a read-only directory, not an account connector or auto-posting service. A social account or third-party platform is optional: manually add its public/shareable URL as another home on the matching item, and include it in `catalog.json` only if you intend it to be public. If one creation has multiple posts or copies, keep one canonical item and group the links there rather than creating duplicate cards.

The private inventory's `bridgePolicy` is a planning record. Add a `sources` entry only when you choose an outside platform to track, with fields like `platform`, `accountLabel`, `profileUrl`, `visibility`, `mode: "manual-read-only"`, and `lastReviewedAt`. Do not store passwords, API keys, access tokens, or cookies there. The source list starts empty; no social accounts are connected, scanned, copied, or published automatically. Keep auto-publishing off unless you later choose a specific workflow and explicitly enable it.

Public/shareable links from Meta, Microsoft services, Cloudflare-hosted video URLs, Neocities, and other platforms can be added as homes. Visitors still need whatever permissions the original service requires. A domain managed by Cloudflare can also point to GitHub Pages; this project does not change DNS or expose private storage.

## Keep track of news, topics, and case research

The private inventory has a `researchPolicy` section for the news, topics, and cases you look into. Its `sources`, `savedItems`, and `projects` lists start empty because your research sources and subjects have not been identified. Add a research project for a topic or case, then keep a source log with the source title and URL, publisher or court, publication and access dates, and a short note in your own words. Link each note to its source; distinguish allegations, reported claims, official findings, and open questions rather than blending them together. For a changing case, note the date you checked its status and prefer primary records where available. If multiple sources cover the same event, keep one research item and link the corroborating sources instead of making duplicates.

This is a private organizing aid, not a feed reader or legal advice. It does not fetch feeds or scrape pages. Keep sensitive personal details, credentials, and full article text out of it; only add a specific source link to the public shelf if you intend to share it.

## Publish on GitHub Pages

This repository is a plain static site, so it needs no build step. In the repository's **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save. GitHub Pages will publish `index.html`.

Once it is live, add the GitHub Pages address to your Neocities navigation so both sites can lead to this same collection.
