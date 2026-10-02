const contentRoot = document.querySelector("#content");

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}

function renderImageFrame(item) {
  const className = item.contain ? "image-frame image-frame--contain" : "image-frame";
  const frame = createElement("div", className);
  const image = createElement("img");

  image.src = item.image;
  image.alt = item.alt;
  frame.append(image);

  return frame;
}

function renderCard(item) {
  const card = createElement("article", "card");
  const body = createElement("div", "card-body");
  const name = createElement("div", "name", item.name);

  body.append(name);

  if (item.note) {
    body.append(createElement("div", "note", item.note));
  }

  card.append(renderCardImage(item), body);
  return card;
}

function renderCardImage(item) {
  if (!item.images) {
    return renderImageFrame(item);
  }

  const gallery = createElement("div", "image-frame image-frame--gallery");

  item.images.forEach((imageData) => {
    const image = createElement("img");
    image.src = imageData.image;
    image.alt = imageData.alt;
    gallery.append(image);
  });

  return gallery;
}

function renderCardGroup(group) {
  const groupElement = createElement("div", "card-group");
  const label = createElement("h3", "label", group.label);
  const grid = createElement("div", "cards");

  group.items.forEach((item) => grid.append(renderCard(item)));
  groupElement.append(label, grid);

  return groupElement;
}

function renderListItem(item) {
  const row = createElement("div", "row");
  const rowHeader = createElement("div", "row-header");
  const title = createElement("div", "row-title");

  if (item.category) {
    title.append(createElement("span", "label", item.category));
  }

  title.append(createElement("strong", "", item.name));

  const link = createElement("a", item.linkLabel ? "row-link" : "icon-link");
  link.href = item.href;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = item.linkLabel ? `${item.linkLabel} ↗` : "↗";
  link.setAttribute("aria-label", `${item.linkLabel || "View reference"}: ${item.name}`);
  link.title = item.linkLabel || "View reference";

  rowHeader.append(title, link);
  row.append(rowHeader);

  if (item.note) {
    row.append(createElement("div", "note", item.note));
  }

  return row;
}

function renderSection(section) {
  const sectionElement = createElement("section");
  const wrap = createElement("div", "wrap");
  const heading = createElement("div", "section-head");
  heading.append(createElement("h2", "", section.title));
  wrap.append(heading);

  if (section.type === "cards") {
    section.groups.forEach((group) => wrap.append(renderCardGroup(group)));
  } else if (section.type === "image") {
    const figure = createElement("figure", "resin");
    const imageFrame = renderImageFrame({
      image: section.image,
      alt: section.alt,
      contain: true
    });
    imageFrame.classList.add("image-frame--natural");
    imageFrame.setAttribute("role", "region");
    imageFrame.setAttribute("aria-label", "Scrollable resin reference image");
    imageFrame.tabIndex = 0;
    figure.append(imageFrame);

    if (section.caption) {
      figure.append(createElement("figcaption", "", section.caption));
    }

    wrap.append(figure);
  } else if (section.type === "list") {
    const list = createElement("div", "list");
    section.items.forEach((item) => list.append(renderListItem(item)));
    wrap.append(list);
  }

  sectionElement.id = section.id;
  sectionElement.append(wrap);
  return sectionElement;
}

contentRoot.replaceChildren(...window.WTB_SECTIONS.map(renderSection));