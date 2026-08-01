"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  PlusCircle,
  BarChart3,
  GitCompare,
  MessageSquare,
  Layout,
  Presentation,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  Star,
} from "lucide-react";

const navigationItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "New Report", href: "/reports/new", icon: PlusCircle },
  { label: "AI Co-Founder Chat", href: "/chat/general", icon: MessageSquare },
  { label: "Starred Ideas", href: "/starred", icon: Star },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
 
  return (
    <div
      className={`relative h-screen bg-[#020806]/75 text-white hidden lg:flex flex-col justify-between transition-all duration-300 border-r border-white/5 backdrop-blur-md shrink-0 z-30 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/5 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2 overflow-hidden focus-ring rounded-lg">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00D28A] text-white font-extrabold text-sm shadow-md">
              B
            </div>
            {!collapsed && (
              <span className="text-lg font-bold font-display tracking-tight text-white">
                Build<span className="text-[#FF6F61]">Wise</span>
              </span>
            )}
          </Link>
 
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex h-6 w-6 items-center justify-center rounded-md border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors focus-ring"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
 
        {/* Navigation Items */}
        <div className="px-3 py-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group focus-ring ${
                  isActive
                    ? "bg-[#00D28A]/10 text-[#00D28A] border border-[#00D28A]/30 shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon
                  className={`h-5 w-5 shrink-0 ${
                    isActive ? "text-[#00D28A]" : "text-gray-500 group-hover:text-white transition-colors"
                  }`}
                />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </div>
 
      {/* Footer Info */}
      <div className="p-4 border-t border-white/5 text-center">
        {!collapsed ? (
          <div className="text-[10px] text-gray-500 font-medium">
            BuildWise v1.0.0
            <br />
            AI Startup Intelligence
          </div>
        ) : (
          <div className="text-[10px] text-[#FFC72C] font-bold">BW</div>
        )}
      </div>
    </div>
  );
}
export default Sidebar;
