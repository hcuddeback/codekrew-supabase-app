'use server'

import { createClient } from '@/lib/utils/supabase/server'

export async function updateNote(id: string, content: string) {
  const supabase = await createClient()
  const { data: notes, error } = await supabase
    .from('notes')
    .update({ content })
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return notes
}

export async function updateNoteTitle(id: string, title: string) {
  const supabase = await createClient()
  const { data: notes, error } = await supabase
    .from('notes')
    .update({ title })
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return notes
}