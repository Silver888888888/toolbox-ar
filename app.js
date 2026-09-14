"use strict";

/* =========================================================
   ToolBox AR - Version 3
   يعمل بالكامل من المتصفح
   ========================================================= */

const $ = (selector) => document.querySelector(selector);

const tools = [

  /* ================= TEXT ================= */

  {
    id: "text-counter",
    name: "عداد الكلمات والحروف",
    icon: "🔢",
    category: "text",
    categoryName: "النصوص",
    description: "احسب الكلمات والحروف والأسطر والمسافات في أي نص.",
    render: renderTextCounter
  },

  {
    id: "case-converter",
    name: "تحويل حالة النص",
    icon: "Aa",
    category: "text",
    categoryName: "النصوص",
    description: "حوّل النص إلى أحرف كبيرة أو صغيرة أو عنوان.",
    render: renderCaseConverter
  },

  {
    id: "remove-duplicates",
    name: "إزالة الأسطر المكررة",
    icon: "♻️",
    category: "text",
    categoryName: "النصوص",
    description: "احذف الأسطر المكررة من النص بسرعة.",
    render: renderRemoveDuplicates
  },

  {
    id: "sort-lines",
    name: "ترتيب الأسطر",
    icon: "↕️",
    category: "text",
    categoryName: "النصوص",
    description: "رتب الأسطر أبجديًا أو رقميًا.",
    render: renderSortLines
  },

  {
    id: "reverse-text",
    name: "عكس النص",
    icon: "🔄",
    category: "text",
    categoryName: "النصوص",
    description: "اعكس ترتيب الأحرف أو الأسطر.",
    render: renderReverseText
  },

  {
    id: "remove-empty-lines",
    name: "حذف الأسطر الفارغة",
    icon: "🧹",
    category: "text",
    categoryName: "النصوص",
    description: "احذف المسافات والأسطر الفارغة من النص.",
    render: renderRemoveEmptyLines
  },

  {
    id: "slug-generator",
    name: "مولد Slug",
    icon: "🔗",
    category: "text",
    categoryName: "النصوص",
    description: "حوّل العنوان إلى رابط مناسب للمواقع.",
    render: renderSlug
  },

  /* ================= DEVELOPER ================= */

  {
    id: "json-formatter",
    name: "منسق JSON",
    icon: "{ }",
    category: "developer",
    categoryName: "البرمجة",
    description: "نسّق JSON أو ضغطه وتحقق من صحته.",
    render: renderJSON
  },

  {
    id: "base64",
    name: "Base64 Encoder / Decoder",
    icon: "64",
    category: "developer",
    categoryName: "البرمجة",
    description: "تشفير وفك ترميز النص باستخدام Base64.",
    render: renderBase64
  },

  {
    id: "url-encoder",
    name: "URL Encoder",
    icon: "🌐",
    category: "developer",
    categoryName: "البرمجة",
    description: "ترميز وفك ترميز روابط ونصوص URL.",
    render: renderURL
  },

  {
    id: "html-escape",
    name: "HTML Escape",
    icon: "</>",
    category: "developer",
    categoryName: "البرمجة",
    description: "حوّل رموز HTML إلى صيغة آمنة والعكس.",
    render: renderHTMLEscape
  },

  {
    id: "regex-tester",
    name: "اختبار Regex",
    icon: ".*",
    category: "developer",
    categoryName: "البرمجة",
    description: "اختبر التعبيرات النمطية Regex مباشرة في المتصفح.",
    render: renderRegex
  },

  {
    id: "timestamp",
    name: "Unix Timestamp",
    icon: "⏱️",
    category: "developer",
    categoryName: "البرمجة",
    description: "حوّل الوقت بين Unix Timestamp والتاريخ.",
    render: renderTimestamp
  },

  /* ================= SECURITY ================= */

  {
    id: "password-generator",
    name: "مولد كلمات المرور",
    icon: "🔐",
    category: "security",
    categoryName: "الأمان",
    description: "أنشئ كلمات مرور قوية باستخدام مولد عشوائي آمن.",
    render: renderPassword
  },

  {
    id: "uuid-generator",
    name: "مولد UUID",
    icon: "🆔",
    category: "security",
    categoryName: "الأمان",
    description: "أنشئ UUID v4 عشوائيًا.",
    render: renderUUID
  },

  {
    id: "sha256",
    name: "SHA-256",
    icon: "#",
    category: "security",
    categoryName: "الأمان",
    description: "أنشئ بصمة SHA-256 للنص محليًا.",
    render: renderSHA256
  },

  {
    id: "random-token",
    name: "مولد Random Token",
    icon: "🎲",
    category: "security",
    categoryName: "الأمان",
    description: "أنشئ رموزًا عشوائية بصيغة Hex أو Base64.",
    render: renderRandomToken
  },

  /* ================= IMAGE ================= */

  {
    id: "image-resizer",
    name: "تغيير حجم الصور",
    icon: "📐",
    category: "image",
    categoryName: "الصور",
    description: "غيّر أبعاد الصورة وحمّل النسخة الجديدة.",
    render: renderImageResizer
  },

  {
    id: "image-converter",
    name: "تحويل الصور",
    icon: "🖼️",
    category: "image",
    categoryName: "الصور",
    description: "حوّل الصور بين PNG و JPG و WEBP.",
    render: renderImageConverter
  },

  {
    id: "image-compressor",
    name: "ضغط الصور",
    icon: "📦",
    category: "image",
    categoryName: "الصور",
    description: "قلل حجم الصورة باستخدام Canvas وجودة قابلة للتحكم.",
    render: renderImageCompressor
  },

  {
    id: "image-info",
    name: "معلومات الصورة",
    icon: "ℹ️",
    category: "image",
    categoryName: "الصور",
    description: "اعرض نوع الصورة وحجمها وأبعادها.",
    render: renderImageInfo
  },

  /* ================= FILE ================= */

  {
    id: "text-download",
    name: "حفظ النص كملف",
    icon: "💾",
    category: "file",
    categoryName: "الملفات",
    description: "اكتب نصًا واحفظه كملف TXT مباشرة.",
    render: renderTextDownload
  },

  {
    id: "text-file-reader",
    name: "قارئ الملفات النصية",
    icon: "📄",
    category: "file",
    categoryName: "الملفات",
    description: "افتح ملف TXT أو CSV واقرأ محتواه في المتصفح.",
    render: renderTextFileReader
  },

  {
    id: "json-csv",
    name: "JSON ↔ CSV",
    icon: "📊",
    category: "file",
    categoryName: "الملفات",
    description: "حوّل البيانات بين JSON و CSV.",
    render: renderJSONCSV
  },

  /* ================= UTILITY ================= */

  {
    id: "random-number",
    name: "مولد الأرقام العشوائية",
    icon: "🎯",
    category: "utility",
    categoryName: "أدوات عامة",
    description: "ولّد رقمًا عشوائيًا بين حدين.",
    render: renderRandomNumber
  },

  {
    id: "color-generator",
    name: "مولد الألوان",
    icon: "🎨",
    category: "utility",
    categoryName: "أدوات عامة",
    description: "أنشئ ألوانًا عشوائية واحصل على HEX وRGB.",
    render: renderColor
  },

  {
    id: "percentage",
    name: "حاسبة النسبة المئوية",
    icon: "%",
    category: "utility",
    categoryName: "أدوات عامة",
    description: "احسب النسبة المئوية بسهولة.",
    render: renderPercentage
  },

  {
    id: "age-calculator",
    name: "حاسبة العمر",
    icon: "🎂",
    category: "utility",
    categoryName: "أدوات عامة",
    description: "احسب العمر بالسنوات والأشهر والأيام.",
    render: renderAge
  },

  {
    id: "unit-converter",
    name: "محول الوحدات",
    icon: "📏",
    category: "utility",
    categoryName: "أدوات عامة",
    description: "حوّل الطول والوزن والبيانات ودرجات الحرارة.",
    render: renderUnits
  }

];


/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE = {
  favorites: "toolbox_ar_favorites_v3",
  usage: "toolbox_ar_usage_v3",
  recent: "toolbox_ar_recent_v3",
  theme: "toolbox_ar_theme_v3"
};

