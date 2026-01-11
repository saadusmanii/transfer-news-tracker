"use client";

import { useSession, signOut } from "next-auth/react";
import Avatar from "../ui/Avatar";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardNav() {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-white font-semibold text-lg hidden sm:block">
              Transfer News
            </span>
          </Link>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-3 hover:bg-slate-800/50 rounded-lg p-2 transition-colors"
            >
              <Avatar
                src={session?.user?.image}
                alt={session?.user?.name || "User"}
                size="sm"
              />
              <span className="text-white text-sm hidden sm:block">
                {session?.user?.name || session?.user?.email}
              </span>
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl z-20">
                  <div className="p-3 border-b border-slate-800">
                    <p className="text-white font-medium">{session?.user?.name}</p>
                    <p className="text-slate-400 text-sm">{session?.user?.email}</p>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
