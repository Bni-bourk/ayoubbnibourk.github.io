/* ================= DATA (edit content here) ================= */
const DATA = {
  heroChips: [
    "PLC: Siemens, Schneider, Opto 22",
    "DCS: CENTUM VP & DeltaV",
    "Industrial Networks: Profinet/Modbus"
  ],

  // Skills categories (unchanged – keep or adjust)
  skillsGrouped: [
    {
      category: "DCS & PLC Systems",
      items: [
        "DCS: Yokogawa CENTUM VP, Emerson DeltaV",
        "PLC: Siemens, Schneider, Opto 22"
      ]
    },
    {
      category: "Robotics",
      items: [
        "Industrial Robotics Programming",
         "Robots: Mitsubishi, Fanuc"
       ]
     },
    {
      category: "Industrial Communication & IoT",
      items: [
        "Profinet, Profibus, Modbus/TCP, IO-Link",
        "Python (Snap7), Tk/Qt GUI Development"
      ]
    },
    {
      category: "Instrumentation & Drives",
      items: [
        "Instrumentation & Calibration",
        "Drives: Siemens, ABB, Schneider, Yaskawa"
      ]
    },
    {
      category: "Electrical & Industrial Systems",
      items: [
        "Electrical Industrial Maintenance",
        "Power distribution, motor control, safety systems"
      ]
    },
    {
      category: "Design & Engineering Tools",
      items: [
        "AutoCAD Electrical, Navisworks, VBScript for Excel"
      ]
    }
  ],

  /* Project filters */
  filters: ["All", "DCS", "PLC/SCADA", "IoT/Data"],

  /* Projects */
  projects: [
    {
      title: "DCS Operations – OCP Maintenance Solutions",
      thumb: "thumb-dcs.webp",
      badges: ["Yokogawa CENTUM VP","Emerson DeltaV"],
      desc: "Control loop monitoring, graphic adjustments, and troubleshooting for process stability in a phosphate production environment.",
      links: [
        { type: "github", href: "https://github.com/Bni-bourk" } // placeholder
      ],
      filter: "DCS"
    },
    {
      title: "PDF Comment Extractor (CRS Automation Tool)",
      thumb: "thumb-crs.webp", // <- make a screenshot of your app or Excel output
      badges: ["Python", "Tkinter", "PyMuPDF", "Excel Automation"],
      desc: "Desktop app built at Actemium to automate CRS files: extracts PDF annotations (400+ pages possible) into a structured Excel template, reducing hours of manual work to minutes.",
      links: [
       { type: "doc", label: "GitHub Repo", href: "https://github.com/Bni-bourk/pdf-comment-extractor.git" }
      ],
      filter: "IoT/Data"
    },

    {
      title: "CaF₂ Production Line Automation — SSE MENA",
      thumb: "thumb-caf2.webp",
      badges: ["Siemens S7-1500","WinCC","Profinet"],
      desc: "Designed, programmed, and commissioned Siemens PLC with ET200 I/O and WinCC SCADA for industrial fluorite processing.",
      links: [
        { type: "github", href: "https://github.com/Bni-bourk" } // placeholder
      ],
      filter: "PLC/SCADA"
    },
    {
      title: "Web-Based PLC Control System — Snap7 & Flask",
      thumb: "thumb-snap7.webp",
      badges: ["Siemens S7", "Snap7", "Flask"],
      desc: "Web control/monitoring layer using Flask (Python) with Snap7 to communicate with Siemens S7 PLCs.",
      links: [
        { type: "doc", label: "Overview (LinkedIn)", href: "https://www.linkedin.com/posts/ayoub-bni-bourk-136444172_automation-plc-snap7-activity-7294050885763039232-riA5" },
        { type: "github", href: "https://github.com/Bni-bourk" }
      ],
      filter: "IoT/Data"
    },
    {
      title: "WorldSkills Mechatronics — Bronze Medal",
      thumb: "thumb-ws.webp",
      badges: ["PLC", "Pneumatics", "Robotics"],
      desc: "Competition preparation and execution: PLC programming, troubleshooting, timed assembly, and precise documentation.",
      links: [
        { type: "video", label: "Video 1", href: "https://youtu.be/rAwejiLvqVQ" },
        { type: "video", label: "Video 2", href: "https://youtu.be/QEyETVjBkPQ" },
        { type: "video", label: "Video 3", href: "https://youtu.be/BAS_DPA2F_s" },
        { type: "video", label: "Video 4", href: "https://youtu.be/8Y287OCT2tw" },
        { type: "flickr",label: "photos", href :"https://www.flickr.com/photos/worldskills/collections/72157721575129232/" },
      ],
      filter: "PLC/SCADA" 
    }
  ],

  experience: [
    {
      role: "Automation Technician — OCP Maintenance Solutions",
      when: "Aug 2025 – Present · El Jorf Lasfar, El Jadida",
      bullets: [
        "DCS operations: Yokogawa CENTUM VP & Emerson DeltaV",
        "Loop tuning, graphics optimization, incident diagnostics",
        "Support to maintenance teams for stable production"
      ]
    },
    {
      role: "Design Technician — Actemium (VINCI Energies)",
      when: "Jun 2025 – Jul 2025 · Casablanca",
      bullets: [
        "Instrumentation schematics (Excel + VBA)",
        "AutoCAD Electrical drawings; Navisworks coordination",
        "Quality checks and documentation"
      ]
    },
    {
      role: "Automation Technician — SSE MENA",
      when: "Nov 2024 – May 2025 · El Jorf Lasfar, El Jadida",
      bullets: [
        "Siemens S7-1500/S7-1200, ET200; WinCC HMI",
        "Pre-commissioning/commissioning (I/O, interlocks, FAT/SAT)",
        "CaF₂ process line documentation"
      ]
    }
  ],

  education: [
    { title: "Professional Bachelor's Degree: Industrial Automation & Electrical Systems (ENSAM)", where: "Casablanca · 2025 – Present" },
    { title: "Mechatronics Training ", where: "CDCGE Casablanca-2024" },
    { title: "Technicien Spécialisé — Automation & Industrial Instrumentation (OFPPT)", where: "Agadir · 2021 – 2023" },
    { title: "Technicien — Industrial Electrical Maintenance (OFPPT)", where: "Agadir · 2019 – 2021" },
    { title: "Baccalaureate — Life & Earth Sciences", where: "Lycée Alkods, Ait Milk · 2018" },
    
  ]
};

