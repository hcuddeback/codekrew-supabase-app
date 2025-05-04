// components/SortableWidgetCard.tsx
'use client'

import {
  CSS
} from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

interface SortableWidgetCardProps {
  id: string;
  children: React.ReactNode;
}

export default function SortableWidgetCard({ id, children }: SortableWidgetCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-2xl p-4 shadow hover:shadow-md cursor-grab"
    >
      {children}
    </div>
  )
}
