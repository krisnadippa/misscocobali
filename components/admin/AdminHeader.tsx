"use client";

import React, { useState } from "react";
import Link from "next/link";

interface AdminHeaderProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function AdminHeader({
  collapsed = false,
  onToggleCollapse,
}: AdminHeaderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <header
      className="h-16 bg-white border-b border-zesto-gray-200 sticky top-0 z-30 px-6 flex items-center justify-between"
      data-purpose="top-navigation"
    >
      {/* Left Logo & Breadcrumb Title */}
      <div className="flex items-center space-x-6">
        {/* Brand Logo */}
        <Link className="flex items-center space-x-2.5 group" href="/admin">
          <div className="w-8 h-8 rounded-xl bg-zesto-forest flex items-center justify-center text-zesto-lime shadow-sm transition-transform group-hover:scale-105">
            {/* Zestó Sparkle / Droplet Logo Icon */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L14.2 8.3L20.5 10.5L14.2 12.7L12 19L9.8 12.7L3.5 10.5L9.8 8.3L12 2Z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-zesto-forest">
            Zestó
            <span className="text-xs ml-1.5 font-semibold uppercase tracking-wider text-zesto-lime bg-zesto-forest px-1.5 py-0.5 rounded">
              Admin
            </span>
          </span>
        </Link>

        {/* Sidebar Collapse Toggle Button */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-zesto-gray-500 hover:text-zesto-forest hover:bg-zesto-mint transition-colors cursor-pointer"
          title={collapsed ? "Buka Sidebar Penuh" : "Sembunyikan Sidebar (Hanya Ikon)"}
        >
          <svg
            className="w-4 h-4 stroke-current stroke-2 fill-none"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <path d={collapsed ? "M13 15l3-3-3-3" : "M16 9l-3 3 3 3"} />
          </svg>
        </button>
      </div>

      {/* Right Controls: Mode Toggle, Notifications & User Info */}
      <div className="flex items-center space-x-5">
        {/* Dark/Light Mode Pill Switcher */}
        <div className="flex items-center bg-zesto-mint-subtle p-1 rounded-full border border-zesto-gray-200 shadow-inner">
          <button
            onClick={() => setTheme("light")}
            className={`p-1.5 rounded-full transition-all ${
              theme === "light"
                ? "bg-zesto-forest text-zesto-lime shadow-sm"
                : "text-zesto-gray-500 hover:text-zesto-forest"
            }`}
            title="Light Theme"
            type="button"
          >
            <svg
              className="w-3.5 h-3.5 fill-none stroke-current stroke-2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`p-1.5 rounded-full transition-all ${
              theme === "dark"
                ? "bg-zesto-forest text-zesto-lime shadow-sm"
                : "text-zesto-gray-500 hover:text-zesto-forest"
            }`}
            title="Dark Theme"
            type="button"
          >
            <svg
              className="w-3.5 h-3.5 fill-none stroke-current stroke-2"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
        </div>

        {/* Notification Bell */}
        <button
          type="button"
          className="relative p-2 text-zesto-gray-600 hover:text-zesto-forest rounded-full hover:bg-zesto-mint transition-colors cursor-pointer"
        >
          <svg
            className="w-4 h-4 fill-none stroke-current stroke-2"
            viewBox="0 0 24 24"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-zesto-lime rounded-full ring-2 ring-white" />
        </button>

        {/* User Profile Dropdown Pill */}
        <div className="flex items-center space-x-3 pl-2 border-l border-zesto-gray-200 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-zesto-forest text-zesto-lime flex items-center justify-center font-bold text-sm ring-2 ring-zesto-lime/40 group-hover:ring-zesto-lime transition-all">
            TS
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold text-zesto-forest leading-tight group-hover:text-black">
              Tika Scholastika
            </div>
            <div className="text-[11px] text-zesto-gray-500 font-medium">
              Operations Admin
            </div>
          </div>
          <svg
            className="w-4 h-4 text-zesto-gray-400 group-hover:text-zesto-forest transition-colors"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </header>
  );
}

