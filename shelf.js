let projects = [];

const grid = document.querySelector("#shelf-grid");
const search = document.querySelector("#search");
const count = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const catalogError = document.querySelector("#catalog-error");
const copyStatus = document.querySelector("#copy-status");
const surpriseButton = document.querySelector("#surprise-button");
const surpriseStatus = document.querySelector("#surprise-status");
const filters = [...document.querySelectorAll(".filter[data-filter]")];
const collectionFilters = document.querySelector("#collection-filters");
const platformFilters = document.querySelector("#platform-filters");
let activeFilter = "all";
let activeCollection = "all";
let activePlatform = "all";
let visibleProjects = [];
let lastSurpriseId = "";

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function platformLabel(platform) {
  const version = platform.versionName ? ` v${platform.versionName}` : "";
  const api = platform.minSdk
    ? ` (API ${platform.minSdk}${platform.targetSdk ? `–${platform.targetSdk}` : "+"})`
    : "";
  return `${platform.name}${version}${api}`;
}

function renderCard(project) {
  const card = makeElement("article", "card");
  card.id = project.id;
  card.dataset.kind = project.kind;
  card.tabIndex = -1;

  const topline = makeElement("div", "card-topline");
  const kindLabels = { art: "Art & play", site: "Site", video: "Video" };
  topline.append(
    makeElement("span", "card-kind", kindLabels[project.kind] || "Project"),
    makeElement("span", "card-collection", project.collection),
    makeElement("span", "card-mark", project.kind === "video" ? "▶" : "✳")
  );
  card.append(topline);
  card.append(makeElement("h3", "", project.title));
  card.append(makeElement("p", "", project.description));

  const tags = makeElement("div", "card-tags");
  for (const tag of project.tags || []) {
    const tagButton = makeElement("button", "card-tag", tag);
    tagButton.type = "button";
    tagButton.addEventListener("click", () => {
      search.value = tag;
      activeFilter = "all";
      activeCollection = "all";
      activePlatform = "all";
      syncFilters();
      render();
      search.focus();
    });
    tags.append(tagButton);
  }
  for (const platform of project.platforms || []) {
    const label = platformLabel(platform);
    const tagButton = makeElement("button", "card-tag platform-tag", label);
    tagButton.type = "button";
    tagButton.addEventListener("click", () => {
      search.value = "";
      activeFilter = "all";
      activeCollection = "all";
      activePlatform = platform.name;
      syncFilters();
      render();
    });
    tags.append(tagButton);
  }
  card.append(tags);

  const bottom = makeElement("div", "card-bottom");
  const links = makeElement("div", "card-links");
  for (const item of project.links || []) {
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

function renderCollectionGroup(collection, entries) {
  const section = makeElement("section", "collection-group");
  const headingId = `collection-${entries[0].id}`;
  section.setAttribute("aria-labelledby", headingId);
  const heading = makeElement("div", "collection-group-heading");
  const countLabel = `${entries.length} ${entries.length === 1 ? "door" : "doors"}`;
  const title = makeElement("h3", "", collection);
  title.id = headingId;
  heading.append(
    title,
    makeElement("span", "", countLabel)
  );
  const cardGrid = makeElement("div", "shelf-grid collection-grid");
  cardGrid.append(...entries.map(renderCard));
  section.append(heading, cardGrid);
  return section;
}

function render() {
  const query = search.value.trim().toLocaleLowerCase();
  const visible = projects.filter((project) => {
    const matchesKind = activeFilter === "all" || project.kind === activeFilter;
    const matchesCollection = activeCollection === "all" || project.collection === activeCollection;
    const matchesPlatform = activePlatform === "all"
      || (project.platforms || []).some((platform) => platform.name === activePlatform);
    const platformDetails = (project.platforms || []).map((platform) =>
      [platform.name, platform.versionName, platform.versionCode, platform.minSdk, platform.targetSdk].join(" ")
    );
    const searchable = [
      project.title,
      project.description,
      project.collection,
      ...(project.tags || []),
      ...platformDetails
    ].join(" ").toLocaleLowerCase();
    return matchesKind && matchesCollection && matchesPlatform && searchable.includes(query);
  });

  visibleProjects = visible;
  const groups = new Map();
  for (const project of visible) {
    const collection = project.collection || "More doors";
    if (!groups.has(collection)) groups.set(collection, []);
    groups.get(collection).push(project);
  }
  grid.replaceChildren(...[...groups].map(([collection, entries]) =>
    renderCollectionGroup(collection, entries)
  ));
  count.textContent = `${visible.length} ${visible.length === 1 ? "piece" : "pieces"} in view`;
  if (visible.length === 0 && activeFilter === "video" && query === "") {
    emptyState.textContent = activeCollection === "all"
      ? "No videos on this shelf yet. Add a shareable video URL to catalog.json."
      : `No videos in ${activeCollection} yet. Clear the collection filter to see every video.`;
  } else {
    emptyState.textContent = "No matches yet. Try another word or filter.";
  }
  emptyState.hidden = visible.length > 0;
}

surpriseButton.addEventListener("click", () => {
  if (visibleProjects.length === 0) return;

  const choices = visibleProjects.length > 1
    ? visibleProjects.filter((project) => project.id !== lastSurpriseId)
    : visibleProjects;
  const project = choices[Math.floor(Math.random() * choices.length)];
  const card = document.getElementById(project.id);
  if (!card) return;

  lastSurpriseId = project.id;
  card.classList.remove("is-surprise");
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  card.scrollIntoView({ behavior, block: "center" });
  card.focus({ preventScroll: true });
  requestAnimationFrame(() => card.classList.add("is-surprise"));
  window.setTimeout(() => card.classList.remove("is-surprise"), 1500);
  surpriseStatus.textContent = `Your next door: ${project.title}.`;
});

function syncFilters() {
  for (const filter of filters) {
    const selected = filter.dataset.filter === activeFilter;
    filter.classList.toggle("is-active", selected);
    filter.setAttribute("aria-pressed", String(selected));
  }
  syncFilterGroup(collectionFilters, "collection", activeCollection);
  syncFilterGroup(platformFilters, "platform", activePlatform);
}

function syncFilterGroup(container, key, activeValue) {
  for (const filter of container.querySelectorAll(".filter")) {
    const selected = filter.dataset[key] === activeValue;
    filter.classList.toggle("is-active", selected);
    filter.setAttribute("aria-pressed", String(selected));
  }
}

function renderFilterGroup(container, key, allLabel, values, activeValue, onSelect) {
  const options = [{ label: allLabel, value: "all" }, ...values.map((value) => ({
    label: value,
    value
  }))];

  container.replaceChildren(...options.map((option) => {
    const filter = makeElement("button", "filter", option.label);
    filter.type = "button";
    filter.dataset[key] = option.value;
    filter.setAttribute("aria-pressed", String(option.value === activeValue));
    if (option.value === activeValue) filter.classList.add("is-active");
    filter.addEventListener("click", () => {
      onSelect(option.value);
      syncFilters();
      render();
    });
    return filter;
  }));
}

function renderFilters() {
  const collections = [...new Set(projects.map((project) => project.collection).filter(Boolean))].sort();
  const platforms = [...new Set(projects.flatMap((project) =>
    (project.platforms || []).map((platform) => platform.name)
  ))].sort();
  renderFilterGroup(collectionFilters, "collection", "All collections", collections, activeCollection, (value) => {
    activeCollection = value;
  });
  renderFilterGroup(platformFilters, "platform", "All platforms", platforms, activePlatform, (value) => {
    activePlatform = value;
  });
}

for (const filter of filters) {
  filter.addEventListener("click", () => {
    activeFilter = filter.dataset.filter;
    syncFilters();
    render();
  });
}

search.addEventListener("input", render);

async function loadCatalog() {
  try {
    const response = await fetch("catalog.json?v=11");
    if (!response.ok) throw new Error(`Catalog request failed with status ${response.status}`);
    const catalog = await response.json();
    if (!Array.isArray(catalog.items)) throw new TypeError("Catalog is missing its items list");
    projects = catalog.items;
    renderFilters();
    render();
    surpriseButton.disabled = projects.length === 0;
  } catch (error) {
    catalogError.hidden = false;
    catalogError.textContent = "The collection could not load. Refresh the page or open catalog.json directly.";
    console.error("Could not load the content catalog.", error);
  }
}

loadCatalog();
