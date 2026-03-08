(() => {
  const cms = window.ERCMS;
  if (!cms) {
    return;
  }

  const data = cms.loadData();
  const body = document.body;

  const escapeHtml = (value = "") =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  const renderHome = () => {
    const eyebrow = document.querySelector(".hero__eyebrow");
    const title = document.querySelector(".hero__title");
    const lead = document.querySelector(".hero__lead");
    const intro = document.getElementById("home-intro");
    const carousel = document.getElementById("home-carousel");
    const stats = document.getElementById("home-stats");

    if (eyebrow) eyebrow.textContent = data.home.eyebrow;
    if (title) title.textContent = data.home.title;
    if (lead) lead.textContent = data.home.lead;
    if (intro) intro.textContent = data.home.intro;

    if (carousel) {
      carousel.innerHTML = data.home.slides
        .map(
          (slide, idx) =>
            `<img src="${escapeHtml(slide.src)}" alt="${escapeHtml(slide.alt)}" class="slide" ${
              idx > 0 ? 'loading="lazy" decoding="async"' : 'fetchpriority="high"'
            }>`
        )
        .join("");
    }

    if (stats) {
      stats.innerHTML = data.home.stats
        .map(
          (item) => `
          <article class="quick-stats__item">
            <h2>${escapeHtml(item.value)}</h2>
            <p>${escapeHtml(item.label)}</p>
          </article>
        `
        )
        .join("");
    }
  };

  const renderActivities = () => {
    const list = document.getElementById("activities-list");
    const gear = document.getElementById("activities-gear-list");
    const quote = document.getElementById("activities-quote");
    if (!list) {
      return;
    }

    list.innerHTML = data.activities
      .map(
        (activity) => `
      <article class="activity">
        <div class="activity-carousel">
          ${activity.images
            .map(
              (img) =>
                `<img src="${escapeHtml(img.src)}" alt="${escapeHtml(img.alt || activity.title)}" class="slide" loading="lazy" decoding="async">`
            )
            .join("")}
        </div>
        <div class="activity-text">
          <h2>${escapeHtml(activity.title)}</h2>
          <div class="activity-meta">
            ${activity.badges.map((badge) => `<span class="badge">${escapeHtml(badge)}</span>`).join("")}
          </div>
          <p>${escapeHtml(activity.description)}</p>
          <a href="./contacts.html" class="btn btn--ghost activity-cta">Θέλω να συμμετέχω</a>
        </div>
      </article>
    `
      )
      .join("");

    if (gear) {
      gear.innerHTML = data.activitiesPage.equipment.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    }
    if (quote) {
      quote.textContent = data.activitiesPage.quote;
    }
  };

  const renderEvents = () => {
    const upcoming = document.getElementById("upcoming-event");
    const list = document.getElementById("events-list");
    if (!upcoming || !list) {
      return;
    }

    const next = data.events.upcoming;
    upcoming.innerHTML = `
      <p class="upcoming-event__label">${escapeHtml(next.label)}</p>
      <h2>${escapeHtml(next.title)}</h2>
      <div class="event-meta">
        ${next.badges.map((badge) => `<span class="badge">${escapeHtml(badge)}</span>`).join("")}
      </div>
      <p>${escapeHtml(next.description)}</p>
      <a href="./contacts.html" class="btn">Κράτησε θέση</a>
    `;

    list.innerHTML = data.events.list
      .map(
        (eventItem) => `
      <article class="event">
        <h2>${escapeHtml(eventItem.title)}</h2>
        <div class="event-meta">
          ${eventItem.badges.map((badge) => `<span class="badge">${escapeHtml(badge)}</span>`).join("")}
        </div>
        <p>${escapeHtml(eventItem.description)}</p>
        <div class="event-footer">
          <a href="./contacts.html" class="btn btn--ghost">Μάθε λεπτομέρειες</a>
        </div>
      </article>
    `
      )
      .join("");
  };

  const renderInfo = () => {
    const title = document.getElementById("info-title");
    const story = document.getElementById("info-story");
    const gallery = document.getElementById("gallery-grid");
    if (!story || !gallery) {
      return;
    }

    if (title) {
      title.textContent = data.info.title;
    }

    story.innerHTML = data.info.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");

    gallery.innerHTML = data.gallery
      .map(
        (item) => `
      <figure class="gallery-item">
        <img
          src="${escapeHtml(item.src)}"
          alt="${escapeHtml(item.alt || item.caption || "Gallery image")}"
          loading="lazy"
          decoding="async"
          data-lightbox="gallery"
        >
        <figcaption>${escapeHtml(item.caption || "")}</figcaption>
      </figure>
    `
      )
      .join("");
  };

  if (body.classList.contains("index-page")) {
    renderHome();
  }
  if (body.classList.contains("activities-page")) {
    renderActivities();
  }
  if (body.classList.contains("events-page")) {
    renderEvents();
  }
  if (body.classList.contains("information-page")) {
    renderInfo();
  }
})();
