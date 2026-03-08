(() => {
  const STORAGE_KEY = "er_cms_data_v1";
  const USERS_KEY = "er_admin_users_v1";
  const SESSION_KEY = "er_admin_session_v1";

  const defaultData = {
    home: {
      eyebrow: "Outdoor Community in Greece",
      title: "Βγες έξω, γνώρισε ανθρώπους, ζήσε εμπειρίες.",
      lead: "Το Escape Reality φέρνει κοντά ανθρώπους που αγαπούν το βουνό, τη φύση και τις πραγματικές στιγμές.",
      intro:
        "Εδώ ξεκινά κάθε περιπέτεια. Μια ανάσα μακριά από τη ρουτίνα, εκεί που η φύση και η ηρεμία σε καλούν να αποσυνδεθείς απ' τον θόρυβο της πόλης και να θυμηθείς ποιος είσαι πραγματικά.",
      slides: [
        { src: "./images/photo1.webp", alt: "Ορεινή θέα στη φύση" },
        { src: "./images/photo2.jpg", alt: "Δραστηριότητα ομάδας σε μονοπάτι" },
        { src: "./images/photo3.webp", alt: "Εξόρμηση σε φυσικό τοπίο" },
        { src: "./images/photo4.webp", alt: "Στιγμή από συνάντηση Escape Reality" },
      ],
      stats: [
        { value: "20+", label: "Δράσεις στη φύση" },
        { value: "5", label: "Περιοχές εξερεύνησης" },
        { value: "1 κοινότητα", label: "Με κοινό ρυθμό" },
      ],
    },
    activitiesPage: {
      equipment: [
        "Σακίδιο με νερό και ελαφρύ γεύμα",
        "Ανθεκτικά παπούτσια πεζοπορίας",
        "Αδιάβροχο ή ζεστό ρούχο ανάλογα με την εποχή",
        "Καλή διάθεση και ομαδικό πνεύμα",
      ],
      quote: "\"Η πραγματικότητα αρχίζει εκεί που τελειώνει η άνεση.\"",
    },
    activities: [
      {
        id: "act_1",
        title: "Πεζοπορία στο Πήλιο",
        description:
          "Μια ήρεμη διαδρομή μέσα στο δάσος με θέα στο Αιγαίο. Ανακάλυψε μονοπάτια που συνδέουν τα χωριά του Πηλίου και απόλαυσε τη φύση στο έπακρο.",
        badges: ["Επίπεδο: Μέτριο", "Διάρκεια: 4 ώρες", "Ομάδα: 12 άτομα"],
        images: [
          { src: "./images/extra/λιμνη-δοξα/εικόνα_Viber_2025-10-22_23-33-01-581.jpg", alt: "Πεζοπορία Πηλίου" },
          { src: "./images/extra/λιμνη-δοξα/εικόνα_Viber_2025-10-22_23-33-01-684.jpg", alt: "Πεζοπορία στο δάσος" },
        ],
      },
      {
        id: "act_2",
        title: "Ανάβαση στον Όλυμπο",
        description:
          "Ζήσε την εμπειρία της ανάβασης στο ψηλότερο σημείο της Ελλάδας και νιώσε την ενέργεια του βουνού των Θεών.",
        badges: ["Επίπεδο: Απαιτητικό", "Διάρκεια: 2 ημέρες", "Ομάδα: 8 άτομα"],
        images: [
          { src: "./images/extra/ξηροβουνι/εικόνα_Viber_2025-10-22_23-34-19-669.jpg", alt: "Ανάβαση Ολύμπου" },
          { src: "./images/extra/ξηροβουνι/εικόνα_Viber_2025-10-22_23-34-19-780.jpg", alt: "Ορειβασία στον Όλυμπο" },
        ],
      },
      {
        id: "act_3",
        title: "Camping στην Ευρυτανία",
        description:
          "Διανυκτέρευση κάτω απ' τα αστέρια, κοντά στο ποτάμι. Η απόλυτη επαφή με τη φύση και την ηρεμία της.",
        badges: ["Επίπεδο: Εύκολο", "Διάρκεια: 1 βράδυ", "Ομάδα: 15 άτομα"],
        images: [
          {
            src: "./images/extra/καλαβρυτα-διασχυση-οδοντοτου/εικόνα_Viber_2025-10-22_23-35-48-422.jpg",
            alt: "Camping Ευρυτανίας",
          },
          {
            src: "./images/extra/καλαβρυτα-διασχυση-οδοντοτου/εικόνα_Viber_2025-10-22_23-35-48-563.jpg",
            alt: "Φύση στην Ευρυτανία",
          },
        ],
      },
      {
        id: "act_4",
        title: "Πολυλίμνιο",
        description:
          "Διαδρομές με νερό, βράχια και πλούσια βλάστηση, ιδανικές για όσους θέλουν δυνατές εικόνες και αίσθηση εξερεύνησης.",
        badges: ["Επίπεδο: Μέτριο", "Διάρκεια: 5 ώρες", "Ομάδα: 10 άτομα"],
        images: [
          { src: "./images/extra/πολυλιμνιο/εικόνα_Viber_2025-10-22_23-37-38-387.jpg", alt: "Πολυλίμνιο - φυσικό τοπίο" },
          { src: "./images/extra/πολυλιμνιο/εικόνα_Viber_2025-10-22_23-37-38-424.jpg", alt: "Πολυλίμνιο - διαδρομή στη φύση" },
        ],
      },
    ],
    events: {
      upcoming: {
        label: "Επόμενο Event",
        title: "Sunset Πεζοπορία στο Πήλιο",
        description: "Απογευματινή διαδρομή με στάση σε σημείο θέας και επιστροφή με headlamps.",
        badges: ["Κυριακή 29 Μαρτίου 2026", "Μακρινίτσα", "Μέτριο επίπεδο"],
      },
      list: [
        {
          id: "ev_1",
          title: "Φθινοπωρινή Πεζοπορία στο Μαυροβούνι",
          description:
            "Μια μαγευτική διαδρομή μέσα στα χρώματα του φθινοπώρου, όπου η ομάδα περπάτησε στα μονοπάτια του Μαυροβουνίου και απόλαυσε τη φύση στο απόγειό της.",
          badges: ["Οκτώβριος 2025", "Trail Walk"],
        },
        {
          id: "ev_2",
          title: "Βραδιά Camping στη Λίμνη Πλαστήρα",
          description:
            "Φωτιά στο κέντρο, ιστορίες, μουσική και χαλαρή διάθεση κάτω από τα αστέρια. Ένα Σαββατοκύριακο αφιερωμένο στην ηρεμία και την παρέα.",
          badges: ["Νοέμβριος 2025", "Overnight"],
        },
        {
          id: "ev_3",
          title: "Χειμερινή Εξόρμηση στον Όλυμπο",
          description:
            "Ένα τριήμερο γεμάτο ενέργεια, χιόνι και νέες προκλήσεις. Η ομάδα ανέβηκε ως το καταφύγιο \"Αγαπητός\" και έζησε τη μαγεία του βουνού των Θεών.",
          badges: ["Ιανουάριος 2026", "Mountain Trip"],
        },
      ],
    },
    info: {
      title: "Η ιστορία του Escape Reality",
      paragraphs: [
        "Όλα ξεκίνησαν ένα καλοκαιρινό βράδυ, γύρω από μια φωτιά στην καρδιά του δάσους. Μια παρέα φίλων, κουρασμένων από τον ρυθμό της πόλης, αποφάσισε να κάνει κάτι διαφορετικό: να ανακαλύψει ξανά τη φύση, τον εαυτό της και την απλότητα.",
        "Από τις πρώτες πεζοπορίες στο Πήλιο, μέχρι τα camping στην Ευρυτανία και τις αναβάσεις στον Όλυμπο, το ταξίδι συνεχίζεται με κάθε νέα εμπειρία και κάθε νέο άνθρωπο που ενώνεται μαζί μας.",
      ],
    },
    gallery: [
      {
        id: "g_1",
        src: "./images/extra/gallery/εικόνα_Viber_2025-10-22_23-33-01-581.jpg",
        alt: "Στιγμή από ορεινή διαδρομή",
        caption: "Στιγμή από ορεινή διαδρομή",
      },
      {
        id: "g_2",
        src: "./images/extra/gallery/εικόνα_Viber_2025-10-22_23-33-33-424.jpg",
        alt: "Παρέα στη φύση",
        caption: "Παρέα στη φύση",
      },
      {
        id: "g_3",
        src: "./images/extra/gallery/εικόνα_Viber_2025-10-22_23-33-33-651.jpg",
        alt: "Τοπίο από εξόρμηση",
        caption: "Τοπίο από εξόρμηση",
      },
      {
        id: "g_4",
        src: "./images/extra/gallery/εικόνα_Viber_2025-10-22_23-34-58-781.jpg",
        alt: "Διαδρομή μέσα στο δάσος",
        caption: "Διαδρομή μέσα στο δάσος",
      },
      {
        id: "g_5",
        src: "./images/extra/gallery/εικόνα_Viber_2025-10-22_23-34-58-808.jpg",
        alt: "Ομαδική εξόρμηση",
        caption: "Ομαδική εξόρμηση",
      },
      {
        id: "g_6",
        src: "./images/extra/gallery/εικόνα_Viber_2025-10-22_23-34-58-828.jpg",
        alt: "Στιγμή χαλάρωσης στην ύπαιθρο",
        caption: "Στιγμή χαλάρωσης στην ύπαιθρο",
      },
    ],
  };

  const clone = (value) => JSON.parse(JSON.stringify(value));

  const ensureAdminUser = () => {
    if (localStorage.getItem(USERS_KEY)) {
      return;
    }
    const users = [{ username: "admin", password: "escape2026" }];
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const loadData = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seed = clone(defaultData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
    try {
      return JSON.parse(raw);
    } catch (_error) {
      const seed = clone(defaultData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
  };

  const saveData = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const resetData = () => {
    const seed = clone(defaultData);
    saveData(seed);
    return seed;
  };

  const login = (username, password) => {
    ensureAdminUser();
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const valid = users.some((u) => u.username === username && u.password === password);
    if (valid) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username, at: Date.now() }));
    }
    return valid;
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
  };

  const isLoggedIn = () => Boolean(sessionStorage.getItem(SESSION_KEY));

  ensureAdminUser();

  window.ERCMS = {
    defaultData: clone(defaultData),
    loadData,
    saveData,
    resetData,
    login,
    logout,
    isLoggedIn,
  };
})();
