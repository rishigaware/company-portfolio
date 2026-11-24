// DUMMY DATA — Services, Solutions, Accessories & Spares, Downloads.
// Each service and solution gets its own statically generated, SEO-indexed page.

export type Service = {
  slug: string;
  name: string;
  icon: "wrench" | "gauge" | "shield" | "graduation" | "clock" | "cloud";
  summary: string;
  description: string;
  included: string[];
  steps: { title: string; text: string }[];
  products: string[]; // product slugs this service applies to
};

export const services: Service[] = [
  {
    slug: "installation-commissioning",
    name: "Installation & Commissioning",
    icon: "wrench",
    summary:
      "Factory-trained engineers install, configure and hand over every system.",
    description:
      "Our engineers unpack, install and configure your instruments and software on site, connect them to your network and LIMS, and hand over a fully working system with documentation.",
    included: [
      "Site readiness check",
      "Unpacking & installation",
      "Network & LIMS connection",
      "Functional checks",
      "Installation report",
    ],
    steps: [
      {
        title: "Site survey",
        text: "We confirm power, space, environment and network before delivery.",
      },
      {
        title: "Install",
        text: "Engineers install and configure hardware and software.",
      },
      {
        title: "Verify",
        text: "Functional tests prove the system performs to specification.",
      },
      {
        title: "Handover",
        text: "You receive the installation report and quick-start training.",
      },
    ],
    products: [
      "spectra-x1-uv-vis-spectrophotometer",
      "dissolvo-8-dissolution-tester",
      "climacell-stability-chamber",
    ],
  },
  {
    slug: "calibration",
    name: "Calibration",
    icon: "gauge",
    summary: "Traceable, accredited calibration on site or at our lab.",
    description:
      "ISO/IEC 17025-style calibration using standards traceable to national bodies, with certificates that are ready for audits. Done on site to minimise downtime.",
    included: [
      "Traceable reference standards",
      "As-found / as-left data",
      "Calibration certificate",
      "Due-date reminders",
    ],
    steps: [
      {
        title: "Schedule",
        text: "We plan visits around your production calendar.",
      },
      {
        title: "Calibrate",
        text: "Measurements taken against certified reference standards.",
      },
      {
        title: "Adjust",
        text: "Out-of-tolerance parameters adjusted and re-verified.",
      },
      {
        title: "Certify",
        text: "Certificate issued and uploaded to your portal.",
      },
    ],
    products: [
      "spectra-x1-uv-vis-spectrophotometer",
      "dissolvo-8-dissolution-tester",
      "climacell-stability-chamber",
    ],
  },
  {
    slug: "validation-iq-oq-pq",
    name: "Validation (IQ / OQ / PQ)",
    icon: "shield",
    summary:
      "GAMP 5 qualification and computer system validation, documented end to end.",
    description:
      "We author and execute IQ, OQ and PQ protocols for instruments, and CSV / CSA packages for software, so your systems are inspection-ready from day one.",
    included: [
      "Validation plan",
      "IQ / OQ protocols & execution",
      "PQ templates & support",
      "Traceability matrix",
      "Summary report",
    ],
    steps: [
      {
        title: "Plan",
        text: "Risk assessment and validation plan agreed with your QA.",
      },
      {
        title: "Qualify",
        text: "IQ and OQ executed by certified validation engineers.",
      },
      { title: "Perform", text: "PQ executed with your methods and samples." },
      {
        title: "Report",
        text: "Signed summary report and traceability matrix delivered.",
      },
    ],
    products: [
      "labsphere-lims",
      "auditrail-data-integrity-suite",
      "validpro-csv-platform",
      "climacell-stability-chamber",
    ],
  },
  {
    slug: "preventive-maintenance-amc",
    name: "Preventive Maintenance (AMC)",
    icon: "clock",
    summary:
      "Annual maintenance contracts that prevent breakdowns before they happen.",
    description:
      "Scheduled preventive maintenance visits, priority breakdown support and discounted spares — all under one annual maintenance contract.",
    included: [
      "2–4 scheduled visits per year",
      "Priority breakdown response",
      "Discounted spares",
      "Uptime reporting",
    ],
    steps: [
      {
        title: "Assess",
        text: "We review your instruments' age, usage and history.",
      },
      { title: "Plan", text: "A visit calendar is agreed for the year." },
      {
        title: "Maintain",
        text: "Wear parts replaced and performance checked each visit.",
      },
      {
        title: "Report",
        text: "Uptime and service reports shared after each visit.",
      },
    ],
    products: [
      "spectra-x1-uv-vis-spectrophotometer",
      "dissolvo-8-dissolution-tester",
      "climacell-stability-chamber",
    ],
  },
  {
    slug: "training-certification",
    name: "Training & Certification",
    icon: "graduation",
    summary: "Hands-on training for analysts, administrators and QA teams.",
    description:
      "Role-based training on site, online or at our training centre — with assessments and certificates for your training records.",
    included: [
      "Analyst operation training",
      "Administrator training",
      "QA / audit-trail review training",
      "Certificates of completion",
    ],
    steps: [
      { title: "Assess", text: "We map training needs by role." },
      {
        title: "Train",
        text: "Practical sessions on your own systems and methods.",
      },
      { title: "Evaluate", text: "Short assessments confirm competence." },
      {
        title: "Certify",
        text: "Certificates issued for your training files.",
      },
    ],
    products: [
      "labsphere-lims",
      "auditrail-data-integrity-suite",
      "dissolvo-8-dissolution-tester",
    ],
  },
  {
    slug: "cloud-hosting-support",
    name: "Cloud Hosting & Support",
    icon: "cloud",
    summary: "Validated hosting, upgrades and 24/7 helpdesk for our software.",
    description:
      "We host, back up, monitor and upgrade your GAMP software in qualified cloud infrastructure, with a 24/7 helpdesk and 99.9 % uptime SLA.",
    included: [
      "Qualified cloud infrastructure",
      "Daily backups",
      "Validated upgrades",
      "24/7 helpdesk",
      "99.9 % uptime SLA",
    ],
    steps: [
      { title: "Onboard", text: "Environment provisioned and qualified." },
      {
        title: "Migrate",
        text: "Data migrated and verified from your old system.",
      },
      {
        title: "Operate",
        text: "Monitoring, backups and patching handled by us.",
      },
      {
        title: "Upgrade",
        text: "New releases delivered with validation packs.",
      },
    ],
    products: [
      "labsphere-lims",
      "auditrail-data-integrity-suite",
      "validpro-csv-platform",
    ],
  },
];

