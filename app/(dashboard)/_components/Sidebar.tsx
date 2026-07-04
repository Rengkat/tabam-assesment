"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
// import { signOut } from "next-auth/react";
// import { useSession } from "next-auth/react";
import { LayoutDashboard, Package, Tag, Box, ShoppingBag, LogOut, X, Store } from "lucide-react";

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}
const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Products",
    href: "/products",
    icon: Package,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Categories",
    href: "/categories",
    icon: Tag,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Box,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  { title: "Orders", href: "/orders", icon: ShoppingBag },
];

export function Sidebar({ isMobile, onClose }: SidebarProps) {
  const pathname = usePathname();
  //   const { data: session } = useSession();

  //   const handleSignOut = () => signOut({ redirect: true, callbackUrl: "/login" });

  return (
    <div className="h-full w-full flex flex-col bg-white border-r border-slate-200">
      <div className="p-6 border-b border-slate-200 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
          <Store className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900">Tabam-Store</h1>
          <p className="text-xs text-slate-500">Admin Dashboard</p>
        </div>
        {isMobile && (
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="ml-auto p-2 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40 lg:hidden">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        )}
      </div>

      <nav aria-label="Primary" className="flex-1 overflow-y-auto p-4 space-y-1">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
          Main Menu
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
                isActive
                  ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-slate-900"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}>
              {isActive && (
                <span className="absolute left-0 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full" />
              )}
              <span className={`p-1.5 rounded-lg ${isActive ? item.bg : ""}`}>
                <Icon
                  className={`w-5 h-5 ${isActive ? item.color : "text-slate-400"}`}
                  aria-hidden="true"
                />
              </span>
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 p-2 rounded-xl">
          <div
            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold"
            aria-hidden="true">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">Alexander Rengkat</p>
            <p className="text-xs text-slate-500 truncate">alexander.rengkat@example.com</p>
          </div>
        </div>
        <button
          //   onClick={handleSignOut}
          className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/40">
          <LogOut className="w-4 h-4" aria-hidden="true" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
