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
  { title: "QC lab fit-out", place: "Ahmedabad, IN", tall: true, src: stock.labMicroscope },
  { title: "Stability suite", place: "Hyderabad, IN", tall: false, src: stock.labCorridor },
  { title: "Dissolution bay", place: "Dubai, AE", tall: false, src: stock.labPipette },
  { title: "Bioprocess analytics", place: "Singapore, SG", tall: true, src: stock.labCells },
  { title: "Training centre", place: "Pune, IN", tall: false, src: stock.whiteboardTraining },
  { title: "Service hub", place: "Nairobi, KE", tall: true, src: stock.engineerEquipment },
  { title: "R&D formulation lab", place: "Bengaluru, IN", tall: true, src: stock.engineerPlans },
  { title: "Walk-in chambers", place: "Riyadh, SA", tall: false, src: stock.medicinePacks },
  { title: "University core facility", place: "Kuala Lumpur, MY", tall: false, src: stock.labCells },
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
  { name: "Dr. Ananya Desai", role: "Founder & CEO", bio: "20+ years in analytical instrumentation and pharma QC.", src: stock.founder },
  { name: "Rohan Kapoor", role: "Chief Technology Officer", bio: "Leads software platforms, cloud and integrations.", src: stock.portraitManSmiling },
  { name: "Meera Iyer", role: "Head of Quality & Compliance", bio: "Former QA director; GAMP 5 and CSA specialist.", src: stock.portraitWoman },
  { name: "Vikram Joshi", role: "VP, Global Service", bio: "Runs field service across 22 countries.", src: stock.portraitManSuit },
];

export const awards = [
  { year: 2025, title: "Best Lab Informatics Platform", org: "Pharma Tech Awards (dummy)" },
  { year: 2024, title: "Innovation in QC Instrumentation", org: "Life Science Excellence Forum (dummy)" },
  { year: 2023, title: "Top 50 MedTech Companies to Watch", org: "Industry Review (dummy)" },
  { year: 2022, title: "Excellence in Customer Service", org: "Lab Equipment Council (dummy)" },
];

export const integrations = ["SAP", "Oracle", "Empower", "Chromeleon", "Azure", "AWS", "Jira", "Okta"];

