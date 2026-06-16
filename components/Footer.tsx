"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, footerLinks } from "@/lib/data";
import { fadeInUp, staggerContainer, fadeIn } from "@/lib/motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeIn}
      className="border-t border-slate-800/60 bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5"
        >
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                {APP_NAME}
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs">
              {APP_TAGLINE} Track revenue, users, and growth metrics with beautiful, real-time dashboards.
            </p>
            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.93 }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/40 text-slate-400 hover:text-indigo-300 hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {footerLinks.map((section) => (
            <motion.div key={section.section} variants={fadeInUp}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                {section.section}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-indigo-300 transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-slate-500">
            © {currentYear} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs text-slate-500 hover:text-indigo-300 transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}