// DUMMY DATA — swap with real company content.

export type NavItem = { href: string; label: string; desc?: string; children?: NavItem[] };

/** Main menu. "Home" is intentionally omitted — the logo links to the homepage. */
export const navLinks: NavItem[] = [
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/services", label: "Services" },
  {
    href: "/case-studies",
    label: "Resources",
    children: [
      { href: "/case-studies", label: "Case Studies", desc: "Results from labs like yours" },
      { href: "/accessories", label: "Accessories & Spares", desc: "Genuine parts and upgrade kits" },
      { href: "/downloads", label: "Downloads", desc: "Brochures, datasheets, certificates" },
    ],
  },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Flat list (mobile menu, footer). */
export const flatNavLinks: NavItem[] = navLinks.flatMap((l) => l.children ?? [l]);

export const stats = [
  { value: 15, suffix: "+", label: "Years of innovation" },
  { value: 500, suffix: "+", label: "Labs equipped" },
  { value: 22, suffix: "", label: "Countries served" },
  { value: 99, suffix: "%", label: "Audit success rate" },
];

export const industries = [
  { name: "Pharmaceuticals", text: "QC, R&D and manufacturing labs running under GMP.", size: "lg" },
  { name: "Biotech", text: "Bioprocess and analytical labs scaling fast.", size: "sm" },
  { name: "CRO / CDMO", text: "Multi-client labs that need airtight data separation.", size: "sm" },
  { name: "Food & Beverage", text: "Quality testing from raw material to shelf.", size: "sm" },
  { name: "Medical Devices", text: "Validated systems for ISO 13485 environments.", size: "sm" },
  { name: "Academic Research", text: "Reliable instruments for universities and institutes.", size: "full" },
] as const;

export const processSteps = [
  { title: "Consult", text: "We understand your lab, workflows and compliance needs." },
  { title: "Configure", text: "Instruments and software are tailored to your methods." },
  { title: "Install & Validate", text: "On-site installation with full IQ/OQ/PQ documentation." },
  { title: "Train", text: "Hands-on training for analysts, QA and administrators." },
  { title: "Support", text: "24/7 service, preventive maintenance and upgrades." },
];

export const testimonials = [
  { quote: "Switching to LabSphere cut our sample turnaround time by 40%. The validation pack saved us months.", name: "Dr. A. Mehta", role: "QC Head, Generic Pharma Co." },
  { quote: "Dissolvo 8 has been rock solid for three years. Service response is the best we've had.", name: "S. Rao", role: "Lab Manager, Formulation R&D" },
  { quote: "AudiTrail flagged issues we would have missed before our FDA inspection. Zero observations.", name: "K. Iyer", role: "QA Director, Biotech Startup" },
  { quote: "The stability chambers hold spec perfectly. Mapping reports were inspection-ready out of the box.", name: "P. Shah", role: "Stability Lead, CDMO" },
];

export const clients = ["NovaPharm", "BioGenix", "MediCore", "Zenith Labs", "Apex Bio", "Helix Health", "PureForm", "Orion Life"];

export const certifications = ["ISO 9001:2015", "ISO 13485", "GAMP 5", "21 CFR Part 11", "CE", "EU Annex 11"];

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  products: string[];
  results: { value: string; label: string }[];
  color: string;
  year: number;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "novapharm-qc-digitalisation",
    client: "NovaPharm",
    industry: "Pharmaceuticals",
    title: "Paperless QC lab across 3 manufacturing sites",
    challenge: "Paper logbooks and disconnected instruments caused 2-day release delays and repeat audit observations.",
    solution: "Connected 140 instruments to LabSphere LIMS and rolled out AudiTrail for continuous data-integrity review.",
    products: ["LabSphere LIMS", "AudiTrail", "Spectra X1"],
    results: [{ value: "48%", label: "faster batch release" }, { value: "0", label: "data-integrity observations" }, { value: "140", label: "instruments connected" }],
    color: "#0d9488",
    year: 2025,
  },
  {
    slug: "biogenix-stability-program",
    client: "BioGenix",
    industry: "Biotech",
    title: "Scaling a biologics stability program 4×",
    challenge: "A fast-growing biologics pipeline outgrew manual stability scheduling and reach-in chambers.",
    solution: "Installed six walk-in ClimaCell chambers with remote alarms and automated stability pulls in LabSphere.",
    products: ["ClimaCell", "LabSphere LIMS"],
    results: [{ value: "4×", label: "stability capacity" }, { value: "100%", label: "on-time pulls" }, { value: "6 wk", label: "install to go-live" }],
    color: "#2563eb",
    year: 2024,
  },
  {
    slug: "zenith-labs-dissolution",
    client: "Zenith Labs",
    industry: "CRO",
    title: "Automated dissolution for a multi-client CRO",
    challenge: "Manual sampling limited throughput and risked cross-client data mix-ups.",
    solution: "Deployed eight Dissolvo 8 testers with auto-sampling and client-segregated workflows.",
    products: ["Dissolvo 8", "LabSphere LIMS"],
    results: [{ value: "3×", label: "daily throughput" }, { value: "70%", label: "less analyst time" }, { value: "99.8%", label: "first-pass accuracy" }],
    color: "#7c3aed",
    year: 2024,
  },
  {
    slug: "medicore-csv-transformation",
    client: "MediCore",
    industry: "Medical Devices",
    title: "Cutting validation cycles from months to weeks",
    challenge: "Paper-based computer system validation took 5 months per system and blocked software upgrades.",
    solution: "Moved to ValidPro with a risk-based CSA approach and digital test execution.",
    products: ["ValidPro"],
    results: [{ value: "65%", label: "shorter validation" }, { value: "12k", label: "pages of paper removed" }, { value: "3 wk", label: "avg. validation cycle" }],
    color: "#c2410c",
    year: 2023,
  },
];

