// app/dashboard/layout.tsx
'use client'

import DashboardHeader from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import { PropsWithChildren } from 'react'



export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground border-t border-border">
      <DashboardHeader />
      <div className="flex flex-1">
        <Sidebar />

        {/* Main content shifted below header and beside sidebar */}
        <main className="pt-14 ml-14 flex-1 overflow-auto bg-background dark:bg-background px-6">
          {children}
        </main>
      </div>
    </div>
  )
}
