"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, UserMinus, Search, ArrowUpDown, ArrowUp, ArrowDown, ChevronDown, Star, Activity } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BRAND_COLORS } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const kpiCards = [
  {
    id: "total",
    label: "Total Users",
    value: "24,891",
    change: 12.4,
    changeLabel: "vs last month",
    icon: Users,
    color: "indigo",
  },
  {
    id: "new",
    label: "New This Month",
    value: "1,284",
    change: 8.7,
    changeLabel: "vs last month",
    icon: UserPlus,
    color: "emerald",
  },
  {
    id: "churned",
    label: "Churned This Month",
    value: "312",
    change: -4.2,
    changeLabel: "vs last month",
    icon: UserMinus,
    color: "rose",
  },
];

const monthlyUserData = [
  { month: "Jan", newUsers: 820, churned: 210 },
  { month: "Feb", newUsers: 940, churned: 195 },
  { month: "Mar", newUsers: 1050, churned: 230 },
  { month: "Apr", newUsers: 980, churned: 280 },
  { month: "May", newUsers: 1120, churned: 260 },
  { month: "Jun", newUsers: 1300, churned: 290 },
  { month: "Jul", newUsers: 1180, churned: 310 },
  { month: "Aug", newUsers: 1420, churned: 275 },
  { month: "Sep", newUsers: 1350, churned: 295 },
  { month: "Oct", newUsers: 1500, churned: 320 },
  { month: "Nov", newUsers: 1390, churned: 305 },
  { month: "Dec", newUsers: 1284, churned: 312 },
];

const growthData = [
  { month: "Jan", totalUsers: 18200 },
  { month: "Feb", totalUsers: 18945 },
  { month: "Mar", totalUsers: 19765 },
  { month: "Apr", totalUsers: 20465 },
  { month: "May", totalUsers: 21325 },
  { month: "Jun", totalUsers: 22335 },
  { month: "Jul", totalUsers: 23205 },
  { month: "Aug", totalUsers: 24350 },
  { month: "Sep", totalUsers: 25405 },
  { month: "Oct", totalUsers: 26585 },
  { month: "Nov", totalUsers: 27670 },
  { month: "Dec", totalUsers: 28642 },
];

type Plan = "Enterprise" | "Pro" | "Starter" | "Free";
type Status = "active" | "inactive" | "trial";

interface UserRow {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  status: Status;
  joined: string;
  mrr: number;
  avatarInitials: string;
  avatarColor: string;
}

