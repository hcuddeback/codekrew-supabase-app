'use server'

import { createClient } from '@/lib/utils/supabase/server'

export async function createTodo(userId: string, title: string) {
  const supabase = await createClient()
  const { data: todos, error } = await supabase
    .from('todos')
    .insert([{ user_id: userId, title }])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return todos
}


