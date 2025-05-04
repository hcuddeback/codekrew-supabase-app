// components/WidgetContainer.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/utils/supabase/client'
import { Button } from '@/components/ui/button'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import SortableWidgetCard from '@/components/dashboard/SortableWidgetCard'  // wrapper for each draggable card

// Import your real widget UIs:
//import CalendarWidget from './CalendarWidget'
//import KanbanWidget   from './KanbanWidget'
import TodoWidget from './TodoWidget'
//import TaskTrackerWidget from './TaskTrackerWidget'
import NotesWidget from './NotesWidget'
import CreateProjectModal from '@/components/projects/CreateProjectModal'
import { todo } from 'node:test'
import { create } from 'domain'

const WIDGET_MAP: Record<string, React.FC<any>> = {
  //calendar: CalendarWidget,
  //kanban:   KanbanWidget,
  todo: TodoWidget,
  //taskTracker: TaskTrackerWidget,
  notes: NotesWidget,
  // Add more widgets as needed
}

interface Widget {
  id: string
  settings: {
    type: string
    [key: string]: any
  }
  [key: string]: any
}

export default function WidgetContainer({ initialWidgets }: { initialWidgets: Widget[] }) {
  const supabase = createClient()
  const [widgets, setWidgets] = useState(initialWidgets)

  // DnD sensors
  const sensors = useSensors(useSensor(PointerSensor))

  // 1️⃣ Handle drag end & persist new order
  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over || String(active.id) === String(over.id)) return
    const oldIndex = widgets.findIndex(w => w.id === String(active.id))
    const newIndex = widgets.findIndex(w => w.id === String(over.id))
    const reordered = arrayMove(widgets, oldIndex, newIndex)
    setWidgets(reordered)

    // Persist each widget’s new position in batch
    await Promise.all(
      reordered.map((w: Widget, idx: number) =>
        supabase
          .from('dashboard_widgets')
          .update({ position: idx })
          .eq('id', w.id)
      )
    )
  }

  // 2️⃣ Add a new widget of given type
  const handleAdd = async (type: string) => {
    const title = type[0].toUpperCase() + type.slice(1)
    const { data, error } = await supabase
      .from('dashboard_widgets')
      .insert({ title, settings: { type }, position: widgets.length })
      .select()
      .single()
    if (data) setWidgets([...widgets, data])
  }
  console.log(widgets.map(w => w.settings.type), WIDGET_MAP);

  return (
    <div>
      <div className="mb-4 flex gap-2">
        {/* Dropdown or buttons to add widgets */}
        <Button onClick={() => handleAdd('calendar')} className="btn">
          + Calendar
        </Button>
        <Button onClick={() => handleAdd('kanban')} className="btn">
          + Kanban
        </Button>
        <Button onClick={() => handleAdd('todo')} className="btn">
          + Todo
        </Button>
        <Button onClick={() => handleAdd('notes')} className="btn">
          + Notes
        </Button>
        {/* …etc. */}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={widgets.map(w => w.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {widgets.map(widget => {
              const WidgetComponent = WIDGET_MAP[widget.settings.type]
              if (!WidgetComponent) return null
              return (
                <SortableWidgetCard key={widget.id} id={widget.id}>
                  <WidgetComponent {...widget.settings} />
                  <CreateProjectModal />
                </SortableWidgetCard>
              )
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
