'use server'

import { createClient } from '@/lib/utils/supabase/server'

export async function deleteTask(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
  return { success: true }
}
