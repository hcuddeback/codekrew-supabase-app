// DashboardCard.tsx
'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function DashboardCard({
  project,
  onClick,
}: {
  project: any
  onClick?: () => void
}) {
  const { id, name, template_slug, vercel_url, setup_complete } = project

  const status = vercel_url
    ? 'Deployed'
    : setup_complete
    ? 'In Progress'
    : 'Not Deployed'

  return (
    <Card
      onClick={onClick}
      className={cn(
        'bg-zinc-800 text-white hover:border-orange-500 transition-colors duration-200 p-4',
        onClick && 'cursor-pointer hover:shadow-md'
      )}
    >
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold truncate">{name}</CardTitle>
        <p className="text-sm text-slate-400">{template_slug}</p>
        <span
          className={cn(
            'inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium',
            status === 'Deployed'
              ? 'bg-green-900 text-green-300'
              : status === 'In Progress'
              ? 'bg-yellow-900 text-yellow-300'
              : 'bg-slate-700 text-slate-300'
          )}
        >
          {status}
        </span>
      </CardHeader>
    </Card>
  )
}
