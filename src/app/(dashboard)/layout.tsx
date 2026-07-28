import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import Link from "next/link";
import { LogOut, User as UserIcon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  // Safe helper imports inside function scope if needed or static import
  const { getSessionUser } = await import("@/lib/auth-helper");
  const user = await getSessionUser();

  if (!user) {
    redirect("/sign-in");
  }

  const isClerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <div className="flex h-screen bg-[#06050C] dashboard-dark-bg overflow-hidden text-white">
      {/* Sidebar Nav */}
      <Sidebar />
 
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 bg-[#0A0814]/70 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-20">
          <div>
            <h2 className="font-display font-bold text-base sm:text-lg text-white">
              BuildWise Dashboard
            </h2>
          </div>
 
          <div className="flex items-center gap-4">
            {/* Workspace indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-400">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Personal Workspace
            </div>
 
            {/* Profile actions */}
            <div className="flex items-center gap-2">
              {isClerkConfigured ? (
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-9 w-9 rounded-full border border-white/10 focus-ring",
                    },
                  }}
                />
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={user.imageUrl}
                      alt={user.name || "User"}
                      className="h-8 w-8 rounded-full border border-white/10"
                    />
                    <div className="hidden md:block text-left">
                      <div className="text-xs font-bold leading-none text-white">{user.name}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{user.email}</div>
                    </div>
                  </div>
                  <Link
                    href="/"
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors focus-ring"
                    title="Exit Sandbox"
                  >
                    <LogOut className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>
 
        {/* Content body */}
        <main className="flex-1 overflow-y-auto bg-transparent">
          {children}
        </main>
      </div>
    </div>
  );
}
