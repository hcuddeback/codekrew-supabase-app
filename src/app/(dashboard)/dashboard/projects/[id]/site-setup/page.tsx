'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { TemplatePickerModal } from '@/components/templates/TemplatePickerModal'
import CreateRepoModal from '@/components/github/CreateRepoModal'
import { CheckIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SiteSetupPage() {
  const params = useParams()
  const id = params?.id as string
  const [mounted, setMounted] = useState(false)
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showTemplatePicker, setShowTemplatePicker] = useState(false)
  const [showCreateRepo, setShowCreateRepo] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Failed to fetch project:', error)
      } else {
        setProject(data)
      }
      setLoading(false)
    }

    if (id) fetchProject()
  }, [id])

  const handleTemplateSelect = async (slug: string) => {
    const { error } = await supabase
      .from('projects')
      .update({ template_slug: slug })
      .eq('id', id)

    if (error) {
      console.error('Failed to update template_slug:', error)
    } else {
      setProject((prev: any) => ({ ...prev, template_slug: slug }))
      setShowTemplatePicker(false)
    }
  }

  const handleGitHubConnect = async () => {
    if (!project) return
    try {
      const res = await fetch('/api/github/create-repo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: project.github_token, // You may want to load this from user session or Supabase
          name: project.name,
          description: project.description,
        }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'GitHub repo creation failed')

      await supabase.from('projects').update({ github_connected: true }).eq('id', project.id)
      setProject((prev: any) => ({ ...prev, github_connected: true }))
    } catch (err) {
      console.error('GitHub integration failed:', err)
    }
    setShowCreateRepo(false)
  }

  const handleVercelDeploy = async () => {
    console.log('Deploying to Vercel...') //stub
    //TODO: Wire up Vercel API call
  }

  if (!mounted) return null

  const Check = () => (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <CheckIcon className="h-6 w-6 text-green-400 stroke-[4]" />
      </motion.div>
    </AnimatePresence>
  )

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Set Up Your Site</h1>
      <p className="text-zinc-300 mb-6">
      Project Name: <strong>{project?.name || 'Loading...'}</strong>
      </p>

      <div className="border border-zinc-700 p-4 rounded">
          <div className="flex items-start gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-600 bg-zinc-800">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-600 bg-zinc-800">
                {project?.template_slug && <Check />}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">1. Select Template</h2>
              <p className="text-zinc-400 mb-2">Choose an Astro starter template to begin customization.</p>
              <Button variant="secondary" onClick={() => setShowTemplatePicker(true)}>Pick Template</Button>
              {project?.template_slug && (
                <p className="text-green-400 mt-2">Selected: <strong>{project.template_slug}</strong></p>
              )}
            </div>
          </div>
        </div>

      <div className="space-y-6">
        <div className="border border-zinc-700 p-4 rounded">
          <div className="flex items-start gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-600 bg-zinc-800">
              {project?.github_connected && <Check />}
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">2. Connect GitHub</h2>
              <p className="text-zinc-400 mb-2">
                Authorize your GitHub account, allow repo access, and push template.
              </p>
              {!project?.github_connected && (
                <Button variant="secondary" onClick={() => setShowCreateRepo(true)}>Connect & Create Repo</Button>
              )}
              {project?.github_connected && (
                <p className="text-green-400 mt-2">GitHub connected and Repo Created Successfully!</p>
              )}
            </div>
          </div>
        </div>

        <div className="border border-zinc-700 p-4 rounded">
          <div className="flex items-start gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-600 bg-zinc-800">
              {project?.vercel_url && <Check />}
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">3. Deploy to Vercel</h2>
              <p className="text-zinc-400 mb-2">Deploy your site with one click to a live Vercel environment.</p>
              <Button variant="secondary">Deploy Site</Button>
              {project?.vercel_url && (
                <p className="text-green-400 mt-2">Deployed to: <strong>{project.vercel_url}</strong></p>
              )}
            </div>
          </div>
        </div>

        <div className="border border-zinc-700 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">4. Configure Domain (optional)</h2>
          <p className="text-zinc-400 mb-2">Add Custom Domain</p>
          <Button variant="secondary">Add Custom Domain</Button>
        </div>

        {project?.tempalte_slug && project?.github_connected && project?.vercel_url && (
          <div className="border border-green-600 bg-green-900 text-white p-4 rounded mt-6">
            <h2 className="text-x1 font-bold mb-2">Setup Complete!</h2>
            <p>Your site is ready to go. You can manage or preview it from the project dashboard.</p>
          </div>
        )}
      </div>

      <TemplatePickerModal
        open={showTemplatePicker}
        onOpenChange={setShowTemplatePicker}
        onSelect={handleTemplateSelect}
      />

      <CreateRepoModal
        open={showCreateRepo} 
        onOpenChange={setShowCreateRepo}
        project={project}
        />
    </div>
  )
}
