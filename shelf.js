const projects = [
  {
    id: "kikiverse",
    title: "Kikiverse",
    kind: "site",
    description: "A colorful world of little web experiences, gathered in one place.",
    tags: ["world", "web"],
    links: [
      { label: "Visit the site", url: "https://grogusmom1989-creator.github.io/kikiverse/" },
      { label: "Source", url: "https://github.com/grogusmom1989-creator/kikiverse" }
    ]
  },
  {
    id: "healing-art-studio",
    title: "Healing Art Studio",
    kind: "art",
    description: "A creative corner from the Kikiverse collection.",
    tags: ["art", "kikiverse"],
    links: [
      { label: "Open the studio", url: "https://grogusmom1989-creator.github.io/kikiverse/healing-art-studio.html" },
      { label: "Source", url: "https://github.com/grogusmom1989-creator/kikiverse" }
    ]
  },
  {
    id: "dazzly-fan-edition",
    title: "Dazzly Fan Edition",
    kind: "art",
    description: "A bright fan-made experience, also part of Kikiverse.",
    tags: ["fan-made", "kikiverse"],
    links: [
      { label: "Open Dazzly", url: "https://grogusmom1989-creator.github.io/kikiverse/dazzly-fan-edition.html" },
      { label: "Source", url: "https://github.com/grogusmom1989-creator/kikiverse" }
    ]
  },
  {
    id: "kiki-uncle-louie-performance",
    title: "Kiki & Uncle Louie Performance",
    kind: "video",
    description: "A performance piece already living in the Kikiverse video collection.",
    tags: ["Kikiverse", "performance"],
    links: [
      { label: "Play video", url: "https://grogusmom1989-creator.github.io/kikiverse/assets/media-generation-kiki-uncle-louie-performance-v-0-55853d62-6dfa-4ff2-8de3-e3ab8df7cb55.mp4" }
    ]
  },
  {
    id: "cozy-beauty-haul",
    title: "Cozy Beauty Haul",
    kind: "video",
    description: "A cozy Sunday beauty haul from the Kikiverse collection.",
    tags: ["Kikiverse", "beauty", "Sunday"],
    links: [
      { label: "Play video", url: "https://grogusmom1989-creator.github.io/kikiverse/assets/try-it-sunday-cozy-beauty-haul-2026-10-04.mp4" }
    ]
  },
  {
    id: "burnin-up-remix",
    title: "Burnin' Up Remix",
    kind: "video",
    description: "A remix clip already hosted with the other Kikiverse videos.",
    tags: ["Kikiverse", "remix"],
    links: [
      { label: "Play video", url: "https://grogusmom1989-creator.github.io/kikiverse/assets/videos/burnin-up-remix-2026-10-01.mp4" }
    ]
  },
  {
    id: "plush-crew-blooper-reel",
    title: "Plush Crew Blooper Reel",
    kind: "video",
    description: "A blooper reel from the existing Kikiverse video archive.",
    tags: ["Kikiverse", "bloopers"],
    links: [
      { label: "Play video", url: "https://grogusmom1989-creator.github.io/kikiverse/assets/videos/plush-crew-blooper-reel-2026-10-01.mp4" }
    ]
  },
  {
    id: "kikiverse-video-archive",
    title: "The Kikiverse Video Attic",
    kind: "video",
    description: "The original public asset folder holds 79 clips; browse the rest where they already live.",
    tags: ["Kikiverse", "archive", "79 clips"],
    links: [
      { label: "Browse the video archive", url: "https://github.com/grogusmom1989-creator/kikiverse/tree/main/assets" }
    ]
  },
  {
    id: "grogu-brick",
    title: "Grogu Brick",
    kind: "project",
    description: "A Grogu-inspired project in the making.",
    tags: ["Grogu", "experiment"],
    links: [
      { label: "Explore the project", url: "https://github.com/grogusmom1989-creator/Grogu-brick" }
    ]
  },
  {
    id: "tigger",
    title: "Tigger",
    kind: "project",
    description: "An earlier Tigger project, kept here as part of the bigger picture.",
    tags: ["Tigger", "archive"],
    links: [
      { label: "Explore the project", url: "https://github.com/grogusmom1989-creator/Tigger" }
    ]
  },
  {
    id: "tigger-2",
    title: "Tigger 2.0",
    kind: "project",
    description: "A second take in the Tigger family of projects.",
    tags: ["Tigger", "iteration"],
    links: [
      { label: "Explore the project", url: "https://github.com/grogusmom1989-creator/Tigger-2.0" }
    ]
  },
  {
    id: "cookies",
    title: "Cookies",
    kind: "art",
    description: "More playful experiments and creative pieces to explore.",
    tags: ["play", "remix"],
    links: [
      { label: "Explore the collection", url: "https://github.com/grogusmom1989-creator/Cookies" }
    ]
  },
  {
    id: "kikis-world",
    title: "Kiki's World 2.0",
    kind: "project",
    description: "A newer world in the collection, growing alongside the rest.",
    tags: ["world", "iteration"],
    links: [
      { label: "Explore the project", url: "https://github.com/grogusmom1989-creator/Kikis-world-2.0" }
    ]
  },
  {
    id: "liam-panda-payne",
    title: "Liam Panda Payne",
    kind: "art",
    description: "A panda-themed creation in the mix.",
    tags: ["panda", "character"],
    links: [
      { label: "Explore the project", url: "https://github.com/grogusmom1989-creator/liam-panda-payne" }
    ]
  }
];

