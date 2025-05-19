'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/utils/supabase/client'
import { useEffect, useState } from 'react'
import UserAvatarMenu from './UserAvatarMenu'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Moon, Sun, User, LogOut } from 'lucide-react'

export default function DashboardHeader() {
  const router = useRouter()
  const supabase = createClient()
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user?.email) setUserEmail(data.user.email)
    })
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/sign-in')
  }

  return (
    <header  className="sticky top-0 z-50 w-full flex justify-between items-center px-4 py-3 bg-zinc-800/75 dark:bg-zinc-900/75 backdrop-blur-md border-b border-zinc-700/50 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-2">
        <Image src="/codekrew.png" alt="CodeKrew Logo" width={140} height={32} />
      </div>
      <UserAvatarMenu />
    </header>
  )
}
