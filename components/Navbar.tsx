"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { APP_NAME, navLinks } from "@/lib/data";
import { Activity, Bell, Menu, X, User, ChevronDown } from 'lucide-react';
import { fadeIn, staggerContainer, fadeInUp } from "@/lib/motion";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, text: "Revenue milestone: $50k MRR reached!", time: "2m ago", unread: true },
    { id: 2, text: "New user signup spike detected.", time: "18m ago", unread: true },
    { id: 3, text: "Churn rate dropped below 2%.", time: "1h ago", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30"
            >
              <Activity className="h-4 w-4 text-white" />
            </motion.div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors duration-200">
              {APP_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link key={link.href} href={link.href}>
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative inline-flex items-center px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "text-indigo-300 bg-indigo-500/10"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-lg bg-indigo-500/10 border border-indigo-500/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setNotifOpen((v) => !v)}
                className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-slate-950" />
                )}
              </motion.button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-700/60 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50">
                      <span className="text-sm font-semibold text-slate-100">Notifications</span>
                      <span className="text-xs text-indigo-400 font-medium">{unreadCount} new</span>
                    </div>
                    <div className="divide-y divide-slate-700/40">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`px-4 py-3 flex gap-3 items-start hover:bg-slate-800/40 transition-colors cursor-pointer ${
                            n.unread ? "bg-indigo-500/5" : ""
                          }`}
                        >
                          {n.unread && (
                            <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-500" />
                          )}
                          {!n.unread && <span className="mt-1.5 h-2 w-2 flex-shrink-0" />}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-200 leading-snug">{n.text}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2.5 border-t border-slate-700/50">
                      <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        View all notifications →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Avatar */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-800/60 transition-colors group"
              aria-label="User menu"
            >
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
                <User className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-slate-300 group-hover:text-slate-100 transition-colors">
                Alex Kim
              </span>
              <ChevronDown className="hidden sm:block h-3.5 w-3.5 text-slate-500 group-hover:text-slate-400 transition-colors" />
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, height: 0 },
              visible: { opacity: 1, height: "auto" },
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden border-t border-slate-800/60 bg-slate-950/95 backdrop-blur-xl overflow-hidden"
          >
            <motion.nav
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="px-4 py-3 flex flex-col gap-1"
            >
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <motion.div key={link.href} variants={fadeInUp}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-indigo-300 bg-indigo-500/10 border border-indigo-500/20"
                          : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}