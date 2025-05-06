// src/components/dashboard/ProjectCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type ProjectCardProps = {
  project: {
    id: string
    name: string
    description?: string
    created_at?: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-lg">{project.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {project.description || 'No description'}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Created: {new Date(project.created_at || '').toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  )
}
