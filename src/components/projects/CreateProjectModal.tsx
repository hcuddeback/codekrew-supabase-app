'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { on } from 'events'


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


  const handleCreate = async () => {
    setLoading(true)
    setError('')
    const { data, error } = await supabase.from('projects').insert({
      name,
      description,
      template_slug: template,
    }).select('id').single()
    if (error) {
      setError(error.message)
    } else if (data?.id) {
      onProjectCreated?.(data.id)
      router.push(`/dashboard/projects/${data.id}/site-setup`)
    }
    setLoading(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span>
          <Button variant="default"
          className="px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">+ New Project</Button>
        </span>
      </DialogTrigger>
      <DialogContent className="bg-slate-950 text-white border-slate-800">
        <DialogHeader>
          <DialogTitle>Create a New Project</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-slate-800 text-white"
        />

        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-slate-800 text-white"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <DialogClose asChild>
          <Button onClick={handleCreate} disabled={loading} className="mt-4">
            {loading ? 'Creating...' : 'Create Project'}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
