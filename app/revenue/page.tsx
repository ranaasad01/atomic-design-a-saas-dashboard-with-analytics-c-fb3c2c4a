"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users, BarChart2, RefreshCw } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const kpiCards = [
  {
    id: "gross-revenue",
    label: "Gross Revenue",
    value: 284750,
    prefix: "$",
    change: 18.4,
    changeLabel: "vs last month",
    icon: DollarSign,
    color: "#6366f1",
    bg: "from-indigo-500/20 to-indigo-600/5",
  },
  {
    id: "net-revenue",
    label: "Net Revenue",
    value: 261320,
    prefix: "$",
    change: 15.2,
    changeLabel: "vs last month",
    icon: TrendingUp,
    color: "#10b981",
    bg: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    id: "arr",
    label: "Annual Recurring Revenue",
    value: 3137040,
    prefix: "$",
    change: 22.7,
    changeLabel: "vs last year",
    icon: BarChart2,
    color: "#8b5cf6",
    bg: "from-violet-500/20 to-violet-600/5",
  },
  {
    id: "arpu",
    label: "Avg Revenue Per User",
    value: 47.8,
    prefix: "$",
    change: -2.1,
    changeLabel: "vs last month",
    icon: Users,
    color: "#f59e0b",
    bg: "from-amber-500/20 to-amber-600/5",
  },
];

const mrrTrendData = [
  { month: "Jan", mrr: 198000, target: 195000 },
  { month: "Feb", mrr: 210500, target: 205000 },
  { month: "Mar", mrr: 223400, target: 215000 },
  { month: "Apr", mrr: 231800, target: 225000 },
  { month: "May", mrr: 245600, target: 238000 },
  { month: "Jun", mrr: 252100, target: 248000 },
  { month: "Jul", mrr: 261300, target: 258000 },
  { month: "Aug", mrr: 269800, target: 265000 },
  { month: "Sep", mrr: 274500, target: 272000 },
  { month: "Oct", mrr: 278900, target: 276000 },
  { month: "Nov", mrr: 281400, target: 280000 },
  { month: "Dec", mrr: 284750, target: 284000 },
];

const revenueByPlanData = [
  { plan: "Starter", revenue: 38200, users: 812 },
  { plan: "Pro", revenue: 124600, users: 534 },
  { plan: "Enterprise", revenue: 121950, users: 87 },
];

const refundsData = [
  { month: "Jan", refunds: 3200, failed: 1800 },
  { month: "Feb", refunds: 2900, failed: 2100 },
  { month: "Mar", refunds: 3500, failed: 1600 },
  { month: "Apr", refunds: 2700, failed: 1900 },
  { month: "May", refunds: 3100, failed: 2300 },
  { month: "Jun", refunds: 2400, failed: 1700 },
  { month: "Jul", refunds: 2800, failed: 2000 },
  { month: "Aug", refunds: 2200, failed: 1500 },
  { month: "Sep", refunds: 2600, failed: 1800 },
  { month: "Oct", refunds: 2100, failed: 1400 },
  { month: "Nov", refunds: 1900, failed: 1300 },
  { month: "Dec", refunds: 2300, failed: 1600 },
];

const planBreakdown = [
  {
    plan: "Enterprise",
    revenue: 121950,
    users: 87,
    avgRevenue: 1402,
    growth: 34.2,
    color: "#6366f1",
  },
  {
    plan: "Pro",
    revenue: 124600,
    users: 534,
    avgRevenue: 233,
    growth: 18.7,
    color: "#8b5cf6",
  },
  {
    plan: "Starter",
    revenue: 38200,
    users: 812,
    avgRevenue: 47,
    growth: 5.3,
    color: "#06b6d4",
  },
];

