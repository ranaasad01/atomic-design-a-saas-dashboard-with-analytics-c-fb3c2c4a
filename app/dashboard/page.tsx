"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, MoreHorizontal, CheckCircle, Clock, XCircle, Filter, Download } from 'lucide-react';
import { BRAND_COLORS } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
} from "@/lib/motion";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const kpiCards = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "$284,520",
    rawValue: 284520,
    change: 12.4,
    changeLabel: "vs last month",
    icon: DollarSign,
    color: "indigo",
    gradient: "from-indigo-500 to-indigo-600",
    bgGlow: "shadow-indigo-500/20",
  },
  {
    id: "users",
    label: "Active Users",
    value: "18,340",
    rawValue: 18340,
    change: 8.1,
    changeLabel: "vs last month",
    icon: Users,
    color: "violet",
    gradient: "from-violet-500 to-violet-600",
    bgGlow: "shadow-violet-500/20",
  },
  {
    id: "churn",
    label: "Churn Rate",
    value: "1.84%",
    rawValue: 1.84,
    change: -0.3,
    changeLabel: "vs last month",
    icon: Activity,
    color: "emerald",
    gradient: "from-emerald-500 to-emerald-600",
    bgGlow: "shadow-emerald-500/20",
  },
  {
    id: "mrr",
    label: "MRR",
    value: "$52,180",
    rawValue: 52180,
    change: 6.7,
    changeLabel: "vs last month",
    icon: TrendingUp,
    color: "cyan",
    gradient: "from-cyan-500 to-cyan-600",
    bgGlow: "shadow-cyan-500/20",
  },
];

const activeUsersData = [
  { day: "Jun 1", users: 12400 },
  { day: "Jun 3", users: 13100 },
  { day: "Jun 5", users: 12800 },
  { day: "Jun 7", users: 14200 },
  { day: "Jun 9", users: 13900 },
  { day: "Jun 11", users: 15100 },
  { day: "Jun 13", users: 14700 },
  { day: "Jun 15", users: 16200 },
  { day: "Jun 17", users: 15800 },
  { day: "Jun 19", users: 17100 },
  { day: "Jun 21", users: 16500 },
  { day: "Jun 23", users: 17800 },
  { day: "Jun 25", users: 17200 },
  { day: "Jun 27", users: 18100 },
  { day: "Jun 29", users: 18340 },
];

const mrrData = [
  { month: "Jan", mrr: 38200 },
  { month: "Feb", mrr: 40100 },
  { month: "Mar", mrr: 41800 },
  { month: "Apr", mrr: 43500 },
  { month: "May", mrr: 44900 },
  { month: "Jun", mrr: 46200 },
  { month: "Jul", mrr: 47100 },
  { month: "Aug", mrr: 48600 },
  { month: "Sep", mrr: 49800 },
  { month: "Oct", mrr: 50400 },
  { month: "Nov", mrr: 51200 },
  { month: "Dec", mrr: 52180 },
];

