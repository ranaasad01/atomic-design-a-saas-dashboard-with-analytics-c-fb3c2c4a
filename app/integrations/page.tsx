"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, CreditCard, MessageSquare, BarChart2, Code2, Zap, MessageCircle, Database, FileText, CheckSquare, Mail, Globe, Users, TrendingUp, X, Check, Plug } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { APP_NAME } from "@/lib/data";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  connected: boolean;
  category: string;
}

const integrations: Integration[] = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Accept payments, manage subscriptions, and track revenue in real time.",
    icon: CreditCard,
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
    connected: true,
    category: "Payments",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Receive instant alerts and daily digests directly in your Slack channels.",
    icon: MessageSquare,
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    connected: true,
    category: "Communication",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Link deployments and releases to revenue and user-growth events.",
    icon: Code2,
    iconBg: "bg-slate-500/20",
    iconColor: "text-slate-300",
    connected: true,
    category: "Development",
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Combine web traffic data with your SaaS metrics for a full-funnel view.",
    icon: BarChart2,
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    connected: true,
    category: "Analytics",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Sync contacts, deals, and pipeline data to enrich your analytics.",
    icon: Users,
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
    connected: false,
    category: "CRM",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Pull CRM data into dashboards and correlate sales activity with revenue.",
    icon: TrendingUp,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    connected: false,
    category: "CRM",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Automate workflows between Pulse Analytics and 5,000+ other apps.",
    icon: Zap,
    iconBg: "bg-yellow-500/20",
    iconColor: "text-yellow-400",
    connected: false,
    category: "Automation",
  },
  {
    id: "intercom",
    name: "Intercom",
    description: "Overlay support conversations with user health scores and churn risk.",
    icon: MessageCircle,
    iconBg: "bg-indigo-500/20",
    iconColor: "text-indigo-400",
    connected: false,
    category: "Support",
  },
  {
    id: "segment",
    name: "Segment",
    description: "Stream event data from Segment directly into your analytics pipeline.",
    icon: Database,
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
    connected: false,
    category: "Data",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Embed live charts and KPI snapshots into your Notion workspace.",
    icon: FileText,
    iconBg: "bg-slate-400/20",
    iconColor: "text-slate-300",
    connected: false,
    category: "Productivity",
  },
  {
    id: "jira",
    name: "Jira",
    description: "Connect sprint velocity and release cycles to product growth metrics.",
    icon: CheckSquare,
    iconBg: "bg-blue-600/20",
    iconColor: "text-blue-300",
    connected: false,
    category: "Development",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Track email campaign performance alongside acquisition and retention data.",
    icon: Mail,
    iconBg: "bg-yellow-600/20",
    iconColor: "text-yellow-300",
    connected: false,
    category: "Marketing",
  },
];

export default function IntegrationsPage() {
  const [search, setSearch] = useState("");
  const [connectedMap, setConnectedMap] = useState<Record<string, boolean>>(
    () => Object.fromEntries(integrations.map((i) => [i.id, i.connected]))
  );

  const filtered = integrations.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  const connectedCount = Object.values(connectedMap).filter(Boolean).length;

  const toggleConnection = (id: string) => {
    setConnectedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Page Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
              <Plug className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Integrations</h1>
            </div>
          </motion.div>
          <motion.p variants={fadeInUp} className="text-slate-400 text-sm mt-1 ml-[52px]">
            Connect your favorite tools and services to {APP_NAME}.
          </motion.p>

          {/* Stats row */}
          <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-slate-800/60 border border-slate-700/50 px-4 py-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
              <span className="text-sm text-slate-300">
                <span className="font-semibold text-white">{connectedCount}</span> connected
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-slate-800/60 border border-slate-700/50 px-4 py-2.5">
              <Globe className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-300">
                <span className="font-semibold text-white">{integrations.length}</span> available
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Search / Filter Bar ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search integrations or categories…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-slate-800/70 border border-slate-700/60 pl-10 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {search && (
            <p className="mt-2 text-xs text-slate-500">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
            </p>
          )}
        </motion.div>

        {/* ── Integration Cards Grid ── */}
        {filtered.length === 0 ? (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <Search className="h-10 w-10 text-slate-600 mb-4" />
            <p className="text-slate-400 font-medium">No integrations found</p>
            <p className="text-slate-600 text-sm mt-1">Try a different search term.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((integration) => {
              const Icon = integration.icon;
              const isConnected = connectedMap[integration.id];
              return (
                <motion.div
                  key={integration.id}
                  variants={fadeInUp}
                  className="group relative flex flex-col rounded-2xl bg-slate-900/70 border border-slate-800/60 p-6 hover:border-slate-700/80 hover:bg-slate-900 transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-slate-900/50"
                >
                  {/* Card top row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${integration.iconBg} ring-1 ring-white/5`}>
                      <Icon className={`h-5 w-5 ${integration.iconColor}`} />
                    </div>
                    {/* Status badge */}
                    {isConnected ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-400">
                        <Check className="h-3 w-3" />
                        Connected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-700/50 border border-slate-600/40 px-2.5 py-1 text-xs font-medium text-slate-400">
                        Available
                      </span>
                    )}
                  </div>

                  {/* Name & category */}
                  <div className="mb-1.5">
                    <h3 className="font-semibold text-white text-base leading-snug">{integration.name}</h3>
                    <span className="text-xs text-slate-500 font-medium">{integration.category}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-5">
                    {integration.description}
                  </p>

                  {/* Action button */}
                  <button
                    onClick={() => toggleConnection(integration.id)}
                    className={`w-full rounded-xl py-2 text-sm font-medium transition-all duration-200 ${
                      isConnected
                        ? "bg-slate-800 text-slate-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 border border-slate-700/60"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20 border border-indigo-500/30"
                    }`}
                  >
                    {isConnected ? "Disconnect" : "Connect"}
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