let favorites = getStorage(STORAGE.favorites, []);
let usage = getStorage(STORAGE.usage, {});
let recent = getStorage(STORAGE.recent, []);

let currentCategory = "all";
let currentTool = null;

function getStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}


/* =========================================================
   INIT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  $("#year").textContent = new Date().getFullYear();

  initTheme();
  initEvents();

  renderTools();
  renderFavorites();
  renderRecent();

  updateStats();

  checkHash();

});


function initEvents() {

  $("#searchInput").addEventListener("input", renderTools);

  $("#sortSelect").addEventListener("change", renderTools);

  $("#categories").addEventListener("click", (event) => {

    const btn = event.target.closest(".category-btn");

    if (!btn) return;

    document.querySelectorAll(".category-btn")
      .forEach(button => button.classList.remove("active"));

    btn.classList.add("active");

    currentCategory = btn.dataset.category;

    renderTools();
  });


  $("#themeBtn").addEventListener("click", toggleTheme);

  $("#menuBtn").addEventListener("click", () => {
    $("#mainNav").classList.toggle("open");
  });


  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      $("#mainNav").classList.remove("open");
    });
  });


  $("#closeModal").addEventListener("click", closeModal);

  $("#modalOverlay").addEventListener("click", closeModal);


  $("#shareToolBtn").addEventListener("click", shareCurrentTool);


  $("#modalFavoriteBtn").addEventListener("click", () => {

    if (!currentTool) return;

    toggleFavorite(currentTool.id);

    updateModalFavorite();

    renderTools();
    renderFavorites();
    updateStats();
  });


  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeModal();
    }

    if (
      event.key === "/" &&
      document.activeElement.tagName !== "INPUT" &&
      document.activeElement.tagName !== "TEXTAREA"
    ) {
      event.preventDefault();
      $("#searchInput").focus();
    }

  });


  window.addEventListener("hashchange", checkHash);
}


/* =========================================================
   THEME
   ========================================================= */

function initTheme() {

  const saved = localStorage.getItem(STORAGE.theme);

  if (saved === "dark") {
    document.body.classList.add("dark");
    $("#themeBtn").textContent = "☀️";
  } else {
    $("#themeBtn").textContent = "🌙";
  }
}

function toggleTheme() {

  const dark = document.body.classList.toggle("dark");

  localStorage.setItem(
    STORAGE.theme,
    dark ? "dark" : "light"
  );

  $("#themeBtn").textContent = dark ? "☀️" : "🌙";
}


/* =========================================================
   TOOLS RENDERING
   ========================================================= */

function renderTools() {

  const grid = $("#toolsGrid");

  const query = $("#searchInput")
    .value
    .trim()
    .toLowerCase();

  let filtered = tools.filter(tool => {

    const matchesCategory =
      currentCategory === "all" ||
      tool.category === currentCategory;

    const searchable =
      `${tool.name} ${tool.description} ${tool.categoryName}`
        .toLowerCase();

    const matchesSearch =
      !query || searchable.includes(query);

    return matchesCategory && matchesSearch;
  });


  const sort = $("#sortSelect").value;

  if (sort === "name") {
    filtered.sort((a,b) =>
      a.name.localeCompare(b.name, "ar")
    );
  }

  if (sort === "usage") {
    filtered.sort((a,b) =>
      (usage[b.id] || 0) -
      (usage[a.id] || 0)
    );
  }

  if (sort === "favorites") {
    filtered.sort((a,b) =>
      Number(favorites.includes(b.id)) -
      Number(favorites.includes(a.id))
    );
  }


  grid.innerHTML = filtered
    .map(toolCard)
    .join("");


  $("#noResults").classList.toggle(
    "hidden",
    filtered.length !== 0
  );


  $("#resultInfo").textContent =
    `عرض ${filtered.length} من أصل ${tools.length} أداة`;


  grid.querySelectorAll(".open-tool")
    .forEach(button => {

      button.addEventListener("click", () => {
        openTool(button.dataset.id);
      });

    });


  grid.querySelectorAll(".favorite-btn")
    .forEach(button => {

      button.addEventListener("click", event => {

        event.stopPropagation();

        toggleFavorite(button.dataset.id);

        renderTools();
        renderFavorites();
        updateStats();
      });

    });
}


function toolCard(tool) {

  const isFavorite =
    favorites.includes(tool.id);

  const count =
    usage[tool.id] || 0;

  return `
    <article class="tool-card">

      <div class="tool-top">

        <div class="tool-icon">
          ${escapeHTML(tool.icon)}
        </div>

        <button
          class="favorite-btn ${isFavorite ? "active" : ""}"
          data-id="${tool.id}"
          title="إضافة إلى المفضلة"
        >
          ${isFavorite ? "★" : "☆"}
        </button>

      </div>

      <h3>${escapeHTML(tool.name)}</h3>

      <p>${escapeHTML(tool.description)}</p>

      <div class="tool-bottom">

        <span class="tool-category">
          ${escapeHTML(tool.categoryName)}
        </span>

        <span class="tool-usage">
          ${count} استخدام محلي
        </span>

      </div>

      <button
        class="open-tool"
        data-id="${tool.id}"
      >
        فتح الأداة
      </button>

    </article>
  `;
}


/* =========================================================
   FAVORITES
   ========================================================= */

function toggleFavorite(id) {

  if (favorites.includes(id)) {

    favorites =
      favorites.filter(item => item !== id);

    showToast("تم حذف الأداة من المفضلة");

  } else {

    favorites.push(id);

    showToast("تمت إضافة الأداة إلى المفضلة ⭐");
  }

  saveStorage(
    STORAGE.favorites,
    favorites
  );
}


function renderFavorites() {

  const grid = $("#favoritesGrid");

  const favTools =
    tools.filter(tool =>
      favorites.includes(tool.id)
    );

  if (!favTools.length) {

    grid.innerHTML = "";

    $("#emptyFavorites")
      .classList.remove("hidden");

    return;
  }

  $("#emptyFavorites")
    .classList.add("hidden");

  grid.innerHTML =
    favTools.map(toolCard).join("");

  bindToolCards(grid);
}


function bindToolCards(container) {

  container
    .querySelectorAll(".open-tool")
    .forEach(button => {

      button.addEventListener("click", () => {
        openTool(button.dataset.id);
      });

    });


  container
    .querySelectorAll(".favorite-btn")
    .forEach(button => {

      button.addEventListener("click", event => {

        event.stopPropagation();

        toggleFavorite(button.dataset.id);

        renderTools();
        renderFavorites();
        updateStats();
      });

    });
}


/* =========================================================
   RECENT
   ========================================================= */

function addRecent(id) {

  recent =
    recent.filter(item => item !== id);

  recent.unshift(id);

  recent =
    recent.slice(0, 6);

  saveStorage(
    STORAGE.recent,
    recent
  );
}


function renderRecent() {

  const section = $("#recentSection");
  const grid = $("#recentGrid");

  const recentTools =
    recent
      .map(id => tools.find(tool => tool.id === id))
      .filter(Boolean);

  if (!recentTools.length) {

    section.classList.add("hidden");
    return;
  }

  section.classList.remove("hidden");

  grid.innerHTML =
    recentTools.map(toolCard).join("");

  bindToolCards(grid);
}


/* =========================================================
   STATS
   ========================================================= */

function updateStats() {

  $("#toolsCount").textContent =
    tools.length;

  $("#favoriteCount").textContent =
    favorites.length;
}


/* =========================================================
   MODAL
   ========================================================= */

function openTool(id) {

  const tool =
    tools.find(item => item.id === id);

  if (!tool) return;

  currentTool = tool;

  usage[id] =
    (usage[id] || 0) + 1;

  saveStorage(
    STORAGE.usage,
    usage
  );

  addRecent(id);

  $("#modalTitle").textContent =
    tool.name;

  $("#modalCategory").textContent =
    tool.categoryName;

  $("#modalBody").innerHTML = "";

  tool.render($("#modalBody"));

  $("#toolModal").classList.add("open");

  $("#toolModal").setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add("modal-open");

  updateModalFavorite();

  history.replaceState(
    null,
    "",
    `#tool/${tool.id}`
  );

  renderTools();
  renderRecent();
}


