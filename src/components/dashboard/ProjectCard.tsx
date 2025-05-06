// src/components/dashboard/ProjectCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'


export type ProjectCardProps = {
    project: any
    showPreview?: boolean
    status?: string
    onClick?: () => void
}

export default function ProjectCard({ project, showPreview, status, onClick }: ProjectCardProps) {
  return (
    <Card onClick={onClick} className="hover:shadow-md transition cursor-pointer">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{project.name}</span>
          {status && <Badge variant="secondary">{status}</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showPreview && (
          <div className="mb-2 rounded overflow-hidden">
            <Image
              src={project.screenshot_url || '/coming-soon-screenshot.png'}
              alt={project.name}
              width={600}
              height={300}
              className="rounded border"
            />
          </div>
        )}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description || 'No description provided.'}
        </p>
      </CardContent>
    </Card>
  )
}
