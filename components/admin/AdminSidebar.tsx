"use client";

import React from "react";
import Link from "next/link";

interface AdminSidebarProps {
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  collapsed?: boolean;
}

export default function AdminSidebar({
  activeTab = "Dashboard",
  onSelectTab,
  collapsed = false,
}: AdminSidebarProps) {
  const menuItems = [
    {
      name: "Dashboard",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <rect height="7" rx="1.5" width="7" x="3" y="3" />
          <rect height="7" rx="1.5" width="7" x="14" y="3" />
          <rect height="7" rx="1.5" width="7" x="14" y="14" />
          <rect height="7" rx="1.5" width="7" x="3" y="14" />
        </svg>
      ),
    },
    {
      name: "Users",
      icon: (
        <svg
          className="w-4 h-4 stroke-current stroke-2 fill-none"
          viewBox="0 0 24 24"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      name: "Reports",
      icon: (
        <svg
          className="w-4 h-4 stroke-current stroke-2 fill-none"
          viewBox="0 0 24 24"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" x2="8" y1="13" y2="13" />
          <line x1="16" x2="8" y1="17" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      name: "Transaction",
      icon: (
        <svg
          className="w-4 h-4 stroke-current stroke-2 fill-none"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8m4-10V6m0 12v2" />
        </svg>
      ),
    },
    {
      name: "Statistic",
      icon: (
        <svg
          className="w-4 h-4 stroke-current stroke-2 fill-none"
          viewBox="0 0 24 24"
        >
          <line x1="18" x2="18" y1="20" y2="10" />
          <line x1="12" x2="12" y1="20" y2="4" />
          <line x1="6" x2="6" y1="20" y2="14" />
        </svg>
      ),
    },
    {
      name: "Marketing",
      icon: (
        <svg
          className="w-4 h-4 stroke-current stroke-2 fill-none"
          viewBox="0 0 24 24"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
  ];

  const miscItems = [
    {
      name: "Calendar",
      icon: (
        <svg
          className="w-4 h-4 stroke-current stroke-2 fill-none"
          viewBox="0 0 24 24"
        >
          <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      ),
    },
    {
      name: "Gallery",
      icon: (
        <svg
          className="w-4 h-4 stroke-current stroke-2 fill-none"
          viewBox="0 0 24 24"
        >
          <rect height="18" rx="2" width="18" x="3" y="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M20.4 14.5L16 10 4 20" />
        </svg>
      ),
    },
    {
      name: "Mailbox",
      icon: (
        <svg
          className="w-4 h-4 stroke-current stroke-2 fill-none"
          viewBox="0 0 24 24"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      name: "Support",
      icon: (
        <svg
          className="w-4 h-4 stroke-current stroke-2 fill-none"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" x2="12.01" y1="17" y2="17" />
        </svg>
      ),
    },
    {
      name: "Settings",
      icon: (
        <svg
          className="w-4 h-4 stroke-current stroke-2 fill-none"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className={`bg-white border-r border-zesto-gray-200 flex flex-col justify-between shrink-0 hidden md:flex h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto z-20 transition-all duration-300 ${
        collapsed ? "w-20 p-2.5" : "w-60 p-4"
      }`}
      data-purpose="sidebar-navigation"
    >
      <div className="space-y-6">
        {/* Main Navigation Section */}
        <div>
          {!collapsed && (
            <p className="text-[11px] font-bold text-zesto-gray-400 uppercase tracking-wider px-3 mb-2">
              Menu
            </p>
          )}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => onSelectTab?.(item.name)}
                  type="button"
                  title={collapsed ? item.name : undefined}
                  className={`w-full flex items-center rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    collapsed
                      ? "justify-center p-2.5"
                      : "space-x-3 px-3 py-2.5"
                  } ${
                    isActive
                      ? "bg-zesto-forest text-zesto-lime font-bold shadow-sm"
                      : "text-zesto-gray-600 hover:text-zesto-forest hover:bg-zesto-mint"
                  }`}
                >
                  <span
                    className={
                      isActive ? "text-zesto-lime" : "text-zesto-gray-400"
                    }
                  >
                    {item.icon}
                  </span>
                  {!collapsed && <span>{item.name}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Miscellaneous Section */}
        <div>
          {!collapsed && (
            <p className="text-[11px] font-bold text-zesto-gray-400 uppercase tracking-wider px-3 mb-2">
              Miscellaneous
            </p>
          )}
          <nav className="space-y-1">
            {miscItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => onSelectTab?.(item.name)}
                  type="button"
                  title={collapsed ? item.name : undefined}
                  className={`w-full flex items-center rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    collapsed
                      ? "justify-center p-2.5"
                      : "space-x-3 px-3 py-2"
                  } ${
                    isActive
                      ? "bg-zesto-forest text-zesto-lime font-bold shadow-sm"
                      : "text-zesto-gray-600 hover:text-zesto-forest hover:bg-zesto-mint"
                  }`}
                >
                  <span
                    className={
                      isActive ? "text-zesto-lime" : "text-zesto-gray-400"
                    }
                  >
                    {item.icon}
                  </span>
                  {!collapsed && <span>{item.name}</span>}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Logout Button */}
      <div className="pt-4 border-t border-zesto-gray-200">
        <Link
          className={`flex items-center rounded-xl text-zesto-gray-600 hover:text-red-600 hover:bg-red-50 text-sm font-medium transition-colors ${
            collapsed ? "justify-center p-2.5" : "space-x-3 px-3 py-2"
          }`}
          href="/"
          title={collapsed ? "Log out" : undefined}
        >
          <svg
            className="w-4 h-4 stroke-current stroke-2 fill-none"
            viewBox="0 0 24 24"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          {!collapsed && <span>Log out</span>}
        </Link>
      </div>
    </aside>
  );
}
