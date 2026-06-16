"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, ArrowRight, BarChart2, TrendingUp, Users, Zap, Shield, Globe, Star, Check, ChevronRight, Sparkles, ArrowUp, Clock } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION, BRAND_COLORS } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const heroChartData = [
  { month: "Jan", revenue: 32000, users: 1200 },
  { month: "Feb", revenue: 38000, users: 1450 },
  { month: "Mar", revenue: 35000, users: 1380 },
  { month: "Apr", revenue: 44000, users: 1700 },
  { month: "May", revenue: 51000, users: 2100 },
  { month: "Jun", revenue: 48000, users: 2050 },
  { month: "Jul", revenue: 59000, users: 2400 },
  { month: "Aug", revenue: 67000, users: 2750 },
  { month: "Sep", revenue: 72000, users: 3100 },
  { month: "Oct", revenue: 80000, users: 3400 },
  { month: "Nov", revenue: 88000, users: 3800 },
  { month: "Dec", revenue: 97000, users: 4200 },
];

const kpiStats = [
  { id: "mrr", label: "Monthly Recurring Revenue", value: "$97,400", change: "+18.4%", positive: true },
  { id: "users", label: "Active Users", value: "4,218", change: "+12.1%", positive: true },
  { id: "churn", label: "Churn Rate", value: "1.8%", change: "-0.4%", positive: true },
  { id: "ltv", label: "Avg. LTV", value: "$2,340", change: "+9.7%", positive: true },
];

const features = [
  {
    icon: BarChart2,
    title: "Real-Time Revenue Tracking",
    description:
      "Monitor MRR, ARR, and expansion revenue as they happen. Drill into cohorts, plans, and geographies with a single click.",
    color: "from-indigo-500 to-violet-600",
    glow: "shadow-indigo-500/20",
  },
  {
    icon: Users,
    title: "User Lifecycle Analytics",
    description:
      "Understand acquisition, activation, retention, and churn across every segment. Spot at-risk accounts before they leave.",
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
  },
  {
    icon: TrendingUp,
    title: "Growth Forecasting",
    description:
      "AI-powered projections built on your historical data. Set targets, track progress, and share forecasts with your board.",
    color: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/20",
  },
  {
    icon: Zap,
    title: "Instant Alerts & Anomalies",
    description:
      "Get notified the moment revenue spikes, churn accelerates, or a key metric deviates from its trend — no manual monitoring needed.",
    color: "from-amber-500 to-orange-500",
    glow: "shadow-amber-500/20",
  },
  {
    icon: Shield,
    title: "SOC 2 Compliant Security",
    description:
      "Your data is encrypted at rest and in transit. Role-based access, audit logs, and SSO keep your team and customers safe.",
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
  },
  {
    icon: Globe,
    title: "Multi-Workspace & Teams",
    description:
      "Manage multiple products or clients from one account. Granular permissions let every stakeholder see exactly what they need.",
    color: "from-rose-500 to-pink-600",
    glow: "shadow-rose-500/20",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Sarah Chen",
    role: "Head of Growth, Loomify",
    avatar: "/images/sarah-chen-avatar.jpg",
    quote:
      "Pulse Analytics replaced four separate tools overnight. Our team finally has a single source of truth for revenue and retention — and the charts are gorgeous.",
    stars: 5,
  },
  {
    id: "t2",
    name: "Marcus Webb",
    role: "CEO, Stackform",
    avatar: "/images/marcus-webb-avatar.jpg",
    quote:
      "We spotted a churn spike in a specific cohort within hours of it starting. That early warning saved us roughly $40k in ARR. Worth every penny.",
    stars: 5,
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "VP Product, Claritask",
    avatar: "/images/priya-nair-avatar.jpg",
    quote:
      "The forecasting module is scarily accurate. We use it every board meeting and investors love the clean, data-backed narrative it gives us.",
    stars: 5,
  },
];

const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "Perfect for early-stage SaaS teams getting their first analytics layer in place.",
    features: [
      "Up to 5,000 tracked users",
      "MRR & ARR dashboards",
      "7-day data retention",
      "Email alerts",
      "2 team seats",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: "$149",
    period: "/mo",
    description: "For scaling teams that need deeper cohort analysis and forecasting.",
    features: [
      "Up to 50,000 tracked users",
      "Full cohort & retention analysis",
      "90-day data retention",
      "Slack & PagerDuty alerts",
      "10 team seats",
      "AI growth forecasting",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Unlimited scale, dedicated support, and custom integrations for large teams.",
    features: [
      "Unlimited tracked users",
      "Custom data retention",
      "SSO & SCIM provisioning",
      "Dedicated success manager",
      "Unlimited seats",
      "SLA guarantee",
    ],
    cta: "Talk to sales",
    highlighted: false,
  },
];

