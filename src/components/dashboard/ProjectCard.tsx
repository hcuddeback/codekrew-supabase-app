'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/utils/supabase/client'

export default function ProjectCard({
  project,
  showPreview,
  onClick,
}: {
  project: any
  showPreview?: boolean
  onClick?: () => void
}) {
  const router = useRouter()
  const supabase = createClient()
  const {
    id,
    name,
    template_slug,
    vercel_url,
    setup_complete,
    created_at,
    user_id,
    archived,
  } = project

  const [owner, setOwner] = useState<{ email: string; full_name?: string } | null>(null)
  const [loadingArchive, setLoadingArchive] = useState(false)

  useEffect(() => {
    const fetchOwner = async () => {
      const { data, error, status } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('user_id', user_id)
      .single()

    if (error && status !== 406) {
      console.warn('No profile found for user_id:', user_id)
      setOwner(null)
    } else {
      setOwner(data)
    }
    }

    if (user_id) {
      fetchOwner()
    }
  }, [user_id])

  const toggleArchive = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const confirmMsg = archived
      ? 'Are you sure you want to unarchive this project?'
      : 'Are you sure you want to archive this project?'
    const confirmed = window.confirm(confirmMsg)
    if (!confirmed) return

    setLoadingArchive(true)
    const { error } = await supabase.from('projects').update({ archived: !archived }).eq('id', id)
    if (error) {
      console.error('Failed to update archive status:', error)
    } else {
      window.location.reload()
    }
    setLoadingArchive(false)
  }

  const status = archived
    ? 'Archived'
    : vercel_url
    ? 'Deployed'
    : setup_complete
    ? 'In Progress'
    : 'Not Deployed'

  return (
    <Card
      onClick={onClick}
      className={cn(
        'bg-zinc-800 text-white hover:border-orange-500 transition-colors duration-200',
        onClick && 'cursor-pointer hover:shadow-md',
        archived && 'opacity-60 grayscale'
      )}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold truncate">{name}</CardTitle>
        <p className="text-sm text-slate-400">Template: {template_slug}</p>
        {owner && (
          <p className="text-xs text-slate-500">Owner: {owner.full_name || owner.email}</p>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm">
          <span
            className={cn(
              'px-2 py-0.5 rounded-full text-xs font-medium',
              archived
                ? 'bg-slate-900 text-slate-400'
                : status === 'Deployed'
                ? 'bg-green-900 text-green-300'
                : status === 'In Progress'
                ? 'bg-yellow-900 text-yellow-300'
                : 'bg-slate-700 text-slate-300'
            )}
          >
            {status}
          </span>
          <span className="text-xs text-slate-500">
            {new Date(created_at).toLocaleDateString()}
          </span>
        </div>

        {!setup_complete && !archived && (
          <Button
            size="sm"
            variant="outline"
            className="text-orange-400 border-orange-400 hover:bg-orange-500/10"
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/dashboard/projects/${id}/site-setup`)
            }}
          >
            Continue Setup
          </Button>
        )}

        {vercel_url && !archived && (
          <a
            href={`https://${vercel_url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            View Deployment ↗
          </a>
        )}

        <div className="pt-1 text-right">
          <Button
            size="sm"
            variant="ghost"
            className={cn(
              'text-xs font-medium transition-colors',
              loadingArchive
                ? archived
                  ? 'text-orange-300'
                  : 'text-red-300'
                : archived
                ? 'text-orange-400 hover:text-orange-500'
                : 'text-red-500 hover:text-red-600'
            )}
            onClick={toggleArchive}
            disabled={loadingArchive}
          >
            {loadingArchive
              ? archived
                ? 'Restoring...'
                : 'Archiving...'
              : archived
              ? 'Unarchive'
              : 'Archive'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