export type Solution = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  challenges: string[];
  outcomes: { value: string; label: string }[];
  products: string[];
  services: string[];
  color: string;
};

export const solutions: Solution[] = [
  {
    slug: "pharma-qc-lab",
    name: "Pharma QC Lab",
    tagline: "Release batches faster with a connected, compliant QC lab",
    summary:
      "Instruments, LIMS and data-integrity tools that work together from sample login to batch release.",
    challenges: [
      "Manual transcription between instruments and LIMS",
      "Audit-trail reviews that take days",
      "Batch release delays from paperwork",
    ],
    outcomes: [
      { value: "40%", label: "faster release" },
      { value: "0", label: "transcription errors" },
      { value: "100%", label: "audit-trail coverage" },
    ],
    products: [
      "spectra-x1-uv-vis-spectrophotometer",
      "dissolvo-8-dissolution-tester",
      "labsphere-lims",
      "auditrail-data-integrity-suite",
    ],
    services: [
      "installation-commissioning",
      "validation-iq-oq-pq",
      "calibration",
    ],
    color: "#0d9488",
  },
  {
    slug: "stability-testing",
    name: "Stability Testing",
    tagline: "ICH stability studies without missed pulls or lost data",
    summary:
      "Mapped chambers, remote alarms and automated pull scheduling for long-term studies.",
    challenges: [
      "Chamber excursions found too late",
      "Missed or late stability pulls",
      "Manual trending of results",
    ],
    outcomes: [
      { value: "100%", label: "on-time pulls" },
      { value: "24/7", label: "remote monitoring" },
      { value: "4×", label: "capacity scaling" },
    ],
    products: ["climacell-stability-chamber", "labsphere-lims"],
    services: [
      "installation-commissioning",
      "validation-iq-oq-pq",
      "preventive-maintenance-amc",
    ],
    color: "#2563eb",
  },
  {
    slug: "formulation-rnd",
    name: "Formulation R&D",
    tagline: "Develop and transfer methods faster",
    summary:
      "Flexible instruments and electronic records that speed up development and tech transfer.",
    challenges: [
      "Methods hard to transfer between sites",
      "Data scattered across spreadsheets",
      "Slow instrument set-up for new studies",
    ],
    outcomes: [
      { value: "3×", label: "dissolution throughput" },
      { value: "50%", label: "faster tech transfer" },
      { value: "1", label: "source of truth" },
    ],
    products: [
      "dissolvo-8-dissolution-tester",
      "spectra-x1-uv-vis-spectrophotometer",
      "labsphere-lims",
      "dissoflow-cannula-filters",
    ],
    services: ["training-certification", "installation-commissioning"],
    color: "#7c3aed",
  },
  {
    slug: "data-integrity-compliance",
    name: "Data Integrity & Compliance",
    tagline: "Inspection-ready data, every day",
    summary:
      "Software and services that keep every record ALCOA+ compliant and every system validated.",
    challenges: [
      "Unreviewed audit trails",
      "Paper-based validation",
      "Repeat inspection observations",
    ],
    outcomes: [
      { value: "65%", label: "shorter validation" },
      { value: "0", label: "DI observations" },
      { value: "Real-time", label: "risk alerts" },
    ],
    products: [
      "auditrail-data-integrity-suite",
      "validpro-csv-platform",
      "labsphere-lims",
    ],
    services: [
      "validation-iq-oq-pq",
      "cloud-hosting-support",
      "training-certification",
    ],
    color: "#c2410c",
  },
];

