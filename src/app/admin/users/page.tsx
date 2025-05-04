// app/admin/users/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

export default function AdminUsersPage() {
  const supabase = createClient()
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: sessionData } = await supabase.auth.getSession()
      const currentUser = sessionData?.session?.user

      if (!currentUser) return router.push('/login')

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', currentUser.id)
        .single()

      if (profile?.role !== 'admin') return router.push('/')

      const { data } = await supabase.from('profiles').select('id, email, role')
      setUsers(data || [])
    }

    fetchUsers()
  }, [router, supabase])

  const updateRole = async (id: string, role: string) => {
    await supabase.from('profiles').update({ role }).eq('id', id)
    setUsers(users.map(user => user.id === id ? { ...user, role } : user))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">User Role Management</h1>
      {users.map(user => (
        <div key={user.id} className="flex items-center justify-between border p-4 rounded-lg">
          <span className="font-medium">{user.email}</span>
          <Select
            defaultValue={user.role}
            onValueChange={value => updateRole(user.id, value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="dev">Dev</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  )
}
