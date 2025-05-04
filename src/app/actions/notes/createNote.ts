"use server";

import { createClient } from '@/lib/utils/supabase/server'
import { revalidatePath } from "next/cache";

export async function createNote(userId: string, title: string) {
  const supabase = await createClient()
  const { data: notes, error } = await supabase
    .from('notes')
    .insert([{ user_id: userId, title }])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return notes
}

export async function createNoteWithContent(userId: string, title: string, content: string) {
  const supabase = await createClient()
  const { data: notes, error } = await supabase
    .from('notes')
    .insert([{ user_id: userId, title, content }])
    .select()
    .single()

  if (error) throw new Error(error.message)
  revalidatePath('/notes')
  return notes
}