function closeModal() {

  $("#toolModal").classList.remove("open");

  $("#toolModal").setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove("modal-open");

  currentTool = null;

  if (location.hash.startsWith("#tool/")) {

    history.replaceState(
      null,
      "",
      "#tools"
    );
  }
}


function checkHash() {

  const hash = location.hash;

  if (hash.startsWith("#tool/")) {

    const id =
      decodeURIComponent(
        hash.substring(6)
      );

    const tool =
      tools.find(item => item.id === id);

    if (tool) {

      openToolWithoutChangingHash(id);

    }

  } else {

    if ($("#toolModal").classList.contains("open")) {
      $("#toolModal").classList.remove("open");
      document.body.classList.remove("modal-open");
    }
  }
}


function openToolWithoutChangingHash(id) {

  const tool =
    tools.find(item => item.id === id);

  if (!tool) return;

  currentTool = tool;

  usage[id] =
    (usage[id] || 0) + 1;

  saveStorage(
    STORAGE.usage,
    usage
  );

  addRecent(id);

  $("#modalTitle").textContent =
    tool.name;

  $("#modalCategory").textContent =
    tool.categoryName;

  $("#modalBody").innerHTML = "";

  tool.render($("#modalBody"));

  $("#toolModal").classList.add("open");

  $("#toolModal").setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add("modal-open");

  updateModalFavorite();
}


function updateModalFavorite() {

  if (!currentTool) return;

  const active =
    favorites.includes(currentTool.id);

  $("#modalFavoriteBtn").textContent =
    active ? "★" : "☆";
}


/* =========================================================
   SHARE
   ========================================================= */

async function shareCurrentTool() {

  if (!currentTool) return;

  const url =
    location.href;

  const data = {
    title: currentTool.name,
    text:
      `${currentTool.name} - ToolBox AR`,
    url
  };

  try {

    if (navigator.share) {

      await navigator.share(data);

      showToast("تم فتح المشاركة");

    } else {

      await navigator.clipboard.writeText(url);

      showToast("تم نسخ رابط الأداة");
    }

  } catch (error) {

    if (error.name !== "AbortError") {
      showToast("تعذر مشاركة الرابط");
    }
  }
}


/* =========================================================
   TEXT COUNTER
   ========================================================= */

function renderTextCounter(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="field">
        <label>النص</label>
        <textarea id="tcInput" placeholder="اكتب أو ألصق النص هنا..."></textarea>
      </div>

      <div class="form-row">

        <div class="result-card">
          <span>الكلمات</span>
          <div id="tcWords" class="result-value">0</div>
        </div>

        <div class="result-card">
          <span>الحروف</span>
          <div id="tcChars" class="result-value">0</div>
        </div>

        <div class="result-card">
          <span>الأسطر</span>
          <div id="tcLines" class="result-value">0</div>
        </div>

        <div class="result-card">
          <span>بدون مسافات</span>
          <div id="tcNoSpace" class="result-value">0</div>
        </div>

      </div>

      <button class="btn btn-danger" id="tcClear">
        مسح
      </button>

    </div>
  `;

  const input = $("#tcInput");

  function calculate() {

    const text = input.value;

    const words =
      text.trim()
        ? text.trim().split(/\s+/).length
        : 0;

    $("#tcWords").textContent = words;

    $("#tcChars").textContent =
      text.length;

    $("#tcNoSpace").textContent =
      text.replace(/\s/g, "").length;

    $("#tcLines").textContent =
      text ? text.split(/\r?\n/).length : 0;
  }

  input.addEventListener(
    "input",
    calculate
  );

  $("#tcClear").onclick = () => {
    input.value = "";
    calculate();
  };
}


/* =========================================================
   CASE
   ========================================================= */

function renderCaseConverter(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="field">
        <label>النص</label>
        <textarea id="caseInput"></textarea>
      </div>

      <div class="tool-buttons">

        <button class="btn btn-primary" id="caseUpper">
          UPPERCASE
        </button>

        <button class="btn btn-secondary" id="caseLower">
          lowercase
        </button>

        <button class="btn btn-secondary" id="caseTitle">
          Title Case
        </button>

        <button class="btn btn-secondary" id="caseSentence">
          Sentence case
        </button>

        <button class="btn btn-success" id="caseCopy">
          نسخ
        </button>

      </div>

    </div>
  `;

  const input = $("#caseInput");

  $("#caseUpper").onclick =
    () => input.value = input.value.toUpperCase();

  $("#caseLower").onclick =
    () => input.value = input.value.toLowerCase();

  $("#caseTitle").onclick = () => {

    input.value =
      input.value
        .toLowerCase()
        .replace(/\b\w/g, c => c.toUpperCase());
  };

  $("#caseSentence").onclick = () => {

    input.value =
      input.value
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s+\w)/g,
          c => c.toUpperCase()
        );
  };

  $("#caseCopy").onclick =
    () => copyText(input.value);
}


/* =========================================================
   DUPLICATES
   ========================================================= */

function renderRemoveDuplicates(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="field">
        <label>الأسطر</label>
        <textarea id="dupInput" placeholder="ضع كل قيمة في سطر..."></textarea>
      </div>

      <button class="btn btn-primary" id="dupRun">
        إزالة التكرار
      </button>

      <div class="field">
        <label>النتيجة</label>
        <textarea id="dupOutput" readonly></textarea>
      </div>

      <button class="btn btn-success" id="dupCopy">
        نسخ النتيجة
      </button>

    </div>
  `;

  $("#dupRun").onclick = () => {

    const lines =
      $("#dupInput").value.split(/\r?\n/);

    const result =
      [...new Set(
        lines.map(line => line.trim())
      )]
      .filter(Boolean)
      .join("\n");

    $("#dupOutput").value = result;
  };

  $("#dupCopy").onclick =
    () => copyText($("#dupOutput").value);
}


/* =========================================================
   SORT
   ========================================================= */

function renderSortLines(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="field">
        <label>الأسطر</label>
        <textarea id="sortInput"></textarea>
      </div>

      <div class="form-row">

        <div class="field">
          <label>نوع الترتيب</label>

          <select id="sortMode">
            <option value="asc">تصاعدي</option>
            <option value="desc">تنازلي</option>
            <option value="number">رقمي</option>
          </select>
        </div>

      </div>

      <button class="btn btn-primary" id="sortRun">
        ترتيب
      </button>

      <div class="field">
        <label>النتيجة</label>
        <textarea id="sortOutput" readonly></textarea>
      </div>

      <button class="btn btn-success" id="sortCopy">
        نسخ
      </button>

    </div>
  `;

  $("#sortRun").onclick = () => {

    let lines =
      $("#sortInput").value
        .split(/\r?\n/)
        .filter(Boolean);

    const mode =
      $("#sortMode").value;

    if (mode === "number") {

      lines.sort((a,b) =>
        Number(a) - Number(b)
      );

    } else {

      lines.sort((a,b) =>
        a.localeCompare(b, "ar")
      );

      if (mode === "desc") {
        lines.reverse();
      }
    }

    $("#sortOutput").value =
      lines.join("\n");
  };

  $("#sortCopy").onclick =
    () => copyText($("#sortOutput").value);
}


/* =========================================================
   REVERSE
   ========================================================= */

function renderReverseText(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="field">
        <label>النص</label>
        <textarea id="revInput"></textarea>
      </div>

      <div class="tool-buttons">

        <button class="btn btn-primary" id="revChars">
          عكس الأحرف
        </button>

        <button class="btn btn-secondary" id="revLines">
          عكس الأسطر
        </button>

        <button class="btn btn-success" id="revCopy">
          نسخ
        </button>

      </div>

      <div class="field">
        <label>النتيجة</label>
        <textarea id="revOutput" readonly></textarea>
      </div>

    </div>
  `;

  $("#revChars").onclick = () => {

    $("#revOutput").value =
      [...$("#revInput").value]
        .reverse()
        .join("");
  };

  $("#revLines").onclick = () => {

    $("#revOutput").value =
      $("#revInput").value
        .split(/\r?\n/)
        .reverse()
        .join("\n");
  };

  $("#revCopy").onclick =
    () => copyText($("#revOutput").value);
}


/* =========================================================
   REMOVE EMPTY
   ========================================================= */

function renderRemoveEmptyLines(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="field">
        <label>النص</label>
        <textarea id="emptyInput"></textarea>
      </div>

      <button class="btn btn-primary" id="emptyRun">
        تنظيف النص
      </button>

      <div class="field">
        <label>النتيجة</label>
        <textarea id="emptyOutput" readonly></textarea>
      </div>

      <button class="btn btn-success" id="emptyCopy">
        نسخ
      </button>

    </div>
  `;

  $("#emptyRun").onclick = () => {

    const result =
      $("#emptyInput").value
        .split(/\r?\n/)
        .map(x => x.trim())
        .filter(Boolean)
        .join("\n");

    $("#emptyOutput").value =
      result;
  };

  $("#emptyCopy").onclick =
    () => copyText($("#emptyOutput").value);
}