const totalRevenue = planBreakdown.reduce((sum, p) => sum + p.revenue, 0);

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="font-semibold text-white">
            ${(entry.value ?? 0).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default function RevenuePage() {
  const [activeTab, setActiveTab] = useState<"monthly" | "quarterly" | "annual">("monthly");

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* ── Page Header ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <motion.div variants={fadeInUp}>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Revenue Overview
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Track gross revenue, MRR trends, and plan-level performance.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex items-center gap-2">
            {(["monthly", "quarterly", "annual"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold capitalize transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-slate-800/60 text-slate-400 hover:bg-slate-700/60 hover:text-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            return (
              <motion.div
                key={card.id}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6 backdrop-blur-sm"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.bg} opacity-60`}
                />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${card.color}22` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: card.color }} />
                    </div>
                    <span
                      className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        isPositive
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-red-500/15 text-red-400"
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {isPositive ? "+" : ""}
                      {card.change}%
                    </span>
                  </div>
                  <p className="mt-4 text-2xl font-bold text-white">
                    {card.prefix ?? ""}
                    {(card.value ?? 0).toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-300">{card.label}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{card.changeLabel}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── MRR Trend Chart ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6 backdrop-blur-sm"
        >
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Monthly Recurring Revenue</h2>
              <p className="text-sm text-slate-400">MRR vs target over the past 12 months</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-500" />
                Actual MRR
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-violet-400/60" />
                Target
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={mrrTrendData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="target"
                stroke="#8b5cf6"
                strokeWidth={2}
                strokeDasharray="5 4"
                fill="url(#targetGrad)"
                dot={false}
                name="target"
              />
              <Area
                type="monotone"
                dataKey="mrr"
                stroke="#6366f1"
                strokeWidth={2.5}
                fill="url(#mrrGrad)"
                dot={false}
                name="mrr"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Revenue by Plan + Refunds Row ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Revenue by Plan Bar Chart */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6 backdrop-blur-sm"
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">Revenue by Plan Tier</h2>
              <p className="text-sm text-slate-400">Monthly revenue contribution per plan</p>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={revenueByPlanData}
                margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                barSize={40}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="plan"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="revenue"
                  name="revenue"
                  radius={[6, 6, 0, 0]}
                  fill="url(#barGrad)"
                >
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Refunds & Failed Payments Line Chart */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6 backdrop-blur-sm"
          >
            <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Refunds & Failed Payments</h2>
                <p className="text-sm text-slate-400">Monthly trend over the past year</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400" />
                  Refunds
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-400" />
                  Failed
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart
                data={refundsData}
                margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="refunds"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={{ fill: "#f59e0b", r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                  name="refunds"
                />
                <Line
                  type="monotone"
                  dataKey="failed"
                  stroke="#ef4444"
                  strokeWidth={2.5}
                  dot={{ fill: "#ef4444", r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                  name="failed"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* ── Revenue Breakdown Table ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6 backdrop-blur-sm"
        >
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Revenue Breakdown by Plan</h2>
              <p className="text-sm text-slate-400">
                Contribution, user count, and ARPU per tier
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-700/50 bg-slate-800/40 px-3 py-1.5">
              <RefreshCw className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-xs text-slate-400">Updated just now</span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-slate-800/60">
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Plan
                  </th>
                  <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Revenue
                  </th>
                  <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Users
                  </th>
                  <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    ARPU
                  </th>
                  <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Growth
                  </th>
                  <th className="pb-3 pl-6 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Share
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {planBreakdown.map((row) => {
                  const pct = totalRevenue > 0 ? (row.revenue / totalRevenue) * 100 : 0;
                  const isPositive = row.growth >= 0;
                  return (
                    <motion.tr
                      key={row.plan}
                      whileHover={{ backgroundColor: "rgba(99,102,241,0.04)" }}
                      className="transition-colors duration-150"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span
                            className="inline-block h-3 w-3 rounded-full"
                            style={{ backgroundColor: row.color }}
                          />
                          <span className="font-semibold text-white">{row.plan}</span>
                        </div>
                      </td>
                      <td className="py-4 text-right font-semibold text-white">
                        ${(row.revenue ?? 0).toLocaleString()}
                      </td>
                      <td className="py-4 text-right text-slate-300">
                        {(row.users ?? 0).toLocaleString()}
                      </td>
                      <td className="py-4 text-right text-slate-300">
                        ${(row.avgRevenue ?? 0).toLocaleString()}
                      </td>
                      <td className="py-4 text-right">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                            isPositive
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-red-500/15 text-red-400"
                          }`}
                        >
                          {isPositive ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {isPositive ? "+" : ""}
                          {(row.growth ?? 0).toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-800">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${pct.toFixed(1)}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: row.color }}
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-400">
                            {pct.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t border-slate-700/60">
                  <td className="pt-4 font-semibold text-slate-300">Total</td>
                  <td className="pt-4 text-right font-bold text-white">
                    ${(totalRevenue ?? 0).toLocaleString()}
                  </td>
                  <td className="pt-4 text-right font-semibold text-slate-300">
                    {planBreakdown.reduce((s, r) => s + (r.users ?? 0), 0).toLocaleString()}
                  </td>
                  <td className="pt-4 text-right text-slate-500">—</td>
                  <td className="pt-4 text-right text-slate-500">—</td>
                  <td className="pt-4 pl-6 text-xs font-medium text-slate-400">100%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </motion.div>

        {/* ── Bottom Summary Cards ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {[
            {
              label: "Total Refunds (Dec)",
              value: "$2,300",
              sub: "0.81% of gross revenue",
              color: "text-amber-400",
              bg: "bg-amber-500/10",
              border: "border-amber-500/20",
            },
            {
              label: "Failed Payments (Dec)",
              value: "$1,600",
              sub: "0.56% of gross revenue",
              color: "text-red-400",
              bg: "bg-red-500/10",
              border: "border-red-500/20",
            },
            {
              label: "Net Revenue Margin",
              value: "91.8%",
              sub: "After refunds & failures",
              color: "text-emerald-400",
              bg: "bg-emerald-500/10",
              border: "border-emerald-500/20",
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={fadeInUp}
              whileHover={{ y: -3 }}
              className={`rounded-2xl border ${item.border} ${item.bg} p-5`}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {item.label}
              </p>
              <p className={`mt-2 text-2xl font-bold ${item.color}`}>{item.value}</p>
              <p className="mt-1 text-xs text-slate-500">{item.sub}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </main>
  );
}