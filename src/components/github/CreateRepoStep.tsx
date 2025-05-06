'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import CreateRepoModal from '../github/CreateRepoModal'

export default function CreateRepoStep({
  accessToken,
  project,
}: {
  accessToken: string
  project: { name: string }
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [repoCreated, setRepoCreated] = useState(false)
  const [repoUrl, setRepoUrl] = useState('')
  const [templateFiles, setTemplateFiles] = useState([]);
  const starterFiles = [
    { path: 'index.html', content: '<h1>Hello Astro</h1>' },
    { path: 'package.json', content: '{ "name": "my-site" }' },
  ]

  const handleRepoCreated = (url: string) => {
    setRepoUrl(url)
    setRepoCreated(true)
    setModalOpen(false)
  }

  useEffect(() => {
    fetch('/api/templates/astro')
      .then(res => res.json())
      .then(setTemplateFiles)
  }, [])

  
  return (
    <div className="rounded-xl border p-4 bg-white dark:bg-slate-900">
      <h2 className="text-lg font-semibold mb-2">Step 2: Create a GitHub Repo</h2>
      <p className="text-sm text-muted-foreground mb-4">
        We'll create a new GitHub repository to host your Astro site.
      </p>

      {repoCreated ? (
        <p className="text-green-600 text-sm">
          ✅ Repo created:&nbsp;
          <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="underline">
            {repoUrl}
          </a>
        </p>
      ) : (
        <Button onClick={() => setModalOpen(true)}>Create GitHub Repo</Button>
      )}

      <CreateRepoModal
        accessToken={accessToken}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        projectName={project.name} // auto-fill
        templateFiles={starterFiles} // pass Astro/Next template content
      />
    </div>
  )
}
