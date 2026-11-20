/* ============================================================
   SITE CONFIGURATION — Muskan Sailth Portfolio
   ------------------------------------------------------------
   Update the values below to personalise the website.
   Everything here is safe to edit — no code knowledge needed.
   ============================================================ */

const SITE_CONFIG = {
  /* ----------------------------------------------------------
     SITE_URL — the live site address (without trailing slash).
     Currently the GitHub Pages deployment:
        "https://ms-0003.github.io"
     It is used for the canonical URL, Open Graph URL and JSON-LD.
     If you later buy a custom domain, update this value together
     with the canonical/og:url tags in index.html, sitemap.xml
     and robots.txt. See README.md → "Connecting your domain".
     ---------------------------------------------------------- */
  SITE_URL: "https://ms-0003.github.io",

  /* ----------------------------------------------------------
     CONTACT EMAIL — professional contact address.
     Live: muskansailth03@gmail.com (supplied by the site owner).
     ---------------------------------------------------------- */
  email: "muskansailth03@gmail.com",

  /* ----------------------------------------------------------
     LINKEDIN — public profile URL.
     PLACEHOLDER: verify this URL is yours (or create the profile
     and paste the correct one) before going live.
     ---------------------------------------------------------- */
  linkedin: "https://www.linkedin.com/in/muskan-sailth", // TODO: verify/replace

  /* ----------------------------------------------------------
     RESUME — path to a downloadable PDF (optional).
     Place the file at e.g. assets/Muskan-Sailth-Resume.pdf and set:
       resume: "assets/Muskan-Sailth-Resume.pdf"
     While empty (""), no resume button is shown anywhere.
     ---------------------------------------------------------- */
  resume: "",

  /* ----------------------------------------------------------
     CONTACT FORM ENDPOINT — real submission mechanism.
     The form uses Formspree (free tier available at formspree.io):
       1. Create a free Formspree account and a new form.
       2. Copy the endpoint, e.g. "https://formspree.io/f/xxxxxx".
       3. Paste it below.
     While empty (""), the form validates input but shows an honest
     notice that delivery isn't configured yet — it never pretends
     that a message was sent.
     ---------------------------------------------------------- */
  formEndpoint: "",

  /* ----------------------------------------------------------
     ANALYTICS / WEBMASTER IDs (all optional — leave "" to disable)
     ---------------------------------------------------------- */
  ga4MeasurementId: "",     // e.g. "G-XXXXXXXXXX"  (Google Analytics 4)
  gscVerification: "",      // e.g. "google-site-verification=..." meta-content value
  bingVerification: "",     // e.g. "msvalidate.01" meta-content value
};