const usersData: UserRow[] = [
  { id: "u1", name: "Sophia Hartwell", email: "sophia@hartwell.io", plan: "Enterprise", status: "active", joined: "2023-01-15", mrr: 1200, avatarInitials: "SH", avatarColor: "#6366f1" },
  { id: "u2", name: "Marcus Chen", email: "m.chen@techflow.com", plan: "Pro", status: "active", joined: "2023-03-08", mrr: 299, avatarInitials: "MC", avatarColor: "#8b5cf6" },
  { id: "u3", name: "Priya Nair", email: "priya.nair@cloudbase.dev", plan: "Pro", status: "active", joined: "2023-04-22", mrr: 299, avatarInitials: "PN", avatarColor: "#06b6d4" },
  { id: "u4", name: "James Okafor", email: "james@okafor.co", plan: "Starter", status: "trial", joined: "2024-01-03", mrr: 49, avatarInitials: "JO", avatarColor: "#10b981" },
  { id: "u5", name: "Elena Vasquez", email: "elena.v@nexalab.com", plan: "Enterprise", status: "active", joined: "2022-11-30", mrr: 1200, avatarInitials: "EV", avatarColor: "#f59e0b" },
  { id: "u6", name: "Tom Brinkley", email: "tom@brinkley.dev", plan: "Free", status: "inactive", joined: "2023-07-19", mrr: 0, avatarInitials: "TB", avatarColor: "#ef4444" },
  { id: "u7", name: "Aisha Kamara", email: "aisha@kamara.io", plan: "Pro", status: "active", joined: "2023-06-11", mrr: 299, avatarInitials: "AK", avatarColor: "#6366f1" },
  { id: "u8", name: "Luca Ferretti", email: "luca.ferretti@italytech.eu", plan: "Starter", status: "active", joined: "2023-09-05", mrr: 49, avatarInitials: "LF", avatarColor: "#8b5cf6" },
  { id: "u9", name: "Yuki Tanaka", email: "yuki@tanaka-labs.jp", plan: "Enterprise", status: "active", joined: "2022-08-14", mrr: 1200, avatarInitials: "YT", avatarColor: "#06b6d4" },
  { id: "u10", name: "Chloe Dupont", email: "chloe.dupont@frenchsaas.fr", plan: "Pro", status: "trial", joined: "2024-02-20", mrr: 299, avatarInitials: "CD", avatarColor: "#10b981" },
  { id: "u11", name: "Ravi Sharma", email: "ravi@sharmatech.in", plan: "Starter", status: "active", joined: "2023-10-01", mrr: 49, avatarInitials: "RS", avatarColor: "#f59e0b" },
  { id: "u12", name: "Nina Petrov", email: "nina.petrov@eastdev.ru", plan: "Free", status: "inactive", joined: "2023-12-18", mrr: 0, avatarInitials: "NP", avatarColor: "#ef4444" },
  { id: "u13", name: "Carlos Mendez", email: "carlos@mendezgroup.mx", plan: "Pro", status: "active", joined: "2023-05-27", mrr: 299, avatarInitials: "CM", avatarColor: "#6366f1" },
  { id: "u14", name: "Fatima Al-Hassan", email: "fatima@alhassan.ae", plan: "Enterprise", status: "active", joined: "2022-06-09", mrr: 1200, avatarInitials: "FA", avatarColor: "#8b5cf6" },
  { id: "u15", name: "Oliver Webb", email: "oliver.webb@webcraft.uk", plan: "Starter", status: "trial", joined: "2024-03-01", mrr: 49, avatarInitials: "OW", avatarColor: "#06b6d4" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const planStyles: Record<Plan, string> = {
  Enterprise: "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30",
  Pro: "bg-violet-500/15 text-violet-300 border border-violet-500/30",
  Starter: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30",
  Free: "bg-slate-500/15 text-slate-400 border border-slate-500/30",
};

const statusStyles: Record<Status, string> = {
  active: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  inactive: "bg-rose-500/15 text-rose-400 border border-rose-500/30",
  trial: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
};

const statusDot: Record<Status, string> = {
  active: "bg-emerald-400",
  inactive: "bg-rose-400",
  trial: "bg-amber-400",
};

type SortKey = "name" | "plan" | "status" | "joined" | "mrr";
type SortDir = "asc" | "desc";

const planOrder: Record<Plan, number> = { Enterprise: 4, Pro: 3, Starter: 2, Free: 1 };
const statusOrder: Record<Status, number> = { active: 3, trial: 2, inactive: 1 };

function formatDate(dateStr: string): string {
  const parts = dateStr?.split("-") ?? [];
  if (parts.length < 3) return dateStr ?? "";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[parseInt(parts[1] ?? "1", 10) - 1] ?? "";
  return `${month} ${parts[2]}, ${parts[0]}`;
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="font-semibold text-white">{(entry.value ?? 0).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("mrr");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [planFilter, setPlanFilter] = useState<Plan | "All">("All");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase();
    return (usersData ?? [])
      .filter((u) => {
        const matchSearch =
          !q ||
          (u.name ?? "").toLowerCase().includes(q) ||
          (u.email ?? "").toLowerCase().includes(q);
        const matchPlan = planFilter === "All" || u.plan === planFilter;
        const matchStatus = statusFilter === "All" || u.status === statusFilter;
        return matchSearch && matchPlan && matchStatus;
      })
      .sort((a, b) => {
        let cmp = 0;
        if (sortKey === "name") cmp = (a.name ?? "").localeCompare(b.name ?? "");
        else if (sortKey === "plan") cmp = (planOrder[a.plan] ?? 0) - (planOrder[b.plan] ?? 0);
        else if (sortKey === "status") cmp = (statusOrder[a.status] ?? 0) - (statusOrder[b.status] ?? 0);
        else if (sortKey === "joined") cmp = (a.joined ?? "").localeCompare(b.joined ?? "");
        else if (sortKey === "mrr") cmp = (a.mrr ?? 0) - (b.mrr ?? 0);
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [search, sortKey, sortDir, planFilter, statusFilter]);

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown className="h-3.5 w-3.5 text-slate-600" />;
    return sortDir === "asc"
      ? <ArrowUp className="h-3.5 w-3.5 text-indigo-400" />
      : <ArrowDown className="h-3.5 w-3.5 text-indigo-400" />;
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">

        {/* ── Page Header ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
        >
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">
              User Management
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Users
            </h1>
            <p className="mt-1.5 text-sm text-slate-400">
              Monitor user growth, activity, and revenue contribution across all plans.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow"
            >
              <UserPlus className="h-4 w-4" />
              Invite User
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            const colorMap: Record<string, { bg: string; icon: string; glow: string }> = {
              indigo: { bg: "from-indigo-500/10 to-indigo-600/5", icon: "bg-indigo-500/20 text-indigo-400", glow: "shadow-indigo-500/10" },
              emerald: { bg: "from-emerald-500/10 to-emerald-600/5", icon: "bg-emerald-500/20 text-emerald-400", glow: "shadow-emerald-500/10" },
              rose: { bg: "from-rose-500/10 to-rose-600/5", icon: "bg-rose-500/20 text-rose-400", glow: "shadow-rose-500/10" },
            };
            const colors = colorMap[card.color] ?? colorMap.indigo;
            return (
              <motion.div
                key={card.id}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`relative overflow-hidden rounded-2xl border border-slate-800/60 bg-gradient-to-br ${colors.bg} p-6 shadow-xl ${colors.glow}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {card.label}
                    </p>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white">
                      {card.value}
                    </p>
                    <div className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${isPositive ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"}`}>
                      {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      {Math.abs(card.change)}% {card.changeLabel}
                    </div>
                  </div>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors.icon}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Charts Row ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {/* Bar Chart: New vs Churned */}
          <motion.div
            variants={fadeInUp}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">New vs Churned Users</h2>
                <p className="text-xs text-slate-500 mt-0.5">Monthly acquisition and churn comparison</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10">
                <Activity className="h-4 w-4 text-indigo-400" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthlyUserData} barGap={4} barCategoryGap="28%">
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
                  width={40}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.06)" }} />
                <Legend
                  wrapperStyle={{ fontSize: "12px", color: "#94a3b8", paddingTop: "12px" }}
                  iconType="circle"
                  iconSize={8}
                />
                <Bar dataKey="newUsers" name="New Users" fill={BRAND_COLORS.primary} radius={[4, 4, 0, 0]} />
                <Bar dataKey="churned" name="Churned" fill={BRAND_COLORS.danger} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Area Chart: User Growth */}
          <motion.div
            variants={fadeInUp}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">User Growth</h2>
                <p className="text-xs text-slate-500 mt-0.5">Cumulative total users over the year</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10">
                <Star className="h-4 w-4 text-violet-400" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="userGrowthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={BRAND_COLORS.secondary} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={BRAND_COLORS.secondary} stopOpacity={0} />
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
                  width={48}
                  tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: BRAND_COLORS.secondary, strokeWidth: 1, strokeDasharray: "4 4" }} />
                <Area
                  type="monotone"
                  dataKey="totalUsers"
                  name="Total Users"
                  stroke={BRAND_COLORS.secondary}
                  strokeWidth={2.5}
                  fill="url(#userGrowthGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: BRAND_COLORS.secondary, stroke: "#1e1b4b", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>

        {/* ── Users Table ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeInUp}
          className="rounded-2xl border border-slate-800/60 bg-slate-900/60 shadow-xl backdrop-blur-sm overflow-hidden"
        >
          {/* Table Header / Filters */}
          <div className="flex flex-col gap-4 border-b border-slate-800/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">All Users</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {filteredUsers.length} of {usersData.length} users
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search name or email…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-9 w-56 rounded-lg border border-slate-700/60 bg-slate-800/60 pl-9 pr-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                />
              </div>
              {/* Plan Filter */}
              <div className="relative">
                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value as Plan | "All")}
                  className="h-9 appearance-none rounded-lg border border-slate-700/60 bg-slate-800/60 pl-3 pr-8 text-sm text-slate-300 outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all cursor-pointer"
                >
                  <option value="All">All Plans</option>
                  <option value="Enterprise">Enterprise</option>
                  <option value="Pro">Pro</option>
                  <option value="Starter">Starter</option>
                  <option value="Free">Free</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
              </div>
              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as Status | "All")}
                  className="h-9 appearance-none rounded-lg border border-slate-700/60 bg-slate-800/60 pl-3 pr-8 text-sm text-slate-300 outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="trial">Trial</option>
                  <option value="inactive">Inactive</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-slate-800/60">
                  {[
                    { key: "name" as SortKey, label: "User" },
                    { key: "plan" as SortKey, label: "Plan" },
                    { key: "status" as SortKey, label: "Status" },
                    { key: "joined" as SortKey, label: "Joined" },
                    { key: "mrr" as SortKey, label: "MRR" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 cursor-pointer select-none hover:text-slate-300 transition-colors"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {col.label}
                        <SortIcon col={col.key} />
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <motion.tbody
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-sm text-slate-500">
                      No users match your search or filters.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      variants={fadeIn}
                      whileHover={{ backgroundColor: "rgba(99,102,241,0.04)" }}
                      className="border-b border-slate-800/40 transition-colors last:border-0"
                    >
                      {/* User */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-md"
                            style={{ backgroundColor: user.avatarColor }}
                          >
                            {user.avatarInitials}
                          </div>
                          <div>
                            <p className="font-medium text-slate-100">{user.name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      {/* Plan */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${planStyles[user.plan]}`}>
                          {user.plan}
                        </span>
                      </td>
                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[user.status]}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${statusDot[user.status]}`} />
                          {user.status.charAt(0).toUpperCase()}{user.status.slice(1)}
                        </span>
                      </td>
                      {/* Joined */}
                      <td className="px-6 py-4 text-slate-400 text-xs">
                        {formatDate(user.joined)}
                      </td>
                      {/* MRR */}
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${(user.mrr ?? 0) > 0 ? "text-emerald-400" : "text-slate-500"}`}>
                          {(user.mrr ?? 0) > 0 ? `$${(user.mrr ?? 0).toLocaleString()}` : "—"}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </motion.tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex items-center justify-between border-t border-slate-800/60 px-6 py-4">
            <p className="text-xs text-slate-500">
              Showing <span className="text-slate-300 font-medium">{filteredUsers.length}</span> users
            </p>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span>Total MRR from filtered users:</span>
              <span className="ml-1 font-semibold text-emerald-400">
                ${filteredUsers.reduce((sum, u) => sum + (u.mrr ?? 0), 0).toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}