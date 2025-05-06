'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createGitHubRepo, pushFiles } from '@/lib/actions/github'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function CreateRepoModal({
  accessToken,
  isOpen,
  onClose,
  projectName,
  templateFiles,
}: {
  accessToken: string
  isOpen: boolean
  onClose: () => void
  projectName: string            
  templateFiles: Array<{ path: string; content: string }>  
}) {
  const [repoName, setRepoName] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [repoUrl, setRepoUrl] = useState('')

  useEffect(() => {
    if (projectName) {
      const slug = projectName.toLowerCase().replace(/\s+/g, '-')
      setRepoName(slug)
    }
  }, [projectName])

  const handleCreate = async () => {
    setLoading(true)
    const { repo, error } = await createGitHubRepo(accessToken, repoName)
    if (repo) {
      setRepoUrl(repo.html_url)
    } else {
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a GitHub Repo</DialogTitle>
        </DialogHeader>

        <Input
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          placeholder="e.g. codekrew-starter"
        />

        <div className="flex items-center space-x-2 mt-2">
          <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
          <Label>{isPrivate ? 'Private' : 'Public'}</Label>
        </div>

        <DialogFooter className="gap-2 mt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={loading || !repoName}>
            {loading ? 'Creating...' : 'Create & Push'}
          </Button>
        </DialogFooter>

        {repoUrl && (
          <p className="text-green-600 text-sm mt-2">
            ✅ Repo created:&nbsp;
            <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="underline">
              {repoUrl}
            </a>
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}
