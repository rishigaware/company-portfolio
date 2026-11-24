// DUMMY DATA — replace with your real catalogue. Each entry becomes its own
// statically generated, SEO-indexed page at /products/[slug].

export type ProductCategory = "Instrument" | "Software" | "Consumables";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  summary: string;
  description: string;
  accent: string; // hex colour used for visuals
  features: { title: string; text: string }[];
  specs: { label: string; value: string }[];
  industries: string[];
};

export const products: Product[] = [
  {
    slug: "spectra-x1-uv-vis-spectrophotometer",
    name: "Spectra X1",
    category: "Instrument",
    tagline: "UV-Vis spectrophotometer built for regulated QC labs",
    summary: "Double-beam UV-Vis with 0.5 nm bandwidth and audit-ready data capture.",
    description:
      "Spectra X1 is a double-beam UV-Visible spectrophotometer designed for pharmaceutical quality control. It pairs optical precision with built-in 21 CFR Part 11 compliance, so every scan is traceable from sample to report.",
    accent: "#2dd4bf",
    features: [
      { title: "Double-beam optics", text: "Real-time reference correction removes lamp drift for stable baselines over long runs." },
      { title: "Part 11 ready", text: "Electronic signatures, audit trails and role-based access come standard." },
      { title: "8-cell changer", text: "Automated multi-sample measurement cuts manual handling time by 70%." },
      { title: "Self-diagnostics", text: "Daily performance verification runs automatically at startup." },
    ],
    specs: [
      { label: "Wavelength range", value: "190 – 1100 nm" },
      { label: "Spectral bandwidth", value: "0.5 / 1 / 2 / 5 nm" },
      { label: "Photometric accuracy", value: "±0.002 Abs" },
      { label: "Stray light", value: "< 0.02 %T" },
      { label: "Connectivity", value: "USB, Ethernet, LIMS" },
    ],
    industries: ["Pharmaceuticals", "Biotech", "Academic Research"],
  },
  {
    slug: "dissolvo-8-dissolution-tester",
    name: "Dissolvo 8",
    category: "Instrument",
    tagline: "8-station dissolution tester with USP-compliant precision",
    summary: "Automated sampling, temperature mapping and real-time vessel monitoring.",
    description:
      "Dissolvo 8 delivers reproducible dissolution testing for tablets and capsules. Integrated auto-sampling and per-vessel temperature probes give you USP <711> compliance without the manual effort.",
    accent: "#60a5fa",
    features: [
      { title: "Per-vessel sensing", text: "Independent temperature and RPM monitoring on every station." },
      { title: "Auto-sampling", text: "Programmable sampling intervals with filter changing and media replacement." },
      { title: "Touch interface", text: "10\" glove-friendly touchscreen with guided method setup." },
      { title: "Mechanical qualification", text: "Built-in tools for wobble, centering and height checks." },
    ],
    specs: [
      { label: "Stations", value: "8 + 1 reference" },
      { label: "Speed range", value: "25 – 250 RPM (±1%)" },
      { label: "Temperature", value: "Ambient +5 to 45 °C (±0.2 °C)" },
      { label: "Apparatus", value: "USP 1, 2, 5, 6" },
      { label: "Compliance", value: "USP, EP, JP" },
    ],
    industries: ["Pharmaceuticals", "Nutraceuticals", "CRO"],
  },
  {
    slug: "climacell-stability-chamber",
    name: "ClimaCell",
    category: "Instrument",
    tagline: "ICH stability chambers with uniform climate control",
    summary: "Walk-in and reach-in chambers mapped to ±0.5 °C and ±2% RH.",
    description:
      "ClimaCell stability chambers hold ICH Q1A conditions with exceptional uniformity. Redundant sensors, SMS alarms and continuous data logging protect years of stability studies.",
    accent: "#a78bfa",
    features: [
      { title: "Uniform airflow", text: "CFD-designed ducting keeps every shelf within spec." },
      { title: "Redundant sensors", text: "Dual independent probes with automatic failover." },
      { title: "Remote alarms", text: "Email and SMS alerts the moment a parameter drifts." },
      { title: "Validation pack", text: "IQ/OQ/PQ documentation and mapping reports included." },
    ],
    specs: [
      { label: "Temperature range", value: "10 – 60 °C" },
      { label: "Humidity range", value: "40 – 90 % RH" },
      { label: "Uniformity", value: "±0.5 °C / ±2 % RH" },
      { label: "Capacity", value: "250 L to walk-in" },
      { label: "Data logging", value: "21 CFR Part 11" },
    ],
    industries: ["Pharmaceuticals", "Food & Beverage", "Cosmetics"],
  },
  {
    slug: "labsphere-lims",
    name: "LabSphere LIMS",
    category: "Software",
    tagline: "Cloud LIMS that connects every instrument in your lab",
    summary: "Sample tracking, workflows and reporting in one validated platform.",
    description:
      "LabSphere is a laboratory information management system that tracks samples from receipt to release. Native instrument connectors, configurable workflows and GAMP 5 validation support get you live in weeks, not months.",
    accent: "#f472b6",
    features: [
      { title: "Instrument connectors", text: "Plug-and-play integration with 200+ instrument models." },
      { title: "Visual workflows", text: "Drag-and-drop method and approval flows — no code needed." },
      { title: "Stability module", text: "Schedule pulls, trend results and generate reports automatically." },
      { title: "Validated cloud", text: "Hosted in GxP-qualified infrastructure with full validation pack." },
    ],
    specs: [
      { label: "Deployment", value: "Cloud or on-premise" },
      { label: "Compliance", value: "21 CFR Part 11, EU Annex 11" },
      { label: "Integrations", value: "REST API, ERP, SAP" },
      { label: "Users", value: "5 to 5,000+" },
      { label: "Uptime SLA", value: "99.9 %" },
    ],
    industries: ["Pharmaceuticals", "Biotech", "CRO", "Food & Beverage"],
  },
  {
    slug: "auditrail-data-integrity-suite",
    name: "AudiTrail",
    category: "Software",
    tagline: "Data integrity monitoring for ALCOA+ compliance",
    summary: "Continuously reviews audit trails across systems and flags risks.",
    description:
      "AudiTrail centralises audit trails from instruments and software, then uses rule-based and AI-assisted review to flag data integrity risks before inspectors do.",
    accent: "#fbbf24",
    features: [
      { title: "Unified audit view", text: "One searchable timeline across every connected system." },
      { title: "Risk scoring", text: "Automatic flags for deletions, re-integrations and odd-hour edits." },
      { title: "Review workflows", text: "Assign, comment and sign off on audit trail reviews." },
      { title: "Inspection mode", text: "Read-only, time-boxed access for auditors." },
    ],
    specs: [
      { label: "Data sources", value: "CDS, LIMS, ELN, instruments" },
      { label: "Review", value: "Rule-based + AI assisted" },
      { label: "Compliance", value: "ALCOA+, MHRA, FDA" },
      { label: "Deployment", value: "Cloud / on-premise" },
      { label: "Reports", value: "PDF, Excel, API" },
    ],
    industries: ["Pharmaceuticals", "Biotech"],
  },
  {
    slug: "validpro-csv-platform",
    name: "ValidPro",
    category: "Software",
    tagline: "Paperless computer system validation (CSV / CSA)",
    summary: "Author, execute and approve validation documents digitally.",
    description:
      "ValidPro replaces binders of paper with a digital validation lifecycle. Write URS and test scripts, execute with screenshots captured automatically, and approve with electronic signatures.",
    accent: "#34d399",
    features: [
      { title: "Template library", text: "Pre-built GAMP 5 templates for URS, FS, IQ, OQ and PQ." },
      { title: "Digital execution", text: "Capture evidence and deviations right inside each test step." },
      { title: "Traceability matrix", text: "Requirements link to tests automatically — always up to date." },
      { title: "CSA risk approach", text: "Focus effort where risk is highest, per FDA CSA guidance." },
    ],
    specs: [
      { label: "Methodology", value: "GAMP 5, CSA" },
      { label: "Signatures", value: "21 CFR Part 11 compliant" },
      { label: "Documents", value: "URS, FS, DS, IQ/OQ/PQ" },
      { label: "Deployment", value: "Cloud SaaS" },
      { label: "Integrations", value: "Jira, Azure DevOps, SSO" },
    ],
    industries: ["Pharmaceuticals", "Medical Devices", "Biotech"],
  },
  {
    slug: "certicell-quartz-cuvettes",
    name: "CertiCell Cuvettes",
    category: "Consumables",
    tagline: "Matched quartz cuvettes with traceable certificates",
    summary: "UV-grade quartz cells, matched in pairs, supplied with calibration certificates.",
    description:
      "CertiCell cuvettes are UV-grade fused-quartz cells matched in pairs for transmission. Every set ships with a traceable certificate so your spectrophotometer results stay defensible in audits.",
    accent: "#38bdf8",
    features: [
      { title: "Matched pairs", text: "Transmission matched within 0.5 % at 220 nm." },
      { title: "Traceable", text: "Serialised with certificates traceable to NIST standards." },
      { title: "Durable", text: "Fused-quartz construction resists common lab solvents." },
      { title: "Compatible", text: "Fits Spectra X1 and all standard 12.5 mm cell holders." },
    ],
    specs: [
      { label: "Material", value: "UV fused quartz" },
      { label: "Path length", value: "10 mm" },
      { label: "Range", value: "190 – 2500 nm" },
      { label: "Pack", value: "2 matched cells" },
      { label: "Certificate", value: "Included" },
    ],
    industries: ["Pharmaceuticals", "Academic Research"],
  },
  {
    slug: "dissoflow-cannula-filters",
    name: "DissoFlow Filters",
    category: "Consumables",
    tagline: "Cannula filters and vessels for dissolution testing",
    summary: "Validated full-flow filters, USP vessels and paddles for Dissolvo 8.",
    description:
      "DissoFlow is a validated range of cannula filters, USP-compliant vessels and paddles. Using matched consumables keeps dissolution results consistent between runs, analysts and sites.",
    accent: "#a3e635",
    features: [
      { title: "Validated filters", text: "1, 10, 35 and 70 µm full-flow filters with no drug adsorption." },
      { title: "USP vessels", text: "Precision glass vessels with serialised certificates." },
      { title: "Bulk packs", text: "Packs of 100 / 500 / 1000 at volume pricing." },
      { title: "Auto-reorder", text: "Link to LabSphere for automatic stock replenishment." },
    ],
    specs: [
      { label: "Pore sizes", value: "1 / 10 / 35 / 70 µm" },
      { label: "Vessel volume", value: "1000 mL" },
      { label: "Compliance", value: "USP <711>" },
      { label: "Pack sizes", value: "100 / 500 / 1000" },
      { label: "Compatible", value: "Dissolvo 8, most testers" },
    ],
    industries: ["Pharmaceuticals", "CRO"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

/** Accent colour adjusted toward the current text colour, so accent-coloured text stays readable on light and dark themes. */
export const accentText = (accent: string) => `color-mix(in srgb, ${accent} 65%, var(--t-fg))`;
