'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/utils/supabase/client'

export function useUserRole() {
  const supabase = createClient()
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const fetchRole = async () => {
      const { data: session } = await supabase.auth.getSession()
      const user = session?.session?.user

      if (!user) return setRole(null)

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      setRole(profile?.role || null)
    }

    fetchRole()
  }, [supabase])

  return role
}
