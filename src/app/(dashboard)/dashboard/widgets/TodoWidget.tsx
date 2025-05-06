'use client'

import { useEffect, useState } from 'react'
import { getTodos } from '@/app/actions/todos/actions'
import { useSession } from '@/lib/hooks/useSession'

export default function TodoWidget() {
  const session = useSession()
  const user = session?.user
  const [todos, setTodos] = useState<any[]>([])

  useEffect(() => {
    if (user?.id) {
      getTodos()
        .then((fetchedTodos) => setTodos(fetchedTodos ?? []))
        .catch(console.error)
    }
  }, [user])

  return (
    <div className="p-4 border rounded shadow bg-white dark:bg-slate-800">
      <h2 className="widget-header font-semibold text-lg mb-2">To-Do List</h2>
      <ul className="list-disc list-inside space-y-1">
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}
