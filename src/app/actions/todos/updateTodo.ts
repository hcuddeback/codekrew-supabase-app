'use server'

import { createClient } from '@/lib/utils/supabase/server'

export async function updateTodo(id: string, updates: Partial<{ title: string, status: string }>) {
  const supabase = await createClient()
  const { data: todos, error } = await supabase
    .from('todos')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return todos
}

