'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/utils/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import ProjectCard from '@/components/dashboard/ProjectCard'

export default function ProjectsPage() {
  const supabase = createClient()
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [showArchived, setShowArchived] = useState(false)

  useEffect(() => {
    const fetchUserAndProjects = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/sign-in')
        return
      }

      setUser(user)
    }

    fetchUserAndProjects()
  }, [])

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return

      let query = supabase.from('projects').select('*').eq('user_id', user.id)
      if (!showArchived) {
        query = query.eq('archived', false)
      }

      const { data, error } = await query
      if (error) {
        console.error('Error fetching projects:', error)
      }
      setProjects(data || [])
    }

    fetchProjects()
  }, [showArchived, user])

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = search ? project.name?.toLowerCase().includes(search.toLowerCase()) : true
    const matchesStatus = statusFilter ? project.status === statusFilter : true
    const matchesTag = tagFilter ? project.tags?.includes(tagFilter) : true
    return matchesSearch && matchesStatus && matchesTag
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">All Projects</h1>
        <div className="flex flex-wrap gap-2 items-center">
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48"
          />
          <Input
            placeholder="Filter by tag..."
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="w-40"
          />
          <Input
            placeholder="Filter by status..."
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-40"
          />
          <div className="flex items-center gap-2 pl-4">
            <Switch id="show-archived" checked={showArchived} onCheckedChange={setShowArchived} />
            <Label htmlFor="show-archived">Show Archived</Label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            showPreview
            onClick={() => router.push(`/dashboard/projects/${project.id}`)}
          />
        ))}
      </div>
    </div>
  )
}