const integrations = [
  { name: "Stripe", logo: "/images/stripe-logo-integration.jpg" },
  { name: "Salesforce", logo: "/images/salesforce-logo-integration.jpg" },
  { name: "HubSpot", logo: "/images/hubspot-logo-integration.jpg" },
  { name: "Segment", logo: "/images/segment-logo-integration.jpg" },
  { name: "Intercom", logo: "/images/intercom-logo-integration.jpg" },
  { name: "Slack", logo: "/images/slack-logo-integration.jpg" },
];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</p>
      {(payload ?? []).map((entry, i) => (
        <p key={i} className="text-sm font-semibold text-white">
          {entry.name === "revenue"
            ? `$${(entry.value ?? 0).toLocaleString()}`
            : `${(entry.value ?? 0).toLocaleString()} users`}
        </p>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"revenue" | "users">("revenue");

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-indigo-600/10 blur-[120px]" />
          <div className="absolute right-0 top-1/3 h-[400px] w-[500px] rounded-full bg-violet-600/8 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Now with AI-powered forecasting
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              <span className="text-white">Analytics that drive</span>{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                real growth
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed"
            >
              {APP_DESCRIPTION}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            >
              <Link href="/dashboard">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow duration-300 cursor-pointer"
                >
                  Start free trial
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Link>
              <Link href="/analytics">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/40 px-7 py-3.5 text-sm font-semibold text-slate-300 hover:text-white hover:border-slate-600 transition-all duration-200 cursor-pointer"
                >
                  View live demo
                  <ChevronRight className="h-4 w-4" />
                </motion.span>
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mt-5 text-xs text-slate-500"
            >
              No credit card required · 14-day free trial · Cancel anytime
            </motion.p>
          </div>

          {/* Hero chart card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            className="mt-16 rounded-2xl border border-slate-700/50 bg-slate-900/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm"
          >
            {/* Mini KPI row */}
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {kpiStats.map((kpi) => (
                <motion.div
                  key={kpi.id}
                  whileHover={{ scale: 1.03 }}
                  className="rounded-xl border border-slate-700/40 bg-slate-800/50 px-4 py-3"
                >
                  <p className="text-xs text-slate-500 truncate">{kpi.label}</p>
                  <p className="mt-1 text-xl font-bold text-white">{kpi.value}</p>
                  <p className={`mt-0.5 text-xs font-semibold flex items-center gap-1 ${kpi.positive ? "text-emerald-400" : "text-rose-400"}`}>
                    <ArrowUp className="h-3 w-3" />
                    {kpi.change}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Tab switcher */}
            <div className="mb-4 flex items-center gap-2">
              {(["revenue", "users"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab === "revenue" ? "Revenue" : "Users"}
                </button>
              ))}
              <span className="ml-auto flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                Last 12 months
              </span>
            </div>

            {/* Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={heroChartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) =>
                      activeTab === "revenue" ? `$${(v / 1000).toFixed(0)}k` : `${(v / 1000).toFixed(1)}k`
                    }
                  />
                  <Tooltip content={<CustomTooltip />} />
                  {activeTab === "revenue" ? (
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6366f1"
                      strokeWidth={2.5}
                      fill="url(#colorRevenue)"
                      dot={false}
                      activeDot={{ r: 5, fill: "#6366f1", strokeWidth: 0 }}
                    />
                  ) : (
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#06b6d4"
                      strokeWidth={2.5}
                      fill="url(#colorUsers)"
                      dot={false}
                      activeDot={{ r: 5, fill: "#06b6d4", strokeWidth: 0 }}
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
              Everything you need
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
              One platform. Every metric.
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
              {APP_NAME} brings together revenue intelligence, user analytics, and growth forecasting so your team can move faster with confidence.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  variants={fadeInUp}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 backdrop-blur-sm hover:border-slate-600/60 transition-all duration-300"
                >
                  <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${feat.color} shadow-lg ${feat.glow}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feat.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Learn more <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Dashboard Preview / Split ── */}
      <section className="py-20 sm:py-28 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left copy */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInLeft}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Live dashboard</p>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white leading-tight">
                Your metrics, beautifully organized
              </h2>
              <p className="mt-4 text-slate-400 text-lg leading-relaxed">
                Every chart, table, and KPI card updates in real time. Customize your layout, pin the metrics that matter, and share read-only views with stakeholders in seconds.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Drag-and-drop dashboard builder",
                  "Custom date ranges & comparisons",
                  "One-click PDF & CSV exports",
                  "Embeddable charts for your docs",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                      <Check className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/dashboard">
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 cursor-pointer"
                  >
                    Open dashboard
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </Link>
              </div>
            </motion.div>

            {/* Right chart card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInRight}
              className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 shadow-2xl shadow-black/30"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-white mt-0.5">$97,400</p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <ArrowUp className="h-3 w-3" />
                  +18.4%
                </span>
              </div>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={heroChartData.slice(6)} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis
                      tick={{ fill: "#64748b", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { label: "New MRR", value: "$12,400" },
                  { label: "Expansion", value: "$8,200" },
                  { label: "Churned", value: "-$1,800" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-slate-800/50 px-3 py-2.5 text-center">
                    <p className="text-xs text-slate-500">{item.label}</p>
                    <p className={`mt-0.5 text-sm font-bold ${item.value.startsWith("-") ? "text-rose-400" : "text-white"}`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
              Loved by SaaS teams
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              Trusted by 1,200+ companies
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 backdrop-blur-sm"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover border border-slate-700"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=6366f1&color=fff`;
                    }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Integrations ── */}
      <section className="py-16 sm:py-20 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInUp}
            className="text-center mb-10"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Integrations</p>
            <h2 className="text-2xl font-bold text-white">Connects to your existing stack</h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {integrations.map((intg) => (
              <motion.div
                key={intg.name}
                variants={scaleIn}
                whileHover={{ scale: 1.08, y: -2 }}
                className="flex items-center gap-2.5 rounded-xl border border-slate-700/50 bg-slate-800/50 px-5 py-3 text-sm font-semibold text-slate-300 hover:border-indigo-500/30 hover:text-white transition-all duration-200"
              >
                <img
                  src={intg.logo}
                  alt={intg.name}
                  className="h-5 w-5 rounded object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                {intg.name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
              Pricing
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              Simple, transparent pricing
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
              Start free for 14 days. No credit card required. Upgrade when you're ready to scale.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className={`relative rounded-2xl border p-7 flex flex-col ${
                  plan.highlighted
                    ? "border-indigo-500/50 bg-gradient-to-b from-indigo-500/10 to-slate-900/80 shadow-xl shadow-indigo-500/10"
                    : "border-slate-700/50 bg-slate-900/60"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-1 text-xs font-bold text-white shadow-lg shadow-indigo-500/30">
                      Most popular
                    </span>
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{plan.description}</p>
                </div>
                <div className="mb-6 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  {plan.period && <span className="text-slate-400 mb-1">{plan.period}</span>}
                </div>
                <ul className="mb-8 space-y-2.5 flex-1">
                  {(plan.features ?? []).map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <span className="flex h-4.5 h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                        : "border border-slate-600/60 bg-slate-800/50 text-slate-300 hover:text-white hover:border-slate-500"
                    }`}
                  >
                    {plan.cta}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={scaleIn}
            className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-600/20 via-violet-600/15 to-slate-900/80 p-10 sm:p-14 text-center shadow-2xl shadow-indigo-500/10"
          >
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-indigo-600/15 blur-[80px]" />
            </div>
            <motion.div variants={fadeInUp}>
              <Activity className="mx-auto mb-4 h-10 w-10 text-indigo-400" />
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
                Ready to see your data clearly?
              </h2>
              <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
                Join 1,200+ SaaS teams using {APP_NAME} to track growth, reduce churn, and make faster decisions.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/dashboard">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow duration-300 cursor-pointer"
                  >
                    Start free trial
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </Link>
                <Link href="/analytics">
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-600/60 bg-slate-800/40 px-8 py-3.5 text-sm font-semibold text-slate-300 hover:text-white transition-all duration-200 cursor-pointer"
                  >
                    Explore analytics
                    <ChevronRight className="h-4 w-4" />
                  </motion.span>
                </Link>
              </div>
              <p className="mt-5 text-xs text-slate-500">14-day free trial · No credit card · Cancel anytime</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}