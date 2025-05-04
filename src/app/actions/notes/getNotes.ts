'use server'

import { createClient } from '@/lib/utils/supabase/server'

export async function getNotes(userId: string) {
  const supabase = await createClient()
  const { data: notes, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return notes
}
