// ProjectDetailPage.tsx
'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/utils/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function ProjectDetailPage() {
  const { id } = useParams()
  const supabase = createClient()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', description: '', status: '' })

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase.from('projects').select('*').eq('id', id).single()
      if (error) {
        console.error('Failed to fetch project:', error)
      } else {
        setProject(data)
        setForm({
          name: data.name || '',
          description: data.description || '',
          status: data.status || '',
        })
      }
      setLoading(false)
    }
    if (id) fetchProject()
  }, [id])

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    if (!project) return
    const updates = {
      name: form.name,
      description: form.description,
      updated_at: new Date().toISOString(),
    }
    const { error } = await supabase.from('projects').update(updates).eq('id', project.id)
    if (error) {
      console.error('Error saving project:', error)
      alert('Failed to save changes.')
    } else {
      alert('Project updated!')
      setProject({ ...project, ...updates })
    }
  }

  if (loading) return <p className="p-4 text-muted-foreground">Loading project...</p>

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Project Details</h1>
        <Link href="/dashboard/projects" className="text-sm text-orange-500 hover:underline">
          ← Back to Projects
        </Link>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-300">Project Name</label>
          <Input value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-300">Description</label>
          <Textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-300">Status</label>
          <div className="text-sm text-slate-400 border border-slate-700 rounded px-3 py-2 bg-zinc-900">
            {project?.status || 'Unknown'}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-300">Deployment Status</label>
          <div className="text-sm text-slate-400 border border-slate-700 rounded px-3 py-2 bg-zinc-900">
            {project?.vercel_url ? 'Deployed' : project?.setup_complete ? 'In Progress' : 'Not Deployed'}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-slate-300">Created At</label>
            <div className="text-sm text-slate-400 border border-slate-700 rounded px-3 py-2 bg-zinc-900">
              {new Date(project?.created_at).toLocaleString()}
            </div>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-slate-300">Updated At</label>
            <div className="text-sm text-slate-400 border border-slate-700 rounded px-3 py-2 bg-zinc-900">
              {new Date(project?.updated_at).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            className={project?.archived ? 'text-orange-400 hover:text-orange-500' : 'text-red-500 hover:text-red-600'}
            onClick={async () => {
              const confirmMsg = project?.archived ? 'Unarchive this project?' : 'Archive this project?'
              if (!confirm(confirmMsg)) return
              const { error } = await supabase
                .from('projects')
                .update({ archived: !project.archived })
                .eq('id', project.id)
              if (error) {
                alert('Failed to update archive status.')
              } else {
                location.reload()
              }
            }}
          >
            {project?.archived ? 'Unarchive Project' : 'Archive Project'}
          </Button>

          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div> 
      </div>
    </div>
  )
}
