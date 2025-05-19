// /components/setup/DeployToVercelStep.tsx
'use client'

import { Button } from '@/components/ui/button'

export default function DeployToVercelStep({ repoUrl }: { repoUrl: string }) {
  const handleDeploy = () => {
    const vercelDeployUrl = `https://vercel.com/new/git/external?repository-url=${repoUrl}`
    window.open(vercelDeployUrl, '_blank')
  }

  return (
    <div className="rounded-xl border p-4 bg-white dark:bg-zinc-900">
      <h2 className="text-lg font-semibold mb-2">Step 3: Deploy to Vercel</h2>
      <p className="text-sm text-muted-foreground mb-4">
        One-click deploy your site using Vercel.
      </p>
      <Button onClick={handleDeploy}>Deploy to Vercel</Button>
    </div>
  )
}
