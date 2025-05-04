'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createGitHubRepo } from '@/lib/actions/github'

export default function CreateRepoModal({
  accessToken,
  open,
  onClose,
}: {
  accessToken: string
  open: boolean
  onClose: () => void
}) {
  const [repoName, setRepoName] = useState('')
  const [loading, setLoading] = useState(false)
  const [repoUrl, setRepoUrl] = useState('')

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
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a GitHub Repo</DialogTitle>
        </DialogHeader>

        <Input
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          placeholder="e.g. codekrew-starter"
        />

        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={loading || !repoName}>
            {loading ? 'Creating...' : 'Create'}
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
