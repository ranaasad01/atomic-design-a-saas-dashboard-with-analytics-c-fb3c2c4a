export const APP_NAME = "Pulse Analytics";
export const APP_TAGLINE = "Clarity at the speed of your business.";
export const APP_DESCRIPTION =
  "Real-time SaaS analytics that turns raw data into decisions. Track revenue, users, churn, and growth — all in one place.";

export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/analytics", label: "Analytics" },
  { href: "/users", label: "Users" },
  { href: "/revenue", label: "Revenue" },
  { href: "/settings", label: "Settings" },
];

export const footerLinks: { section: string; links: NavLink[] }[] = [
  {
    section: "Product",
    links: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/analytics", label: "Analytics" },
      { href: "/revenue", label: "Revenue" },
      { href: "/users", label: "Users" },
    ],
  },
  {
    section: "Account",
    links: [
      { href: "/settings", label: "Settings" },
      { href: "/settings", label: "Profile" },
      { href: "/settings", label: "Billing" },
    ],
  },
  {
    section: "Company",
    links: [
      { href: "/", label: "About" },
      { href: "/", label: "Blog" },
      { href: "/", label: "Careers" },
      { href: "/", label: "Contact" },
    ],
  },
];

export interface KpiCard {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  prefix?: string;
  suffix?: string;
}

export interface Transaction {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  date: string;
  plan: string;
}

export type ChartDataPoint = {
  month: string;
  revenue: number;
  mrr: number;
  users: number;
  activeUsers: number;
  churn: number;
};

export const BRAND_COLORS = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  dark: "#1e1b4b",
  light: "#f8fafc",
  border: "#e2e8f0",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  chart: ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"],
};