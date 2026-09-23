import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="bg-surface font-sans text-text-primary antialiased min-h-screen flex flex-col">
      <Navbar />
      <main className="w-full pt-28 flex-1 flex flex-col">
        <Outlet />
      </main>
      <footer className="w-full bg-white border-t border-border/40 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-4">
              <span>© 2026 Bannari Amman Institute of Technology. All rights reserved.</span>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <a href="#" className="hover:text-text-primary transition-colors">Code of Conduct</a>
              <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-text-primary transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
