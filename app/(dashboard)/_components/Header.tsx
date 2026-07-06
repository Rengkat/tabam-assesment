"use client";

import { useState } from "react";
import { Menu, Search, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <div className="px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={onMenuClick}
            aria-label="Toggle sidebar"
            className="p-2 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40">
            <Menu className="w-5 h-5 text-slate-600" />
          </button>

          <div className="hidden md:flex items-center relative w-full max-w-xs">
            <Search
              className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none"
              aria-hidden="true"
            />
            <label htmlFor="global-search" className="sr-only">
              Search products, orders, customers
            </label>
            <input
              id="global-search"
              type="search"
              placeholder="Search products, orders, customers..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="relative">
          <button
            title="Profile"
            onClick={() => setIsProfileOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={isProfileOpen}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40">
            <span
              className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold"
              aria-hidden="true">
              {session?.user?.name?.[0] ?? "?"}
            </span>
          </button>

          {isProfileOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50">
              <div className="px-4 py-3 border-b border-slate-200">
                <p className="text-sm font-medium text-slate-900">{session?.user?.name}</p>
                <p className="text-xs text-slate-500">{session?.user?.email}</p>
              </div>
              <button
                role="menuitem"
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-slate-50">
                <LogOut className="w-4 h-4" aria-hidden="true" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
