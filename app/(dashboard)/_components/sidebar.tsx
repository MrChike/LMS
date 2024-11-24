'use client';

import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = () => {
  const handleLogoClick = () => {
    window.location.href = '/search';
  };

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <Logo />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