export type Accessory = {
  sku: string;
  name: string;
  type: "Accessory" | "Spare part" | "Upgrade kit" | "Consumable";
  description: string;
  forProduct: string; // product slug
};

export const accessories: Accessory[] = [
  {
    sku: "SX1-CH8",
    name: "8-cell automatic changer",
    type: "Upgrade kit",
    description: "Measure up to 8 samples automatically.",
    forProduct: "spectra-x1-uv-vis-spectrophotometer",
  },
  {
    sku: "SX1-DL",
    name: "Deuterium lamp",
    type: "Spare part",
    description: "Replacement UV lamp, 2000 h rated life.",
    forProduct: "spectra-x1-uv-vis-spectrophotometer",
  },
  {
    sku: "SX1-PELT",
    name: "Peltier cell holder",
    type: "Accessory",
    description: "Temperature-controlled holder, 10–60 °C.",
    forProduct: "spectra-x1-uv-vis-spectrophotometer",
  },
  {
    sku: "D8-AS",
    name: "Auto-sampler module",
    type: "Upgrade kit",
    description: "Programmable sampling with filter change.",
    forProduct: "dissolvo-8-dissolution-tester",
  },
  {
    sku: "D8-PDL",
    name: "USP Apparatus 2 paddles (set of 8)",
    type: "Spare part",
    description: "Serialised, PTFE-coated paddles.",
    forProduct: "dissolvo-8-dissolution-tester",
  },
  {
    sku: "D8-TP",
    name: "Temperature probe set",
    type: "Accessory",
    description: "Per-vessel probes with calibration certificate.",
    forProduct: "dissolvo-8-dissolution-tester",
  },
  {
    sku: "CC-SH",
    name: "Stainless shelf",
    type: "Accessory",
    description: "Additional perforated shelf for ClimaCell.",
    forProduct: "climacell-stability-chamber",
  },
  {
    sku: "CC-HUM",
    name: "Humidifier cartridge",
    type: "Spare part",
    description: "Replacement steam humidifier cartridge.",
    forProduct: "climacell-stability-chamber",
  },
  {
    sku: "CC-SMS",
    name: "Remote alarm gateway",
    type: "Upgrade kit",
    description: "SMS / email alerts over 4G or Ethernet.",
    forProduct: "climacell-stability-chamber",
  },
  {
    sku: "LS-CON",
    name: "Instrument connector licence",
    type: "Upgrade kit",
    description: "Connect one additional instrument to LabSphere.",
    forProduct: "labsphere-lims",
  },
  {
    sku: "CC-CUV2",
    name: "Quartz cuvette pair",
    type: "Consumable",
    description: "Matched 10 mm UV quartz cells.",
    forProduct: "certicell-quartz-cuvettes",
  },
  {
    sku: "DF-35",
    name: "35 µm cannula filters (500)",
    type: "Consumable",
    description: "Full-flow filters for dissolution sampling.",
    forProduct: "dissoflow-cannula-filters",
  },
];