export const gallery = [
  { title: "QC lab fit-out", place: "Ahmedabad, IN", tall: true },
  { title: "Stability suite", place: "Hyderabad, IN", tall: false },
  { title: "Dissolution bay", place: "Dubai, AE", tall: false },
  { title: "Bioprocess analytics", place: "Singapore, SG", tall: true },
  { title: "Training centre", place: "Pune, IN", tall: false },
  { title: "Service hub", place: "Nairobi, KE", tall: true },
  { title: "R&D formulation lab", place: "Bengaluru, IN", tall: true },
  { title: "Walk-in chambers", place: "Riyadh, SA", tall: false },
  { title: "University core facility", place: "Kuala Lumpur, MY", tall: false },
];

/** Office locations (dummy) — real latitude/longitude, plotted on the world map. */
export const offices = [
  { city: "Ahmedabad", country: "India", role: "Headquarters", lat: 23.02, lng: 72.57, hq: true },
  { city: "Dubai", country: "UAE", role: "Middle East hub", lat: 25.2, lng: 55.27, labelLeft: true },
  { city: "Singapore", country: "Singapore", role: "APAC office", lat: 1.35, lng: 103.82 },
  { city: "Frankfurt", country: "Germany", role: "EU service centre", lat: 50.11, lng: 8.68 },
  { city: "Nairobi", country: "Kenya", role: "Africa partner", lat: -1.29, lng: 36.82 },
  { city: "New Jersey", country: "USA", role: "Americas partner", lat: 40.06, lng: -74.41 },
];

export const team = [
  { name: "Dr. Ananya Desai", role: "Founder & CEO", bio: "20+ years in analytical instrumentation and pharma QC." },
  { name: "Rohan Kapoor", role: "Chief Technology Officer", bio: "Leads software platforms, cloud and integrations." },
  { name: "Meera Iyer", role: "Head of Quality & Compliance", bio: "Former QA director; GAMP 5 and CSA specialist." },
  { name: "Vikram Joshi", role: "VP, Global Service", bio: "Runs field service across 22 countries." },
];

export const awards = [
  { year: 2025, title: "Best Lab Informatics Platform", org: "Pharma Tech Awards (dummy)" },
  { year: 2024, title: "Innovation in QC Instrumentation", org: "Life Science Excellence Forum (dummy)" },
  { year: 2023, title: "Top 50 MedTech Companies to Watch", org: "Industry Review (dummy)" },
  { year: 2022, title: "Excellence in Customer Service", org: "Lab Equipment Council (dummy)" },
];

export const integrations = ["SAP", "Oracle", "Empower", "Chromeleon", "Azure", "AWS", "Jira", "Okta"];

