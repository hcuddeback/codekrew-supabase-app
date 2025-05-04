'use server'

import { createClient } from '@/lib/utils/supabase/server'

export async function getTodos(userId: string) {
  const supabase = await createClient()
  const { data: todos, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return todos
}

