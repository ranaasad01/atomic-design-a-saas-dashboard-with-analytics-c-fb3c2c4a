"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, MoreHorizontal, Eye, ShoppingCart, AlertCircle, CheckCircle, Clock, Star, Download, Filter, RefreshCw } from 'lucide-react';
import { BRAND_COLORS } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const kpiCards = [
  {
    id: "mrr",
    label: "Monthly Recurring Revenue",
    value: "$48,295",
    rawValue: 48295,
    change: 12.4,
    changeLabel: "vs last month",
    icon: DollarSign,
    color: "indigo",
    gradient: "from-indigo-500 to-violet-600",
    shadow: "shadow-indigo-500/20",
  },
  {
    id: "users",
    label: "Total Active Users",
    value: "12,847",
    rawValue: 12847,
    change: 8.1,
    changeLabel: "vs last month",
    icon: Users,
    color: "cyan",
    gradient: "from-cyan-500 to-blue-600",
    shadow: "shadow-cyan-500/20",
  },
  {
    id: "churn",
    label: "Churn Rate",
    value: "1.8%",
    rawValue: 1.8,
    change: -0.4,
    changeLabel: "vs last month",
    icon: Activity,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
  },
  {
    id: "arpu",
    label: "Avg Revenue Per User",
    value: "$3.76",
    rawValue: 3.76,
    change: 4.2,
    changeLabel: "vs last month",
    icon: Star,
    color: "amber",
    gradient: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/20",
  },
];

const revenueData = [
  { month: "Jan", revenue: 28400, mrr: 26100, users: 8200 },
  { month: "Feb", revenue: 31200, mrr: 28900, users: 8950 },
  { month: "Mar", revenue: 29800, mrr: 27400, users: 9300 },
  { month: "Apr", revenue: 34500, mrr: 32100, users: 9800 },
  { month: "May", revenue: 38200, mrr: 35600, users: 10400 },
  { month: "Jun", revenue: 36900, mrr: 34200, users: 10900 },
  { month: "Jul", revenue: 41300, mrr: 38700, users: 11200 },
  { month: "Aug", revenue: 43800, mrr: 40900, users: 11700 },
  { month: "Sep", revenue: 40200, mrr: 37800, users: 12100 },
  { month: "Oct", revenue: 45600, mrr: 42300, users: 12400 },
  { month: "Nov", revenue: 47100, mrr: 44200, users: 12700 },
  { month: "Dec", revenue: 48295, mrr: 45800, users: 12847 },
];

const planDistribution = [
  { name: "Starter", value: 4820, color: "#6366f1" },
  { name: "Growth", value: 5340, color: "#8b5cf6" },
  { name: "Pro", value: 1980, color: "#06b6d4" },
  { name: "Enterprise", value: 707, color: "#10b981" },
];

const weeklySignups = [
  { day: "Mon", signups: 142, churned: 12 },
  { day: "Tue", signups: 198, churned: 8 },
  { day: "Wed", signups: 167, churned: 15 },
  { day: "Thu", signups: 224, churned: 10 },
  { day: "Fri", signups: 189, churned: 18 },
  { day: "Sat", signups: 98, churned: 6 },
  { day: "Sun", signups: 76, churned: 4 },
];

const recentTransactions = [
  {
    id: "txn_001",
    customer: "Acme Corp",
    email: "billing@acme.com",
    amount: 1200,
    status: "paid" as const,
    date: "Dec 18, 2024",
    plan: "Enterprise",
  },
  {
    id: "txn_002",
    customer: "Nova Labs",
    email: "finance@novalabs.io",
    amount: 299,
    status: "paid" as const,
    date: "Dec 18, 2024",
    plan: "Pro",
  },
  {
    id: "txn_003",
    customer: "Bright Studio",
    email: "hello@brightstudio.co",
    amount: 99,
    status: "pending" as const,
    date: "Dec 17, 2024",
    plan: "Growth",
  },
  {
    id: "txn_004",
    customer: "Orbit Systems",
    email: "ops@orbitsys.com",
    amount: 599,
    status: "paid" as const,
    date: "Dec 17, 2024",
    plan: "Enterprise",
  },
  {
    id: "txn_005",
    customer: "Pixel Works",
    email: "pay@pixelworks.dev",
    amount: 49,
    status: "failed" as const,
    date: "Dec 16, 2024",
    plan: "Starter",
  },
  {
    id: "txn_006",
    customer: "Cascade AI",
    email: "billing@cascadeai.com",
    amount: 299,
    status: "paid" as const,
    date: "Dec 16, 2024",
    plan: "Pro",
  },
  {
    id: "txn_007",
    customer: "Dune Analytics",
    email: "accounts@dune.io",
    amount: 99,
    status: "pending" as const,
    date: "Dec 15, 2024",
    plan: "Growth",
  },
];

