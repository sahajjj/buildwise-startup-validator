"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, MessageSquare, Star, Settings } from "lucide-react";

const navigationItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "New", href: "/reports/new", icon: PlusCircle },
  { label: "Chat", href: "/chat/general", icon: MessageSquare },
  { label: "Starred", href: "/starred", icon: Star },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 h-16 bg-[#020806]/85 backdrop-blur-lg border-t border-white/5 flex items-center justify-around px-2 z-40 lg:hidden shadow-[0_-8px_30px_rgb(0,0,0,0.4)]">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              isActive 
                ? "text-[#00D28A]" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <item.icon className={`h-5 w-5 mb-0.5 transition-transform ${isActive ? "scale-110 text-[#00D28A]" : ""}`} />
            <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
export default MobileNav;
