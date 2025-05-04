'use server'

import { createClient } from '@/lib/utils/supabase/server'

export async function getEvents(userId: string) {
  const supabase = await createClient()
  const { data: calendar_events, error } = await supabase
    .from('calendar_events')
    .select('*')
    .eq('user_id', userId)
    .order('event_date', { ascending: true })

  if (error) throw new Error(error.message)
    return calendar_events
}