const topPages = [
  { path: "/dashboard", views: 24810, bounce: "18%", duration: "4m 32s" },
  { path: "/analytics", views: 18340, bounce: "22%", duration: "3m 18s" },
  { path: "/revenue", views: 14220, bounce: "15%", duration: "5m 04s" },
  { path: "/users", views: 11890, bounce: "28%", duration: "2m 47s" },
  { path: "/settings", views: 7640, bounce: "34%", duration: "1m 55s" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: "paid" | "pending" | "failed" }) {
  const config = {
    paid: {
      label: "Paid",
      icon: CheckCircle,
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    pending: {
      label: "Pending",
      icon: Clock,
      className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    failed: {
      label: "Failed",
      icon: AlertCircle,
      className: "bg-red-500/10 text-red-400 border-red-500/20",
    },
  };
  const { label, icon: Icon, className } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${className}`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-3 shadow-xl">
      <p className="text-xs font-semibold text-slate-300 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-400 capitalize">{entry.name}:</span>
          <span className="text-white font-medium">
            {entry.name === "users"
              ? (entry.value ?? 0).toLocaleString()
              : `$${(entry.value ?? 0).toLocaleString()}`}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardOverviewPage() {
  const [activeRange, setActiveRange] = useState<"7d" | "30d" | "90d" | "1y">(
    "1y"
  );
  const [activeChart, setActiveChart] = useState<"revenue" | "users">(
    "revenue"
  );

  const ranges: Array<"7d" | "30d" | "90d" | "1y"> = ["7d", "30d", "90d", "1y"];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ── Page Header ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <motion.div variants={fadeInUp}>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Dashboard Overview
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Welcome back — here&apos;s what&apos;s happening with Pulse Analytics today.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-700/60 bg-slate-800/50 text-sm text-slate-300 hover:text-white hover:border-slate-600 transition-all"
            >
              <Filter className="h-4 w-4" />
              Filter
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-700/60 bg-slate-800/50 text-sm text-slate-300 hover:text-white hover:border-slate-600 transition-all"
            >
              <Download className="h-4 w-4" />
              Export
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, rotate: 180 }}
              whileTap={{ scale: 0.96 }}
              transition={{ rotate: { duration: 0.4 } }}
              className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-slate-700/60 bg-slate-800/50 text-slate-300 hover:text-white hover:border-slate-600 transition-all"
            >
              <RefreshCw className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            const TrendIcon = isPositive ? TrendingUp : TrendingDown;
            const trendColor = card.id === "churn"
              ? isPositive ? "text-red-400" : "text-emerald-400"
              : isPositive ? "text-emerald-400" : "text-red-400";

            return (
              <motion.div
                key={card.id}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.01 }}
                className="relative overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-5 group cursor-default"
              >
                {/* Glow */}
                <div
                  className={`absolute -top-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br ${card.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}
                />
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg ${card.shadow}`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium ${trendColor}`}
                  >
                    <TrendIcon className="h-3.5 w-3.5" />
                    {Math.abs(card.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-white tracking-tight">
                  {card.value}
                </p>
                <p className="mt-1 text-xs text-slate-400">{card.label}</p>
                <p className="mt-0.5 text-xs text-slate-600">{card.changeLabel}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Revenue Chart + Pie ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Area / Bar Chart */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="lg:col-span-2 rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Revenue &amp; Growth
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Monthly revenue vs MRR trend
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Chart type toggle */}
                <div className="flex rounded-lg border border-slate-700/60 overflow-hidden">
                  {(["revenue", "users"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveChart(type)}
                      className={`px-3 py-1.5 text-xs font-medium transition-all capitalize ${
                        activeChart === type
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-800/50 text-slate-400 hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {/* Range selector */}
                <div className="flex rounded-lg border border-slate-700/60 overflow-hidden">
                  {ranges.map((r) => (
                    <button
                      key={r}
                      onClick={() => setActiveRange(r)}
                      className={`px-2.5 py-1.5 text-xs font-medium transition-all ${
                        activeRange === r
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-800/50 text-slate-400 hover:text-white"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart
                data={revenueData}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradMrr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
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
                  tickFormatter={(v: number) =>
                    activeChart === "users"
                      ? `${(v / 1000).toFixed(0)}k`
                      : `$${(v / 1000).toFixed(0)}k`
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                {activeChart === "revenue" ? (
                  <>
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6366f1"
                      strokeWidth={2}
                      fill="url(#gradRevenue)"
                      dot={false}
                      activeDot={{ r: 5, fill: "#6366f1" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="mrr"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      fill="url(#gradMrr)"
                      dot={false}
                      activeDot={{ r: 5, fill: "#8b5cf6" }}
                    />
                  </>
                ) : (
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fill="url(#gradUsers)"
                    dot={false}
                    activeDot={{ r: 5, fill: "#06b6d4" }}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart — Plan Distribution */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-5"
          >
            <h2 className="text-base font-semibold text-white mb-1">
              Plan Distribution
            </h2>
            <p className="text-xs text-slate-400 mb-4">Users by subscription tier</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {planDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#f1f5f9",
                  }}
                  formatter={(value: number) => [
                    value.toLocaleString(),
                    "Users",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-3 space-y-2">
              {planDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-slate-400">{item.name}</span>
                  </div>
                  <span className="text-xs font-medium text-white">
                    {item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Weekly Signups Bar Chart + Top Pages ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Bar Chart */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-5"
          >
            <h2 className="text-base font-semibold text-white mb-1">
              Weekly Signups vs Churn
            </h2>
            <p className="text-xs text-slate-400 mb-5">
              New users acquired vs churned this week
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={weeklySignups}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                barGap={4}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#f1f5f9",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }}
                />
                <Bar
                  dataKey="signups"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  name="Signups"
                />
                <Bar
                  dataKey="churned"
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                  name="Churned"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Pages */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold text-white">Top Pages</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Most visited routes this month
                </p>
              </div>
              <Eye className="h-4 w-4 text-slate-500" />
            </div>
            <div className="space-y-1">
              <div className="grid grid-cols-4 gap-2 px-2 pb-2 border-b border-slate-800/60">
                <span className="text-xs font-medium text-slate-500 col-span-2">
                  Path
                </span>
                <span className="text-xs font-medium text-slate-500 text-right">
                  Views
                </span>
                <span className="text-xs font-medium text-slate-500 text-right">
                  Bounce
                </span>
              </div>
              {(topPages ?? []).map((page, i) => (
                <motion.div
                  key={page.path}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  className="grid grid-cols-4 gap-2 px-2 py-2.5 rounded-lg hover:bg-slate-800/40 transition-colors group"
                >
                  <div className="col-span-2 flex items-center gap-2">
                    <span className="text-xs font-mono text-indigo-400 truncate">
                      {page.path}
                    </span>
                  </div>
                  <span className="text-xs text-slate-300 text-right font-medium">
                    {(page.views ?? 0).toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 text-right">
                    {page.bounce}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Recent Transactions ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <h2 className="text-base font-semibold text-white">
                Recent Transactions
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Latest billing activity across all plans
              </p>
            </div>
            <Link href="/revenue">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-xs font-medium text-indigo-300 hover:bg-indigo-600/30 transition-all cursor-pointer"
              >
                View all
                <ArrowUpRight className="h-3.5 w-3.5" />
              </motion.span>
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto -mx-1">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-800/60">
                  <th className="text-left text-xs font-medium text-slate-500 pb-3 px-2">
                    Customer
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 pb-3 px-2">
                    Plan
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 pb-3 px-2">
                    Date
                  </th>
                  <th className="text-right text-xs font-medium text-slate-500 pb-3 px-2">
                    Amount
                  </th>
                  <th className="text-center text-xs font-medium text-slate-500 pb-3 px-2">
                    Status
                  </th>
                  <th className="text-right text-xs font-medium text-slate-500 pb-3 px-2">
                    &nbsp;
                  </th>
                </tr>
              </thead>
              <tbody>
                {(recentTransactions ?? []).map((tx, i) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="border-b border-slate-800/40 hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="py-3 px-2">
                      <div>
                        <p className="text-sm font-medium text-white">
                          {tx.customer ?? "—"}
                        </p>
                        <p className="text-xs text-slate-500">{tx.email ?? ""}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-xs font-medium text-slate-300 bg-slate-800/60 px-2 py-0.5 rounded-md">
                        {tx.plan ?? "—"}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-xs text-slate-400">
                      {tx.date ?? "—"}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span className="text-sm font-semibold text-white">
                        ${(tx.amount ?? 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="py-3 px-2 text-right">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-slate-700/60 text-slate-400 hover:text-white"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ── Quick Actions ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            {
              href: "/analytics",
              icon: Activity,
              label: "Deep Analytics",
              desc: "Funnel, cohort, and retention analysis",
              gradient: "from-indigo-500 to-violet-600",
              shadow: "shadow-indigo-500/20",
            },
            {
              href: "/users",
              icon: Users,
              label: "User Management",
              desc: "Browse, segment, and manage all users",
              gradient: "from-cyan-500 to-blue-600",
              shadow: "shadow-cyan-500/20",
            },
            {
              href: "/revenue",
              icon: ShoppingCart,
              label: "Revenue Reports",
              desc: "MRR, ARR, invoices, and billing history",
              gradient: "from-emerald-500 to-teal-600",
              shadow: "shadow-emerald-500/20",
            },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <motion.div key={action.href} variants={scaleIn}>
                <Link href={action.href}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-5 cursor-pointer group"
                  >
                    <div
                      className={`absolute -top-4 -right-4 h-20 w-20 rounded-full bg-gradient-to-br ${action.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}
                    />
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${action.gradient} shadow-lg ${action.shadow} mb-4`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-white mb-1">
                      {action.label}
                    </p>
                    <p className="text-xs text-slate-400">{action.desc}</p>
                    <ArrowUpRight className="absolute bottom-4 right-4 h-4 w-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </main>
  );
}