const transactions = [
  {
    id: "txn_001",
    customer: "Sophia Hartwell",
    email: "sophia@hartwell.io",
    amount: 299,
    status: "paid" as const,
    date: "Dec 28, 2024",
    plan: "Pro",
    avatar: "SH",
    avatarColor: "from-indigo-500 to-violet-500",
  },
  {
    id: "txn_002",
    customer: "Marcus Chen",
    email: "m.chen@techflow.com",
    amount: 99,
    status: "paid" as const,
    date: "Dec 27, 2024",
    plan: "Starter",
    avatar: "MC",
    avatarColor: "from-cyan-500 to-blue-500",
  },
  {
    id: "txn_003",
    customer: "Priya Nair",
    email: "priya@nairventures.in",
    amount: 599,
    status: "pending" as const,
    date: "Dec 27, 2024",
    plan: "Enterprise",
    avatar: "PN",
    avatarColor: "from-violet-500 to-pink-500",
  },
  {
    id: "txn_004",
    customer: "James Okafor",
    email: "james.o@buildfast.ng",
    amount: 299,
    status: "paid" as const,
    date: "Dec 26, 2024",
    plan: "Pro",
    avatar: "JO",
    avatarColor: "from-emerald-500 to-teal-500",
  },
  {
    id: "txn_005",
    customer: "Elena Vasquez",
    email: "elena@vasquez.mx",
    amount: 99,
    status: "failed" as const,
    date: "Dec 26, 2024",
    plan: "Starter",
    avatar: "EV",
    avatarColor: "from-rose-500 to-orange-500",
  },
  {
    id: "txn_006",
    customer: "Liam Fitzgerald",
    email: "liam@fitzco.ie",
    amount: 599,
    status: "paid" as const,
    date: "Dec 25, 2024",
    plan: "Enterprise",
    avatar: "LF",
    avatarColor: "from-amber-500 to-yellow-500",
  },
  {
    id: "txn_007",
    customer: "Aisha Kamara",
    email: "aisha.k@luminary.co",
    amount: 299,
    status: "pending" as const,
    date: "Dec 25, 2024",
    plan: "Pro",
    avatar: "AK",
    avatarColor: "from-indigo-400 to-cyan-500",
  },
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
      icon: XCircle,
      className: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    },
  };
  const { label, icon: Icon, className } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${className}`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

const CustomTooltipArea = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        <p className="text-sm font-semibold text-indigo-300">
          {(payload[0]?.value ?? 0).toLocaleString()} users
        </p>
      </div>
    );
  }
  return null;
};

const CustomTooltipLine = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        <p className="text-sm font-semibold text-violet-300">
          ${(payload[0]?.value ?? 0).toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"all" | "paid" | "pending" | "failed">("all");

  const filteredTransactions =
    activeTab === "all"
      ? transactions
      : transactions.filter((t) => t.status === activeTab);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* ── Page Header ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-8"
        >
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Dashboard Overview
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Welcome back — here&apos;s what&apos;s happening with Pulse Analytics today.
              </p>
            </div>
            <motion.div variants={fadeInUp} className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700/60 bg-slate-800/50 text-sm text-slate-300 hover:text-white hover:border-slate-600 transition-all duration-200"
              >
                <Filter className="h-4 w-4" />
                Filter
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all duration-200"
              >
                <Download className="h-4 w-4" />
                Export
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            const isChurn = card.id === "churn";
            const goodChange = isChurn ? !isPositive : isPositive;
            return (
              <motion.div
                key={card.id}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.01 }}
                className="relative overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-6 cursor-default group"
              >
                {/* Glow */}
                <div
                  className={`absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br ${card.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`}
                />
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg ${card.bgGlow}`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                      goodChange
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    {goodChange ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {Math.abs(card.change)}
                    {card.id === "churn" ? "pp" : "%"}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-1">{card.label}</p>
                <p className="text-2xl font-bold text-white tracking-tight">
                  {card.value}
                </p>
                <p className="mt-1 text-xs text-slate-500">{card.changeLabel}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Active Users Area Chart */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">Active Users</h2>
                <p className="text-xs text-slate-400 mt-0.5">Last 30 days trend</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                <TrendingUp className="h-3 w-3" />
                +8.1%
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={activeUsersData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  interval={4}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltipArea />} />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fill="url(#usersGradient)"
                  dot={false}
                  activeDot={{ r: 5, fill: "#6366f1", strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* MRR Line Chart */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">Monthly Recurring Revenue</h2>
                <p className="text-xs text-slate-400 mt-0.5">12-month trajectory</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-full">
                <TrendingUp className="h-3 w-3" />
                +36.6%
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={mrrData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
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
                <Tooltip content={<CustomTooltipLine />} />
                <Line
                  type="monotone"
                  dataKey="mrr"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5, fill: "#8b5cf6", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* ── Transactions Table ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm overflow-hidden"
        >
          {/* Table Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-b border-slate-800/60">
            <div>
              <h2 className="text-base font-semibold text-white">Recent Transactions</h2>
              <p className="text-xs text-slate-400 mt-0.5">Latest billing activity across all plans</p>
            </div>
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-800/50 rounded-lg p-1">
              {(["all", "paid", "pending", "failed"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800/40">
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                    Customer
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">
                    Plan
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">
                    Amount
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">
                    Date
                  </th>
                  <th className="px-4 py-3 w-10" />
                </tr>
              </thead>
              <motion.tbody
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {(filteredTransactions ?? []).map((tx) => (
                  <motion.tr
                    key={tx.id}
                    variants={fadeInUp}
                    whileHover={{ backgroundColor: "rgba(99,102,241,0.04)" }}
                    className="border-b border-slate-800/30 last:border-0 transition-colors duration-150"
                  >
                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${tx.avatarColor} text-xs font-bold text-white shadow-md`}
                        >
                          {tx.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-100">
                            {tx.customer}
                          </p>
                          <p className="text-xs text-slate-500">{tx.email}</p>
                        </div>
                      </div>
                    </td>
                    {/* Plan */}
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/50">
                        {tx.plan}
                      </span>
                    </td>
                    {/* Amount */}
                    <td className="px-4 py-4">
                      <span className="text-sm font-semibold text-white">
                        ${(tx.amount ?? 0).toLocaleString()}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-4 py-4">
                      <StatusBadge status={tx.status} />
                    </td>
                    {/* Date */}
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-sm text-slate-400">{tx.date}</span>
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all duration-150"
                        aria-label="More options"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>

            {filteredTransactions.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center mb-3">
                  <Activity className="h-5 w-5 text-slate-500" />
                </div>
                <p className="text-sm font-medium text-slate-400">No transactions found</p>
                <p className="text-xs text-slate-600 mt-1">Try selecting a different filter</p>
              </div>
            )}
          </div>

          {/* Table Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800/40">
            <p className="text-xs text-slate-500">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
            >
              View all transactions →
            </motion.button>
          </div>
        </motion.div>

      </div>
    </main>
  );
}