'use client'

import { useEffect, useState } from 'react'
import CreateProjectModal from '@/components/projects/CreateProjectModal'
import { createClient } from '@/lib/utils/supabase/client'
import { Database } from '@/types/supabase'
import { Button } from '@/components/ui/button'

const fallbackScreenshot = '/coming-soon-screenshot.png'

type Project = Database['public']['Tables']['projects']['Row']
type ProjectsWidgetProps = {
  onDeployProject?: (projectId: string) => void
  refreshTrigger?: number
}

export default function ProjectsWidget({ onDeployProject, refreshTrigger }: ProjectsWidgetProps) {
  const supabase = createClient()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchProjects = async () => {
      const {
        data,
        error
      } = await supabase.from('projects').select('*').order('created_at', { ascending: false })

      if (data) setProjects(data)
      if (error) console.error(error)

      setLoading(false)
    }

    fetchProjects()
  }, [refreshTrigger])

  return (
    <div className="rounded border border-zinc-800 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Projects</h2>
        <CreateProjectModal />
      </div>

      {loading ? (
        <p className="text-zinc-500">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-zinc-400">You don’t have any projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="bg-zinc-800 rounded-lg overflow-hidden shadow-md">
              <img
                src={p.vercel_url ? `https://vercel.com/api/www/screenshot?url=${encodeURIComponent(p.vercel_url)}` : fallbackScreenshot}
                alt="screenshot"
                className="w-full h-40 object-cover border-b border-zinc-700"
              />
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg mb-1">{p.name}</h3>
                <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{p.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary">Open</Button>
                  <Button
                    onClick={() => console.log('Open deploy modal for', p.id)}
                    className="mt-3 text-sm text-blue-400 hover:underline"
                  >
                  🚀 Deploy Project
                  </Button>
                <Button size="sm" variant="ghost">Edit with AI</Button>
              </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

