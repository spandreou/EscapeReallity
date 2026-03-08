(() => {
  const header = document.querySelector(".site-header");
  const nav = document.getElementById("primary-nav");
  const navToggle = document.querySelector(".nav-toggle");

  const closeMenu = () => {
    if (!header || !navToggle) {
      return;
    }
    header.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  if (header && nav && navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("menu-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
          closeMenu();
        }
      });
    });

    document.addEventListener("click", (event) => {
      if (!header.classList.contains("menu-open")) {
        return;
      }
      if (!header.contains(event.target)) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });
  }

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach((link) => {
    const href = (link.getAttribute("href") || "").replace("./", "");
    link.classList.toggle("active", href === currentPath);
  });

  const galleryImages = Array.from(document.querySelectorAll('[data-lightbox="gallery"]'));
  if (galleryImages.length) {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.hidden = true;
    lightbox.innerHTML = `
      <button class="lightbox__close" type="button" aria-label="Κλείσιμο">×</button>
      <img class="lightbox__image" src="" alt="">
    `;
    document.body.appendChild(lightbox);

    const imageElement = lightbox.querySelector(".lightbox__image");
    const closeButton = lightbox.querySelector(".lightbox__close");
    let currentIndex = 0;

    const openLightbox = (index) => {
      currentIndex = index;
      const image = galleryImages[currentIndex];
      imageElement.src = image.src;
      imageElement.alt = image.alt || "Gallery image";
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
      lightbox.hidden = true;
      document.body.style.overflow = "";
      imageElement.src = "";
    };

    const move = (direction) => {
      const length = galleryImages.length;
      currentIndex = (currentIndex + direction + length) % length;
      openLightbox(currentIndex);
    };

    galleryImages.forEach((image, index) => {
      image.addEventListener("click", () => openLightbox(index));
    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (lightbox.hidden) {
        return;
      }
      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowRight") {
        move(1);
      } else if (event.key === "ArrowLeft") {
        move(-1);
      }
    });
  }

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (!form || !status) {
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  const instagramUrl = "https://www.instagram.com/escape_reality_gr/";
  const contactEmail = (form.dataset.contactEmail || "").trim();

  const setStatus = (message, isError = false) => {
    status.textContent = message;
    status.classList.toggle("is-error", isError);
    status.classList.toggle("is-success", !isError);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
    }

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = `Νέο μήνυμα από ${name} | Escape Reality`;
    const body = [`Όνομα: ${name}`, `Email: ${email}`, "", "Μήνυμα:", message].join("\n");

    if (contactEmail) {
      const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
      form.reset();
      setStatus("Άνοιξε το email client για να ολοκληρώσεις την αποστολή.");
      if (submitButton) {
        submitButton.disabled = false;
      }
      return;
    }

    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard.writeText(body).catch(() => {
        // Clipboard write is optional. Fallback continues.
      });
    }

    window.open(instagramUrl, "_blank", "noopener,noreferrer");
    form.reset();
    setStatus("Δεν έχει οριστεί email παραλήπτη. Άνοιξε το Instagram και επικόλλησε το μήνυμα.", true);

    if (submitButton) {
      submitButton.disabled = false;
    }
  });
})();
