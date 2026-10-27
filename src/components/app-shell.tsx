"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
];

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* ─── Sidebar (desktop) ──────────────────────────────────── */}
      <aside className="hidden md:flex md:flex-col md:w-56 md:min-h-screen bg-white border-r border-slate-200">
        {/* Logo */}
        <div className="px-5 py-4 border-b border-slate-100">
          <span className="font-bold text-indigo-600 text-lg tracking-tight">
            Daily Tracker
          </span>
        </div>

        {/* Nav links */}
        <nav aria-label="Navigasi utama" className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100",
                ].join(" ")}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-slate-100">
          <button
            id="btn-logout"
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Keluar
          </button>
        </div>
      </aside>

      {/* ─── Main content ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-screen md:min-h-0">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
          <span className="font-bold text-indigo-600 text-base tracking-tight">
            Daily Tracker
          </span>
          <button
            id="btn-logout-mobile"
            onClick={handleLogout}
            aria-label="Keluar"
            className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 max-w-5xl mx-auto w-full">
          {children}
        </main>

        {/* ─── Bottom navigation (mobile) ──────────────────────── */}
        <nav
          aria-label="Navigasi bawah"
          className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 flex"
        >
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "flex-1 flex flex-col items-center gap-0.5 py-2 text-xs font-medium transition-colors",
                  active ? "text-indigo-600" : "text-slate-500",
                ].join(" ")}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Spacer so bottom nav doesn't overlap content on mobile */}
        <div className="md:hidden h-14" aria-hidden="true" />
      </div>
    </div>
  );
}