/* =========================================================
   SLUG
   ========================================================= */

function renderSlug(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="field">
        <label>العنوان</label>
        <input id="slugInput" placeholder="مثال: أفضل أدوات الذكاء الاصطناعي">
      </div>

      <button class="btn btn-primary" id="slugRun">
        إنشاء Slug
      </button>

      <div class="field">
        <label>النتيجة</label>
        <input id="slugOutput" readonly>
      </div>

      <button class="btn btn-success" id="slugCopy">
        نسخ
      </button>

    </div>
  `;

  $("#slugRun").onclick = () => {

    const text =
      $("#slugInput").value
        .trim()
        .toLowerCase();

    const slug =
      text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

    $("#slugOutput").value =
      slug;
  };

  $("#slugCopy").onclick =
    () => copyText($("#slugOutput").value);
}


/* =========================================================
   JSON
   ========================================================= */

function renderJSON(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="field">
        <label>JSON</label>
        <textarea id="jsonInput" placeholder='{"name":"ToolBox AR","tools":30}'></textarea>
      </div>

      <div class="tool-buttons">

        <button class="btn btn-primary" id="jsonFormat">
          تنسيق JSON
        </button>

        <button class="btn btn-secondary" id="jsonMinify">
          ضغط JSON
        </button>

        <button class="btn btn-success" id="jsonCopy">
          نسخ
        </button>

      </div>

      <div id="jsonStatus"></div>

      <div class="field">
        <label>النتيجة</label>
        <textarea id="jsonOutput" readonly></textarea>
      </div>

    </div>
  `;

  function process(pretty) {

    try {

      const data =
        JSON.parse($("#jsonInput").value);

      $("#jsonOutput").value =
        pretty
          ? JSON.stringify(data, null, 2)
          : JSON.stringify(data);

      $("#jsonStatus").innerHTML =
        `<div class="info-box">✓ JSON صحيح.</div>`;

    } catch (error) {

      $("#jsonStatus").innerHTML =
        `<div class="info-box">❌ JSON غير صحيح: ${escapeHTML(error.message)}</div>`;
    }
  }

  $("#jsonFormat").onclick =
    () => process(true);

  $("#jsonMinify").onclick =
    () => process(false);

  $("#jsonCopy").onclick =
    () => copyText($("#jsonOutput").value);
}


/* =========================================================
   BASE64
   ========================================================= */

function renderBase64(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="field">
        <label>النص</label>
        <textarea id="b64Input"></textarea>
      </div>

      <div class="tool-buttons">

        <button class="btn btn-primary" id="b64Encode">
          Encode
        </button>

        <button class="btn btn-secondary" id="b64Decode">
          Decode
        </button>

        <button class="btn btn-success" id="b64Copy">
          نسخ
        </button>

      </div>

      <div class="field">
        <label>النتيجة</label>
        <textarea id="b64Output" readonly></textarea>
      </div>

    </div>
  `;

  $("#b64Encode").onclick = () => {

    try {

      $("#b64Output").value =
        btoa(
          unescape(
            encodeURIComponent(
              $("#b64Input").value
            )
          )
        );

    } catch {

      showToast("تعذر الترميز");
    }
  };

  $("#b64Decode").onclick = () => {

    try {

      $("#b64Output").value =
        decodeURIComponent(
          escape(
            atob(
              $("#b64Input").value
            )
          )
        );

    } catch {

      showToast("Base64 غير صحيح");
    }
  };

  $("#b64Copy").onclick =
    () => copyText($("#b64Output").value);
}


/* =========================================================
   URL
   ========================================================= */

function renderURL(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="field">
        <label>النص أو الرابط</label>
        <textarea id="urlInput"></textarea>
      </div>

      <div class="tool-buttons">

        <button class="btn btn-primary" id="urlEncode">
          Encode
        </button>

        <button class="btn btn-secondary" id="urlDecode">
          Decode
        </button>

        <button class="btn btn-success" id="urlCopy">
          نسخ
        </button>

      </div>

      <div class="field">
        <label>النتيجة</label>
        <textarea id="urlOutput" readonly></textarea>
      </div>

    </div>
  `;

  $("#urlEncode").onclick = () => {

    $("#urlOutput").value =
      encodeURIComponent(
        $("#urlInput").value
      );
  };

  $("#urlDecode").onclick = () => {

    try {

      $("#urlOutput").value =
        decodeURIComponent(
          $("#urlInput").value
        );

    } catch {

      showToast("النص غير صالح لفك الترميز");
    }
  };

  $("#urlCopy").onclick =
    () => copyText($("#urlOutput").value);
}


/* =========================================================
   HTML ESCAPE
   ========================================================= */

function renderHTMLEscape(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="field">
        <label>النص</label>
        <textarea id="htmlInput"></textarea>
      </div>

      <div class="tool-buttons">

        <button class="btn btn-primary" id="htmlEscape">
          Escape
        </button>

        <button class="btn btn-secondary" id="htmlUnescape">
          Unescape
        </button>

        <button class="btn btn-success" id="htmlCopy">
          نسخ
        </button>

      </div>

      <div class="field">
        <label>النتيجة</label>
        <textarea id="htmlOutput" readonly></textarea>
      </div>

    </div>
  `;

  $("#htmlEscape").onclick = () => {

    const div =
      document.createElement("div");

    div.textContent =
      $("#htmlInput").value;

    $("#htmlOutput").value =
      div.innerHTML;
  };

  $("#htmlUnescape").onclick = () => {

    const div =
      document.createElement("div");

    div.innerHTML =
      $("#htmlInput").value;

    $("#htmlOutput").value =
      div.textContent;
  };

  $("#htmlCopy").onclick =
    () => copyText($("#htmlOutput").value);
}


/* =========================================================
   REGEX
   ========================================================= */

function renderRegex(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="form-row">

        <div class="field">
          <label>Regex Pattern</label>
          <input id="regexPattern" placeholder="مثال: \\d+">
        </div>

        <div class="field">
          <label>Flags</label>
          <input id="regexFlags" value="gi" placeholder="gi">
        </div>

      </div>

      <div class="field">
        <label>النص المراد اختباره</label>
        <textarea id="regexText"></textarea>
      </div>

      <button class="btn btn-primary" id="regexRun">
        اختبار
      </button>

      <div id="regexResult" class="result-card">
        اكتب Regex والنص ثم اضغط اختبار.
      </div>

    </div>
  `;

  $("#regexRun").onclick = () => {

    const pattern =
      $("#regexPattern").value;

    let flags =
      $("#regexFlags").value;

    const text =
      $("#regexText").value;

    try {

      if (!flags.includes("g")) {
        flags += "g";
      }

      const regex =
        new RegExp(pattern, flags);

      const matches = [];

      let match;

      while (
        (match = regex.exec(text)) !== null &&
        matches.length < 1000
      ) {

        matches.push({
          value: match[0],
          index: match.index
        });

        if (match[0] === "") {
          regex.lastIndex++;
        }
      }

      if (!matches.length) {

        $("#regexResult").innerHTML =
          "❌ لا توجد مطابقة.";

        return;
      }

      $("#regexResult").innerHTML = `
        <strong>✓ تم العثور على ${matches.length} مطابقة</strong>
        <br><br>
        ${matches.map((m,i) =>
          `${i + 1}. <b>${escapeHTML(m.value)}</b> — الموضع ${m.index}`
        ).join("<br>")}
      `;

    } catch (error) {

      $("#regexResult").innerHTML =
        `❌ Regex غير صالح: ${escapeHTML(error.message)}`;
    }
  };
}


