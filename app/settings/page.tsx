"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Bell, CreditCard, Palette, Camera, Mail, FileText, Check, ChevronRight, Download, Star, Zap, Shield, Upload } from 'lucide-react';
import { BRAND_COLORS } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  description: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INVOICES: Invoice[] = [
  { id: "INV-2024-012", date: "Dec 1, 2024", amount: 99, status: "paid", description: "Pro Plan — December 2024" },
  { id: "INV-2024-011", date: "Nov 1, 2024", amount: 99, status: "paid", description: "Pro Plan — November 2024" },
  { id: "INV-2024-010", date: "Oct 1, 2024", amount: 99, status: "paid", description: "Pro Plan — October 2024" },
  { id: "INV-2024-009", date: "Sep 1, 2024", amount: 79, status: "paid", description: "Starter Plan — September 2024" },
  { id: "INV-2024-008", date: "Aug 1, 2024", amount: 79, status: "paid", description: "Starter Plan — August 2024" },
];

const ACCENT_SWATCHES = [
  { label: "Indigo", value: "#6366f1" },
  { label: "Violet", value: "#8b5cf6" },
  { label: "Cyan", value: "#06b6d4" },
  { label: "Emerald", value: "#10b981" },
  { label: "Amber", value: "#f59e0b" },
  { label: "Rose", value: "#f43f5e" },
];

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "appearance", label: "Appearance", icon: Palette },
];

// ─── Toggle Switch ─────────────────────────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <motion.button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      whileTap={{ scale: 0.93 }}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
        checked ? "bg-indigo-500" : "bg-slate-700"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </motion.button>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-6 lg:p-8"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
      </div>
      {children}
    </motion.div>
  );
}

// ─── Input Field ──────────────────────────────────────────────────────────────