/* ================= Helpers ================= */
const $  = (sel, el=document) => el.querySelector(sel);
const $$ = (sel, el=document) => Array.from(el.querySelectorAll(sel));

/* ================= Renderers ================= */
function renderYear(){ const y=$("#year"); if(y) y.textContent = new Date().getFullYear(); }

// HERO chips
function renderHero(){
  const row = $("#statsRow");
  if(!row) return;
  row.innerHTML = DATA.heroChips.map(c => `<span class="chip">${c}</span>`).join("");
}
/* ================= Theme Toggle with Diagonal Wipe ================= */
(function setupTheme(){
  function init() {
    const html = document.documentElement;
    const themeBtn = document.getElementById('themeSwitch');
    const mask = document.getElementById('diagMask');
    const slab = mask.querySelector('.diag-mask__slab');
    const DURATION = 1600;

    function getCurrentTheme() { 
      return html.getAttribute('data-theme') || 'light'; 
    }

    function applyTheme(theme) {
      html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }

    function toggleTheme() {
      if (mask.classList.contains('mask-animating')) return;
      
      // Capture current background color for the mask
      const oldBg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
      slab.style.background = `linear-gradient(135deg, ${oldBg} 70%, transparent 100%)`;
      
      // Determine and apply new theme
      const newTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      
      // Trigger animation
      mask.classList.add('mask-active', 'mask-animating');
      setTimeout(() => {
        mask.classList.remove('mask-animating', 'mask-active');
        slab.style.background = '';
      }, DURATION + 50);
    }

    // Set initial theme
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = saved || (prefersDark ? 'dark' : 'light');
    
    applyTheme(initialTheme);

    // Event listener - use click instead of change
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();


// SKILLS tiles
function renderSkills(){
  const grid = $("#skillsGrid");
  if (grid) {
    grid.innerHTML = DATA.skillsGrouped.map(g => `
      <article class="card">
        <h3>${g.category}</h3>
        <ul>${g.items.map(it => `<li>${it}</li>`).join("")}</ul>
      </article>
    `).join("");
  }
  const tools = $("#toolsRow");
  if (tools) tools.innerHTML = "";
}

/* ---------- Filters ---------- */
function renderFilters(active="All"){
  const bar = $("#filterBar");
  if (!bar) return;
  bar.innerHTML = DATA.filters
    .map(f => `<button class="btn ${f===active?'primary':''}" data-filter="${f}">${f}</button>`)
    .join("");
}

/* =========================================================
   PROJECTS — equal height + centered single-card + smooth cross-fade
   ========================================================= */

// disable scroll-drift transforms (they break equal heights)
const ENABLE_PROJECT_DRIFT = false;

// center grid when exactly 1 card is visible
function toggleProjectsSingleMode(){
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.classList.toggle('single', grid.querySelectorAll('.project-card').length === 1);
}

// wait until images are ready so height measuring is correct
function whenImagesLoaded(container, cb){
  const imgs = Array.from(container.querySelectorAll("img"));
  let left = imgs.length;
  if (!left) { cb(); return; }
  const done = () => { if (--left === 0) cb(); };
  imgs.forEach(img => {
    if (img.complete) done();
    else {
      img.addEventListener("load", done, { once:true });
      img.addEventListener("error", done, { once:true });
    }
  });
}

// equal height only when 2+ cards
function normalizeProjectHeights(){
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.project-card'));
  // clear transforms and prior min-heights so we measure true height
  cards.forEach(c => { c.style.transform = ''; c.style.minHeight = ''; });
  if (cards.length <= 1) return;  // single card: natural height
  const tallest = Math.max(...cards.map(c => c.offsetHeight));
  cards.forEach(c => { c.style.minHeight = tallest + 'px'; });
}

// debounce + call both: single-mode + equalize
function scheduleNormalize(delay = 0){
  clearTimeout(window._projNormalizeT);
  window._projNormalizeT = setTimeout(() => {
    toggleProjectsSingleMode();
    normalizeProjectHeights();
  }, delay);
}

// watch for reflows inside cards (fonts, image decode, etc.)
let _projRO;
function observeCardResizes(){
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  if (_projRO) _projRO.disconnect();
  _projRO = new ResizeObserver(() => scheduleNormalize(50));
  grid.querySelectorAll('.project-card').forEach(el => _projRO.observe(el));
}

// build cards HTML
function buildProjectCardsHTML(list){
  return list.map((p, i) => {
    const hasLinks = Array.isArray(p.links) && p.links.length > 0;
    const popId = `pop-${i}`;
    const popTitleId = `pop-title-${i}`;
    const linksHtml = (p.links||[]).map(l => `
      <a class="pill pop-link" target="_blank" rel="noopener" href="${l.href}">
        ${l.type === "github" ? (l.label || "GitHub") : (l.label || "Open")}
      </a>
    `).join("");

    return `
    <article class="card project-card" data-idx="${i}">
      <div class="project-media">
        <img class="project-thumb" src="${p.thumb || 'placeholder.png'}" alt="${p.title}" loading="lazy">
        ${hasLinks ? `
        <div class="project-popover" id="${popId}" role="dialog" aria-hidden="true" aria-labelledby="${popTitleId}">
          <div class="pop-arrow"></div>
          <div class="pop-inner">
            <button class="pop-close" aria-label="Close">✕</button>
            <div class="pop-title" id="${popTitleId}">${p.title} — Links</div>
            <div class="pop-links">${linksHtml}</div>
          </div>
        </div>` : ``}
      </div>

      <div class="project-title">${p.title}</div>
      <div class="muted project-desc clamp-3">${p.desc}</div>
      <div class="pill-row">${(p.badges||[]).map(b => `<span class="pill">${b}</span>`).join("")}</div>

      <div class="project-actions">
        ${hasLinks ? `<button class="btn small primary find-more" aria-expanded="false" aria-controls="${popId}">Find more</button>` : ``}
      </div>
    </article>`;
  }).join("");
}

// one-time transition helper
function transitionOnce(el, timeout=260){
  return new Promise(resolve=>{
    const done=()=>{el.removeEventListener('transitionend',done); clearTimeout(t); resolve();};
    const t=setTimeout(done, timeout);
    el.addEventListener('transitionend', done);
  });
}

async function renderProjects(active = "All") {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const list = DATA.projects.filter(p => active === "All" || p.filter === active);
  const html = buildProjectCardsHTML(list);

  // First render: no animation
  if (!grid.children.length) {
    grid.innerHTML = html;
    initPopovers();
    observeCardResizes();
    return;
  }

  // Start animation
  grid.classList.add('animating');
  
  // Fade OUT
  grid.classList.add('fade-out');
  await new Promise(resolve => setTimeout(resolve, 200));

  // Swap content
  grid.innerHTML = html;
  initPopovers();

  // Fade IN
  grid.classList.remove('fade-out');
  grid.classList.add('fade-in');
  
  // Wait for images to load before normalizing heights
  whenImagesLoaded(grid, () => {
    scheduleNormalize(0);
    setTimeout(() => {
      grid.classList.remove('fade-in', 'animating');
    }, 200);
  });
}

/* ---------- Popover ---------- */
function initPopovers(){
  const grid = $("#projectsGrid");
  if (!grid) return;

  function closeAll(){
    grid.querySelectorAll(".project-popover.open").forEach(el => {
      el.classList.remove("open");
      el.setAttribute("aria-hidden", "true");
    });
    grid.querySelectorAll(".find-more[aria-expanded='true']").forEach(btn => {
      btn.setAttribute("aria-expanded", "false");
    });
  }

  grid.querySelectorAll(".find-more").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const popId = btn.getAttribute("aria-controls");
      const pop = document.getElementById(popId);
      const isOpen = pop.classList.contains("open");
      closeAll();
      if (!isOpen) {
        pop.classList.add("open");
        pop.setAttribute("aria-hidden", "false");
        btn.setAttribute("aria-expanded", "true");
        const firstLink = pop.querySelector(".pop-link");
        if (firstLink) firstLink.focus();
      }
      e.stopPropagation();
    });
  });

  grid.querySelectorAll(".pop-close").forEach(x => {
    x.addEventListener("click", (e) => { closeAll(); e.stopPropagation(); });
  });

  document.addEventListener("click", (e) => {
    if (!grid.contains(e.target)) closeAll();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
}

/* ---------- Experience & Education (unchanged) ---------- */
function renderExperience(){
  const el = $("#expList");
  if (!el) return;
  el.innerHTML = DATA.experience.map(x => `
    <article class="card">
      <div class="row" style="display:flex;align-items:center;justify-content:space-between;gap:10px">
        <strong>${x.role}</strong>
        <span class="muted" style="font-size:12px">${x.when}</span>
      </div>
      <ul style="margin:8px 0 0 18px">${x.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
    </article>
  `).join("");
}
function renderEducation(){
  const el = $("#eduList");
  if (!el) return;
  el.innerHTML = DATA.education.map(e => `
    <article class="card">
      <strong>${e.title}</strong>
      <div class="muted">${e.where}</div>
    </article>
  `).join("");
}

/* ---------- Reveal & Nav ---------- */
function initReveal(){
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  $$('.reveal').forEach(el => io.observe(el));
}
function initActiveNav(){
  const ids = ['home','about','skills','projects','experience','education','awards','contact'];
  const links = new Map([...document.querySelectorAll('.nav-link')].map(a => [a.getAttribute('href').slice(1), a]));
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        links.forEach(l=>l.classList.remove('active'));
        const id = e.target.id;
        if(links.has(id)) links.get(id).classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0.01 });
  ids.forEach(id => {
    const el = document.getElementById(id);
    if(el) observer.observe(el);
  });
}

