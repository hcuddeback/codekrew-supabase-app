'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { createClient } from '@/lib/utils/supabase/client'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut, User } from 'lucide-react'

export default function UserAvatarMenu() {
  const { setTheme, theme } = useTheme()
  const router = useRouter()
  const supabase = createClient()
  const [userEmail, setUserEmail] = useState('')
  const [user, setUser] = useState<{ email: string; full_name?: string } | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession()
      const authUser = session?.session?.user
      if (!authUser) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', authUser.id)
        .single()

      setUser(profile)
      setIsMounted(true)
    }

    fetchUser()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.reload() // Reload to ensure state is reset
    router.push('/sign-in')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-8 h-8">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.email ?? 'default'}`}
            alt={user?.full_name ?? user?.email ?? 'User'}
          />
          <AvatarFallback>{user?.full_name?.[0] ?? 'U'}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-zinc-900 border border-zinc-700 w-56">
      <DropdownMenuItem disabled>
          {user?.full_name || user?.email || 'Unknown User'}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push('/dashboard/account')}
          className="gap-2 text-white hover:bg-zinc-800"
        >
          <User size={16} /> Account Preferences
        </DropdownMenuItem>
        
        <div className="border-t border-zinc-700 my-1" />
        <div className="px-3 py-1.5 text-xs text-zinc-500">Theme</div>
        <DropdownMenuItem onClick={() => setTheme('light')} className="text-white hover:bg-zinc-800 pl-8">
          Light {theme === 'light' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className="text-white hover:bg-zinc-800 pl-8">
          Dark {theme === 'dark' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className="text-white hover:bg-zinc-800 pl-8">
          System {theme === 'system' && '✓'}
        </DropdownMenuItem>
        <div className="border-t border-zinc-700 my-1" />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="gap-2 text-red-500 hover:bg-zinc-800 hover:text-red-400"
        >
          <LogOut size={16} /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
