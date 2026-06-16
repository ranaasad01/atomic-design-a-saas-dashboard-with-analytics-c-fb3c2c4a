"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Globe, ArrowUpRight, BarChart2, PieChart as PieChartIcon, Activity } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ── Mock Data ────────────────────────────────────────────────────────────────

const weeklySignups = [
  { week: "W1", signups: 142 },
  { week: "W2", signups: 189 },
  { week: "W3", signups: 165 },
  { week: "W4", signups: 210 },
  { week: "W5", signups: 198 },
  { week: "W6", signups: 234 },
  { week: "W7", signups: 267 },
  { week: "W8", signups: 245 },
  { week: "W9", signups: 289 },
  { week: "W10", signups: 312 },
  { week: "W11", signups: 298 },
  { week: "W12", signups: 341 },
];

const trafficSources = [
  { name: "Organic", value: 38, color: "#6366f1" },
  { name: "Paid", value: 24, color: "#8b5cf6" },
  { name: "Referral", value: 18, color: "#06b6d4" },
  { name: "Direct", value: 13, color: "#10b981" },
  { name: "Social", value: 7, color: "#f59e0b" },
];

const revenueComparison = [
  { month: "Jan", current: 28400, previous: 21200 },
  { month: "Feb", current: 31200, previous: 24800 },
  { month: "Mar", current: 29800, previous: 26100 },
  { month: "Apr", current: 34500, previous: 27300 },
  { month: "May", current: 38200, previous: 29800 },
  { month: "Jun", current: 41600, previous: 31200 },
  { month: "Jul", current: 39800, previous: 33400 },
  { month: "Aug", current: 44200, previous: 35600 },
  { month: "Sep", current: 47800, previous: 37200 },
  { month: "Oct", current: 51300, previous: 39800 },
  { month: "Nov", current: 49600, previous: 41200 },
  { month: "Dec", current: 54800, previous: 43600 },
];

const summaryStats = [
  {
    id: "total-signups",
    label: "Total Signups (12w)",
    value: "2,890",
    change: 18.4,
    icon: Users,
    color: "indigo",
  },
  {
    id: "top-source",
    label: "Top Traffic Source",
    value: "Organic",
    change: 5.2,
    icon: Globe,
    color: "violet",
  },
  {
    id: "current-revenue",
    label: "Current Period Rev",
    value: "$54,800",
    change: 32.8,
    icon: DollarSign,
    color: "cyan",
  },
  {
    id: "revenue-growth",
    label: "YoY Revenue Growth",
    value: "+32.8%",
    change: 32.8,
    icon: TrendingUp,
    color: "emerald",
  },
];

const signupStats = [
  { label: "Peak Week", value: "W12 — 341 signups" },
  { label: "Avg / Week", value: "240.8" },
  { label: "Growth (W1→W12)", value: "+140%" },
];

const trafficStats = [
  { label: "Largest Source", value: "Organic (38%)" },
  { label: "Paid Share", value: "24%" },
  { label: "Social Share", value: "7%" },
];

const revenueStats = [
  { label: "Current YTD", value: "$491,200" },
  { label: "Previous YTD", value: "$370,200" },
  { label: "YoY Growth", value: "+32.7%" },
];

// ── Custom Tooltip Components ────────────────────────────────────────────────

function SignupTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="text-xs font-semibold text-slate-400 mb-1">{label ?? ""}</p>
      <p className="text-sm font-bold text-indigo-300">
        {(payload[0]?.value ?? 0).toLocaleString()} signups
      </p>
    </div>
  );
}

function RevTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900/95 px-4 py-3 shadow-2xl backdrop-blur-sm min-w-[160px]">
      <p className="text-xs font-semibold text-slate-400 mb-2">{label ?? ""}</p>
      {(payload ?? []).map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-4 mb-1">
          <span className="flex items-center gap-1.5 text-xs text-slate-300">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: entry.color }} />
            {entry.name}
          </span>
          <span className="text-xs font-bold" style={{ color: entry.color }}>
            ${(entry.value ?? 0).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

function PieTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number; payload: { color: string } }[] }) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0];
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="text-xs font-semibold text-slate-400 mb-1">{item?.name ?? ""}</p>
      <p className="text-sm font-bold" style={{ color: item?.payload?.color ?? "#6366f1" }}>
        {(item?.value ?? 0)}%
      </p>
    </div>
  );
}

// ── Color helpers ────────────────────────────────────────────────────────────

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  indigo: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    border: "border-indigo-500/20",
    glow: "shadow-indigo-500/20",
  },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    border: "border-violet-500/20",
    glow: "shadow-violet-500/20",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    border: "border-cyan-500/20",
    glow: "shadow-cyan-500/20",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/20",
  },
};

// ── Stat Chip ────────────────────────────────────────────────────────────────

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-lg border border-slate-700/50 bg-slate-800/40 px-3 py-2">
      <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{label}</span>
      <span className="text-sm font-semibold text-slate-200">{value}</span>
    </div>
  );
}

// ── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  iconColor,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  iconColor: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconColor}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <h2 className="text-base font-semibold text-white">{title}</h2>
        <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

        {/* ── Page Header ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-10"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
              <Activity className="h-3 w-3" />
              Live Analytics
            </span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
          >
            Analytics Overview
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl"
          >
            Deep-dive into user acquisition, traffic sources, and revenue trends. All data reflects the last 12 weeks and current fiscal year.
          </motion.p>
        </motion.div>

        {/* ── Summary KPI Cards ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {summaryStats.map((stat) => {
            const c = colorMap[stat.color] ?? colorMap.indigo;
            const Icon = stat.icon;
            const isPositive = stat.change >= 0;
            return (
              <motion.div
                key={stat.id}
                variants={scaleIn}
                whileHover={{ y: -3, scale: 1.02 }}
                className={`relative overflow-hidden rounded-2xl border ${c.border} bg-slate-900/60 p-5 shadow-lg ${c.glow} backdrop-blur-sm`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${c.bg}`}>
                    <Icon className={`h-4 w-4 ${c.text}`} />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                      isPositive
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {Math.abs(stat.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
                {/* Decorative glow */}
                <div className={`absolute -right-4 -top-4 h-20 w-20 rounded-full ${c.bg} blur-2xl opacity-60`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Row 1: Bar Chart (Signups) + Pie Chart (Traffic) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">

          {/* Bar Chart — Weekly Signups */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="lg:col-span-3 rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm"
          >
            <SectionHeader
              icon={BarChart2}
              title="Weekly User Signups"
              subtitle="New user registrations over the last 12 weeks"
              iconColor="bg-indigo-500/10 text-indigo-400"
            />

            {/* Stat chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {signupStats.map((s) => (
                <StatChip key={s.label} label={s.label} value={s.value} />
              ))}
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={weeklySignups} barSize={22} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="week"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<SignupTooltip />} cursor={{ fill: "rgba(99,102,241,0.07)" }} />
                <Bar dataKey="signups" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie / Donut Chart — Traffic Sources */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="lg:col-span-2 rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm"
          >
            <SectionHeader
              icon={PieChartIcon}
              title="Traffic Sources"
              subtitle="Breakdown of acquisition channels"
              iconColor="bg-violet-500/10 text-violet-400"
            />

            {/* Stat chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {trafficStats.map((s) => (
                <StatChip key={s.label} label={s.label} value={s.value} />
              ))}
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  stroke="none"
                >
                  {trafficSources.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      opacity={activeIndex === null || activeIndex === index ? 1 : 0.45}
                      style={{ cursor: "pointer", transition: "opacity 0.2s" }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Custom Legend */}
            <div className="mt-2 space-y-1.5">
              {trafficSources.map((src, i) => (
                <div
                  key={src.name}
                  className="flex items-center justify-between"
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ background: src.color }}
                    />
                    <span className="text-xs text-slate-300">{src.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${src.value}%`, background: src.color }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-300 w-8 text-right">{src.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Row 2: Line Chart — Revenue Comparison ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <SectionHeader
              icon={TrendingUp}
              title="Revenue: Current vs Previous Period"
              subtitle="Monthly revenue comparison — current year vs prior year"
              iconColor="bg-emerald-500/10 text-emerald-400"
            />
            <div className="flex flex-wrap gap-2 shrink-0">
              {revenueStats.map((s) => (
                <StatChip key={s.label} label={s.label} value={s.value} />
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={revenueComparison} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="lineGradCurrent" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="lineGradPrev" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<RevTooltip />} cursor={{ stroke: "#334155", strokeWidth: 1 }} />
              <Legend
                wrapperStyle={{ paddingTop: "16px", fontSize: "12px", color: "#94a3b8" }}
                formatter={(value: string) => (
                  <span style={{ color: "#94a3b8", fontSize: "12px" }}>{value}</span>
                )}
              />
              <Line
                type="monotone"
                dataKey="current"
                name="Current Period"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={{ fill: "#6366f1", r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#6366f1", strokeWidth: 2, stroke: "#1e1b4b" }}
              />
              <Line
                type="monotone"
                dataKey="previous"
                name="Previous Period"
                stroke="#06b6d4"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={{ fill: "#06b6d4", r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#06b6d4", strokeWidth: 2, stroke: "#1e1b4b" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Row 3: Insight Cards ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            {
              id: "insight-1",
              title: "Signup Momentum",
              body: "User signups grew 140% from W1 to W12, with the strongest acceleration in Q4. Week 12 hit an all-time high of 341 new users.",
              badge: "+140%",
              badgeColor: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
              icon: Users,
              iconBg: "bg-indigo-500/10 text-indigo-400",
            },
            {
              id: "insight-2",
              title: "Organic Dominance",
              body: "Organic search drives 38% of all traffic — the highest of any channel. Investing in SEO continues to yield compounding returns.",
              badge: "38% share",
              badgeColor: "text-violet-300 bg-violet-500/10 border-violet-500/20",
              icon: Globe,
              iconBg: "bg-violet-500/10 text-violet-400",
            },
            {
              id: "insight-3",
              title: "Revenue Acceleration",
              body: "Current-period revenue outpaces the prior year by 32.7% on average. December reached $54,800 — a new monthly record.",
              badge: "+32.7% YoY",
              badgeColor: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
              icon: ArrowUpRight,
              iconBg: "bg-emerald-500/10 text-emerald-400",
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                variants={fadeInUp}
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.iconBg}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">{card.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{card.body}</p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </main>
  );
}