/* ---------- (Disabled) Projects drift animation ---------- */
function initProjectDrift(){
  if (!ENABLE_PROJECT_DRIFT) return; // disabled to keep heights aligned
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const els = $$('.project-card');
  if (!els.length) return;
  let ticking = false;
  function onScroll(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY * 0.05;
      els.forEach((el, i) => {
        const offset = (i % 2 === 0 ? 1 : -1) * y * 0.25;
        el.style.transform = `translateY(${offset}px)`;
      });
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ================= Normalize triggers ================= */
window.addEventListener('load', () => scheduleNormalize(0));
window.addEventListener('pageshow', () => scheduleNormalize(0));
window.addEventListener('orientationchange', () => scheduleNormalize(120));
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => scheduleNormalize(0));
}
let _nhTo;
window.addEventListener('resize', () => {
  clearTimeout(_nhTo);
  _nhTo = setTimeout(() => scheduleNormalize(50), 120);
});

/* ================= Init ================= */
renderYear();
renderHero();
renderSkills();
renderFilters();
renderProjects();
renderExperience();
renderEducation();
initReveal();
initActiveNav();
initProjectDrift();

/* Filters click */
const fb = $("#filterBar");
if (fb) fb.addEventListener("click", (e)=>{
  const btn = e.target.closest("button[data-filter]");
  if(!btn) return;
  const f = btn.getAttribute("data-filter");
  renderFilters(f);
  renderProjects(f);
});