export type Download = {
  slug: string;
  title: string;
  kind: "Brochure" | "Datasheet" | "Certificate" | "Whitepaper" | "Manual";
  product?: string; // product slug
  size: string;
  year: number;
};

export const downloads: Download[] = [
  {
    slug: "company-profile",
    title: "demo company profile",
    kind: "Brochure",
    size: "4.2 MB",
    year: 2026,
  },
  {
    slug: "spectra-x1-brochure",
    title: "Spectra X1 product brochure",
    kind: "Brochure",
    product: "spectra-x1-uv-vis-spectrophotometer",
    size: "2.1 MB",
    year: 2026,
  },
  {
    slug: "spectra-x1-datasheet",
    title: "Spectra X1 technical datasheet",
    kind: "Datasheet",
    product: "spectra-x1-uv-vis-spectrophotometer",
    size: "640 KB",
    year: 2026,
  },
  {
    slug: "dissolvo-8-brochure",
    title: "Dissolvo 8 product brochure",
    kind: "Brochure",
    product: "dissolvo-8-dissolution-tester",
    size: "1.8 MB",
    year: 2025,
  },
  {
    slug: "dissolvo-8-manual",
    title: "Dissolvo 8 user manual",
    kind: "Manual",
    product: "dissolvo-8-dissolution-tester",
    size: "9.5 MB",
    year: 2025,
  },
  {
    slug: "climacell-datasheet",
    title: "ClimaCell chamber datasheet",
    kind: "Datasheet",
    product: "climacell-stability-chamber",
    size: "820 KB",
    year: 2025,
  },
  {
    slug: "labsphere-overview",
    title: "LabSphere LIMS overview",
    kind: "Brochure",
    product: "labsphere-lims",
    size: "3.0 MB",
    year: 2026,
  },
  {
    slug: "part11-whitepaper",
    title: "21 CFR Part 11 compliance whitepaper",
    kind: "Whitepaper",
    size: "1.2 MB",
    year: 2026,
  },
  {
    slug: "csa-whitepaper",
    title: "Moving from CSV to CSA — a practical guide",
    kind: "Whitepaper",
    product: "validpro-csv-platform",
    size: "1.6 MB",
    year: 2025,
  },
  {
    slug: "iso-9001-certificate",
    title: "ISO 9001:2015 certificate",
    kind: "Certificate",
    size: "310 KB",
    year: 2026,
  },
  {
    slug: "iso-13485-certificate",
    title: "ISO 13485 certificate",
    kind: "Certificate",
    size: "290 KB",
    year: 2026,
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
export const getSolution = (slug: string) =>
  solutions.find((s) => s.slug === slug);
