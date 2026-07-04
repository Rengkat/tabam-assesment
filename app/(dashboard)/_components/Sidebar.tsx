"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, Tag, ShoppingBag, BarChart3 } from "lucide-react";

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Products", href: "/products", icon: Package },
  { title: "Categories", href: "/categories", icon: Tag },
  { title: "Orders", href: "/orders", icon: ShoppingBag },
  { title: "Analytics", href: "/analytics", icon: BarChart3 },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-slate-200">
      <div className="flex items-center justify-around px-2 py-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40">
              <span
                className={`p-1.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                    : "hover:bg-slate-100"
                }`}>
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "text-blue-600" : "text-slate-500"
                  }`}
                  aria-hidden="true"
                />
              </span>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? "text-blue-600" : "text-slate-500"
                }`}>
                {item.title}
              </span>
              {isActive && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
