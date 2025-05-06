'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/utils/supabase/client'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export default function ProjectDetailPage() {
  const supabase = createClient()
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return router.push('/sign-in')
      setUser(user)

      const { data, error } = await supabase.from('projects').select('*').eq('id', id).single()
      if (!error) setProject(data)
      setLoading(false)
    }
    fetchData()
  }, [id])

  const handleUpdate = async () => {
    if (!project) return
    await supabase.from('projects').update({
      name: project.name,
      description: project.description,
      status: project.status,
    }).eq('id', project.id)
  }

  if (loading || !project) return <div className="p-6">Loading project...</div>

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Edit Project</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {project.screenshot_url && (
            <div className="rounded overflow-hidden border">
              <Image
                src={project.screenshot_url || '/coming-soon-screenshot.png'}
                alt={project.name}
                width={600}
                height={300}
                className="rounded"
              />
            </div>
          )}
          <Input
            value={project.name || ''}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
            placeholder="Project Name"
          />
          <Textarea
            value={project.description || ''}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
            placeholder="Project Description"
          />
          <Input
            value={project.status || ''}
            onChange={(e) => setProject({ ...project, status: e.target.value })}
            placeholder="Status (e.g., In Progress, Complete)"
          />
          <Button onClick={handleUpdate}>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}