/* =========================================================
   TIMESTAMP
   ========================================================= */

function renderTimestamp(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="form-row">

        <div class="field">
          <label>Unix Timestamp</label>
          <input id="tsUnix" type="number" placeholder="1750000000">
        </div>

        <div class="field">
          <label>التاريخ والوقت</label>
          <input id="tsDate" type="datetime-local">
        </div>

      </div>

      <div class="tool-buttons">

        <button class="btn btn-primary" id="tsToDate">
          Timestamp → تاريخ
        </button>

        <button class="btn btn-secondary" id="tsToUnix">
          تاريخ → Timestamp
        </button>

      </div>

      <div id="tsResult" class="result-card">
        النتيجة ستظهر هنا.
      </div>

    </div>
  `;

  $("#tsToDate").onclick = () => {

    const value =
      Number($("#tsUnix").value);

    if (!Number.isFinite(value)) {
      showToast("أدخل Timestamp صحيحًا");
      return;
    }

    const milliseconds =
      value < 100000000000
        ? value * 1000
        : value;

    const date =
      new Date(milliseconds);

    $("#tsDate").value =
      toDateTimeLocal(date);

    $("#tsResult").innerHTML =
      `<strong>${escapeHTML(date.toString())}</strong>`;
  };


  $("#tsToUnix").onclick = () => {

    const value =
      $("#tsDate").value;

    if (!value) {
      showToast("اختر التاريخ");
      return;
    }

    const date =
      new Date(value);

    const seconds =
      Math.floor(date.getTime() / 1000);

    $("#tsUnix").value =
      seconds;

    $("#tsResult").innerHTML =
      `<strong>${seconds}</strong>`;
  };
}


/* =========================================================
   PASSWORD
   ========================================================= */

function renderPassword(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="field">

        <label>
          طول كلمة المرور:
          <span id="passLengthValue">16</span>
        </label>

        <div class="range-row">
          <input
            id="passLength"
            type="range"
            min="4"
            max="128"
            value="16"
          >

          <span
            class="range-value"
            id="passRangeValue"
          >
            16
          </span>
        </div>

      </div>

      <div class="form-row">

        <label>
          <input id="passUpper" type="checkbox" checked>
          أحرف كبيرة
        </label>

        <label>
          <input id="passLower" type="checkbox" checked>
          أحرف صغيرة
        </label>

        <label>
          <input id="passNumbers" type="checkbox" checked>
          أرقام
        </label>

        <label>
          <input id="passSymbols" type="checkbox" checked>
          رموز
        </label>

      </div>

      <button class="btn btn-primary" id="passGenerate">
        توليد كلمة مرور
      </button>

      <div class="field">
        <label>كلمة المرور</label>
        <input id="passOutput" readonly>
      </div>

      <button class="btn btn-success" id="passCopy">
        نسخ كلمة المرور
      </button>

      <div class="info-box">
        يتم إنشاء كلمة المرور محليًا باستخدام
        مولد عشوائي آمن من المتصفح.
      </div>

    </div>
  `;

  const length =
    $("#passLength");

  length.addEventListener("input", () => {

    $("#passLengthValue").textContent =
      length.value;

    $("#passRangeValue").textContent =
      length.value;
  });


  $("#passGenerate").onclick =
    generatePassword;

  $("#passCopy").onclick =
    () => copyText($("#passOutput").value);

  generatePassword();


  function generatePassword() {

    const chars = [];

    if ($("#passUpper").checked)
      chars.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

    if ($("#passLower").checked)
      chars.push("abcdefghijklmnopqrstuvwxyz");

    if ($("#passNumbers").checked)
      chars.push("0123456789");

    if ($("#passSymbols").checked)
      chars.push("!@#$%^&*()_+-=[]{}<>?");

    if (!chars.length) {

      showToast("اختر نوعًا واحدًا على الأقل");
      return;
    }

    let all =
      chars.join("");

    const count =
      Number(length.value);

    let result = "";

    for (let i = 0; i < count; i++) {

      result +=
        all[randomInt(all.length)];
    }

    $("#passOutput").value =
      result;
  }
}


/* =========================================================
   UUID
   ========================================================= */

function renderUUID(container) {

  container.innerHTML = `
    <div class="tool-form">

      <button class="btn btn-primary" id="uuidGenerate">
        إنشاء UUID
      </button>

      <div class="field">
        <label>UUID v4</label>
        <input id="uuidOutput" readonly>
      </div>

      <button class="btn btn-success" id="uuidCopy">
        نسخ
      </button>

    </div>
  `;

  function generate() {

    let uuid;

    if (crypto.randomUUID) {

      uuid =
        crypto.randomUUID();

    } else {

      uuid =
        "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
          .replace(/[xy]/g, c => {

            const r =
              crypto.getRandomValues(
                new Uint8Array(1)
              )[0] % 16;

            const v =
              c === "x"
                ? r
                : (r & 0x3) | 0x8;

            return v.toString(16);
          });
    }

    $("#uuidOutput").value =
      uuid;
  }

  $("#uuidGenerate").onclick =
    generate;

  $("#uuidCopy").onclick =
    () => copyText($("#uuidOutput").value);

  generate();
}


/* =========================================================
   SHA256
   ========================================================= */

function renderSHA256(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="field">
        <label>النص</label>
        <textarea id="shaInput"></textarea>
      </div>

      <button class="btn btn-primary" id="shaRun">
        إنشاء SHA-256
      </button>

      <div class="field">
        <label>Hash</label>
        <textarea id="shaOutput" readonly></textarea>
      </div>

      <button class="btn btn-success" id="shaCopy">
        نسخ
      </button>

      <div class="info-box">
        SHA-256 عبارة عن Hash وليس تشفيرًا يمكن فكّه.
      </div>

    </div>
  `;

  $("#shaRun").onclick = async () => {

    const text =
      $("#shaInput").value;

    const data =
      new TextEncoder().encode(text);

    const hash =
      await crypto.subtle.digest(
        "SHA-256",
        data
      );

    const result =
      [...new Uint8Array(hash)]
        .map(byte =>
          byte.toString(16).padStart(2, "0")
        )
        .join("");

    $("#shaOutput").value =
      result;
  };

  $("#shaCopy").onclick =
    () => copyText($("#shaOutput").value);
}


/* =========================================================
   RANDOM TOKEN
   ========================================================= */

function renderRandomToken(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="form-row">

        <div class="field">
          <label>عدد البايت</label>
          <input
            id="tokenBytes"
            type="number"
            min="4"
            max="256"
            value="32"
          >
        </div>

        <div class="field">
          <label>الصيغة</label>

          <select id="tokenFormat">
            <option value="hex">HEX</option>
            <option value="base64">Base64URL</option>
          </select>

        </div>

      </div>

      <button class="btn btn-primary" id="tokenGenerate">
        توليد Token
      </button>

      <div class="field">
        <label>النتيجة</label>
        <textarea id="tokenOutput" readonly></textarea>
      </div>

      <button class="btn btn-success" id="tokenCopy">
        نسخ
      </button>

    </div>
  `;

  $("#tokenGenerate").onclick =
    generate;

  $("#tokenCopy").onclick =
    () => copyText($("#tokenOutput").value);

  generate();


  function generate() {

    let bytes =
      Number($("#tokenBytes").value);

    bytes =
      Math.max(4, Math.min(256, bytes));

    const array =
      new Uint8Array(bytes);

    crypto.getRandomValues(array);

    if ($("#tokenFormat").value === "hex") {

      $("#tokenOutput").value =
        [...array]
          .map(x =>
            x.toString(16).padStart(2, "0")
          )
          .join("");

    } else {

      let binary = "";

      array.forEach(byte => {
        binary += String.fromCharCode(byte);
      });

      $("#tokenOutput").value =
        btoa(binary)
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");
    }
  }
}


/* =========================================================
   IMAGE HELPERS
   ========================================================= */

function imageFileField(id, label = "اختر صورة") {

  return `
    <div class="file-drop">

      <strong>${label}</strong>

      <br>

      <input
        id="${id}"
        type="file"
        accept="image/*"
      >

    </div>
  `;
}


