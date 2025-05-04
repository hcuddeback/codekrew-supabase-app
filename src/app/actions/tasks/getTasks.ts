'use server'

import { createClient } from '@/lib/utils/supabase/server'

export async function getTasks(userId: string) {
  const supabase = await createClient()
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return tasks
}