export const news = [
  { date: "2026-10-14", tag: "Product", title: "Spectra X1 now supports 21 CFR Part 11 cloud backup", text: "Automatic, validated backup of all spectral data to LabSphere Cloud." },
  { date: "2026-09-02", tag: "Event", title: "Meet us at Analytica Asia 2026 — Booth B-214", text: "Live demos of Dissolvo 8 and the new AudiTrail AI review." },
  { date: "2026-07-21", tag: "Company", title: "New service hub opens in Frankfurt", text: "Faster on-site support and calibration for European customers." },
];

export const faqs = [
  { q: "Are your instruments and software 21 CFR Part 11 compliant?", a: "Yes. All instruments with data capture and all software products support electronic records and signatures, audit trails and role-based access, and ship with validation documentation." },
  { q: "Do you provide installation and validation (IQ/OQ/PQ)?", a: "Our engineers install every instrument and execute IQ/OQ on site. PQ protocols and templates are provided, and we can execute them with your team." },
  { q: "Can your software connect to instruments from other brands?", a: "LabSphere LIMS includes connectors for 200+ instrument models from major manufacturers, plus a REST API for anything else." },
  { q: "Is the software available on-premise?", a: "LabSphere and AudiTrail are available as validated cloud SaaS or on-premise. ValidPro is cloud-only." },
  { q: "Which countries do you serve?", a: "We sell and support customers in 22 countries through our own offices and certified partners." },
  { q: "How quickly can I get a quote or demo?", a: "Send an enquiry from the contact page and an application specialist will reply within one business day." },
];

/** DUMMY client list for the animated clients section. Replace with real clients + logo files. */
export type ClientLogo = {
  name: string;
  sector: string;
  mark: "hexagon" | "ring" | "leaf" | "cross" | "drop" | "triangle" | "helix" | "square";
  color: string;
};

export const clientLogos: ClientLogo[] = [
  { name: "NovaPharm", sector: "Generics", mark: "hexagon", color: "#0d9488" },
  { name: "BioGenix", sector: "Biologics", mark: "helix", color: "#2563eb" },
  { name: "MediCore", sector: "Medical devices", mark: "cross", color: "#dc2626" },
  { name: "Zenith Labs", sector: "CRO", mark: "triangle", color: "#7c3aed" },
  { name: "Apex Bio", sector: "Biotech", mark: "leaf", color: "#16a34a" },
  { name: "Helix Health", sector: "Diagnostics", mark: "ring", color: "#0891b2" },
  { name: "PureForm", sector: "Nutraceuticals", mark: "drop", color: "#0284c7" },
  { name: "Orion Life", sector: "Vaccines", mark: "square", color: "#c2410c" },
  { name: "Vitalis", sector: "API manufacturing", mark: "drop", color: "#db2777" },
  { name: "Quantis Pharma", sector: "Oncology", mark: "hexagon", color: "#4f46e5" },
  { name: "CellNova", sector: "Cell therapy", mark: "ring", color: "#059669" },
  { name: "Medora", sector: "Formulations", mark: "leaf", color: "#ca8a04" },
  { name: "Kinetix Labs", sector: "Testing lab", mark: "triangle", color: "#0f766e" },
  { name: "Synthera", sector: "Peptides", mark: "helix", color: "#9333ea" },
  { name: "AquaMed", sector: "Ophthalmics", mark: "drop", color: "#0369a1" },
  { name: "Lumina Bio", sector: "Research institute", mark: "square", color: "#e11d48" },
];

/** DUMMY client quotes shown in the rotating card of the clients section. */
export const clientQuotes = [
  { client: "NovaPharm", person: "Dr. A. Mehta", role: "Head of Quality Control", quote: "Three sites, one connected QC lab. Batch release is now 48% faster and our last inspection had zero data-integrity findings." },
  { client: "BioGenix", person: "R. Nair", role: "Director, Stability", quote: "The ClimaCell chambers and automated pulls let us scale our biologics stability programme four times without adding headcount." },
  { client: "Zenith Labs", person: "S. Rao", role: "Lab Operations Manager", quote: "Dissolvo 8 tripled our dissolution throughput. Service response is the fastest we've had from any vendor." },
  { client: "MediCore", person: "K. Iyer", role: "QA Director", quote: "ValidPro turned five-month validation projects into three-week cycles. Our auditors actually compliment the documentation now." },
];
