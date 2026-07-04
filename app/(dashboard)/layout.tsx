"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "./_components/Sidebar";
import { Header } from "./_components/Header";
import { MobileNav } from "./_components/MobileNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg">
        Skip to main content
      </a>

      {isSidebarOpen && (
        <div className="hidden lg:block fixed inset-y-0 left-0 z-50 w-72">
          <Sidebar />
        </div>
      )}

      {isMobileSidebarOpen && (
        <>
          <div
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden">
            <Sidebar isMobile onClose={() => setIsMobileSidebarOpen(false)} />
          </div>
        </>
      )}

      <div
        className={`flex-1 flex flex-col min-h-screen transition-[margin] duration-300 ${
          isSidebarOpen ? "lg:ml-72" : "lg:ml-0"
        }`}>
        <Header
          onMenuClick={() => {
            if (window.innerWidth < 1024) {
              setIsMobileSidebarOpen((v) => !v);
            } else {
              setIsSidebarOpen((v) => !v);
            }
          }}
        />

        <main
          id="main-content"
          className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden pb-20 lg:pb-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>

        <footer className="hidden lg:block border-t border-slate-200 bg-white/50 backdrop-blur-sm py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-slate-500">
            <p>© 2026 E-Commerce Admin. All rights reserved.</p>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
              System Online
            </span>
          </div>
        </footer>
      </div>

      <MobileNav />
    </div>
  );
}
