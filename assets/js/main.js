/* ============================================================
   MUSKAN SAILTH — PORTFOLIO SCRIPTS
   Theme · preloader · nav · scrollspy · reveals · form · misc
   ============================================================ */
(function () {
  "use strict";

  const cfg = window.SITE_CONFIG || {};
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ---------- Apply config (email / LinkedIn / resume / SEO / analytics) ---------- */
  function applyConfig() {
    // Email placeholders
    if (cfg.email) {
      $$('a[href^="mailto:"]').forEach((a) => (a.href = "mailto:" + cfg.email));
      const ev = $("#emailValue");
      if (ev) ev.textContent = cfg.email;
    }

    // LinkedIn placeholders (only when a non-placeholder value exists)
    if (cfg.linkedin && !/muskan-sailth$/.test(cfg.linkedin)) {
      $$('.btn--linkedin, #linkedinCard, #linkedinFooter').forEach((a) => (a.href = cfg.linkedin));
    }

    // Canonical + OG URL — only published when SITE_URL is configured,
    // so no localhost or placeholder URL ever ships.
    if (cfg.SITE_URL) {
      const base = cfg.SITE_URL.replace(/\/+$/, "");
      const canonical = $("#canonicalLink");
      if (canonical) canonical.href = base + "/";
      const ogUrl = $("#ogUrl");
      if (ogUrl) ogUrl.content = base + "/";
    }

    // Resume button (hidden by default in markup; shown only when configured)
    if (cfg.resume) {
      const cta = $("#heroCta") || $(".hero__cta");
      if (cta) {
        const a = document.createElement("a");
        a.className = "btn btn--ghost";
        a.href = cfg.resume;
        a.setAttribute("download", "");
        a.textContent = "Download Resume";
        cta.appendChild(a);
      }
    }

    // Search-engine / analytics verification (injected only when IDs are set)
    const head = document.head;
    if (cfg.gscVerification) {
      const m = document.createElement("meta");
      m.name = "google-site-verification";
      m.content = cfg.gscVerification;
      head.appendChild(m);
    }
    if (cfg.bingVerification) {
      const m = document.createElement("meta");
      m.name = "msvalidate.01";
      m.content = cfg.bingVerification;
      head.appendChild(m);
    }
    if (cfg.ga4MeasurementId) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(cfg.ga4MeasurementId);
      head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", cfg.ga4MeasurementId, { anonymize_ip: true });
    }
  }

  /* ---------- Theme ---------- */
  function initTheme() {
    const stored = localStorage.getItem("ms-theme");
    // Dark colorful theme is the designed default; the toggle offers the
    // light editorial alternative. (prefers-color-scheme no longer overrides it.)
    const theme = stored || "dark";
    document.documentElement.setAttribute("data-theme", theme);

    const toggle = $("#themeToggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("ms-theme", next);
      });
    }
  }

  /* ---------- Preloader ---------- */
  function initPreloader() {
    const pre = $("#preloader");
    if (!pre) return;
    const hide = () => pre.classList.add("is-done");
    if (document.readyState === "complete") setTimeout(hide, 250);
    else {
      window.addEventListener("load", () => setTimeout(hide, 350));
      setTimeout(hide, 2200); // hard cap so it can never stick
    }
  }

  /* ---------- Header + scroll progress + back-to-top ---------- */
  function initScrollUi() {
    const header = $("#header");
    const toTop = $("#toTop");
    const progress = $("#progress");
    const timeline = $(".timeline");

    const onScroll = () => {
      const y = window.scrollY;
      header && header.classList.toggle("is-scrolled", y > 12);
      if (toTop) {
        toTop.hidden = false;
        toTop.classList.toggle("is-visible", y > 480);
      }
      // scroll progress indicator
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.setProperty("--p", max > 0 ? Math.min(y / max, 1).toFixed(4) : 0);
      }
      // progressive timeline reveal
      if (timeline) {
        const rect = timeline.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height || 1;
        const passed = Math.min(Math.max(vh * 0.72 - rect.top, 0), total);
        timeline.style.setProperty("--tl-progress", (passed / total).toFixed(4));
      }
    };
    // Direct execution — cheap enough per scroll event and never starves
    // in throttled windows (rAF gating can stall when the tab is hidden).
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toTop && toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
  }

  /* ---------- Mobile nav ---------- */
  function initMobileNav() {
    const burger = $("#navToggle");
    const nav = $("#nav");
    if (!burger || !nav) return;

    const set = (open) => {
      nav.classList.toggle("is-open", open);
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    };

    burger.addEventListener("click", () => set(!nav.classList.contains("is-open")));
    $$(".nav__link", nav).forEach((l) => l.addEventListener("click", () => set(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
    window.addEventListener("resize", () => { if (window.innerWidth > 860) set(false); });
  }

  /* ---------- Scrollspy ---------- */
  function initScrollspy() {
    const sections = $$("main section[id]");
    const links = $$(".nav__link").filter((l) => l.hash);
    if (!sections.length || !links.length) return;

    const byId = Object.fromEntries(links.map((l) => [l.hash.slice(1), l]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.remove("is-active"));
        const link = byId[entry.target.id];
        link && link.classList.add("is-active");
      });
    }, { rootMargin: "-38% 0px -55% 0px" });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Reveal on scroll (staggered per parent) ---------- */
  function initReveals() {
    const items = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    // Stagger siblings that share a reveal parent (tight — no slideshow feel)
    const groups = new Map();
    items.forEach((el) => {
      const parent = el.parentElement;
      const idx = (groups.get(parent) || 0);
      groups.set(parent, idx + 1);
      el.style.setProperty("--d", Math.min(idx * 60, 300) + "ms");
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach((el) => io.observe(el));

    // Safety net: reveal anything already inside the viewport on load,
    // so first-screen content never depends on observer timing.
    window.addEventListener("load", () => {
      const vh = window.innerHeight;
      items.forEach((el) => {
        if (el.classList.contains("is-visible")) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.94 && r.bottom > 0) el.classList.add("is-visible");
      });
    });
  }

  /* ---------- Contact form ---------- */
  function initForm() {
    const form = $("#contactForm");
    if (!form) return;
    const status = $("#formStatus");
    const submitBtn = $("#cf-submit");
    const fields = {
      name: $("#cf-name"),
      email: $("#cf-email"),
      message: $("#cf-message"),
    };
    const errors = {
      name: $("#cf-name-error"),
      email: $("#cf-email-error"),
      message: $("#cf-message-error"),
    };
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function validate(name) {
      const v = fields[name].value.trim();
      let ok = true;
      if (name === "name") ok = v.length >= 2;
      if (name === "email") ok = emailRe.test(v);
      if (name === "message") ok = v.length >= 10;
      fields[name].setAttribute("aria-invalid", ok ? "false" : "true");
      if (errors[name]) errors[name].hidden = ok;
      return ok;
    }

    Object.keys(fields).forEach((k) => {
      fields[k].addEventListener("blur", () => validate(k));
      fields[k].addEventListener("input", () => {
        if (fields[k].getAttribute("aria-invalid") === "true") validate(k);
      });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const ok = Object.keys(fields).map(validate).every(Boolean);
      if (!ok) {
        status.textContent = "Please fix the highlighted fields.";
        status.className = "form-status is-error";
        const firstBad = Object.keys(fields).find((k) => fields[k].getAttribute("aria-invalid") === "true");
        firstBad && fields[firstBad].focus();
        return;
      }

      // No backend configured — be honest, never fake a send.
      if (!cfg.formEndpoint) {
        status.textContent = "Message delivery isn't connected yet — please reach out directly by email instead.";
        status.className = "form-status is-error";
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      try {
        const res = await fetch(cfg.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: fields.name.value.trim(),
            email: fields.email.value.trim(),
            subject: ($("#cf-subject").value || "Portfolio enquiry").trim(),
            message: fields.message.value.trim(),
          }),
        });
        if (res.ok) {
          form.reset();
          Object.keys(fields).forEach((k) => {
            fields[k].setAttribute("aria-invalid", "false");
            errors[k] && (errors[k].hidden = true);
          });
          status.textContent = "Thank you — your message has been sent. I'll get back to you soon.";
          status.className = "form-status is-success";
        } else {
          throw new Error("HTTP " + res.status);
        }
      } catch (err) {
        status.textContent = "Something went wrong while sending. Please try again or email me directly.";
        status.className = "form-status is-error";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }
    });
  }

  /* ---------- Misc ---------- */
  function initMisc() {
    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    applyConfig();
    initTheme();
    initPreloader();
    initScrollUi();
    initMobileNav();
    initScrollspy();
    initReveals();
    initForm();
    initMisc();
  });
})();
