'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface CreateProjectModalProps {
  onProjectCreated?: (projectId: string) => void;
}

export default function CreateProjectModal({ onProjectCreated }: CreateProjectModalProps) {
  const supabase = createClient()
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [template, setTemplate] = useState('astro-landing')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)

  const handleCreate = async () => {
    setLoading(true)
    setError('')

    if (!name.trim()) {
      setError('Project name is required.')
      setLoading(false)
      return
    }

    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user) {
      setError('Unable to get user information.')
      setLoading(false)
      return
    }

    const { data, error } = await supabase.from('projects').insert({
      user_id: userData.user.id,
      name,
      description,
      template_slug: template,
    }).select('id').single()

    if (error) {
      let message = error.message
      if (message === 'Basic plan allows only 1 project.') {
        message = 'You’ve reached your project limit. Upgrade your plan to add more projects.'
      }
      setError(message)
    } else if (data?.id) {
      onProjectCreated?.(data.id)
      router.push(`/dashboard/projects/${data.id}/site-setup`)
      setOpen(false)
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span>
          <Button variant="default"
            className="px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">+ New Project</Button>
        </span>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 text-white border-zinc-800">
        <DialogHeader>
          <DialogTitle>Create a New Project</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-zinc-800 text-white"
        />

        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-zinc-800 text-white"
        />

        {error && (
          <div className="mt-2 rounded bg-red-900/30 border border-red-700 p-3 text-sm text-red-300">
            {error}
            {error.includes('project limit') && (
              <div className="mt-2">
                <Button
                  variant="outline"
                  className="text-orange-500 border-orange-500 hover:bg-orange-500/10"
                  onClick={() => router.push('/pricing')}
                >
                  Upgrade Plan
                </Button>
              </div>
            )}
          </div>
        )}

        <Button onClick={handleCreate} disabled={loading || !name.trim()} className="mt-4">
          {loading ? 'Creating...' : 'Create Project'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