document.addEventListener('DOMContentLoaded', function () {


  /* ---------------- HAMBURGER + MENU ---------------- */
  var menuToggle = document.getElementById('menuToggle');       // hidden checkbox
  var hamburger  = document.querySelector('label.hamburger');   // the label
  var navMenu    = document.getElementById('navMenu');          // drawer <nav>

  function isOpen() { return !!(menuToggle && menuToggle.checked); }
  function syncAria() { if (hamburger) hamburger.setAttribute('aria-expanded', isOpen() ? 'true' : 'false'); }
  syncAria();
  if (menuToggle) menuToggle.addEventListener('change', syncAria);

  // Auto-close after N ms when open (set to 60000 = 1 min; change if you like)
  var AUTO_CLOSE_MS = 3000;  // e.g. use 2000 while testing
  var autoCloseTimer = null;+
  function startMinuteTimer() { clearTimeout(autoCloseTimer); autoCloseTimer = setTimeout(closeMenu, AUTO_CLOSE_MS); }
  function stopMinuteTimer()  { clearTimeout(autoCloseTimer); autoCloseTimer = null; }

  // Clear only Brand/Theme “square” state
  function clearHold() {
    var nodes = document.querySelectorAll('a.brand.pressed, .btn-icon.pressed');
    for (var i = 0; i < nodes.length; i++) nodes[i].classList.remove('pressed');
    // also drop focus so nothing else sticks visually
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  }

  function closeMenu() {
    if (!menuToggle || !isOpen()) return;
    menuToggle.checked = false;
    syncAria();
    stopMinuteTimer();
    clearHold(); // return Brand/Theme to circle when menu closes (outside tap or timer)
  }

  // Start/stop the timer when the drawer opens/closes
  if (menuToggle) {
    menuToggle.addEventListener('change', function () {
      if (isOpen()) startMinuteTimer(); else stopMinuteTimer();
    });
  }

  // Close when a nav link inside the drawer is tapped/clicked
  if (navMenu) {
    navMenu.addEventListener('click', function (e) {
      if (e.target.closest('.nav-link')) closeMenu();
    });
  }

  // Close on ANY outside tap/click; also clear Brand/Theme square
  function outsideHandler(e) {
    if (!isOpen()) { clearHold(); return; }
    if (e.target.closest('#navMenu, label.hamburger, #menuToggle')) return; // ignore inside
    clearHold();
    closeMenu();
  }
  document.addEventListener('pointerdown', outsideHandler, true);
  document.addEventListener('touchstart',  outsideHandler, { capture: true, passive: true });
  document.addEventListener('click',       outsideHandler, true);

  // Extras: ESC or scroll closes if open
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { clearHold(); closeMenu(); } });
  document.addEventListener('scroll', function () { if (isOpen()) { clearHold(); closeMenu(); } }, { passive: true });

  /* ---------------- HOLD PRESS for Brand/Theme ----------------
     Show square on press; KEEP it after finger lifts.
     It only returns to circle on outside tap (above) or timer (closeMenu). */
  var HOLD_PRESSABLE = 'a.brand, .btn-icon';
  document.addEventListener('pointerdown', function (e) {
    var el = e.target.closest(HOLD_PRESSABLE);
    if (!el) return;
    el.classList.add('pressed');     // square ON
  }, { capture: true });

  // Keep dropping focus after clicks so no focus styles remain
  document.addEventListener('click', function (e) {
    var el = e.target.closest(HOLD_PRESSABLE);
    if (el && el.blur) setTimeout(function(){ el.blur(); }, 0);
  }, true);

  // IMPORTANT: Do NOT close the drawer on brand/theme click
  // (so the square can persist until outside tap or timer)
});

(function initCvDropdown(){
  const dd = document.querySelector('.dropdown[data-cv]');
  if (!dd) return;
  const btn = dd.querySelector('button');
  
  btn.addEventListener('click', (e) => {
    // prevent page scroll on tap
    e.preventDefault();
    dd.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!dd.contains(e.target)) dd.classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') dd.classList.remove('open');
  });
})();



