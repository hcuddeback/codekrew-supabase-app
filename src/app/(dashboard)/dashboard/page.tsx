'use client'

// app/dashboard/page.tsx

import { createClient } from "@/lib/utils/supabase/client";
import CreateProjectModal from '@/components/projects/CreateProjectModal'
import ProjectsWidget from '@/components/projects/ProjectsWidget'
import { useState, useEffect } from 'react'
import { TemplatePickerModal } from '@/components/templates/TemplatePickerModal'
import { useRouter, redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ProjectCard from '@/components/dashboard/ProjectCard'
import ScoutPanel from '@/components/scout/ScoutPanel'
import type { User } from '@supabase/supabase-js'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const supabase = createClient()
  const [projects, setProjects] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [notes, setNotes] = useState<any[]>([])
  const [showScout, setShowScout] = useState(false)
  const [deployingProjectId, setDeployingProjectId] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [widgets, setWidgets] = useState<{ id: any; title: any; position: any; settings: any }[]>([])
  const router = useRouter()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

useEffect(() => {
  const fetchUserData = async () => {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/sign-in')
      return
    }

    if (user) {
      setUser(user)

      const [{ data: userProjects }, { data: userTasks }, { data: userNotes }] = await Promise.all([
        supabase.from('projects').select('*').eq('user_id', user.id),
        supabase.from('tasks').select('*').eq('user_id', user.id),
        supabase.from('notes').select('*').eq('user_id', user.id)
      ])

      setProjects(userProjects || [])
      setTasks(userTasks || [])
      setNotes(userNotes || [])
    }
  }
  fetchUserData()
}, [supabase])

  const tasksDueToday = tasks.filter((task) => {
    const today = new Date().toISOString().split('T')[0]
    return task.due_date === today
  })

  const tasksInProgress = tasks.filter((task) => task.status === 'in_progress')

  const latestNote = notes.length > 0 ? notes.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0] : null

  return (
    <div className="flex flex-col space-y-6 p-6">
      {/* Hero Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.user_metadata?.name || user?.email} 👋</h1>
          <p className="text-muted-foreground">Let’s build something amazing today.</p>
        </div>
        <Button variant="outline" onClick={() => setShowScout(!showScout)}>
          {showScout ? 'Hide Scout' : 'Need Help?'}
        </Button>
      </div>

      {/* Project Cards */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Your Projects</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Tasks / Notes Preview - Fixed View for MVP */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="col-span-1">
          <CardHeader><CardTitle>Tasks</CardTitle></CardHeader>
          <CardContent>
            <p>{tasksDueToday.length} Due Today • {tasksInProgress.length} In Progress</p>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader><CardTitle>Notes</CardTitle></CardHeader>
          <CardContent>
            {latestNote ? (
              <p>“{latestNote.title}” - updated {new Date(latestNote.updated_at).toLocaleTimeString()}</p>
            ) : (
              <p>No recent notes</p>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader><CardTitle>Upcoming</CardTitle></CardHeader>
          <CardContent>
            <p>Your next roadmap item is: Connect GitHub Repo</p>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader><CardTitle>Scout Tips</CardTitle></CardHeader>
          <CardContent>
            <p>Use the Scout panel to get help writing, deploying, or organizing tasks.</p>
          </CardContent>
        </Card>
      </section>

      {/* Scout Panel */}
      {showScout && <ScoutPanel onClose={() => setShowScout(false)} />}
    </div>
  )
}
