'use server'

import { createClient } from '@/lib/utils/supabase/server'

export async function createTask(userId: string, title: string) {
  const supabase = await createClient()
  const { data: tasks, error } = await supabase
    .from('tasks')
    .insert([{ user_id: userId, title }])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return tasks
}