function loadImage(file) {

  return new Promise((resolve, reject) => {

    const url =
      URL.createObjectURL(file);

    const image =
      new Image();

    image.onload = () => {

      URL.revokeObjectURL(url);

      resolve(image);
    };

    image.onerror = reject;

    image.src = url;
  });
}


function canvasBlob(canvas, type, quality) {

  return new Promise(resolve => {

    canvas.toBlob(
      resolve,
      type,
      quality
    );
  });
}


function downloadBlob(blob, filename) {

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;
  a.download = filename;

  document.body.appendChild(a);

  a.click();

  a.remove();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}


/* =========================================================
   IMAGE RESIZER
   ========================================================= */

function renderImageResizer(container) {

  container.innerHTML = `
    <div class="tool-form">

      ${imageFileField("resizeFile")}

      <div id="resizeOptions" class="hidden">

        <div class="form-row">

          <div class="field">
            <label>العرض</label>
            <input id="resizeWidth" type="number">
          </div>

          <div class="field">
            <label>الارتفاع</label>
            <input id="resizeHeight" type="number">
          </div>

        </div>

        <label>
          <input
            id="resizeKeep"
            type="checkbox"
            checked
          >
          الحفاظ على نسبة الأبعاد
        </label>

        <button
          class="btn btn-primary"
          id="resizeRun"
        >
          تغيير الحجم
        </button>

      </div>

      <img id="resizePreview" class="image-preview hidden">

      <button
        class="btn btn-success hidden"
        id="resizeDownload"
      >
        تحميل الصورة
      </button>

    </div>
  `;

  let image = null;
  let outputBlob = null;

  $("#resizeFile").addEventListener("change", async event => {

    const file =
      event.target.files[0];

    if (!file) return;

    image =
      await loadImage(file);

    $("#resizeWidth").value =
      image.naturalWidth;

    $("#resizeHeight").value =
      image.naturalHeight;

    $("#resizeOptions")
      .classList.remove("hidden");
  });


  $("#resizeWidth").addEventListener("input", () => {

    if (!image || !$("#resizeKeep").checked)
      return;

    const width =
      Number($("#resizeWidth").value);

    $("#resizeHeight").value =
      Math.round(
        width *
        image.naturalHeight /
        image.naturalWidth
      );
  });


  $("#resizeRun").onclick = async () => {

    if (!image) {
      showToast("اختر صورة أولًا");
      return;
    }

    const width =
      Number($("#resizeWidth").value);

    const height =
      Number($("#resizeHeight").value);

    if (
      !width ||
      !height ||
      width < 1 ||
      height < 1
    ) {
      showToast("أدخل أبعادًا صحيحة");
      return;
    }

    const canvas =
      document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    const ctx =
      canvas.getContext("2d");

    ctx.drawImage(
      image,
      0,
      0,
      width,
      height
    );

    outputBlob =
      await canvasBlob(
        canvas,
        "image/png"
      );

    $("#resizePreview").src =
      URL.createObjectURL(outputBlob);

    $("#resizePreview")
      .classList.remove("hidden");

    $("#resizeDownload")
      .classList.remove("hidden");
  };


  $("#resizeDownload").onclick = () => {

    if (!outputBlob) return;

    downloadBlob(
      outputBlob,
      "resized-image.png"
    );
  };
}


/* =========================================================
   IMAGE CONVERTER
   ========================================================= */

function renderImageConverter(container) {

  container.innerHTML = `
    <div class="tool-form">

      ${imageFileField("convertFile")}

      <div class="field">

        <label>الصيغة</label>

        <select id="convertType">
          <option value="image/png">PNG</option>
          <option value="image/jpeg">JPG</option>
          <option value="image/webp">WEBP</option>
        </select>

      </div>

      <button
        class="btn btn-primary"
        id="convertRun"
      >
        تحويل الصورة
      </button>

      <img
        id="convertPreview"
        class="image-preview hidden"
      >

      <button
        class="btn btn-success hidden"
        id="convertDownload"
      >
        تحميل
      </button>

    </div>
  `;

  let file = null;
  let blob = null;

  $("#convertFile").onchange =
    event => {
      file = event.target.files[0];
    };


  $("#convertRun").onclick =
    async () => {

      if (!file) {
        showToast("اختر صورة");
        return;
      }

      const image =
        await loadImage(file);

      const canvas =
        document.createElement("canvas");

      canvas.width =
        image.naturalWidth;

      canvas.height =
        image.naturalHeight;

      const ctx =
        canvas.getContext("2d");

      const type =
        $("#convertType").value;

      if (type === "image/jpeg") {

        ctx.fillStyle = "#ffffff";

        ctx.fillRect(
          0,
          0,
          canvas.width,
          canvas.height
        );
      }

      ctx.drawImage(image, 0, 0);

      blob =
        await canvasBlob(
          canvas,
          type,
          .9
        );

      $("#convertPreview").src =
        URL.createObjectURL(blob);

      $("#convertPreview")
        .classList.remove("hidden");

      $("#convertDownload")
        .classList.remove("hidden");
    };


  $("#convertDownload").onclick =
    () => {

      if (!blob) return;

      const extension =
        $("#convertType").value
          .split("/")[1]
          .replace("jpeg", "jpg");

      downloadBlob(
        blob,
        `converted-image.${extension}`
      );
    };
}


/* =========================================================
   IMAGE COMPRESSOR
   ========================================================= */

function renderImageCompressor(container) {

  container.innerHTML = `
    <div class="tool-form">

      ${imageFileField("compressFile")}

      <div class="field">

        <label>
          الجودة:
          <span id="qualityValue">80%</span>
        </label>

        <div class="range-row">

          <input
            id="quality"
            type="range"
            min="10"
            max="100"
            value="80"
          >

          <span
            class="range-value"
            id="qualityRange"
          >
            80%
          </span>

        </div>

      </div>

      <button
        class="btn btn-primary"
        id="compressRun"
      >
        ضغط الصورة
      </button>

      <div id="compressInfo" class="result-card">
        اختر صورة للبدء.
      </div>

      <button
        class="btn btn-success hidden"
        id="compressDownload"
      >
        تحميل الصورة المضغوطة
      </button>

    </div>
  `;

  let file = null;
  let blob = null;

  $("#quality").oninput =
    event => {

      $("#qualityValue").textContent =
        `${event.target.value}%`;

      $("#qualityRange").textContent =
        `${event.target.value}%`;
    };


  $("#compressFile").onchange =
    event => {
      file = event.target.files[0];
    };


  $("#compressRun").onclick =
    async () => {

      if (!file) {
        showToast("اختر صورة");
        return;
      }

      const image =
        await loadImage(file);

      const canvas =
        document.createElement("canvas");

      canvas.width =
        image.naturalWidth;

      canvas.height =
        image.naturalHeight;

      const ctx =
        canvas.getContext("2d");

      ctx.drawImage(
        image,
        0,
        0
      );

      const quality =
        Number($("#quality").value) / 100;

      blob =
        await canvasBlob(
          canvas,
          "image/jpeg",
          quality
        );

      const oldSize =
        formatBytes(file.size);

      const newSize =
        formatBytes(blob.size);

      const percent =
        ((1 - blob.size / file.size) * 100)
          .toFixed(1);

      $("#compressInfo").innerHTML = `
        <strong>تم الضغط ✓</strong>
        <br>
        الحجم الأصلي: ${oldSize}
        <br>
        الحجم الجديد: ${newSize}
        <br>
        التوفير: ${percent > 0 ? percent : 0}%
      `;

      $("#compressDownload")
        .classList.remove("hidden");
    };


  $("#compressDownload").onclick =
    () => {

      if (!blob) return;

      downloadBlob(
        blob,
        "compressed-image.jpg"
      );
    };
}


/* =========================================================
   IMAGE INFO
   ========================================================= */

