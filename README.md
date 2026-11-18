# Everything Shelf

A small, static home for linking your projects together. It does not copy or move your existing work: the cards link back to the original sites and repositories. The collection follows a creative path that started from scratch in Meta Muse, grew through Copilot and other AI tools, and brings all the work together as one collage.

## What is included

- A collage-inspired, responsive front page.
- Search and filters for the project cards.
- A **Copy card link** button on every item for sharing a direct link to it, with a selectable-link fallback if clipboard access is blocked.
- Links to the public projects already in your collection.

The private `Kiki-Library` repository is intentionally not listed on this public site.

## Add a video or another piece

1. Copy the shareable URL from wherever the video already lives. This shelf links to it; it does not store or upload video files.
2. Open `shelf.js` and add an entry to the `projects` array with `kind: "video"`.
3. Add a link with the label `"Watch"` and your video URL. You can include more links on the same card if a clip has several homes.
4. Commit the change. The new card will appear with the rest, and its **Copy card link** button will create a shareable link to that card.

Each entry has this shape:

```js
{
  id: "my-video",
  title: "My video",
  kind: "art",
  description: "A short note about it.",
  tags: ["video", "behind the scenes"],
  links: [
    { label: "Watch", url: "https://example.com/my-video" }
  ]
}
```

Use a unique, URL-friendly `id`. Links open in a new tab.

## Publish on GitHub Pages

This repository is a plain static site, so it needs no build step. In the repository's **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save. GitHub Pages will publish `index.html`.

Once it is live, add the GitHub Pages address to your Neocities navigation so both sites can lead to this same collection.
