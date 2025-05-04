'use server'

import { createClient } from '@/lib/utils/supabase/server'

export async function getProjects(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data
}
