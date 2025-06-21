"use client";

import { FeedbackManagement } from "./feedback-manage";
import { TransactionHistory } from "./transaction-history";
import { useState,useEffect } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { DashboardOverview } from "./dashboard-overview";
import EventManagement from "./event-manage";
import { ServiceManagement } from "./service-manage";
import { JobManagement } from "./job-management";
import { CVManagement } from "./cv-management";
import { Analytics } from "./analytics";
import { Settings } from "./setting";
import { NotificationCenter } from "./nofication";
import { CandidateManagement } from "./candicate-management";
import { EmployerManagement } from "./employer-management";
import { ReportsPage } from "./report";
import { SendNotification } from "./send-nofication";
import { NotificationHistory } from "./nofication-history";
import Cookies from "js-cookie";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const Logout = () => {
    Cookies.remove('token')
  }
    useEffect(() => {
    if (activeTab === "logout") {
      Logout();
    }
  }, [activeTab]);
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "candicate":
        return <CandidateManagement />;
      case "employer":
        return <EmployerManagement />;
      case "nofication":
        return <NotificationCenter />;
      case "sendnoti":
        return <SendNotification />;
      case "notihistory":
        return <NotificationHistory />;
      case "report":
        return <ReportsPage />;
      case "transaction":
        return <TransactionHistory></TransactionHistory>;
      case"feedback":
        return <FeedbackManagement></FeedbackManagement>;
      case "jobs":
        return <JobManagement />;
      case "cvs":
        return <CVManagement />;
      case "service":
        return <ServiceManagement />;
      case "analytics":
        return <Analytics />;
      case "event":
        return <EventManagement/>;
      case "settings":
        return <Settings />;
      case "logout":
        return null;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
