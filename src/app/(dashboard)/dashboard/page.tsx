'use client'

// app/dashboard/page.tsx

import { createClient } from "@/lib/utils/supabase/client";
import CreateProjectModal from '@/components/projects/CreateProjectModal'
import ProjectsWidget from '@/components/projects/ProjectsWidget'
import { useState, useEffect } from 'react'
import { TemplatePickerModal } from '@/components/templates/TemplatePickerModal'
import { useRouter, redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import type { User } from '@supabase/supabase-js'

export default function DashboardPage() {
  const [deployingProjectId, setDeployingProjectId] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [widgets, setWidgets] = useState<{ id: any; title: any; position: any; settings: any }[]>([])
  const router = useRouter()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

useEffect(() => {
  const fetchUserAndWidgets = async () => {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/sign-in')
      return
    }

    setUser(user)

    const { data: widgets = [], error } = await supabase
      .from('dashboard_widgets')
      .select('id, title, position, settings')
      .order('position', { ascending: true })

    if (error) {
      console.error('Failed to load widgets:', error)
    } else {
      setWidgets(widgets || [])
    }
  }

  fetchUserAndWidgets()
}, [])
  // Fetch widgets from the database
  // Ensure you have the correct permissions set up in Supabase for this query
  // and that the 'dashboard_widgets' table exists with the expected schema.
  // The widgets are already fetched in the useEffect hook above.
  // This redundant code block has been removed to avoid redeclaration errors.

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      {/* Main Panels */}
      <div className="flex flex-1 overflow-hidden">
        {/* Project Cards Panel */}
        <main className="flex-1 overflow-y-auto">
          <ProjectsWidget onDeployProject={setDeployingProjectId} refreshTrigger={refreshTrigger}/>
        </main>

        {/* Scout Panel */}
        <aside className="w-[400px] max-w-sm border-l border-slate-800 bg-slate-800 dark:bg-slate-900 hidden lg:flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">Scout</h2>
            {/* TODO: Add collapse/minimize button */}
          </div>
          <div className="flex-1 p-4 overflow-y-auto text-slate-400">
            {/* Placeholder for prompt area */}
            <p className="text-sm">Ask Scout to help you edit your deployed Astro site, generate copy, or manage tasks.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