function renderImageInfo(container) {

  container.innerHTML = `
    <div class="tool-form">

      ${imageFileField("infoFile")}

      <div id="imageInfoResult"></div>

    </div>
  `;

  $("#infoFile").onchange =
    async event => {

      const file =
        event.target.files[0];

      if (!file) return;

      const image =
        await loadImage(file);

      $("#imageInfoResult").innerHTML = `
        <div class="result-card">

          <strong>معلومات الصورة</strong>

          <br><br>

          الاسم:
          ${escapeHTML(file.name)}

          <br>

          النوع:
          ${escapeHTML(file.type)}

          <br>

          الحجم:
          ${formatBytes(file.size)}

          <br>

          العرض:
          ${image.naturalWidth}px

          <br>

          الارتفاع:
          ${image.naturalHeight}px

        </div>

        <img
          src="${image.src}"
          class="image-preview"
        >
      `;
    };
}


/* =========================================================
   TEXT DOWNLOAD
   ========================================================= */

function renderTextDownload(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="field">
        <label>اسم الملف</label>
        <input id="txtFileName" value="my-text.txt">
      </div>

      <div class="field">
        <label>المحتوى</label>
        <textarea id="txtContent"></textarea>
      </div>

      <button class="btn btn-primary" id="txtDownload">
        💾 تحميل الملف
      </button>

    </div>
  `;

  $("#txtDownload").onclick = () => {

    const content =
      $("#txtContent").value;

    const blob =
      new Blob(
        [content],
        {
          type: "text/plain;charset=utf-8"
        }
      );

    let name =
      $("#txtFileName").value.trim();

    if (!name) {
      name = "text.txt";
    }

    if (!name.includes(".")) {
      name += ".txt";
    }

    downloadBlob(
      blob,
      name
    );
  };
}


/* =========================================================
   TEXT FILE READER
   ========================================================= */

function renderTextFileReader(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="file-drop">

        <strong>
          اختر ملف TXT أو CSV
        </strong>

        <br>

        <input
          id="readerFile"
          type="file"
          accept=".txt,.csv,text/plain,text/csv"
        >

      </div>

      <div class="field">

        <label>المحتوى</label>

        <textarea
          id="readerOutput"
          readonly
        ></textarea>

      </div>

      <button class="btn btn-success" id="readerCopy">
        نسخ المحتوى
      </button>

    </div>
  `;

  $("#readerFile").onchange =
    event => {

      const file =
        event.target.files[0];

      if (!file) return;

      const reader =
        new FileReader();

      reader.onload = () => {

        $("#readerOutput").value =
          reader.result;
      };

      reader.onerror = () => {

        showToast(
          "تعذر قراءة الملف"
        );
      };

      reader.readAsText(file);
    };


  $("#readerCopy").onclick =
    () => copyText(
      $("#readerOutput").value
    );
}


/* =========================================================
   JSON CSV
   ========================================================= */

function renderJSONCSV(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="field">

        <label>التحويل</label>

        <select id="csvMode">

          <option value="jsoncsv">
            JSON → CSV
          </option>

          <option value="csvjson">
            CSV → JSON
          </option>

        </select>

      </div>

      <div class="field">

        <label>البيانات</label>

        <textarea
          id="csvInput"
          placeholder='[{"name":"Ali","age":20},{"name":"Omar","age":22}]'
        ></textarea>

      </div>

      <button class="btn btn-primary" id="csvRun">
        تحويل
      </button>

      <div class="field">

        <label>النتيجة</label>

        <textarea
          id="csvOutput"
          readonly
        ></textarea>

      </div>

      <button class="btn btn-success" id="csvCopy">
        نسخ
      </button>

    </div>
  `;


  $("#csvRun").onclick = () => {

    try {

      const mode =
        $("#csvMode").value;

      const input =
        $("#csvInput").value;

      if (mode === "jsoncsv") {

        const data =
          JSON.parse(input);

        $("#csvOutput").value =
          jsonToCSV(data);

      } else {

        const data =
          parseCSV(input);

        $("#csvOutput").value =
          JSON.stringify(
            data,
            null,
            2
          );
      }

    } catch (error) {

      showToast(
        "خطأ: " + error.message
      );
    }
  };


  $("#csvCopy").onclick =
    () => copyText(
      $("#csvOutput").value
    );
}


function jsonToCSV(data) {

  if (!Array.isArray(data)) {
    throw new Error(
      "JSON يجب أن يكون Array من Objects"
    );
  }

  if (!data.length) {
    return "";
  }

  const keys =
    [...new Set(
      data.flatMap(item =>
        Object.keys(item)
      )
    )];

  const escapeCSV =
    value => {

      const text =
        value == null
          ? ""
          : String(value);

      return `"${text.replace(/"/g, '""')}"`;
    };

  const rows = [
    keys.map(escapeCSV).join(",")
  ];

  data.forEach(item => {

    rows.push(
      keys
        .map(key =>
          escapeCSV(item[key])
        )
        .join(",")
    );

  });

  return rows.join("\n");
}


function parseCSV(text) {

  const rows = [];

  let row = [];
  let value = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {

    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && quoted && next === '"') {

      value += '"';

      i++;

    } else if (char === '"') {

      quoted = !quoted;

    } else if (char === "," && !quoted) {

      row.push(value);
      value = "";

    } else if (
      (char === "\n" || char === "\r") &&
      !quoted
    ) {

      if (char === "\r" && next === "\n") {
        i++;
      }

      row.push(value);
      rows.push(row);

      row = [];
      value = "";

    } else {

      value += char;
    }
  }

  row.push(value);

  if (row.length > 1 || row[0] !== "") {
    rows.push(row);
  }

  if (!rows.length) {
    return [];
  }

  const headers =
    rows[0].map(x => x.trim());

  return rows
    .slice(1)
    .filter(row =>
      row.some(value => value !== "")
    )
    .map(row => {

      const object = {};

      headers.forEach(
        (header, index) => {
          object[header] =
            row[index] ?? "";
        }
      );

      return object;
    });
}


/* =========================================================
   RANDOM NUMBER
   ========================================================= */

function renderRandomNumber(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="form-row">

        <div class="field">
          <label>من</label>
          <input id="randMin" type="number" value="1">
        </div>

        <div class="field">
          <label>إلى</label>
          <input id="randMax" type="number" value="100">
        </div>

      </div>

      <button class="btn btn-primary" id="randRun">
        توليد رقم
      </button>

      <div class="result-card">

        <span>النتيجة</span>

        <div
          id="randResult"
          class="result-value"
        >
          -
        </div>

      </div>

    </div>
  `;

  $("#randRun").onclick = () => {

    let min =
      Number($("#randMin").value);

    let max =
      Number($("#randMax").value);

    if (min > max) {
      [min, max] =
        [max, min];
    }

    if (
      !Number.isFinite(min) ||
      !Number.isFinite(max)
    ) {
      showToast("أدخل أرقامًا صحيحة");
      return;
    }

    const result =
      randomIntegerInclusive(
        Math.ceil(min),
        Math.floor(max)
      );

    $("#randResult").textContent =
      result;
  };
}


/* =========================================================
   COLOR
   ========================================================= */

function renderColor(container) {

  container.innerHTML = `
    <div class="tool-form">

      <button
        id="colorRun"
        class="btn btn-primary"
      >
        إنشاء لون
      </button>

      <div
        id="colorPreview"
        style="
          height:180px;
          border-radius:18px;
          border:1px solid var(--border);
        "
      ></div>

      <div class="result-card">

        <strong id="colorHex">
          #000000
        </strong>

        <br>

        <span id="colorRGB">
          rgb(0, 0, 0)
        </span>

      </div>

      <button class="btn btn-success" id="colorCopy">
        نسخ HEX
      </button>

    </div>
  `;

  let currentHex =
    "#000000";

  function generate() {

    const r =
      randomInt(256);

    const g =
      randomInt(256);

    const b =
      randomInt(256);

    currentHex =
      "#" +
      [r,g,b]
        .map(x =>
          x.toString(16).padStart(2,"0")
        )
        .join("");

    $("#colorPreview")
      .style.background =
      currentHex;

    $("#colorHex").textContent =
      currentHex;

    $("#colorRGB").textContent =
      `rgb(${r}, ${g}, ${b})`;
  }

  $("#colorRun").onclick =
    generate;

  $("#colorCopy").onclick =
    () => copyText(currentHex);

  generate();
}


/* =========================================================
   PERCENTAGE
   ========================================================= */

function renderPercentage(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="form-row">

        <div class="field">
          <label>الرقم الأول</label>
          <input id="percentA" type="number" value="25">
        </div>

        <div class="field">
          <label>الرقم الثاني</label>
          <input id="percentB" type="number" value="200">
        </div>

      </div>

      <button class="btn btn-primary" id="percentRun">
        حساب
      </button>

      <div class="result-card">

        <div>
          <strong id="percentResult">
            -
          </strong>
        </div>

        <br>

        <div>
          نسبة الرقم الأول من الثاني:
          <strong id="percentOf">
            -
          </strong>
        </div>

      </div>

    </div>
  `;

  $("#percentRun").onclick = () => {

    const a =
      Number($("#percentA").value);

    const b =
      Number($("#percentB").value);

    if (!Number.isFinite(a) ||
        !Number.isFinite(b)) {

      showToast("أدخل أرقامًا صحيحة");
      return;
    }

    const result =
      b * a / 100;

    const percent =
      b === 0
        ? 0
        : (a / b) * 100;

    $("#percentResult").textContent =
      `${a}% من ${b} = ${result}`;

    $("#percentOf").textContent =
      `${percent.toFixed(2)}%`;
  };
}