const grid = document.querySelector("#shelf-grid");
const search = document.querySelector("#search");
const count = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const copyStatus = document.querySelector("#copy-status");
const filters = [...document.querySelectorAll(".filter")];
let activeFilter = "all";

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function renderCard(project) {
  const card = makeElement("article", "card");
  card.id = project.id;
  card.dataset.kind = project.kind;

  const topline = makeElement("div", "card-topline");
  const kindLabels = { art: "Art & play", site: "Site", video: "Video" };
  topline.append(
    makeElement("span", "card-kind", kindLabels[project.kind] || "Project"),
    makeElement("span", "card-mark", project.kind === "video" ? "▶" : "✳")
  );
  card.append(topline);
  card.append(makeElement("h3", "", project.title));
  card.append(makeElement("p", "", project.description));

  const tags = makeElement("div", "card-tags");
  for (const tag of project.tags) tags.append(makeElement("span", "card-tag", tag));
  card.append(tags);

  const bottom = makeElement("div", "card-bottom");
  const links = makeElement("div", "card-links");
  for (const item of project.links) {
    const link = makeElement("a", "", item.label);
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    links.append(link);
  }
  const share = makeElement("button", "card-share", "Flush to share");
  share.type = "button";
  share.addEventListener("click", async () => {
    const url = `${window.location.origin}${window.location.pathname}#${project.id}`;
    try {
      await navigator.clipboard.writeText(url);
      copyStatus.textContent = `Copied a link to ${project.title}.`;
    } catch {
      let input = card.querySelector(".share-url");
      if (!input) {
        input = makeElement("input", "share-url");
        input.type = "text";
        input.readOnly = true;
        input.value = url;
        input.setAttribute("aria-label", `Share link for ${project.title}`);
        card.append(input);
      }
      input.focus();
      input.select();
      copyStatus.textContent = `Copy isn't available here. The link to ${project.title} is selected; press Ctrl+C to copy it.`;
    }
  });
  bottom.append(links, share);
  card.append(bottom);
  return card;
}

function render() {
  const query = search.value.trim().toLocaleLowerCase();
  const visible = projects.filter((project) => {
    const matchesKind = activeFilter === "all" || project.kind === activeFilter;
    const searchable = [project.title, project.description, ...project.tags].join(" ").toLocaleLowerCase();
    return matchesKind && searchable.includes(query);
  });

  grid.replaceChildren(...visible.map(renderCard));
  count.textContent = `${visible.length} ${visible.length === 1 ? "piece" : "pieces"} in view`;
  if (visible.length === 0 && activeFilter === "video" && query === "") {
    emptyState.textContent = "No videos on this shelf yet. Add a shareable video URL to the projects list in shelf.js.";
  } else {
    emptyState.textContent = "No matches yet. Try another word or filter.";
  }
  emptyState.hidden = visible.length > 0;
}

for (const filter of filters) {
  filter.addEventListener("click", () => {
    activeFilter = filter.dataset.filter;
    for (const button of filters) {
      const selected = button === filter;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    }
    render();
  });
}

search.addEventListener("input", render);
render();
