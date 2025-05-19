'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import ProjectCard from '@/components/dashboard/ProjectCard' // if you have a card component

export default function DashboardProjects() {
  const supabase = createClient()
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('archived', false)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading projects:', error)
      } else {
        setProjects(data)
      }

      setLoading(false)
    }

    fetchProjects()
  }, [])

  if (loading) {
    return <p className="text-slate-400">Loading your projects...</p>
  }

  if (projects.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-slate-400">You don’t have any active projects yet.</p>
        <Button className="mt-4 bg-orange-500 text-white" onClick={() => router.push('/')}>
          + Create Your First Project
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
