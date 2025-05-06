'use client'

// app/dashboard/page.tsx

import { createClient } from "@/lib/utils/supabase/client";
import CreateProjectModal from '@/components/projects/CreateProjectModal'
import ProjectsWidget from '@/components/projects/ProjectsWidget'
import { useState, useEffect } from 'react'
import { TemplatePickerModal } from '@/components/templates/TemplatePickerModal'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ProjectCard from '@/components/dashboard/ProjectCard'
import ScoutPanel from '@/components/scout/ScoutPanel'
import type { User } from '@supabase/supabase-js'
import { motion } from 'framer-motion'
import Link from 'next/link'

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
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/sign-in')
        return
      }

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
    fetchUserData()
  }, [])

  const tasksDueToday = tasks.filter((task) => {
    const today = new Date().toISOString().split('T')[0]
    return task.due_date === today
  })

  const tasksInProgress = tasks.filter((task) => task.status === 'in_progress')

  const latestNote = notes.length > 0 ? notes.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0] : null

  const topProjects = [...projects]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3)

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
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex-1">
              <CardTitle className="text-xl">Your Projects</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <CreateProjectModal>
              </CreateProjectModal>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 pb-2">
            {topProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProjectCard
                  project={{ ...project, thumbnailSize: 'xs', compact: true }}
                  showPreview
                  onClick={() => router.push(`/dashboard/projects/${project.id}`)}
                />
              </motion.div>
            ))}
            {projects.length > 3 && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="col-span-full text-right text-sm pt-1"
              >
                <Link href="/projects" className="text-muted-foreground hover:text-foreground underline">
                  Show All ({projects.length})
                </Link>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Tasks / Notes Preview - Fixed View for MVP */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            title: 'Tasks',
            content: `${tasksDueToday.length} Due Today • ${tasksInProgress.length} In Progress`
          },
          {
            title: 'Notes',
            content: latestNote ? `“${latestNote.title}” - updated ${new Date(latestNote.updated_at).toLocaleTimeString()}` : 'No recent notes'
          },
          {
            title: 'Upcoming',
            content: 'Your next roadmap item is: Connect GitHub Repo'
          },
          {
            title: 'Scout Tips',
            content: 'Use the Scout panel to get help writing, deploying, or organizing tasks.'
          }
        ].map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="col-span-1">
              <CardHeader><CardTitle>{card.title}</CardTitle></CardHeader>
              <CardContent>
                <p>{card.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Scout Panel */}
      {showScout && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          <ScoutPanel onClose={() => setShowScout(false)} />
        </motion.div>
      )}
    </div>
  )
}
