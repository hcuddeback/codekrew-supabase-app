'use server'

import { createClient } from '@/lib/utils/supabase/server'

export async function updateTask(id: string, updates: Partial<{ title: string, status: string }>) {
  const supabase = await createClient()
  const { data: tasks, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return tasks
}

