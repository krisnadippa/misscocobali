"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminMetrics from "@/components/admin/AdminMetrics";
import AdminCharts from "@/components/admin/AdminCharts";
import AdminTables from "@/components/admin/AdminTables";
import UsersView from "@/components/admin/views/UsersView";
import ReportsView from "@/components/admin/views/ReportsView";
import TransactionsView from "@/components/admin/views/TransactionsView";
import StatisticsView from "@/components/admin/views/StatisticsView";
import MarketingView from "@/components/admin/views/MarketingView";
import CalendarView from "@/components/admin/views/CalendarView";
import GalleryView from "@/components/admin/views/GalleryView";
import MailboxView from "@/components/admin/views/MailboxView";
import SettingsView from "@/components/admin/views/SettingsView";
import HelpSupportView from "@/components/admin/views/HelpSupportView";

export default function AdminDashboardClient() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed((prev) => !prev);

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <>
            <AdminMetrics />
            <AdminCharts />
            <AdminTables />
          </>
        );
      case "Users":
        return <UsersView />;
      case "Reports":
        return <ReportsView />;
      case "Transaction":
        return <TransactionsView />;
      case "Statistic":
        return <StatisticsView />;
      case "Marketing":
        return <MarketingView />;
      case "Calendar":
        return <CalendarView />;
      case "Gallery":
        return <GalleryView />;
      case "Mailbox":
        return <MailboxView />;
      case "Settings":
        return <SettingsView />;
      case "Support":
        return <HelpSupportView />;
      default:
        return (
          <>
            <AdminMetrics />
            <AdminCharts />
            <AdminTables />
          </>
        );
    }
  };

  return (
    <div className="h-screen w-full text-zesto-gray-900 bg-zesto-mint-subtle flex flex-col antialiased selection:bg-zesto-lime selection:text-zesto-forest font-sans overflow-hidden">
      {/* Sticky Top Navigation */}
      <AdminHeader
        collapsed={collapsed}
        onToggleCollapse={toggleCollapse}
      />

      {/* Main Body: Fixed Sidebar & Scrollable Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Fixed Non-scrolling Sidebar with Collapse support */}
        <AdminSidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          collapsed={collapsed}
        />

        {/* Scrollable Content View Area */}
        <main
          className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6"
          data-purpose="main-dashboard-content"
        >
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

