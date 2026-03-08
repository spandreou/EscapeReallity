(() => {
  const cms = window.ERCMS;
  if (!cms) return;

  const state = {
    data: cms.loadData(),
  };

  const $ = (id) => document.getElementById(id);

  const el = {
    loginCard: $("admin-login-card"),
    loginForm: $("admin-login-form"),
    loginStatus: $("admin-login-status"),
    dashboard: $("admin-dashboard"),
    logoutBtn: $("admin-logout-btn"),
    saveAllBtn: $("save-all-btn"),
    resetBtn: $("reset-all-btn"),
    saveStatus: $("admin-save-status"),

    homeForm: $("home-form"),
    homeEyebrow: $("home-eyebrow"),
    homeTitle: $("home-title"),
    homeLead: $("home-lead"),
    homeIntro: $("home-intro"),

    activityForm: $("activity-form"),
    activityEditState: $("activity-edit-state"),
    activityId: $("activity-id"),
    activityTitle: $("activity-title"),
    activityDescription: $("activity-description"),
    activityBadges: $("activity-badges"),
    activityImage1: $("activity-image-1"),
    activityImage2: $("activity-image-2"),
    activityFile1: $("activity-image-file-1"),
    activityFile2: $("activity-image-file-2"),
    activityPreview1: $("activity-preview-1"),
    activityPreview2: $("activity-preview-2"),
    activityPreviewCap1: $("activity-preview-cap-1"),
    activityPreviewCap2: $("activity-preview-cap-2"),
    activityList: $("activity-list-admin"),

    upcomingForm: $("upcoming-form"),
    upcomingLabel: $("upcoming-label"),
    upcomingTitle: $("upcoming-title"),
    upcomingDescription: $("upcoming-description"),
    upcomingBadges: $("upcoming-badges"),

    eventForm: $("event-form"),
    eventEditState: $("event-edit-state"),
    eventId: $("event-id"),
    eventTitle: $("event-title"),
    eventDescription: $("event-description"),
    eventBadges: $("event-badges"),
    eventList: $("event-list-admin"),

    infoForm: $("info-form"),
    infoTitle: $("info-title"),
    infoP1: $("info-p1"),
    infoP2: $("info-p2"),

    galleryForm: $("gallery-form"),
    galleryEditState: $("gallery-edit-state"),
    galleryId: $("gallery-id"),
    galleryCaption: $("gallery-caption"),
    galleryUrl: $("gallery-image-url"),
    galleryFile: $("gallery-image-file"),
    galleryPreview: $("gallery-preview"),
    galleryPreviewCap: $("gallery-preview-cap"),
    galleryList: $("gallery-list-admin"),
  };

  const uid = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const short = (value, len = 110) => {
    const text = String(value || "");
    return text.length > len ? `${text.slice(0, len)}...` : text;
  };
  const parseCommaList = (value) =>
    String(value || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const setSaveStatus = (message, isError = false) => {
    el.saveStatus.textContent = message;
    el.saveStatus.style.color = isError ? "#ffd1d1" : "#d5f2d6";
  };

  const setLoginStatus = (message, isError = false) => {
    el.loginStatus.textContent = message;
    el.loginStatus.style.color = isError ? "#ffbebe" : "#d5f2d6";
  };

  const persist = (message = "Αποθηκεύτηκε.") => {
    cms.saveData(state.data);
    setSaveStatus(message, false);
  };

  const setPreview = (imgEl, capEl, src, caption) => {
    if (!imgEl || !capEl) return;
    if (src) {
      imgEl.src = src;
      imgEl.hidden = false;
      capEl.textContent = caption || "Image preview";
    } else {
      imgEl.src = "";
      imgEl.hidden = true;
      capEl.textContent = "No image preview";
    }
  };

  const toDataUrlRaw = (file) =>
    new Promise((resolve, reject) => {
      if (!file) {
        resolve("");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("File read failed"));
      reader.readAsDataURL(file);
    });

  const fileToCompressedDataUrl = async (file) => {
    const source = await toDataUrlRaw(file);
    if (!source) return "";

    const image = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Image load failed"));
      img.src = source;
    });

    const maxWidth = 1400;
    const scale = image.width > maxWidth ? maxWidth / image.width : 1;
    const width = Math.round(image.width * scale);
    const height = Math.round(image.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", 0.82);
  };

  const setActivityEditMode = (isEditing, title = "") => {
    el.activityForm.classList.toggle("is-editing", isEditing);
    el.activityEditState.textContent = isEditing ? `Mode: Edit δράσης - ${title}` : "Mode: Νέα δράση";
  };

  const setEventEditMode = (isEditing, title = "") => {
    el.eventForm.classList.toggle("is-editing", isEditing);
    el.eventEditState.textContent = isEditing ? `Mode: Edit event - ${title}` : "Mode: Νέο event";
  };

  const setGalleryEditMode = (isEditing, caption = "") => {
    el.galleryForm.classList.toggle("is-editing", isEditing);
    el.galleryEditState.textContent = isEditing ? `Mode: Edit φωτογραφίας - ${caption}` : "Mode: Νέα φωτογραφία";
  };

  const updateActivityPreviews = async () => {
    const src1 = el.activityFile1.files[0] ? await toDataUrlRaw(el.activityFile1.files[0]) : el.activityImage1.value.trim();
    const src2 = el.activityFile2.files[0] ? await toDataUrlRaw(el.activityFile2.files[0]) : el.activityImage2.value.trim();
    setPreview(el.activityPreview1, el.activityPreviewCap1, src1, "Image 1 preview");
    setPreview(el.activityPreview2, el.activityPreviewCap2, src2, "Image 2 preview");
  };

  const updateGalleryPreview = async () => {
    const src = el.galleryFile.files[0] ? await toDataUrlRaw(el.galleryFile.files[0]) : el.galleryUrl.value.trim();
    setPreview(el.galleryPreview, el.galleryPreviewCap, src, el.galleryCaption.value.trim() || "Gallery preview");
  };

  const renderActivityList = () => {
    el.activityList.innerHTML = state.data.activities
      .map(
        (item) => `
          <div class="admin-list__item">
            <p><strong>${item.title}</strong><br>${short(item.description)}</p>
            <div class="admin-list__buttons">
              <button type="button" data-type="activity" data-action="edit" data-id="${item.id}">Edit</button>
              <button type="button" data-type="activity" data-action="delete" data-id="${item.id}">Delete</button>
            </div>
          </div>
        `
      )
      .join("");
  };

  const renderEventList = () => {
    el.eventList.innerHTML = state.data.events.list
      .map(
        (item) => `
          <div class="admin-list__item">
            <p><strong>${item.title}</strong><br>${short(item.description)}</p>
            <div class="admin-list__buttons">
              <button type="button" data-type="event" data-action="edit" data-id="${item.id}">Edit</button>
              <button type="button" data-type="event" data-action="delete" data-id="${item.id}">Delete</button>
            </div>
          </div>
        `
      )
      .join("");
  };

  const renderGalleryList = () => {
    el.galleryList.innerHTML = state.data.gallery
      .map(
        (item) => `
          <div class="admin-list__item">
            <img src="${item.src}" alt="${item.caption || "Gallery"}">
            <p><strong>${item.caption || "Χωρίς περιγραφή"}</strong><br>${item.alt || ""}</p>
            <div class="admin-list__buttons">
              <button type="button" data-type="gallery" data-action="edit" data-id="${item.id}">Edit</button>
              <button type="button" data-type="gallery" data-action="delete" data-id="${item.id}">Delete</button>
            </div>
          </div>
        `
      )
      .join("");
  };

  const fillForms = () => {
    el.homeEyebrow.value = state.data.home.eyebrow;
    el.homeTitle.value = state.data.home.title;
    el.homeLead.value = state.data.home.lead;
    el.homeIntro.value = state.data.home.intro;

    el.upcomingLabel.value = state.data.events.upcoming.label;
    el.upcomingTitle.value = state.data.events.upcoming.title;
    el.upcomingDescription.value = state.data.events.upcoming.description;
    el.upcomingBadges.value = state.data.events.upcoming.badges.join(", ");

    el.infoTitle.value = state.data.info.title;
    el.infoP1.value = state.data.info.paragraphs[0] || "";
    el.infoP2.value = state.data.info.paragraphs[1] || "";

    renderActivityList();
    renderEventList();
    renderGalleryList();

    resetActivityForm();
    resetEventForm();
    resetGalleryForm();
  };

  const resetActivityForm = () => {
    el.activityForm.reset();
    el.activityId.value = "";
    setActivityEditMode(false);
    setPreview(el.activityPreview1, el.activityPreviewCap1, "", "");
    setPreview(el.activityPreview2, el.activityPreviewCap2, "", "");
  };

  const resetEventForm = () => {
    el.eventForm.reset();
    el.eventId.value = "";
    setEventEditMode(false);
  };

  const resetGalleryForm = () => {
    el.galleryForm.reset();
    el.galleryId.value = "";
    setGalleryEditMode(false);
    setPreview(el.galleryPreview, el.galleryPreviewCap, "", "");
  };

  const showDashboard = () => {
    const loggedIn = cms.isLoggedIn();
    el.loginCard.hidden = loggedIn;
    el.dashboard.hidden = !loggedIn;
    if (loggedIn) {
      fillForms();
      setSaveStatus("");
    }
  };

  el.loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(el.loginForm);
    const username = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "").trim();
    if (cms.login(username, password)) {
      setLoginStatus("Σύνδεση επιτυχής.");
      el.loginForm.reset();
      showDashboard();
    } else {
      setLoginStatus("Λάθος username ή password.", true);
    }
  });

  el.logoutBtn.addEventListener("click", () => {
    cms.logout();
    setLoginStatus("");
    showDashboard();
  });

  el.saveAllBtn.addEventListener("click", () => {
    persist("Αποθηκεύτηκαν όλες οι αλλαγές.");
  });

  el.resetBtn.addEventListener("click", () => {
    if (!confirm("Να γίνει reset όλων των δεδομένων στα defaults;")) return;
    state.data = cms.resetData();
    fillForms();
    setSaveStatus("Έγινε reset στα default δεδομένα.");
  });

  el.homeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.data.home.eyebrow = el.homeEyebrow.value.trim();
    state.data.home.title = el.homeTitle.value.trim();
    state.data.home.lead = el.homeLead.value.trim();
    state.data.home.intro = el.homeIntro.value.trim();
    persist("Αποθηκεύτηκε η αρχική σελίδα.");
  });

  el.activityImage1.addEventListener("input", updateActivityPreviews);
  el.activityImage2.addEventListener("input", updateActivityPreviews);
  el.activityFile1.addEventListener("change", updateActivityPreviews);
  el.activityFile2.addEventListener("change", updateActivityPreviews);

  el.activityForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = el.activityId.value.trim() || uid("act");
    const existing = state.data.activities.find((item) => item.id === id);

    const file1Data = await fileToCompressedDataUrl(el.activityFile1.files[0]);
    const file2Data = await fileToCompressedDataUrl(el.activityFile2.files[0]);
    const url1 = el.activityImage1.value.trim();
    const url2 = el.activityImage2.value.trim();

    const img1 = file1Data || url1 || existing?.images?.[0]?.src || "";
    const img2 = file2Data || url2 || existing?.images?.[1]?.src || "";
    const images = [img1, img2].filter(Boolean).map((src) => ({ src, alt: el.activityTitle.value.trim() }));

    const payload = {
      id,
      title: el.activityTitle.value.trim(),
      description: el.activityDescription.value.trim(),
      badges: parseCommaList(el.activityBadges.value),
      images,
    };

    const idx = state.data.activities.findIndex((item) => item.id === id);
    if (idx >= 0) {
      state.data.activities[idx] = payload;
      persist("Η δράση ενημερώθηκε.");
    } else {
      state.data.activities.push(payload);
      persist("Η δράση προστέθηκε.");
    }

    renderActivityList();
    resetActivityForm();
  });

  el.activityList.addEventListener("click", async (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const id = button.dataset.id;
    const action = button.dataset.action;
    const item = state.data.activities.find((activity) => activity.id === id);
    if (!item) return;

    if (action === "edit") {
      el.activityId.value = item.id;
      el.activityTitle.value = item.title;
      el.activityDescription.value = item.description;
      el.activityBadges.value = item.badges.join(", ");
      el.activityImage1.value = item.images[0]?.src || "";
      el.activityImage2.value = item.images[1]?.src || "";
      el.activityFile1.value = "";
      el.activityFile2.value = "";
      setActivityEditMode(true, item.title);
      await updateActivityPreviews();
      el.activityForm.scrollIntoView({ behavior: "smooth", block: "start" });
      setSaveStatus(`Έτοιμο για edit: ${item.title}`);
    } else if (action === "delete") {
      if (!confirm("Να διαγραφεί η δράση;")) return;
      state.data.activities = state.data.activities.filter((activity) => activity.id !== id);
      persist("Η δράση διαγράφηκε.");
      renderActivityList();
      if (el.activityId.value === id) {
        resetActivityForm();
      }
    }
  });

  el.upcomingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.data.events.upcoming = {
      label: el.upcomingLabel.value.trim(),
      title: el.upcomingTitle.value.trim(),
      description: el.upcomingDescription.value.trim(),
      badges: parseCommaList(el.upcomingBadges.value),
    };
    persist("Το Upcoming Event ενημερώθηκε.");
  });

  el.eventForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = el.eventId.value.trim() || uid("ev");
    const payload = {
      id,
      title: el.eventTitle.value.trim(),
      description: el.eventDescription.value.trim(),
      badges: parseCommaList(el.eventBadges.value),
    };
    const idx = state.data.events.list.findIndex((item) => item.id === id);
    if (idx >= 0) {
      state.data.events.list[idx] = payload;
      persist("Το event ενημερώθηκε.");
    } else {
      state.data.events.list.push(payload);
      persist("Το event προστέθηκε.");
    }
    renderEventList();
    resetEventForm();
  });

  el.eventList.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const id = button.dataset.id;
    const action = button.dataset.action;
    const item = state.data.events.list.find((ev) => ev.id === id);
    if (!item) return;

    if (action === "edit") {
      el.eventId.value = item.id;
      el.eventTitle.value = item.title;
      el.eventDescription.value = item.description;
      el.eventBadges.value = item.badges.join(", ");
      setEventEditMode(true, item.title);
      el.eventForm.scrollIntoView({ behavior: "smooth", block: "start" });
      setSaveStatus(`Έτοιμο για edit: ${item.title}`);
    } else if (action === "delete") {
      if (!confirm("Να διαγραφεί το event;")) return;
      state.data.events.list = state.data.events.list.filter((ev) => ev.id !== id);
      persist("Το event διαγράφηκε.");
      renderEventList();
      if (el.eventId.value === id) {
        resetEventForm();
      }
    }
  });

  el.infoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.data.info.title = el.infoTitle.value.trim();
    state.data.info.paragraphs = [el.infoP1.value.trim(), el.infoP2.value.trim()];
    persist("Οι πληροφορίες ενημερώθηκαν.");
  });

  el.galleryUrl.addEventListener("input", updateGalleryPreview);
  el.galleryCaption.addEventListener("input", updateGalleryPreview);
  el.galleryFile.addEventListener("change", updateGalleryPreview);

  el.galleryForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = el.galleryId.value.trim() || uid("g");
    const existing = state.data.gallery.find((item) => item.id === id);
    const fileData = await fileToCompressedDataUrl(el.galleryFile.files[0]);
    const src = fileData || el.galleryUrl.value.trim() || existing?.src || "";
    if (!src) {
      setSaveStatus("Βάλε URL ή ανέβασε φωτογραφία.", true);
      return;
    }

    const caption = el.galleryCaption.value.trim();
    const payload = { id, src, alt: caption, caption };
    const idx = state.data.gallery.findIndex((item) => item.id === id);
    if (idx >= 0) {
      state.data.gallery[idx] = payload;
      persist("Η φωτογραφία ενημερώθηκε.");
    } else {
      state.data.gallery.push(payload);
      persist("Η φωτογραφία προστέθηκε.");
    }

    renderGalleryList();
    resetGalleryForm();
  });

  el.galleryList.addEventListener("click", async (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const id = button.dataset.id;
    const action = button.dataset.action;
    const item = state.data.gallery.find((photo) => photo.id === id);
    if (!item) return;

    if (action === "edit") {
      el.galleryId.value = item.id;
      el.galleryCaption.value = item.caption || "";
      el.galleryUrl.value = item.src || "";
      el.galleryFile.value = "";
      setGalleryEditMode(true, item.caption || item.id);
      await updateGalleryPreview();
      el.galleryForm.scrollIntoView({ behavior: "smooth", block: "start" });
      setSaveStatus(`Έτοιμο για edit: ${item.caption || "Gallery image"}`);
    } else if (action === "delete") {
      if (!confirm("Να διαγραφεί η φωτογραφία;")) return;
      state.data.gallery = state.data.gallery.filter((photo) => photo.id !== id);
      persist("Η φωτογραφία διαγράφηκε.");
      renderGalleryList();
      if (el.galleryId.value === id) {
        resetGalleryForm();
      }
    }
  });

  showDashboard();
})();
