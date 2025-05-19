'use client'

import { useEffect, useState } from 'react'
import { getKanbanBoard } from '@/app/actions/kanban/getKanbanBoard'
import { useSession } from '@/lib/hooks/useSession'

export default function KanbanWidget() {
  const session = useSession()
  const user = session?.user
  const [columns, setColumns] = useState<any[]>([])

  useEffect(() => {
    if (user?.id) {
      getKanbanBoard(user.id).then(setColumns).catch(console.error)
    }
  }, [user])

  return (
    <div className="p-4 border rounded shadow bg-white dark:bg-zinc-800 overflow-x-auto">
      <h2 className="widget-header font-semibold text-lg mb-2">Kanban Board</h2>
      <div className="flex space-x-4">
        {columns.map(column => (
          <div key={column.id} className="bg-zinc-100 dark:bg-zinc-700 p-2 rounded w-64 min-w-[16rem]">
            <h3 className="font-bold mb-2">{column.title}</h3>
            <ul className="space-y-1">
              {column.tasks.map((task: any) => (
                <li key={task.id} className="bg-white dark:bg-zinc-900 p-1 rounded shadow text-sm">{task.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
