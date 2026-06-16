'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          Toby&apos;s Dashboard
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-slate-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">
            Dashboard
          </Link>
        </div>
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 px-2">
          <Link href="/" className="text-slate-300 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
