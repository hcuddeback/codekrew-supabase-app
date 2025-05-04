// app/dashboard/layout.tsx
'use client'

import DashboardHeader from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import { PropsWithChildren } from 'react'

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen text-white flex flex-col border-t border-slate-800">
      <DashboardHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 px-4 py-12">
          {children}
          </div>
        </main>
      </div>
    </div>
  )
}
