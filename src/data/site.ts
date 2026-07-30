import type { IconType } from "react-icons";
import {
  FiTool,
  FiRefreshCw,
  FiDroplet,
  FiSun,
} from "react-icons/fi";

/* ----------------------------------------------------------------
   Central content
---------------------------------------------------------------- */

export const COMPANY = {
  name: "Nick Contractor",
  tagline: "FLAT ROOF REPAIR", // From Image 1
  phone: "(973) 207-0689",
  phoneHref: "tel:+19732070689",
  email: "nickcontractorllc@gmail.com",
  emailHref: "mailto:nickcontractorllc@gmail.com",
  address: "525 Lafayette Ave, Hawthorne, NJ 07506",
  addressHref: "https://maps.google.com/?q=525+Lafayette+Ave,+Hawthorne,+NJ+07506",
  website: "www.nickcontractor.com",
  hours: [
    { day: "Mon – Fri", time: "8:00 AM – 6:00 PM" },
    { day: "Saturday", time: "By appointment" },
    { day: "Sunday", time: "Closed" },
  ],
  social: {
    instagram: "#",
    linkedin: "#",
    facebook: "#",
  },
};

export const NAV_LINKS = [
  { label: "Card", target: "card" }
];

export const TRUST_BADGES = [
  { value: "Up to 60% Cost Savings", label: "vs. full replacement" },
  { value: "20-Year Roof Life Extension", label: "with silicone systems" },
  { value: "No Business Downtime", label: "we work around you" },
  { value: "48-Hour Written Quote", label: "after on-site assessment" },
];

export type Service = {
  icon: IconType;
  title: string;
  description: string;
  accent: string;
};

export const SERVICES: Service[] = [
  {
    icon: FiTool,
    title: "Commercial Roof Repair",
    description: "Expert repair of flat roof systems — TPO, EPDM, modified bitumen, built-up, and metal. Stop leaks at their source.",
    accent: "from-blue-600/90 to-cyan-500/90",
  },
  {
    icon: FiRefreshCw,
    title: "Silicone Roof Coatings",
    description: "Seamless, waterproof silicone membrane that seals every leak and extends roof life by up to 20 years.",
    accent: "from-violet-600/90 to-fuchsia-500/90",
  },
  {
    icon: FiDroplet,
    title: "Roof Restoration",
    description: "Full restoration system that revitalizes aging roofs without tear-off — saving 60% versus replacement.",
    accent: "from-emerald-600/90 to-teal-500/90",
  },
  {
    icon: FiSun,
    title: "Skylight Installation",
    description: "Commercial-grade skylight installation, replacement, and leak repair — bring natural light into your space.",
    accent: "from-amber-500/90 to-yellow-400/90",
  },
];
