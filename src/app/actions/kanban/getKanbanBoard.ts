'use server'

import { createClient } from '@/lib/utils/supabase/server'

export async function getKanbanBoard(userId: string) {
  const supabase = await createClient()
  const { data: kanban_columns, error } = await supabase
    .from('kanban_columns')
    .select('id, title, tasks (id, title, status)')
    .eq('user_id', userId)

  if (error) throw new Error(error.message)
  return kanban_columns
}

export async function getKanbanTasks(columnId: string) {
  const supabase = await createClient()
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('column_id', columnId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return tasks
}