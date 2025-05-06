'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import CreateRepoModal from '@/components/github/CreateRepoModal'
import { useSession } from '@/lib/hooks/useSession'

export default function SiteSetupFlow() {
  const [showModal, setShowModal] = useState(false)
  const session = useSession() // assuming access token is stored in Supabase session metadata

  const accessToken = session?.user?.user_metadata?.github_token

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Deploy Your Starter Site</h2>

      <p className="text-sm text-muted-foreground">
        Start by creating a GitHub repo for your project. We’ll deploy it to Vercel next.
      </p>

      <Button onClick={() => setShowModal(true)} disabled={!accessToken}>
        🚀 Create GitHub Repo
      </Button>

      <CreateRepoModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        accessToken={accessToken}
        projectName="My Astro Site"
        templateFiles={[
          { path: 'README.md', content: '# Starter Project' },
          { path: 'index.html', content: '<!DOCTYPE html><html><head></head><body></body></html>' },
        ]}
      />
    </div>
  )
}