function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-700/60 bg-slate-800/60 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-all duration-200 focus:border-indigo-500/60 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      />
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: "paid" | "pending" | "failed" }) {
  const styles = {
    paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    failed: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}

// ─── Profile Tab ──────────────────────────────────────────────────────────────

function ProfileTab() {
  const [name, setName] = useState("Alexandra Chen");
  const [email, setEmail] = useState("alex.chen@pulseanalytics.io");
  const [bio, setBio] = useState("Head of Growth at Pulse Analytics. Passionate about data-driven decisions and building products people love.");
  const [role, setRole] = useState("Admin");
  const [company, setCompany] = useState("Pulse Analytics Inc.");
  const [website, setWebsite] = useState("https://pulseanalytics.io");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const initials = (name ?? "").split(" ").map((n) => n.charAt(0)).join("").slice(0, 2).toUpperCase();

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      {/* Avatar */}
      <Section title="Profile Photo" description="Upload a photo to personalize your account.">
        <div className="flex items-center gap-6">
          <div className="relative flex-shrink-0">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-2xl font-bold text-white shadow-lg shadow-indigo-500/30">
              {initials}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.93 }}
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-slate-900 bg-indigo-500 text-white shadow-md"
              aria-label="Upload photo"
            >
              <Camera className="h-3.5 w-3.5" />
            </motion.button>
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/60 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:border-indigo-500/40 hover:text-indigo-300"
            >
              <Upload className="h-4 w-4" />
              Upload new photo
            </motion.button>
            <p className="mt-2 text-xs text-slate-500">JPG, PNG or GIF. Max 2MB.</p>
          </div>
        </div>
      </Section>

      {/* Personal Info */}
      <Section title="Personal Information" description="Update your name, email, and public profile details.">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <InputField label="Full Name" value={name} onChange={setName} placeholder="Your full name" />
          <InputField label="Email Address" value={email} onChange={setEmail} type="email" placeholder="you@example.com" />
          <InputField label="Role / Title" value={role} onChange={setRole} placeholder="e.g. Product Manager" />
          <InputField label="Company" value={company} onChange={setCompany} placeholder="Your company name" />
          <div className="sm:col-span-2">
            <InputField label="Website" value={website} onChange={setWebsite} type="url" placeholder="https://yoursite.com" />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-300">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder="Tell us a bit about yourself..."
              className="w-full resize-none rounded-xl border border-slate-700/60 bg-slate-800/60 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-all duration-200 focus:border-indigo-500/60 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <p className="text-xs text-slate-500">{bio.length}/200 characters</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              saved
                ? "bg-emerald-500 text-white"
                : "bg-indigo-500 text-white hover:bg-indigo-400 shadow-lg shadow-indigo-500/30"
            }`}
          >
            {saved ? <Check className="h-4 w-4" /> : null}
            {saved ? "Saved!" : "Save Changes"}
          </motion.button>
        </div>
      </Section>

      {/* Danger Zone */}
      <Section title="Danger Zone" description="Irreversible actions for your account.">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <div>
            <p className="text-sm font-medium text-red-400">Delete Account</p>
            <p className="text-xs text-slate-500 mt-0.5">Permanently delete your account and all associated data.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex-shrink-0 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-all hover:bg-red-500/20"
          >
            Delete Account
          </motion.button>
        </div>
      </Section>
    </motion.div>
  );
}

// ─── Notifications Tab ────────────────────────────────────────────────────────

function NotificationsTab() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [billingAlerts, setBillingAlerts] = useState(true);
  const [churnAlerts, setChurnAlerts] = useState(false);
  const [revenueGoals, setRevenueGoals] = useState(true);
  const [newUserSignups, setNewUserSignups] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const notifGroups = [
    {
      title: "Email Notifications",
      description: "Receive updates and alerts via email.",
      items: [
        { label: "Email Alerts", description: "Get notified about important account events.", value: emailAlerts, onChange: setEmailAlerts },
        { label: "Weekly Digest", description: "A summary of your key metrics every Monday.", value: weeklyDigest, onChange: setWeeklyDigest },
        { label: "Marketing Emails", description: "Product updates, tips, and feature announcements.", value: marketingEmails, onChange: setMarketingEmails },
      ],
    },
    {
      title: "Push Notifications",
      description: "Real-time alerts delivered to your browser.",
      items: [
        { label: "Push Notifications", description: "Enable browser push notifications.", value: pushNotifs, onChange: setPushNotifs },
        { label: "New User Signups", description: "Alert when a new user joins your workspace.", value: newUserSignups, onChange: setNewUserSignups },
      ],
    },
    {
      title: "Business Alerts",
      description: "Stay on top of critical business events.",
      items: [
        { label: "Billing Alerts", description: "Notifications for payments, renewals, and failures.", value: billingAlerts, onChange: setBillingAlerts },
        { label: "Churn Alerts", description: "Alert when churn rate exceeds your threshold.", value: churnAlerts, onChange: setChurnAlerts },
        { label: "Revenue Goals", description: "Celebrate when you hit MRR milestones.", value: revenueGoals, onChange: setRevenueGoals },
        { label: "Security Alerts", description: "Unusual login attempts or account changes.", value: securityAlerts, onChange: setSecurityAlerts },
      ],
    },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      {notifGroups.map((group) => (
        <Section key={group.title} title={group.title} description={group.description}>
          <div className="divide-y divide-slate-800/60">
            {group.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="pr-4">
                  <p className="text-sm font-medium text-slate-200">{item.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                </div>
                <Toggle checked={item.value} onChange={item.onChange} />
              </div>
            ))}
          </div>
        </Section>
      ))}
    </motion.div>
  );
}

// ─── Billing Tab ──────────────────────────────────────────────────────────────

function BillingTab() {
  const plans = [
    {
      name: "Starter",
      price: 79,
      description: "For small teams getting started.",
      features: ["Up to 5 team members", "10k events/month", "30-day data retention", "Email support"],
      icon: Star,
      current: false,
    },
    {
      name: "Pro",
      price: 99,
      description: "For growing businesses.",
      features: ["Up to 20 team members", "500k events/month", "1-year data retention", "Priority support", "Custom dashboards"],
      icon: Zap,
      current: true,
    },
    {
      name: "Enterprise",
      price: 299,
      description: "For large-scale operations.",
      features: ["Unlimited team members", "Unlimited events", "Unlimited retention", "Dedicated support", "SSO & SAML", "SLA guarantee"],
      icon: Shield,
      current: false,
    },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      {/* Current Plan */}
      <Section title="Current Plan" description="Manage your subscription and upgrade at any time.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                variants={scaleIn}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`relative rounded-2xl border p-5 transition-all duration-200 ${
                  plan.current
                    ? "border-indigo-500/50 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                    : "border-slate-700/60 bg-slate-800/40 hover:border-slate-600/60"
                }`}
              >
                {plan.current && (
                  <span className="absolute -top-2.5 left-4 inline-flex items-center rounded-full bg-indigo-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                    Current Plan
                  </span>
                )}
                <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${plan.current ? "bg-indigo-500/20" : "bg-slate-700/60"}`}>
                  <Icon className={`h-4.5 w-4.5 ${plan.current ? "text-indigo-400" : "text-slate-400"}`} style={{ height: 18, width: 18 }} />
                </div>
                <h3 className="text-base font-semibold text-white">{plan.name}</h3>
                <p className="mt-0.5 text-xs text-slate-400">{plan.description}</p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">${plan.price}</span>
                  <span className="text-xs text-slate-500">/mo</span>
                </div>
                <ul className="mt-4 space-y-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                      <Check className="h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                {!plan.current && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-5 w-full rounded-xl bg-indigo-500/10 border border-indigo-500/30 py-2 text-sm font-medium text-indigo-300 transition-all hover:bg-indigo-500/20"
                  >
                    {plan.price > 99 ? "Contact Sales" : "Downgrade"}
                  </motion.button>
                )}
                {plan.current && (
                  <div className="mt-5 w-full rounded-xl bg-indigo-500/20 border border-indigo-500/30 py-2 text-center text-sm font-medium text-indigo-300">
                    Active
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Payment Method */}
      <Section title="Payment Method" description="Your current payment method on file.">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-slate-700/60 bg-slate-800/40 p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-600 text-xs font-bold text-white tracking-widest">
              VISA
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">Visa ending in 4242</p>
              <p className="text-xs text-slate-500">Expires 08 / 2027</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
              <Check className="h-3 w-3" /> Default
            </span>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-lg border border-slate-700/60 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all hover:border-indigo-500/40 hover:text-indigo-300"
            >
              Update
            </motion.button>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="mt-3 inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <CreditCard className="h-4 w-4" />
          Add new payment method
        </motion.button>
      </Section>

      {/* Invoice History */}
      <Section title="Invoice History" description="Download past invoices for your records.">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800/60">
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Invoice</th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Description</th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Amount</th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {(INVOICES ?? []).map((inv) => (
                <tr key={inv.id} className="group transition-colors hover:bg-slate-800/30">
                  <td className="py-3.5 pr-4 font-mono text-xs text-slate-400">{inv.id}</td>
                  <td className="py-3.5 pr-4 text-slate-300">{inv.date}</td>
                  <td className="py-3.5 pr-4 text-slate-400 max-w-[200px] truncate">{inv.description}</td>
                  <td className="py-3.5 pr-4 font-semibold text-slate-200">${(inv.amount ?? 0).toFixed(2)}</td>
                  <td className="py-3.5 pr-4">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="py-3.5 text-right">
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.93 }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/60 px-2.5 py-1.5 text-xs font-medium text-slate-400 transition-all hover:border-indigo-500/40 hover:text-indigo-300"
                    >
                      <Download className="h-3.5 w-3.5" />
                      PDF
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </motion.div>
  );
}

// ─── Appearance Tab ───────────────────────────────────────────────────────────

function AppearanceTab() {
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [accentColor, setAccentColor] = useState("#6366f1");
  const [sidebarCompact, setSidebarCompact] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [density, setDensity] = useState<"comfortable" | "compact" | "spacious">("comfortable");

  const themes = [
    { id: "dark" as const, label: "Dark", preview: "bg-slate-950 border-slate-700" },
    { id: "light" as const, label: "Light", preview: "bg-white border-slate-200" },
    { id: "system" as const, label: "System", preview: "bg-gradient-to-br from-slate-950 to-white border-slate-500" },
  ];

  const densities = [
    { id: "compact" as const, label: "Compact", description: "Tighter spacing, more data visible." },
    { id: "comfortable" as const, label: "Comfortable", description: "Balanced spacing for daily use." },
    { id: "spacious" as const, label: "Spacious", description: "Generous spacing, easier on the eyes." },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      {/* Theme */}
      <Section title="Theme" description="Choose how Pulse Analytics looks for you.">
        <div className="grid grid-cols-3 gap-3">
          {themes.map((t) => (
            <motion.button
              key={t.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setTheme(t.id)}
              className={`relative flex flex-col items-center gap-3 rounded-xl border p-4 transition-all duration-200 ${
                theme === t.id
                  ? "border-indigo-500/60 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                  : "border-slate-700/60 bg-slate-800/40 hover:border-slate-600/60"
              }`}
            >
              <div className={`h-12 w-full rounded-lg border ${t.preview}`} />
              <span className="text-sm font-medium text-slate-300">{t.label}</span>
              {theme === t.id && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500"
                >
                  <Check className="h-3 w-3 text-white" />
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Accent Color */}
      <Section title="Accent Color" description="Personalize the primary color used across the interface.">
        <div className="flex flex-wrap gap-3">
          {ACCENT_SWATCHES.map((swatch) => (
            <motion.button
              key={swatch.value}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setAccentColor(swatch.value)}
              title={swatch.label}
              aria-label={`Set accent to ${swatch.label}`}
              className={`relative h-9 w-9 rounded-full border-2 transition-all duration-200 ${
                accentColor === swatch.value ? "border-white scale-110 shadow-lg" : "border-transparent"
              }`}
              style={{ backgroundColor: swatch.value }}
            >
              {accentColor === swatch.value && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white drop-shadow" />
                </span>
              )}
            </motion.button>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-700/60 bg-slate-800/40 p-3">
          <div className="h-8 w-8 rounded-lg shadow-md" style={{ backgroundColor: accentColor }} />
          <div>
            <p className="text-sm font-medium text-slate-200">
              {ACCENT_SWATCHES.find((s) => s.value === accentColor)?.label ?? "Custom"} accent
            </p>
            <p className="text-xs text-slate-500 font-mono">{accentColor}</p>
          </div>
        </div>
      </Section>

      {/* Layout Density */}
      <Section title="Layout Density" description="Control how much information is shown on screen.">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {densities.map((d) => (
            <motion.button
              key={d.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setDensity(d.id)}
              className={`flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all duration-200 ${
                density === d.id
                  ? "border-indigo-500/50 bg-indigo-500/10"
                  : "border-slate-700/60 bg-slate-800/40 hover:border-slate-600/60"
              }`}
            >
              <span className="text-sm font-semibold text-slate-200">{d.label}</span>
              <span className="text-xs text-slate-500">{d.description}</span>
              {density === d.id && (
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-indigo-400">
                  <Check className="h-3 w-3" /> Selected
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Interface Options */}
      <Section title="Interface Options" description="Fine-tune the behavior of the interface.">
        <div className="divide-y divide-slate-800/60">
          <div className="flex items-center justify-between py-4 first:pt-0">
            <div>
              <p className="text-sm font-medium text-slate-200">Compact Sidebar</p>
              <p className="text-xs text-slate-500 mt-0.5">Show only icons in the sidebar navigation.</p>
            </div>
            <Toggle checked={sidebarCompact} onChange={setSidebarCompact} />
          </div>
          <div className="flex items-center justify-between py-4 last:pb-0">
            <div>
              <p className="text-sm font-medium text-slate-200">Enable Animations</p>
              <p className="text-xs text-slate-500 mt-0.5">Smooth transitions and micro-interactions throughout the UI.</p>
            </div>
            <Toggle checked={animationsEnabled} onChange={setAnimationsEnabled} />
          </div>
        </div>
      </Section>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
          <p className="mt-2 text-slate-400">
            Manage your profile, notifications, billing, and appearance preferences.
          </p>
        </motion.div>

        {/* Tab Bar */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-8 flex flex-wrap gap-1 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-1.5 backdrop-blur-sm"
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-1 min-w-[100px] items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="settings-tab-pill"
                    className="absolute inset-0 rounded-xl bg-indigo-500/20 border border-indigo-500/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="relative h-4 w-4 flex-shrink-0" />
                <span className="relative">{tab.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "notifications" && <NotificationsTab />}
            {activeTab === "billing" && <BillingTab />}
            {activeTab === "appearance" && <AppearanceTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}