export const news = [
  { date: "2026-10-14", tag: "Product", title: "Spectra X1 now supports 21 CFR Part 11 cloud backup", text: "Automatic, validated backup of all spectral data to LabSphere Cloud.", src: stock.medicinePacks },
  { date: "2026-09-02", tag: "Event", title: "Meet us at Analytica Asia 2026 — Booth B-214", text: "Live demos of Dissolvo 8 and the new AudiTrail AI review.", src: stock.exhibitionHall },
  { date: "2026-07-21", tag: "Company", title: "New service hub opens in Frankfurt", text: "Faster on-site support and calibration for European customers.", src: stock.officeBuilding },
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

/* ------------------------------------------------------------------
 * PEOPLE & PHOTOS (dummy). To use a real photo add `src: "/images/<file>.jpg"`
 * (file placed in /public/images). Without `src`, an illustrated placeholder is shown.
 * ------------------------------------------------------------------ */
import type { Scene } from "@/components/media/SceneArt";
import { stock } from "./stock-photos";

export type Photo = { title: string; caption?: string; date?: string; place?: string; scene: Scene; accent?: string; src?: string };

export const founder = {
  name: "Dr. Ananya Desai",
  role: "Founder & Chief Executive Officer",
  src: stock.founder as string | undefined, // replace with "/images/founder.jpg" (real photo) before going live
  quote: "We started with one spectrophotometer and a simple promise — every result our customers report should be one they can stand behind.",
  bio: [
    "Dr. Desai spent over 20 years in analytical development and quality control at leading pharmaceutical companies before founding the company in 2010.",
    "She leads our strategy, product vision and customer partnerships, and still personally reviews every new instrument before it ships.",
  ],
  chips: ["PhD · Analytical Chemistry", "20+ years in pharma QC", "500+ labs equipped"],
  journey: [
    { year: "2010", text: "Founded with our first UV-Vis spectrophotometer" },
    { year: "2018", text: "Launched LabSphere LIMS, our first software platform" },
    { year: "2026", text: "Serving 500+ labs across 22 countries" },
  ],
  linkedin: "https://www.linkedin.com/",
  email: "ceo@example.com",
};

export const lifePhotos: Photo[] = [
  { title: "Annual team day", caption: "Our whole team, together after a record year.", date: "Mar 2026", place: "Ahmedabad", scene: "team", accent: "var(--t-primary)", src: stock.teamLaptops },
  { title: "Engineer certification", caption: "Field engineers completing advanced instrument training.", date: "Jan 2026", place: "Training centre", scene: "training", accent: "var(--t-accent)", src: stock.whiteboardTraining },
  { title: "Inside our R&D lab", caption: "Where new instruments are designed and stress-tested.", date: "Ongoing", place: "R&D centre", scene: "lab", accent: "var(--t-accent-2)", src: stock.labCorridor },
  { title: "Excellence awards night", caption: "Celebrating customer-service champions.", date: "Dec 2025", place: "Ahmedabad", scene: "award", accent: "#c2410c", src: stock.microphone },
  { title: "New headquarters", caption: "Our expanded HQ with demo labs and a training wing.", date: "Aug 2025", place: "Ahmedabad", scene: "office", accent: "#0369a1", src: stock.officeBuilding },
  { title: "Customer workshop", caption: "Hands-on data-integrity workshop for QA leaders.", date: "Jun 2025", place: "Hyderabad", scene: "event", accent: "#7c3aed", src: stock.workshopAudience },
];

export const eventPhotos: Photo[] = [
  { title: "Analytica Asia 2026", caption: "Live demos of Dissolvo 8 and AudiTrail AI review.", date: "Sep 2026", place: "Mumbai", scene: "expo", accent: "var(--t-primary)", src: stock.exhibitionHall },
  { title: "Pharma QC Summit", caption: "Keynote: building inspection-ready QC labs.", date: "Jul 2026", place: "Dubai", scene: "event", accent: "var(--t-accent)", src: stock.presentationStage },
  { title: "CPHI Middle East", caption: "Launch of the ClimaCell walk-in range.", date: "May 2026", place: "Riyadh", scene: "expo", accent: "var(--t-accent-2)", src: stock.conferenceAudience },
  { title: "GAMP 5 Masterclass", caption: "Two-day validation masterclass for 120 attendees.", date: "Mar 2026", place: "Bengaluru", scene: "training", accent: "#0369a1", src: stock.keynoteRoom },
  { title: "Best Lab Informatics award", caption: "LabSphere recognised at the Pharma Tech Awards.", date: "Nov 2025", place: "Singapore", scene: "award", accent: "#c2410c", src: stock.officeMeeting },
];

export const installPhotos: Photo[] = [
  { title: "QC lab — NovaPharm", caption: "140 instruments connected across three sites.", place: "Ahmedabad", scene: "install", accent: "#0d9488", src: stock.labMicroscope },
  { title: "Stability suite — BioGenix", caption: "Six walk-in ClimaCell chambers commissioned.", place: "Hyderabad", scene: "lab", accent: "#2563eb", src: stock.labCorridor },
  { title: "Dissolution bay — Zenith Labs", caption: "Eight Dissolvo 8 testers with auto-sampling.", place: "Dubai", scene: "install", accent: "#7c3aed", src: stock.labPipette },
  { title: "University core facility", caption: "Spectra X1 fleet for teaching and research.", place: "Kuala Lumpur", scene: "lab", accent: "#0369a1", src: stock.labCells },
  { title: "Validation on site — MediCore", caption: "Digital IQ/OQ executed in ValidPro.", place: "Pune", scene: "training", accent: "#c2410c", src: stock.engineerEquipment },
];