/* =========================================================
   AGE
   ========================================================= */

function renderAge(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="field">

        <label>تاريخ الميلاد</label>

        <input
          id="birthDate"
          type="date"
        >

      </div>

      <button class="btn btn-primary" id="ageRun">
        احسب العمر
      </button>

      <div
        id="ageResult"
        class="result-card"
      >
        اختر تاريخ ميلادك.
      </div>

    </div>
  `;

  $("#ageRun").onclick = () => {

    const value =
      $("#birthDate").value;

    if (!value) {
      showToast("اختر تاريخ الميلاد");
      return;
    }

    const birth =
      new Date(value + "T00:00:00");

    const today =
      new Date();

    if (birth > today) {

      showToast(
        "تاريخ الميلاد لا يمكن أن يكون في المستقبل"
      );

      return;
    }

    let years =
      today.getFullYear() -
      birth.getFullYear();

    let months =
      today.getMonth() -
      birth.getMonth();

    let days =
      today.getDate() -
      birth.getDate();

    if (days < 0) {

      months--;

      const previousMonth =
        new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        );

      days +=
        previousMonth.getDate();
    }

    if (months < 0) {

      years--;
      months += 12;
    }

    $("#ageResult").innerHTML = `
      <strong>عمرك:</strong>

      <div class="result-value">
        ${years} سنة
      </div>

      <br>

      ${months} شهر و ${days} يوم تقريبًا.
    `;
  };
}


/* =========================================================
   UNITS
   ========================================================= */

function renderUnits(container) {

  container.innerHTML = `
    <div class="tool-form">

      <div class="field">

        <label>نوع الوحدة</label>

        <select id="unitType">

          <option value="length">
            الطول
          </option>

          <option value="weight">
            الوزن
          </option>

          <option value="data">
            البيانات
          </option>

          <option value="temperature">
            الحرارة
          </option>

        </select>

      </div>

      <div class="form-row">

        <div class="field">

          <label>القيمة</label>

          <input
            id="unitValue"
            type="number"
            value="1"
          >

        </div>

        <div class="field">

          <label>من</label>

          <select id="unitFrom"></select>

        </div>

      </div>

      <div class="field">

        <label>إلى</label>

        <select id="unitTo"></select>

      </div>

      <button class="btn btn-primary" id="unitRun">
        تحويل
      </button>

      <div class="result-card">

        <strong id="unitResult">
          -
        </strong>

      </div>

    </div>
  `;

  const units = {

    length: {
      m: ["متر", 1],
      km: ["كيلومتر", 1000],
      cm: ["سنتيمتر", .01],
      mm: ["ملليمتر", .001],
      ft: ["قدم", .3048],
      inch: ["بوصة", .0254]
    },

    weight: {
      kg: ["كيلوجرام", 1],
      g: ["جرام", .001],
      mg: ["مليجرام", .000001],
      lb: ["رطل", .45359237]
    },

    data: {
      byte: ["Byte", 1],
      kb: ["KB", 1024],
      mb: ["MB", 1024 ** 2],
      gb: ["GB", 1024 ** 3]
    },

    temperature: {
      c: ["Celsius", "temp"],
      f: ["Fahrenheit", "temp"],
      k: ["Kelvin", "temp"]
    }

  };


  function updateUnits() {

    const type =
      $("#unitType").value;

    const list =
      units[type];

    $("#unitFrom").innerHTML =
      Object.entries(list)
        .map(([key, value]) =>
          `<option value="${key}">
            ${value[0]}
          </option>`
        )
        .join("");

    $("#unitTo").innerHTML =
      Object.entries(list)
        .map(([key, value]) =>
          `<option value="${key}">
            ${value[0]}
          </option>`
        )
        .join("");

    if (type === "length") {
      $("#unitTo").value = "km";
    }

    if (type === "weight") {
      $("#unitTo").value = "g";
    }

    if (type === "data") {
      $("#unitTo").value = "mb";
    }

    if (type === "temperature") {
      $("#unitTo").value = "f";
    }
  }


  function convertTemperature(value, from, to) {

    let celsius;

    if (from === "c")
      celsius = value;

    if (from === "f")
      celsius = (value - 32) * 5 / 9;

    if (from === "k")
      celsius = value - 273.15;


    if (to === "c")
      return celsius;

    if (to === "f")
      return celsius * 9 / 5 + 32;

    if (to === "k")
      return celsius + 273.15;
  }


  $("#unitType").onchange =
    updateUnits;

  $("#unitRun").onclick = () => {

    const type =
      $("#unitType").value;

    const value =
      Number($("#unitValue").value);

    const from =
      $("#unitFrom").value;

    const to =
      $("#unitTo").value;

    if (!Number.isFinite(value)) {
      showToast("أدخل قيمة صحيحة");
      return;
    }

    let result;

    if (type === "temperature") {

      result =
        convertTemperature(
          value,
          from,
          to
        );

    } else {

      const base =
        value *
        units[type][from][1];

      result =
        base /
        units[type][to][1];
    }

    $("#unitResult").textContent =
      `${result.toLocaleString(
        undefined,
        {
          maximumFractionDigits: 10
        }
      )}`;
  };


  updateUnits();
}


/* =========================================================
   HELPERS
   ========================================================= */

function randomInt(max) {

  if (max <= 0) return 0;

  const array =
    new Uint32Array(1);

  crypto.getRandomValues(array);

  return array[0] % max;
}


function randomIntegerInclusive(min, max) {

  if (min > max) {
    [min, max] =
      [max, min];
  }

  const range =
    max - min + 1;

  if (range <= 0) {
    return min;
  }

  return min +
    randomInt(range);
}


async function copyText(text) {

  if (!text) {

    showToast("لا توجد نتيجة لنسخها");
    return;
  }

  try {

    await navigator.clipboard.writeText(text);

    showToast("تم النسخ ✓");

  } catch {

    const textarea =
      document.createElement("textarea");

    textarea.value = text;

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand("copy");

    textarea.remove();

    showToast("تم النسخ ✓");
  }
}


function showToast(message) {

  const toast =
    $("#toast");

  toast.textContent =
    message;

  toast.classList.add("show");

  clearTimeout(
    showToast.timer
  );

  showToast.timer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 2500);
}


function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function formatBytes(bytes) {

  if (!bytes) return "0 Bytes";

  const units =
    [
      "Bytes",
      "KB",
      "MB",
      "GB",
      "TB"
    ];

  const index =
    Math.floor(
      Math.log(bytes) /
      Math.log(1024)
    );

  return `${(
    bytes /
    Math.pow(1024, index)
  ).toFixed(index === 0 ? 0 : 2)}
  ${units[index]}`;
}


function toDateTimeLocal(date) {

  const pad =
    value =>
      String(value).padStart(2, "0");

  return (
    `${date.getFullYear()}-` +
    `${pad(date.getMonth() + 1)}-` +
    `${pad(date.getDate())}T` +
    `${pad(date.getHours())}:` +
    `${pad(date.getMinutes())}`
  );
}