'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Sidebar } from './sidebar';
import { Header } from './header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarCollapsed] = React.useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => {}}
      />
      <Header sidebarCollapsed={sidebarCollapsed} />
      <main className="pt-16 pl-[72px] min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};
